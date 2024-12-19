import React from 'react';
import { X } from 'lucide-react';
import type { Task } from '../../../types/tasks';

interface TaskModalProps {
  selectedDate: Date;
  tasks: Task[];
  newTask: string;
  onNewTaskChange: (value: string) => void;
  onAddTask: () => void;
  onDeleteTask: (taskId: string) => void;
  onClose: () => void;
}

export function TaskModal({
  selectedDate,
  tasks,
  newTask,
  onNewTaskChange,
  onAddTask,
  onDeleteTask,
  onClose
}: TaskModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Tasks for {selectedDate.toLocaleDateString()}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                <span>{task.text}</span>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => onNewTaskChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onAddTask()}
              placeholder="New task..."
              className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-white placeholder-white/50"
            />
            <button
              onClick={onAddTask}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}