'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { Plus, CheckCircle, Circle, Trash2, Edit2, X, Check } from 'lucide-react';

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('student-dashboard-tasks', [
    { id: 1, name: 'Complete Data Structures assignment', completed: false },
    { id: 2, name: 'Review Operating Systems notes', completed: true },
  ]);
  const [taskName, setTaskName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState('');

  const MAX_TASKS = 10;

  const handleAddTask = (e) => {
    e.preventDefault();
    setError('');

    if (!taskName.trim()) return;

    if (tasks.length >= MAX_TASKS) {
      setError(`Task limit reached. Maximum allowed is ${MAX_TASKS} tasks.`);
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName.trim(),
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskName('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.name);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, name: editText.trim() } : t))
    );
    setEditingId(null);
    setEditText('');
  };

  // Sorting logic: Active/Pending stay at top, Completed move to bottom
  const sortedTasks = [...tasks].sort((a, b) => Number(a.completed) - Number(b.completed));
  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Task Manager</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {activeCount} active &bull; {tasks.length}/{MAX_TASKS} tasks
          </p>
        </div>
      </div>

      {error && (
        <Alert type="warning" title="Limit Reached" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <InputField
          placeholder={tasks.length >= MAX_TASKS ? 'Task limit reached' : 'Add a quick study task…'}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          disabled={tasks.length >= MAX_TASKS}
          className="flex-1"
        />
        <Button type="submit" disabled={tasks.length >= MAX_TASKS || !taskName.trim()} icon={Plus}>
          Add
        </Button>
      </form>

      <div className="space-y-2.5 overflow-y-auto max-h-[360px] pr-1 flex-1">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">
            No tasks yet. Add your study priorities above!
          </div>
        ) : (
          sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between gap-2 p-3 rounded-xl border transition-all ${
                task.completed
                  ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                  : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className="text-blue-600 dark:text-blue-400 shrink-0 hover:scale-110 transition-transform"
                  aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                </button>

                {editingId === task.id ? (
                  <div className="flex items-center gap-1.5 flex-1">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-slate-700 px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => saveEdit(task.id)}
                      className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <span
                    className={`text-sm font-medium truncate ${
                      task.completed
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {task.name}
                  </span>
                )}
              </div>

              {editingId !== task.id && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEditing(task)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded"
                    title="Edit task"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded"
                    title="Delete task"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
