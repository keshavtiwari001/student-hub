'use client';

import { useState, useEffect } from 'react';
import { getToolById } from '@/data/toolsData';
import DigitalClock from '@/components/dashboard/DigitalClock';
import AnalogClock from '@/components/dashboard/AnalogClock';
import TaskManager from '@/components/dashboard/TaskManager';
import QuickShortcuts from '@/components/dashboard/QuickShortcuts';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ThemeToggle';
import { Maximize, Minimize, Clock as ClockIcon, Calendar as CalendarIcon, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import JsonLd from '@/components/shared/JsonLd';

const tool = getToolById('student-dashboard');

export default function StudentDashboardPage() {
  // Clock state persistence in localStorage
  const [clockType, setClockType] = useState('digital');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const savedClock = window.localStorage.getItem('dashboard-clock-type');
      if (savedClock === 'digital' || savedClock === 'analog') {
        setClockType(savedClock);
      }
    } catch {}

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleClockType = (type) => {
    setClockType(type);
    try {
      window.localStorage.setItem('dashboard-clock-type', type);
    } catch {}
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
    }
  };

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Student Dashboard & Browser Start Page',
    description: 'Your personalized study homepage and default new-tab start page with customizable clocks, task managers, and quick website shortcuts.',
    url: 'https://studenthub.com/student-dashboard',
  };

  if (!mounted) return null;

  return (
    <>
      <JsonLd data={schemaData} />

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
        {/* Top Control Bar */}
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors"
              >
                <ArrowLeft size={14} /> Back to Hub
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                  <Sparkles size={16} />
                </div>
                <span className="font-bold text-base tracking-tight">Student<span className="text-blue-600 dark:text-blue-400">Dashboard</span></span>
              </div>
            </div>

            {/* Navbar Controls */}
            <div className="flex items-center gap-3">
              {/* Clock Type Toggle Button */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => toggleClockType('digital')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    clockType === 'digital'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <ClockIcon size={14} /> Digital
                </button>
                <button
                  type="button"
                  onClick={() => toggleClockType('analog')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    clockType === 'analog'
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <CalendarIcon size={14} /> Analog
                </button>
              </div>

              <ThemeToggle />

              {/* Fullscreen Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                className="hidden sm:inline-flex items-center gap-1.5"
                icon={isFullscreen ? Minimize : Maximize}
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Workspace */}
        <main className="container mx-auto px-4 py-8 flex-1 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Main Column: Clock and Quick Shortcuts */}
            <div className="lg:col-span-8 space-y-8">
              {/* Glassmorphic Clock Showcase */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[280px]">
                <div className="absolute top-4 left-6 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Live {clockType === 'digital' ? 'Digital' : 'Analog'} Clock
                </div>

                <div className="w-full">
                  {clockType === 'digital' ? <DigitalClock /> : <AnalogClock />}
                </div>
              </div>

              {/* Quick Shortcuts Section */}
              <QuickShortcuts />
            </div>

            {/* Right Column: Task Manager Sidebar */}
            <div className="lg:col-span-4 h-full">
              <TaskManager />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
