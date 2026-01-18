const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const SimpleDataTest = require("../models/SimpleDataTest"); 
const ClinicalDataTest = require("../models/ClinicalDataTest"); 

// Environment Variables
const ML_SERVICE_URL = process.env.ML_SERVICE_URL;
const GEMINI_API_KEY = process.env.API;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Helper: Convert boolean-ish values to 0/1 
const to01 = (v) => {
  if (typeof v === "boolean") return v ? 1 : 0;
  if (typeof v === "number") return v ? 1 : 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["1", "true", "yes", "y"].includes(s)) return 1;
    if (["0", "false", "no", "n"].includes(s)) return 0;
  }
  return v ? 1 : 0;
};

// Helper: Generate Natural Language Analysis using Gemini
const generateAIAnalysis = async (data, probability, type = "Simple") => {
  if (!GEMINI_API_KEY) return "AI analysis unavailable (API Key missing).";

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Act as a compassionate gynecologist. A patient has undergone a PCOS screening (${type} test).
      
      Patient Data:
      - Age: ${data.age}
      - BMI: ${data.bmi}
      - Irregular Periods: ${data.menstrualCycleType === 4 ? "Yes" : "No"}
      - Weight Gain: ${data.weightGain ? "Yes" : "No"}
      - Excess Hair Growth: ${data.hairGrowth ? "Yes" : "No"}
      - Acne: ${data.pimples ? "Yes" : "No"}
      ${type === "Clinical" ? `- FSH/LH Ratio: ${data.fshLhRatio || "N/A"}` : ""}
      
      The AI Risk Model predicts: ${(probability * 100).toFixed(1)}% Probability of PCOS.

      Task: Write a personalized 3-4 sentence analysis explaining these results to the patient in simple, non-medical language. 
      Explain *why* their risk is high/low based on the specific symptoms provided above.
      Do not give a diagnosis. End with a general recommendation.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Based on your reported symptoms and the AI analysis, there are indicators consistent with your risk level. We recommend consulting a healthcare provider for a detailed evaluation.";
  }
};

