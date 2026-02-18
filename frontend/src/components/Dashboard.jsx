import React, { useState } from 'react';
import { FIX_QUEUE } from '../data/mockData';

function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 120;
  const height = 32;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="mt-2">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Dashboard({ listings }) {
  const [showFixQueue, setShowFixQueue] = useState(false);
  const [activeFix, setActiveFix] = useState(null);

  const verified = listings.filter(l => l.status === 'Verified').length;
  const published = listings.filter(l => l.status === 'Published').length;
  const needsFix = listings.filter(l => l.status === 'Needs Fix').length;
  const submitted = listings.filter(l => l.status === 'Submitted').length;
  const total = listings.length;

  const kpis = [
    { label: 'Total Listings', value: total, color: '#6D4C41', sparkData: [3, 5, 4, 7, 6, 8, total], change: '+12%', type: null },
    { label: 'Throughput (24h)', value: 24, color: '#E8793A', sparkData: [12, 18, 14, 20, 16, 22, 24], change: '+8%', type: null },
    { label: 'Verified', value: verified, color: '#4CAF50', sparkData: [0, 1, 1, 2, 1, 2, verified], change: null, type: null },
    { label: 'Published', value: published, color: '#F5A623', sparkData: [0, 0, 1, 1, 2, 1, published], change: null, type: null },
    { label: 'Needs Fix', value: needsFix, color: '#E53935', sparkData: [3, 4, 2, 3, 5, 3, needsFix], change: needsFix > 2 ? '⚠️ High' : null, type: 'fix' },
    { label: 'New Submissions', value: submitted, color: '#1E88E5', sparkData: [1, 0, 2, 1, 3, 1, submitted], change: null, type: null },
  ];

  const verifyRate = total > 0 ? Math.round(((verified + published) / total) * 100) : 0;

  const handleFixResolve = (id) => {
    setActiveFix(id);
    setTimeout(() => {
      // In a real app, this would update backend. Here we just close it mockingly.
      setActiveFix(null);
      setShowFixQueue(false);
    }, 800);
  };

  return (
    <section id="dashboard" className="animate-fade-in scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold text-brown-900">📊 Live Dashboard</h2>
        <span className="text-xs bg-accent-orange/10 text-accent-orange px-3 py-1 rounded-full font-semibold">
          Real-time
        </span>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {kpis.map(kpi => (
          <div 
            key={kpi.label} 
            className={`card p-4 transition-all ${kpi.type === 'fix' ? 'cursor-pointer hover:shadow-md hover:border-accent-red/30' : ''}`}
            onClick={() => kpi.type === 'fix' && setShowFixQueue(true)}
          >
            <div className="text-[11px] text-brown-400 uppercase tracking-wider font-medium mb-1 flex justify-between">
              {kpi.label}
              {kpi.type === 'fix' && <span className="text-[10px] text-accent-red/80 font-bold">FIX ↗</span>}
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold font-mono" style={{ color: kpi.color }}>
                {kpi.value}
              </span>
              {kpi.change && (
                <span className="text-[10px] text-brown-400 mb-1">{kpi.change}</span>
              )}
            </div>
            <Sparkline data={kpi.sparkData} color={kpi.color} />
          </div>
        ))}
      </div>

      {/* Verification Rate Bar */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-brown-600 font-medium">Overall Verification Rate</span>
          <span className="text-xl font-bold text-accent-green">{verifyRate}%</span>
        </div>
        <div className="h-3 bg-brown-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${verifyRate}%`,
              background: 'linear-gradient(90deg, #E8793A, #4CAF50)',
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-brown-300">
          <span>0%</span>
          <span>Target: 80%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Fix Queue Modal */}
      {showFixQueue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowFixQueue(false)}>
          <div className="bg-white card-elevated p-6 max-w-lg w-full mx-4 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-4 border-b border-brown-100 pb-4">
               <h3 className="text-xl font-bold text-brown-900">Items Needing Fix</h3>
               <button onClick={() => setShowFixQueue(false)} className="text-brown-400 hover:text-brown-900">✕</button>
             </div>

             <div className="space-y-3 mb-6">
               {FIX_QUEUE.map(item => (
                 <div key={item.id} className="p-4 rounded-lg bg-brown-50 border border-brown-100 flex items-center justify-between">
                   <div>
                     <div className="font-bold text-brown-900">{item.name}</div>
                     <div className="text-xs text-accent-red font-semibold">{item.issue}</div>
                     <div className="text-xs text-brown-500">{item.data}</div>
                   </div>
                   <button 
                     onClick={() => handleFixResolve(item.id)}
                     disabled={activeFix === item.id}
                     className="bg-accent-blue text-white text-xs px-4 py-2 rounded-full font-bold hover:bg-opacity-90 shadow-sm"
                   >
                     {activeFix === item.id ? 'Fixing...' : 'Fix Now'}
                   </button>
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}
    </section>
  );
}
