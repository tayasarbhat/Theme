import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`w-full flex items-center justify-between p-3 rounded-lg ${
        isDarkMode ? 'bg-gray-700/50' : 'bg-white/5'
      } hover:bg-opacity-75 transition-colors`}
    >
      <div className="flex items-center gap-3">
        {isDarkMode ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
        <span>{isDarkMode ? 'Dark' : 'Light'} Mode</span>
      </div>
      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${
        isDarkMode ? 'bg-blue-500' : 'bg-gray-400'
      }`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
          isDarkMode ? 'translate-x-4' : 'translate-x-0'
        }`} />
      </div>
    </button>
  );
}