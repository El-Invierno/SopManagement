import React, { useState } from 'react';
import { performGapAnalysis } from '../../../backend/services/api';

const GapAnalysis = () => {
  const [id, setId] = useState('');
  const [gaps, setGaps] = useState([]);

  const handlePerformAnalysis = async () => {
    try {
      const response = await performGapAnalysis(id);
      setGaps(response.data.gaps);
    } catch (error) {
      console.error(error);
      alert('Failed to perform gap analysis');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Gap Analysis</h2>
      <input
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        type="text"
        placeholder="Enter SOP ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handlePerformAnalysis}
      >
        Analyze
      </button>
      {gaps.length > 0 && (
        <ul className="mt-4 bg-gray-100 p-4 rounded-md">
          {gaps.map((gap, index) => (
            <li key={index} className="mb-2">{gap}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GapAnalysis;
