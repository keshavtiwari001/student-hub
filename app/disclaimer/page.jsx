import PageHeader from '@/components/shared/PageHeader';

export const metadata = {
  title: 'Disclaimer | StudentHub',
  description: 'Academic and calculation disclaimers for StudentHub tools.',
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader
        title="Disclaimer"
        description="Important information regarding our calculators and tools"
        breadcrumbs={[{ href: '/disclaimer', label: 'Disclaimer' }]}
      />
      <div className="container mx-auto px-4 py-12 max-w-4xl text-slate-600 dark:text-slate-300">
        <div className="space-y-6">
          <p>
            The information and tools provided on StudentHub are for general educational and informational purposes only. All calculations are performed based on user-provided inputs and standard mathematical formulas.
          </p>
          <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded-r-lg my-6">
            <h3 className="font-bold text-amber-900 dark:text-amber-200">Official Records Notice</h3>
            <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
              Never use these tools as a substitute for official academic counseling or registrar verification. Your institution's specific grading rules, rounding policies, and attendance cutoffs always take precedence.
            </p>
          </div>
          <p>
            We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the tools for any specific purpose.
          </p>
        </div>
      </div>
    </>
  );
}
