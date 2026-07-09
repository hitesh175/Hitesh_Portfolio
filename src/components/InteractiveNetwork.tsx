/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus, Info, Sparkles } from 'lucide-react';

interface Node {
  id: string;
  layer: 'input' | 'hidden' | 'output';
  x: number;
  y: number;
  label: string;
  tooltip: string;
}

interface Connection {
  from: string;
  to: string;
  weight: number;
}

export default function InteractiveNetwork() {
  const [isTraining, setIsTraining] = useState(false);
  const [epochs, setEpochs] = useState(1024);
  const [accuracy, setAccuracy] = useState(98.42);
  const [loss, setLoss] = useState(0.0158);
  const [hiddenNodeCount, setHiddenNodeCount] = useState(4);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [lossHistory, setLossHistory] = useState<number[]>([0.85, 0.72, 0.61, 0.48, 0.35, 0.24, 0.18, 0.12, 0.08, 0.05, 0.03, 0.0158]);
  const [excitedConnections, setExcitedConnections] = useState<string[]>([]);
  
  const trainingInterval = useRef<NodeJS.Timeout | null>(null);

  // Define static input and output nodes
  const inputNodes: Node[] = [
    { id: 'in-1', layer: 'input', x: 50, y: 50, label: 'X1: Data', tooltip: 'Raw Ingested Data Stream' },
    { id: 'in-2', layer: 'input', x: 50, y: 120, label: 'X2: Feature', tooltip: 'Engineered Feature Vectors' },
    { id: 'in-3', layer: 'input', x: 50, y: 190, label: 'X3: Query', tooltip: 'SQL and Vector database indices' },
  ];

  const outputNodes: Node[] = [
    { id: 'out-1', layer: 'output', x: 310, y: 80, label: 'Ŷ1: Predict', tooltip: 'Target Classification / Delay Forecast' },
    { id: 'out-2', layer: 'output', x: 310, y: 160, label: 'Ŷ2: Optimization', tooltip: 'Decision Automation / Insights Output' },
  ];

  // Dynamically generate hidden layer nodes based on hiddenNodeCount
  const getHiddenNodes = (): Node[] => {
    const nodes: Node[] = [];
    const startY = 30;
    const gapY = 200 / (hiddenNodeCount - 1 || 1);
    
    for (let i = 0; i < hiddenNodeCount; i++) {
      const y = hiddenNodeCount === 1 ? 120 : startY + i * gapY;
      nodes.push({
        id: `hid-${i}`,
        layer: 'hidden',
        x: 180,
        y: y,
        label: `H${i + 1}`,
        tooltip: `Latent Activation Layer: Node #${i + 1} computing complex interactions`
      });
    }
    return nodes;
  };

  const hiddenNodes = getHiddenNodes();
  const allNodes = [...inputNodes, ...hiddenNodes, ...outputNodes];

  // Generate all forward connections
  const getConnections = (): Connection[] => {
    const conns: Connection[] = [];
    // Input -> Hidden
    inputNodes.forEach((inNode) => {
      hiddenNodes.forEach((hidNode, idx) => {
        // Pseudo weight based on indices
        const weight = Math.sin(idx + inNode.y) * 0.5 + 0.5;
        conns.push({ from: inNode.id, to: hidNode.id, weight });
      });
    });
    // Hidden -> Output
    hiddenNodes.forEach((hidNode, idx) => {
      outputNodes.forEach((outNode, oIdx) => {
        const weight = Math.cos(idx + outNode.y) * 0.5 + 0.5;
        conns.push({ from: hidNode.id, to: outNode.id, weight });
      });
    });
    return conns;
  };

  const connections = getConnections();

  // Training Simulation Loop
  useEffect(() => {
    if (isTraining) {
      trainingInterval.current = setInterval(() => {
        setEpochs((prev) => prev + 1);
        
        // Loss ticks down wobbly, accuracy crawls up
        setLoss((prev) => {
          const delta = (Math.random() * 0.002 - 0.0008);
          const next = Math.max(0.001, prev - delta);
          
          // Keep loss history updated for line plot (max 15 points)
          setLossHistory((history) => {
            const updated = [...history.slice(-14), next];
            return updated;
          });
          
          return next;
        });

        setAccuracy((prev) => {
          const delta = (Math.random() * 0.05 - 0.015);
          return Math.min(99.98, prev + delta);
        });

        // Pick random connections to "excite" or flash
        const randConns = Array.from({ length: 3 }, () => {
          const idx = Math.floor(Math.random() * connections.length);
          return connections[idx] ? `${connections[idx].from}-${connections[idx].to}` : '';
        }).filter(Boolean);
        setExcitedConnections(randConns);

      }, 150);
    } else {
      if (trainingInterval.current) {
        clearInterval(trainingInterval.current);
      }
    }

    return () => {
      if (trainingInterval.current) {
        clearInterval(trainingInterval.current);
      }
    };
  }, [isTraining, connections.length]);

  const handleReset = () => {
    setIsTraining(false);
    setEpochs(1024);
    setAccuracy(98.42);
    setLoss(0.0158);
    setLossHistory([0.85, 0.72, 0.61, 0.48, 0.35, 0.24, 0.18, 0.12, 0.08, 0.05, 0.03, 0.0158]);
    setExcitedConnections([]);
  };

  const addHiddenNode = () => {
    if (hiddenNodeCount < 6) {
      setHiddenNodeCount((prev) => prev + 1);
    }
  };

  const removeHiddenNode = () => {
    if (hiddenNodeCount > 1) {
      setHiddenNodeCount((prev) => prev - 1);
    }
  };

  // Create SVG path string for loss curve
  const getLossCurvePath = (): string => {
    if (lossHistory.length < 2) return '';
    const width = 80;
    const height = 30;
    const padding = 2;
    const points = lossHistory.map((val, idx) => {
      const x = padding + (idx / (lossHistory.length - 1)) * (width - 2 * padding);
      // Map loss (0 to 1) inversely to height (height - padding is lowest loss, padding is highest loss)
      const y = height - padding - (val * (height - 2 * padding));
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="flex flex-col space-y-4 h-full flex-1">
      
      {/* Network Architecture Canvas */}
      <div className="relative bg-neutral-950 rounded overflow-hidden border border-neutral-900 p-2 h-56 flex items-center justify-center group">
        
        {/* SVG Drawing Canvas */}
        <svg 
          viewBox="0 0 360 240" 
          className="w-full h-full z-10 select-none"
        >
          {/* Defs for animations & gradients */}
          <defs>
            <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="edge-grad-active" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Draw Connection Edges */}
          {connections.map((conn, idx) => {
            const fromNode = allNodes.find((n) => n.id === conn.from);
            const toNode = allNodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const connId = `${conn.from}-${conn.to}`;
            const isExcited = excitedConnections.includes(connId) || isTraining;

            return (
              <g key={idx}>
                {/* Background edge */}
                <path
                  d={`M ${fromNode.x} ${fromNode.y} C ${(fromNode.x + toNode.x)/2} ${fromNode.y}, ${(fromNode.x + toNode.x)/2} ${toNode.y}, ${toNode.x} ${toNode.y}`}
                  fill="none"
                  stroke="url(#edge-grad)"
                  strokeWidth={conn.weight * 1.5}
                  className="transition-all duration-300"
                />
                
                {/* Active signal flowing layer */}
                <path
                  d={`M ${fromNode.x} ${fromNode.y} C ${(fromNode.x + toNode.x)/2} ${fromNode.y}, ${(fromNode.x + toNode.x)/2} ${toNode.y}, ${toNode.x} ${toNode.y}`}
                  fill="none"
                  stroke={isExcited ? '#ffffff' : 'none'}
                  strokeWidth={conn.weight * 2}
                  strokeDasharray="6 10"
                  strokeDashoffset={isTraining ? epochs * 4 % 100 : 0}
                  className={isTraining ? 'opacity-80 transition-all' : 'opacity-0'}
                  style={{ animation: isTraining ? 'flow 2s linear infinite' : 'none' }}
                />
              </g>
            );
          })}

          {/* Draw Neurons */}
          {allNodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            let fillClass = "fill-neutral-900 stroke-neutral-700";
            let glowColor = "rgba(255,255,255,0.05)";

            if (node.layer === 'input') {
              fillClass = "fill-neutral-900 stroke-neutral-400";
              glowColor = "rgba(255,255,255,0.1)";
            } else if (node.layer === 'hidden') {
              fillClass = "fill-neutral-900 stroke-neutral-600";
              glowColor = "rgba(115,115,115,0.1)";
            } else {
              fillClass = "fill-neutral-900 stroke-white";
              glowColor = "rgba(255,255,255,0.15)";
            }

            return (
              <g 
                key={node.id}
                className="cursor-help transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Shadow/Glow ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? 12 : 8}
                  fill={glowColor}
                  className="transition-all duration-200"
                />
                {/* Core neuron circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHovered ? 8 : 6}
                  className={`${fillClass} stroke-1.5 transition-all duration-200`}
                />
                
                {/* Minimal label annotations inside canvas */}
                {node.layer !== 'hidden' && (
                  <text
                    x={node.layer === 'input' ? node.x - 10 : node.x + 10}
                    y={node.y + 3}
                    textAnchor={node.layer === 'input' ? 'end' : 'start'}
                    className="font-mono text-[7px] font-bold fill-neutral-400"
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* HUD overlay labels */}
        <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded border border-neutral-900 text-[8px] font-mono text-neutral-400 font-bold tracking-wider select-none">
          MODEL_TYPE // MLP_REGRESSOR
        </div>
        <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded border border-neutral-900 text-[8px] font-mono text-neutral-400 font-bold tracking-wider select-none">
          EPOCH_RUNNING: {epochs}
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded border border-neutral-900 text-[8px] font-mono text-white font-bold select-none">
          ACC: {accuracy.toFixed(2)}%
        </div>

        {/* Scanning beam line */}
        {isTraining && (
          <div className="absolute top-0 left-0 w-full h-0.5 bg-white/25 animate-bounce pointer-events-none" />
        )}

        {/* Interactive hover tooltip inside card */}
        {hoveredNode && (
          <div className="absolute bottom-2 left-2 right-2 bg-neutral-950 border border-neutral-900 p-2 rounded text-left text-[10px] text-neutral-200 z-30 font-bold flex gap-1.5 animate-fadeIn leading-tight shadow-sm">
            <Info className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-white uppercase tracking-wide block text-[8px] font-mono">// {hoveredNode.label} ({hoveredNode.layer.toUpperCase()})</span>
              <span>{hoveredNode.tooltip}</span>
            </div>
          </div>
        )}
      </div>

      {/* Simulator Control Board */}
      <div className="bg-neutral-950 p-3 rounded border border-neutral-900 space-y-3">
        
        {/* Core Stats Row & Real-time curve */}
        <div className="grid grid-cols-12 gap-3 items-center">
          
          {/* Stats details */}
          <div className="col-span-6 text-left space-y-1 font-bold text-xs">
            <div className="flex justify-between border-b border-dashed border-neutral-900 pb-0.5">
              <span className="text-neutral-500 font-mono text-[10px]">LOSS RATIO:</span>
              <span className="text-white font-mono text-[11px]">{loss.toFixed(4)}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-neutral-500 font-mono text-[10px]">ACCURACY:</span>
              <span className="text-white font-mono text-[11px]">{accuracy.toFixed(2)}%</span>
            </div>
          </div>

          {/* Micro Loss Chart Curve */}
          <div className="col-span-6 flex flex-col items-center justify-center p-1.5 bg-black border border-neutral-900 rounded relative h-10 overflow-hidden">
            <svg viewBox="0 0 80 30" className="w-full h-full">
              <path
                d={getLossCurvePath()}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute top-0.5 right-1.5 text-[6px] font-mono font-bold text-neutral-500 tracking-wider">LOSS CURVE</span>
          </div>

        </div>

        {/* Buttons Controls Panel */}
        <div className="flex items-center justify-between gap-2 pt-1">
          
          {/* Node Add/Remove controls */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-tight block font-mono">// Nodes:</span>
            <button
              id="btn-remove-node"
              onClick={removeHiddenNode}
              disabled={hiddenNodeCount <= 1}
              className="p-1.5 bg-black border border-neutral-900 rounded text-white hover:bg-neutral-900 disabled:opacity-45 transition-all cursor-pointer shadow-sm"
              title="Remove Hidden Node"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-xs font-bold text-white bg-black border border-neutral-900 px-2 py-0.5 rounded">
              {hiddenNodeCount}
            </span>
            <button
              id="btn-add-node"
              onClick={addHiddenNode}
              disabled={hiddenNodeCount >= 6}
              className="p-1.5 bg-black border border-neutral-900 rounded text-white hover:bg-neutral-900 disabled:opacity-45 transition-all cursor-pointer shadow-sm"
              title="Add Hidden Node"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simulation run/pause/reset */}
          <div className="flex items-center space-x-1.5">
            {/* Play/Pause CTA */}
            <button
              id="btn-simulation-play"
              onClick={() => setIsTraining(!isTraining)}
              className={`px-3 py-1.5 flex items-center space-x-1 border rounded text-xs font-mono font-bold shadow-sm transition-all cursor-pointer ${
                isTraining 
                  ? 'bg-neutral-900 border-neutral-800 text-white' 
                  : 'bg-white hover:bg-neutral-200 text-black border-neutral-200'
              }`}
            >
              {isTraining ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isTraining ? 'Pause' : 'Train'}</span>
            </button>

            {/* Reset CTA */}
            <button
              id="btn-simulation-reset"
              onClick={handleReset}
              className="p-1.5 bg-black border border-neutral-900 text-white hover:bg-neutral-900 rounded cursor-pointer shadow-sm"
              title="Reset Simulator"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
