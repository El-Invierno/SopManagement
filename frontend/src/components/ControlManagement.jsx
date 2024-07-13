import React, { useState } from 'react';
import axios from 'axios';

const ControlManagement = () => {
  const [sopId, setSopId] = useState('');
  const [control, setControl] = useState('');
  const [controlId, setControlId] = useState('');

  const handleAddControl = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/sops/control/${sopId}`, { control });
      alert('Control added');
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyControl = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/sops/control/${sopId}/${controlId}`);
      alert('Control verified');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={sopId} onChange={(e) => setSopId(e.target.value)} placeholder="SOP ID" />
      <input type="text" value={control} onChange={(e) => setControl(e.target.value)} placeholder="Control" />
      <button onClick={handleAddControl}>Add Control</button>
      <input type="text" value={controlId} onChange={(e) => setControlId(e.target.value)} placeholder="Control ID" />
      <button onClick={handleVerifyControl}>Verify Control</button>
    </div>
  );
};

export default ControlManagement;
