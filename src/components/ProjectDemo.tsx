import { useState } from 'react';
import { motion } from 'motion/react';
import { Sliders, RefreshCw } from 'lucide-react';
export default function ProjectDemo({ projectId }: { projectId: string }) {
  const selectedSimulator = projectId;
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

  // 6. Web Dev Simulator
  const [webColumns, setWebColumns] = useState(2);

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

  const matrix = scModel === 'lr' ? {tn: 75, fp: 29, fn: 25, tp: 48} : scModel === 'rf' ? {tn: 88, fp: 16, fn: 14, tp: 59} : {tn: 92, fp: 12, fn: 8, tp: 65};
  // Illustrative model outcomes, not an executed model or benchmark.
  // Supply Chain calculations
  const getSupplyChainMetrics = () => {
    let latency = 45; // ms
    let delayRisk = 'Low';

    if (scModel === 'lr') {
      latency = 4;
    } else if (scModel === 'rf') {
      latency = 18;
    } else if (scModel === 'xgb') {
      latency = 11;
    }

    const calculatedRisk = (scWeather * 0.45) + ((scBacklog / 10) * 0.55);
    if (calculatedRisk > 6.5) delayRisk = 'CRITICAL DELAY';
    else if (calculatedRisk > 4.0) delayRisk = 'MODERATE DELAY';
    else delayRisk = 'ON TIME / SECURE';

    return { accuracy: (100 * (matrix.tn + matrix.tp) / (matrix.tn + matrix.tp + matrix.fn + matrix.fp)).toFixed(1), latency, delayRisk, score: calculatedRisk };
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


  return (                <motion.div
                  key={selectedSimulator}
                  data-project-id={selectedSimulator}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 p-6 sm:p-8 rounded border border-neutral-200 dark:border-neutral-900 shadow-lg overflow-hidden relative flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-800 transition-colors"
                >
                             {/* Visualizer header */}
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-900 pb-4 mb-6 text-left">
                    <div className="flex items-center space-x-2.5">
                      <Sliders className="w-4 h-4 text-neutral-900 dark:text-white" />
                      <span className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-800 dark:text-neutral-300">
                        Interactive demonstration
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300 font-medium rounded border border-neutral-200 dark:border-neutral-800 select-none">
                      Synthetic data
                    </span>
                  </div>

                  <p className="max-w-[65ch] text-sm mb-6 text-neutral-700 dark:text-neutral-300">Illustrative demo using synthetic data. Model scores, example timings and financial figures are not verified project results. See the project's source for the implementation.</p>
                  {/* 1. Aircraft Simulator Panel */}
                  {selectedSimulator === 'aircraft-analytics' && (
                    <div className="space-y-6">
                      <div className="text-left">
                        <h3 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-tight">
                          Generated signal explorer
                        </h3>
                        <p className="max-w-[65ch] text-xs text-neutral-700 dark:text-neutral-200 font-mono mt-1 leading-relaxed">
                          A JavaScript smoothing demonstration using a generated signal. Values are illustrative, not recorded aircraft measurements.
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left py-4 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="space-y-2">
                          <label htmlFor="sim-control-1" className="text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider">
                            Samples per signal ({aircraftHz})
                          </label>
                          <input id="sim-control-1"
                            type="range"
                            min="5"
                            max="30"
                            step="5"
                            value={aircraftHz}
                            onChange={(e) => setAircraftHz(Number(e.target.value))}
                            className="w-full accent-neutral-900 dark:accent-neutral-200 h-1 bg-neutral-300 dark:bg-neutral-800 rounded appearance-none cursor-pointer"
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="max-w-[65ch] text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider">
                            Noise level
                          </p>
                          <div className="flex space-x-1.5">
                            {['none', 'low', 'gaussian'].map((alg) => (
                              <button
                                key={alg === 'none' ? 'High' : alg === 'low' ? 'Medium' : 'Low'}
                                aria-pressed={aircraftFilter === alg} onClick={() => setAircraftFilter(alg as any)}
                                className={`flex-1 py-1 text-xs font-bold font-mono uppercase rounded border transition-colors cursor-pointer ${
                                  aircraftFilter === alg
                                    ? 'bg-neutral-950 text-white border-neutral-800 dark:bg-white dark:text-neutral-900 dark:border-neutral-300 font-bold'
                                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:text-neutral-950 dark:bg-black dark:text-neutral-300 dark:border-neutral-850 dark:hover:text-white'
                                }`}
                              >
                                {alg === 'none' ? 'High' : alg === 'low' ? 'Medium' : 'Low'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Active SVG Plot */}
                      <div className="relative h-48 flex flex-col justify-center items-center overflow-hidden py-4 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="absolute top-2 left-3 font-mono text-xs text-neutral-700 dark:text-neutral-300 flex items-center space-x-4 font-semibold">
                          <span className="flex items-center space-x-1">
                            <span className="w-2.5 h-0.5 bg-neutral-400 dark:bg-neutral-700 inline-block" />
                            <span>Raw Sensor</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span className="w-2.5 h-0.5 bg-neutral-900 dark:bg-white inline-block" />
                            <span>Reference signal</span>
                          </span>
                        </div>

                        {/* Interactive dynamic SVG chart */}
                        <svg role="img" aria-label="Generated altitude signal and reference curve; sample index horizontally, illustrative signal units vertically" viewBox="0 0 400 160" className="w-full h-full p-2 mt-4 select-none">
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
                      <div className="flex justify-between items-center text-xs font-mono text-neutral-700 dark:text-neutral-300 font-semibold text-left">
                        <span>ILLUSTRATIVE SIGNAL</span>
                        <span>DATA: GENERATED IN BROWSER</span>
                      </div>
                    </div>
                  )}

                  {/* 2. Supply Chain Simulator Panel */}
                  {selectedSimulator === 'supply-chain-delay' && (
                    <div className="space-y-6">
                      <div className="text-left">
                        <h3 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-tight">
                          Supply Chain Logistical Delay Forecaster
                        </h3>
                        <p className="max-w-[65ch] text-xs text-neutral-700 dark:text-neutral-200 font-mono mt-1 leading-relaxed">
                          Predicting dispatch risk probabilities using customized parameters.
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left py-4 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="space-y-2">
                          <label htmlFor="sim-control-2" className="text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider">Model classifier</label>
                          <select id="sim-control-2"
                            value={scModel}
                            onChange={(e) => setScModel(e.target.value as any)}
                            className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-900 dark:text-neutral-100 rounded p-1.5 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600"
                          >
                            <option value="lr">Logistic Regression</option>
                            <option value="rf">Random Forest</option>
                            <option value="xgb">XGBoost (Gradient Boost)</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="sim-control-3" className="text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider">
                            Weather Severity (1-10)
                          </label>
                          <input id="sim-control-3"
                            type="range"
                            min="1"
                            max="10"
                            value={scWeather}
                            onChange={(e) => setScWeather(Number(e.target.value))}
                            className="w-full accent-neutral-900 dark:accent-neutral-200 h-1 bg-neutral-300 dark:bg-neutral-800 rounded appearance-none cursor-pointer"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="sim-control-4" className="text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider">
                            Backlog Ratio ({scBacklog}%)
                          </label>
                          <input id="sim-control-4"
                            type="range"
                            min="10"
                            max="90"
                            step="10"
                            value={scBacklog}
                            onChange={(e) => setScBacklog(Number(e.target.value))}
                            className="w-full accent-neutral-900 dark:accent-neutral-200 h-1 bg-neutral-300 dark:bg-neutral-800 rounded appearance-none cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Output metrics visualizer */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="text-center py-4 border-t border-neutral-200 dark:border-neutral-800">
                          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase font-bold tracking-wider">Example accuracy</span>
                          <span className="text-sm sm:text-base font-bold font-mono text-emerald-700 dark:text-emerald-300 mt-1 block">
                            {getSupplyChainMetrics().accuracy}%
                          </span>
                        </div>
                        <div className="text-center py-4 border-t border-neutral-200 dark:border-neutral-800">
                          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase font-bold tracking-wider">Example latency</span>
                          <span className="text-sm sm:text-base font-bold font-mono text-neutral-900 dark:text-white mt-1 block">
                            {getSupplyChainMetrics().latency}ms
                          </span>
                        </div>
                        <div className="text-center flex flex-col justify-center py-4 border-t border-neutral-200 dark:border-neutral-800">
                          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase font-bold tracking-wider">Delay Risk State</span>
                          <span className={`text-xs font-bold tracking-tight mt-1 uppercase ${
                            getSupplyChainMetrics().delayRisk.includes('CRITICAL') ? 'text-red-700 dark:text-red-300 ' : getSupplyChainMetrics().delayRisk.includes('MODERATE') ? 'text-amber-800 dark:text-amber-300' : 'text-emerald-700 dark:text-emerald-300'
                          }`}>
                            {getSupplyChainMetrics().delayRisk}
                          </span>
                        </div>
                      </div>

                      {/* Confusion Matrix illustration */}
                      <div className="text-left py-4 border-t border-neutral-200 dark:border-neutral-800">
                        <span className="text-xs font-bold font-mono text-neutral-700 dark:text-neutral-300 uppercase block mb-3 text-center">Example confusion matrix (row percentages)</span>
                        <table className="w-full text-sm text-left"><caption className="sr-only">Illustrative model outcomes; rows are actual classes and columns predicted classes.</caption>
                          <thead><tr><th scope="col">Actual / Predicted</th><th scope="col">On time</th><th scope="col">Delayed</th></tr></thead>
                          <tbody><tr><th scope="row">On time</th><td>{matrix.tn} ({(100 * matrix.tn / (matrix.tn + matrix.fp)).toFixed(1)}%)</td><td>{matrix.fp} ({(100 * matrix.fp / (matrix.tn + matrix.fp)).toFixed(1)}%)</td></tr>
                          <tr><th scope="row">Delayed</th><td>{matrix.fn} ({(100 * matrix.fn / (matrix.fn + matrix.tp)).toFixed(1)}%)</td><td>{matrix.tp} ({(100 * matrix.tp / (matrix.fn + matrix.tp)).toFixed(1)}%)</td></tr></tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* 3. Crypto Simulator Panel */}
                  {selectedSimulator === 'crypto-prediction' && (
                    <div className="space-y-6">
                      <div className="text-left">
                        <h3 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-tight">
                          Crypto Historical Time-Series Direction Predictor
                        </h3>
                        <p className="max-w-[65ch] text-xs text-neutral-700 dark:text-neutral-200 font-mono mt-1 leading-relaxed">
                          Simulating trend directional labels with dynamic indicators.
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="grid grid-cols-2 gap-4 text-left py-4 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="space-y-2">
                          <p className="max-w-[65ch] text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider">
                            Crypto Asset
                          </p>
                          <div className="flex space-x-1.5">
                            {['BTC', 'ETH', 'SOL'].map((coin) => (
                              <button
                                key={coin}
                                aria-pressed={cryptoCoin === coin} onClick={() => setCryptoCoin(coin as any)}
                                className={`flex-1 py-1 text-xs font-bold font-mono uppercase rounded border transition-colors cursor-pointer ${
                                  cryptoCoin === coin
                                    ? 'bg-neutral-950 text-white border-neutral-850 dark:bg-white dark:text-neutral-900 dark:border-neutral-300 font-bold'
                                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:text-neutral-950 dark:bg-black dark:text-neutral-300 dark:border-neutral-850 dark:hover:text-white'
                                }`}
                              >
                                {coin}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="max-w-[65ch] text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200 block uppercase tracking-wider">
                            Indicator Overlay
                          </p>
                          <div className="flex space-x-1.5">
                            {['none', 'sma', 'macd'].map((ind) => (
                              <button
                                key={ind}
                                aria-pressed={cryptoIndicator === ind} onClick={() => setCryptoIndicator(ind as any)}
                                className={`flex-1 py-1 text-xs font-bold font-mono uppercase rounded border transition-colors cursor-pointer ${
                                  cryptoIndicator === ind
                                    ? 'bg-neutral-950 text-white border-neutral-850 dark:bg-white dark:text-neutral-900 dark:border-neutral-300 font-bold'
                                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:text-neutral-950 dark:bg-black dark:text-neutral-300 dark:border-neutral-850 dark:hover:text-white'
                                }`}
                              >
                                {ind}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Time series SVG rendering */}
                      <div className="h-44 relative overflow-hidden flex flex-col justify-center py-4 border-t border-neutral-200 dark:border-neutral-800">
                        <div className="absolute top-2 left-3 font-mono text-xs text-neutral-800 dark:text-neutral-200 flex space-x-3 font-bold">
                          <span>{cryptoCoin} Price Stream</span>
                          {cryptoIndicator !== 'none' && <span className="text-neutral-900 dark:text-white uppercase font-bold">// {cryptoIndicator} active</span>}
                        </div>

                        <svg role="img" aria-label="Illustrative cryptocurrency trend across ten samples; generated data, not market prices" viewBox="0 0 380 120" className="w-full h-full p-2 mt-4 select-none">
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

                      <div className="flex justify-between items-center text-xs font-mono text-neutral-700 dark:text-neutral-300 text-left font-bold">
                        <span>PREDICTED_SIGNAL: {getCryptoData()[getCryptoData().length - 1].isUp ? 'BUY/LONG [▲]' : 'SELL/SHORT [▼]'}</span>
                        <span>PRECISION_ACCURACY: 79.4%</span>
                      </div>
                    </div>
                  )}

                  {/* 4. Retail BI Dashboard Panel */}
                  {selectedSimulator === 'retail-bi-dashboard' && (
                    <div className="space-y-6">
                      <div className="text-left">
                        <h3 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-tight">
                          Corporate Interactive Sales KPI dashboard
                        </h3>
                        <p className="max-w-[65ch] text-xs text-neutral-700 dark:text-neutral-200 font-mono mt-1 leading-relaxed">
                          Simulating aggregated regional SQL dimensions into Power BI insights.
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center space-x-3 text-left py-4 border-t border-neutral-200 dark:border-neutral-800">
                        <span className="text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200 uppercase whitespace-nowrap tracking-wider">Filter Region:</span>
                        <div className="flex flex-1 space-x-1.5">
                          {[
                            { id: 'all', label: 'All Global' },
                            { id: 'eu', label: 'Europe' },
                            { id: 'na', label: 'N. America' },
                            { id: 'apac', label: 'APAC' },
                          ].map((reg) => (
                            <button
                              key={reg.id}
                              aria-pressed={biRegion === reg.id} onClick={() => setBiRegion(reg.id as any)}
                              className={`flex-1 py-1 text-xs font-bold font-mono rounded border transition-colors cursor-pointer ${
                                biRegion === reg.id
                                  ? 'bg-neutral-950 text-white border-neutral-850 dark:bg-white dark:text-neutral-900 dark:border-neutral-300 font-bold'
                                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:text-neutral-950 dark:bg-black dark:text-neutral-300 dark:border-neutral-850 dark:hover:text-white'
                              }`}
                            >
                              {reg.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mini Executive Dashboard */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="text-center py-4 border-t border-neutral-200 dark:border-neutral-800">
                          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase font-bold tracking-wider">Total Revenue</span>
                          <span className="text-xs sm:text-sm font-mono font-bold text-neutral-900 dark:text-white mt-1 block">
                            ${getBiMetrics().totalSales.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-center py-4 border-t border-neutral-200 dark:border-neutral-800">
                          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase font-bold tracking-wider">Profit Margin</span>
                          <span className="text-xs sm:text-sm font-mono font-bold text-emerald-700 dark:text-emerald-300 mt-1 block">
                            {getBiMetrics().margin}%
                          </span>
                        </div>
                        <div className="text-center py-4 border-t border-neutral-200 dark:border-neutral-800">
                          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase font-bold tracking-wider">Transactions</span>
                          <span className="text-xs sm:text-sm font-mono font-bold text-neutral-900 dark:text-white mt-1 block">
                            {getBiMetrics().transactions.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Interactive bar graph breakdown */}
                      <div className="space-y-3 text-left py-4 border-t border-neutral-200 dark:border-neutral-800">
                        <span className="text-xs font-bold font-mono text-neutral-700 dark:text-neutral-300 uppercase block text-center">Product Category Revenue Contribution</span>

                        <div className="space-y-2">
                          {[
                            { name: 'Apparel & Wearables', ratio: biRegion === 'eu' ? 40 : biRegion === 'na' ? 25 : 35 },
                            { name: 'Electronics & Devices', ratio: biRegion === 'na' ? 55 : biRegion === 'apac' ? 40 : biRegion === 'eu' ? 40 : 45 },
                            { name: 'Home & Kitchen Essentials', ratio: biRegion === 'apac' ? 25 : biRegion === 'eu' ? 20 : 20 },
                          ].map((cat, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-xs font-mono text-neutral-700 dark:text-neutral-300 font-semibold">
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
                        <h3 className="text-sm font-bold font-display text-neutral-900 dark:text-white uppercase tracking-tight">
                          Customer Spending Distribution Explorer
                        </h3>
                        <p className="max-w-[65ch] text-xs text-neutral-700 dark:text-neutral-200 font-mono mt-1 leading-relaxed">
                          Identifying purchasing clusters across segmented cohort groups.
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center space-x-3 text-left py-4 border-t border-neutral-200 dark:border-neutral-800">
                        <span className="text-xs font-bold font-mono text-neutral-800 dark:text-neutral-200 uppercase whitespace-nowrap tracking-wider">Cohort:</span>
                        <div className="flex flex-1 space-x-1.5">
                          {[
                            { id: 'all', label: 'All' },
                            { id: 'millennials', label: 'Millennials' },
                            { id: 'genz', label: 'Gen Z' },
                            { id: 'boomers', label: 'Boomers' },
                          ].map((seg) => (
                            <button
                              key={seg.id}
                              aria-pressed={customerSegment === seg.id} onClick={() => setCustomerSegment(seg.id as any)}
                              className={`flex-1 py-1 text-xs font-bold font-mono rounded border transition-colors cursor-pointer ${
                                customerSegment === seg.id
                                  ? 'bg-neutral-950 text-white border-neutral-850 dark:bg-white dark:text-neutral-900 dark:border-neutral-300 font-bold'
                                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:text-neutral-950 dark:bg-black dark:text-neutral-300 dark:border-neutral-850 dark:hover:text-white'
                              }`}
                            >
                              {seg.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantitative Insights */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="text-center py-4 border-t border-neutral-200 dark:border-neutral-800">
                          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase font-bold tracking-wider">Average Ticket</span>
                          <span className="text-sm font-mono font-bold text-neutral-900 dark:text-white mt-1 block">
                            ${getCustomerSegmentMetrics().averageTicket.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-center py-4 border-t border-neutral-200 dark:border-neutral-800">
                          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase font-bold tracking-wider">Monthly Freq.</span>
                          <span className="text-sm font-mono font-bold text-neutral-900 dark:text-white mt-1 block">
                            {getCustomerSegmentMetrics().purchaseFrequency.toFixed(1)} visits
                          </span>
                        </div>
                        <div className="text-center py-4 border-t border-neutral-200 dark:border-neutral-800">
                          <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block uppercase font-bold tracking-wider">Digital Incline</span>
                          <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-300 mt-1 block">
                            {getCustomerSegmentMetrics().onlineRatio}% Online
                          </span>
                        </div>
                      </div>

                      {/* Distribution Histogram Preview */}
                      <div className="space-y-3 text-left py-4 border-t border-neutral-200 dark:border-neutral-800">
                        <span className="text-xs font-bold font-mono text-neutral-700 dark:text-neutral-300 uppercase block text-center">Transaction Value Frequency (Histogram)</span>

                        <div className="h-40 flex items-end justify-between gap-1 pt-4 border-b border-neutral-200 dark:border-neutral-900">
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
                              <div key={idx} className="flex-1 min-w-0 h-full flex flex-col items-center justify-end">
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: Math.min(100, finalVal) }}
                                  data-testid="histogram-bar" aria-label={`Transaction value ${(idx + 1) * 15} dollars: relative frequency ${finalVal.toFixed(1)}`} className="w-4 shrink-0 bg-neutral-500 dark:bg-neutral-400 rounded-t hover:bg-neutral-800 dark:hover:bg-white transition-colors"
                                  transition={{ type: 'spring', stiffness: 100 }}
                                />
                                <span className="text-[10px] font-mono text-neutral-700 dark:text-neutral-300 font-semibold mt-1">${(idx + 1) * 15}</span>
                                <span className="sr-only">Relative frequency: {finalVal.toFixed(1)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedSimulator === 'interactive-data-platform' && <div className="space-y-5">
                    <h3 className="text-xl font-bold">Responsive interface example</h3>
                    <p>This portfolio uses React and TypeScript. Try changing the number of columns in this example. The controls change this layout; they do not measure browser performance.</p>
                    <label htmlFor="sim-control-5" className="block text-sm">Columns: {webColumns}</label>
                    <input id="sim-control-5" type="range" min="1" max="3" value={webColumns} onChange={event => setWebColumns(Number(event.target.value))}/>
                    <div className="grid gap-2" style={{gridTemplateColumns: 'repeat(' + webColumns + ', minmax(0, 1fr))'}}>
                      {['Python', 'SQL', 'React', 'TypeScript', 'Power BI', 'Data visualization'].map(item => <div key={item} className="p-3 bg-neutral-100 dark:bg-neutral-900 break-words">{item}</div>)}
                    </div>
                  </div>}

                  {(selectedSimulator === 'aircraft-analytics' || selectedSimulator === 'crypto-prediction') && <details className="mt-5">
                    <summary className="cursor-pointer py-3 font-semibold">View chart data and units</summary>
                    <p className="max-w-[65ch] text-sm mb-3">Horizontal values are sample positions; vertical values are arbitrary signal units, not physical altitude or currency prices.</p>
                    <div className="overflow-x-auto"><table className="w-full text-sm text-left"><caption className="sr-only">Generated chart values</caption>
                      <thead><tr><th scope="col">Sample</th><th scope="col">Signal</th><th scope="col">Reference / indicator</th></tr></thead>
                      <tbody>{(selectedSimulator === 'aircraft-analytics' ? getAircraftData().map(p => [p.x, p.noisyY, p.trueY]) : getCryptoData().map((p, i) => [i + 1, 160 - p.y, p.indicator])).map((row,i)=><tr key={i}>{row.map((value,j)=><td key={j}>{value.toFixed(1)}</td>)}</tr>)}</tbody>
                    </table></div>
                  </details>}
                  {/* Simulator footer */}
                  <div className="mt-6 border-t border-neutral-200 dark:border-neutral-900 pt-4 flex items-center justify-between text-xs font-mono text-neutral-700 dark:text-neutral-300 font-semibold text-left">
                    <span className="flex items-center space-x-1.5">
                      <RefreshCw className="w-3 h-3 text-neutral-900 dark:text-white" />
                      <span>Illustrative data</span>
                    </span>
                    <span>Hitesh K. R.</span>
                  </div>
                </motion.div>);
}
