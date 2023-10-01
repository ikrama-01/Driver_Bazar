from flask import Flask, jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db

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

    if db.users.find_one({ "email": user['email']}):
      return jsonify({ "error": "Email address already in use" }), 400
    if db.rider.find_one({ "email": user['email']}):
      return 
    
    db_user = db.users.insert_one(user)
    db_rider = db.rider.insert_one(rider)
    
    if db_user and db_rider:
      return jsonify({'data': 'Success', "user_id": str(db_user.inserted_id), "rider_id": str(db_rider.inserted_id)}), 200

    return jsonify({"error": "Signup failed"}), 400
  
  def login(self, data):
    user = db.users.find_one({
      "email": data['email']
    })
    
    if user['role'] == 'driver':
      driver = db.Drivers.find_one({"uid": user['_id']})
      hired = False if 'vehicleId' not in driver.keys() else True
      if not hired and "preferredVehicleId" in driver.keys():
        return {'name': driver['name'], 'role': 'driver', 'email': user['email'], '_id': str(driver['_id']), 'uid':str(user['_id']), "hired": hired, "preferredVehicle": str(driver["preferredVehicleId"])}
      return {'name': driver['name'], 'role': 'driver', 'email': user['email'], '_id': str(driver['_id']), 'uid':str(user['_id']), "hired": hired}


    if user['name'] and pbkdf2_sha256.verify(data['password'], user['password']):
      return {'name': user['name'], 'role': user['role'], 'email': user['email'], '_id': str(user['_id'])}
    
    return jsonify({ "error": "Invalid login credentials" }), 401
  
  # def switchAsRider(self, data):
  #   user = db.users.find_one({
  #     "email": data['email']
  #   })
    
  #   if user['role'] == 'driver':
  #     return {'name': user['name'], 'role': user['role'], 'email': user['email'], '_id': str(user['_id'])}