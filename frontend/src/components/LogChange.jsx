import * as React from 'react';
import { TextField, Typography } from '@mui/material';
import { getChangeLogs, getAllChangeLogs } from '../../api'; // Ensure this path is correct

const LogChange = () => {
  const [changeLogs, setChangeLogs] = React.useState([]);
  const [sopId, setSopId] = React.useState('');
  const [error, setError] = React.useState(null);
  const [expandedLogIds, setExpandedLogIds] = React.useState(new Set());

  React.useEffect(() => {
    const fetchChangeLogs = async () => {
      try {
        const response = sopId 
          ? await getChangeLogs(sopId) 
          : await getAllChangeLogs(); // Fetch from all SOPs if sopId is empty

        console.log('API response:', response.data); // Log API response for debugging

        if (response.data && Array.isArray(response.data)) {
          // Sort logs in reverse chronological order
          setChangeLogs(response.data.sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt)));
        } else {
          setChangeLogs([]);
        }
      } catch (error) {
        console.error('Failed to fetch change logs:', error);
        setError('Failed to fetch change logs.');
        setChangeLogs([]);
      }
    };

    fetchChangeLogs();
  }, [sopId]);

  const handleSopIdChange = (event) => {
    setSopId(event.target.value);
  };

  const handleToggleExpand = (logId) => {
    setExpandedLogIds(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(logId)) {
        newExpanded.delete(logId);
      } else {
        newExpanded.add(logId);
      }
      return newExpanded;
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <TextField
        label="SOP ID"
        variant="outlined"
        value={sopId}
        onChange={handleSopIdChange}
        fullWidth
        margin="normal"
      />
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : changeLogs.length > 0 ? (
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {changeLogs.map((log, index) => (
            <li key={index} className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                {log.change.startsWith('+') ? `Added to SOP ID: ${sopId}` : `SOP ID: ${sopId}`}
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  {index === changeLogs.length - 1 ? 'New' : 'Edited'}
                </span>
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {new Date(log.changedAt).toLocaleString()}
              </time>
              <p className={`mb-4 text-base font-normal text-gray-500 dark:text-gray-400 ${expandedLogIds.has(log._id) ? '' : 'line-clamp-3'}`}>
                {log.change}
              </p>
              <button
                onClick={() => handleToggleExpand(log._id)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-2"
              >
                {expandedLogIds.has(log._id) ? 'Read Less' : 'Read More'}
                <svg className={`w-3.5 h-3.5 ms-2.5 ${expandedLogIds.has(log._id) ? 'transform rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                </svg>
              </button>
              {log.change.startsWith('+') && (
                <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 mt-2">
                  <svg className="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                  </svg>

                </a>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No logs available.
        </Typography>
      )}
    </div>
  );
};

export default LogChange;
