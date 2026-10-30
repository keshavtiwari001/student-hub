'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Button from '@/components/ui/Button';
import InputField from '@/components/ui/InputField';
import Alert from '@/components/ui/Alert';
import { Plus, ExternalLink, Trash2, Globe, X } from 'lucide-react';

export default function QuickShortcuts() {
  const [shortcuts, setShortcuts] = useLocalStorage('student-dashboard-shortcuts', [
    { id: 1, name: 'University Portal', url: 'https://portal.university.edu' },
    { id: 2, name: 'Canvas LMS', url: 'https://canvas.instructure.com' },
    { id: 3, name: 'Google Classroom', url: 'https://classroom.google.com' },
    { id: 4, name: 'GitHub', url: 'https://github.com' },
    { id: 5, name: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { id: 6, name: 'ChatGPT', url: 'https://chatgpt.com' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const MAX_SHORTCUTS = 20;

  // Validation helper
  const isValidUrl = (string) => {
    try {
      let testUrl = string.trim();
      if (!/^https?:\/\//i.test(testUrl)) {
        testUrl = `https://${testUrl}`;
      }
      new URL(testUrl);
      return true;
    } catch {
      return false;
    }
  };

  const isFormValid = name.trim().length > 0 && url.trim().length > 0 && isValidUrl(url);

  const handleAddShortcut = (e) => {
    e.preventDefault();
    setError('');

    if (shortcuts.length >= MAX_SHORTCUTS) {
      setError(`Shortcut limit reached. Maximum allowed is ${MAX_SHORTCUTS}.`);
      return;
    }

    if (!isFormValid) {
      setError('Please provide a valid name and URL.');
      return;
    }

    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const newShortcut = {
      id: Date.now(),
      name: name.trim(),
      url: formattedUrl,
    };

    setShortcuts((prev) => [...prev, newShortcut]);
    setName('');
    setUrl('');
    setIsModalOpen(false);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setShortcuts((prev) => prev.filter((s) => s.id !== id));
  };

  const getDomain = (rawUrl) => {
    try {
      const parsed = new URL(rawUrl);
      return parsed.hostname;
    } catch {
      return '';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Shortcuts</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {shortcuts.length}/{MAX_SHORTCUTS} websites saved
          </p>
        </div>
        <Button
          onClick={() => {
            if (shortcuts.length >= MAX_SHORTCUTS) {
              alert(`Maximum limit of ${MAX_SHORTCUTS} shortcuts reached.`);
              return;
            }
            setIsModalOpen(true);
          }}
          icon={Plus}
          size="sm"
        >
          Add Shortcut
        </Button>
      </div>

      {/* Grid Display */}
      {shortcuts.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
          <Globe className="mx-auto text-slate-400 mb-2" size={28} />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">No shortcuts added yet.</p>
          <p className="text-xs text-slate-400 mt-1">Add your favorite campus portals and study sites.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {shortcuts.map((item) => {
            const domain = getDomain(item.url);
            const faviconUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : '';

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center p-3.5 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-700 rounded-xl transition-all duration-200 text-center shadow-xs"
              >
                <button
                  type="button"
                  onClick={(e) => handleDelete(item.id, e)}
                  className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-opacity bg-white dark:bg-slate-800 rounded-md shadow-xs"
                  title="Delete shortcut"
                >
                  <Trash2 size={12} />
                </button>

                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs mb-2.5 overflow-hidden">
                  {faviconUrl ? (
                    <img
                      src={faviconUrl}
                      alt=""
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Globe size={18} className="text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate w-full group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate w-full mt-0.5">
                  {domain}
                </span>
              </a>
            );
          })}
        </div>
      )}

      {/* Modal / Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add a Website</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <Alert type="error" title="Validation Error" className="mb-4">
                {error}
              </Alert>
            )}

            <form onSubmit={handleAddShortcut} className="space-y-4">
              <InputField
                label="Website Name"
                id="shortcut-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. University Library"
                required
              />
              <InputField
                label="Website URL"
                id="shortcut-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. library.university.edu"
                required
                helperText="Enter domain or full URL (e.g., https://...)"
              />

              <div className="pt-4 flex gap-3">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="flex-1"
                >
                  Add
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
