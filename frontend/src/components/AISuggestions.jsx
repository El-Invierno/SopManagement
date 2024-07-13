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
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        placeholder="Enter SOP content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleGenerateSuggestions}
      >
        Generate Suggestions
      </button>
      {suggestions && (
        <pre className="mt-4 bg-gray-100 p-4 rounded-md">
          {JSON.stringify(suggestions, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default AISuggestions;
