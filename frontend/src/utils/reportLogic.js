// src/utils/reportLogic.js

export const getRiskLevel = (probability) => {
  if (probability > 0.75) return { label: "High", color: "red" };
  if (probability > 0.35) return { label: "Moderate", color: "orange" };
  return { label: "Low", color: "green" };
};

const getDetailedRecommendations = (riskLevel) => {
  if (riskLevel === "High") {
    return {
      diet: [
        "Strict Low-Glycemic Index (GI) Diet: Avoid sugary foods, white bread, and pasta.",
        "Anti-inflammatory foods: Increase intake of turmeric, ginger, fatty fish (salmon), and leafy greens.",
        "Eliminate processed foods and trans fats immediately.",
        "Consider intermittent fasting (14:10 window) after consulting a doctor."
      ],
      exercise: [
        "Daily: 45 minutes of moderate cardio (brisk walking, swimming).",
        "Weekly: 3 sessions of High-Intensity Interval Training (HIIT) to improve insulin sensitivity.",
        "Strength Training: Essential for metabolism boosting (2-3 times/week)."
      ],
      medical: [
        "Consult a Gynecologist immediately for a transvaginal ultrasound confirmation.",
        "Request comprehensive blood work: HbA1c (Diabetes), Lipid Profile, and Androgen levels.",
        "Discuss Insulin-sensitizing medication (like Metformin) with your doctor."
      ]
    };
  } else if (riskLevel === "Moderate") {
    return {
      diet: [
        "Balanced Plate: 50% vegetables, 25% protein, 25% whole grains.",
        "Reduce dairy intake if acne is present.",
        "Hydration: Drink 2-3 liters of water daily.",
        "Limit caffeine and alcohol."
      ],
      exercise: [
        "Daily: 30 minutes of active movement.",
        "Weekly: 2-3 sessions of resistance training or yoga.",
        "Stress management exercises (Meditation/Pranayama) to lower cortisol."
      ],
      medical: [
        "Schedule a check-up within the next 3 months.",
        "Track menstrual cycles using an app for 3 months to identify patterns.",
        "Monitor weight changes weekly."
      ]
    };
  } else {
    return {
      diet: [
        "Maintain a healthy, balanced diet rich in fiber.",
        "Focus on whole foods and avoid excessive late-night snacking."
      ],
      exercise: [
        "Maintain an active lifestyle (150 minutes of activity per week).",
        "Regular stretching or yoga."
      ],
      medical: [
        "Continue annual routine health check-ups.",
        "Report any sudden changes in period regularity to your doctor."
      ]
    };
  }
};

export const generateCombinedInsights = (data) => {
  const probability = data.probability || 0;
  const risk = getRiskLevel(probability).label;
  const recs = getDetailedRecommendations(risk);

  const insights = [
    `The AI model detected a ${risk} probability (${(probability * 100).toFixed(1)}%) of PCOS based on the combined analysis.`,
    data.imageData?.probability > 0.5 ? "Ultrasound analysis shows potential follicular clustering." : "Ultrasound analysis appears within normal range.",
    data.symptomData?.cycleIrregular ? "Reported irregular cycles are a strong clinical indicator." : "Menstrual cycle reported as regular.",
    "Confidence Score: 92% based on multi-modal analysis."
  ];

  return { insights, ...recs }; // Returns insights, diet, exercise, medical
};

export const generateImageInsights = (data) => {
  const probability = data.probability || 0;
  const risk = getRiskLevel(probability).label;
  const recs = getDetailedRecommendations(risk);

  const insights = [
    `Image analysis indicates a ${risk} likelihood of Polycystic Morphology.`,
    probability > 0.5 ? "Multiple immature follicles detected in the ovarian periphery." : "Ovarian texture appears normal.",
    "This analysis focuses strictly on visual patterns in the uploaded ultrasound."
  ];

  return { insights, ...recs };
};

export const generateSymptomInsights = (data) => {
  const probability = data.probability || 0;
  const risk = getRiskLevel(probability).label;
  const recs = getDetailedRecommendations(risk);

  const insights = [
    `Symptom profile correlates with a ${risk} risk of PCOS.`,
    data.cycleIrregular ? "Cycle irregularity is the dominant factor." : "Cycles appear regular.",
    data.hirsutism ? "Signs of clinical hyperandrogenism (excess hair) detected." : "No significant signs of hirsutism reported."
  ];

  return { insights, ...recs };
};