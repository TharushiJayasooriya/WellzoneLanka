# import os
# import sys
# import cv2
# import numpy as np
# from flask import Flask, Response, jsonify, render_template_string, request
# import absl.logging
# import tensorflow as tf

# # Suppress TensorFlow and absl logging
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
# absl.logging.set_verbosity(absl.logging.FATAL)

# # Import modules from your structured folders
# sys.path.append("./full_body")
# sys.path.append("./back_pain")

# from full_body.pushup import PoseDetector  # Push-up module
# # from full_body.squat import SquatDetector  # Squat module
# # from back_pain.catcow import CatCowExercise  # Back pain module

# app = Flask(__name__)

# cap = cv2.VideoCapture(0)
# pose_detector = PoseDetector()
# squat_detector = SquatDetector()
# catcow_exercise = CatCowExercise()

# # Home Route
# @app.route('/')
# def home():
#     return render_template_string("""
#     <html>
#         <head><title>Exercise Tracker</title></head>
#         <body>
#             <h1>Exercise Tracker</h1>
#             <a href="/pushup">Pushup Tracker</a><br>
#             <a href="/squat">Squat Tracker</a><br>
#             <a href="/catcow">Cat-Cow Exercise</a><br>
#         </body>
#     </html>
#     """)

# # Push-up Route
# @app.route('/pushup')
# def pushup():
#     return render_template_string("""
#     <html>
#         <head><title>Pushup Tracker</title></head>
#         <body>
#             <h1>Pushup Tracker</h1>
#             <img src="{{ url_for('video_feed', exercise='pushup') }}" width="640" height="480"/>
#         </body>
#     </html>
#     """)

# # Squat Route
# # @app.route('/squat')
# # def squat():
# #     return render_template_string("""
# #     <html>
# #         <head><title>Squat Tracker</title></head>
# #         <body>
# #             <h1>Squat Tracker</h1>
# #             <img src="{{ url_for('video_feed', exercise='squat') }}" width="640" height="480"/>
# #         </body>
# #     </html>
# #     """)

# # # Cat-Cow Route
# # @app.route('/catcow')
# # def catcow():
# #     return render_template_string("""
# #     <html>
# #         <head><title>Cat-Cow Exercise</title></head>
# #         <body>
# #             <h1>Cat-Cow Exercise</h1>
# #             <img src="{{ url_for('video_feed', exercise='catcow') }}" width="640" height="480"/>
# #         </body>
# #     </html>
# #     """)

# # Video Feed Route (Handles all exercises)
# @app.route('/video_feed/<exercise>')
# def video_feed(exercise):
#     def generate():
#         while True:
#             ret, img = cap.read()
#             if not ret:
#                 break

#             if exercise == "pushup":
#                 img = pose_detector.findPose(img, False)
#             elif exercise == "squat":
#                 img = squat_detector.detectSquat(img)
#             elif exercise == "catcow":
#                 img = catcow_exercise.detectCatCow(img)

#             _, buffer = cv2.imencode('.jpg', img)
#             frame = buffer.tobytes()

#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

#     return Response(generate(), mimetype='multipart/x-mixed-replace; boundary=frame')

# # Stop Camera Route
# @app.route('/stop_camera')
# def stop_camera():
#     cap.release()
#     return jsonify({"status": "camera stopped"})

# # Start Flask Server
# if __name__ == "__main__":
#     app.run(debug=True)
