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
    feedback = "Fix Form"

    while cap.isOpened():
        ret, img = cap.read()  # Read frame from webcam
        if not ret:
            break

        img = detector.findPose(img, False)  # Detect pose without drawing
        lmList = detector.findPosition(img, False)  # Get landmark positions

        if len(lmList) != 0:
            # Calculate knee and hip angles
            left_elbow = detector.findAngle(img, 12, 14, 16)  # Right Elbow angle (now considered left)
            right_elbow = detector.findAngle(img, 11, 13, 15)  # Left Elbow angle (now considered right)
            left_shoulder = detector.findAngle(img, 14, 12, 24)  # Right Shoulder angle (now considered left)
            right_shoulder = detector.findAngle(img, 13, 11, 23)  # Left Shoulder angle (now considered right)  
            left_hip = detector.findAngle(img, 11, 23, 25)  # Left Hip angle
            right_hip = detector.findAngle(img, 12, 24, 26)  # Right Hip angle
            left_ankle = detector.findAngle(img, 28, 30, 32)  # Right Ankle angle (now considered left)
            right_ankle = detector.findAngle(img, 27, 29, 31)  # Left Ankle angle (now considered right)

            # Use the average of left and right angles for squat tracking
            elbow = (left_elbow + right_elbow) / 2
            shoulder = (left_shoulder + right_shoulder) / 2
            hip = (left_hip + right_hip) / 2
            ankle = (left_ankle + right_ankle) / 2
            

            # Check elbow angle
            if(80 <= elbow <= 100 and  # Elbow angle ~90°
                80 <= shoulder <= 100 and  # Shoulder angle ~90°
                160 <= hip <= 190 and  # Hip angle ~180°
                80 <= ankle <= 100):  # Ankle angle ~90°
                feedback = "Good Form!" 
                if 80 <= elbow <= 100:
                    feedback = "Elbow: Good"
                elif elbow < 80:
                    feedback = "Elbow: Too narrow, widen your arms"
                else:
                    feedback = "Elbow: Too wide, bring arms closer"

                # Check shoulder angle
                if 80 <= shoulder <= 100:
                    feedback = "Shoulder: Good"
                elif shoulder < 80:
                    feedback = "Shoulder: Too low, raise your shoulders"
                else:
                    feedback = "Shoulder: Too high, lower your shoulders"

                # Check hip angle
                if 160 <= hip <= 190:
                    feedback = "Hip: Good"
                elif hip < 160:
                    feedback = "Hip: Too low, straighten your body"
                else:
                    feedback = "Hip: Too high, lower your hips"

                # Check ankle angle
                if 80 <= ankle<= 100:
                    feedback = "Ankle: Good"
                elif ankle< 80:
                    feedback = "Ankle: Adjust your feet"
                else:
                    feedback = "Ankle: Adjust your feet"

            else:
                feedback = "Fix Form: Adjust your posture."

            # Display angles and feedback
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

        # Show final frame with feedback and angles
        cv2.imshow('Plank Form Checker', img)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()  # Release the webcam
    cv2.destroyAllWindows()  # Close all OpenCV windows


if __name__ == "__main__":
    main()