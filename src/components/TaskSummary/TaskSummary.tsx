import React from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { useTaskStatus } from './hooks/useTaskStatus';
import { useTheme } from '../../contexts/ThemeContext';

export function TaskSummary() {
  const { isDarkMode } = useTheme();
  const { tasks } = useTasks();
  const { getTaskStatus } = useTaskStatus();

  const sortedTasks = [...tasks].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg rounded-2xl p-4`}>
      <h2 className="text-lg font-semibold mb-3">Task Summary</h2>
      <div className="space-y-3">
        {sortedTasks.length === 0 ? (
          <p className="text-white/80 text-sm">No upcoming tasks</p>
        ) : (
          sortedTasks.map((task) => {
            const { status, daysRemaining } = getTaskStatus(task.date);
            return (
              <div
                key={task.id}
                className={`p-3 rounded-lg ${
                  status === 'overdue' ? 'bg-red-500/20' :
                  status === 'today' ? 'bg-yellow-500/20' :
                  isDarkMode ? 'bg-gray-700/50' : 'bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{task.text}</span>
                  <span className="text-xs opacity-70">
                    {task.date.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(Math.abs(daysRemaining), 7) }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        status === 'overdue' ? 'bg-red-400/70' :
                        status === 'today' ? 'bg-yellow-400/70' :
                        'bg-emerald-400/70'
                      }`}
                    />
                  ))}
                  <span className="text-xs ml-2 opacity-70">
                    {status === 'overdue' && `${Math.abs(daysRemaining)} days overdue`}
                    {status === 'today' && 'Due today'}
                    {status === 'upcoming' && `${daysRemaining} days remaining`}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}