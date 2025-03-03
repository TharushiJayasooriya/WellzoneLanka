import DiseaseRelatedData

def chatbot():
    print("🤖 Chatbot: Hi! Can I help you?")
    
    while True:
        user_response = input("You (yes/no): ").strip().lower()
        
        if user_response in ["no", "n"]:
            print("🤖 Chatbot: Okay, stay healthy! 😊")
            break
        elif user_response not in ["yes", "y"]:
            print("🤖 Chatbot: Please enter 'yes' or 'no'.")
            continue
        
        while True:
            print("🤖 Chatbot: Can you describe your physical illness?")
            user_input = input("You: ").strip()
            
            # Detect disease from the user's input
            disease = DiseaseRelatedData.identify_disease(user_input)
            
            if disease:
                recommendation = DiseaseRelatedData.recommend_treatment(disease)
                print(f"🤖 Chatbot: {recommendation}")
            else:
                print("🤖 Chatbot: I'm only here to help with **physical illnesses**. Please describe a physical issue.")

            # Wait for a user confirmation before proceeding
            while True:
                user_confirmation = input("You: ").strip().lower()
                if user_confirmation in ["okay", "ok", "okay thank you", "ok thank you", "thanks", "okay thanks"]:
                    break  # Proceed to next question
            
            print("🤖 Chatbot: Do you need any more help? (yes/no)")
            another_request = input("You (yes/no): ").strip().lower()
            
            if another_request in ["no", "n"]:
                print("🤖 Chatbot: Alright! Stay safe and take care. 😊")
                return
            elif another_request in ["yes", "y"]:
                print("🤖 Chatbot: Describe your other physical illness.")
            else:
                print("🤖 Chatbot: Please enter 'yes' or 'no'.")

if __name__ == "__main__":
    chatbot()
