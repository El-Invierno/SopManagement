import React, { useState } from 'react';
import { logChange } from '../../api';

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
      <form className="space-y-4">
        <div>
          <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SOP ID:</label>
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
        <div>
          <label htmlFor="change" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change Description:</label>
          <input
            id="change"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
            type="text"
            placeholder="Enter Change Description"
            value={change}
            onChange={(e) => setChange(e.target.value)}
            required
          />
        </div>
        <button
          type="button"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
          onClick={handleLogChange}
        >
          Log Change
        </button>
      </form>
    </div>
  );
};

export default LogChange;
