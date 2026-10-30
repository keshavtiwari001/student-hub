import PageHeader from '@/components/shared/PageHeader';
import { TOOLS } from '@/data/toolsData';

export const metadata = {
  title: 'About Us | StudentHub',
  description: 'Learn about StudentHub — our mission to build fast, free, and private utilities for students worldwide.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About StudentHub"
        description="Our mission is to make college and school coursework easier with fast, reliable, privacy-focused digital tools."
        breadcrumbs={[{ href: '/about', label: 'About Us' }]}
      />
      <div className="container mx-auto px-4 py-12 max-w-4xl text-slate-600 dark:text-slate-300">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why We Built StudentHub</h2>
            <p>
              Navigating semester exams, attendance minimums, GPA calculations, and project schedules shouldn&apos;t require struggling with complicated spreadsheets. We built StudentHub to provide a unified, clean, and instant set of utilities that work smoothly on any device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">What Makes Us Different</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white">100% Free</h3>
                <p className="text-sm mt-2">Every tool is free to use with zero premium paywalls or mandatory accounts.</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white">Privacy First</h3>
                <p className="text-sm mt-2">All data processing happens locally in your browser. No server logging.</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white">Mobile Optimized</h3>
                <p className="text-sm mt-2">Designed mobile-first so you can check your status anywhere on campus.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
