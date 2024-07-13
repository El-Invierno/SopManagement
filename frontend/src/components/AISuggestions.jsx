import React, { useState } from 'react';
import axios from 'axios';

const AISuggestions = () => {
  const [content, setContent] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleGetSuggestions = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/ai/suggestions', { content });
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="SOP Content"
        rows="4"
        cols="50"
      />
      <button onClick={handleGetSuggestions}>Get AI Suggestions</button>
      {suggestions && <p>Suggestions: {suggestions}</p>}
    </div>
  );
};

export default AISuggestions;
