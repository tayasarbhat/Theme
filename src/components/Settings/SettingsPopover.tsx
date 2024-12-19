import React from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { ThemeSelector } from './ThemeSelector';

interface SettingsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPopover({ isOpen, onClose }: SettingsPopoverProps) {
  const { isDarkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className={`w-full sm:w-96 m-4 ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-white/10'
      } backdrop-blur-lg rounded-2xl p-4 shadow-lg`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Settings</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium opacity-70">Display</h4>
            <div className="space-y-2">
              <ThemeToggle />
            </div>
          </div>
          
          <div className="pt-2">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </div>
  );
}