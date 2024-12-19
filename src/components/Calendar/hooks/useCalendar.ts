import { useState, useCallback } from 'react';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState('');

  const getDaysInMonth = useCallback((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }, []);

  const isPastDate = useCallback((date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }, []);

  return {
    currentDate,
    selectedDate,
    showTaskModal,
    newTask,
    getDaysInMonth,
    getFirstDayOfMonth,
    isPastDate,
    setCurrentDate,
    setSelectedDate,
    setShowTaskModal,
    setNewTask
  };
}