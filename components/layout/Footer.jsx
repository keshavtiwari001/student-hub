import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const footerCols = [
  {
    heading: 'Academic Calculators',
    links: [
      { href: '/calculators/attendance', label: 'Attendance Calculator' },
      { href: '/calculators/cgpa', label: 'CGPA Calculator' },
      { href: '/calculators/gpa', label: 'GPA Calculator' },
      { href: '/calculators/percentage', label: 'Percentage Calculator' },
      { href: '/calculators/grade', label: 'Grade Calculator' },
    ],
  },
  {
    heading: 'Productivity Tools',
    links: [
      { href: '/productivity/study-planner', label: 'Study Planner' },
      { href: '/productivity/exam-countdown', label: 'Exam Countdown' },
      { href: '/productivity/study-hours', label: 'Study Hours Calculator' },
      { href: '/productivity/pomodoro', label: 'Pomodoro Timer' },
      { href: '/productivity/assignment-deadline', label: 'Deadline Calculator' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/faq', label: 'FAQ' },
      { href: '/feedback', label: 'Feedback' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/disclaimer', label: 'Disclaimer' },
      { href: '/tools', label: 'All Tools' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              <span>Student<span className="text-blue-600 dark:text-blue-400">Hub</span></span>
            </Link>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Free tools for academic success.
            </p>
          </div>

          {footerCols.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {col.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center sm:text-left text-sm text-slate-500 dark:text-slate-400">
          &copy; {new Date().getFullYear()} StudentHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
