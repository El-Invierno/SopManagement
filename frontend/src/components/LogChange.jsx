import React, { useState } from 'react';
import axios from 'axios';

const LogChange = () => {
  const [sopId, setSopId] = useState('');
  const [change, setChange] = useState('');

  const handleLogChange = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/sops/log/${sopId}`, { change });
      alert('Change logged');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={sopId} onChange={(e) => setSopId(e.target.value)} placeholder="SOP ID" />
      <textarea value={change} onChange={(e) => setChange(e.target.value)} placeholder="Change Description" />
      <button onClick={handleLogChange}>Log Change</button>
    </div>
  );
};

export default LogChange;
