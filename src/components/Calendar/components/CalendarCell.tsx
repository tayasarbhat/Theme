import React from 'react';
import type { CalendarCellProps } from '../types';

export function CalendarCell({ 
  date, 
  dayNumber, 
  tasks, 
  isPast, 
  onSelect,
  onRemoveTask, // callback prop from parent
}: CalendarCellProps) {
  const MAX_VISIBLE_TASKS = 2;

  // Removes a single task by ID
  const handleRemoveTask = (taskId: string) => {
    if (onRemoveTask) {
      onRemoveTask(date, taskId);
    }
  };

  return (
    <button
      // Only call onSelect for NON-past days, so we can’t add tasks to backdates
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

      {/* Show a small "X" indicator for past dates (not required, but left here for demonstration) */}
      {isPast && (
        <div className="absolute top-1 right-1 text-red-500">✗</div>
      )}

      {tasks.length > 0 && (
        <div className="flex-1 flex flex-col gap-1">
          {tasks.slice(0, MAX_VISIBLE_TASKS).map((task) => (
            <div 
              key={task.id}
              className="text-[10px] truncate bg-white/10 rounded px-1 py-0.5"
              title={task.text}
              // If this is a past task, let user click to remove it
              onClick={(e) => {
                // If this is a past date, stop the calendar cell’s onClick from firing 
                // and prompt for removal
                if (isPast) {
                  e.stopPropagation();
                  const confirmed = window.confirm(
                    `Remove the task: "${task.text}"?`
                  );
                  if (confirmed) {
                    handleRemoveTask(task.id);
                  }
                }
              }}
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
