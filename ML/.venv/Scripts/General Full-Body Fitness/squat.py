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
        self.camselect(False, './cat-cow-guide.mp4')         #/////////////////////
        self.video_playing = True

    def openfile(self):
        file1 = filedialog.askopenfilename()
        self.camselect(False, file1)

    def camvideo(self):
        self.camselect(True)  

def start_posture_correction(cap, detector, feedback_label):
    feedback = "Fix Your Position First"
    # Thresholds for Squat angles
    thresholds = {
        'knee_flexion_min': 60,  # Minimum knee flexion angle for deep squat
        'knee_flexion_max': 120,  # Maximum knee flexion angle for partial squat
        'hip_flexion_min': 60,  # Minimum hip flexion angle for deep squat
        'hip_flexion_max': 120,  # Maximum hip flexion angle for partial squat
        'ankle_dorsiflexion_min': 60,  # Minimum ankle dorsiflexion angle for deep squat
        'ankle_dorsiflexion_max': 90,  # Maximum ankle dorsiflexion angle for partial squat
        'torso_lean_min': 10,  # Minimum torso forward lean angle
        'torso_lean_max': 30,  # Maximum torso forward lean angle
    }

    while cap.isOpened():
        ret, img = cap.read()
        if not ret:
            break

        img = detector.findPose(img, False)
        lmList = detector.findPosition(img, False)

        if len(lmList) != 0:
            # Squat Angles
            left_knee = detector.findAngle(img, 23, 25, 27)  # Left knee angle
            right_knee = detector.findAngle(img, 24, 26, 28)  # Right knee angle
            left_hip = detector.findAngle(img, 11, 23, 25)  # Left hip angle
            right_hip = detector.findAngle(img, 12, 24, 26)  # Right hip angle
            left_ankle = detector.findAngle(img, 25, 27, 31)  # Left ankle angle
            right_ankle = detector.findAngle(img, 26, 28, 32)  # Right ankle angle
            torso = detector.findAngle(img, 11, 23, 25)  # Torso lean angle

            # Use the average of left and right angles for feedback
            knee_angle = (left_knee + right_knee) / 2
            hip_angle = (left_hip + right_hip) / 2
            ankle_angle = (left_ankle + right_ankle) / 2

            # Initialize feedback messages
            knee_feedback = ""
            hip_feedback = ""
            ankle_feedback = ""
            torso_feedback = ""

            # Feedback for Knees
            if knee_angle < thresholds['knee_flexion_min']:
                knee_feedback = "Go deeper into the squat"
            elif knee_angle > thresholds['knee_flexion_max']:
                knee_feedback = "Don't squat too shallow"
            else:
                knee_feedback = "Good knee flexion!"

            # Feedback for Hips
            if hip_angle < thresholds['hip_flexion_min']:
                hip_feedback = "Push your hips back more"
            elif hip_angle > thresholds['hip_flexion_max']:
                hip_feedback = "Don't hinge your hips too much"
            else:
                hip_feedback = "Good hip hinge!"

            # Feedback for Ankles
            if ankle_angle < thresholds['ankle_dorsiflexion_min']:
                ankle_feedback = "Keep your heels on the ground"
            elif ankle_angle > thresholds['ankle_dorsiflexion_max']:
                ankle_feedback = "Don't let your knees go too far forward"
            else:
                ankle_feedback = "Good ankle mobility!"

            # Feedback for Torso
            if torso < thresholds['torso_lean_min']:
                torso_feedback = "Lean your torso slightly forward"
            elif torso > thresholds['torso_lean_max']:
                torso_feedback = "Don't lean your torso too far forward"
            else:
                torso_feedback = "Good torso position!"

            # Display feedback on the OpenCV window
            cv2.putText(img, f"Knees: {knee_feedback}", (10, 40), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Hips: {hip_feedback}", (10, 70), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Ankles: {ankle_feedback}", (10, 100), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Torso: {torso_feedback}", (10, 130), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)

            # Display angles on the OpenCV window (for feedback on the video feed)
            cv2.putText(img, f"Knee: {int(knee_angle)}", (10, 160),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Hip: {int(hip_angle)}", (10, 190),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Ankle: {int(ankle_angle)}", (10, 220),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
            cv2.putText(img, f"Torso: {int(torso)}", (10, 250),
                        cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)

        # Show the image with feedback on OpenCV window
        cv2.imshow('Squat Correction', img)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

def main():
    window = Tk()
    window.title("Squat Exercise guide")

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
