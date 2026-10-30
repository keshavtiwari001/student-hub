import PageHeader from '@/components/shared/PageHeader';

export const metadata = {
  title: 'Terms of Service | StudentHub',
  description: 'Read the terms and conditions for using StudentHub student tools and calculators.',
};

export default function TermsPage() {
  const lastUpdated = 'October 2026';

  return (
    <>
      <PageHeader
        title="Terms of Service"
        description={`Last updated: ${lastUpdated}`}
        breadcrumbs={[{ href: '/terms', label: 'Terms of Service' }]}
      />
      <div className="container mx-auto px-4 py-12 max-w-4xl text-slate-600 dark:text-slate-300">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using StudentHub, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Use of Tools</h2>
            <p>
              StudentHub provides free calculators and productivity tools for educational purposes. You agree to use these tools for lawful purposes only and in a manner that does not infringe upon the rights of others.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Accuracy of Information</h2>
            <p>
              While we strive for 100% accuracy, the results provided by our calculators (e.g., GPA, CGPA, Attendance) are estimates based on standard formulas. These results should not be used as official university records. Always verify critical academic data with your institution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Limitation of Liability</h2>
            <p>
              StudentHub and its creators are not liable for any academic or financial decisions made based on the output of our tools. The service is provided "as is" without warranty of any kind.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
