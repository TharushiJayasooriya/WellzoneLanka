import cv2
import mediapipe as mp
import numpy as np
import math
import time
from playsound import playsound
import os
import pygame
from datetime import datetime
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# Initialize Mediapipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

pygame.mixer.init()
CORRECTION_SOUND = ".venv/Scripts/sounds/incorrect_posture_alert.mp3"

# Calories burned per rep (approximate values)
CALORIES_PER_REP = {
    "bicep_curl": 0.32,  # ~32 calories per 100 reps
    "squat": 0.45,       # ~45 calories per 100 reps
    "pushup": 0.36       # ~36 calories per 100 reps
}

class WorkoutStats:
    def calculate_angle(a, b, c):
        """
        Calculate the angle between three points.
        Args:
            a: First point (x, y)
            b: Second point (x, y)
            c: Third point (x, y)
        Returns:
            Angle in degrees.
        """
        a = np.array(a)  # First point
        b = np.array(b)  # Middle point
        c = np.array(c)  # End point

        radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
        angle = np.abs(radians * 180.0 / np.pi)

        if angle > 180.0:
            angle = 360 - angle

        return angle

    def __init__(self):
        self.start_time = time.time()
        self.exercise_times = {"bicep_curl": 0, "squat": 0, "pushup": 0}
        self.exercise_counts = {"bicep_curl": 0, "squat": 0, "pushup": 0}
        self.calories_burned = 0
        self.last_exercise_switch = time.time()
        self.current_exercise = "bicep_curl"

    def switch_exercise(self, new_exercise):
        elapsed = time.time() - self.last_exercise_switch
        self.exercise_times[self.current_exercise] += elapsed
        self.last_exercise_switch = time.time()
        self.current_exercise = new_exercise

    def add_rep(self, exercise_type):
        self.exercise_counts[exercise_type] += 1
        self.calories_burned += CALORIES_PER_REP[exercise_type]

    def get_workout_duration(self):
        return int(time.time() - self.start_time)

    def get_exercise_time(self, exercise_type):
        if exercise_type == self.current_exercise:
            current = time.time() - self.last_exercise_switch
            return self.exercise_times[exercise_type] + current
        return self.exercise_times[exercise_type]




def get_landmark_coordinates(landmarks, landmark_point):
    """Helper function to get coordinates of a landmark"""
    return [landmarks[landmark_point].x, landmarks[landmark_point].y]

def count_bicep_curls(landmarks):
    """Count bicep curls based on arm angle"""
    shoulder = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_SHOULDER.value)
    elbow = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_ELBOW.value)
    wrist = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_WRIST.value)
    
    return calculate_angle(shoulder, elbow, wrist)

def count_squats(landmarks):
    """Count squats based on knee angle"""
    hip = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_HIP.value)
    knee = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_KNEE.value)
    ankle = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_ANKLE.value)
    
    return calculate_angle(hip, knee, ankle)

def count_pushups(landmarks):
    """Count push-ups based on elbow angle and body alignment"""
    shoulder = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_SHOULDER.value)
    elbow = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_ELBOW.value)
    wrist = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_WRIST.value)
    
    hip = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_HIP.value)
    knee = get_landmark_coordinates(landmarks, mp_pose.PoseLandmark.LEFT_KNEE.value)
    
    elbow_angle = calculate_angle(shoulder, elbow, wrist)
    body_angle = calculate_angle(shoulder, hip, knee)
    
    return elbow_angle, body_angle

def format_time(seconds):
    """Convert seconds to MM:SS format"""
    return f"{int(seconds // 60):02d}:{int(seconds % 60):02d}"

