import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Task, TaskContextType } from '../types/tasks';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('calendarTasks');
      return saved ? Object.entries(JSON.parse(saved)).flatMap(([dateKey, taskList]: [string, string[]]) => {
        const [year, month, day] = dateKey.split('-').map(Number);
        return taskList.map((text: string) => ({
          id: crypto.randomUUID(),
          text,
          date: new Date(year, month, day)
        }));
      }) : [];
    } catch (error) {
      console.error('Failed to load tasks:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      const tasksByDate = tasks.reduce((acc: Record<string, string[]>, task) => {
        const dateKey = `${task.date.getFullYear()}-${task.date.getMonth()}-${task.date.getDate()}`;
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(task.text);
        return acc;
      }, {});
      localStorage.setItem('calendarTasks', JSON.stringify(tasksByDate));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  }, [tasks]);

  const addTask = (date: Date, text: string) => {
    setTasks(prev => [...prev, { id: crypto.randomUUID(), text, date }]);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}