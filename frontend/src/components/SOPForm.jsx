import React, { useState, useEffect } from 'react';
import { createSOP } from '../../api';

const SOPForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expectedTimeOfCompletion, setExpectedTimeOfCompletion] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all fields are filled out
    if (title && content && expectedTimeOfCompletion) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [title, content, expectedTimeOfCompletion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSOP = { 
        title, 
        content, 
        expectedTimeOfCompletion: parseInt(expectedTimeOfCompletion, 10) 
      };
      await createSOP(newSOP);
      alert('SOP Created Successfully');
      setTitle('');
      setContent('');
      setExpectedTimeOfCompletion(''); // Clear the form field
    } catch (error) {
      console.error(error);
      alert('Failed to create SOP');
    }
  };

  return (
    <div className="max-w-sm mx-auto relative">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Create SOP</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title:</label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter SOP title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content:</label>
          <textarea
            id="content"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-40 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter SOP content"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="expectedTimeOfCompletion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expected Time of Completion (in seconds):</label>
          <input
            type="number"
            id="expectedTimeOfCompletion"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={expectedTimeOfCompletion}
            onChange={(e) => setExpectedTimeOfCompletion(e.target.value)}
            placeholder="Enter expected time in seconds"
            required
          />
        </div>
        <button
          type="submit"
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            isFormValid ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isFormValid} // Disable the button if the form is not valid
        >
          Create SOP
        </button>
      </form>
    </div>
  );
};

export default SOPForm;
