import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaDownload, FaArrowRight, FaClipboardList } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PCOSReportPDF from '../components/PCOSReportPDF';
import { generateSymptomInsights } from '../utils/reportLogic';
import { useAuth } from '../context/AuthContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SymptomResult = () => {
  const { user } = useAuth();
  const location = useLocation();
  const chartRef = useRef(null);
  const [chartImage, setChartImage] = useState('');

  // 1. Get Data (Mock or from State)
  const testData = location.state?.testData || { 
    probability: 0.65, 
    cycleIrregular: true, 
    hirsutism: true, 
    acne: false,
    weightGain: true
  };

  // 2. Generate Text Insights
  const { insights, diet, exercise, medical } = generateSymptomInsights(testData);

  // 3. Data for PDF Chart (Hidden)
  const pdfChartData = {
    labels: ['Irregular Cycle', 'Hair Growth', 'Weight Gain', 'Acne'],
    datasets: [{
      label: 'Symptom Severity Score',
      data: [85, 60, 75, 40],
      backgroundColor: ['#D6689C', '#F6AD55', '#FC8181', '#9F7AEA'],
    }]
  };

  // 4. Generate Image for PDF
  useEffect(() => {
    if (chartRef.current) {
      setTimeout(() => setChartImage(chartRef.current.toBase64Image()), 500);
    }
  }, []);

  return (
    <div className="container page-spacing" style={{ maxWidth: '1000px' }}>
      
      {/* Header */}
      <div className="text-center mb-10">
        <span className="badge">Symptom Analysis Complete</span>
        <h1 style={{ fontSize: '2.5rem', marginTop: '10px' }}>Symptom <span style={{ color: '#D6689C' }}>Results</span></h1>
      </div>

      {/* ==========================
          VISUAL RESULTS CARD
         ========================== */}
      <div className="card mb-8">
        <div className="flex" style={{ gap: '50px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* LEFT: DONUT / CIRCLE */}
          <div style={{ flex: 1, minWidth: '250px', textAlign: 'center', borderRight: '1px solid #EEE' }}>
            <h4 style={{ color: '#718096', marginBottom: '20px' }}>PCOS Probability</h4>
            
            {/* CSS Circle from App.css */}
            <div className="circle-progress-wrap" style={{ '--percentage': (testData.probability * 100) }}>
              <div className="circle-inner">
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D6689C' }}>
                  {(testData.probability * 100).toFixed(0)}%
                </span>
                <span style={{ fontSize: '0.8rem', color: '#718096' }}>Probability</span>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <span className={`risk-badge ${testData.probability > 0.5 ? 'risk-high' : 'risk-moderate'}`}>
                {testData.probability > 0.5 ? 'Moderate-High Risk' : 'Low-Moderate Risk'}
              </span>
            </div>
          </div>

          {/* RIGHT: SYMPTOM BARS (Visual HTML Bars) */}
          <div style={{ flex: 2, minWidth: '300px' }}>
            <h4 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaClipboardList style={{ color: '#D6689C' }} /> Symptom Impact Analysis
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Bar 1 */}
              <div>
                <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                  <span>Irregular Periods</span>
                  <span style={{ fontWeight: 'bold', color: '#D6689C' }}>High Impact</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#F7FAFC', borderRadius: '4px' }}>
                  <div style={{ width: '85%', height: '100%', background: '#D6689C', borderRadius: '4px' }}></div>
                </div>
              </div>

              {/* Bar 2 */}
              <div>
                <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                  <span>Weight Gain</span>
                  <span style={{ fontWeight: 'bold', color: '#F6AD55' }}>Moderate</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#F7FAFC', borderRadius: '4px' }}>
                  <div style={{ width: '70%', height: '100%', background: '#F6AD55', borderRadius: '4px' }}></div>
                </div>
              </div>

              {/* Bar 3 */}
              <div>
                <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.9rem' }}>
                  <span>Excess Hair Growth</span>
                  <span style={{ fontWeight: 'bold', color: '#FC8181' }}>Detected</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#F7FAFC', borderRadius: '4px' }}>
                  <div style={{ width: '55%', height: '100%', background: '#FC8181', borderRadius: '4px' }}></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ==========================
          INSIGHTS TEXT CARD
         ========================== */}
      <div className="card mb-8">
        <h3 style={{ marginBottom: '15px' }}>Understanding Your Results</h3>
        <p style={{ color: '#4A5568', lineHeight: '1.6', marginBottom: '15px' }}>
          Based on your reported symptoms, the model detected patterns consistent with hormonal imbalances often seen in PCOS. 
          Specifically, the combination of <strong>irregular cycles</strong> and <strong>weight gain</strong> contributed most to this risk score.
        </p>
        <div style={{ background: '#FFF5F5', padding: '15px', borderRadius: '10px', fontSize: '0.9rem', color: '#C53030' }}>
          <strong>Note:</strong> This is a preliminary screening based on symptoms only. For a definitive diagnosis, we recommend combining this with an Ultrasound Image test.
        </div>
      </div>

      {/* ==========================
          HIDDEN CHART (For PDF Generation)
         ========================== */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <Bar ref={chartRef} data={pdfChartData} width={600} height={300} />
      </div>

      {/* ==========================
          BUTTONS
         ========================== */}
      <div className="flex gap-20 justify-center flex-wrap mt-10">
        <Link to="/check/combined" className="btn btn-primary">
          + Combine with Ultrasound
        </Link>
        
        {chartImage ? (
          <PDFDownloadLink
            document={
              <PCOSReportPDF 
                reportTitle="Symptom Screening Report"
                userData={user || { name: "Guest User", age: "N/A" }}
                testData={testData}
                insights={insights}
                diet={diet} exercise={exercise} medical={medical}
                chartImage={chartImage} // Pass the chart image
              />
            }
            fileName="PCOSmart_Symptom_Report.pdf"
            className="btn btn-outline"
          >
            {({ loading }) => (loading ? 'Generating...' : <><FaDownload /> Download Report</>)}
          </PDFDownloadLink>
        ) : (
          <button className="btn btn-outline" disabled>Loading...</button>
        )}

        <Link to="/diet" className="btn btn-white border">
          View Recommendations <FaArrowRight />
        </Link>
      </div>

    </div>
  );
};

export default SymptomResult;