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
