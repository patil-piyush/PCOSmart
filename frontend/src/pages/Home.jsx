import React from 'react';
// FIX: Added 'useNavigate' to imports
import { Link, useNavigate } from 'react-router-dom';
import { FaUpload, FaClipboardList, FaBrain, FaLeaf, FaArrowRight } from 'react-icons/fa';
// FIX: Added missing slash in path
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // Logic: Go to test if logged in, else register
  const handleStartCheck = () => {
    if (isLoggedIn) {
      navigate('/check/image');
    } else {
      navigate('/register');
    }
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="container">
          <span className="badge">AI-Powered Women's Health</span>
          <h1>Early PCOS Screening <br /> <span style={{ color: 'var(--primary)' }}>Made Simple</span></h1>
          <p>PCOSmart uses advanced AI to analyze ultrasound images and symptoms, providing personalized insights.</p>
          
          <div className="flex justify-center gap-20">
            {/* BUTTON WITH LOGIC */}
            <button onClick={handleStartCheck} className="btn btn-primary">
              Start Your Check <FaArrowRight />
            </button>
            
            {!isLoggedIn && (
              <Link to="/register" className="btn btn-outline">
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div><div className="stat-number">95%</div><div>Accuracy Rate</div></div>
          <div><div className="stat-number">50K+</div><div>Women Helped</div></div>
          <div><div className="stat-number">24/7</div><div>Available</div></div>
          <div><div className="stat-number">100%</div><div>Private & Secure</div></div>
        </div>
      </section>

      {/* Features */}
      <section className="container" style={{ padding: '80px 20px' }}>
        <div className="section-title">
          <h2>Why Choose PCOSmart?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#718096' }}>Our comprehensive approach combines cutting-edge AI technology with medical expertise.</p>
        </div>
        <div className="features-grid">
          <div className="card">
            <div className="feature-icon"><FaUpload /></div>
            <h3>Image AI Analysis</h3>
            <p>Upload your ultrasound and get instant AI-powered PCOS probability assessment.</p>
          </div>
          <div className="card">
            <div className="feature-icon"><FaClipboardList /></div>
            <h3>Symptom Screening</h3>
            <p>Answer guided questions about your symptoms for personalized risk evaluation.</p>
          </div>
          <div className="card">
            <div className="feature-icon"><FaBrain /></div>
            <h3>Explainable Results</h3>
            <p>Understand your results with visual explanations and feature importance charts.</p>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
            <p style={{ color: '#718096' }}>Get your personalized PCOS assessment in just four simple steps</p>
          </div>
          <div className="steps-grid">
            <div>
              <div className="step-box"><FaUpload /><div className="step-number">1</div></div>
              <h4>Upload</h4>
              <p style={{ fontSize: '0.9rem', color: '#718096' }}>Share your ultrasound image securely</p>
            </div>
            <div>
              <div className="step-box"><FaClipboardList /><div className="step-number">2</div></div>
              <h4>Answer</h4>
              <p style={{ fontSize: '0.9rem', color: '#718096' }}>Complete the symptom questionnaire</p>
            </div>
            <div>
              <div className="step-box"><FaBrain /><div className="step-number">3</div></div>
              <h4>Analyze</h4>
              <p style={{ fontSize: '0.9rem', color: '#718096' }}>AI processes and explains findings</p>
            </div>
            <div>
              <div className="step-box"><FaLeaf /><div className="step-number">4</div></div>
              <h4>Guide</h4>
              <p style={{ fontSize: '0.9rem', color: '#718096' }}>Get personalized diet & lifestyle tips</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button onClick={handleStartCheck} className="btn-assessment">
              Start Your Assessment <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="container">
        <div className="cta-box">
          <h2>Take Control of Your Health Today</h2>
          <p>
            Join thousands of women who have taken the first step towards understanding their reproductive health. Our AI-powered screening is fast, private, and completely free to try.
          </p>
          <div className="action-buttons-container" style={{ marginTop: '30px' }}>
            {!isLoggedIn ? (
              <Link to="/register" className="btn-white">
                Get Started Free
              </Link>
            ) : (
              <Link to="/check/combined" className="btn-white">
                Go to Dashboard
              </Link>
            )}
            <Link to="/awareness" className="btn-transparent">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;