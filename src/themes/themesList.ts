import type { Theme } from '../types/theme';

export const themes: Theme[] = [
  {
    name: 'Modern Minimal',
    colors: {
      primary: '#2563eb',
      secondary: '#4f46e5',
      accent: '#06b6d4',
      background: 'from-slate-100 to-slate-200',
      text: 'text-slate-900',
      surface: 'bg-white/80'
    },
    font: 'font-sans'
  },
  {
    name: 'Ocean Breeze',
    colors: {
      primary: '#0891b2',
      secondary: '#0284c7',
      accent: '#06b6d4',
      background: 'from-cyan-100 to-blue-200',
      text: 'text-slate-900',
      surface: 'bg-white/80'
    },
    font: 'font-serif'
  },
  {
    name: 'Forest Calm',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981',
      background: 'from-emerald-100 to-green-200',
      text: 'text-slate-900',
      surface: 'bg-white/80'
    },
    font: 'font-mono'
  },
  {
    name: 'Sunset Vibes',
    colors: {
      primary: '#db2777',
      secondary: '#e11d48',
      accent: '#f43f5e',
      background: 'from-rose-100 to-pink-200',
      text: 'text-slate-900',
      surface: 'bg-white/80'
    },
    font: 'font-sans'
  },
  {
    name: 'Purple Haze',
    colors: {
      primary: '#7c3aed',
      secondary: '#6d28d9',
      accent: '#8b5cf6',
      background: 'from-violet-100 to-purple-200',
      text: 'text-slate-900',
      surface: 'bg-white/80'
    },
    font: 'font-serif'
  },
  {
    name: 'Dark Elegance',
    colors: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      accent: '#818cf8',
      background: 'from-slate-800 to-slate-900',
      text: 'text-white',
      surface: 'bg-black/20'
    },
    font: 'font-mono'
  },
  {
    name: 'Midnight Ocean',
    colors: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      accent: '#60a5fa',
      background: 'from-blue-900 to-slate-900',
      text: 'text-white',
      surface: 'bg-black/20'
    },
    font: 'font-sans'
  }
];