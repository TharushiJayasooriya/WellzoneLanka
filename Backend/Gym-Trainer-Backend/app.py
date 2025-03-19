from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB connection
mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/wellzone')
client = MongoClient(mongo_uri)
db = client.get_database('wellzone')

# Collections
users = db.users
appointments = db.appointments
video_sessions = db.video_sessions


# Helper function to convert ObjectId to string
def json_serialize(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")



# Routes
@app.route('/api/users', methods=['GET'])
def get_users():
    user_list = list(users.find())
    return jsonify({
        'users': json.loads(json.dumps(user_list, default=json_serialize))
    })

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.json
    required_fields = ['name', 'email', 'password', 'role']
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Check if user already exists
    if users.find_one({'email': data['email']}):
        return jsonify({'error': 'User with this email already exists'}), 409
    
    # Create user
    user_id = users.insert_one({
        'name': data['name'],
        'email': data['email'],
        'password': data['password'],  # In production, hash this password
        'role': data['role'],
        'created_at': datetime.now()
    }).inserted_id
    
    return jsonify({
        'success': True,
        'user_id': str(user_id)
    }), 201

@app.route('/api/appointments', methods=['GET'])
def get_appointments():
    user_id = request.args.get('user_id')
    query = {}
    
    if user_id:
        query['user_id'] = user_id
    
    appointment_list = list(appointments.find(query))
    return jsonify({
        'appointments': json.loads(json.dumps(appointment_list, default=json_serialize))
    })

@app.route('/api/appointments', methods=['POST'])
def create_appointment():
    data = request.json
    required_fields = ['user_id', 'trainer_id', 'date', 'time']
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Create appointment
    appointment_id = appointments.insert_one({
        'user_id': data['user_id'],
        'trainer_id': data['trainer_id'],
        'date': data['date'],
        'time': data['time'],
        'notes': data.get('notes', ''),
        'status': 'pending',
        'created_at': datetime.now()
    }).inserted_id
    
    return jsonify({
        'success': True,
        'appointment_id': str(appointment_id)
    }), 201

@app.route('/api/appointments/<appointment_id>', methods=['PATCH'])
def update_appointment(appointment_id):
    data = request.json
    
    # Update appointment
    result = appointments.update_one(
        {'_id': ObjectId(appointment_id)},
        {'$set': data}
    )
    
    if result.modified_count == 0:
        return jsonify({'error': 'Appointment not found or no changes made'}), 404
    
    return jsonify({
        'success': True,
        'message': 'Appointment updated successfully'
    })

@app.route('/api/appointments/<appointment_id>', methods=['DELETE'])
def cancel_appointment(appointment_id):
    # Cancel appointment (soft delete by updating status)
    result = appointments.update_one(
        {'_id': ObjectId(appointment_id)},
        {'$set': {'status': 'cancelled'}}
    )
    
    if result.modified_count == 0:
        return jsonify({'error': 'Appointment not found or already cancelled'}), 404
    
    return jsonify({
        'success': True,
        'message': 'Appointment cancelled successfully'
    })






