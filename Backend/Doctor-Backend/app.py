from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
from dotenv import load_dotenv
import os
import bcrypt

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Security: Ensure JWT Secret Key is Set
if not os.getenv("JWT_SECRET_KEY"):
    raise ValueError("Missing JWT_SECRET_KEY in environment variables!")

app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

# MongoDB Connection
mongo_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/gym_trainer_app')
client = MongoClient(mongo_uri)
db = client.get_database(os.getenv('MONGODB_DB', 'gym_trainer_appoinments'))

# Collections
doctors = db.doctors
doctorAppoinments = db.doctorAppoinments
appointments = db.appointments

# Ensure email is indexed for faster lookups
doctors.create_index("email", unique=True)

# Helper function to serialize MongoDB ObjectId and datetime
def json_serialize(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, datetime):
        return obj.isoformat()
    return obj

# 🔹 Doctor Registration (POST)
@app.route('/api/auth/doctor-signup', methods=['POST'])
def register_doctor():
    data = request.json
    required_fields = ['name', 'email', 'password', 'specialization']
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    if doctors.find_one({'email': data['email']}):
        return jsonify({'error': 'Email already registered'}), 409

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    doctor_id = db.doctors.insert_one({
        '_id': ObjectId(),
        'name': data['name'],
        'email': data['email'],
        'password': hashed_password,
        'role': data['role'],
        'created_at': datetime.now()
    }).inserted_id

    return jsonify({'success': True, '_id': str(doctor_id)}), 201

# 🔹 Trainer Login (POST)
@app.route('/api/auth/doctor-login', methods=['POST'])
def login_doctor():
    data = request.json
    doctor = db.doctors.find_one({'email': data['email']})

    if not doctor or not bcrypt.checkpw(data['password'].encode('utf-8'), doctor['password'].encode('utf-8')):
        return jsonify({'error': 'Invalid email or password'}), 401

    access_token = create_access_token(identity=str(doctor['_id']))
    
    return jsonify({
        'success': True,
        'token': access_token,
        'doctor': {
            'id': str(doctor['_id']),
            'firstName': doctor['firstName'],
            'lastName': doctor['lastName'],
            'specialization': doctor['specialization']
        }
    }), 200


# 🔹 Get Past Clients (GET)
@app.route('/api/trainers/<trainer_id>/clients', methods=['GET'])
@jwt_required()
def get_past_clients(trainer_id):
    if str(trainer_id) != get_jwt_identity():
        return jsonify({'error': 'Unauthorized'}), 403

    past_clients = appointments.find({'trainer_id': trainer_id}, {'client_id': 1})
    clients = list({json_serialize(c['client_id']) for c in past_clients})

    return jsonify({'clients': clients})

# 🔹 Get Today's Appointments (GET)
@app.route('/api/trainers/<trainer_id>/appointments/today', methods=['GET'])
@jwt_required()
def get_today_appointments(trainer_id):
    if str(trainer_id) != get_jwt_identity():
        return jsonify({'error': 'Unauthorized'}), 403

    today = datetime.now().strftime('%Y-%m-%d')
    today_appointments = list(appointments.find({'trainer_id': trainer_id, 'date': today}))

    serialized_appointments = [{key: json_serialize(value) for key, value in appointment.items()} for appointment in today_appointments]

    return jsonify({'appointments': serialized_appointments})

# 🔹 Create a Video Session (POST)
@app.route('/api/trainers/<trainer_id>/video-session', methods=['POST'])
@jwt_required()
def create_video_session(trainer_id):
    if str(trainer_id) != get_jwt_identity():
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    required_fields = ['appointment_id', 'client_id']

    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    session_id = ObjectId()
    join_url = f"https://your-video-api.com/join/{session_id}"

    return jsonify({'success': True, 'session_id': str(session_id), 'join_url': join_url}), 201

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.getenv('PORT', 5000)))
