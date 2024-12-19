import React from 'react';
import { CalendarCell } from './CalendarCell';
import type { CalendarGridProps } from '../types';

export function CalendarGrid({ 
  currentDate,
  getFirstDayOfMonth,
  getDaysInMonth,
  onSelectDate,
  getTasksForDate,
  isPastDate
}: CalendarGridProps) {
  return (
    <>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array(getFirstDayOfMonth(currentDate)).fill(null).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array(getDaysInMonth(currentDate)).fill(null).map((_, i) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
          return (
            <CalendarCell
              key={i}
              date={date}
              dayNumber={i + 1}
              tasks={getTasksForDate(date)}
              isPast={isPastDate(date)}
              onSelect={() => onSelectDate(date)}
            />
          );
        })}
      </div>
    </>
  );
}