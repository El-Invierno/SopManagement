import React, { useState } from 'react';
import { getAISuggestions } from '../../../backend/services/api';

const AISuggestions = () => {
  const [content, setContent] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleGenerateSuggestions = async () => {
    try {
      const response = await getAISuggestions(content);
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error(error);
      alert('Failed to generate AI suggestions');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">AI Suggestions</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter SOP Content</label>
          <textarea
            id="content"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
            placeholder="Enter SOP content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            required
          ></textarea>
        </div>
        <button
          className="w-full px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm"
          onClick={handleGenerateSuggestions}
        >
          Generate Suggestions
        </button>
      </form>
      {suggestions && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Generated Suggestions:</h3>
          <pre className="overflow-auto max-h-60">{JSON.stringify(suggestions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;
