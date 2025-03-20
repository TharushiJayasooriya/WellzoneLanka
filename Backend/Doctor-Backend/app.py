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
CORS(app)
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "supersecretkey")  # Change this in production
jwt = JWTManager(app)

# MongoDB connection
mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/wellzone')
client = MongoClient(mongo_uri)
db = client.get_database('wellzone')

# Collections
doctors = db.doctors
appointments = db.appointments

# Helper function to convert ObjectId to string
def json_serialize(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, datetime):
        return obj.isoformat()
    return obj

# 🔹 Doctor Registration (POST)
@app.route('/api/doctors/register', methods=['POST'])
def register_doctor():
    data = request.json
    required_fields = ['name', 'email', 'password', 'specialization']
    
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    if doctors.find_one({'email': data['email']}):
        return jsonify({'error': 'Email already registered'}), 409

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')  # Decode to string

    doctor_id = doctors.insert_one({
        'name': data['name'],
        'email': data['email'],
        'password': hashed_password,
        'licenseNumber': data.get('licenseNumber', ''),  # Handle missing optional fields
        'role': data.get('role', 'doctor'),
        'created_at': datetime.now()
    }).inserted_id

    return jsonify({'success': True, 'doctor_id': str(doctor_id)}), 201

# 🔹 Doctor Login (POST)
@app.route('/api/doctors/login', methods=['POST'])
def login_doctor():
    data = request.json
    doctor = doctors.find_one({'email': data['email']})

    if not doctor or not bcrypt.checkpw(data['password'].encode('utf-8'), doctor['password']):
        return jsonify({'error': 'Invalid email or password'}), 401

    access_token = create_access_token(identity=str(doctor['_id']))
    return jsonify({
        'success': True,
        'token': access_token,
        'doctor': {'id': str(doctor['_id']), 'name': doctor['name'], 'hideChatbot': True}
    }), 200

# 🔹 Get past patients (GET)
@app.route('/api/doctors/<doctor_id>/patients', methods=['GET'])
@jwt_required()
def get_past_patients(doctor_id):
    if doctor_id != get_jwt_identity():
        return jsonify({'error': 'Unauthorized'}), 403

    past_patients = appointments.find({'doctor_id': doctor_id}, {'patient_id': 1})
    patients = list({json_serialize(p['patient_id']) for p in past_patients})

    return jsonify({'patients': patients})

# 🔹 Get today’s appointments (GET)
@app.route('/api/doctors/<doctor_id>/appointments/today', methods=['GET'])
@jwt_required()
def get_today_appointments(doctor_id):
    if doctor_id != get_jwt_identity():
        return jsonify({'error': 'Unauthorized'}), 403

    today = datetime.now().strftime('%Y-%m-%d')
    today_appointments = list(appointments.find({'doctor_id': doctor_id, 'date': today}))

    # Serialize each appointment
    serialized_appointments = [json_serialize(appointment) for appointment in today_appointments]

    return jsonify({'appointments': serialized_appointments})

# 🔹 Create a Video Session (POST)
@app.route('/api/doctors/<doctor_id>/video-session', methods=['POST'])
@jwt_required()
def create_video_session(doctor_id):
    if doctor_id != get_jwt_identity():
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    required_fields = ['appointment_id', 'patient_id']

    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing field: {field}'}), 400

    # Mock integration with the purchased video API
    session_id = ObjectId()
    join_url = f"https://your-video-api.com/join/{session_id}"  # TODO: Replace with actual video API

    return jsonify({'success': True, 'session_id': str(session_id), 'join_url': join_url}), 201

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.getenv('PORT', 5000)))