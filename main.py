from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session


app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///wellzone.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# Models

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True , nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True , nullable=False)
    name = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    workouts = db.relationship('Workout', backref='user', lazy=True)
    achievements = db.relationship('Achievement', backref='user', lazy=True)

class Trainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    experience_years = db.Column(db.Integer)
    rating = db.Column(db.Float)
    bio = db.Column(db.Text)
    specialties = db.Column(db.Text)  # Stored as comma-separated values
    certifications = db.Column(db.Text)  # Stored as comma-separated values
    profile_image = db.Column(db.String(200))

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    video_url = db.Column(db.String(200))
    tips = db.Column(db.Text)
    category = db.Column(db.String(50))
    workout_exercises = db.relationship('WorkoutExercise', backref='exercise', lazy=True)
