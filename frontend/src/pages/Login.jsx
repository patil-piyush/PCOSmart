import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaHeart } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth(); // Get login function
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Stop form refresh
    // Simulate API call
    login(); 
    navigate('/'); // Redirect to Home
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="login-header">
          <div className="login-logo-icon"><FaHeart /></div>
          <h2 style={{ fontSize: '2rem', marginBottom: '5px', color: '#2D3748', fontFamily: '"Playfair Display", serif' }}>
            PCOS<span style={{ color: '#D6689C' }}>mart</span>
          </h2>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '5px' }}>Welcome Back</h3>
          <p style={{ color: '#718096', fontSize: '0.95rem' }}>Sign in to access your health dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4A5568' }}>Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon-left" />
              <input type="email" className="input-with-icon" placeholder="jane@example.com" required />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4A5568' }}>Password</label>
              <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
            </div>
            <div className="input-wrapper">
              <FaLock className="input-icon-left" />
              <input 
                type={showPassword ? "text" : "password"} 
                className="input-with-icon" 
                placeholder="Enter your password" 
                required
              />
              <div className="input-icon-right" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <button type="submit" className="btn-register-full" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            <FaSignInAlt /> Sign In
          </button>

          <p style={{ textAlign: 'center', marginTop: '10px', color: '#718096', fontSize: '0.95rem' }}>
            Don't have an account? <Link to="/register" style={{ color: '#D6689C', fontWeight: '600' }}>Create one</Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default Login;