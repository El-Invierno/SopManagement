import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Update with your API base URL

const ViewSOP = () => {
  const [sops, setSOPs] = useState([]);
  const [expandedSopId, setExpandedSopId] = useState('');
  const [updateSOP, setUpdateSOP] = useState(null); // State to store the SOP being updated
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

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

  const toggleExpand = (id) => {
    if (expandedSopId === id) {
      setExpandedSopId('');
    } else {
      setExpandedSopId(id);
    }
  };

  const handleUpdateSOP = (sop) => {
    setUpdateSOP(sop);
    setUpdatedTitle(sop.title);
    setUpdatedContent(sop.content);
  };

  const handleUpdateSubmit = async () => {
    if (!updateSOP) return;

    const updatedSOP = {
      ...updateSOP,
      title: updatedTitle,
      content: updatedContent,
    };

    try {
      await axios.put(`${API_BASE_URL}/sops/update/${updateSOP._id}`, updatedSOP);
      fetchSOPs(); // Refresh SOPs after update
      setUpdateSOP(null); // Clear update state
      setUpdatedTitle(''); // Clear updated title
      setUpdatedContent(''); // Clear updated content
    } catch (error) {
      console.error('Error updating SOP:', error);
      // Handle error state or display an error message
    }
  };

  const handleDeleteSOP = async (sop) => {
    if (window.confirm(`Are you sure you want to delete ${sop.title}?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/sops/delete/${sop._id}`);
        fetchSOPs(); // Refresh SOPs after deletion
      } catch (error) {
        console.error('Error deleting SOP:', error);
        // Handle error state or display an error message
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All SOPs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sops.map((sop) => (
          <div key={sop._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <svg
              className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
            </svg>
            <h5 className="mb-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{sop.title}</h5>
            <p className="mb-1 text-gray-500 dark:text-gray-400">ID: {sop._id}</p>
            <div className={`overflow-hidden transition-max-height ease-out duration-300 ${expandedSopId === sop._id ? 'max-h-full' : 'max-h-20'}`}>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{sop.content}</p>
            </div>
            {updateSOP && updateSOP._id === sop._id && (
              <div className="mt-4">
                <input
                  type="text"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Updated title"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <textarea
                  className="block w-full mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Updated content"
                  value={updatedContent}
                  onChange={(e) => setUpdatedContent(e.target.value)}
                />
                <div className="mt-2">
                  <button
                    onClick={handleUpdateSubmit}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-between mt-4">
              <button
                className="inline-flex font-medium items-center text-blue-600 hover:underline"
                onClick={() => handleUpdateSOP(sop)}
              >
                Update
              </button>
              <button
                className="inline-flex font-medium items-center text-red-600 hover:underline"
                onClick={() => handleDeleteSOP(sop)}
              >
                Delete
              </button>
            </div>
            <button
              onClick={() => toggleExpand(sop._id)}
              className="inline-flex font-medium items-center text-blue-600 hover:underline mt-2"
            >
              {expandedSopId === sop._id ? 'Read Less' : 'Read More'}
              <svg
                className={`w-3 h-3 ms-2.5 rtl:rotate-[270deg] ${expandedSopId === sop._id ? 'transform rotate-180' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSOP;
