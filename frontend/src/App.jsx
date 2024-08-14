import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import SOPForm from './components/SOPForm';
import AssessQuality from './components/AssessQuality';
import AISuggestions from './components/AISuggestions';
import LogChange from './components/LogChange';
import ViewSOP from './components/ViewSOP';
import ElapsedSOP from './components/ElapsedSOP'; // Import ElapsedSOP component
import Notifications from './components/Notifications'; // Import Notifications component
import { IoMdNotificationsOutline } from "react-icons/io";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false); // State for managing the notifications dropdown

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  return (
    <Router>
      <div className="bg-gray-50 dark:bg-gray-800">
        <nav className="border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="https://github.com/El-Invierno/SopManagement/blob/main/frontend/public/logo.jpg?raw=true" alt="Logo" className="h-8" />
              <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">SOP Management</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/view-sops" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">View SOPs</Link>
              <Link to="/create-sop" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Create SOP</Link>
              <Link to="/assess-quality" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Assess Quality</Link>
              <Link to="/ai-suggestions" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">AI Suggest/Gap Analysis</Link>
              <Link to="/log-change" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Log Change</Link>
              <Link to="/elapsed-sop" className="text-gray-900 dark:text-gray-400 hover:text-gray-700">Control Capture</Link> {/* New Link */}
              
              {/* Notifications Bell Icon */}
              <div className="relative">
                <button onClick={toggleNotifications} className="relative focus:outline-none">
                  <IoMdNotificationsOutline size={24} />
                  {/* Add a red dot if there are unread notifications */}
                  <span className="absolute top-0 right-0 block w-2 h-2 bg-red-600 rounded-full"></span>
                </button>
                {notificationsOpen && <Notifications />} {/* Show Notifications dropdown */}
              </div>
            </div>
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
          </div>
        </nav>
        {/* Mobile menu, toggle with button */}
        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-gray-50 dark:bg-gray-800`}>
          <ul className="flex flex-col">
            <li>
              <Link to="/view-sops" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>View SOPs</Link>
            </li>
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
              <Link to="/ai-suggestions" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>AI Suggest/Gap Analysis</Link>
            </li>
            <li>
              <Link to="/log-change" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>Log Change</Link>
            </li>
            <li>
              <Link to="/elapsed-sop" className="block py-3 px-4 text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={toggleMenu}>Elapsed SOP</Link> {/* New Link */}
            </li>
          </ul>
        </div>
      </div>
      <main className="max-w-screen-xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-sop" element={<SOPForm />} />
          <Route path="/assess-quality" element={<AssessQuality />} />
          <Route path="/ai-suggestions" element={<AISuggestions />} />
          <Route path="/log-change" element={<LogChange />} />
          <Route path="/view-sops" element={<ViewSOP />} />
          <Route path="/elapsed-sop" element={<ElapsedSOP />} /> {/* New Route */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
