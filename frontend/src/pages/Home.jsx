import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Welcome to the SOP Management System</h2>
      <nav>
        <ul className="space-y-2">
          <li><Link to="/create-sop" className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Create SOP</Link></li>
          <li><Link to="/assess-quality" className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Assess Quality</Link></li>
          <li><Link to="/ai-suggestions" className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">AI Suggestions</Link></li>
          <li><Link to="/control-management" className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Control Management</Link></li>
          <li><Link to="/gap-analysis" className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Gap Analysis</Link></li>
          <li><Link to="/log-change" className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Log Change</Link></li>
          <li><Link to="/validate-compliance" className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Validate Compliance</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
