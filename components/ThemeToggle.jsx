'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) return <div className="w-10 h-10" />;

  const themes = [
    { name: 'light', icon: Sun },
    { name: 'dark', icon: Moon },
    { name: 'system', icon: Monitor },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
      {themes.map(({ name, icon: Icon }) => (
        <button
          key={name}
          type="button"
          onClick={() => setTheme(name)}
          className={`p-1.5 rounded-md transition-all cursor-pointer ${
            theme === name
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          title={`Switch to ${name} theme`}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}
