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




