'use client';

import { useState } from 'react';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Trash2, CheckCircle, Circle, Plus } from 'lucide-react';
import EmptyState from '@/components/shared/EmptyState';

export default function StudyPlanner({ tool }) {
  const [tasks, setTasks] = useLocalStorage('study-tasks', []);
  const [taskName, setTaskName] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), name: taskName, completed: false },
    ]);
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

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={addTask} className="flex gap-3 mb-8">
        <InputField
          placeholder="What do you need to study today?"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" icon={Plus}>Add Task</Button>
      </form>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <EmptyState
            title="Study list empty"
            description="Add your first study task to get organized."
          />
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
            >
              <button onClick={() => toggleTask(task.id)} className="text-blue-600 dark:text-blue-400">
                {task.completed ? <CheckCircle size={22} /> : <Circle size={22} />}
              </button>
              <span className={`flex-1 ${task.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                {task.name}
              </span>
              <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)} className="text-rose-500">
                <Trash2 size={18} />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
