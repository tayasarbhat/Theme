import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useFullscreen } from '../../hooks/useFullscreen';
import { useTheme } from '../../contexts/ThemeContext';

export function FullscreenToggle() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { isDarkMode } = useTheme();

  return (
    <button
      onClick={toggleFullscreen}
      className={`w-full flex items-center justify-between p-3 rounded-lg ${
        isDarkMode ? 'bg-gray-700/50' : 'bg-white/5'
      } hover:bg-opacity-75 transition-colors`}
    >
      <div className="flex items-center gap-3">
        {isFullscreen ? (
          <Minimize2 className="w-5 h-5" />
        ) : (
          <Maximize2 className="w-5 h-5" />
        )}
        <span>Fullscreen</span>
      </div>
      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${
        isFullscreen ? 'bg-blue-500' : 'bg-gray-400'
      }`}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
          isFullscreen ? 'translate-x-4' : 'translate-x-0'
        }`} />
      </div>
    </button>
  );
}