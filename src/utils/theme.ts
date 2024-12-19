import type { Theme } from '../types/theme';

export function applyTheme(isDarkMode: boolean, theme: Theme): void {
  const root = document.documentElement;
  const body = document.body;
  
  // Apply dark mode
  if (isDarkMode) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Apply theme colors as CSS variables
  root.style.setProperty('--primary-color', theme.colors.primary);
  root.style.setProperty('--secondary-color', theme.colors.secondary);
  root.style.setProperty('--accent-color', theme.colors.accent);
  
  // Apply font and background
  const backgroundClass = isDarkMode ? 'dark bg-gradient-to-br from-gray-900 to-slate-900' : 
    `bg-gradient-to-br ${theme.colors.background}`;
  
  // Preserve existing classes that we don't want to remove
  const existingClasses = Array.from(body.classList)
    .filter(cls => !cls.startsWith('bg-') && !cls.startsWith('font-') && cls !== 'dark');
  
  body.className = [theme.font, backgroundClass, ...existingClasses].join(' ');
}