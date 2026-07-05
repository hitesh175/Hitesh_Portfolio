/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data';
import { Github, Sliders, RefreshCw, Info } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'ml' | 'analytics' | 'bi' | 'engineering'>('all');
  const [selectedSimulator, setSelectedSimulator] = useState<string | null>('aircraft-analytics'); // Default open first to show craftsmanship immediately!
  const sandboxRef = useRef<HTMLDivElement>(null);

  const handleProjectSelect = (projectId: string) => {
    setSelectedSimulator(projectId);
    setTimeout(() => {
      sandboxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  };

  // Simulator States
  // 1. Aircraft Simulator
  const [aircraftHz, setAircraftHz] = useState<number>(10);
  const [aircraftFilter, setAircraftFilter] = useState<'none' | 'low' | 'gaussian'>('gaussian');

  // 2. Supply Chain Simulator
  const [scModel, setScModel] = useState<'lr' | 'rf' | 'xgb'>('xgb');
  const [scWeather, setScWeather] = useState<number>(4);
  const [scBacklog, setScBacklog] = useState<number>(30);

  // 3. Crypto Simulator
  const [cryptoCoin, setCryptoCoin] = useState<'BTC' | 'ETH' | 'SOL'>('BTC');
  const [cryptoIndicator, setCryptoIndicator] = useState<'none' | 'sma' | 'macd'>('sma');

  // 4. Retail BI Simulator
  const [biRegion, setBiRegion] = useState<'all' | 'eu' | 'na' | 'apac'>('all');

  // 5. Retail Sales Analysis Simulator
  const [customerSegment, setCustomerSegment] = useState<'all' | 'millennials' | 'genz' | 'boomers'>('all');

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  // Simulator helper functions & calculations
  // Noisy wave generation for Aircraft
  const getAircraftData = () => {
    const points = [];
    const step = 400 / aircraftHz;
    let noiseFactor = 0;
    if (aircraftFilter === 'none') noiseFactor = 22;
    if (aircraftFilter === 'low') noiseFactor = 10;
    if (aircraftFilter === 'gaussian') noiseFactor = 3;

    for (let i = 0; i <= 400; i += step) {
      const x = i;
      const trueY = 80 + Math.sin(x * 0.03) * 25 - Math.cos(x * 0.01) * 15;
      const pseudoRandom = Math.sin(x * 2.3) * Math.cos(x * 5.7);
      const noisyY = trueY + pseudoRandom * noiseFactor;
      points.push({ x, trueY, noisyY });
    }
    return points;
  };

  // Supply Chain calculations
  const getSupplyChainMetrics = () => {
    let accuracy = 72;
    let latency = 45; // ms
    let delayRisk = 'Low';

    if (scModel === 'lr') {
      accuracy = 68 + (scWeather > 7 ? -4 : 0);
      latency = 4;
    } else if (scModel === 'rf') {
      accuracy = 81 + (scBacklog > 60 ? -2 : 1);
      latency = 18;
    } else if (scModel === 'xgb') {
      accuracy = 86 + (scWeather > 6 && scBacklog > 50 ? 2 : 0);
      latency = 11;
    }

    const calculatedRisk = (scWeather * 0.45) + ((scBacklog / 10) * 0.55);
    if (calculatedRisk > 6.5) delayRisk = 'CRITICAL DELAY';
    else if (calculatedRisk > 4.0) delayRisk = 'MODERATE DELAY';
    else delayRisk = 'ON TIME / SECURE';

    return { accuracy, latency, delayRisk, score: calculatedRisk };
  };

  // Crypto price forecasting data
  const getCryptoData = () => {
    const btcTrend = [85, 90, 88, 94, 91, 98, 105, 102, 110, 115];
    const ethTrend = [110, 105, 114, 112, 118, 115, 120, 124, 122, 130];
    const solTrend = [70, 75, 82, 78, 85, 90, 95, 92, 98, 105];

    let base = btcTrend;
    if (cryptoCoin === 'ETH') base = ethTrend;
    if (cryptoCoin === 'SOL') base = solTrend;

    return base.map((y, idx) => ({
      x: idx * 40,
      y: 160 - y, // Invert SVG space
      indicator: y + (cryptoIndicator === 'sma' ? Math.sin(idx) * 4 : cryptoIndicator === 'macd' ? Math.cos(idx) * 7 : 0),
      isUp: idx > 0 ? y > base[idx - 1] : true
    }));
  };

  // Retail BI calculations
  const getBiMetrics = () => {
    let totalSales = 1240500;
    let margin = 24.5;
    let transactions = 34500;

    if (biRegion === 'eu') {
      totalSales = 450300;
      margin = 22.8;
      transactions = 12100;
    } else if (biRegion === 'na') {
      totalSales = 560100;
      margin = 26.2;
      transactions = 15400;
    } else if (biRegion === 'apac') {
      totalSales = 230100;
      margin = 23.9;
      transactions = 7000;
    }

    return { totalSales, margin, transactions };
  };

  // Retail Sales segments
  const getCustomerSegmentMetrics = () => {
    let averageTicket = 45.2;
    let purchaseFrequency = 2.4;
    let onlineRatio = 64; // %

    if (customerSegment === 'millennials') {
      averageTicket = 58.5;
      purchaseFrequency = 3.1;
      onlineRatio = 78;
    } else if (customerSegment === 'genz') {
      averageTicket = 32.1;
      purchaseFrequency = 1.8;
      onlineRatio = 92;
    } else if (customerSegment === 'boomers') {
      averageTicket = 62.4;
      purchaseFrequency = 2.9;
      onlineRatio = 34;
    }

    return { averageTicket, purchaseFrequency, onlineRatio };
  };

  return (
    <section
      id="projects"
      className="py-16 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold font-mono tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
            My Creative Engineering Sandbox
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-tight">
            Most Recent Works
          </h2>
          <div className="w-12 h-1 bg-neutral-900 dark:bg-white mx-auto mt-4" />
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ml', label: 'Machine Learning' },
            { id: 'analytics', label: 'Data Analytics' },
            { id: 'bi', label: 'Business Intelligence' },
            { id: 'engineering', label: 'Data Engineering' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4.5 py-2 rounded text-[10px] font-semibold font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                filter === cat.id
                  ? 'bg-neutral-950 text-white border-neutral-800 dark:bg-white dark:text-neutral-950 dark:border-neutral-200 shadow-sm'
                  : 'bg-neutral-50 text-neutral-500 hover:text-neutral-900 border-neutral-200 hover:border-neutral-300 dark:bg-black dark:text-neutral-450 dark:border-neutral-900 dark:hover:border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Layout Grid */}
        <div className="space-y-10">
          
          {/* Projects Multi-Column Grid (Eliminates vertical stretching) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const isActive = selectedSimulator === project.id;
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isActive={isActive}
                    onClick={() => handleProjectSelect(project.id)}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          {/* Active Sandbox Guidance Banner */}
          {selectedSimulator && (
            <div className="max-w-4xl mx-auto w-full mb-3 p-3.5 bg-neutral-100/90 dark:bg-neutral-950/90 border border-neutral-200 dark:border-neutral-900 rounded flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-neutral-450 tracking-wide shadow-sm">
              <div className="flex items-center space-x-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-neutral-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neutral-900 dark:bg-white"></span>
                </span>
                <span>
                  SANDBOX ACTIVE // <strong className="text-neutral-900 dark:text-white font-semibold">{(projects.find(p => p.id === selectedSimulator))?.title}</strong> is running below.
                </span>
              </div>
              <span className="hidden sm:inline-flex items-center text-[10px] text-neutral-500 dark:text-neutral-500 gap-1 animate-pulse">
                Scroll & interact below to test raw data simulations ↓
              </span>
            </div>
          )}

          {/* Interactive Visualization Simulator Console (Centered full-width layout) */}
          <div ref={sandboxRef} className="max-w-4xl mx-auto w-full transition-all duration-300">
            <AnimatePresence mode="wait">
              {selectedSimulator && (
                <motion.div
                  key={selectedSimulator}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 p-6 sm:p-8 rounded border border-neutral-200 dark:border-neutral-900 shadow-lg overflow-hidden relative flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-800 transition-colors"
                >
                             {/* Visualizer header */}
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 pb-4 mb-6 text-left">
                    <div className="flex items-center space-x-2.5">
                      <Sliders className="w-4 h-4 text-neutral-900 dark:text-white" />
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-neutral-800 dark:text-neutral-300">
                        Interactive Science Sandbox Panel
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-950 text-[9px] font-mono text-neutral-500 dark:text-neutral-450 rounded border border-neutral-200 dark:border-neutral-900 select-none">
                      v1.4.2 // stable
                    </span>
                  </div>

                  {/* 1. Aircraft Simulator Panel */}
                  {selectedSimulator === 'aircraft-analytics' && (
                    <div className="space-y-6">
                      <div className="text-left">
                        <h4 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-tight">
                          Flight Altitude Noise Filtering Simulator
                        </h4>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-450 font-mono mt-1 leading-relaxed">
                          Demonstrating NumPy vectorization filtering on high-frequency altitude sensors.
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-100 dark:bg-neutral-900/40 p-4 rounded border border-neutral-200 dark:border-neutral-800 text-left">
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 block uppercase tracking-wider">
                            Sampling Rate ({aircraftHz} Hz)
                          </label>
                          <input
                            type="range"
                            min="5"
                            max="30"
                            step="5"
                            value={aircraftHz}
                            onChange={(e) => setAircraftHz(Number(e.target.value))}
                            className="w-full accent-neutral-700 dark:accent-neutral-350 h-1 bg-neutral-200 dark:bg-neutral-900 rounded appearance-none cursor-pointer"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 block uppercase tracking-wider">
                            Filter Algorithm
                          </label>
                          <div className="flex space-x-1.5">
                            {['none', 'low', 'gaussian'].map((alg) => (
                              <button
                                key={alg}
                                onClick={() => setAircraftFilter(alg as any)}
                                className={`flex-1 py-1 text-[9px] font-bold font-mono uppercase rounded border transition-colors cursor-pointer ${
                                  aircraftFilter === alg
                                    ? 'bg-neutral-950 text-white border-neutral-800 dark:bg-white dark:text-neutral-900 dark:border-neutral-300 font-bold'
                                    : 'bg-neutral-50 text-neutral-500 border-neutral-200 hover:text-neutral-900 dark:bg-black dark:text-neutral-450 dark:border-neutral-900 dark:hover:text-white'
                                }`}
                              >
                                {alg}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Active SVG Plot */}
                      <div className="relative h-48 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 rounded flex flex-col justify-center items-center overflow-hidden">
                        <div className="absolute top-2 left-3 font-mono text-[9px] text-neutral-500 dark:text-neutral-405 flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <span className="w-2.5 h-0.5 bg-neutral-300 dark:bg-neutral-800 inline-block" />
                            <span>Raw Sensor</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="w-2.5 h-0.5 bg-neutral-900 dark:bg-white inline-block" />
                            <span>Smoothed Output</span>
                          </span>
                        </div>

                        {/* Interactive dynamic SVG chart */}
                        <svg viewBox="0 0 400 160" className="w-full h-full p-2 mt-4 select-none">
                          <line x1="0" y1="40" x2="400" y2="40" className="stroke-neutral-200 dark:stroke-neutral-800" strokeDasharray="3,3" />
                          <line x1="0" y1="80" x2="400" y2="80" className="stroke-neutral-200 dark:stroke-neutral-800" strokeDasharray="3,3" />
                          <line x1="0" y1="120" x2="400" y2="120" className="stroke-neutral-200 dark:stroke-neutral-800" strokeDasharray="3,3" />
                          
                          {/* Plot lines */}
                          <path
                            d={`M ${getAircraftData().map(p => `${p.x} ${p.noisyY}`).join(' L ')}`}
                            fill="none"
                            className="stroke-neutral-400 dark:stroke-neutral-600 transition-all duration-300"
                            strokeWidth="1.2"
                            strokeOpacity="0.4"
                          />
                          
                          <path
                            d={`M ${getAircraftData().map(p => `${p.x} ${p.trueY}`).join(' L ')}`}
                            fill="none"
                            className="stroke-neutral-900 dark:stroke-white transition-all duration-300"
                            strokeWidth="2.5"
                          />
                        </svg>
                      </div>

                      {/* Stat summary */}
                      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 text-left">
                        <span>PIPELINE_STATUS: [STABLE]</span>
                        <span>VECTORIZED_LATENCY: 1.8ms</span>
                      </div>
                    </div>
                  )}

                  {/* 2. Supply Chain Simulator Panel */}
                  {selectedSimulator === 'supply-chain-delay' && (
                    <div className="space-y-6">
                      <div className="text-left">
                        <h4 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-tight">
                          Supply Chain Logistical Delay Forecaster
                        </h4>
                        <p className="text-[11px] text-neutral-600 dark:text-slate-400 font-mono mt-1 leading-relaxed">
                          Predicting dispatch risk probabilities using customized parameters.
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-neutral-100 dark:bg-neutral-900/40 p-4 rounded border border-neutral-200 dark:border-neutral-800 text-left">
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 block uppercase tracking-wider">
                            Model Classifier
                          </label>
                          <select
                            value={scModel}
                            onChange={(e) => setScModel(e.target.value as any)}
                            className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 text-[10px] font-semibold text-neutral-850 dark:text-neutral-200 rounded p-1.5 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-700"
                          >
                            <option value="lr">Logistic Regression</option>
                            <option value="rf">Random Forest</option>
                            <option value="xgb">XGBoost (Gradient Boost)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 block uppercase tracking-wider">
                            Weather Severity (1-10)
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={scWeather}
                            onChange={(e) => setScWeather(Number(e.target.value))}
                            className="w-full accent-neutral-700 dark:accent-neutral-350 h-1 bg-neutral-200 dark:bg-neutral-900 rounded appearance-none cursor-pointer"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 block uppercase tracking-wider">
                            Backlog Ratio ({scBacklog}%)
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="90"
                            step="10"
                            value={scBacklog}
                            onChange={(e) => setScBacklog(Number(e.target.value))}
                            className="w-full accent-neutral-700 dark:accent-neutral-350 h-1 bg-neutral-200 dark:bg-neutral-900 rounded appearance-none cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Output metrics visualizer */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-neutral-100 dark:bg-neutral-950 p-3 rounded border border-neutral-200 dark:border-neutral-900 text-center">
                          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-450 block uppercase font-bold tracking-wider">Classifier AUC</span>
                          <span className="text-sm sm:text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                            {getSupplyChainMetrics().accuracy}%
                          </span>
                        </div>
                        <div className="bg-neutral-100 dark:bg-neutral-950 p-3 rounded border border-neutral-200 dark:border-neutral-900 text-center">
                          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-450 block uppercase font-bold tracking-wider">Inference Time</span>
                          <span className="text-sm sm:text-base font-bold font-mono text-neutral-800 dark:text-white mt-1 block">
                            {getSupplyChainMetrics().latency}ms
                          </span>
                        </div>
                        <div className="bg-neutral-100 dark:bg-neutral-950 p-3 rounded border border-neutral-200 dark:border-neutral-900 text-center flex flex-col justify-center">
                          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-450 block uppercase font-bold tracking-wider">Delay Risk State</span>
                          <span className={`text-[10px] font-bold tracking-tight mt-1 uppercase ${
                            getSupplyChainMetrics().delayRisk.includes('CRITICAL') ? 'text-red-500 dark:text-red-400 animate-pulse' : getSupplyChainMetrics().delayRisk.includes('MODERATE') ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-500 dark:text-emerald-400'
                          }`}>
                            {getSupplyChainMetrics().delayRisk}
                          </span>
                        </div>
                      </div>

                      {/* Confusion Matrix illustration */}
                      <div className="bg-neutral-100 dark:bg-neutral-950 p-4 border border-neutral-200 dark:border-neutral-900 rounded text-left">
                        <span className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 uppercase block mb-3 text-center">Confusion Matrix Matrix</span>
                        <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto text-center font-mono text-xs text-neutral-800 dark:text-white">
                          <div className="p-2.5 bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded">
                            <span className="block text-[8px] text-neutral-500 dark:text-neutral-450 font-bold">TRUE NEGATIVE (85%)</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">92 cases</span>
                          </div>
                          <div className="p-2.5 bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded">
                            <span className="block text-[8px] text-neutral-500 dark:text-neutral-450 font-bold">FALSE POSITIVE (15%)</span>
                            <span className="font-bold text-red-650">12 cases</span>
                          </div>
                          <div className="p-2.5 bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded">
                            <span className="block text-[8px] text-neutral-500 dark:text-neutral-450 font-bold">FALSE NEGATIVE (11%)</span>
                            <span className="font-bold text-red-650">8 cases</span>
                          </div>
                          <div className="p-2.5 bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded">
                            <span className="block text-[8px] text-neutral-500 dark:text-neutral-450 font-bold">TRUE POSITIVE (89%)</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">65 cases</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Crypto Simulator Panel */}
                  {selectedSimulator === 'crypto-prediction' && (
                    <div className="space-y-6">
                      <div className="text-left">
                        <h4 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-tight">
                          Crypto Historical Time-Series Direction Predictor
                        </h4>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-450 font-mono mt-1 leading-relaxed">
                          Simulating trend directional labels with dynamic indicators.
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="grid grid-cols-2 gap-4 bg-neutral-100 dark:bg-neutral-900/40 p-4 rounded border border-neutral-200 dark:border-neutral-800 text-left">
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 block uppercase tracking-wider">
                            Crypto Asset
                          </label>
                          <div className="flex space-x-1.5">
                            {['BTC', 'ETH', 'SOL'].map((coin) => (
                              <button
                                key={coin}
                                onClick={() => setCryptoCoin(coin as any)}
                                className={`flex-1 py-1 text-[9px] font-bold font-mono uppercase rounded border transition-colors cursor-pointer ${
                                  cryptoCoin === coin
                                    ? 'bg-neutral-950 text-white border-neutral-850 dark:bg-white dark:text-neutral-900 dark:border-neutral-300 font-bold'
                                    : 'bg-neutral-50 text-neutral-500 border-neutral-200 hover:text-neutral-900 dark:bg-black dark:text-neutral-450 dark:border-neutral-900 dark:hover:text-white'
                                }`}
                              >
                                {coin}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 block uppercase tracking-wider">
                            Indicator Overlay
                          </label>
                          <div className="flex space-x-1.5">
                            {['none', 'sma', 'macd'].map((ind) => (
                              <button
                                key={ind}
                                onClick={() => setCryptoIndicator(ind as any)}
                                className={`flex-1 py-1 text-[9px] font-bold font-mono uppercase rounded border transition-colors cursor-pointer ${
                                  cryptoIndicator === ind
                                    ? 'bg-neutral-950 text-white border-neutral-850 dark:bg-white dark:text-neutral-900 dark:border-neutral-300 font-bold'
                                    : 'bg-neutral-50 text-neutral-500 border-neutral-200 hover:text-neutral-900 dark:bg-black dark:text-neutral-450 dark:border-neutral-900 dark:hover:text-white'
                                }`}
                              >
                                {ind}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Time series SVG rendering */}
                      <div className="h-44 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-900 rounded relative overflow-hidden flex flex-col justify-center">
                        <div className="absolute top-2 left-3 font-mono text-[9px] text-neutral-600 dark:text-neutral-500 flex space-x-3 font-bold">
                          <span>{cryptoCoin} Price Stream</span>
                          {cryptoIndicator !== 'none' && <span className="text-neutral-850 dark:text-neutral-300 uppercase">// {cryptoIndicator} active</span>}
                        </div>

                        <svg viewBox="0 0 380 120" className="w-full h-full p-2 mt-4 select-none">
                          <path
                            d={`M ${getCryptoData().map(p => `${p.x} ${p.y}`).join(' L ')}`}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2.5"
                            className="transition-all duration-300"
                          />

                          {cryptoIndicator !== 'none' && (
                            <path
                              d={`M ${getCryptoData().map(p => `${p.x} ${160 - p.indicator}`).join(' L ')}`}
                              fill="none"
                              className="stroke-neutral-900 dark:stroke-white transition-all duration-300"
                              strokeWidth="1.5"
                              strokeDasharray="3,3"
                            />
                          )}

                          {getCryptoData().map((p, idx) => (
                            idx > 0 && idx % 2 === 0 ? (
                              <g key={idx}>
                                {p.isUp ? (
                                  <polygon points={`${p.x},${p.y - 12} ${p.x - 4},${p.y - 6} ${p.x + 4},${p.y - 6}`} fill="#34d399" />
                                ) : (
                                  <polygon points={`${p.x},${p.y + 12} ${p.x - 4},${p.y + 6} ${p.x + 4},${p.y + 6}`} fill="#f87171" />
                                )}
                              </g>
                            ) : null
                          ))}
                        </svg>
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-550 text-left font-bold">
                        <span>PREDICTED_SIGNAL: {getCryptoData()[getCryptoData().length - 1].isUp ? 'BUY/LONG [▲]' : 'SELL/SHORT [▼]'}</span>
                        <span>PRECISION_ACCURACY: 79.4%</span>
                      </div>
                    </div>
                  )}

                  {/* 4. Retail BI Dashboard Panel */}
                  {selectedSimulator === 'retail-bi-dashboard' && (
                    <div className="space-y-6">
                      <div className="text-left">
                        <h4 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-tight">
                          Corporate Interactive Sales KPI dashboard
                        </h4>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-450 font-mono mt-1 leading-relaxed">
                          Simulating aggregated regional SQL dimensions into Power BI insights.
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center space-x-3 bg-neutral-100 dark:bg-neutral-900/40 p-4 rounded border border-neutral-200 dark:border-neutral-800 text-left">
                        <span className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 uppercase whitespace-nowrap tracking-wider">Filter Region:</span>
                        <div className="flex flex-1 space-x-1.5">
                          {[
                            { id: 'all', label: 'All Global' },
                            { id: 'eu', label: 'Europe' },
                            { id: 'na', label: 'N. America' },
                            { id: 'apac', label: 'APAC' },
                          ].map((reg) => (
                            <button
                              key={reg.id}
                              onClick={() => setBiRegion(reg.id as any)}
                              className={`flex-1 py-1 text-[9px] font-bold font-mono rounded border transition-colors cursor-pointer ${
                                biRegion === reg.id
                                  ? 'bg-neutral-950 text-white border-neutral-850 dark:bg-white dark:text-neutral-900 dark:border-neutral-300 font-bold'
                                  : 'bg-neutral-50 text-neutral-500 border-neutral-200 hover:text-neutral-900 dark:bg-black dark:text-neutral-450 dark:border-neutral-900 dark:hover:text-white'
                              }`}
                            >
                              {reg.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mini Executive Dashboard */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-neutral-100 dark:bg-neutral-950 p-3 rounded border border-neutral-200 dark:border-neutral-900 text-center">
                          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-450 block uppercase font-bold tracking-wider">Total Revenue</span>
                          <span className="text-xs sm:text-sm font-mono font-bold text-neutral-800 dark:text-white mt-1 block">
                            ${getBiMetrics().totalSales.toLocaleString()}
                          </span>
                        </div>
                        <div className="bg-neutral-100 dark:bg-neutral-950 p-3 rounded border border-neutral-200 dark:border-neutral-900 text-center">
                          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-450 block uppercase font-bold tracking-wider">Profit Margin</span>
                          <span className="text-xs sm:text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                            {getBiMetrics().margin}%
                          </span>
                        </div>
                        <div className="bg-neutral-100 dark:bg-neutral-950 p-3 rounded border border-neutral-200 dark:border-neutral-900 text-center">
                          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-450 block uppercase font-bold tracking-wider">Transactions</span>
                          <span className="text-xs sm:text-sm font-mono font-bold text-neutral-800 dark:text-white mt-1 block">
                            {getBiMetrics().transactions.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Interactive bar graph breakdown */}
                      <div className="bg-neutral-100 dark:bg-neutral-950 p-4 border border-neutral-200 dark:border-neutral-900 rounded space-y-3 text-left">
                        <span className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 uppercase block text-center">Product Category Revenue Contribution</span>
                        
                        <div className="space-y-2">
                          {[
                            { name: 'Apparel & Wearables', ratio: biRegion === 'eu' ? 45 : biRegion === 'na' ? 25 : 35 },
                            { name: 'Electronics & Devices', ratio: biRegion === 'na' ? 55 : biRegion === 'apac' ? 40 : 45 },
                            { name: 'Home & Kitchen Essentials', ratio: biRegion === 'apac' ? 25 : biRegion === 'eu' ? 20 : 20 },
                          ].map((cat, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-[9px] font-mono text-neutral-500 dark:text-neutral-450">
                                <span>{cat.name}</span>
                                <span>{cat.ratio}%</span>
                              </div>
                              <div className="h-2 bg-neutral-200 dark:bg-neutral-950 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-900">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${cat.ratio}%` }}
                                  className="h-full bg-neutral-950 dark:bg-white rounded-full"
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. Retail Store Sales Analysis Panel */}
                  {selectedSimulator === 'store-sales-analysis' && (
                    <div className="space-y-6">
                      <div className="text-left">
                        <h4 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-tight">
                          Customer Spending Distribution Explorer
                        </h4>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-450 font-mono mt-1 leading-relaxed">
                          Identifying purchasing clusters across segmented cohort groups.
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center space-x-3 bg-neutral-100 dark:bg-neutral-900/40 p-4 rounded border border-neutral-200 dark:border-neutral-800 text-left">
                        <span className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 uppercase whitespace-nowrap tracking-wider">Cohort:</span>
                        <div className="flex flex-1 space-x-1.5">
                          {[
                            { id: 'all', label: 'All' },
                            { id: 'millennials', label: 'Millennials' },
                            { id: 'genz', label: 'Gen Z' },
                            { id: 'boomers', label: 'Boomers' },
                          ].map((seg) => (
                            <button
                              key={seg.id}
                              onClick={() => setCustomerSegment(seg.id as any)}
                              className={`flex-1 py-1 text-[9px] font-bold font-mono rounded border transition-colors cursor-pointer ${
                                customerSegment === seg.id
                                  ? 'bg-neutral-950 text-white border-neutral-850 dark:bg-white dark:text-neutral-900 dark:border-neutral-300 font-bold'
                                  : 'bg-neutral-50 text-neutral-500 border-neutral-200 hover:text-neutral-900 dark:bg-black dark:text-neutral-450 dark:border-neutral-900 dark:hover:text-white'
                              }`}
                            >
                              {seg.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantitative Insights */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-neutral-100 dark:bg-neutral-950 p-3 rounded border border-neutral-200 dark:border-neutral-900 text-center">
                          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-450 block uppercase font-bold tracking-wider">Average Ticket</span>
                          <span className="text-sm font-mono font-bold text-neutral-800 dark:text-white mt-1 block">
                            ${getCustomerSegmentMetrics().averageTicket.toFixed(2)}
                          </span>
                        </div>
                        <div className="bg-neutral-100 dark:bg-neutral-950 p-3 rounded border border-neutral-200 dark:border-neutral-900 text-center">
                          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-450 block uppercase font-bold tracking-wider">Monthly Freq.</span>
                          <span className="text-sm font-mono font-bold text-neutral-800 dark:text-white mt-1 block">
                            {getCustomerSegmentMetrics().purchaseFrequency.toFixed(1)} visits
                          </span>
                        </div>
                        <div className="bg-neutral-100 dark:bg-neutral-950 p-3 rounded border border-neutral-200 dark:border-neutral-900 text-center">
                          <span className="text-[9px] font-mono text-neutral-500 dark:text-neutral-450 block uppercase font-bold tracking-wider">Digital Incline</span>
                          <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                            {getCustomerSegmentMetrics().onlineRatio}% Online
                          </span>
                        </div>
                      </div>

                      {/* Distribution Histogram Preview */}
                      <div className="bg-neutral-100 dark:bg-neutral-950 p-4 border border-neutral-200 dark:border-neutral-900 rounded space-y-3 text-left">
                        <span className="text-[9px] font-bold font-mono text-neutral-600 dark:text-neutral-450 uppercase block text-center">Transaction Value Frequency (Histogram)</span>
                        
                        <div className="h-28 flex items-end justify-between px-4 pt-4 border-b border-neutral-200 dark:border-neutral-900">
                          {[20, 35, 60, 95, 75, 45, 30, 15].map((val, idx) => {
                            let finalVal = val;
                            if (customerSegment === 'genz') {
                              if (idx < 3) finalVal = val * 1.3;
                              else finalVal = val * 0.4;
                            } else if (customerSegment === 'boomers') {
                              if (idx > 4) finalVal = val * 1.5;
                              else finalVal = val * 0.6;
                            }
                            return (
                              <div key={idx} className="flex-1 flex flex-col items-center">
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: `${Math.min(90, finalVal)}%` }}
                                  className="w-4 bg-neutral-400 dark:bg-neutral-550 rounded-t hover:bg-neutral-800 dark:hover:bg-white transition-colors"
                                  transition={{ type: 'spring', stiffness: 100 }}
                                />
                                <span className="text-[7px] font-mono text-neutral-500 dark:text-neutral-450 mt-1">${(idx + 1) * 15}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Simulator footer */}
                  <div className="mt-6 border-t border-neutral-200 dark:border-neutral-900 pt-4 flex items-center justify-between text-[10px] font-mono text-neutral-500 text-left">
                    <span className="flex items-center space-x-1.5">
                      <RefreshCw className="w-3 h-3 animate-spin text-neutral-900 dark:text-white" />
                      <span>Reactive Calculations active</span>
                    </span>
                    <span>SRH_LABS // HITESH_K_R</span>
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
