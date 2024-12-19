import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function Timer() {
  const { isDarkMode } = useTheme();
  const [seconds, setSeconds] = useState(() => 
    parseInt(localStorage.getItem('timerSeconds') || '0')
  );
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number>();

  useEffect(() => {
    localStorage.setItem('timerSeconds', seconds.toString());
  }, [seconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600).toString().padStart(2, '0');
    const mins = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const remainingSecs = (secs % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${remainingSecs}`;
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg rounded-2xl p-6`}>
      <h2 className="text-xl font-semibold mb-4">Timer</h2>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold mb-6">
          {formatTime(seconds)}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`${
              isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'
            } text-white px-4 py-2 rounded-lg transition-all`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setSeconds(0);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}