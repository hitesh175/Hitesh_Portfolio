/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Database, ArrowUp, Github, Linkedin, Heart } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="mt-16 bg-black border-t border-neutral-900 text-neutral-450 py-12 transition-colors relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-2 text-white font-display font-bold text-base uppercase tracking-wider">
            <Database className="w-5 h-5 text-white" />
            <span>Hitesh K R // Portfolio</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              id="footer-github"
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-neutral-950 border border-neutral-900 hover:border-neutral-700 hover:scale-105 rounded text-white transition-all cursor-pointer"
              aria-label="GitHub Profile"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              id="footer-linkedin"
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-neutral-950 border border-neutral-900 hover:border-neutral-700 hover:scale-105 rounded text-white transition-all cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          </div>

        </div>

        {/* Legal and Back to Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-neutral-500">
          
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span>© {new Date().getFullYear()} Hitesh K R. Portfolio.</span>
            <Heart className="w-3.5 h-3.5 text-white inline-block mx-0.5 fill-white" />
            <span>Hamburg, Germany.</span>
          </div>

          {/* Back to top */}
          <button
            id="btn-footer-back-top"
            onClick={handleScrollTop}
            className="flex items-center space-x-1.5 px-4 py-2 bg-neutral-950 hover:bg-neutral-900 text-white border border-neutral-900 rounded uppercase tracking-wider transition-all cursor-pointer text-[10px]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 text-white" />
          </button>

        </div>

      </div>
    </footer>
  );
}
