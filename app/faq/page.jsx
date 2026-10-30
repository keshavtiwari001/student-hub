import PageHeader from '@/components/shared/PageHeader';
import FAQSection from '@/components/shared/FAQSection';

export const metadata = {
  title: 'FAQ | StudentHub Frequently Asked Questions',
  description: 'Common questions about attendance, GPA, CGPA calculations, data privacy, and student tools on StudentHub.',
};

const generalFaqs = [
  {
    question: 'How accurate are the calculators?',
    answer: 'The tools use standard academic formulas. However, because different institutions apply unique rounding rules and weighted scales, our results are estimates. Always verify critical results with your university registrar.',
  },
  {
    question: 'Why doesn\'t the site ask for a login?',
    answer: 'We want these tools to be fast and private. By avoiding accounts, your data stays strictly in your browser\'s localStorage and never reaches a remote server.',
  },
];

const privacyFaqs = [
  {
    question: 'Where is my data stored?',
    answer: 'Locally on your computer or phone, using a technology called localStorage. If you clear your browser history/cache, your saved data (like study plans) will be removed.',
  },
  {
    question: 'Is there a mobile app?',
    answer: 'StudentHub is a Progressive Web App (PWA). You can "Add to Home Screen" on your mobile browser to use it like a native app.',
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Everything you need to know about using StudentHub tools."
        breadcrumbs={[{ href: '/faq', label: 'FAQ' }]}
      />
      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-12">
        <FAQSection title="General Questions" faqs={generalFaqs} />
        <FAQSection title="Privacy & Data" faqs={privacyFaqs} />
      </div>
    </>
  );
}
