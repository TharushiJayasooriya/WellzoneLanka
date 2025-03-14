import cv2
import mediapipe as mp
import math
import numpy as np
import threading
from tkinter import filedialog, Label, Frame, Button, Tk, BOTH, LEFT, SUNKEN, GROOVE, RAISED, X, YES, TOP, BOTTOM

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

class VideoHandler:
    def __init__(self):
        self.cap = None
        self.video_playing = False

    def camselect(self, cam=True, file1=None):
        self.cap = cv2.VideoCapture(0 if cam else file1)

    def openVIDEO(self):
        self.camselect(False, './cat-cow-guide.mp4')            
        self.video_playing = True

    def openfile(self):
        file1 = filedialog.askopenfilename()
        self.camselect(False, file1)

    def camvideo(self):
        self.camselect(True)    

def start_posture_correction(cap, detector, feedback_label):
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
            right_hip = detector.findAngle(img, 12, 24, 26)  
            left_shoulder = detector.findAngle(img, 11, 13, 15)  
            right_shoulder = detector.findAngle(img, 12, 14, 16)  
            spine = detector.findAngle(img, 11, 12, 24)  
            neck = detector.findAngle(img, 0, 1, 2)  
            
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

            # Display feedback on the OpenCV window
            cv2.putText(img, f"Spine: {spine_feedback}", (10, 40), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Neck: {neck_feedback}", (10, 70), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Hips: {hip_feedback}", (10, 100), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)

            # Display angles on the OpenCV window (for feedback on the video feed)
            cv2.putText(img, f"Hip: {int(left_hip or right_hip)}", (10, 130),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Knee: {int(left_knee or right_knee)}", (10, 160),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)

        # Show the image with feedback on OpenCV window       
        cv2.imshow('Cat-Cow Stretch', img)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def main():
    window = Tk()
    window.title("Cat-cow exercise guide")

    feedback_label = Label(window, text="Select an action", font=("Arial", 20, "bold"), bg="white", fg="black")
    feedback_label.pack(side=TOP, fill=X)

    video_handler = VideoHandler()
    detector = PoseDetector()
    
    def on_posture_correction():
        video_handler.camvideo()  # Start webcam for posture correction
        start_posture_correction(video_handler.cap, detector, feedback_label)
    def on_video_guide():
        video_handler.openVIDEO()  # Start the video file for the guide
        
        while video_handler.cap.isOpened():
            ret, frame = video_handler.cap.read()
            if not ret:
                break
            
            # Show the guide video in an OpenCV window
            cv2.imshow('Guide Video', frame)
            
            # Handle closing the video window
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        video_handler.cap.release()
        cv2.destroyAllWindows()

    def start_video_in_thread():
        # This runs the video in a separate thread so that it does not block Tkinter
        video_thread = threading.Thread(target=on_video_guide)
        video_thread.start()

    def on_video_guide_button():
        start_video_in_thread()  

    def on_exit():
        window.quit()
    

   # Create a frame to hold the buttons and apply padding and styling
    button_frame = Frame(window, bg="lightblue", padx=20, pady=20)
    button_frame.pack(side=BOTTOM, fill=X)

    # Create custom styles for buttons
    button_style = {
        "font": ("Arial", 14, "bold"),
        "bg": "#4CAF50",  # Green background
        "fg": "white",    # White text color
        "relief": RAISED,  # Raised button style
        "bd": 3,          # Border thickness
        "width": 20,      # Button width
        "height": 2       # Button height
    }

    # Posture Correction Button
    Button(button_frame, text="Posture Correction", command=on_posture_correction, **button_style).pack(side=LEFT, padx=20)

    # Guide Video Button
    Button(button_frame, text="Guide Video", command=on_video_guide_button, **button_style).pack(side=LEFT, padx=20)

    # Exit Button
    Button(button_frame, text="Exit", command=on_exit, font=("Arial", 14, "bold"), bg="#f44336", fg="white", relief=RAISED, bd=3, width=20, height=2).pack(side=LEFT, padx=20)
    
    window.mainloop()

if __name__ == "__main__":
    main()
