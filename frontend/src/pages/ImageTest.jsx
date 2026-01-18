import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCloudUploadAlt, FaInfoCircle, FaImage } from 'react-icons/fa';

const ImageTest = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    if (e.target.files[0]) setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container page-spacing" style={{ maxWidth: '1000px' }}>
      <div className="text-center mb-10">
        <span className="badge">Image Analysis</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Ultrasound <span style={{ color: '#D6689C' }}>Image Test</span></h1>
        <p style={{ color: '#718096' }}>Upload your ovarian ultrasound image for AI-powered PCOS probability analysis.</p>
      </div>

      <div className="card">
        <label className="upload-zone">
          {image ? (
            <img src={image} alt="Preview" style={{ maxHeight: '350px', borderRadius: '12px' }} />
          ) : (
            <>
              <FaCloudUploadAlt style={{ fontSize: '3.5rem', color: '#D6689C', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.2rem' }}>Click to upload ultrasound image</h3>
              <p style={{ color: '#A0AEC0', marginTop: '5px' }}>Supported: JPG, PNG • Max: 10MB</p>
            </>
          )}
          <input type="file" hidden onChange={handleImageUpload} accept="image/*" />
        </label>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          {/* PASS IMAGE STATE HERE */}
          <Link 
            to="/result/image" 
            state={{ image: image }} 
            className={`btn btn-primary ${!image ? 'opacity-50 pointer-events-none' : ''}`}
          >
            Analyze Image
          </Link>
        </div>
      </div>

      <div className="result-grid-3">
        <div className="card" style={{ marginBottom: '0' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <FaInfoCircle style={{ color: '#D6689C' }} /> Instructions
          </h4>
          <ul style={{ color: '#4A5568', fontSize: '0.9rem', lineHeight: '1.8' }}>
            <li>• Use a clear transvaginal ultrasound image.</li>
            <li>• Ensure the ovaries are visible.</li>
            <li>• Avoid blurry or low-light images.</li>
          </ul>
        </div>
        <div className="card" style={{ marginBottom: '0' }}>
           <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <FaImage style={{ color: '#D6689C' }} /> Sample
          </h4>
          <div style={{ background: '#F7FAFC', height: '100px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A0AEC0' }}>
            Reference Image
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTest;