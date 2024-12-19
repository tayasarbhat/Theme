import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export function TimeDisplay() {
  const [time, setTime] = useState(new Date());
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mb-6 sm:mb-8 lg:mb-10">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
        {time.toLocaleTimeString()}
      </div>
      <div className="text-base sm:text-lg lg:text-xl opacity-80">
        {time.toLocaleDateString('en-US', { 
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  );
}