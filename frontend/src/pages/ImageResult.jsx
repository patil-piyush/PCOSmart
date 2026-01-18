import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaDownload, FaArrowRight, FaEye } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PCOSReportPDF from '../components/PCOSReportPDF';
import { generateImageInsights } from '../utils/reportLogic';
import { useAuth } from '../context/AuthContext';

const ImageResult = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Retrieve image from previous page (ImageTest.jsx)
  const uploadedImage = location.state?.image || null;
  const testData = { probability: 0.72 };

  const { insights, diet, exercise, medical } = generateImageInsights(testData);

  return (
    <div className="container page-spacing" style={{ maxWidth: '1000px' }}>
      <div className="text-center mb-10">
        <span className="badge">Image Analysis Complete</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Image <span style={{ color: '#D6689C' }}>Results</span></h1>
      </div>

      <div className="card mb-8">
        <div className="flex" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
          
          <div style={{ flex: 1, minWidth: '250px', textAlign: 'center' }}>
            <h4 style={{ color: '#718096', marginBottom: '20px' }}>PCOS Probability</h4>
            <div className="circle-progress-wrap" style={{ '--percentage': 72 }}>
              <div className="circle-inner">
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D6689C' }}>72%</span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* DISPLAY UPLOADED IMAGE HERE */}
            <div className="heatmap-box" style={{ background: '#FFF', border: '1px solid #eee', overflow: 'hidden' }}>
              {uploadedImage ? (
                <img src={uploadedImage} alt="Analyzed Ultrasound" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <p style={{ color: '#A0AEC0' }}>No image data available.</p>
              )}
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#718096' }}>
              Red overlay indicates potential follicular clustering detected by AI.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-20 justify-center flex-wrap mt-10">
        <Link to="/check/combined" className="btn btn-primary">+ Combine with Symptoms</Link>
        
        <PDFDownloadLink
          document={
            <PCOSReportPDF 
              reportTitle="Ultrasound Analysis Report"
              userData={user || { name: "Guest", age: "N/A" }}
              testData={testData}
              insights={insights}
              diet={diet} exercise={exercise} medical={medical}
              uploadedImage={uploadedImage} // Pass Image to PDF
            />
          }
          fileName="PCOSmart_Image_Report.pdf"
          className="btn btn-outline"
        >
          {({ loading }) => (loading ? 'Preparing PDF...' : <><FaDownload /> Download Report</>)}
        </PDFDownloadLink>

        <Link to="/diet" className="btn btn-white border">View Recommendations <FaArrowRight /></Link>
      </div>
    </div>
  );
};

export default ImageResult;