from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os
import json
import datetime
from functools import wraps
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Secret key for JWT
SECRET_KEY = os.environ.get('SECRET_KEY', 'your_secret_key')

# Get environment variables
SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
MONGO_URI = os.getenv('MONGODB_URI')
MONGO_DB = os.getenv('MONGODB_DB')

# MongoDB Connection
client = MongoClient(MONGO_URI)
db = client.get_database(MONGO_DB)

# Collections
users = db.users
appointments = db.appointments
video_sessions = db.video_sessions

# Helper function to serialize ObjectId and datetime
def json_serialize(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, datetime.datetime):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")


# Authentication Middleware (JWT Verification)
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.user_id = data['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        
        return f(*args, **kwargs)
    
    return decorated


# User Registration
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
    
    # Hash password before storing
    hashed_password = generate_password_hash(data['password'])
    
    # Create user
    user_id = users.insert_one({
        'name': data['name'],
        'email': data['email'],
        'password': hashed_password,
        'role': data['role'],
        'created_at': datetime.datetime.now()
    }).inserted_id
    
    return jsonify({'success': True, 'user_id': str(user_id)}), 201


# User Login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = users.find_one({'email': data['email']})
    
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Generate JWT token
    token = jwt.encode(
        {'user_id': str(user['_id']), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)},
        SECRET_KEY,
        algorithm='HS256'
    )
    
    return jsonify({'token': token})


# Get Users (Protected Route)
@app.route('/api/users', methods=['GET'])
@token_required
def get_users():
    user_list = list(users.find())
    return jsonify({'users': json.loads(json.dumps(user_list, default=json_serialize))})


# Get Appointments (Protected Route)
@app.route('/api/appointments', methods=['GET'])
@token_required
def get_appointments():
    user_id = request.args.get('user_id')
    query = {}
    
    if user_id:
        query['user_id'] = user_id
    
    appointment_list = list(appointments.find(query))
    return jsonify({'appointments': json.loads(json.dumps(appointment_list, default=json_serialize))})


# Create Appointment (Protected Route)
@app.route('/api/appointments', methods=['POST'])
@token_required
def create_appointment():
    data = request.json
    required_fields = ['user_id', 'trainer_id', 'date', 'time']
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    appointment_id = appointments.insert_one({
        'user_id': data['user_id'],
        'trainer_id': data['trainer_id'],
        'date': data['date'],
        'time': data['time'],
        'notes': data.get('notes', ''),
        'status': 'pending',
        'created_at': datetime.datetime.now()
    }).inserted_id
    
    return jsonify({'success': True, 'appointment_id': str(appointment_id)}), 201


# Update Appointment (Protected Route)
@app.route('/api/appointments/<appointment_id>', methods=['PATCH'])
@token_required
def update_appointment(appointment_id):
    data = request.json
    result = appointments.update_one({'_id': ObjectId(appointment_id)}, {'$set': data})
    
    if result.modified_count == 0:
        return jsonify({'error': 'Appointment not found or no changes made'}), 404
    
    return jsonify({'success': True, 'message': 'Appointment updated successfully'})


# Cancel Appointment (Protected Route)
@app.route('/api/appointments/<appointment_id>', methods=['DELETE'])
@token_required
def cancel_appointment(appointment_id):
    result = appointments.update_one(
        {'_id': ObjectId(appointment_id)},
        {'$set': {'status': 'cancelled'}}
    )
    
    if result.modified_count == 0:
        return jsonify({'error': 'Appointment not found or already cancelled'}), 404
    
    return jsonify({'success': True, 'message': 'Appointment cancelled successfully'})


# Create Video Session (Protected Route)
@app.route('/api/video-sessions', methods=['POST'])
@token_required
def create_video_session():
    data = request.json
    required_fields = ['appointment_id', 'host_id']
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    session_id = video_sessions.insert_one({
        'appointment_id': data['appointment_id'],
        'host_id': data['host_id'],
        'participants': data.get('participants', []),
        'status': 'created',
        'created_at': datetime.datetime.now()
    }).inserted_id
    
    return jsonify({
        'success': True,
        'session_id': str(session_id),
        'join_url': f'/video-session/{session_id}',
        'token': 'mock-token-' + str(session_id)
    }), 201


# Get Video Session (Protected Route)
@app.route('/api/video-sessions/<session_id>', methods=['GET'])
@token_required
def get_video_session(session_id):
    session = video_sessions.find_one({'_id': ObjectId(session_id)})
    
    if not session:
        return jsonify({'error': 'Video session not found'}), 404
    
    return jsonify({'session': json.loads(json.dumps(session, default=json_serialize))})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5001)))
