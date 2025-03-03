import re

# Dictionary mapping diseases to common symptoms
PHYSICAL_DISEASE_SYNONYMS = {
    "back pain": ["back", "lower back", "spine", "lumbar", "stiff back", "aching back", "my back hurts"],
    "neck pain": ["neck", "cervical", "stiff neck", "sore neck", "neck stiffness", "my neck hurts"],
    "shoulder pain": ["shoulder", "frozen shoulder", "rotator cuff", "aching shoulder", "my shoulder hurts"],
    "knee pain": ["knee", "joint", "arthritis", "swollen knee", "patella", "my knee hurts"],
    "joint pain": ["joint", "arthritis", "swollen", "aching joints", "stiffness", "my joints hurt"],
    "muscle pain": ["muscle", "sore muscles", "myalgia", "body pain", "my muscles hurt"],
    "sciatica": ["sciatica", "nerve", "lower limb", "shooting pain", "leg numbness", "my leg hurts"],
    "tendonitis": ["tendonitis", "inflamed tendons", "tendon", "overuse injury"],
    "carpal tunnel syndrome": ["carpal", "wrist", "numb fingers", "tingling hands", "RSI"],
    "fibromyalgia": ["fibromyalgia", "chronic", "widespread pain", "fatigue"],
    "herniated disc": ["herniated", "slipped", "bulging disc", "spinal disc", "pinched nerve"],
    "osteoarthritis": ["osteoarthritis", "degenerative joint", "cartilage", "knee arthritis"],
    "rheumatoid arthritis": ["rheumatoid", "autoimmune", "chronic joint", "inflammation"],
    "tennis elbow": ["elbow", "tennis elbow", "forearm pain", "elbow pain", "golfer's elbow"],
    "ankle sprain": ["ankle", "twisted ankle", "swollen foot", "pain in ankle"],
    "plantar fasciitis": ["plantar", "heel", "foot arch", "sole pain"]
}

# Mapping of diseases to the recommended specialist
PHYSIOTHERAPIST_RECOMMENDED = {
    "back pain", "neck pain", "shoulder pain", "knee pain", "joint pain", "sciatica",
    "tendonitis", "carpal tunnel syndrome", "fibromyalgia", "herniated disc",
    "osteoarthritis", "rheumatoid arthritis"
}

GYM_TRAINER_RECOMMENDED = {
    "muscle pain", "tennis elbow", "ankle sprain", "plantar fasciitis"
}

def identify_disease(symptom):
    """
    Identify the most likely physical disease based on user input.
    """
    symptom_lower = symptom.lower()
    
    for disease, keywords in PHYSICAL_DISEASE_SYNONYMS.items():
        if any(re.search(rf"\b{keyword}\b", symptom_lower) for keyword in keywords):
            return disease
    
    return None  # Not a physical illness

def recommend_treatment(disease):
    """
    Recommend a treatment based on the detected disease.
    """
    if disease in PHYSIOTHERAPIST_RECOMMENDED:
        return f"It seems like you have **{disease}**. The best way to treat it is to choose a **physiotherapist**. 💆‍♂️"
    elif disease in GYM_TRAINER_RECOMMENDED:
        return f"It seems like you have **{disease}**. The best way to treat it is to choose a **gym trainer**. 🏋️"
    else:
        return None  # Not a recognized physical illness
