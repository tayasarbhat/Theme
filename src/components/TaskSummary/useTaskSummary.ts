import { useState, useEffect } from 'react';

interface Task {
  text: string;
  date: Date;
}

export function useTaskSummary() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const calendarTasks = JSON.parse(localStorage.getItem('calendarTasks') || '{}');
    const allTasks: Task[] = [];

    Object.entries(calendarTasks).forEach(([dateKey, taskList]: [string, string[]]) => {
      const [year, month, day] = dateKey.split('-').map(Number);
      taskList.forEach((text: string) => {
        allTasks.push({
          text,
          date: new Date(year, month, day)
        });
      });
    });

    // Sort by date
    allTasks.sort((a, b) => a.date.getTime() - b.date.getTime());
    setTasks(allTasks);
  }, []);

  const getTaskStatus = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);

    const diffTime = taskDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status: 'overdue' | 'today' | 'upcoming' = 'upcoming';
    let daysText = '';

    if (diffDays < 0) {
      status = 'overdue';
      daysText = `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''} overdue`;
    } else if (diffDays === 0) {
      status = 'today';
      daysText = 'Due today';
    } else {
      status = 'upcoming';
      daysText = `${diffDays} day${diffDays > 1 ? 's' : ''} remaining`;
    }

    return { status, daysText };
  };

  return { tasks, getTaskStatus };
}