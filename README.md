# 🌸 HerCycle  
### AI-Powered PCOS Awareness & Risk Assessment Platform

**HerCycle** is a hybrid AI-driven web platform designed to simplify **PCOS (Polycystic Ovary Syndrome) awareness and early risk assessment** by combining medical imaging, symptom-based machine learning, explainable AI (XAI), rule-based medical guidance, and LLM-powered explanations.

Our goal is not diagnosis, but **education, transparency, and empowerment**—helping users understand potential PCOS risks clearly and responsibly.

---

## 🚩 Problem Statement

PCOS affects millions of women globally, yet:

- Early symptoms are often ignored or misunderstood  
- Diagnosis is slow, expensive, and inaccessible for many  
- Medical reports are complex and hard to interpret  

There is a strong need for a **simple, explainable, and awareness-focused screening tool** that bridges the gap between raw medical data and user understanding.

---

## 💡 Solution Overview

**HerCycle** addresses this gap by offering:

- PCOS awareness and education
- AI-based risk prediction using **ultrasound images + symptoms**
- Explainable AI outputs for transparency
- Safe, rule-based diet & exercise suggestions
- Human-friendly explanations generated using LLMs
- Downloadable PDF health reports

---

## 🧠 System Architecture

User
↓
Web Interface
↓
Backend Server
↓
Image Model (CNN) + Symptom Model (ML)
↓
Prediction Fusion
↓
Explainable AI (Grad-CAM + Feature Importance)
↓
Rule-Based Recommendation Engine
↓
LLM Explanation Layer
↓
PDF Report Generation



---

## 🔄 Application Workflow

### 1️⃣ Awareness Module
Users learn about:
- What PCOS is
- Common symptoms
- Causes and long-term effects
- Lifestyle and management strategies

---

### 2️⃣ User Input
- Upload ovarian ultrasound image  
- Fill symptom-based questionnaire  

---

### 3️⃣ Image-Based Prediction
- CNN predicts PCOS probability from ultrasound images  
- **Explainability:** Grad-CAM heatmaps highlight important regions  

---

### 4️⃣ Symptom-Based Prediction
- ML model predicts PCOS risk from symptoms  
- **Explainability:** Feature importance visualization  

---

### 5️⃣ Risk Fusion
Final risk score is computed using weighted fusion:

Final Risk = 0.6 × Image Score + 0.4 × Symptom Score



---

### 6️⃣ Diet & Exercise Recommendation (Hybrid Logic)

#### Rule Engine (Safety-First)
Recommendations are selected using medically safe, predefined rules:

| Symptom | Diet Suggestion | Exercise |
|------|---------------|---------|
| Weight gain | Low-GI foods | Cardio |
| Acne | Low sugar intake | Yoga |
| Irregular cycle | Iron-rich diet | Walking |

#### LLM Enhancer
The LLM explains **why** these recommendations help in simple language—without changing the medical advice.

> Rules decide *what to suggest*  
> LLM explains *why it helps*

---

### 7️⃣ Explainable AI (XAI)

- **Image XAI:** Grad-CAM heatmaps
- **Symptom XAI:** Feature impact charts
- **Text Explanation:** Clear summary of influencing factors

---

### 8️⃣ PDF Report Generation

Users can download a comprehensive report containing:
1. User details  
2. Image-based score  
3. Symptom-based score  
4. Final risk percentage  
5. Heatmap visualization  
6. Feature importance chart  
7. Diet & exercise guidance  
8. LLM-generated explanation  
9. Medical disclaimer  

---

## 🛠️ Tech Stack

**Frontend**
- HTML, CSS, JavaScript  
- (or React / Next.js)

**Backend**
- Python (Flask / FastAPI)

**Machine Learning**
- CNN for image classification  
- Classical ML for symptom prediction  

**Explainable AI**
- Grad-CAM  
- Feature importance methods  

**LLM Integration**
- OpenAI / Gemini API (explanation-only usage)

**Reporting**
- Python `reportlab` for PDF generation  

---

## 🔐 Ethical & Medical Safety Considerations

- ❌ No medical diagnosis is provided  
- ✅ Awareness and risk estimation only  
- ✅ Rule-based recommendations ensure safety  
- ✅ Clear medical disclaimer included  
- ✅ Explainability prioritized to avoid black-box AI  

---

## 🎯 Hackathon Value Proposition

- Hybrid AI (Image + Tabular Data Fusion)
- Explainable AI for transparency
- Rule-based + LLM hybrid intelligence
- Strong real-world healthcare relevance
- Ethical, scalable, and user-centric design

---

## 🏆 Pitch Line

> **HerCycle** is a hybrid AI platform that combines medical imaging, symptom analysis, explainable AI, rule-based health guidance, and LLM-powered explanations to make PCOS awareness and screening simple, transparent, and accessible.

---

## 📌 Disclaimer

HerCycle is an **educational and awareness-focused tool** and should not be used as a substitute for professional medical diagnosis or treatment. Users are encouraged to consult certified healthcare professionals for clinical decisions.

---

## 🤝 Team

Built with purpose for hackathons, innovation challenges, and responsible AI in healthcare.

---

**HerCycle — Clear, Explainable AI for Women’s Health**
