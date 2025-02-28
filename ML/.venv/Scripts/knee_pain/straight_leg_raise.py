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
        "hip_flexion": {  
            "excellent": (80, 90),  # Excellent flexibility
            "normal": (70, 80),     # Normal flexibility
            "tight_hamstrings": (0, 70)  # Tight hamstrings
        },
        "sciatic_nerve": {  
            "mild_tension": (30, 70),  # Sciatic nerve irritation
            "severe_tension": (0, 30), # Severe nerve compression
            "hamstring_issue": (70, 110) # Likely hamstring or hip joint issue
        },
        "knee_flexion": {  
            "fully_extended": (170, 180), # Maximally stretches hamstrings/sciatic nerve
            "slightly_bent": (150, 170),  # Reduces sciatic tension slightly
            "significantly_bent": (90, 150) # Focuses more on quadriceps
        },
        "ankle_position": {  
            "neutral": 90,         # Increases sciatic stretch
            "plantarflexed": 45,   # Reduces sciatic tension
            "dorsiflexed": 110     # Maximizes neural tension
        }
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
            left_ankle = detector.findAngle(img, 27, 29, 31) 
            right_ankle = detector.findAngle(img, 28, 30, 32) 
            
            # Initialize feedback messages for both legs
            right_hip_feedback = ""
            left_hip_feedback = ""
            right_knee_feedback = ""
            left_knee_feedback = ""
            right_ankle_feedback = ""
            left_ankle_feedback = ""

            # Check right leg hip angle and provide feedback
            if right_hip >= thresholds["hip_flexion"]["excellent"][0] and right_hip <= thresholds["hip_flexion"]["excellent"][1]:
                right_hip_feedback = f"Correct! Your right hip has excellent flexibility at {right_hip}°."
            elif right_hip >= thresholds["hip_flexion"]["normal"][0] and right_hip <= thresholds["hip_flexion"]["normal"][1]:
                right_hip_feedback = f"Your right hip flexibility is normal at {right_hip}°. Keep up the good work!"
            elif right_hip < thresholds["hip_flexion"]["tight_hamstrings"][1]:
                right_hip_feedback = f"Wrong. Your right hamstrings are tight. Try to raise your leg higher to improve flexibility. Current angle: {right_hip}°."

            # Check left leg hip angle and provide feedback
            if left_hip >= thresholds["hip_flexion"]["excellent"][0] and left_hip <= thresholds["hip_flexion"]["excellent"][1]:
                left_hip_feedback = f"Correct! Your left hip has excellent flexibility at {left_hip}°."
            elif left_hip >= thresholds["hip_flexion"]["normal"][0] and left_hip <= thresholds["hip_flexion"]["normal"][1]:
                left_hip_feedback = f"Your left hip flexibility is normal at {left_hip}°. Keep it up!"
            elif left_hip < thresholds["hip_flexion"]["tight_hamstrings"][1]:
                left_hip_feedback = f"Wrong. Your left hamstrings are tight. Try raising your leg higher. Current angle: {left_hip}°."

            # Check right leg knee angle and provide feedback
            if right_knee >= thresholds["knee_flexion"]["fully_extended"][0] and right_knee <= thresholds["knee_flexion"]["fully_extended"][1]:
                right_knee_feedback = f"Correct! Your right knee is fully extended at {right_knee}°."
            elif right_knee >= thresholds["knee_flexion"]["slightly_bent"][0] and right_knee <= thresholds["knee_flexion"]["slightly_bent"][1]:
                right_knee_feedback = f"Your right knee is slightly bent at {right_knee}°. Straighten it more to improve."
            elif right_knee < thresholds["knee_flexion"]["significantly_bent"][1]:
                right_knee_feedback = f"Wrong. Your right knee is significantly bent at {right_knee}°. Try straightening it more."

            # Check left leg knee angle and provide feedback
            if left_knee >= thresholds["knee_flexion"]["fully_extended"][0] and left_knee <= thresholds["knee_flexion"]["fully_extended"][1]:
                left_knee_feedback = f"Correct! Your left knee is fully extended at {left_knee}°."
            elif left_knee >= thresholds["knee_flexion"]["slightly_bent"][0] and left_knee <= thresholds["knee_flexion"]["slightly_bent"][1]:
                left_knee_feedback = f"Your left knee is slightly bent at {left_knee}°. Straighten it more to improve."
            elif left_knee < thresholds["knee_flexion"]["significantly_bent"][1]:
                left_knee_feedback = f"Wrong. Your left knee is significantly bent at {left_knee}°. Try straightening it more."

            # Check right leg ankle position and provide feedback
            if right_ankle == thresholds["ankle_position"]["neutral"]:
                right_ankle_feedback = f"Correct! Your right ankle is in neutral position."
            elif right_ankle < thresholds["ankle_position"]["neutral"]:
                right_ankle_feedback = f"Wrong. Your right ankle is slightly plantarflexed at {right_ankle}°. Try pointing your toes up."
            elif right_ankle > thresholds["ankle_position"]["neutral"]:
                right_ankle_feedback = f"Wrong. Your right ankle is dorsiflexed at {right_ankle}°. This increases neural tension. Try pointing your toes down."

            # Check left leg ankle position and provide feedback
            if left_ankle == thresholds["ankle_position"]["neutral"]:
                left_ankle_feedback = f"Correct! Your left ankle is in neutral position."
            elif left_ankle < thresholds["ankle_position"]["neutral"]:
                left_ankle_feedback = f"Wrong. Your left ankle is slightly plantarflexed at {left_ankle}°. Try pointing your toes up."
            elif left_ankle > thresholds["ankle_position"]["neutral"]:
                left_ankle_feedback = f"Wrong. Your left ankle is dorsiflexed at {left_ankle}°. This increases neural tension. Try pointing your toes down."

            
            # Display feedback on the OpenCV window
            cv2.putText(img, f"Right Hip: {right_hip_feedback}", (10, 40), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Left Hip: {left_hip_feedback}", (10, 80), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Right Knee: {right_knee_feedback}", (10, 120), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Left Knee: {left_knee_feedback}", (10, 160), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Right Ankle: {right_ankle_feedback}", (10, 200), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Left Ankle: {left_ankle_feedback}", (10, 240), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)

            

        # Show the image with feedback on OpenCV window       
        cv2.imshow('Straight Leg Raise', img)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def main():
    window = Tk()
    window.title("Straight leg raise guide guide")

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
