import cv2
import mediapipe as mp
import math
import numpy as np

class PoseDetector:
    def __init__(self, mode=False, complexity=1, smooth_landmarks=True,
                 enable_segmentation=False, smooth_segmentation=True,
                 detectionCon=0.5, trackCon=0.5):
        
        self.mode = mode 
        self.complexity = complexity
        self.smooth_landmarks = smooth_landmarks
        self.enable_segmentation = enable_segmentation
        self.smooth_segmentation = smooth_segmentation
        self.detectionCon = detectionCon
        self.trackCon = trackCon
        
        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(self.mode, self.complexity, self.smooth_landmarks,
                                    self.enable_segmentation, self.smooth_segmentation,
                                    self.detectionCon, self.trackCon)
        
    def findPose(self, img, draw=True):
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.results = self.pose.process(imgRGB)
        
        if self.results.pose_landmarks:
            if draw:
                self.mpDraw.draw_landmarks(img, self.results.pose_landmarks,
                                         self.mpPose.POSE_CONNECTIONS)
        return img
    
    def findPosition(self, img, draw=True):
        self.lmList = []
        if self.results.pose_landmarks:
            for id, lm in enumerate(self.results.pose_landmarks.landmark):
                h, w, c = img.shape
                cx, cy, cz = int(lm.x * w), int(lm.y * h), lm.z
                self.lmList.append([id, cx, cy, cz])
                if draw:
                    cv2.circle(img, (cx, cy), 5, (255,0,0), cv2.FILLED)
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
            cv2.line(img, (x1, y1), (x2, y2), (255,255,255), 3)
            cv2.line(img, (x3, y3), (x2, y2), (255,255,255), 3)
            
            cv2.circle(img, (x1, y1), 5, (0,0,255), cv2.FILLED)
            cv2.circle(img, (x1, y1), 15, (0,0,255), 2)
            cv2.circle(img, (x2, y2), 5, (0,0,255), cv2.FILLED)
            cv2.circle(img, (x2, y2), 15, (0,0,255), 2)
            cv2.circle(img, (x3, y3), 5, (0,0,255), cv2.FILLED)
            cv2.circle(img, (x3, y3), 15, (0,0,255), 2)
            
            cv2.putText(img, str(int(angle)), (x2-50, y2+50), 
                       cv2.FONT_HERSHEY_PLAIN, 2, (0,0,255), 2)
        return angle


def main():
    cap = cv2.VideoCapture(0)
    detector = PoseDetector()
    count = 0
    direction = 0
    form = 0
    feedback = "Fix Form"

    while cap.isOpened():
        ret, img = cap.read()
        if not ret:
            break
            
        img = detector.findPose(img, False)
        lmList = detector.findPosition(img, False)
        
        if len(lmList) != 0:
            elbow = detector.findAngle(img, 11, 13, 15)  # Elbow angle
            shoulder = detector.findAngle(img, 13, 11, 23)  # Shoulder angle
            hip = detector.findAngle(img, 11, 23, 25)  # Hip angle
            knee = detector.findAngle(img, 25, 23, 27)  # Knee angle
            ankle = detector.findAngle(img, 27, 29, 31)  # Ankle angle
            
            per = np.interp(elbow, (90, 160), (0, 100))
            bar = np.interp(elbow, (90, 160), (380, 50))

            # Add level checks for form (beginner, intermediate, expert)
            if elbow > 160 and shoulder > 40 and hip > 160:
                form = 1
        
            if form == 1:
                # Check for proper push-up position and provide detailed feedback
                if elbow <= 90 and hip > 160:
                    feedback = "Up"
                    if direction == 0:
                        count += 1  # Full push-up
                        direction = 1
                elif elbow > 160 and shoulder > 40 and hip > 160:
                    feedback = "Down"
                    if direction == 1:
                        count += 1  # Full push-up
                        direction = 0
                else:
                    if elbow > 160:
                        feedback = "Elbows too straight! Keep a controlled bend."
                    if shoulder < 40:
                        feedback = "Shoulders drooping! Engage core and straighten shoulders."
                    if hip < 140:
                        feedback = "Hips too low! Maintain a straight line from head to heels."
                
                # Categorizing push-up form by angle levels
                if elbow < 100 and shoulder > 40 and hip > 160:
                    feedback = "Beginner Form: Try to extend elbows more."
                elif elbow >= 100 and elbow < 140 and shoulder > 45 and hip >= 140:
                    feedback = "Intermediate Form: Improve by fully extending arms."
                elif elbow >= 140 and shoulder >= 50 and hip >= 160:
                    feedback = "Expert Form: Excellent push-up posture!"
                    
                # Draw Bar
                cv2.rectangle(img, (580, 50), (600, 380), (0, 255, 0), 3)
                cv2.rectangle(img, (580, int(bar)), (600, 380), (0, 255, 0), cv2.FILLED)
                cv2.putText(img, f'{int(per)}%', (565, 430), cv2.FONT_HERSHEY_PLAIN, 2,
                           (255, 0, 0), 2)

            # Pushup counter
            cv2.rectangle(img, (0, 380), (100, 480), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, str(int(count)), (25, 455), cv2.FONT_HERSHEY_PLAIN, 5,
                       (255, 0, 0), 5)
            
            # Feedback 
            cv2.rectangle(img, (500, 0), (640, 40), (255, 255, 255), cv2.FILLED)
            cv2.putText(img, feedback, (500, 40), cv2.FONT_HERSHEY_PLAIN, 2,
                       (0, 255, 0), 2)

        cv2.imshow('Pushup Counter', img)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
            
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
