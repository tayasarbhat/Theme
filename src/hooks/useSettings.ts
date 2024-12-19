import { useState, useEffect } from 'react';

export function useSettings() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    JSON.parse(localStorage.getItem('darkMode') || 'false')
  );
  
  const [currentTheme, setCurrentTheme] = useState(() => 
    localStorage.getItem('currentTheme') || 'theme-1'
  );

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('currentTheme', currentTheme);
    document.body.className = currentTheme;
  }, [currentTheme]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const setTheme = (theme: string) => setCurrentTheme(theme);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return {
    isDarkMode,
    toggleDarkMode,
    currentTheme,
    setTheme,
    toggleFullscreen
  };
}