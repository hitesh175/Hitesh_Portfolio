/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { personalInfo } from '../data';


export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    // Remove message logs retained by previous versions; never retain new messages.
    try { localStorage.removeItem('hitesh_portfolio_messages'); } catch { /* Storage may be unavailable. */ }
  }, []);
  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() || '';
  const isEmailConfigured = Boolean(web3FormsKey);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;
    setError(''); setIsSuccess(false);
    if (!isEmailConfigured) { setError('Online sending is unavailable. Please use the email link below.'); return; }
    if (!name.trim() || !message.trim()) { setError('Please enter your name and message.'); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST', signal: AbortSignal.timeout(15000),
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: web3FormsKey, name: name.trim(), email: email.trim(),
          subject: subject.trim() || 'New Portfolio Message', message: message.trim(), from_name: 'Portfolio contact' }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Delivery failed');
      setIsSuccess(true); setName(''); setEmail(''); setSubject(''); setMessage('');
    } catch {
      setError('Your message was not sent. Your text is still here. Try again or email me directly.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <section
      id="contact"
      className="py-16 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Say Hi!
          </h2>
          <div className="w-12 h-0.5 bg-neutral-950 dark:bg-white mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left font-sans">

          {/* Left Side: Professional Handles & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-100 dark:bg-neutral-950 p-8 rounded border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-8">

              <div className="space-y-2">
                <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
                  Contact Info
                </h3>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                  I am actively seeking professional internships and Werkstudent research positions in Hamburg, Germany or remote arrangements.
                </p>
              </div>

              {/* Direct links */}
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">

                {/* Email link */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 py-4 group hover:underline underline-offset-4"
                >
                  <div className="text-neutral-700 dark:text-neutral-300 flex-shrink-0">
                    <Mail className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-semibold">// Email Address</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">{personalInfo.email}</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 py-4">
                  <div className="text-neutral-700 dark:text-neutral-300 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-semibold">// Residence</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100">{personalInfo.location}</span>
                  </div>
                </div>

                {/* GitHub link */}
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-4 group hover:underline underline-offset-4"
                >
                  <div className="text-neutral-700 dark:text-neutral-300 flex-shrink-0">
                    <Github className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-semibold">// Repository</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">github.com/hitesh175</span>
                  </div>
                </a>

                {/* LinkedIn link */}
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-4 group hover:underline underline-offset-4"
                >
                  <div className="text-neutral-700 dark:text-neutral-300 flex-shrink-0">
                    <Linkedin className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-semibold">// LinkedIn Profile</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">linkedin.com/in/hitesh-k-r</span>
                  </div>
                </a>

              </div>

            </div>
          </div>

          {/* Right Side: Secure Interactive Form */}
          <div className="lg:col-span-7 space-y-6">

            {/* Main Contact Form */}
            <div className="bg-neutral-100 dark:bg-neutral-950 p-8 rounded border border-neutral-200 dark:border-neutral-800 shadow-sm">

              <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-white mb-6 uppercase tracking-tight">
                Send a Message
              </h3>

              <form aria-busy={isSubmitting} onSubmit={handleSubmit} className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase tracking-wider font-semibold">
                      // Your Name
                    </label>
                    <input id="contact-name" name="name" autoComplete="name" maxLength={200}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Jane Smith"
                      className="w-full text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded p-3 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase tracking-wider font-semibold">
                      // Email Address
                    </label>
                    <input id="contact-email" name="email" autoComplete="email" maxLength={254}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@company.com"
                      className="w-full text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded p-3 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase tracking-wider font-semibold">
                    // Subject Line (Optional)
                  </label>
                  <input id="contact-subject" name="subject" autoComplete="off" maxLength={200}
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Data Science Internship Opportunity"
                    className="w-full text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded p-3 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase tracking-wider font-semibold">
                    // Your Message
                  </label>
                  <textarea id="contact-message" name="message" autoComplete="off" maxLength={10000}
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project requirements or career opportunities..."
                    className="w-full text-xs font-mono bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded p-3 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-600 dark:placeholder:text-neutral-400"
                  />
                </div>

                 {/* Submit button states */}
                <p role="status" aria-live="polite" className="text-sm">{isSuccess ? 'Message sent successfully.' : ''}</p>
                {error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
                <div className="pt-2 flex flex-wrap gap-2 justify-between items-center font-mono">


                  <button
                    id="btn-contact-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto px-6 py-3 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:bg-neutral-200 dark:disabled:bg-neutral-900 disabled:text-neutral-400 dark:disabled:text-neutral-600 text-white dark:text-black font-semibold rounded text-xs tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>{isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"}</span>
                    <Send className="w-3.5 h-3.5 text-white dark:text-black" />
                  </button>
                </div>

              </form>

              <p className="mt-5 text-sm text-neutral-700 dark:text-neutral-300">
                {isEmailConfigured ? 'Your message is sent using Web3Forms. No message history is saved in this browser.' : 'Online sending is currently unavailable.'}
                {' '}<a className="underline" href={`mailto:${personalInfo.email}`}>Email me directly</a>.
              </p>
            </div>



          </div>

        </div>

      </div>
    </section>
  );
}
