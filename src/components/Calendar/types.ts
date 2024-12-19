import type { Task } from '../../types/tasks';

export interface CalendarGridProps {
  currentDate: Date;
  getFirstDayOfMonth: (date: Date) => number;
  getDaysInMonth: (date: Date) => number;
  onSelectDate: (date: Date) => void;
  getTasksForDate: (date: Date) => Task[];
  isPastDate: (date: Date) => boolean;
}

export interface CalendarCellProps {
  date: Date;
  dayNumber: number;
  tasks: Task[];
  isPast: boolean;
  onSelect: () => void;
}