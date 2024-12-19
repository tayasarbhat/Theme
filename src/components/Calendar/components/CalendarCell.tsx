import React from 'react';
import type { CalendarCellProps } from '../types';

export function CalendarCell({ 
  date, 
  dayNumber, 
  tasks, 
  isPast, 
  onSelect 
}: CalendarCellProps) {
  const MAX_VISIBLE_TASKS = 2;

  return (
    <button
      onClick={() => !isPast && onSelect()}
      className={`aspect-square p-2 rounded-lg relative flex flex-col ${
        isPast ? 'bg-white/5 cursor-not-allowed' : 
        tasks.length > 0 ? 'bg-white/20' : 'bg-white/5'
      } hover:bg-white/30 transition-all`}
    >
      <div className="font-semibold mb-1">{dayNumber}</div>
      {isPast && (
        <div className="absolute top-1 right-1 text-red-500">✗</div>
      )}
      {tasks.length > 0 && (
        <div className="flex-1 flex flex-col gap-1">
          {tasks.slice(0, MAX_VISIBLE_TASKS).map((task, index) => (
            <div 
              key={task.id}
              className="text-[10px] truncate bg-white/10 rounded px-1 py-0.5"
              title={task.text}
            >
              {task.text}
            </div>
          ))}
          {tasks.length > MAX_VISIBLE_TASKS && (
            <div className="text-[10px] text-white/70">
              +{tasks.length - MAX_VISIBLE_TASKS} more
            </div>
          )}
        </div>
      )}
    </button>
  );
}