import React, { useState } from 'react';
import { getAssessQuality } from '../../api'; // Import the API function
import ViewSOP from './ViewSOP';

const AssessQuality = () => {
  const [id, setId] = useState('');
  const [quality, setQuality] = useState(null);
  const [error, setError] = useState(null);

  const handleAssess = async () => {
    try {
      // Call the API function to get the assessment
      const response = await getAssessQuality(id);
      console.log(response);
      // Set the quality score from the response
      setQuality(response.data.qualityScore);
      setError(null); // Clear any previous errors
    } catch (error) {
      // Handle any errors and set the error message
      setQuality(null);
      setError('Failed to fetch the quality score.');
    }
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
        {error && (
          <p className="mt-4 text-lg text-red-600">{error}</p>
        )}
      </div>
      <ViewSOP />
    </div>
  );
};

export default AssessQuality;
