import { useState, useEffect } from 'react';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('calendarTasks');
    return saved ? JSON.parse(saved) : {};
  });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('calendarTasks', JSON.stringify(tasks));
  }, [tasks]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const addTask = () => {
    if (newTask.trim() && selectedDate) {
      const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
      const currentTasks = tasks[dateKey] || [];
      setTasks({
        ...tasks,
        [dateKey]: [...currentTasks, newTask]
      });
      setNewTask('');
    }
  };

  const deleteTask = (dateKey: string, index: number) => {
    const newTasks = { ...tasks };
    newTasks[dateKey].splice(index, 1);
    if (newTasks[dateKey].length === 0) {
      delete newTasks[dateKey];
    }
    setTasks(newTasks);
  };

  return {
    currentDate,
    tasks,
    selectedDate,
    showTaskModal,
    newTask,
    getDaysInMonth,
    getFirstDayOfMonth,
    isPastDate,
    setCurrentDate,
    setSelectedDate,
    setShowTaskModal,
    setNewTask,
    addTask,
    deleteTask
  };
}