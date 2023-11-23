from app import app 
from flask import Response, jsonify, make_response, request
import json
from user.services import User
from driver.services import Driver
from commission.services import Commission
from vehicle.services import Vehicle
from payment.services import Payment
import razorpay
from bson import ObjectId
from app import db

rzp_id = 'rzp_test_Ji0esyBmxAq54k'
rzp_secret = 'PvXAjGFXqtChANm4sOZeVDyk'
client = razorpay.Client(auth=(rzp_id, rzp_secret))
  
user = User()
driver = Driver()
commission = Commission()
vehicle = Vehicle()
payment = Payment(client)


# USER

## Register
@app.route('/user/signup/', methods=['POST'])
def signup():
  data = json.loads(request.data)
  return user.signup(data)

## Login
@app.route('/user/login/', methods=['POST'])
def login():
  data = json.loads(request.data)
  return user.login(data)

##switchRole
@app.route('/user/switch_role/', methods=['POST'])
def switch_role():
    data = json.loads(request.data)
    return user.switch_role(data)
  
# ##Check Driver id
# @app.route('/user/check_id_match', methods=['POST'])
# def check_id_match():
#     data = json.loads(request.data)
#     return user.check_id_match(data)
  
@app.route('/user/check_id_match', methods=['POST'])
def check_id_match():
    try:
        data = request.get_json()  # Extract JSON data from the request
        # Implement your logic to check the ID in the database based on 'data'
        # Your existing logic goes here...
        # return user.check_id_match(data)
        # return jsonify({'success': True}), 200  # Return a success response
        user_id = data.get('id')
        print(user_id)
        print("Received user ID from frontend:", user_id)  # Print the received user ID
          
        if user_id:
            user_object_id = ObjectId(user_id)
            matching_driver = db.Drivers.find_one({"_id": user_object_id})
            if matching_driver:
                response = {"match": True}
                print("Sending response to frontend:", response)  # Print the response being sent
                return jsonify(response), 200
            else:
              response = {"match": False}
              print("Sending response to frontend:", response)  # Print the response being sent
              return jsonify(response), 200
        else:
          response = {"error": "No ID provided"}
          print("Sending response to frontend:", response)  # Print the response being sent
          return jsonify(response), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500 

# DRIVER

## Create Driver
@app.route('/driver/add_new_driver/',methods = ['POST'])
def create_driver():
  data = json.loads(request.data)
  return driver.createDriver(data)

@app.route('/driver/add_new_driver/', methods=['POST'])
def add_new_driver(data):
    data = request.json
    response, status_code = add_new_driver(data)
    return response, status_code

## Role-Switch based new driver
# @app.route('/driver/add_new_driver/', methods=['POST'])
# def add_new_driver(driver):
#         driver['uid'] = ObjectId(str(driver['uid']))
#         # driver_data = {
#         #     "name": data['name'],
#         #     "rating": data['rating'],
#         #     "priceperkm": data['priceperkm'], 
#         #     "priceperhour": data['priceperhour'], 
#         #     "experience": data['experience'],
#         #     "uid": data['uid']
#         # }
#         dbResponse = db.Driver.insert_one(driver)
        
#         if dbResponse:
#             db.users.update_one({"_id": driver['uid']}, {"$set": {"did": dbResponse.inserted_id}})
#             return Response(
#                     response=json.dumps({"message": "driver created", "id": f"{dbResponse.inserted_id}"}),
#                     status=200,
#                     mimetype="application/json"
#                 )
#         print(Response)


## Get drivers
@app.route('/driver/read/',methods = ['GET'])
def read_driver():
  return driver.readDriver()

## Update a driver
@app.route('/driver/update/<id>',methods = ['PATCH'])
def update_driver(id):
  data = json.loads(request.data)
  return driver.updateDriver(id, data)

# Remove a driver
@app.route('/driver/delete/<id>',methods = ['DELETE'])
def delete_driver(id):
  return driver.deleteDriver(id)



# VEHICLE

#CREATE
@app.route('/vehicle/createVehicle/',methods = ['POST'])
def create_vehicle():
  data = json.loads(request.data)
  return vehicle.createVehicle(data)  

#READ
@app.route('/vehicle/readVehicle/',methods = ['GET'])
def read_vehicle():
  return vehicle.readVehicle()

#UPDATE
@app.route('/vehicle/update/<id>',methods = ['PATCH'])
def update_vehicle(id):
  data = json.loads(request.data)
  return vehicle.updateVehicle(id, data)

#DELETE
@app.route('/vehicle/delete/<id>',methods = ['DELETE'])
def delete_vehicle(id):
  vehicle.deleteVehicle(id)



#COMISSION

#CREATE
@app.route('/commission/createCommission/',methods = ['POST'])
def create_Commission():
    data = json.loads(request.data)
    return commission.createCommission(data)

#READ
@app.route('/commission/readCommission/',methods = ['GET'])
def read_Commission():
  return commission.readCommission()

#UPDATE
@app.route('/commission/updateCommission/<id>',methods = ['PATCH'])
def update_Commission(id):
  data = json.loads(request.data)
  return commission.updateCommission(id, data)



#PAYMENTS

## Create payment order
@app.route("/payment/create-order/",methods=["POST"])
def create_order():
  data = json.loads(request.data)
  return payment.createOrder(data)

## Verify payment order
@app.route("/payment/verify/",methods=['POST'])
def verify():
  data = json.loads(request.data)
  return payment.verifyPayment(data)

## Get payments for id
@app.route("/payment/read/<id>", methods=['GET'])
def read_payments(id):
  return payment.readPayments(id)