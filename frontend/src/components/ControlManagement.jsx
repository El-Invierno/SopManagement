import React, { useState } from 'react';
// import { addControl, verifyControl } from '../../api';

const ControlManagement = () => {
  const [id, setId] = useState('');
  const [control, setControl] = useState('');
  const [controlId, setControlId] = useState('');

  const handleAddControl = async () => {
    // try {
    //   await addControl(id, { control });
    //   alert('Control added successfully');
    // } catch (error) {
    //   console.error(error);
    //   alert('Failed to add control');
    // }
  };

  const handleVerifyControl = async () => {
    // try {
    //   await verifyControl(id, controlId);
    //   alert('Control verified successfully');
    // } catch (error) {
    //   console.error(error);
    //   alert('Failed to verify control');
    // }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Control Management</h2>
      <div className="mb-4">
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block mb-2"
          type="text"
          placeholder="Enter SOP ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block mb-2"
          type="text"
          placeholder="Enter Control"
          value={control}
          onChange={(e) => setControl(e.target.value)}
        />
        <button
          type="button"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
          onClick={handleAddControl}
        >
          Add Control
        </button>
      </div>
      <div>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block mb-2"
          type="text"
          placeholder="Enter Control ID"
          value={controlId}
          onChange={(e) => setControlId(e.target.value)}
        />
        <button
          type="button"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
          onClick={handleVerifyControl}
        >
          Verify Control
        </button>
      </div>
    </div>
  );
};

export default ControlManagement;
