import PageHeader from '@/components/shared/PageHeader';

export const metadata = {
  title: 'Privacy Policy | StudentHub',
  description: 'Learn how StudentHub handles your data. We prioritize privacy by processing all tool data locally in your browser.',
};

export default function PrivacyPage() {
  const lastUpdated = 'October 2026';

  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}`}
        breadcrumbs={[{ href: '/privacy', label: 'Privacy Policy' }]}
      />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-300">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
            <p>
              At StudentHub, we take your privacy seriously. This policy explains how we collect, use, and protect your information when you use our website and tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Local Processing (Zero-Server Architecture)</h2>
            <p>
              Most of our tools, including the <strong>Attendance Calculator</strong>, <strong>Study Planner</strong>, and <strong>Pomodoro Timer</strong>, operate entirely within your web browser.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Your marks, grades, and study tasks are processed locally on your device.</li>
              <li>We do not transmit this data to our servers.</li>
              <li>Data persistence (like saved tasks) is handled via <strong>localStorage</strong> on your own machine.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Log Files & Analytics</h2>
            <p>
              Like most websites, we collect standard log files and use anonymous analytics (e.g., Google Analytics) to understand how our site is used. This includes IP addresses, browser type, referring pages, and time spent on the site. This data is not linked to any personally identifiable information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Advertising & Cookies</h2>
            <p>
              We may use third-party advertising companies (such as Google AdSense) to serve ads when you visit our website. These companies may use cookies to serve ads based on a user's prior visits to our website or other websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@studenthub.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">privacy@studenthub.com</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
