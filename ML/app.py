import os
import sys
import cv2
import numpy as np
from flask import Flask, Response, jsonify, render_template_string, request
import absl.logging
import tensorflow as tf
import math

# Suppress TensorFlow Lite and TensorFlow logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress all logs (info, warnings, errors)
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # Disable oneDNN optimizations
os.environ['TF_LITE_USE_XNNPACK'] = '0'  # Disable TensorFlow Lite XNNPACK optimizations

# Suppress absl log warnings
absl.logging.set_verbosity(absl.logging.FATAL)  # Only fatal errors will be shown

# Add the path of plank.py and squat.py
plank_path = r"./plank.py"
squat_path = r"./squat.py"
lunge_path = r"./lunge.py"
pushup_path = r"./pushup.py"
sys.path.append(plank_path)
sys.path.append(squat_path)
sys.path.append(lunge_path)
sys.path.append(pushup_path)

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
squat_cap = cv2.VideoCapture(1)
lunge_cap = cv2.VideoCapture(2)
pushup_cap = cv2.VideoCapture(3)

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

@app.route('/plank', methods=['GET', 'POST'])
def plank():
    if request.method == 'POST':
        if request.form.get('action') == 'stop_video':
            plank_cap.release()
            return render_template_string("""
                <html>
                    <head><title>Plank Exercise Tracker</title></head>
                    <body>
                        <h1>Plank Exercise Tracker - Camera Stopped</h1>
                        <a href="/">Go to Home Page</a>
                    </body>
                </html>
            """)

        return render_template_string("""
            <html>
                <head><title>Plank Tracker</title></head>
                <body>
                    <h1>Plank Tracker</h1>
                    <form method="POST">
                        <button type="submit" name="action" value="stop_video">Stop Video Feed and Go Home</button>
                    </form>
                    <img src="{{ url_for('video_feed_plank') }}" width="640" height="480" />
                </body>
            </html>
        """)

    return render_template_string("""
        <html>
            <head><title>Plank Tracker</title></head>
            <body>
                <h1>Plank Tracker</h1>
                <form method="POST">
                    <button type="submit" name="action" value="stop_video">Stop Video Feed and Go Home</button>
                </form>
                <img src="{{ url_for('video_feed_plank') }}" width="640" height="480" />
            </body>
        </html>
    """)

@app.route('/video_feed_plank')
def video_feed_plank():
    def generate():
        while True:
            ret, img = plank_cap.read()
            if not ret:
                break
            img = plank_detector.findPose(img, False)
            lmList = plank_detector.findPosition(img, False)
            if lmList:
                # Implement plank logic here, similar to the plank file
                pass
            _, buffer = cv2.imencode('.jpg', img)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/squat', methods=['GET', 'POST'])
def squat():
    if request.method == 'POST':
        if request.form.get('action') == 'stop_video':
            squat_cap.release()
            return render_template_string("""
                <html>
                    <head><title>Squat Exercise Tracker</title></head>
                    <body>
                        <h1>Squat Exercise Tracker - Camera Stopped</h1>
                        <a href="/">Go to Home Page</a>
                    </body>
                </html>
            """)

        return render_template_string("""
            <html>
                <head><title>Squat Tracker</title></head>
                <body>
                    <h1>Squat Tracker</h1>
                    <form method="POST">
                        <button type="submit" name="action" value="stop_video">Stop Video Feed and Go Home</button>
                    </form>
                    <img src="{{ url_for('video_feed_squat') }}" width="640" height="480" />
                </body>
            </html>
        """)

    return render_template_string("""
        <html>
            <head><title>Squat Tracker</title></head>
            <body>
                <h1>Squat Tracker</h1>
                <form method="POST">
                    <button type="submit" name="action" value="stop_video">Stop Video Feed and Go Home</button>
                </form>
                <img src="{{ url_for('video_feed_squat') }}" width="640" height="480" />
            </body>
        </html>
    """)

