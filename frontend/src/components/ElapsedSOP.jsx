// src/components/ElapsedSOP.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

const ElapsedSOP = () => {
  const [sops, setSOPs] = useState([]);

  useEffect(() => {
    fetchSOPs();
  }, []);

  const fetchSOPs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sops/view-sops`);
      setSOPs(response.data);
    } catch (error) {
      console.error("Error fetching SOPs:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Elapsed SOPs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sops.map((sop) => (
          <div key={sop._id} className="p-6 bg-white dark:bg-gray-900 dark:border-gray-700 border border-gray-200 rounded-lg shadow">
            <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {sop.title}
            </h5>
            <p className="text-gray-500 dark:text-gray-400">ID: {sop._id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElapsedSOP;
