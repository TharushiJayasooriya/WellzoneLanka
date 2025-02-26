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
                cx, cy = int(lm.x * w), int(lm.y * h)
                self.lmList.append([id, cx, cy])
                if draw:
                    cv2.circle(img, (cx, cy), 5, (255,0,0), cv2.FILLED)
        return self.lmList
    
    def findAngle(self, img, p1, p2, p3, draw=True):   
        x1, y1 = self.lmList[p1][1:]
        x2, y2 = self.lmList[p2][1:]
        x3, y3 = self.lmList[p3][1:]
        
        angle = math.degrees(math.atan2(y3-y2, x3-x2) - 
                           math.atan2(y1-y2, x1-x2))
        if angle < 0:
            angle += 360
            if angle > 180:
                angle = 360 - angle
        elif angle > 180:
            angle = 360 - angle
        
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
    feedback = "Fix Your position first"

    while cap.isOpened():
        ret, img = cap.read()
        if not ret:
            break
            
        img = detector.findPose(img, False)
        lmList = detector.findPosition(img, False)
        
        if len(lmList) != 0:
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
            
            per = np.interp((right_elbow or left_elbow), (90, 160), (0, 100))
            bar = np.interp((right_elbow or left_elbow), (90, 160), (380, 50))

            # Check form for beginner or expert level
            if (170 < (right_elbow or left_elbow) < 175) and (90 < (right_shoulder or left_shoulder) < 100) and (175 < (right_hip or left_hip) < 180):
                form = 1  # Beginner form detected
            elif (175 < (right_elbow or left_elbow) < 180) and (95 < (right_shoulder or left_shoulder) < 100) and ((right_hip or left_hip) == 180):
                form = 2  # Expert form detected

            # Beginner Level Logic
            if form == 1:
                if (170 < (right_elbow or left_elbow) < 175) and (175 < (right_hip or left_hip) < 180):
                    feedback = "Beginner Level - Up"
                    if direction == 0:
                        count += 0.5
                        direction = 1
                elif (90 <= (right_elbow or left_elbow) <= 95) and (60 < (right_shoulder or left_shoulder) < 80) and (160 < (right_hip or left_hip) < 170):
                    feedback = "Beginner Level - Down"
                    if direction == 1:
                        count += 0.5
                        direction = 0
                else:
                    feedback = "Fix Form"

            # Expert Level Logic
            elif form == 2:
                if (175 < (right_elbow or left_elbow) < 180) and (right_hip or left_hip) == 180 and (95 < (right_shoulder or left_shoulder) < 100):
                    feedback = "Expert Level - Up"
                    if direction == 0:
                        count += 0.5
                        direction = 1
                elif (165 < (right_elbow or left_elbow) < 175) and (60 < (right_shoulder or left_shoulder) < 70) and (165 < (right_hip or left_hip) < 175):
                    feedback = "Expert Level - Down"
                    if direction == 1:
                        count += 0.5
                        direction = 0
                else:
                    feedback = "Fix Form"
                    
             # Draw Progress Bar
            cv2.rectangle(img, (580, 50), (600, 380), (255, 255, 255), 3)
            cv2.rectangle(img, (580, int(bar)), (600, 380), (0, 0, 0), cv2.FILLED)
            cv2.putText(img, f'{int(per)}%', (565, 430), cv2.FONT_HERSHEY_PLAIN, 2,
                        (255, 0, 0), 2)
            # Pushup counter
            cv2.rectangle(img, (0, 380), (100, 480), (0, 0, 0), cv2.FILLED)
            cv2.putText(img, str(int(count)), (25, 455), cv2.FONT_HERSHEY_PLAIN, 5,
                       (255, 0, 0), 5)
            
            # Feedback 
            cv2.rectangle(img, (500, 0), (640, 40), (0, 0, 0), cv2.FILLED)
            cv2.putText(img, feedback, (500, 40), cv2.FONT_HERSHEY_PLAIN, 2,
                       (255, 0, 0), 2)

        cv2.imshow('Pushup Counter', img)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
            
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()