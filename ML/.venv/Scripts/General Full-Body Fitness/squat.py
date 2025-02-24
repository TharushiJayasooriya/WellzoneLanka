import cv2
import mediapipe as mp
import math
import numpy as np

class PoseDetector:
    def __init__(self, mode=False, complexity=1, smooth_landmarks=True,
                 enable_segmentation=False, smooth_segmentation=True,
                 detectionCon=0.5, trackCon=0.5):
        # Initialize PoseDetector with various options for pose estimation
        self.mode = mode
        self.complexity = complexity
        self.smooth_landmarks = smooth_landmarks
        self.enable_segmentation = enable_segmentation
        self.smooth_segmentation = smooth_segmentation
        self.detectionCon = detectionCon
        self.trackCon = trackCon

        # Load MediaPipe drawing utilities and pose model
        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(self.mode, self.complexity, self.smooth_landmarks,
                                     self.enable_segmentation, self.smooth_segmentation,
                                     self.detectionCon, self.trackCon)

    def findPose(self, img, draw=True):
        # Detect pose landmarks in the image
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert image to RGB
        self.results = self.pose.process(imgRGB)  # Process the image to detect poses

        # Draw pose landmarks on the image if found
        if self.results.pose_landmarks:
            if draw:
                self.mpDraw.draw_landmarks(img, self.results.pose_landmarks,
                                           self.mpPose.POSE_CONNECTIONS)
        return img

    def findPosition(self, img, draw=True):
        # Find and return the list of pose landmarks
        self.lmList = []
        if self.results.pose_landmarks:
            for id, lm in enumerate(self.results.pose_landmarks.landmark):
                h, w, c = img.shape
                cx, cy, cz = int(lm.x * w), int(lm.y * h), lm.z
                self.lmList.append([id, cx, cy, cz])
                if draw:
                    cv2.circle(img, (cx, cy), 5, (255, 0, 0), cv2.FILLED)
        return self.lmList

    def findAngle(self, img, p1, p2, p3, draw=True):
        # Get 3D coordinates of the points
        x1, y1, z1 = self.lmList[p1][1:]
        x2, y2, z2 = self.lmList[p2][1:]
        x3, y3, z3 = self.lmList[p3][1:]

        # Compute vectors
        A = np.array([x1 - x2, y1 - y2, z1 - z2])
        B = np.array([x3 - x2, y3 - y2, z3 - z2])

        # Calculate cosine of the angle using dot product
        dot_product = np.dot(A, B)
        magnitude_A = np.linalg.norm(A)
        magnitude_B = np.linalg.norm(B)
        # Calculate the angle in degrees
        angle = math.degrees(np.arccos(dot_product / (magnitude_A * magnitude_B)))
    
        if angle < 0:
            angle += 360
        elif angle > 180:
            angle = 360 - angle

        # Draw the landmarks and angles
        if draw:
            cv2.line(img, (x1, y1), (x2, y2), (255, 255, 255), 3)
            cv2.line(img, (x3, y3), (x2, y2), (255, 255, 255), 3)

            cv2.circle(img, (x1, y1), 5, (0, 0, 255), cv2.FILLED)
            cv2.circle(img, (x1, y1), 15, (0, 0, 255), 2)
            cv2.circle(img, (x2, y2), 5, (0, 0, 255), cv2.FILLED)
            cv2.circle(img, (x2, y2), 15, (0, 0, 255), 2)
            cv2.circle(img, (x3, y3), 5, (0, 0, 255), cv2.FILLED)
            cv2.circle(img, (x3, y3), 15, (0, 0, 255), 2)

            cv2.putText(img, str(int(angle)), (x2 - 50, y2 + 50),
                        cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 2)
        return angle