// ==========================================
// 1. SIMPLE TEXT MODEL CONTROLLER
// ==========================================
const sendDataToSimpleTextModel = async (req, res) => {
  console.log("req.user =", req.user);
  try {
    const {
      age, bmi, pulseRate, respiratoryRate, hemoglobin, menstrualCycleType,
      averageCycleLength, weightGain, hairGrowth, skinDarkening, hairLoss,
      pimples, fastFood, regularExercise, bpSystolic, bpDiastolic,
    } = req.body;

    // Validation
    const required = {
      age, bmi, pulseRate, respiratoryRate, hemoglobin, menstrualCycleType,
      averageCycleLength, weightGain, hairGrowth, skinDarkening, hairLoss,
      pimples, fastFood, regularExercise, bpSystolic, bpDiastolic,
    };

    for (const [k, v] of Object.entries(required)) {
      if (v === undefined || v === null) {
        return res.status(400).json({ message: `Missing required field: ${k}` });
      }
    }

    const cycleVal = String(menstrualCycleType);
    if (!["2", "4"].includes(cycleVal)) {
      return res.status(400).json({ message: "menstrualCycleType must be 2 (Regular) or 4 (Irregular)" });
    }

    if (!ML_SERVICE_URL) {
      return res.status(500).json({ message: "ML_SERVICE_URL not set in environment" });
    }

    // Save Input Data to MongoDB
    const saved = await SimpleDataTest.create({
      userId: req.user?._id, 
      age: Number(age),
      bmi: Number(bmi),
      pulseRate: Number(pulseRate),
      respiratoryRate: Number(respiratoryRate),
      hemoglobin: Number(hemoglobin),
      menstrualCycleType: Number(cycleVal),
      averageCycleLength: Number(averageCycleLength),
      weightGain: Boolean(to01(weightGain)),
      hairGrowth: Boolean(to01(hairGrowth)),
      skinDarkening: Boolean(to01(skinDarkening)),
      hairLoss: Boolean(to01(hairLoss)),
      pimples: Boolean(to01(pimples)),
      fastFood: Boolean(to01(fastFood)),
      regularExercise: Boolean(to01(regularExercise)),
      bpSystolic: Number(bpSystolic),
      bpDiastolic: Number(bpDiastolic),
    });

    // Prepare Payload for Python ML Service
    const mlPayload = {
      age_yrs: Number(age),
      bmi: Number(bmi),
      pulse_rate_bpm: Number(pulseRate),
      rr_breaths_min: Number(respiratoryRate),
      hb_g_dl: Number(hemoglobin),
      cycle_r_i: cycleVal, 
      cycle_length_days: Number(averageCycleLength),
      weight_gain_y_n: to01(weightGain),
      hair_growth_y_n: to01(hairGrowth),
      skin_darkening_y_n: to01(skinDarkening),
      hair_loss_y_n: to01(hairLoss),
      pimples_y_n: to01(pimples),
      fast_food_y_n: to01(fastFood),
      reg_exercise_y_n: to01(regularExercise),
      bp_systolic_mmhg: Number(bpSystolic),
      bp_diastolic_mmhg: Number(bpDiastolic),
    };

    // Call Python ML Service
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict/simple`, mlPayload, {
      timeout: 30000,
    });

    // Generate Text Narrative with Gemini
    const narrationText = await generateAIAnalysis(
        { ...req.body }, 
        mlResponse.data.probability, 
        "Simple"
    );

    // Combine ML Output + Text Narrative
    const finalOutput = {
        ...mlResponse.data,
        narration: narrationText
    };

    // Save Output to MongoDB
    saved.modelOutput = finalOutput; 
    await saved.save();

    return res.status(200).json({
      message: "Prediction completed",
      submissionId: saved._id,
      inputMode: "simple",
      mlResult: finalOutput,
    });

  } catch (err) {
    console.error("sendDataToSimpleTextModel error:", err?.response?.data || err.message);
    return res.status(500).json({
      message: "Failed to process simple text model request",
      error: err?.response?.data || err.message,
    });
  }
};


// ==========================================
// 2. CLINICAL TEXT MODEL CONTROLLER
// ==========================================
const sendDataToClinicalTextModel = async (req, res) => {
  try {
    const {
      age, bmi, pulseRate, respiratoryRate, hemoglobin, menstrualCycleType,
      averageCycleLength, weightGain, hairGrowth, skinDarkening, hairLoss,
      pimples, fastFood, regularExercise, bpSystolic, bpDiastolic,
      B_HCG_Test1, B_HCG_Test2, FSH, LH, FSHLH_Ratio, TSH, AMH, prolactin,
      vitaminD3, progesterone, randomBloodSugar,
    } = req.body;

    const requiredBasic = {
      age, bmi, pulseRate, respiratoryRate, hemoglobin, menstrualCycleType,
      averageCycleLength, weightGain, hairGrowth, skinDarkening, hairLoss,
      pimples, fastFood, regularExercise, bpSystolic, bpDiastolic,
    };

    for (const [k, v] of Object.entries(requiredBasic)) {
      if (v === undefined || v === null) {
        return res.status(400).json({ message: `Missing required field: ${k}` });
      }
    }

    const cycleVal = String(menstrualCycleType);
    if (!["2", "4"].includes(cycleVal)) {
      return res.status(400).json({ message: "menstrualCycleType must be 2 (Regular) or 4 (Irregular)" });
    }

    if (!ML_SERVICE_URL) {
      return res.status(500).json({ message: "ML_SERVICE_URL not set in environment" });
    }

    // Save Input to MongoDB
    const saved = await ClinicalDataTest.create({
      userId: req.user?._id, 
      age: Number(age),
      bmi: Number(bmi),
      pulseRate: Number(pulseRate),
      respiratoryRate: Number(respiratoryRate),
      hemoglobin: Number(hemoglobin),
      menstrualCycleType: Number(cycleVal),
      averageCycleLength: Number(averageCycleLength),
      weightGain: Boolean(to01(weightGain)),
      hairGrowth: Boolean(to01(hairGrowth)),
      skinDarkening: Boolean(to01(skinDarkening)),
      hairLoss: Boolean(to01(hairLoss)),
      pimples: Boolean(to01(pimples)),
      fastFood: Boolean(to01(fastFood)),
      regularExercise: Boolean(to01(regularExercise)),
      bpSystolic: Number(bpSystolic),
      bpDiastolic: Number(bpDiastolic),
      // Labs
      betaHcg1: B_HCG_Test1 ? Number(B_HCG_Test1) : null,
      betaHcg2: B_HCG_Test2 ? Number(B_HCG_Test2) : null,
      fsh: FSH ? Number(FSH) : null,
      lh: LH ? Number(LH) : null,
      fshLhRatio: FSHLH_Ratio ? Number(FSHLH_Ratio) : null,
      tsh: TSH ? Number(TSH) : null,
      amh: AMH ? Number(AMH) : null,
      prolactin: prolactin ? Number(prolactin) : null,
      vitaminD3: vitaminD3 ? Number(vitaminD3) : null,
      progesterone: progesterone ? Number(progesterone) : null,
      rbs: randomBloodSugar ? Number(randomBloodSugar) : null,
    });

    // Prepare Payload
    const mlPayload = {
      age_yrs: Number(age),
      bmi: Number(bmi),
      pulse_rate_bpm: Number(pulseRate),
      rr_breaths_min: Number(respiratoryRate),
      hb_g_dl: Number(hemoglobin),
      cycle_r_i: cycleVal,
      cycle_length_days: Number(averageCycleLength),
      weight_gain_y_n: to01(weightGain),
      hair_growth_y_n: to01(hairGrowth),
      skin_darkening_y_n: to01(skinDarkening),
      hair_loss_y_n: to01(hairLoss),
      pimples_y_n: to01(pimples),
      fast_food_y_n: to01(fastFood),
      reg_exercise_y_n: to01(regularExercise),
      bp_systolic_mmhg: Number(bpSystolic),
      bp_diastolic_mmhg: Number(bpDiastolic),
      // Labs
      i_beta_hcg_miu_ml: B_HCG_Test1 ? Number(B_HCG_Test1) : null,
      ii_beta_hcg_miu_ml: B_HCG_Test2 ? Number(B_HCG_Test2) : null,
      fsh_miu_ml: FSH ? Number(FSH) : null,
      lh_miu_ml: LH ? Number(LH) : null,
      fsh_lh: FSHLH_Ratio ? Number(FSHLH_Ratio) : null,
      tsh_miu_l: TSH ? Number(TSH) : null,
      amh_ng_ml: AMH ? Number(AMH) : null,
      prl_ng_ml: prolactin ? Number(prolactin) : null,
      vit_d3_ng_ml: vitaminD3 ? Number(vitaminD3) : null,
      prg_ng_ml: progesterone ? Number(progesterone) : null,
      rbs_mg_dl: randomBloodSugar ? Number(randomBloodSugar) : null,
    };

    // Call Python ML Service
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/predict/clinical`, mlPayload, {
      timeout: 30000,
    });

    // Generate Text Narrative
    const narrationText = await generateAIAnalysis(
        { ...req.body }, 
        mlResponse.data.probability, 
        "Clinical"
    );

    // Combine Output
    const finalOutput = {
        ...mlResponse.data,
        narration: narrationText
    };

    // Save ML Output
    saved.modelOutput = finalOutput; 
    await saved.save();

    return res.status(200).json({
      message: "Prediction completed",
      submissionId: saved._id,
      inputMode: "clinical",
      mlResult: finalOutput,
    });

  } catch (err) {
    console.error("sendDataToClinicalTextModel error:", err?.response?.data || err.message);
    return res.status(500).json({
      message: "Failed to process clinical text model request",
      error: err?.response?.data || err.message,
    });
  }
};

module.exports = { sendDataToSimpleTextModel, sendDataToClinicalTextModel };