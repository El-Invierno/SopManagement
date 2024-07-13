import React, { useState } from 'react';
import { logChange } from '../../../backend/services/api';

const LogChange = () => {
  const [id, setId] = useState('');
  const [change, setChange] = useState('');

  const handleLogChange = async () => {
    try {
      await logChange(id, { change });
      alert('Change logged successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to log change');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Log Change</h2>
      <input
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        type="text"
        placeholder="Enter SOP ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        type="text"
        placeholder="Enter Change Description"
        value={change}
        onChange={(e) => setChange(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleLogChange}
      >
        Log Change
      </button>
    </div>
  );
};

export default LogChange;
