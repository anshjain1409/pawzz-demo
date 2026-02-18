import React, { useState } from 'react';
import { RED_FLAGS_DATA } from '../data/mockData';

const flags = [
  { icon: '📞', text: 'Phone <10 or >12 digits', description: 'Auto-flagged by regex validation', type: 'phone' },
  { icon: '📍', text: 'Geocoding fails', description: 'Address doesn\'t resolve on Maps API', type: 'location' },
  { icon: '🌐', text: 'No online footprint', description: 'Zero results on Google / JustDial', type: null },
  { icon: '🖼️', text: 'Stock photo detected', description: 'Reverse image search finds matches', type: null },
  { icon: '🔄', text: 'Same phone, different names', description: 'Possible duplicate or fraud', type: null },
  { icon: '⏰', text: 'Stale listing (>90 days)', description: 'No revalidation in 3 months', type: null },
];

export default function RedFlags() {
  const [selectedFlag, setSelectedFlag] = useState(null);

  const handleFlagClick = (flag) => {
    if (flag.type && RED_FLAGS_DATA[flag.type]) {
      setSelectedFlag(flag);
    }
  };

  return (
    <section id="redflags" className="animate-fade-in scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold text-brown-900">🚩 Red Flags</h2>
        <span className="text-xs bg-accent-red/10 text-accent-red px-3 py-1 rounded-full font-semibold">
          {flags.length} rules
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {flags.map((f, i) => (
          <div
            key={f.text}
            onClick={() => handleFlagClick(f)}
            className={`card p-5 border-l-4 border-l-accent-red/60 animate-pulse-slow group hover:animate-none hover:shadow-md transition-all ${
              f.type ? 'cursor-pointer hover:bg-red-50' : 'cursor-default'
            }`}
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{f.icon}</span>
              <span className="font-semibold text-brown-800">{f.text}</span>
            </div>
            <p className="text-xs text-brown-400 pl-12 mb-2">{f.description}</p>
            {f.type && (
               <div className="pl-12 text-[10px] text-accent-red font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                 Click to view faulty records →
               </div>
            )}
          </div>
        ))}
      </div>

      {/* Flag Details Modal */}
      {selectedFlag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brown-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedFlag(null)}>
          <div className="bg-white card-elevated p-6 max-w-2xl w-full mx-4 shadow-2xl animate-slide-up" onClick={e => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-4 border-b border-brown-100 pb-4">
               <div className="flex items-center gap-3">
                 <span className="text-3xl">{selectedFlag.icon}</span>
                 <h3 className="text-xl font-bold text-brown-900">Detected Issues: {selectedFlag.text}</h3>
               </div>
               <button onClick={() => setSelectedFlag(null)} className="text-brown-400 hover:text-brown-900">✕</button>
             </div>

             <div className="bg-red-50 rounded-lg p-1 overflow-hidden border border-red-100">
               <table className="w-full text-sm text-left">
                 <thead className="bg-red-100/50 text-red-800 font-semibold uppercase text-xs">
                   <tr>
                     <th className="p-3">ID</th>
                     <th className="p-3">Faulty Value</th>
                     <th className="p-3">Issue Detail</th>
                     <th className="p-3">Source</th>
                   </tr>
                 </thead>
                 <tbody>
                   {RED_FLAGS_DATA[selectedFlag.type]?.map((row) => (
                     <tr key={row.id} className="border-b border-red-100 last:border-0 hover:bg-white transition">
                       <td className="p-3 font-mono text-red-400">#{row.id}</td>
                       <td className="p-3 font-mono text-brown-900 bg-red-100/30 rounded">{row.value}</td>
                       <td className="p-3 text-red-600 font-medium">{row.issue}</td>
                        <td className="p-3 text-brown-500 text-xs">{row.source}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
             
             <div className="mt-6 text-center text-xs text-brown-400">
               System automatically continuously monitors incoming data stream for these patterns.
             </div>
          </div>
        </div>
      )}
    </section>
  );
}
