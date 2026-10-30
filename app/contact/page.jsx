import PageHeader from '@/components/shared/PageHeader';
import ContactForm from '@/components/shared/ContactForm';

export const metadata = {
  title: 'Contact Us | StudentHub',
  description: 'Questions, feedback, or tool suggestions? Get in touch with the StudentHub team.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Questions, feedback, or a tool idea? We'd love to hear from you."
        breadcrumbs={[{ href: '/contact', label: 'Contact Us' }]}
      />
      <div className="container mx-auto px-4 py-12">
        <ContactForm />
      </div>
    </>
  );
}