def main():
     # Initialize webcam capture
    cap = cv2.VideoCapture(0)
    detector = PoseDetector()
    count = 0
    direction = 0
    form = 0
    feedback = "Fix Form"

    while cap.isOpened():
        ret, img = cap.read()  # Read frame from webcam
        if not ret:
            feedback = "Should be connected to the web camera (Check if the camera is on)"
            cv2.putText(img, feedback, (10, 30), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 0, 255), 2)
            cv2.waitKey(1)
            break

        elbow=shoulder=knee=ankle=hip=0

        img = detector.findPose(img, False)  # Detect pose without drawing
        lmList = detector.findPosition(img, False)  # Get landmark positions

        if len(lmList) != 0:
            # Determine user orientation
            left_shoulder_x = lmList[11][1]  # x-coordinate of left shoulder
            right_shoulder_x = lmList[12][1]  # x-coordinate of right shoulder

            if left_shoulder_x < right_shoulder_x:
                # Calculate angles for form validation - User is facing the webcam or slightly sideways
                left_elbow = detector.findAngle(img, 11, 13, 15)  # Left Elbow angle
                right_elbow = detector.findAngle(img, 12, 14, 16)  # Right Elbow angle
                left_shoulder = detector.findAngle(img, 13, 11, 23)  # Left Shoulder angle
                right_shoulder = detector.findAngle(img, 14, 12, 24)  # Right Shoulder angle
                left_hip = detector.findAngle(img, 11, 23, 25)  # Left Hip angle
                right_hip = detector.findAngle(img, 12, 24, 26)  # Right Hip angle
                left_knee = detector.findAngle(img, 25, 23, 27)  # Left Knee angle
                right_knee = detector.findAngle(img, 26, 24, 28)  # Right Knee angle
                left_ankle = detector.findAngle(img, 27, 29, 31)  # Left Ankle angle
                right_ankle = detector.findAngle(img, 28, 30, 32)  # Right Ankle angle
            else:
                # User is facing away or sideways (swap left and right landmarks)
                left_elbow = detector.findAngle(img, 12, 14, 16)  # Right Elbow angle (now considered left)
                right_elbow = detector.findAngle(img, 11, 13, 15)  # Left Elbow angle (now considered right)
                left_shoulder = detector.findAngle(img, 14, 12, 24)  # Right Shoulder angle (now considered left)
                right_shoulder = detector.findAngle(img, 13, 11, 23)  # Left Shoulder angle (now considered right)
                left_hip = detector.findAngle(img, 12, 24, 26)  # Right Hip angle (now considered left)
                right_hip = detector.findAngle(img, 11, 23, 25)  # Left Hip angle (now considered right)
                left_knee = detector.findAngle(img, 26, 24, 28)  # Right Knee angle (now considered left)
                right_knee = detector.findAngle(img, 25, 23, 27)  # Left Knee angle (now considered right)
                left_ankle = detector.findAngle(img, 28, 30, 32)  # Right Ankle angle (now considered left)
                right_ankle = detector.findAngle(img, 27, 29, 31)  # Left Ankle angle (now considered right)

            # Use the average of left and right angles for push-up tracking
            elbow = (left_elbow + right_elbow) / 2
            shoulder = (left_shoulder + right_shoulder) / 2
            hip = (left_hip + right_hip) / 2
            knee = (left_knee + right_knee) / 2
            ankle = (left_ankle + right_ankle) / 2

            # Combine elbow, shoulder, and hip angles into a single metric
            combined_angle = (0.5 * knee) + (0.3 * hip) + (0.2 * ankle)  #A weighted average of the elbow, shoulder, and hip angles is calculated to represent the overall push-up form

            # Add level checks for form (Beginner, Intermediate, Expert)
            if knee > 80 and hip > 80 and ankle > 80:
                form = "Beginner"
            elif knee > 60 and hip > 60 and ankle > 60:
                form = "Intermediate"
            elif knee > 40 and hip > 40 and ankle > 40:
                form = "Expert"
            else:
                form = "Incorrect"

            # Map combined angle to push-up percentage and bar position based on form level
            if form == "Beginner":
                # Beginner level: Combined angle range 130° to 160°
                per = np.interp(combined_angle, (130, 160), (0, 100))
                bar = np.interp(combined_angle, (130, 160), (380, 50))
            elif form == "Intermediate":
                # Intermediate level: Combined angle range 100° to 130°
                per = np.interp(combined_angle, (100, 130), (0, 100))
                bar = np.interp(combined_angle, (100, 130), (380, 50))
            elif form == "Expert":
                # Expert level: Combined angle range 90° to 100°
                per = np.interp(combined_angle, (90, 100), (0, 100))
                bar = np.interp(combined_angle, (90, 100), (380, 50))
            else:
                # Incorrect form: No progress
                per = 0
                bar = 380


            # Check for proper squat position and provide detailed feedback
            if form == "Beginner" or form == "Intermediate" or form == "Expert":
                if bar <= 50:  # Check if the progress bar is at the top (Up position)
                    if direction == 0:
                        feedback = "Up"
                        count += 1  # Full push-up
                        direction = 1
                elif bar >= 380:  # Check if the progress bar is at the bottom (Down position)
                    if direction == 1:
                        feedback = "Down"
                    
                        direction = 0
            else:
                feedback = "Fix Form"
                # Posture correction suggestions for beginners and intermediates
                if hip < 80:
                    feedback = "Hips too low! Maintain a straight line from head to heels."
                if knee < 80:
                    feedback = "Knees not straight! Keep legs fully extended."
                if ankle < 80:
                    feedback = "Ankles not dorsiflexed! Keep feet flat and toes pointing forward."

            # Categorizing squat form by angle levels
            if form == "Beginner":
                feedback = f"Beginner Form: Try to squat deeper. Angles: Knee={int(knee)}°, Hip={int(hip)}°"
            elif form == "Intermediate":
                feedback = f"Intermediate Form: Good! Aim for a deeper squat. Angles: Knee={int(knee)}°, Hip={int(hip)}°"
            elif form == "Expert":
                feedback = f"Expert Form: Excellent squat posture! Angles: Knee={int(knee)}°, Hip={int(hip)}°"
            else:
                feedback = "Incorrect Form: Adjust your posture. Check knee and hip angles."

            # Draw Bar
            cv2.rectangle(img, (580, 50), (600, 380), (0, 255, 0), 3)
            cv2.rectangle(img, (580, int(bar)), (600, 380), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, f'{int(per)}%', (565, 430), cv2.FONT_HERSHEY_PLAIN, 2,
                        (255, 0, 0), 2)

            # Squat counter
            cv2.rectangle(img, (0, 380), (100, 480), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, str(int(count)), (25, 455), cv2.FONT_HERSHEY_PLAIN, 5,
                        (255, 0, 0), 5)

        # Feedback and Level
        cv2.putText(img, f"Elbow: {int(elbow)}", (10, 30),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
        cv2.putText(img, f"Shoulder: {int(shoulder)}", (10, 60),
                    cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
        cv2.putText(img, f"Hip: {int(hip)}", (10, 90),
                    cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
        cv2.putText(img, f"Ankle: {int(ankle)}", (10, 120),
                    cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
        cv2.putText(img, feedback, (10, 150),
                    cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
        cv2.rectangle(img, (500, 0), (640, 40), (255, 255, 255), cv2.FILLED)
        cv2.putText(img, feedback, (510, 30), cv2.FONT_HERSHEY_PLAIN, 1.5,
                    (0, 255, 0), 2)
            

        # Show final frame with feedback and counters
        cv2.imshow('Squat Counter', img)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()  # Release the webcam
    cv2.destroyAllWindows()  # Close all OpenCV windows


if __name__ == "__main__":
    main()