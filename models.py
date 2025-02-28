from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    "User model for authentication and profile information"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    name = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    workouts = db.relationship('Workout', backref='user', lazy=True)
    achievements = db.relationship('Achievement', backref='user', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'name': self.name,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }
    
class Trainer(db.Model):
    """Trainer model containing profile and certification information"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    experience_years = db.Column(db.Integer)
    rating = db.Column(db.Float)
    bio = db.Column(db.Text)
    specialties = db.Column(db.Text)  # Stored as comma-separated values
    certifications = db.Column(db.Text)  # Stored as comma-separated values
    profile_image = db.Column(db.String(200))


    def to_dict(self):
            return {
                'id': self.id,
                'name': self.name,
                'experience_years': self.experience_years,
                'rating': self.rating,
                'bio': self.bio,
                'specialties': self.specialties.split(',') if self.specialties else [],
                'certifications': self.certifications.split(',') if self.certifications else [],
                'profile_image': self.profile_image
            }
    


