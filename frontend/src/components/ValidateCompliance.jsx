import React, { useState } from 'react';
import axios from 'axios';

const ValidateCompliance = () => {
  const [sopId, setSopId] = useState('');
  const [complianceStatus, setComplianceStatus] = useState(null);

  const handleValidate = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/sops/validate/${sopId}`);
      setComplianceStatus(response.data.complianceStatus);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={sopId} onChange={(e) => setSopId(e.target.value)} placeholder="SOP ID" />
      <button onClick={handleValidate}>Validate Compliance</button>
      {complianceStatus && <p>Compliance Status: {complianceStatus}</p>}
    </div>
  );
};

export default ValidateCompliance;
