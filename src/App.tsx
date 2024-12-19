import React from 'react';
import { TimeDisplay } from './components/TimeDisplay/TimeDisplay';
import { Timetable } from './components/Timetable/Timetable';
import { Calendar } from './components/Calendar/Calendar';
import { Notes } from './components/Notes/Notes';
import { Timer } from './components/Timer/Timer';
import { TaskSummary } from './components/TaskSummary/TaskSummary';
import { TaskProvider } from './contexts/TaskContext';
import { useUnsplashBackground } from './hooks/useUnsplashBackground';
import { AppLayout } from './components/Layout/AppLayout';
import { ThemeProvider } from './contexts/ThemeContext';
import { FloatingControls } from './components/FloatingControls/FloatingControls';

export default function App() {
  useUnsplashBackground();

  return (
    <ThemeProvider>
      <TaskProvider>
        <AppLayout>
          <FloatingControls />
          <TimeDisplay />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
            <div className="md:col-span-1 lg:col-span-3 space-y-4 sm:space-y-6">
              <Timetable />
              <Notes />
            </div>
            <div className="md:col-span-2 lg:col-span-6">
              <Calendar />
            </div>
            <div className="md:col-span-1 lg:col-span-3 space-y-4 sm:space-y-6">
              <TaskSummary />
              <Timer />
            </div>
          </div>
        </AppLayout>
      </TaskProvider>
    </ThemeProvider>
  );
}