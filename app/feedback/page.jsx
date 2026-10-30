import PageHeader from '@/components/shared/PageHeader';
import FeedbackForm from '@/components/shared/FeedbackForm';

export const metadata = {
  title: 'Feedback | StudentHub',
  description: 'Help improve StudentHub — share what works, what doesn\'t, and what you need next.',
};

export default function FeedbackPage() {
  return (
    <>
      <PageHeader
        title="Feedback"
        description="Found a bug or a calculation that feels wrong? Tell us — we read everything."
        breadcrumbs={[{ href: '/feedback', label: 'Feedback' }]}
      />
      <div className="container mx-auto px-4 py-12">
        <FeedbackForm />
      </div>
    </>
  );
}
