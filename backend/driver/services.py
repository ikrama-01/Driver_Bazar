from flask import Response
from app import db
import json
from bson import ObjectId, json_util

class Driver:
    
    def createDriver(self, driver):
            try:
                driver['uid'] = ObjectId(driver['uid'])
                dbResponse = db.Drivers.insert_one(driver)
                
                return Response(response=json.dumps({"message":"driver created","id":f"{dbResponse.inserted_id}"}),status = 200,
                mimetype="application/json")
            except Exception as ex:
                print(ex)
                
    def readDriver(self):
        try:
            data = list(db.Drivers.find())
            populated_data = []
            for driver in data:
                try: 
                  if 'vehicleId' in driver.keys():
                    driver['vehicle'] = db.Vehicles.find_one(ObjectId(driver['vehicleId']))
                  elif "preferredVehicleId" in driver.keys():
                    driver['vehicle'] = db.Vehicles.find_one(ObjectId(driver['preferredVehicleId']))
                  if not driver['vehicle']['ownerId'] == driver['vehicle']['driverId']:
                    try:
                        driver['vehicle']['owner'] = db.users.find_one(ObjectId(driver['vehicle']['ownerId']))
                    except:
                        driver['vehicle']['owner'] = db.Drivers.find_one(ObjectId(driver['vehicle']['ownerId']))
                    driver['rented'] = True
                  else: 
                      driver['rented'] = False
                except: pass
                populated_data.append(driver)
            response = json.loads(json_util.dumps(populated_data))
            return response
        except Exception as ex:
            return Response(response=json.dumps({"message":"cannot read data of driver"}),
            status = 500,
            mimetype="application/json"
        )
    
    def updateDriver(self, id, data):
        try:
            if "vehicleId" in data.keys():
                data["vehicleId"] = ObjectId(data['vehicleId'])
            if "preferredVehicleId" in data.keys():
                data["preferredVehicleId"] = ObjectId(data['preferredVehicleId'])
            db.Drivers.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
            )
            return Response("Data Updated", status=200)
        except Exception as ex:
            print(ex)
            return Response(
            response=json.dumps({"message":"data didnt update"}),
            status = 500,
            mimetype="application/json"
            )  
            
    def deleteDriver(self):
        try:
            dbResponse = db.Drivers.delete_one({"_id":ObjectId(id)})
            if dbResponse.deleted_count == 1:
                return Response(response=json.dumps({"message":"driver delted","id":f"{id}"}),
                status = 500,
                mimetype="application/json")      
            return Response(
            response=json.dumps({"message":"driver not found","id":f"{id}"}),
            status = 500,
            mimetype="application/json")
        
        except Exception as ex:
            print(ex)
            return Response(
            response=json.dumps({"message":"data didnt delete"}),status = 500,mimetype="application/json")



        