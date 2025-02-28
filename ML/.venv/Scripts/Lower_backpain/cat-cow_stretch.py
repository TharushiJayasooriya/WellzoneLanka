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
    feedback = "Fix Your Position First"
    # Thresholds for Cat-Cow Stretch angles
    thresholds = {
        'spine_flexion_min': 20,  # Minimum spine flexion angle for Cat Pose
        'spine_extension_max': 25,  # Maximum spine extension angle for Cow Pose
        'neck_flexion_min': 20,  # Minimum neck flexion angle for Cat Pose
        'neck_extension_max': 25,  # Maximum neck extension angle for Cow Pose
        'hip_flexion_min': 5,  # Minimum hip flexion angle for Cat Pose
        'hip_extension_max': 10,  # Maximum hip extension angle for Cow Pose
    }

    while cap.isOpened():
        ret, img = cap.read()
        if not ret:
            break
            
        img = detector.findPose(img, False)
        lmList = detector.findPosition(img, False)
        
        if len(lmList) != 0:
            # Cat-Cow Stretch Angles
            left_knee = detector.findAngle(img, 23, 25, 27)  
            right_knee = detector.findAngle(img, 24, 26, 28)  
            left_hip = detector.findAngle(img, 11, 23, 25)  
            right_hip = detector.findAngle(img, 12, 24, 26)  # Right Hip angle (5-10° flexion/extension)
            left_shoulder = detector.findAngle(img, 11, 13, 15)  # Left Shoulder angle (scapular protraction/retraction)
            right_shoulder = detector.findAngle(img, 12, 14, 16)  # Right Shoulder angle (scapular protraction/retraction)
            spine = detector.findAngle(img, 11, 12, 24)  # Spine angle (20-30° flexion/15-25° extension)
            neck = detector.findAngle(img, 0, 1, 2)  # Neck angle (20-30° flexion/15-25° extension)
            
            # Initialize feedback messages
            spine_feedback = ""
            neck_feedback = ""
            hip_feedback = ""

            # Feedback for Spine
            if spine < thresholds['spine_flexion_min']:
                spine_feedback = "Round your back more (Cat Pose)"
            elif spine > thresholds['spine_extension_max']:
                spine_feedback = "Arch your back more (Cow Pose)"
            else:
                spine_feedback = "Good spinal movement!"

            # Feedback for Neck
            if neck < thresholds['neck_flexion_min']:
                neck_feedback = "Tuck your chin more (Cat Pose)"
            elif neck > thresholds['neck_extension_max']:
                neck_feedback = "Lift your head more (Cow Pose)"
            else:
                neck_feedback = "Good neck movement!"

            # Feedback for Hips
            if left_hip < thresholds['hip_flexion_min'] or right_hip < thresholds['hip_flexion_min']:
                hip_feedback = "Tilt pelvis backward more (Cat Pose)"
            elif left_hip > thresholds['hip_extension_max'] or right_hip > thresholds['hip_extension_max']:
                hip_feedback = "Tilt pelvis forward more (Cow Pose)"
            else:
                hip_feedback = "Good hip movement!"

            # Display feedback on the image
            y_offset = 50  # Starting y-coordinate for the first feedback message
            cv2.putText(img, spine_feedback, (50, y_offset), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
            y_offset += 40  # Move down for the next feedback message
            cv2.putText(img, neck_feedback, (50, y_offset), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
            y_offset += 40  # Move down for the next feedback message
            cv2.putText(img, hip_feedback, (50, y_offset), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
            
            # Display angles and feedback
            
            cv2.putText(img, f"Hip: {int(left_hip or right_hip)}", (10, 90),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Knee: {int(left_knee or right_knee)}", (10, 120),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, feedback, (10, 150),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)

        cv2.imshow('Cat-Cow Stretch', img)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
            
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()