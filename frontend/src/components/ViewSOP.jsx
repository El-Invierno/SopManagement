import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown support
import { BASE_URL, LOCAL_BASE_URL } from "../../constants.js";

const API_BASE_URL = BASE_URL; // Update with your API base URL

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
    setIsAutoCheckEnabled(newState);
    // Save the new state to localStorage
    localStorage.setItem('isAutoCheckEnabled', JSON.stringify(newState));
  };

  const hideUpdateFields = () => {
    setUpdateSOP(null);
    setUpdatedTitle(""); // Clear updated title
    setUpdatedContent(""); // Clear updated content
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">All SOPs</h1>
        <div className="flex items-center">
          <label htmlFor="autoCheck" className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
            Auto Assess/Update
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
            className="max-w-lg bg-white dark:bg-gray-900 dark:border-gray-700 border border-gray-200 rounded-lg shadow relative"
          >
            {/* Progress bar at the top */}
            <div className="absolute top-0 left-0 w-full bg-gray-200 dark:bg-gray-800 rounded-t-lg">
              <div
                className={`h-1.5 rounded-t-lg ${getProgressColor(sop.qualityScore)}`}
                style={{ width: `${sop.qualityScore}%` }}
              ></div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-1">
                <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {sop.title}
                </h5>
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
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {sop.content}
                  </ReactMarkdown>
                </div>
              </div>
              {updateSOP && updateSOP._id === sop._id && (
                <div className="mt-4 relative">
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
                  {/* Cross Icon to close the update fields */}
                  <button
                    onClick={hideUpdateFields}
                    className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSOP;
