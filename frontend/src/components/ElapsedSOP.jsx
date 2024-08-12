import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api";

const ElapsedSOP = () => {
  const [sops, setSOPs] = useState([]);
  const [timerIntervals, setTimerIntervals] = useState({}); // To store interval IDs

  useEffect(() => {
    fetchSOPs();
  }, []);

  const fetchSOPs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sops/view-sops`);
      setSOPs(response.data);
    } catch (error) {
      console.error("Error fetching SOPs:", error);
    }
  };

  const startTimer = (sopId) => {
    const interval = setInterval(() => {
      setSOPs(prevSOPs =>
        prevSOPs.map(sop => {
          if (sop._id === sopId) {
            const updatedElapsedTime = sop.elapsedTime + 1;
            saveElapsedTime(sopId, updatedElapsedTime);
            return { ...sop, elapsedTime: updatedElapsedTime, timerStatus: 'running' };
          }
          return sop;
        })
      );
    }, 1000);
    setTimerIntervals(prev => ({ ...prev, [sopId]: interval }));
  };

  const pauseTimer = (sopId) => {
    clearInterval(timerIntervals[sopId]);
    setTimerIntervals(prev => {
      const { [sopId]: _, ...rest } = prev;
      return rest;
    });
    setSOPs(prevSOPs =>
      prevSOPs.map(sop =>
        sop._id === sopId ? { ...sop, timerStatus: 'paused' } : sop
      )
    );
  };

  const stopTimer = (sopId) => {
    pauseTimer(sopId);
    setSOPs(prevSOPs =>
      prevSOPs.map(sop => {
        if (sop._id === sopId) {
          if (sop.timerStatus !== 'stopped') {
            if (sop.elapsedTime <= sop.expectedTimeOfCompletion) {
              alert('Task completed within the expected time. Talk to the manager!');
            } else {
              alert('Task exceeded the expected time. Talk to the manager!');
            }
          }
          return { ...sop, timerStatus: 'stopped' };
        }
        return sop;
      })
    );
  };

  const resetTimer = (sopId) => {
    pauseTimer(sopId);
    setSOPs(prevSOPs =>
      prevSOPs.map(sop =>
        sop._id === sopId ? { ...sop, elapsedTime: 0, timerStatus: 'stopped' } : sop
      )
    );
    saveElapsedTime(sopId, 0);
  };

  const saveElapsedTime = async (sopId, elapsedTime) => {
    try {
      await axios.put(`${API_BASE_URL}/sops/update/${sopId}`, { elapsedTime });
    } catch (error) {
      console.error('Error saving elapsed time:', error);
    }
  };

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Elapsed SOPs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sops.map(sop => (
          <div key={sop._id} className="p-6 bg-white dark:bg-gray-900 dark:border-gray-700 border border-gray-200 rounded-lg shadow">
            <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {sop.title}
            </h5>
            <p className="text-gray-500 dark:text-gray-400">ID: {sop._id}</p>
            <p className="text-gray-500 dark:text-gray-400">Elapsed Time: {formatTime(sop.elapsedTime)}</p>
            <div className="flex space-x-2 mt-4">
              {sop.timerStatus !== 'running' ? (
                <button
                  onClick={() => startTimer(sop._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Start
                </button>
              ) : (
                <>
                  <button
                    onClick={() => pauseTimer(sop._id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                  >
                    Pause
                  </button>
                  <button
                    onClick={() => stopTimer(sop._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Stop
                  </button>
                </>
              )}
              <button
                onClick={() => resetTimer(sop._id)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
              >
                Reset
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElapsedSOP;
