import React, { useState } from 'react';
import { getAISuggestions, updateSOPContent, getResourceLinks } from '../../api';
import ViewSOP from './ViewSOP';
import ReactMarkdown from 'react-markdown';

const AISuggestions = () => {
  const [id, setId] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [resources, setResources] = useState('');
  const [error, setError] = useState(null);

  const handleGenerateSuggestions = async () => {
    try {
      const response = await getAISuggestions(id);
      setSuggestions(response.data.suggestions);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Failed to generate AI suggestions');
    }
  };

  const handleApplyChanges = async () => {
    try {
      await updateSOPContent(id, { content: suggestions });
      alert('SOP content updated successfully!');
      
      const resourceResponse = await getResourceLinks(id);
      let resourceData = resourceResponse.data.resources;

      // Clean and format the resource data
      if (Array.isArray(resourceData)) {
        resourceData = resourceData.join('\n\n');
      } else if (typeof resourceData === 'object') {
        resourceData = JSON.stringify(resourceData, null, 2);
      }

      setResources(resourceData);
    } catch (error) {
      console.error('Failed to apply changes: ', error);
      setError('Failed to apply changes to SOP content.');
    }
  };

  const handleDownloadResources = () => {
    const blob = new Blob([resources], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resources.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">AI Assisted Gap Analysis</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter SOP ID
            </label>
            <input
              type="text"
              id="id"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
              placeholder="Enter SOP ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm"
            onClick={handleGenerateSuggestions}
          >
            Generate Suggestions
          </button>
        </form>
        {suggestions && (
          <div className="mt-4 bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Generated Suggestions:</h3>
            <div className="overflow-auto max-h-60">
              <ReactMarkdown>{suggestions}</ReactMarkdown>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={handleApplyChanges}
            >
              Apply Changes
            </button>
          </div>
        )}
        {resources && (
          <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-6">
            <h3 className="text-lg font-semibold mb-2">Resources:</h3>
            <div className="overflow-auto max-h-60">
              <ReactMarkdown>{resources}</ReactMarkdown>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={handleDownloadResources}
            >
              Download Resources
            </button>
          </div>
        )}
        {error && (
          <p className="mt-4 text-lg text-red-600">{error}</p>
        )}
      </div>
      <ViewSOP />
    </div>
  );
};

export default AISuggestions;
