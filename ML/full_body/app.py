import os
import sys
import cv2
from flask import Flask, Response, render_template_string, request
import absl.logging

# Suppress TensorFlow and absl logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress TensorFlow logs
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # Disable oneDNN optimizations
os.environ['TF_LITE_USE_XNNPACK'] = '0'  # Disable TensorFlow Lite XNNPACK optimizations
absl.logging.set_verbosity(absl.logging.ERROR)  # Suppress absl logs

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import PoseDetector classes from local files
from plank import PoseDetector as PlankPoseDetector
from squat import PoseDetector as SquatPoseDetector
from lunge import PoseDetector as LungePoseDetector
from pushup import PoseDetector as PushupPoseDetector

app = Flask(__name__)

# Initialize detectors for plank, squat, lunge, and pushup
plank_detector = PlankPoseDetector()
squat_detector = SquatPoseDetector()
lunge_detector = LungePoseDetector()
pushup_detector = PushupPoseDetector()

# Initialize video capture for plank, squat, lunge, and pushup
plank_cap = cv2.VideoCapture(0)
if not plank_cap.isOpened():
    print("Error: Could not open plank camera.")
    plank_cap = None

squat_cap = cv2.VideoCapture(1) if cv2.VideoCapture(1).isOpened() else None
lunge_cap = cv2.VideoCapture(2) if cv2.VideoCapture(2).isOpened() else None
pushup_cap = cv2.VideoCapture(3) if cv2.VideoCapture(3).isOpened() else None

# Function to release all cameras
def release_cameras():
    if plank_cap and plank_cap.isOpened():
        plank_cap.release()
    if squat_cap and squat_cap.isOpened():
        squat_cap.release()
    if lunge_cap and lunge_cap.isOpened():
        lunge_cap.release()
    if pushup_cap and pushup_cap.isOpened():
        pushup_cap.release()

# Home route
@app.route('/')
def home_page():
    return render_template_string("""
    <html>
        <head>
            <title>Exercise Tracker</title>
        </head>
        <body>
            <h1>Welcome to the Exercise Tracker!</h1>
            <a href="/plank">Go to Plank Tracker</a><br>
            <a href="/squat">Go to Squat Tracker</a><br>
            <a href="/pushup">Go to Push-up Tracker</a><br>
            <a href="/lunge">Go to Lunge Tracker</a><br>
        </body>
    </html>
    """)

# Generic function to create exercise routes
def create_exercise_route(exercise_name, detector, cap):
    @app.route(f'/{exercise_name}', methods=['GET', 'POST'])
    def exercise():
        if request.method == 'POST':
            if request.form.get('action') == 'stop_video':
                if cap and cap.isOpened():
                    cap.release()
                return render_template_string(f"""
                    <html>
                        <head><title>{exercise_name.capitalize()} Exercise Tracker</title></head>
                        <body>
                            <h1>{exercise_name.capitalize()} Exercise Tracker - Camera Stopped</h1>
                            <a href="/">Go to Home Page</a>
                        </body>
                    </html>
                """)

        return render_template_string(f"""
            <html>
                <head><title>{exercise_name.capitalize()} Tracker</title></head>
                <body>
                    <h1>{exercise_name.capitalize()} Tracker</h1>
                    <form method="POST">
                        <button type="submit" name="action" value="stop_video">Stop Video Feed and Go Home</button>
                    </form>
                    <img src="{{ url_for('video_feed_{exercise_name}') }}" width="640" height="480" />
                </body>
            </html>
        """)

    @app.route(f'/video_feed_{exercise_name}')
    def video_feed():
        def generate():
            while cap and cap.isOpened():
                ret, img = cap.read()
                if not ret:
                    break
                img = detector.findPose(img, False)
                lmList = detector.findPosition(img, False)
                if lmList:
                    # Implement exercise-specific logic here
                    pass
                _, buffer = cv2.imencode('.jpg', img)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

    return exercise, video_feed

# Create routes for each exercise
plank_exercise, plank_video_feed = create_exercise_route('plank', plank_detector, plank_cap)
squat_exercise, squat_video_feed = create_exercise_route('squat', squat_detector, squat_cap)
pushup_exercise, pushup_video_feed = create_exercise_route('pushup', pushup_detector, pushup_cap)
lunge_exercise, lunge_video_feed = create_exercise_route('lunge', lunge_detector, lunge_cap)

# Cleanup on app shutdown
@app.teardown_appcontext
def teardown(exception):
    release_cameras()

# Run the app
if __name__ == "__main__":
    host = "127.0.0.1"
    port = 5000
    print(f"Flask app running at: http://{host}:{port}/")
    try:
        app.run(host=host, port=port, debug=True)
    except Exception as e:
        print(f"An error occurred: {e}")
        import traceback
        traceback.print_exc()  # Print the full traceback
    finally:
        release_cameras()