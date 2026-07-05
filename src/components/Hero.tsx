/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, GraduationCap, FileText, Github, Linkedin, Mail, ArrowRight, Sparkles, User, Cpu, Database, Network } from 'lucide-react';
import { personalInfo } from '../data';

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 15 },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center justify-center pt-8 pb-12 overflow-hidden bg-transparent text-neutral-800 dark:text-neutral-200 scroll-mt-24 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6 lg:py-16">
        
        {/* Left Side: Professional Profile and Introduction */}
        <motion.div
          id="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left"
        >
          {/* Active Status Sticky Badge */}
          <motion.div variants={itemVariants} className="self-start">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-medium tracking-wide transition-colors duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded h-2 w-2 bg-emerald-500" />
              </span>
              <span>{personalInfo.status}</span>
            </span>
          </motion.div>

          {/* Core Name & Technical Role */}
          <div className="space-y-4">
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight"
            >
              Hi, I am Hitesh Kanagala Rajendra Prasad
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-neutral-500 dark:text-neutral-400 tracking-tight leading-normal"
            >
              I turn raw data into{' '}
              <span className="text-neutral-950 dark:text-white underline decoration-neutral-300 dark:decoration-neutral-750 decoration-wavy underline-offset-8">
                Intelligent Solutions
              </span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl font-medium text-neutral-700 dark:text-neutral-300 max-w-xl leading-snug flex items-center gap-2.5"
            >
              <Cpu className="w-5 h-5 text-neutral-500 dark:text-neutral-450 flex-shrink-0" />
              <span>{personalInfo.title}</span>
            </motion.p>
          </div>

          {/* Sleek Subtitle Card */}
          <motion.div
            variants={itemVariants}
            className="p-6 bg-neutral-50 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300 rounded border border-neutral-200 dark:border-neutral-900 max-w-xl relative overflow-hidden transition-all duration-300"
          >
            <p className="text-sm sm:text-base leading-relaxed text-neutral-550 dark:text-neutral-400 italic">
              "{personalInfo.subtitle}"
            </p>
          </motion.div>

          {/* Clean Modern Info Panel */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md bg-neutral-50/80 dark:bg-neutral-950/80 p-4 border border-neutral-200 dark:border-neutral-900 rounded transition-colors duration-300"
          >
            <div className="flex items-center space-x-3 text-neutral-750 dark:text-neutral-300">
              <div className="p-2 border border-neutral-200 dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-900 rounded transition-colors duration-300">
                <MapPin className="w-4 h-4 text-neutral-800 dark:text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Current Base:</span>
                <span className="text-sm font-semibold text-neutral-850 dark:text-neutral-200">{personalInfo.location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-neutral-750 dark:text-neutral-300">
              <div className="p-2 border border-neutral-200 dark:border-neutral-900 bg-neutral-100 dark:bg-neutral-900 rounded transition-colors duration-300">
                <GraduationCap className="w-4 h-4 text-neutral-800 dark:text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">M.Sc. Studies:</span>
                <span className="text-xs font-semibold text-neutral-850 dark:text-neutral-200 truncate max-w-[150px]">{personalInfo.university}</span>
              </div>
            </div>
          </motion.div>

          {/* Cohesive Action Buttons in Pure Monochrome */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            {/* Contact CTA */}
            <button
              id="hero-btn-contact"
              onClick={onContactClick}
              className="px-6 py-3 bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-neutral-850 dark:hover:bg-neutral-200 font-bold rounded text-sm transition-all duration-250 flex items-center space-x-2 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Contact Me</span>
              <ArrowRight className="w-3.5 h-3.5 text-current" />
            </button>

            {/* Resume CTA */}
            <a
              id="hero-btn-resume"
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white rounded text-sm font-bold transition-all duration-250 flex items-center space-x-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-neutral-500 dark:text-neutral-450" />
              <span>Access Resume</span>
            </a>

            {/* Social icons */}
            <div className="flex gap-2.5">
              <a
                id="hero-btn-github"
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-650 dark:text-neutral-350 hover:text-neutral-950 dark:hover:text-white rounded transition-all cursor-pointer flex items-center justify-center"
                aria-label="GitHub Profile"
              >
                <Github className="w-4.5 h-4.5" />
              </a>

              <a
                id="hero-btn-linkedin"
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-650 dark:text-neutral-350 hover:text-neutral-950 dark:hover:text-white rounded transition-all cursor-pointer flex items-center justify-center"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Elegant Minimal Digital ID Panel */}
        <motion.div
          id="hero-visual"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-sm lg:max-w-none bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded p-6 shadow-md flex flex-col space-y-5 text-neutral-700 dark:text-neutral-350 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-900">
              <div className="flex items-center space-x-2">
                <Network className="w-4 h-4 text-neutral-800 dark:text-white" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-450">
                  Identification Portfolio // DIGITAL ID
                </span>
              </div>
              <div className="flex space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-800" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-800" />
              </div>
            </div>

            {/* Avatar Hologram and Identity Row */}
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-850 dark:text-white flex-shrink-0 shadow-inner">
                <User className="w-6 h-6" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">IDENTIFICATION</span>
                <h3 className="text-sm font-bold text-neutral-950 dark:text-white tracking-tight leading-none mt-0.5">
                  {personalInfo.name}
                </h3>
                <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 block mt-1">
                  Applied Data Science & AI 
                </span>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-neutral-200 dark:border-neutral-900/60 text-left">
                <span className="font-mono text-neutral-400 dark:text-neutral-550 text-[10px] uppercase">STATUS</span>
                <span className="col-span-2 text-neutral-800 dark:text-neutral-200 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 dark:bg-emerald-400 animate-pulse" />
                  Internship / Werkstudent Open
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-neutral-200 dark:border-neutral-900/60 text-left">
                <span className="font-mono text-neutral-400 dark:text-neutral-550 text-[10px] uppercase">STUDIES</span>
                <span className="col-span-2 text-neutral-700 dark:text-neutral-350 leading-tight">
                  Applied Data Science & AI (M.Sc.)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-neutral-200 dark:border-neutral-900/60 text-left">
                <span className="font-mono text-neutral-400 dark:text-neutral-550 text-[10px] uppercase">LOCATION</span>
                <span className="col-span-2 text-neutral-700 dark:text-neutral-350">{personalInfo.location}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-neutral-200 dark:border-neutral-900/60 text-left">
                <span className="font-mono text-neutral-400 dark:text-neutral-550 text-[10px] uppercase">EMAIL</span>
                <a href={`mailto:${personalInfo.email}`} className="col-span-2 text-neutral-950 hover:text-neutral-850 dark:text-white dark:hover:underline break-all">{personalInfo.email}</a>
              </div>
              <div className="grid grid-cols-3 gap-2 text-left">
                <span className="font-mono text-neutral-400 dark:text-neutral-550 text-[10px] uppercase">GITHUB</span>
                <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="col-span-2 text-neutral-950 hover:text-neutral-850 dark:text-white dark:hover:underline truncate">hitesh175</a>
              </div>
            </div>

            {/* Symmetrical footer block */}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-900 flex items-center justify-between text-[10px] font-mono text-neutral-450 dark:text-neutral-550">
              <span>REF: 1752-HKR-2026</span>
              <span className="text-neutral-600 dark:text-neutral-450 tracking-wider font-medium">SRH HAMBURG CAMPUS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
