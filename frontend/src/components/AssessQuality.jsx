import React, { useState } from 'react';
import axios from 'axios';

const AssessQuality = () => {
  const [sopId, setSopId] = useState('');
  const [qualityScore, setQualityScore] = useState(null);

  const handleAssess = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/sops/assess/${sopId}`);
      setQualityScore(response.data.qualityScore);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={sopId} onChange={(e) => setSopId(e.target.value)} placeholder="SOP ID" />
      <button onClick={handleAssess}>Assess Quality</button>
      {qualityScore && <p>Quality Score: {qualityScore}</p>}
    </div>
  );
};

export default AssessQuality;
