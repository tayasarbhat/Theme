import React from 'react';
import { Plus } from 'lucide-react';
import { TimetableRow } from './TimetableRow';
import { useTimetableData } from './hooks/useTimetableData';
import { useTheme } from '../../contexts/ThemeContext';

export function Timetable() {
  const { items, addRow, updateRow, deleteRow } = useTimetableData();
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg rounded-2xl p-4`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Timetable</h2>
        <button 
          onClick={addRow}
          className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-white/20'} p-1.5 rounded-full transition-all hover:bg-opacity-75`}
          title="Add new row"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <TimetableRow
            key={item.id}
            item={item}
            onChange={(newData) => updateRow(item.id, newData)}
            onDelete={() => deleteRow(item.id)}
          />
        ))}
      </div>
    </div>
  );
}