import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import type { TimetableRowProps } from './types';

export function TimetableRow({ item, onChange, onDelete }: TimetableRowProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleTimeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...item, time: e.target.value });
  }, [item, onChange]);

  const handleActivityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...item, activity: e.target.value });
  }, [item, onChange]);

  return (
    <div 
      className="flex gap-1 items-center w-full group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="text"
        value={item.time}
        onChange={handleTimeChange}
        placeholder="00:00"
        className="bg-white/5 rounded-lg px-2 py-1.5 text-white placeholder-white/50 w-16 text-sm"
      />
      <input
        type="text"
        value={item.activity}
        onChange={handleActivityChange}
        placeholder="Activity"
        className="bg-white/5 rounded-lg px-2 py-1.5 text-white placeholder-white/50 flex-1 min-w-0 text-sm"
      />
      <button
        onClick={onDelete}
        className={`text-white/50 hover:text-white/80 transition-opacity duration-200 p-1 absolute right-0 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        title="Delete row"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}