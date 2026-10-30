'use client';

import { useState } from 'react';
import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/SelectField';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

const topics = [
  { label: 'Calculation Bug / Wrong Math', value: 'bug' },
  { label: 'Feature Request / New Tool Idea', value: 'feature' },
  { label: 'Design / Usability Feedback', value: 'design' },
  { label: 'Other', value: 'other' },
];

export default function FeedbackForm() {
  const [topic, setTopic] = useState('bug');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [draftReady, setDraftReady] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.trim().length < 10) {
      setError('Please add a bit more detail (at least 10 characters).');
      return;
    }
    setError('');
    setDraftReady(true);
  };

  const mailtoHref = `mailto:feedback@studenthub.com?subject=${encodeURIComponent(
    `[Feedback: ${topic}] StudentHub`
  )}&body=${encodeURIComponent(
    `${details}\n\nCategory: ${topic}${email ? `\nFrom: ${email}` : ''}`
  )}`;

  return (
    <div className="max-w-2xl">
      {draftReady ? (
        <div className="space-y-5">
          <Alert type="warning" title="One more step — your feedback hasn't been sent yet">
            StudentHub has no mail server yet, so nothing was delivered. Click below to open your
            email app with the feedback pre-filled.
          </Alert>
          <a href={mailtoHref} className="block">
            <Button size="lg" className="w-full">Open in Email App</Button>
          </a>
          <button
            type="button"
            onClick={() => setDraftReady(false)}
            className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 underline"
          >
            Back to form
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
        >
          <SelectField
            label="What is this about?"
            id="feedback-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            options={topics}
            placeholder=""
          />
          <div>
            <label htmlFor="feedback-details" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Details <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="feedback-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              className="block w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 py-2.5 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/60 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              placeholder="What happened? What were you trying to do?"
              required
            />
            {error && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{error}</p>}
          </div>
          <InputField
            label="Your Email (Optional, if you'd like a reply)"
            id="feedback-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <Button type="submit" size="lg" className="w-full">Continue</Button>
        </form>
      )}
    </div>
  );
}
