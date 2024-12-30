import React from 'react';
import type { CalendarCellProps } from '../types';

export function CalendarCell({ 
  date, 
  dayNumber, 
  tasks, 
  isPast, 
  onSelect,
  onRemoveTask  // <-- NEW callback prop
}: CalendarCellProps) {
  const MAX_VISIBLE_TASKS = 2;

  // This function will be called to remove a single task from a past date.
  // The parent component is responsible for actually deleting the task 
  // from state or making an API call, etc.
  const handleRemoveTask = (taskId: string) => {
    if (onRemoveTask) {
      onRemoveTask(date, taskId);
    }
  };

  return (
    <button
      // Only invoke onSelect if this is NOT a past date (prevents adding to past)
      onClick={() => !isPast && onSelect()}
      className={`aspect-square p-2 rounded-lg relative flex flex-col ${
        isPast 
          ? 'bg-white/5 cursor-not-allowed' 
          : tasks.length > 0 
            ? 'bg-white/20' 
            : 'bg-white/5'
      } hover:bg-white/30 transition-all`}
    >
      <div className="font-semibold mb-1">{dayNumber}</div>
      
      {/* Show a small "X" indicator for past dates */}
      {isPast && (
        <div className="absolute top-1 right-1 text-red-500">✗</div>
      )}

      {/* Render tasks, up to MAX_VISIBLE_TASKS, and show a "Remove" button if isPast */}
      {tasks.length > 0 && (
        <div className="flex-1 flex flex-col gap-1">
          {tasks.slice(0, MAX_VISIBLE_TASKS).map((task) => (
            <div 
              key={task.id}
              className="text-[10px] truncate bg-white/10 rounded px-1 py-0.5 flex items-center justify-between"
              title={task.text}
            >
              <span>{task.text}</span>
              
              {/* Show remove button only if this is a past date */}
              {isPast && (
                <button
                  type="button"
                  className="ml-2 text-red-300 hover:text-red-500 transition-colors"
                  // Prevent the parent button onClick from firing
                  // and remove this specific task
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTask(task.id);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {/* Show how many tasks remain if we have more than MAX_VISIBLE_TASKS */}
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
