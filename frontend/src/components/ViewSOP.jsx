import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown support

const API_BASE_URL = "http://localhost:5000/api"; // Update with your API base URL

const ViewSOP = () => {
  const [sops, setSOPs] = useState([]);
  const [expandedSopId, setExpandedSopId] = useState("");
  const [updateSOP, setUpdateSOP] = useState(null); // State to store the SOP being updated
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAutoCheckEnabled, setIsAutoCheckEnabled] = useState(false);

  useEffect(() => {
    fetchSOPs();
    
    // Load the checkbox state from localStorage
    const savedAutoCheckState = localStorage.getItem('isAutoCheckEnabled');
    if (savedAutoCheckState !== null) {
      setIsAutoCheckEnabled(JSON.parse(savedAutoCheckState));
    }
  }, []);

  const fetchSOPs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sops/view-sops`);
      setSOPs(response.data);
    } catch (error) {
      console.error("Error fetching SOPs:", error);
      // Handle error state or display an error message
    }
  };

  const toggleExpand = (id) => {
    if (expandedSopId === id) {
      setExpandedSopId("");
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
      await axios.put(
        `${API_BASE_URL}/sops/update/${updateSOP._id}`,
        updatedSOP
      );
      fetchSOPs(); // Refresh SOPs after update
      setUpdateSOP(null); // Clear update state
      setUpdatedTitle(""); // Clear updated title
      setUpdatedContent(""); // Clear updated content
    } catch (error) {
      console.error("Error updating SOP:", error);
      // Handle error state or display an error message
    }
  };

  const handleDeleteSOP = async (sop) => {
    if (window.confirm(`Are you sure you want to delete ${sop.title}?`)) {
      try {
        await axios.delete(`${API_BASE_URL}/sops/delete/${sop._id}`);
        fetchSOPs(); // Refresh SOPs after deletion
      } catch (error) {
        console.error("Error deleting SOP:", error);
        // Handle error state or display an error message
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  const getProgressColor = (score) => {
    if (score < 30) {
      return 'bg-red-500';
    } else if (score < 60) {
      return 'bg-yellow-500';
    } else {
      return 'bg-green-500';
    }
  };

  const filteredSOPs = sops.filter((sop) =>
    sop.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleChange = () => {
    const newState = !isAutoCheckEnabled;
    console.log(newState);
    setIsAutoCheckEnabled(newState);
    // Save the new state to localStorage
    localStorage.setItem('isAutoCheckEnabled', JSON.stringify(newState));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">All SOPs</h1>
        <div className="flex items-center">
          <label htmlFor="autoCheck" className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
            Enable Quality Check
          </label>
          <input 
            id="autoCheck" 
            type="checkbox" 
            className="toggle-checkbox"
            checked={isAutoCheckEnabled}
            onChange={handleToggleChange}
          />
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by SOP Title"
          className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSOPs.map((sop) => (
          <div
          key={sop._id}
          className="max-w-lg p-6 bg-white dark:bg-gray-900 dark:border-gray-700 border border-gray-200 rounded-lg shadow"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              {/* <svg
                className="w-7 h-7 text-gray-500 dark:text-gray-300 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
              </svg> */}
              <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {sop.title}
              </h5>
            </div>
            <div className="w-full ml-4">
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${getProgressColor(sop.qualityScore)}`}
                  style={{ width: `${sop.qualityScore}%` }}
                ></div>
              </div>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 flex items-center">
            ID: {sop._id}
            <button
              onClick={() => copyToClipboard(sop._id)}
              className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
              title="Copy SOP ID"
            >
              Copy ID
            </button>
          </p>
          <div
            className={`overflow-hidden transition-max-height ease-out duration-300 ${
              expandedSopId === sop._id ? "max-h-full" : "max-h-20"
            }`}
          >
            <div className="mb-3 font-normal text-gray-500 dark:text-gray-300">
              {/* <button
                onClick={() => copyToClipboard(sop.content)}
                className="mb-2 text-blue-600 dark:text-blue-400 hover:underline"
                title="Copy SOP Content"
              >
                Copy Content
              </button> */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {sop.content}
              </ReactMarkdown>
            </div>
          </div>
          {updateSOP && updateSOP._id === sop._id && (
            <div className="mt-4">
              <input
                type="text"
                className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                placeholder="Updated title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <textarea
                className="block w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                placeholder="Updated content"
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
              <div className="mt-2">
                <button
                  onClick={handleUpdateSubmit}
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update SOP
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-between mt-4">
            <button
              className="inline-flex font-medium items-center text-blue-600 dark:text-blue-400 hover:underline"
              onClick={() => handleUpdateSOP(sop)}
            >
              DE Suggestion
            </button>
            <button
              className="inline-flex font-medium items-center text-red-600 dark:text-red-400 hover:underline"
              onClick={() => handleDeleteSOP(sop)}
            >
              Delete
            </button>
          </div>
          <button
            onClick={() => toggleExpand(sop._id)}
            className="inline-flex font-medium items-center text-blue-600 dark:text-blue-400 hover:underline mt-2"
          >
            {expandedSopId === sop._id ? "Read Less" : "Read More"}
            <svg
              className={`w-3 h-3 ms-2.5 rtl:rotate-[270deg] ${
                expandedSopId === sop._id ? "transform rotate-180" : ""
              }`}
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
