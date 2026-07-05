/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { certifications } from '../data';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="py-16 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
            Validated Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Certifications & Badges
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-white mx-auto mt-4" />
        </div>

        {/* Minimal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            return (
              <a
                key={index}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block outline-none focus:ring-1 focus:ring-neutral-300 dark:focus:ring-neutral-700 rounded"
                title="Preview Certificate"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-neutral-50 dark:bg-neutral-950 p-6 h-full rounded border border-neutral-200 dark:border-neutral-900 shadow-sm flex items-start space-x-4 group transition-all duration-300 hover:scale-[1.01] cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-700"
                >
                  {/* Badge Icon */}
                  <div className="p-2.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-850 dark:text-white border border-neutral-200 dark:border-neutral-800 rounded flex-shrink-0 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>

                  {/* Text */}
                  <div className="space-y-1.5 flex-1 text-left">
                    <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block font-bold font-mono">
                      // {cert.issuer}
                    </span>
                    <h3 className="text-sm font-display font-bold text-neutral-900 dark:text-white leading-snug uppercase tracking-wider group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {cert.name}
                    </h3>
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 dark:text-neutral-450 pt-1">
                      <span>ISSUED: {cert.date}</span>
                      <div className="flex items-center space-x-1 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                        <span className="text-[9px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">PREVIEW</span>
                        <ExternalLink className="w-3.5 h-3.5 transform group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
