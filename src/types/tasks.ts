export interface Task {
  id: string;
  text: string;
  date: Date;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (date: Date, text: string) => void;
  deleteTask: (taskId: string) => void;
}

export type TaskStatus = 'overdue' | 'today' | 'upcoming';