def draw_stats(image, stats, exercise_type, stage, frame_height):
    # Main exercise info
    cv2.putText(image, f'Exercise: {exercise_type.replace("_", " ").title()}', 
                (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
    cv2.putText(image, f'Reps: {stats.exercise_counts[exercise_type]}', 
                (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
    cv2.putText(image, f'Stage: {stage}', 
                (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

    # Workout statistics
    cv2.putText(image, f'Total Time: {format_time(stats.get_workout_duration())}',
                (frame_height - 200, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
    cv2.putText(image, f'Calories: {stats.calories_burned:.1f}',
                (frame_height - 200, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
    
    # Exercise times
    y_pos = 120
    for ex_type in ["bicep_curl", "squat", "pushup"]:
        time_str = format_time(stats.get_exercise_time(ex_type))
        count = stats.exercise_counts[ex_type]
        cv2.putText(image, f'{ex_type.replace("_", " ").title()}: {time_str} ({count} reps)',
                    (10, y_pos), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        y_pos += 25

    # Controls help
    cv2.putText(image, 'Controls: b-Bicep Curls, s-Squats, p-Push-ups, r-Reset, q-Quit',
                (10, frame_height - 20), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

def check_posture(exercise, landmarks):
    """
    Check if the posture is correct based on the exercise.
    Args:
        exercise: The current exercise name (e.g., "bicep_curl").
        landmarks: Landmarks detected by Mediapipe.
    Returns:
        correct_posture: Boolean indicating if the posture is correct.
    """
    correct_posture = True

    if exercise == "bicep_curl":
        # Get landmarks for shoulder, elbow, and wrist
        shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
        elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
        wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

        # Calculate angle
        angle = calculate_angle(shoulder, elbow, wrist)

        # Check angle range for correct posture
        if angle < 60 or angle > 160:
            correct_posture = False

    return correct_posture

def main():
    # Initialize video capture
    cap = cv2.VideoCapture(0)

    # Variables for exercise tracking
    exercise = "bicep_curl"  # Current exercise
    stage = None  # Stage of the exercise (e.g., "up" or "down")
    reps = 0  # Repetition counter
    start_time = time.time()  # Start time for session
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("Ignoring empty camera frame.")
            break
            
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        results = pose.process(image)
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        try:
            landmarks = results.pose_landmarks.landmark
                
                # Check posture
            correct_posture = check_posture(exercise, landmarks)

            if not correct_posture:
                # Play correction sound if posture is incorrect
                pygame.mixer.music.load(CORRECTION_SOUND)
                pygame.mixer.music.play()

            # Bicep curl logic
            if exercise == "bicep_curl":
                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]

                angle = calculate_angle(shoulder, elbow, wrist)
   
            
            elif stats.current_exercise == "bicep_curl":
                angle = count_bicep_curls(landmarks)
                if angle > 160:
                    stage = "down"
                if angle < 30 and stage == "down":
                    stage = "up"
                    stats.add_rep("bicep_curl")
                    
                
            elif stats.current_exercise == "squat":
                angle = count_squats(landmarks)
                if angle > 160:
                    stage = "up"
                if angle < 90 and stage == "up":
                    stage = "down"
                    stats.add_rep("squat")
                    reps += 1
                
            elif stats.current_exercise == "pushup":
                elbow_angle, body_angle = count_pushups(landmarks)
                if elbow_angle > 160 and 160 < body_angle < 200:
                    stage = "up"
                if elbow_angle < 90 and 160 < body_angle < 200 and stage == "up":
                    stage = "down"
                    stats.add_rep("pushup")
            
            # Draw statistics
            draw_stats(image, stats, stats.current_exercise, stage, frame.shape[0])
            
        except:
            pass
        
        # Draw pose landmarks
        mp_drawing.draw_landmarks(
            image,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
            mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
        )
        
        cv2.imshow('Exercise Tracker', image)
        
        # Controls
        key = cv2.waitKey(10) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('b'):
            stats.switch_exercise("bicep_curl")
            stage = None
        elif key == ord('s'):
            stats.switch_exercise("squat")
            stage = None
        elif key == ord('p'):
            stats.switch_exercise("pushup")
            stage = None
        elif key == ord('r'):
            stats = WorkoutStats()
            stage = None
            
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()