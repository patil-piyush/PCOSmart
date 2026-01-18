import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';

const questions = [
  { id: 1, text: "How regular are your menstrual cycles?", options: ["Very regular (28-30 days)", "Somewhat irregular", "Very irregular", "No periods"] },
  { id: 2, text: "Have you experienced rapid weight gain?", options: ["No", "Slight", "Moderate", "Significant"] },
  { id: 3, text: "Do you have excess hair growth (face/chest)?", options: ["None", "Slight", "Noticeable", "Significant"] },
  { id: 4, text: "How is your skin condition?", options: ["Clear", "Occasional Acne", "Persistent Acne", "Severe/Cystic Acne"] },
  { id: 5, text: "Have you noticed hair thinning?", options: ["No", "Slight Shedding", "Visible Thinning", "Significant Loss"] },
  { id: 6, text: "Do you have dark skin patches?", options: ["No", "Slight", "Noticeable", "Velvety Dark Patches"] }
];

const CombinedTest = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState('image'); 
  const [image, setImage] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleImageUpload = (e) => {
    if (e.target.files[0]) setImage(URL.createObjectURL(e.target.files[0]));
  };

  const confirmImage = () => setStage('questions');
  const handleOptionSelect = (option) => setAnswers({ ...answers, [currentQ]: option });

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // PASS DATA TO RESULT PAGE
      navigate('/result/combined', { 
        state: { 
          image: image, // Pass the blob URL
          testData: { probability: 0.78 } // Mock or Real result
        } 
      });
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
    else setStage('image');
  };

  const totalSteps = questions.length + 1;
  const currentStep = stage === 'image' ? 1 : currentQ + 2;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="container page-spacing" style={{ maxWidth: '800px' }}>
      
      <div className="text-center mb-8">
        <span className="badge">Step {currentStep} of {totalSteps}</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Combined <span style={{ color: '#D6689C' }}>Analysis</span></h1>
        
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {stage === 'image' && (
        <div className="card fade-in">
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Upload Ultrasound Image</h2>
          <label className="upload-zone">
            {image ? (
              <img src={image} alt="Preview" style={{ maxHeight: '300px', borderRadius: '10px' }} />
            ) : (
              <>
                <FaCloudUploadAlt style={{ fontSize: '3rem', color: '#D6689C', marginBottom: '15px' }} />
                <h3>Drop your ultrasound image here</h3>
                <p style={{ color: '#A0AEC0' }}>JPG, PNG, DICOM • Max 10MB</p>
              </>
            )}
            <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
          </label>
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <button 
              className={`btn btn-primary ${!image ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={confirmImage}
              disabled={!image}
            >
              Next: Symptom Check <FaArrowRight />
            </button>
          </div>
        </div>
      )}

      {stage === 'questions' && (
        <div className="card fade-in">
          <h3 style={{ fontSize: '1.4rem', marginBottom: '25px', color: '#2D3748' }}>
            {questions[currentQ].text}
          </h3>
          <div className="options-list">
            {questions[currentQ].options.map((option, idx) => (
              <div 
                key={idx} 
                className={`option-card ${answers[currentQ] === option ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                <div style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #CBD5E0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: answers[currentQ] === option ? '#D6689C' : 'transparent',
                  borderColor: answers[currentQ] === option ? '#D6689C' : '#CBD5E0'
                }}>
                  <FaCheck size={12} />
                </div>
                <span style={{ fontSize: '1.05rem', color: '#4A5568' }}>{option}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
            <button className="btn btn-outline" onClick={prevQuestion}>
              <FaArrowLeft /> Back
            </button>
            <button 
              className="btn btn-primary" 
              onClick={nextQuestion}
              disabled={!answers[currentQ]}
            >
              {currentQ === questions.length - 1 ? 'Analyze Results' : 'Next Question'} <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinedTest;