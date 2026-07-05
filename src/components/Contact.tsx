/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle, Trash2, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data';
import { ContactMessage } from '../types';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Load saved local outbox messages
  useEffect(() => {
    const saved = localStorage.getItem('hitesh_portfolio_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const web3FormsKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || '';
  const isEmailConfigured = !!(web3FormsKey && web3FormsKey.trim() !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    if (isEmailConfigured) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name,
            email,
            subject: subject || 'New Portfolio Message',
            message,
            from_name: `${name} (via Portfolio)`
          })
        });

        const result = await response.json();
        
        if (result.success) {
          const newMessage: ContactMessage = {
            id: Math.random().toString(36).substring(2, 9),
            name,
            email,
            subject: subject || 'General Query',
            message,
            date: new Date().toLocaleDateString()
          };

          const updatedMessages = [newMessage, ...messages];
          setMessages(updatedMessages);
          localStorage.setItem('hitesh_portfolio_messages', JSON.stringify(updatedMessages));

          // Reset form
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
          
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 5000);
        } else {
          console.error("Web3Forms error response:", result);
          alert("Submission could not be completed by Web3Forms. Saving locally instead.");
          // Fallback to local
          saveLocally();
        }
      } catch (err) {
        console.error("Web3Forms request error:", err);
        alert("A connection error occurred. Storing locally as backup.");
        saveLocally();
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Demo/local storage mode
      setTimeout(() => {
        saveLocally();
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const saveLocally = () => {
    const newMessage: ContactMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      subject: subject || 'General Query',
      message,
      date: new Date().toLocaleDateString()
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('hitesh_portfolio_messages', JSON.stringify(updatedMessages));

    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('hitesh_portfolio_messages', JSON.stringify(updated));
  };

  return (
    <section
      id="contact"
      className="py-16 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-neutral-400 uppercase">
            Let's Collaborate
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Say Hi!
          </h2>
          <div className="w-12 h-0.5 bg-neutral-950 dark:bg-white mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left font-sans">
          
          {/* Left Side: Professional Handles & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-100 dark:bg-neutral-950 p-8 rounded border border-neutral-200 dark:border-neutral-900 shadow-sm space-y-8">
              
              <div className="space-y-2">
                <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
                  Contact Info
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  I am actively seeking professional internships and Werkstudent research positions in Hamburg, Germany or remote arrangements.
                </p>
              </div>

              {/* Direct links */}
              <div className="space-y-4">
                
                {/* Email link */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center space-x-4 p-3 bg-white dark:bg-neutral-900/40 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-800 transition-all group shadow-sm cursor-pointer"
                >
                  <div className="p-2.5 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-900 rounded group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">// Email Address</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-350 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">{personalInfo.email}</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center space-x-4 p-3 bg-white dark:bg-neutral-900/40 rounded border border-neutral-200 dark:border-neutral-900 shadow-sm">
                  <div className="p-2.5 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-900 rounded">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">// Residence</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-350">{personalInfo.location}</span>
                  </div>
                </div>

                {/* GitHub link */}
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-3 bg-white dark:bg-neutral-900/40 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-800 transition-all group shadow-sm cursor-pointer"
                >
                  <div className="p-2.5 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-900 rounded group-hover:scale-105 transition-transform">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">// Repository</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-350 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">github.com/hitesh175</span>
                  </div>
                </a>

                {/* LinkedIn link */}
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-3 bg-white dark:bg-neutral-900/40 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-800 transition-all group shadow-sm cursor-pointer"
                >
                  <div className="p-2.5 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-900 rounded group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider">// LinkedIn Profile</span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-350 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">linkedin.com/in/hitesh-k-r</span>
                  </div>
                </a>

              </div>

            </div>
          </div>

          {/* Right Side: Secure Interactive Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Contact Form */}
            <div className="bg-neutral-100 dark:bg-neutral-950 p-8 rounded border border-neutral-200 dark:border-neutral-900 shadow-sm">
              
              <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-white mb-6 uppercase tracking-tight">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-neutral-500 block uppercase tracking-wider">
                      // Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Jane Smith"
                      className="w-full text-xs font-mono bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 rounded p-3 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-neutral-500 block uppercase tracking-wider">
                      // Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@company.com"
                      className="w-full text-xs font-mono bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 rounded p-3 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-neutral-500 block uppercase tracking-wider">
                    // Subject Line (Optional)
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Data Science Internship Opportunity"
                    className="w-full text-xs font-mono bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 rounded p-3 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono text-neutral-500 block uppercase tracking-wider">
                    // Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project requirements or career opportunities..."
                    className="w-full text-xs font-mono bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 rounded p-3 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700 text-neutral-800 dark:text-neutral-200"
                  />
                </div>

                 {/* Submit button states */}
                <div className="pt-2 flex flex-wrap gap-2 justify-between items-center font-mono">
                  <AnimatePresence mode="wait">
                    {isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-neutral-900 dark:text-white flex items-center space-x-1.5 text-xs font-semibold"
                      >
                        <CheckCircle className="w-4 h-4 text-neutral-900 dark:text-white" />
                        <span>{isEmailConfigured ? "Message sent to inbox!" : "Message logged locally!"}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    id="btn-contact-submit"
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto px-6 py-3 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:bg-neutral-200 dark:disabled:bg-neutral-900 disabled:text-neutral-400 dark:disabled:text-neutral-550 text-white dark:text-black font-semibold rounded text-xs tracking-wider flex items-center space-x-2 transition-all cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>{isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"}</span>
                    <Send className="w-3.5 h-3.5 text-white dark:text-black" />
                  </button>
                </div>

              </form>

              {/* Dynamic Email Forwarding Configuration helper */}
              <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[10px] font-mono text-neutral-450">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isEmailConfigured ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                  <span>
                    {isEmailConfigured 
                      ? "LIVE INBOX ROUTING ACTIVE (via Web3Forms)" 
                      : "SANDBOX MODE (Saves locally in Outbox below)"}
                  </span>
                </div>
                {!isEmailConfigured && (
                  <a 
                    href="https://web3forms.com/#start" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-neutral-900 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300 underline transition-colors cursor-pointer"
                  >
                    Activate Direct Email Delivery →
                  </a>
                )}
              </div>

            </div>

            {/* Simulated Outbox/Logs Box to verify persistence on the spot */}
            <AnimatePresence>
              {messages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-6 rounded shadow-sm"
                >
                  <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-900 pb-3 mb-4 text-left font-mono">
                    <div className="flex items-center space-x-2 text-neutral-800 dark:text-neutral-200">
                      <ShieldCheck className="w-4 h-4 text-neutral-900 dark:text-white" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Client Outbox Logs ({messages.length})
                      </span>
                    </div>
                    <span className="text-[9px] text-neutral-500 font-semibold">[LOCAL_STORAGE]</span>
                  </div>

                  <div className="space-y-3.5 max-h-56 overflow-y-auto">
                    {messages.map((m) => (
                      <div key={m.id} className="p-4 bg-white dark:bg-black rounded border border-neutral-200 dark:border-neutral-900 flex items-start justify-between gap-4">
                        <div className="space-y-1.5 text-left font-sans">
                          <div className="flex items-center space-x-2 text-[9px] font-mono text-neutral-500">
                            <span>To: Hitesh K R</span>
                            <span>•</span>
                            <span>{m.date}</span>
                          </div>
                          <h4 className="text-xs font-bold text-neutral-900 dark:text-white leading-tight uppercase tracking-wider font-display">
                            {m.subject}
                          </h4>
                          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
                            "{m.message}"
                          </p>
                          <span className="text-[9px] font-mono text-neutral-500">By: {m.name} ({m.email})</span>
                        </div>
                        <button
                          id={`btn-delete-outbox-${m.id}`}
                          onClick={() => handleDeleteMessage(m.id)}
                          className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 hover:text-neutral-950 dark:hover:text-white rounded transition-colors flex-shrink-0 cursor-pointer"
                          aria-label="Delete message log"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
