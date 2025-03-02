# physical_disease.py

PHYSICAL_DISEASE_SYNONYMS = {
    "back pain": ["back", "lower back", "spine", "lumbar", "stiff back", "aching back"],
    "neck pain": ["neck", "cervical", "stiff neck", "sore neck", "neck stiffness"],
    "shoulder pain": ["shoulder", "frozen shoulder", "rotator cuff", "aching shoulder"],
    "knee pain": ["knee", "joint", "arthritis", "swollen knee", "patella"],
    "joint pain": ["joint", "arthritis", "swollen", "aching joints", "stiffness"],
    "muscle pain": ["muscle", "sore muscles", "myalgia", "body pain"],
    "sciatica": ["sciatica", "nerve", "lower limb", "shooting pain", "leg numbness"],
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

# Categorizing conditions for Physiotherapists and Gym Trainers
PHYSIOTHERAPY_CONDITIONS = {
    "back pain", "neck pain", "shoulder pain", "knee pain", "joint pain",
    "sciatica", "tendonitis", "carpal tunnel syndrome", "fibromyalgia",
    "herniated disc", "osteoarthritis", "rheumatoid arthritis", 
    "ankle sprain", "plantar fasciitis"
}

GYM_TRAINING_CONDITIONS = {
    "muscle pain", "tennis elbow"
}

def recommend_treatment(disease):
    """Return the appropriate recommendation based on the disease."""
    if disease in PHYSIOTHERAPY_CONDITIONS:
        return f"The best way to treat **{disease}** is to choose a **physiotherapist**. 💆‍♂️"
    elif disease in GYM_TRAINING_CONDITIONS:
        return f"The best way to treat **{disease}** is to choose a **gym trainer**. 🏋️‍♂️"
    else:
        return f"I'm not sure about **{disease}**. Please consult a doctor. 🏥"
