import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { themes } from '../../themes/themesList';
import type { Theme } from '../../types/theme';

export function ThemeSelector() {
  const { currentTheme, setTheme } = useTheme();

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium opacity-70">Select Theme</h4>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setTheme(theme)}
            className={`p-3 rounded-lg transition-all ${
              currentTheme.name === theme.name
                ? 'ring-2 ring-primary bg-primary/10'
                : 'hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <span className="text-sm">{theme.name}</span>
              {currentTheme.name === theme.name && (
                <Check className="w-4 h-4 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}