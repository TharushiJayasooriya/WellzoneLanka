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
    
class VideoHandler:
    def __init__(self):
        self.cap = None
        self.video_playing = False

    def camselect(self, cam=True, file1=None):
        self.cap = cv2.VideoCapture(0 if cam else file1)

    def openVIDEO(self):
        self.camselect(False, './cat-cow-guide.mp4')            #/////////////////////
        self.video_playing = True

    def openfile(self):
        file1 = filedialog.askopenfilename()
        self.camselect(False, file1)

    def camvideo(self):
        self.camselect(True)    

def start_posture_correction(cap, detector, feedback_label):
    cap = cv2.VideoCapture(0)
    detector = PoseDetector()
    feedback = "Fix Your Position First"

    while cap.isOpened():
        ret, img = cap.read()
        if not ret:
            break
            
        img = detector.findPose(img, False)
        lmList = detector.findPosition(img, False)
        
        if len(lmList) != 0:
            # Determine user orientation
            left_shoulder_x = lmList[11][1]  # x-coordinate of left shoulder
            right_shoulder_x = lmList[12][1]  # x-coordinate of right shoulder
            swap_landmarks = left_shoulder_x > right_shoulder_x


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
            
            # Check elbow angle
            if 80 <= elbow <= 100 and 80 <= shoulder <= 100 and 160 <= hip <= 190 and 80 <= ankle <= 100:
                feedback = "Good Form!"  # Level 1: Perfect alignment
                
            else:
                # Level 2: Minor adjustments needed
                if not (80 <= elbow <= 100):
                    if elbow < 80:
                        feedback = "Elbow too narrow: Widen your arms slightly."
                    elif elbow > 100:
                        feedback = "Elbow too wide: Bring your arms closer."
                elif not (80 <= shoulder <= 100):
                    if shoulder < 80:
                        feedback = "Shoulders too low: Raise your shoulders slightly."
                    elif shoulder > 100:
                        feedback = "Shoulders too high: Lower them slightly."
                elif not (160 <= hip <= 190):
                    if hip < 160:
                        feedback = "Hip angle too low: Straighten your body."
                    elif hip > 190:
                        feedback = "Hip angle too high: Lower your hips."
                elif not (80 <= ankle <= 100):
                    if ankle < 80:
                        feedback = "Ankle too low: Adjust your feet position."
                    elif ankle > 100:
                        feedback = "Ankle too high: Adjust your posture."

                # Level 3: Major adjustments needed
                else:
                    feedback = "Fix Form: Significant posture adjustments required."


           

           
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



def main():
    window = Tk()
    window.title("Plank exercise guide")

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
