import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from './hooks/useCalendar';
import { useTasks } from '../../contexts/TaskContext';
import { CalendarGrid } from './components/CalendarGrid';
import { TaskModal } from './components/TaskModal';
import { useTheme } from '../../contexts/ThemeContext';

export function Calendar() {
  const { isDarkMode } = useTheme();
  const {
    currentDate,
    selectedDate,
    showTaskModal,
    newTask,
    getDaysInMonth,
    getFirstDayOfMonth,
    setCurrentDate,
    setSelectedDate,
    setShowTaskModal,
    setNewTask,
    isPastDate
  } = useCalendar();

  const { tasks, addTask, deleteTask } = useTasks();

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => 
      task.date.getFullYear() === date.getFullYear() &&
      task.date.getMonth() === date.getMonth() &&
      task.date.getDate() === date.getDate()
    );
  };

  const handleAddTask = () => {
    if (newTask.trim() && selectedDate) {
      addTask(selectedDate, newTask);
      setNewTask('');
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg rounded-2xl p-4 sm:p-6`}>
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-white/20'} p-2 sm:px-4 sm:py-2 rounded-lg hover:bg-opacity-75 transition-all`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <h2 className="text-base sm:text-xl font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          className={`${isDarkMode ? 'bg-gray-700/50' : 'bg-white/20'} p-2 sm:px-4 sm:py-2 rounded-lg hover:bg-opacity-75 transition-all`}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <CalendarGrid
        currentDate={currentDate}
        getFirstDayOfMonth={getFirstDayOfMonth}
        getDaysInMonth={getDaysInMonth}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setShowTaskModal(true);
        }}
        getTasksForDate={getTasksForDate}
        isPastDate={isPastDate}
      />

      {showTaskModal && selectedDate && (
        <TaskModal
          selectedDate={selectedDate}
          tasks={getTasksForDate(selectedDate)}
          newTask={newTask}
          onNewTaskChange={setNewTask}
          onAddTask={handleAddTask}
          onDeleteTask={deleteTask}
          onClose={() => setShowTaskModal(false)}
        />
      )}
    </div>
  );
}