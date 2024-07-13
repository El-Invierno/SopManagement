import React, { useState } from 'react';
import { getAssessQuality } from '../../../backend/services/api';

const AssessQuality = () => {
  const [id, setId] = useState('');
  const [quality, setQuality] = useState(null);

  const handleAssess = async () => {
    try {
      const response = await getAssessQuality(id);
      setQuality(response.data.qualityScore);
    } catch (error) {
      console.error(error);
      alert('Failed to assess quality');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Assess Quality</h2>
      <input
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        type="text"
        placeholder="Enter SOP ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleAssess}
      >
        Assess
      </button>
      {quality !== null && (
        <p className="mt-4 text-lg">
          Quality Score: <span className="font-semibold">{quality}</span>
        </p>
      )}
    </div>
  );
};

export default AssessQuality;
