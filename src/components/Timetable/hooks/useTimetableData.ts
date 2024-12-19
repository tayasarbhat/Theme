import { useState, useEffect, useCallback } from 'react';
import type { TimetableItem } from '../types';
import { generateUniqueId } from '../utils';

const DEFAULT_ITEMS: TimetableItem[] = [
  { id: generateUniqueId(), time: "09:00", activity: "Morning Workout" },
  { id: generateUniqueId(), time: "10:00", activity: "Team Meeting" },
  { id: generateUniqueId(), time: "13:00", activity: "Lunch Break" },
  { id: generateUniqueId(), time: "15:00", activity: "Project Work" }
];

const STORAGE_KEY = 'timetableData';

export function useTimetableData() {
  const [items, setItems] = useState<TimetableItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_ITEMS;
    } catch (error) {
      console.error('Failed to load timetable data:', error);
      return DEFAULT_ITEMS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save timetable data:', error);
    }
  }, [items]);

  const addRow = useCallback(() => {
    setItems(current => [
      ...current,
      { id: generateUniqueId(), time: "", activity: "" }
    ]);
  }, []);

  const updateRow = useCallback((id: string, newData: Omit<TimetableItem, 'id'>) => {
    setItems(current => 
      current.map(item => 
        item.id === id ? { ...item, ...newData } : item
      )
    );
  }, []);

  const deleteRow = useCallback((id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  }, []);

  return {
    items,
    addRow,
    updateRow,
    deleteRow
  };
}