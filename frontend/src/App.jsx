import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import SOPForm from './components/SOPForm';
import AssessQuality from './components/AssessQuality';
import AISuggestions from './components/AISuggestions';
import ControlManagement from './components/ControlManagement';
import GapAnalysis from './components/GapAnalysis';
import LogChange from './components/LogChange';
import ValidateCompliance from './components/ValidateCompliance';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-3xl font-bold">SOP Management System</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/create-sop" className="hover:underline">Create SOP</Link></li>
              <li><Link to="/assess-quality" className="hover:underline">Assess Quality</Link></li>
              <li><Link to="/ai-suggestions" className="hover:underline">AI Suggestions</Link></li>
              <li><Link to="/control-management" className="hover:underline">Control Management</Link></li>
              <li><Link to="/gap-analysis" className="hover:underline">Gap Analysis</Link></li>
              <li><Link to="/log-change" className="hover:underline">Log Change</Link></li>
              <li><Link to="/validate-compliance" className="hover:underline">Validate Compliance</Link></li>
            </ul>
          </nav>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-sop" element={<SOPForm />} />
            <Route path="/assess-quality" element={<AssessQuality />} />
            <Route path="/ai-suggestions" element={<AISuggestions />} />
            <Route path="/control-management" element={<ControlManagement />} />
            <Route path="/gap-analysis" element={<GapAnalysis />} />
            <Route path="/log-change" element={<LogChange />} />
            <Route path="/validate-compliance" element={<ValidateCompliance />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
