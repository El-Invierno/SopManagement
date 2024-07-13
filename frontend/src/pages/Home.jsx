import React from 'react';
import SOPForm from '../components/SOPForm';
import AssessQuality from '../components/AssessQuality';
import ValidateCompliance from '../components/ValidateCompliance';
import AISuggestions from '../components/AISuggestions';
import LogChange from '../components/LogChange';
import GapAnalysis from '../components/GapAnalysis';
import ControlManagement from '../components/ControlManagement';

const Home = () => {
  return (
    <div>
      <h1>SOP Management System</h1>
      <SOPForm />
      <AssessQuality />
      <ValidateCompliance />
      <AISuggestions />
      <LogChange />
      <GapAnalysis />
      <ControlManagement />
    </div>
  );
};

export default Home;
