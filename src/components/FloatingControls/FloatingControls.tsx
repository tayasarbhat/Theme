import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Maximize2, Minimize2 } from 'lucide-react';
import { useFullscreen } from '../../hooks/useFullscreen';
import { useTheme } from '../../contexts/ThemeContext';
import { SettingsPopover } from '../Settings/SettingsPopover';
import { useSettingsPopover } from '../Settings/hooks/useSettingsPopover';

export function FloatingControls() {
  const [isVisible, setIsVisible] = useState(true);
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isOpen: isSettingsOpen, togglePopover, closePopover } = useSettingsPopover();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    let timeoutId: number;

    const handleMouseMove = () => {
      setIsVisible(true);
      clearTimeout(timeoutId);
      
      timeoutId = window.setTimeout(() => {
        if (!isSettingsOpen) {
          setIsVisible(false);
        }
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isSettingsOpen]);

  return (
    <>
      <div className={`fixed top-6 right-6 z-50 flex gap-3 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <button 
          onClick={toggleFullscreen}
          className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg p-3 rounded-full hover:bg-opacity-75 transition-all duration-300`}
        >
          {isFullscreen ? (
            <Minimize2 className="w-6 h-6 text-white" />
          ) : (
            <Maximize2 className="w-6 h-6 text-white" />
          )}
        </button>
        
        <button 
          className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg p-3 rounded-full hover:bg-opacity-75 transition-all duration-300`}
          onClick={togglePopover}
        >
          <SettingsIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      <SettingsPopover 
        isOpen={isSettingsOpen} 
        onClose={closePopover} 
      />
    </>
  );
}