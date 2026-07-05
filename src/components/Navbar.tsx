/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onNavClick: (id: string) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

export default function Navbar({ activeTab, onNavClick, theme, onThemeToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'academic', label: 'Academic' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact Me' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavClick(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/85 dark:bg-black/85 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-900 py-3 shadow-sm dark:shadow-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Modern Minimal Logo */}
        <button
          id="logo-button"
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-1 group cursor-pointer text-left bg-transparent border-none p-0 focus:outline-none"
        >
          <div className="flex flex-col">
            <span className="text-sm font-display font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-350 transition-colors leading-none">
              Hitesh K. R.
            </span>
            <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-450 uppercase tracking-widest mt-1">
              Data Analyst
            </span>
          </div>
        </button>

        {/* Desktop Nav Items with pristine minimalist styling */}
        <div className="hidden lg:flex items-center space-x-3">
          <nav id="desktop-nav" className="flex items-center space-x-1 bg-neutral-100 dark:bg-neutral-950 p-1 border border-neutral-200 dark:border-neutral-900 rounded-lg">
            {navItems.map((item) => {
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-1.5 rounded text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'text-neutral-900 bg-white border border-neutral-200 dark:text-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-450 dark:hover:text-white border border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle Button (Desktop) */}
          <button
            id="btn-theme-toggle-desktop"
            onClick={onThemeToggle}
            className="p-2 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div id="nav-controls" className="flex items-center space-x-2 lg:hidden">
          {/* Theme Toggle Button (Mobile) */}
          <button
            id="btn-theme-toggle-mobile"
            onClick={onThemeToggle}
            className="p-2 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Hamburger Menu */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-white transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-neutral-200 dark:border-neutral-900 bg-white/95 dark:bg-black/95 backdrop-blur-lg overflow-hidden"
          >
            <nav className="flex flex-col space-y-1 px-4 pt-3 pb-6">
              {navItems.map((item) => {
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full py-2 px-4 rounded text-left text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-100 text-neutral-950 border-l-2 border-neutral-950 pl-3 dark:bg-neutral-900 dark:text-white dark:border-white'
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50 dark:text-neutral-450 dark:hover:text-white dark:hover:bg-neutral-900/50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
