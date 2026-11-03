/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Target, CheckCircle2 } from 'lucide-react';
import { personalInfo, stats } from '../data';

export default function About() {
  return (
    <section
      id="about"
      className="py-16 transition-colors relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-0.5 bg-neutral-900 dark:bg-white mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Descriptions */}
          <div className="lg:col-span-7 space-y-8">

            {/* Career Objective */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-neutral-50 dark:bg-neutral-950 p-6 rounded border border-neutral-200 dark:border-neutral-900 shadow-sm relative overflow-hidden group hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 text-neutral-900 dark:text-white">
                <Target className="w-12 h-12" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 mb-3.5 flex items-center space-x-2">
                <span> Career Vision</span>
              </h3>
              <p className="max-w-[60ch] text-sm leading-relaxed text-neutral-800 dark:text-neutral-100">
                {personalInfo.careerObjective}
              </p>
            </motion.div>

            {/* General Bio */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="space-y-4 text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed bg-neutral-50 dark:bg-neutral-950 p-6 rounded border border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300"
            >
              <p className="max-w-[60ch] text-base text-neutral-950 dark:text-white font-semibold">
                I am a Master's student in <strong className="font-bold text-neutral-950 dark:text-white">Applied Data Science and Artificial Intelligence</strong> at SRH University Hamburg, Germany.
              </p>
              <p className="max-w-[60ch]">
                I am passionate about solving real-world problems through data. My experience includes machine learning, predictive analytics, business intelligence, time-series forecasting, and data visualization.
              </p>
              <p className="max-w-[60ch]">
                I enjoy building end-to-end data solutions—from cleaning and preprocessing data to developing machine learning models and interactive dashboards using Python, SQL, and Power BI.
              </p>
              <p className="max-w-[60ch] text-base">
                Currently, I am seeking <strong className="text-neutral-950 dark:text-white font-bold border-b-2 border-neutral-500/40 dark:border-neutral-400/50 pb-0.5">internship or Werkstudent opportunities</strong> where I can apply my analytical and technical skills while continuing to grow as a Data Analyst.
              </p>
            </motion.div>

            {/* Quick stats checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                "Predictive ML Modeling",
                "End-to-End Data Pipelines",
                "Interactive BI Dashboards",
                "Statistical Data Analytics"
              ].map((text, i) => (
                <div key={i} className="flex items-center space-x-3 bg-neutral-50 dark:bg-neutral-950 p-3.5 rounded border border-neutral-200 dark:border-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-800 transition-all shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-neutral-700 dark:text-neutral-300 flex-shrink-0" />
                  <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">{text}</span>
                </div>
              ))}
            </div>

            <section aria-labelledby="resumes-heading" className="mt-6">
              <h3 id="resumes-heading" className="text-xl mb-3">Résumés</h3>
              <ul className="grid gap-3">
                {[
                  { title: 'Data Science & AI', file: 'Hitesh_Resume_Data_Science_AI.pdf' },
                  { title: 'Data Analytics & BI', file: 'Hitesh_Resume_Data_Analytics_BI.pdf' },
                ].map(({ title, file }) => (
                  <li key={file} className="rounded border border-neutral-300 dark:border-neutral-700 p-4">
                    <h4 className="font-semibold">{title}</h4>
                    <div className="flex flex-wrap gap-x-5">
                      <a className="inline-flex min-h-11 items-center underline underline-offset-4" href={`/${file}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} résumé PDF (opens in a new tab)`}>View PDF</a>
                      <a className="inline-flex min-h-11 items-center underline underline-offset-4" href={`/${file}`} download aria-label={`Download ${title} résumé`}>Download</a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Key Stats Display */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 lg:pt-0">
            {stats.map((stat, idx) => {
              return (
                <motion.div
                   key={idx}
                   initial={false}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.08 }}
                   className="p-6 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 shadow-sm flex flex-col justify-between h-40 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    <span className="text-4xl font-display font-extrabold tracking-tight text-neutral-950 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="text-xs font-bold tracking-wider font-mono text-neutral-700 dark:text-neutral-300 uppercase">
                      {stat.label}
                    </h3>
                    <p className="max-w-[60ch] text-xs font-mono text-neutral-600 dark:text-neutral-400 font-semibold leading-tight">
                      {idx === 0 && "// selected work"}
                      {idx === 1 && "// tools, databases & libs"}
                      {idx === 2 && "// published work"}
                      {idx === 3 && "// local or remote options"}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
