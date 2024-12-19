import React, { useState, useEffect } from 'react';
import { NotesModal } from './NotesModal';
import { useTheme } from '../../contexts/ThemeContext';

interface Note {
  id: number;
  text: string;
}

export function Notes() {
  const { isDarkMode } = useTheme();
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('reminderNotesArray');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentNote, setCurrentNote] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('reminderNotesArray', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (currentNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: currentNote }]);
      setCurrentNote('');
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <>
      <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg rounded-2xl p-6`}>
        <h2 className="text-xl font-semibold mb-4">Quick Notes</h2>
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          className={`w-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-white/5'} rounded-lg p-3 placeholder-white/50 mb-3`}
          placeholder="Write a note..."
          rows={4}
        />
        <div className="flex gap-2">
          <button
            onClick={addNote}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all flex-1"
          >
            Add Note
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all flex-1"
          >
            View Notes
          </button>
        </div>
      </div>
      
      <NotesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notes={notes}
        onDelete={deleteNote}
      />
    </>
  );
}