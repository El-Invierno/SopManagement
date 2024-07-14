import React, { useState } from 'react';
import { getAssessQuality } from '../../api';

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
    </div>
  );
};

export default AssessQuality;
