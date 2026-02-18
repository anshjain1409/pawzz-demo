import React, { useState } from 'react';
import { RAW_DATA } from '../data/mockData';

const sources = [
  {
    name: 'Intern Research',
    icon: '📊',
    borderClass: 'accent-border-warm',
    btnBg: 'bg-accent-warm',
    example: 'Excel sheet with inconsistent phone formats, missing addresses',
    detail: 'Interns scrape Google Maps, JustDial, and local directories',
    bgTint: 'from-accent-warm/5 to-transparent',
  },
  {
    name: 'WhatsApp',
    icon: '💬',
    borderClass: 'accent-border-orange',
    btnBg: 'bg-accent-orange',
    example: 'Voice note: "New shelter, number 98765…"',
    detail: 'Community members send photos, voice notes, and text tips',
    bgTint: 'from-accent-orange/5 to-transparent',
  },
  {
    name: 'Community Form',
    icon: '📝',
    borderClass: 'accent-border-amber',
    btnBg: 'bg-accent-amber',
    example: 'Half-filled form: "near temple, no phone given"',
    detail: 'Public Google Form embedded on Pawzz website',
    bgTint: 'from-accent-amber/5 to-transparent',
  },
];

export default function DataSources({ onSimulate }) {
  const [simulating, setSimulating] = useState(null);
  const [viewingSource, setViewingSource] = useState(null);

  const handleSimulate = async (e, source) => {
    e.stopPropagation();
    setSimulating(source);
    await onSimulate(source);
    setTimeout(() => setSimulating(null), 600);
  };

  return (
    <section id="intake" className="animate-fade-in scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold text-brown-900">📥 Data Intake</h2>
        <span className="text-xs bg-brown-100 text-brown-500 px-3 py-1 rounded-full font-medium">3 Sources</span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sources.map((s) => (
          <div
            key={s.name}
            onClick={() => setViewingSource(s.name)}
            className={`card-elevated ${s.borderClass} p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group relative overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${s.bgTint} pointer-events-none`} />

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl group-hover:animate-float">{s.icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-orange bg-white px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">View Data</span>
              </div>

              <h3 className="text-xl font-bold mb-1 text-brown-900">{s.name}</h3>
              <p className="text-xs text-brown-400 mb-1">{s.detail}</p>
              <p className="text-sm text-brown-500 mb-5 italic">"{s.example}"</p>

              <button
                onClick={(e) => handleSimulate(e, s.name)}
                disabled={simulating === s.name}
                className={`${s.btnBg} text-white font-bold text-sm px-5 py-2.5 rounded-full 
                  hover:opacity-90 active:scale-95 transition-all duration-200 
                  disabled:opacity-50 disabled:cursor-wait w-full shadow-sm z-10 relative`}
              >
                {simulating === s.name ? '⏳ Simulating…' : '+ Simulate Entry'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Raw Data Modal */}
      {viewingSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setViewingSource(null)}>
          <div className="bg-white card-elevated p-6 max-w-2xl w-full mx-4 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 border-b border-brown-100 pb-4">
              <h3 className="text-xl font-bold text-brown-900">Raw Data: {viewingSource}</h3>
              <button onClick={() => setViewingSource(null)} className="text-brown-400 hover:text-brown-900">✕</button>
            </div>
            
            <div className="bg-brown-50 rounded-lg p-1 overflow-hidden">
               <table className="w-full text-sm text-left">
                 <thead className="bg-brown-100/50 text-brown-600 font-semibold uppercase text-xs">
                   <tr>
                     <th className="p-3">ID</th>
                     <th className="p-3">Raw Content</th>
                     <th className="p-3">Timestamp</th>
                   </tr>
                 </thead>
                 <tbody>
                   {RAW_DATA[viewingSource]?.map((row) => (
                     <tr key={row.id} className="border-b border-brown-100 last:border-0 hover:bg-white transition">
                       <td className="p-3 font-mono text-brown-400">#{row.id}</td>
                       <td className="p-3 text-brown-800">{row.text}</td>
                       <td className="p-3 text-brown-500 text-xs">{row.time}</td>
                     </tr>
                   ))}
                   {!RAW_DATA[viewingSource] && <tr><td colSpan="3" className="p-4 text-center text-brown-400">No data available</td></tr>}
                 </tbody>
               </table>
            </div>

            <div className="mt-6 flex justify-end">
               <button 
                  onClick={(e) => { handleSimulate(e, viewingSource); setViewingSource(null); }}
                  className="bg-accent-orange text-white px-6 py-2 rounded-full font-bold hover:opacity-90 transition shadow-sm"
               >
                 + Simulate New Entry
               </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
