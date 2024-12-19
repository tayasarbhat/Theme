import React from 'react';
import { X } from 'lucide-react';

interface Note {
  id: number;
  text: string;
}

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: Note[];
  onDelete: (id: number) => void;
}

export function NotesModal({ isOpen, onClose, notes, onDelete }: NotesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Saved Notes</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {notes.length === 0 ? (
            <p className="text-white/80">No saved notes</p>
          ) : (
            notes.map(note => (
              <div
                key={note.id}
                className="bg-white/5 rounded-lg p-3 relative group"
              >
                <p className="text-white pr-8">{note.text}</p>
                <button
                  onClick={() => onDelete(note.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-red-500 hover:text-red-400" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}