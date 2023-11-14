from app import app 
from flask import jsonify, request
import json
from user.services import User
from driver.services import Driver
from commission.services import Commission
from vehicle.services import Vehicle
from payment.services import Payment
import razorpay

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
@app.route('/user/switch_role', methods=['POST'])
def switch_role():
    data = json.loads(request.data)
    return user.switch_role(data)
  
##Check Driver id
@app.route('/user/check_id_match', methods=['POST'])
def check_id_match():
    data = json.loads(request.data)
    return user.check_id_match(data)

# DRIVER

## Create Driver
@app.route('/driver/createDriver/',methods = ['POST'])
def create_driver():
  data = json.loads(request.data)
  return driver.createDriver(data)


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