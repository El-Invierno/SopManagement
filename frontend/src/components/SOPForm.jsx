import React, { useState } from 'react';
import axios from 'axios';

const SOPForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/sops/create', { title, content });
      alert('SOP Created: ' + response.data._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required></textarea>
      <button type="submit">Create SOP</button>
    </form>
  );
};

export default SOPForm;
