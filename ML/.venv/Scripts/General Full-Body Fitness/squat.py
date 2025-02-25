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
        magnitude_A = np.linalg.norm(A)
        magnitude_B = np.linalg.norm(B)
        # Calculate the angle in degrees
        angle = math.degrees(np.arccos(dot_product / (magnitude_A * magnitude_B)))
    
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
    # Use a state machine for more robust rep counting
    # 0 = standing, 1 = going down, 2 = squat position, 3 = going up
    squat_state = 0
    
    form = 0
    feedback = "Fix Form"
    
    # Make these thresholds more lenient
    beginner_angle_threshold = 70
    intermediate_angle_threshold = 50
    expert_angle_threshold = 30
    
    # For rep counting - REDUCE sensitivity by widening the gap between thresholds
    up_threshold = 130  # Was 120 - higher number means you need to stand up more
    down_threshold = 80  # Was 90 - lower number means you need to squat deeper
    
    # Add confirmation counters to prevent accidental rep counting
    frames_in_up_position = 0
    frames_in_down_position = 0
    required_confirmation_frames = 10  # Number of frames to confirm a position
    
    # Increase smoothing window to reduce jitter
    angle_buffer_size = 10  # Was 5
    last_knee_angles = [0] * angle_buffer_size
    last_hip_angles = [0] * angle_buffer_size
    last_ankle_angles = [0] * angle_buffer_size
    angle_index = 0
    
    # Track combined angle for debouncing
    last_combined_angles = [0] * 15  # Longer buffer for combined angle
    combined_angle_index = 0

    while cap.isOpened():
        ret, img = cap.read()  # Read frame from webcam
        if not ret:
            feedback = "Should be connected to the web camera (Check if the camera is on)"
            cv2.putText(img, feedback, (10, 30), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 0, 255), 2)
            cv2.waitKey(1)
            break

        elbow=shoulder=knee=ankle=hip=0

        img = detector.findPose(img, False)  # Detect pose without drawing
        lmList = detector.findPosition(img, False)  # Get landmark positions

        # Initialize variables
        elbow = shoulder = hip = knee = ankle = 0
        knee_angle_smoothed = hip_angle_smoothed = ankle_angle_smoothed = 0

        if len(lmList) != 0:
            # Determine user orientation
            left_shoulder_x = lmList[11][1]  # x-coordinate of left shoulder
            right_shoulder_x = lmList[12][1]  # x-coordinate of right shoulder

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

           # Use the average of left and right angles for squat tracking
            elbow = (left_elbow + right_elbow) / 2
            shoulder = (left_shoulder + right_shoulder) / 2
            hip = (left_hip + right_hip) / 2
            knee = (left_knee + right_knee) / 2
            ankle = (left_ankle + right_ankle) / 2
            
            # Apply smoothing to angles to reduce jitter - now with larger buffer
            last_knee_angles[angle_index] = knee
            last_hip_angles[angle_index] = hip
            last_ankle_angles[angle_index] = ankle
            angle_index = (angle_index + 1) % angle_buffer_size
            
            knee_angle_smoothed = sum(last_knee_angles) / angle_buffer_size
            hip_angle_smoothed = sum(last_hip_angles) / angle_buffer_size
            ankle_angle_smoothed = sum(last_ankle_angles) / angle_buffer_size
            
            # Combine angles with weighted average as in original code
            combined_angle = (0.5 * knee_angle_smoothed) + (0.3 * hip_angle_smoothed) + (0.2 * ankle_angle_smoothed)
            
            # Add an additional layer of smoothing for the combined angle
            last_combined_angles[combined_angle_index] = combined_angle
            combined_angle_index = (combined_angle_index + 1) % len(last_combined_angles)
            combined_angle_smoothed = sum(last_combined_angles) / len(last_combined_angles)

            # Add level checks for form (Beginner, Intermediate, Expert)
            if knee_angle_smoothed > beginner_angle_threshold and hip_angle_smoothed > beginner_angle_threshold and ankle_angle_smoothed > beginner_angle_threshold:
                form = "Beginner"
            elif knee_angle_smoothed > intermediate_angle_threshold and hip_angle_smoothed > intermediate_angle_threshold and ankle_angle_smoothed > intermediate_angle_threshold:
                form = "Intermediate"
            elif knee_angle_smoothed > expert_angle_threshold and hip_angle_smoothed > expert_angle_threshold and ankle_angle_smoothed > expert_angle_threshold:
                form = "Expert"
            else:
                form = "Deep Squat"

            # Map combined angle to percentage and bar position based on form level
            if form == "Beginner":
                # Beginner level (more lenient range)
                per = np.interp(combined_angle_smoothed, (110, 140), (0, 100))
                bar = np.interp(combined_angle_smoothed, (110, 140), (380, 50))
            elif form == "Intermediate":
                # Intermediate level
                per = np.interp(combined_angle_smoothed, (90, 110), (0, 100))
                bar = np.interp(combined_angle_smoothed, (90, 110), (380, 50))
            elif form == "Expert":
                # Expert level
                per = np.interp(combined_angle_smoothed, (70, 90), (0, 100))
                bar = np.interp(combined_angle_smoothed, (70, 90), (380, 50))
            else:
                # Deep squat or incorrect form
                per = np.interp(combined_angle_smoothed, (50, 70), (0, 100))
                bar = np.interp(combined_angle_smoothed, (50, 70), (380, 50))

            # Improved state machine for rep counting
            if form != "":
                # STATE MACHINE FOR REP COUNTING
                if squat_state == 0:  # Standing position
                    if combined_angle_smoothed < down_threshold:
                        squat_state = 1  # Transition to going down
                        feedback = "Going Down"
                elif squat_state == 1:  # Going down
                    if combined_angle_smoothed < down_threshold - 10:  # Need to go clearly below threshold
                        frames_in_down_position += 1
                        if frames_in_down_position >= required_confirmation_frames:
                            squat_state = 2  # Confirmed in squat position
                            frames_in_down_position = 0
                            feedback = "In Squat Position"
                    else:
                        frames_in_down_position = 0  # Reset if not consistently in position
                elif squat_state == 2:  # In squat position
                    if combined_angle_smoothed > down_threshold + 10:  # Started coming up
                        squat_state = 3  # Transition to going up
                        feedback = "Going Up"
                elif squat_state == 3:  # Going up
                    if combined_angle_smoothed > up_threshold:  # Need to go clearly above threshold
                        frames_in_up_position += 1
                        if frames_in_up_position >= required_confirmation_frames:
                            squat_state = 0  # Confirmed back to standing position
                            frames_in_up_position = 0
                            count += 1  # Only count a complete rep when fully returned to start
                            feedback = "Rep Completed!"
                    else:
                        frames_in_up_position = 0  # Reset if not consistently in position
            
            # Detailed feedback based on form and angles
            if form == "Beginner":
                if "Rep Completed" not in feedback:  # Don't override rep completion message
                    feedback = f"Beginner: Try to squat deeper, Knee={int(knee_angle_smoothed)}°"
            elif form == "Intermediate":
                if "Rep Completed" not in feedback:
                    feedback = f"Intermediate: Good form, Knee={int(knee_angle_smoothed)}°"
            elif form == "Expert":
                if "Rep Completed" not in feedback:
                    feedback = f"Expert: Excellent squat, Knee={int(knee_angle_smoothed)}°"
            elif form == "Deep Squat":
                if "Rep Completed" not in feedback:
                    feedback = f"Deep Squat: Great depth, Knee={int(knee_angle_smoothed)}°"
                
            
            # Draw Bar
            cv2.rectangle(img, (580, 50), (600, 380), (0, 255, 0), 3)
            cv2.rectangle(img, (580, int(bar)), (600, 380), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, f'{int(per)}%', (565, 430), cv2.FONT_HERSHEY_PLAIN, 2,
                        (255, 0, 0), 2)

            # Squat counter
            cv2.rectangle(img, (0, 380), (100, 480), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, str(int(count)), (25, 455), cv2.FONT_HERSHEY_PLAIN, 5,
                        (255, 0, 0), 5)

        # Feedback and Level display
        cv2.putText(img, f"Form: {form}", (10, 30),
                    cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
        cv2.putText(img, f"State: {squat_state}", (10, 60),
                    cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
        cv2.putText(img, f"Hip: {int(hip_angle_smoothed)}", (10, 90),
                    cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
        cv2.putText(img, f"Knee: {int(knee_angle_smoothed)}", (10, 120),
                    cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
        cv2.putText(img, f"Ankle: {int(ankle_angle_smoothed)}", (10, 150),
                    cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)
                    
        # Top feedback banner
        cv2.rectangle(img, (0, 0), (640, 40), (255, 255, 255), cv2.FILLED)
        cv2.putText(img, feedback, (10, 30), cv2.FONT_HERSHEY_PLAIN, 1.5,
                    (0, 255, 0), 2)

        # Show final frame with feedback and counters
        cv2.imshow('Squat Counter', img)
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()  # Release the webcam
    cv2.destroyAllWindows()  # Close all OpenCV windows


if __name__ == "__main__":
    main()