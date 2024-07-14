import React, { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className="bg-gray-50 dark:bg-gray-800">
        {/* Navbar */}
        <nav className="border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="../public/logo.jpg" alt="Logo" className="h-8" />
              <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">SOP Management</span>
            </Link>
            {/* Hamburger Menu Button (only visible on smaller screens) */}
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
              aria-controls="navbar-hamburger"
              aria-expanded={menuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path className="stroke-current" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Tabs (visible on larger screens) */}
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Home</Link>
              <Link to="/create-sop" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Create SOP</Link>
              <Link to="/assess-quality" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Assess Quality</Link>
              <Link to="/ai-suggestions" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">AI Suggestions</Link>
              <Link to="/control-management" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Control Management</Link>
              <Link to="/gap-analysis" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Gap Analysis</Link>
              <Link to="/log-change" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Log Change</Link>
              <Link to="/validate-compliance" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Validate Compliance</Link>
            </div>
          </div>
        </nav>
        {/* Hamburger Menu (Tabs) */}
        <div className={`bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 ${menuOpen ? 'block' : 'hidden'} md:hidden`} id="navbar-hamburger">
          <ul className="flex flex-col">
            <li>
              <Link to="/" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu} aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="/create-sop" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>Create SOP</Link>
            </li>
            <li>
              <Link to="/assess-quality" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>Assess Quality</Link>
            </li>
            <li>
              <Link to="/ai-suggestions" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>AI Suggestions</Link>
            </li>
            <li>
              <Link to="/control-management" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>Control Management</Link>
            </li>
            <li>
              <Link to="/gap-analysis" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>Gap Analysis</Link>
            </li>
            <li>
              <Link to="/log-change" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>Log Change</Link>
            </li>
            <li>
              <Link to="/validate-compliance" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>Validate Compliance</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto p-4">
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
    </Router>
  );
};

export default App;
