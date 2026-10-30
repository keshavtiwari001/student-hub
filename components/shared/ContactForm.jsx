'use client';

import { useState } from 'react';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [draftReady, setDraftReady] = useState(false);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Please enter a valid email address.';
    if (message.trim().length < 10) errs.message = 'Message should be at least 10 characters.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      // No backend is connected yet — validate locally and prepare a mailto draft.
      setDraftReady(true);
    }
  };

  const mailtoHref = `mailto:contact@studenthub.com?subject=${encodeURIComponent(
    `StudentHub message from ${name}`
  )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;

  return (
    <div className="max-w-2xl">
      {draftReady ? (
        <div className="space-y-5">
          <Alert type="warning" title="One more step — your message hasn't been sent yet">
            StudentHub doesn't have a mail server yet, so nothing has been delivered. To actually
            send this message, click the button below — it opens your email app with your message
            pre-filled and ready to send.
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
          noValidate
        >
          <InputField
            label="Your Name"
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />
          <InputField
            label="Your Email"
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="you@example.com"
            required
          />
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className={`block w-full rounded-lg border px-3.5 py-2.5 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${
                errors.message
                  ? 'border-rose-400 focus:ring-rose-500/60'
                  : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500/60 focus:border-blue-500'
              }`}
              placeholder="Tell us what's on your mind…"
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.message}</p>
            )}
          </div>
          <Button type="submit" size="lg" className="w-full">Continue</Button>
        </form>
      )}
    </div>
  );
}
