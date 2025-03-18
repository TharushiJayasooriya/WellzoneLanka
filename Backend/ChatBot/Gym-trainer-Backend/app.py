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
