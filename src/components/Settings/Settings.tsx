import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { SettingsPopover } from './SettingsPopover';
import { useSettingsPopover } from './hooks/useSettingsPopover';
import { useTheme } from '../../contexts/ThemeContext';

export function Settings() {
  const { isOpen, togglePopover, closePopover } = useSettingsPopover();
  const { isDarkMode } = useTheme();

  return (
    <div className="fixed top-6 right-6 z-50">
      <button 
        className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg p-3 rounded-full hover:bg-opacity-75 transition-all duration-300`}
        onClick={togglePopover}
      >
        <SettingsIcon className="w-6 h-6 text-white" />
      </button>

      <SettingsPopover 
        isOpen={isOpen} 
        onClose={closePopover} 
      />
    </div>
  );
}