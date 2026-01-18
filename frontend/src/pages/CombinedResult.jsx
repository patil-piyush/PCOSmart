import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import location
import { FaDownload, FaArrowRight, FaImage, FaClipboardList, FaStar } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PCOSReportPDF from '../components/PCOSReportPDF';
import { generateCombinedInsights } from '../utils/reportLogic';
import { useAuth } from '../context/AuthContext'; // Import Auth
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const CombinedResult = () => {
  const chartRef = useRef(null);
  const [chartImage, setChartImage] = useState('');
  const { user } = useAuth(); // Get Real User Data
  const location = useLocation();

  // Get Data passed from CombinedTest or use Default Mock
  const uploadedImage = location.state?.image || "https://via.placeholder.com/300?text=No+Image";
  const testData = location.state?.testData || {
    probability: 0.78,
    imageData: { probability: 0.72 },
    symptomData: { cycleIrregular: true, hirsutism: true }
  };

  // Generate Advanced Insights
  const { insights, diet, exercise, medical } = generateCombinedInsights(testData);

  // Chart Data for PDF
  const chartData = {
    labels: ['Ultrasound Risk', 'Symptom Risk', 'Combined Risk'],
    datasets: [{
      label: 'Risk Analysis %',
      data: [72, 65, (testData.probability * 100)],
      backgroundColor: ['#D6689C', '#9F7AEA', '#DD6B20'],
    }]
  };

  useEffect(() => {
    // Generate Chart Image for PDF
    if (chartRef.current) {
      setTimeout(() => setChartImage(chartRef.current.toBase64Image()), 800);
    }
  }, []);

  return (
    <div className="container page-spacing" style={{ maxWidth: '1100px' }}>
      <div className="text-center mb-10">
        <span className="badge">Analysis Complete</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Your Complete <span style={{ color: '#D6689C' }}>Results</span></h1>
      </div>

      {/* ==================== 
          VISIBLE UI SECTION 
         ==================== */}
      <div className="result-grid-3">
        {/* Card 1 */}
        <div className="result-stat-card">
          <div className="icon-square" style={{ background: '#FFF5F5', color: '#D6689C', margin: '0 auto 15px auto' }}>
            <FaImage />
          </div>
          <h4 style={{ color: '#718096' }}>Image Score</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D6689C' }}>72%</div>
        </div>
        
        {/* Card 2 */}
        <div className="result-stat-card">
          <div className="icon-square" style={{ background: '#F3E8FF', color: '#9F7AEA', margin: '0 auto 15px auto' }}>
            <FaClipboardList />
          </div>
          <h4 style={{ color: '#718096' }}>Symptom Score</h4>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#9F7AEA' }}>65%</div>
        </div>

        {/* Card 3 (Final) */}
        <div className="result-stat-card" style={{ background: 'linear-gradient(135deg, #D6689C 0%, #B370B0 100%)', color: 'white' }}>
          <FaStar size={30} style={{ marginBottom: '15px', opacity: 0.8 }} />
          <h4 style={{ color: 'rgba(255,255,255,0.8)' }}>Final Probability</h4>
          <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{(testData.probability * 100).toFixed(0)}%</div>
          <span style={{ background: 'white', color: '#D6689C', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            {testData.probability > 0.7 ? "High Risk" : "Moderate Risk"}
          </span>
        </div>
      </div>

      {/* Insights Text */}
      <div className="card mb-10">
        <h3 style={{ marginBottom: '20px' }}>Understanding Your Results</h3>
        {insights.map((insight, i) => (
          <p key={i} style={{ color: '#4A5568', marginBottom: '8px', fontSize: '0.95rem' }}>• {insight}</p>
        ))}
      </div>

      {/* Visible Recommendations */}
      <div className="result-grid-3">
        <div className="rec-card">
          <h4 style={{ marginBottom: '10px' }}>Diet</h4>
          <ul className="rec-list">{diet.slice(0,3).map((t,i)=><li key={i}>{t}</li>)}</ul>
        </div>
        <div className="rec-card">
          <h4 style={{ marginBottom: '10px' }}>Exercise</h4>
          <ul className="rec-list">{exercise.slice(0,3).map((t,i)=><li key={i}>{t}</li>)}</ul>
        </div>
        <div className="rec-card">
          <h4 style={{ marginBottom: '10px' }}>Medical</h4>
          <ul className="rec-list">{medical.slice(0,3).map((t,i)=><li key={i}>{t}</li>)}</ul>
        </div>
      </div>

      {/* ==================== 
          HIDDEN CHART FOR PDF 
         ==================== */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <Bar ref={chartRef} data={chartData} width={600} height={300} />
      </div>

      {/* ==================== 
          BUTTONS 
         ==================== */}
      <div className="flex justify-center gap-20 mt-10 flex-wrap">
        
        {chartImage ? (
          <PDFDownloadLink
            document={
              <PCOSReportPDF 
                reportTitle="Comprehensive PCOS Assessment"
                userData={user || { name: "Guest User", age: "N/A", email: "N/A" }}
                testData={testData}
                insights={insights}
                diet={diet}
                exercise={exercise}
                medical={medical}
                chartImage={chartImage}
                uploadedImage={uploadedImage} // Pass Image
              />
            }
            fileName="PCOSmart_Combined_Report.pdf"
            className="btn btn-primary"
          >
            {({ loading }) => (loading ? 'Generating Report...' : <><FaDownload /> Download Detailed PDF Report</>)}
          </PDFDownloadLink>
        ) : (
          <button className="btn btn-primary" disabled>Loading PDF...</button>
        )}

        <Link to="/diet" className="btn btn-outline">View Full Diet Guide</Link>
      </div>
    </div>
  );
};

export default CombinedResult;