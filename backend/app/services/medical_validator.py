import re

# ── Medical term list ────────────────────────────────────────────────────────
# Covers: clinical practice, pharmacology, anatomy, specialties, diagnostics,
# research, and common medical vocabulary found in student-facing documents.

MEDICAL_TERMS = {
    # Core clinical
    "diagnosis", "diagnose", "diagnostic", "diagnostics", "prognosis",
    "symptom", "symptoms", "symptomatic", "asymptomatic",
    "syndrome", "disease", "disorder", "condition", "pathology", "pathological",
    "etiology", "aetiology", "pathophysiology", "clinical", "clinically",
    "differential", "complication", "complications",

    # Treatment & management
    "treatment", "therapy", "therapeutic", "therapeutics", "intervention",
    "management", "protocol", "guideline", "guidelines", "procedure",
    "procedures", "regimen", "prophylaxis",

    # Pharmacology & drugs
    "drug", "drugs", "medication", "medications", "medicine", "medicines",
    "pharmaceutical", "pharmacology", "pharmacokinetics", "pharmacodynamics",
    "pharmacist", "dosage", "dose", "doses", "dosing", "prescription",
    "prescribe", "prescribed", "contraindication", "contraindications",
    "indication", "indications", "adverse", "toxicity", "antibiotic",
    "antibiotics", "analgesic", "anticoagulant", "antihypertensive",
    "antifungal", "antiviral", "corticosteroid", "immunosuppressant",
    "vaccine", "vaccination",

    # Patient & care settings
    "patient", "patients", "physician", "surgeon", "nurse", "nursing",
    "hospital", "clinic", "ward", "icu", "emergency", "outpatient",
    "inpatient", "admission", "discharge", "referral",

    # Anatomy & physiology
    "anatomy", "physiology", "organ", "tissue", "cell", "nerve",
    "artery", "vein", "capillary", "cardiac", "pulmonary", "renal",
    "hepatic", "neurological", "cardiovascular", "respiratory",
    "gastrointestinal", "musculoskeletal", "endocrine", "lymphatic",
    "immune", "skeletal", "cerebral", "cortex", "trachea", "oesophagus",
    "esophagus", "pancreas", "spleen", "thyroid", "adrenal",

    # Medical specialties
    "surgery", "surgical", "cardiology", "neurology", "oncology",
    "paediatrics", "pediatrics", "radiology", "psychiatry", "dermatology",
    "orthopedic", "orthopaedic", "ophthalmology", "obstetrics", "gynaecology",
    "gynecology", "urology", "nephrology", "endocrinology", "rheumatology",
    "haematology", "hematology", "immunology", "gastroenterology",
    "pulmonology", "infectious",

    # Diagnostics & investigations
    "biopsy", "laboratory", "specimen", "culture", "serology", "imaging",
    "mri", "ecg", "ekg", "echocardiogram", "ultrasound", "radiograph",
    "haemoglobin", "hemoglobin", "glucose", "creatinine", "cholesterol",
    "electrolyte", "electrolytes", "platelet", "leukocyte", "erythrocyte",
    "urinalysis", "spirometry", "biopsy",

    # Vital signs & measurements
    "hypertension", "hypotension", "tachycardia", "bradycardia",
    "tachypnoea", "tachypnea", "hypothermia", "hypoxia", "hypoxemia",
    "hyperglycaemia", "hyperglycemia", "hypoglycaemia", "hypoglycemia",

    # Common conditions
    "infection", "inflammation", "fever", "acute", "chronic",
    "benign", "malignant", "tumour", "tumor", "cancer", "carcinoma",
    "fracture", "trauma", "haemorrhage", "hemorrhage",
    "anaemia", "anemia", "diabetes", "asthma", "pneumonia",
    "sepsis", "shock", "infarction", "ischaemia", "ischemia",
    "hypertrophy", "atrophy", "necrosis", "fibrosis", "oedema", "edema",

    # Research & evidence
    "clinical trial", "randomised", "randomized", "placebo", "cohort",
    "epidemiology", "incidence", "prevalence", "mortality", "morbidity",
    "evidence-based", "meta-analysis", "systematic review",
}

# Split into single-word and multi-word for efficient matching
_SINGLE = {t for t in MEDICAL_TERMS if " " not in t}
_MULTI = {t for t in MEDICAL_TERMS if " " in t}

# Thresholds
MIN_UNIQUE_HITS = 5   # at least 5 distinct medical terms must appear
MIN_WORDS = 50        # reject documents that are basically empty


def validate_medical_content(pages: list[dict]) -> tuple[bool, str]:
    """
    Scan the first 3 pages of a parsed document for medical content.

    Args:
        pages: list of page dicts with a "text" key, as returned by parse_file.

    Returns:
        (is_valid, rejection_reason)
        is_valid is True if the document passes; rejection_reason is empty then.
    """
    sample_pages = pages[:3]
    raw = " ".join(p.text for p in sample_pages)
    lowered = raw.lower()

    word_count = len(re.findall(r"\b\w+\b", lowered))

    if word_count < MIN_WORDS:
        return False, (
            "The document contains too little readable text. "
            "Please upload a text-based PDF or DOCX."
        )

    # Count unique medical terms present
    found = {term for term in _SINGLE if re.search(rf"\b{re.escape(term)}\b", lowered)}
    found |= {phrase for phrase in _MULTI if phrase in lowered}

    if len(found) < MIN_UNIQUE_HITS:
        return False, (
            "This document does not appear to be medical or health-related. "
            "ChunkDoc is designed for medical content such as clinical guidelines, "
            "pharmacology references, anatomy texts, medical textbooks, and "
            "patient care protocols. Please upload a relevant document."
        )

    return True, ""
