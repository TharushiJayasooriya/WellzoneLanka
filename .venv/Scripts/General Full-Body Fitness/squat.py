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


def main():
    # Initialize webcam capture
    cap = cv2.VideoCapture(0)
    detector = PoseDetector()
    count = 0
    direction = 0  # 0: Standing, 1: Squatting
    form = 0  # 0: Standing, 1: Squatting
    feedback = "Fix Form"

    while cap.isOpened():
        ret, img = cap.read()  # Read frame from webcam
        if not ret:
            break

        img = detector.findPose(img, False)  # Detect pose without drawing
        lmList = detector.findPosition(img, False)  # Get landmark positions

        if len(lmList) != 0:
            # Calculate knee and hip angles
            left_knee = detector.findAngle(img, 23, 25, 27)  # Left Knee angle
            right_knee = detector.findAngle(img, 24, 26, 28)  # Right Knee angle
            left_hip = detector.findAngle(img, 11, 23, 25)  # Left Hip angle
            right_hip = detector.findAngle(img, 12, 24, 26)  # Right Hip angle

            # Use the average of left and right angles for squat tracking
            knee = (left_knee + right_knee) / 2
            hip = (left_hip + right_hip) / 2

            # Map knee angle to squat percentage and bar position
            per = np.interp(knee, (90, 160), (0, 100))
            bar = np.interp(knee, (90, 160), (380, 50))

            # Add level checks for form (Beginner, Intermediate, Expert)
            if knee > 120:
                form = "Beginner"
            elif 90 < knee <= 120:
                form = "Intermediate"
            elif knee <= 90:
                form = "Expert"
            else:
                form = "Incorrect"

            # Check for proper squat position and provide detailed feedback
            if form == "Beginner" or form == "Intermediate":
                if knee > 160 and hip > 160:  # Standing position
                    feedback = "Up"
                    if direction == 1:
                        count += 0.5  # Increment count when standing up
                        direction = 0
                        bar = np.interp(knee, (90, 160), (380, 50))  # Map the count to the progress bar
                elif knee <= 120:  # Squatting down
                    feedback = "Down"
                    if direction == 0:
                        direction = 1
            else:
                feedback = "Fix Form"
                # Posture correction suggestions for beginners and intermediates
                if knee > 160:
                    feedback = "Stand straight and keep your back neutral."
                if knee <= 120:
                    feedback = "Bend your knees more to improve your squat depth."

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