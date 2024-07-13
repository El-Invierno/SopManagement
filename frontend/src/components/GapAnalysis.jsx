import React, { useState } from 'react';
import axios from 'axios';

const GapAnalysis = () => {
  const [sopId, setSopId] = useState('');
  const [gaps, setGaps] = useState([]);

  const handlePerformGapAnalysis = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/sops/gap-analysis/${sopId}`);
      setGaps(response.data.gaps);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={sopId} onChange={(e) => setSopId(e.target.value)} placeholder="SOP ID" />
      <button onClick={handlePerformGapAnalysis}>Perform Gap Analysis</button>
      <ul>
        {gaps.map((gap, index) => (
          <li key={index}>{gap}</li>
        ))}
      </ul>
    </div>
  );
};

export default GapAnalysis;
