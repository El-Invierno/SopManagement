import React, { useState } from 'react';
import { createSOP } from '../../../backend/services/api';

const SOPForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSOP = { title, content };
      await createSOP(newSOP);
      alert('SOP Created Successfully');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      alert('Failed to create SOP');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create SOP</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Content:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        type="submit"
      >
        Create SOP
      </button>
    </form>
  );
};

export default SOPForm;
