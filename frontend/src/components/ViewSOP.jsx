import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your API base URL

const ViewSOP = () => {
  const [sops, setSOPs] = useState([]);

  useEffect(() => {
    fetchSOPs();
  }, []);

  const fetchSOPs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sops/view-sops`);
      setSOPs(response.data);
    } catch (error) {
      console.error('Error fetching SOPs:', error);
      // Handle error state or display an error message
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All SOPs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sops.map((sop) => (
          <div key={sop._id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold">{sop.title}</h2>
            <p className="text-gray-600 mt-2">{sop.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSOP;
