from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
from flask_cors import cross_origin
from bson import ObjectId


class User:

    def signup(self, data):
      user = {
          "name": data['name'],
          "email": data['email'],
          "password": pbkdf2_sha256.encrypt(data['password']),
          "role": data['role']
      }
      rider = {
          "name": data['name'],
          "email": data['email'],
          "password": pbkdf2_sha256.encrypt(data['password']),
          "role": "rider"
      }

      if db.users.find_one({"email": user['email']}):
          return jsonify({"error": "Email address already in use"}), 400

      db_user = db.users.insert_one(user)
      db_rider = db.rider.insert_one(rider)

      if db_user and db_rider:
          user_id = str(db_user.inserted_id)
          rider_id = str(db_rider.inserted_id)

          # Update user document with rid
          db.users.update_one({"_id": db_user.inserted_id}, {"$set": {"rid": db_rider.inserted_id}})

          return jsonify({'data': 'Success', "user_id": user_id, "rider_id": rider_id}), 200

      return jsonify({"error": "Signup failed"}), 400

    def login(self, data):
        user = db.users.find_one({
            "email": data['email']
        })

        if user['role'] == 'driver':
            driver = db.Drivers.find_one({"uid": user['_id']})
            hired = False if 'vehicleId' not in driver.keys() else True
            if not hired and "preferredVehicleId" in driver.keys():
                return {'name': driver['name'], 'role': 'driver', 'email': user['email'], '_id': str(driver['_id']), 'uid': str(user['_id']), "hired": hired, "preferredVehicle": str(driver["preferredVehicleId"])}
            return {'name': driver['name'], 'role': 'driver', 'email': user['email'], '_id': str(driver['_id']), 'uid': str(user['_id']), "hired": hired}

        if user['name'] and pbkdf2_sha256.verify(data['password'], user['password']):
            return {'name': user['name'], 'role': user['role'], 'email': user['email'], '_id': str(user['_id'])}

        return jsonify({"error": "Invalid login credentials"}), 401
    
    
 
    def switch_role(self, data):
        email = data['email']
        new_role = data['new_role']

        user = db.users.find_one({"email": email})
        if user:
            db.users.update_one({"email": email}, {"$set": {"role": new_role}})
            return jsonify({"success": True, "message": "User role updated successfully"}), 200
        else:
            return jsonify({"error": "User not found"}), 404
        
    from flask import jsonify

# Assuming db is your database connection

    # def check_id_match(id):
    #     try:
    #         # Fetch _id from user collection
    #         user_doc = db.users.find_one({"_id": id})  # Use {"_id": id} to find a specific ID
    #         if user_doc:
    #             user_id = user_doc['_id']

    #             # Check if the _id matches in the driver collection
    #             matching_driver = db.Drivers.find_one({"uid": user_id})
    #             if matching_driver:
    #                 return jsonify({"match_found": True})  # Match found
    #             else:
    #                 return jsonify({"match_found": False})  # No match found in driver collection
    #         else:
    #             return jsonify({"error": "User not found"})  # No document found in user collection based on the criteria
    #     except Exception as e:
    #         print("An error occurred:", e)
    #         return jsonify({"error": "An error occurred"})  # Return an error response in case of exceptions

    # def check_id_match(id):
    #     try:
    #         # Replace <MongoDB connection string> with your actual MongoDB connection string
            
    #         # Convert the string ID to ObjectId (assuming id_to_check is a string)
            
    #         # Find the document in Drivers collection that matches the provided id
    #         matching_driver = db.Drivers.find_one({"uid": id})
            
    #         if matching_driver:
    #             return True  # Match found in Drivers collection
    #         else:
    #             return False  # No match found in Drivers collection
    #     except Exception as e:
    #         print("An error occurred:", e)
    #         return False




    def check_id_match(data):
        try:
            user_id = data.get('id')
            print("Received user ID from frontend:", user_id)  # Print the received user ID
            
            if user_id:
                user_object_id = ObjectId(user_id)
                matching_driver = db.Drivers.find_one({"uid": user_object_id})
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
            print("An error occurred:", e)
            response = {"error": "An error occurred"}
            print("Sending response to frontend:", response)  # Print the response being sent
            return jsonify(response), 500


