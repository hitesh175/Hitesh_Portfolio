/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Target, CheckCircle2, FileText } from 'lucide-react';
import { personalInfo, stats } from '../data';

export default function About({ onViewCVClick }: { onViewCVClick: () => void }) {
  return (
    <section
      id="about"
      className="py-16 transition-colors relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
            A Little Bit About Myself
          </span>
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
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3.5 flex items-center space-x-2">
                <span> Career Vision</span>
              </h3>
              <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {personalInfo.careerObjective}
              </p>
            </motion.div>

            {/* General Bio */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="space-y-4 text-neutral-600 dark:text-neutral-350 text-sm leading-relaxed bg-neutral-50 dark:bg-neutral-950 p-6 rounded border border-neutral-200 dark:border-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300"
            >
              <p className="text-base text-neutral-900 dark:text-white font-medium">
                I am a Master's student in <strong className="font-semibold text-neutral-950 dark:text-white">Applied Data Science and Artificial Intelligence</strong> at SRH University Hamburg, Germany.
              </p>
              <p>
                I am passionate about solving real-world problems through data. My experience includes machine learning, predictive analytics, business intelligence, time-series forecasting, and data visualization.
              </p>
              <p>
                I enjoy building end-to-end data solutions—from cleaning and preprocessing data to developing machine learning models and interactive dashboards using Python, SQL, and Power BI.
              </p>
              <p className="text-base">
                Currently, I am seeking <strong className="text-neutral-950 dark:text-white font-semibold border-b-2 border-indigo-500/40 dark:border-sky-400/50 pb-0.5">internship or Werkstudent opportunities</strong> where I can apply my analytical and technical skills while continuing to grow as a Data Analyst.
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
                  <CheckCircle2 className="w-4 h-4 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{text}</span>
                </div>
              ))}
            </div>

            {/* Interactive View CV Button */}
            <div className="pt-4 flex">
              <button
                id="about-btn-view-cv"
                onClick={onViewCVClick}
                className="w-full sm:w-auto px-5 py-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded text-xs font-bold transition-all duration-250 flex items-center justify-center space-x-2 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>View Full CV & Resume</span>
              </button>
            </div>
          </div>

          {/* Right Column: Key Stats Display */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 lg:pt-0">
            {stats.map((stat, idx) => {
              return (
                <motion.div
                   key={idx}
                   initial={{ opacity: 0, y: 15 }}
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
                    <h4 className="text-xs font-semibold tracking-wider font-mono text-neutral-500 dark:text-neutral-400 uppercase">
                      {stat.label}
                    </h4>
                    <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-550 leading-tight">
                      {idx === 0 && "// deep ML/BI metrics"}
                      {idx === 1 && "// tools, databases & libs"}
                      {idx === 2 && "// research & vision"}
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
