import datetime
from functools import wraps
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


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    duration = db.Column(db.Integer)  # in seconds
    form_accuracy = db.Column(db.Float)
    exercises = db.relationship('WorkoutExercise', backref='workout', lazy=True)

class workoutExercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey('workout.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'), nullable=False)
    sets = db.Column(db.Integer)
    reps = db.Column(db.Integer)
    weight = db.Column(db.Float)
    duration = db.Column(db.Integer)  # in seconds
    form_accuracy = db.Column(db.Float)

class Achievement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    date_achieved = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    badge_type = db.Column(db.String(50))  # e.g., streak, weight, form

# Authentication token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
            
        return f(current_user, *args, **kwargs)
    
    return decorated


# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    hashed_password = generate_password_hash(data['password'], method='sha256')
    
    new_user = User(
        username=data['username'],
        password=hashed_password,
        email=data['email'],
        name=data.get('name', '')
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully!'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = User.query.filter_by(username=data['username']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials!'}), 401
    
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, app.config['SECRET_KEY'], algorithm="HS256")
    
    return jsonify({'token': token, 'user_id': user.id, 'username': user.username, 'name': user.name})


@app.route('/api/dashboard', methods=['GET'])
@token_required
def get_dashboard(current_user):
    # Get data for the dashboard
    
    # Calculate weekly goal progress
    today = datetime.datetime.utcnow()
    start_of_week = today - datetime.timedelta(days=today.weekday())
    end_of_week = start_of_week + datetime.timedelta(days=6)
    
    workouts_this_week = Workout.query.filter(
        Workout.user_id == current_user.id,
        Workout.date >= start_of_week,
        Workout.date <= end_of_week
    ).count()
    
    # Assuming weekly goal is 14 workouts
    weekly_goal_percentage = min(100, int((workouts_this_week / 14) * 100))
    
    # Get achievements
    achievements = Achievement.query.filter_by(user_id=current_user.id).all()
    achievements_data = [{'name': a.name, 'description': a.description, 'badge_type': a.badge_type} 
                        for a in achievements]
    
    # Get daily progress for the week
    daily_progress = []
    for i in range(7):
        day = start_of_week + datetime.timedelta(days=i)
        day_name = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]
        
        # Count workouts for this day
        workouts_count = Workout.query.filter(
            Workout.user_id == current_user.id,
            Workout.date >= day,
            Workout.date < day + datetime.timedelta(days=1)
        ).count()
        
        # Calculate average form accuracy for the day
        form_accuracy = db.session.query(db.func.avg(Workout.form_accuracy)).filter(
            Workout.user_id == current_user.id,
            Workout.date >= day,
            Workout.date < day + datetime.timedelta(days=1)
        ).scalar() or 0
        
        # Add to progress data
        daily_progress.append({
            'day': day_name,
            'value': form_accuracy * 100  # Converting to percentage
        })
    
    # Calculate trainer rating based on workout performance
    # This is a placeholder - actual implementation would be more complex
    rating = 4.8
    
    return jsonify({
        'weekly_goal': weekly_goal_percentage,
        'workouts_this_week': workouts_this_week,
        'achievements_count': len(achievements_data),
        'rating': rating,
        'daily_progress': daily_progress,
        'recent_achievements': achievements_data[:3]
    })

def get_trainers(current_user):
    # Get all trainers
    trainers = Trainer.query.all()
    
    # Get user's favorite trainers
    favorite_trainers = current_user.favorite_trainers
    
    # Prepare data
    trainers_data = []
    for trainer in trainers:
        trainers_data.append({
            'id': trainer.id,
            'name': trainer.name,
            'experience_years': trainer.experience_years,
            'rating': trainer.rating,
            'bio': trainer.bio,
            'specialties': trainer.specialties.split(',') if trainer.specialties else [],
            'certifications': trainer.certifications.split(',') if trainer.certifications else [],
            'profile_image': trainer.profile_image
        })
    
    return jsonify(trainers_data)


@app.route('/api/exercises', methods=['GET'])
@token_required
def get_exercises(current_user):
    exercises = Exercise.query.all()

    exercises_data = []
    for exercise in exercises:
        exercises_data.append({
            'id': exercise.id,
            'name': exercise.name,
            'description': exercise.description,
            'video_url': exercise.video_url,
            'tips': exercise.tips.split('\n') if exercise.tips else [],
            'category': exercise.category
        })
    
    return jsonify(exercises_data)