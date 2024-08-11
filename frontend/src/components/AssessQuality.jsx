import React, { useState, useEffect } from 'react';
import { getAssessQuality, getAllSOPs } from '../../api'; // Import the API functions
import ViewSOP from './ViewSOP';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { Bar } from 'react-chartjs-2'; // Import Chart.js
import 'chart.js/auto';

const AssessQuality = () => {
  const [id, setId] = useState('');
  const [quality, setQuality] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [qualityData, setQualityData] = useState({
    low: 0,
    medium: 0,
    high: 0,
  });

  const handleAssess = async () => {
    try {
      // Call the API function to get the assessment
      const response = await getAssessQuality(id);
      // Set the quality score and analysis from the response
      setQuality(response.data.qualityScore);
      setAnalysis(response.data.analysis);
      setError(null); // Clear any previous errors
    } catch (error) {
      // Handle any errors and set the error message
      setQuality(null);
      setAnalysis(null); // Clear analysis on error
      setError('Failed to fetch the quality score.');
    }
  };

  const fetchQualityScores = async () => {
    try {
      const response = await getAllSOPs();
      const low = response.data.filter(sop => sop.qualityScore < 30).length;
      const medium = response.data.filter(sop => sop.qualityScore >= 30 && sop.qualityScore < 60).length;
      const high = response.data.filter(sop => sop.qualityScore >= 60).length;
      setQualityData({ low, medium, high });
    } catch (error) {
      console.error('Failed to fetch quality scores:', error);
    }
  };

  useEffect(() => {
    fetchQualityScores(); // Fetch the quality scores when the component mounts
  }, []);

  const data = {
    labels: ['Low Quality (<30)', 'Medium Quality (30-60)', 'High Quality (>60)'],
    datasets: [
      {
        label: 'Number of SOPs',
        data: [qualityData.low, qualityData.medium, qualityData.high],
        backgroundColor: ['#ff6384', '#ffcd56', '#36a2eb'],
        borderColor: ['#ff6384', '#ffcd56', '#36a2eb'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Assess Quality</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter SOP ID</label>
            <input
              id="id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
              type="text"
              placeholder="Enter SOP ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm"
            onClick={handleAssess}
          >
            Assess
          </button>
        </form>
        {quality !== null && (
          <p className="mt-4 text-lg">
            Quality Score: <span className="font-semibold">{quality}</span>
          </p>
        )}
        {analysis && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Analysis</h3>
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        )}
        {error && (
          <p className="mt-4 text-lg text-red-600">{error}</p>
        )}
      </div>

      {/* Quality Score Distribution Chart */}
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Quality Score Distribution</h2>
        <Bar data={data} options={options} />
      </div>

      <ViewSOP />
    </div>
  );
};

export default AssessQuality;
