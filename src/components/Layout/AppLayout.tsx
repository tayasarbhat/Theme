import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isDarkMode, currentTheme } = useTheme();
  
  return (
    <div className={`min-h-screen ${currentTheme.colors.text}`}>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {children}
      </div>
    </div>
  );
}