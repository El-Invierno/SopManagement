import React, { useState } from 'react';
import { validateCompliance } from '../../../backend/services/api';

const ValidateCompliance = () => {
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');

  const handleValidate = async () => {
    try {
      const response = await validateCompliance(id);
      setStatus(response.data.complianceStatus);
    } catch (error) {
      console.error(error);
      alert('Failed to validate compliance');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Validate Compliance</h2>
      <input
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        type="text"
        placeholder="Enter SOP ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleValidate}
      >
        Validate
      </button>
      {status && (
        <p className="mt-4 text-lg">
          Compliance Status: <span className="font-semibold">{status}</span>
        </p>
      )}
    </div>
  );
};

export default ValidateCompliance;