@app.route('/video_feed_squat')
def video_feed_squat():
    def generate():
        while True:
            ret, img = squat_cap.read()
            if not ret:
                break
            img = squat_detector.findPose(img, False)
            lmList = squat_detector.findPosition(img, False)
            if lmList:
                # Implement squat logic here, similar to the squat file
                pass
            _, buffer = cv2.imencode('.jpg', img)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/pushup', methods=['GET', 'POST'])
def pushup():
    if request.method == 'POST':
        if request.form.get('action') == 'stop_video':
            pushup_cap.release()
            return render_template_string("""
                <html>
                    <head><title>Pushup Exercise Tracker</title></head>
                    <body>
                        <h1>Pushup Exercise Tracker - Camera Stopped</h1>
                        <a href="/">Go to Home Page</a>
                    </body>
                </html>
            """)

        return render_template_string("""
            <html>
                <head><title>Pushup Tracker</title></head>
                <body>
                    <h1>Pushup Tracker</h1>
                    <form method="POST">
                        <button type="submit" name="action" value="stop_video">Stop Video Feed and Go Home</button>
                    </form>
                    <img src="{{ url_for('video_feed_pushup') }}" width="640" height="480" />
                </body>
            </html>
        """)

    return render_template_string("""
        <html>
            <head><title>Pushup Tracker</title></head>
            <body>
                <h1>Pushup Tracker</h1>
                <form method="POST">
                    <button type="submit" name="action" value="stop_video">Stop Video Feed and Go Home</button>
                </form>
                <img src="{{ url_for('video_feed_pushup') }}" width="640" height="480" />
            </body>
        </html>
    """)

@app.route('/video_feed_pushup')
def video_feed_pushup():
    def generate():
        while True:
            ret, img = pushup_cap.read()
            if not ret:
                break
            img = pushup_detector.findPose(img, False)
            lmList = pushup_detector.findPosition(img, False)
            if lmList:
                # Implement pushup logic here, similar to the pushup file
                pass
            _, buffer = cv2.imencode('.jpg', img)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/lunge', methods=['GET', 'POST'])
def lunge():
    if request.method == 'POST':
        if request.form.get('action') == 'stop_video':
            lunge_cap.release()
            return render_template_string("""
                <html>
                    <head><title>Lunge Exercise Tracker</title></head>
                    <body>
                        <h1>Lunge Exercise Tracker - Camera Stopped</h1>
                        <a href="/">Go to Home Page</a>
                    </body>
                </html>
            """)

        return render_template_string("""
            <html>
                <head><title>Lunge Tracker</title></head>
                <body>
                    <h1>Lunge Tracker</h1>
                    <form method="POST">
                        <button type="submit" name="action" value="stop_video">Stop Video Feed and Go Home</button>
                    </form>
                    <img src="{{ url_for('video_feed_lunge') }}" width="640" height="480" />
                </body>
            </html>
        """)

    return render_template_string("""
        <html>
            <head><title>Lunge Tracker</title></head>
            <body>
                <h1>Lunge Tracker</h1>
                <form method="POST">
                    <button type="submit" name="action" value="stop_video">Stop Video Feed and Go Home</button>
                </form>
                <img src="{{ url_for('video_feed_lunge') }}" width="640" height="480" />
            </body>
        </html>
    """)

@app.route('/video_feed_lunge')
def video_feed_lunge():
    def generate():
        while True:
            ret, img = lunge_cap.read()
            if not ret:
                break
            img = lunge_detector.findPose(img, False)
            lmList = lunge_detector.findPosition(img, False)
            if lmList:
                # Implement lunge logic here, similar to the lunge file
                pass
            _, buffer = cv2.imencode('.jpg', img)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    host = "127.0.0.1"
    port = 5000
    print(f"Flask app running at: http://{host}:{port}/")
    app.run(host=host, port=port, debug=True)
