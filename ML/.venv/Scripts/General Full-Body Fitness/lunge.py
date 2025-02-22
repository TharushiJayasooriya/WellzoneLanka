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
        norm_A = np.linalg.norm(A)
        norm_B = np.linalg.norm(B)
        cos_theta = dot_product / (norm_A * norm_B)

        # Calculate the angle in degrees
        angle = math.degrees(np.arccos(cos_theta))

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

    def calculateLungeAngles(self, img, draw=True):
        # Calculate knee, hip, and ankle angles for both legs
        if len(self.lmList) != 0:
            # Left leg angles
            left_knee_angle = self.findAngle(img, 23, 25, 27, draw)  # Left knee angle
            left_hip_angle = self.findAngle(img, 11, 23, 25, draw)   # Left hip angle
            left_ankle_angle = self.findAngle(img, 25, 27, 31, draw)  # Left ankle angle

            # Right leg angles
            right_knee_angle = self.findAngle(img, 24, 26, 28, draw)  # Right knee angle
            right_hip_angle = self.findAngle(img, 12, 24, 26, draw)   # Right hip angle
            right_ankle_angle = self.findAngle(img, 26, 28, 32, draw)  # Right ankle angle

            return {
                "left_knee": left_knee_angle,
                "left_hip": left_hip_angle,
                "left_ankle": left_ankle_angle,
                "right_knee": right_knee_angle,
                "right_hip": right_hip_angle,
                "right_ankle": right_ankle_angle
            }
        return None

    def provideFeedback(self, angles):
        # Analyze angles and provide feedback
        feedback = []

        # Knee angle feedback
        if angles["left_knee"] < 80 or angles["right_knee"] < 80:
            feedback.append("Knee angle too small! Avoid bending your knee beyond 90° to prevent strain.")
        elif angles["left_knee"] > 110 or angles["right_knee"] > 110:
            feedback.append("Knee angle too large! Bend your knee more to maintain proper form.")

        # Hip angle feedback
        if angles["left_hip"] < 160 or angles["right_hip"] < 160:
            feedback.append("Hip angle too small! Keep your torso upright and avoid leaning forward.")
        elif angles["left_hip"] > 190 or angles["right_hip"] > 190:
            feedback.append("Hip angle too large! Lean forward slightly to maintain balance.")

        # Ankle angle feedback
        if angles["left_ankle"] < 70 or angles["right_ankle"] < 70:
            feedback.append("Ankle angle too small! Adjust your foot placement for better stability.")
        elif angles["left_ankle"] > 100 or angles["right_ankle"] > 100:
            feedback.append("Ankle angle too large! Keep your foot flat on the ground.")

        return feedback


def main():
    # Initialize webcam capture
    cap = cv2.VideoCapture(0)
    detector = PoseDetector()
    count = 0
    feedback = "Fix Form"
    left_lunge_complete = False
    right_lunge_complete = False
    
    while cap.isOpened():
        ret, img = cap.read()  # Read frame from webcam
        if not ret:
            feedback = "Should be connected to the web camera (Check if the camera is on)"
            cv2.putText(img, feedback, (10, 30), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 0, 255), 2)
            cv2.waitKey(1)
            break

        img = detector.findPose(img, False)  # Detect pose without drawing
        lmList = detector.findPosition(img, False)  # Get landmark positions

        if len(lmList) != 0:
            # Calculate lunge angles
            angles = detector.calculateLungeAngles(img, draw=True)

            # Provide feedback based on angles
            feedback_list = detector.provideFeedback(angles)
            feedback = "\n".join(feedback_list) if feedback_list else "Good form! Keep it up."

            # Check for lunge completion
            if angles["left_knee"] < 90 and angles["right_knee"] > 160:  # Left leg in lunge
                left_lunge_complete = True
            if angles["right_knee"] < 90 and angles["left_knee"] > 160:  # Right leg in lunge
                right_lunge_complete = True

            # Increment counter if both legs complete a lunge
            if left_lunge_complete and right_lunge_complete:
                count += 1
                left_lunge_complete = False
                right_lunge_complete = False

            # Calculate progress bar percentage
            per = np.interp(min(angles["left_knee"], angles["right_knee"]), [80, 90], [0, 100])
            bar = np.interp(min(angles["left_knee"], angles["right_knee"]), [80, 90], [380, 50])

            # Draw progress bar
            cv2.rectangle(img, (580, 50), (600, 380), (0, 255, 0), 3)
            cv2.rectangle(img, (580, int(bar)), (600, 380), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, f'{int(per)}%', (565, 430), cv2.FONT_HERSHEY_PLAIN, 2,
                        (255, 0, 0), 2)

            # Draw lunge counter
            cv2.rectangle(img, (0, 380), (100, 480), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, str(int(count)), (25, 455), cv2.FONT_HERSHEY_PLAIN, 5,
                        (255, 0, 0), 5)

            # Display angles and feedback on the screen
            cv2.putText(img, f"Left Knee: {int(angles['left_knee'])}", (10, 30),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Left Hip: {int(angles['left_hip'])}", (10, 60),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Left Ankle: {int(angles['left_ankle'])}", (10, 90),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Right Knee: {int(angles['right_knee'])}", (10, 120),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Right Hip: {int(angles['right_hip'])}", (10, 150),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Right Ankle: {int(angles['right_ankle'])}", (10, 180),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, feedback, (10, 210),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)

        # Show final frame with feedback and counters
        cv2.imshow('Lunge Counter', img)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()  # Release the webcam
    cv2.destroyAllWindows()  # Close all OpenCV windows


if __name__ == "__main__":
    main()