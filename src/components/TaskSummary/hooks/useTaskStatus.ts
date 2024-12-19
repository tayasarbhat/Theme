import { useCallback } from 'react';
import type { TaskStatus } from '../../../types/tasks';

export function useTaskStatus() {
  const getTaskStatus = useCallback((date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);

    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status: TaskStatus = 'upcoming';
    const daysRemaining = diffDays;

    if (diffDays < 0) {
      status = 'overdue';
    } else if (diffDays === 0) {
      status = 'today';
    } else {
      status = 'upcoming';
    }

    return { status, daysRemaining };
  }, []);

  return { getTaskStatus };
}