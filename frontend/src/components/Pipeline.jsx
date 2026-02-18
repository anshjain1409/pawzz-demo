import React from 'react';

const stages = [
  { name: 'Submitted', emoji: '📨', color: '#8D6E63' },
  { name: 'Needs Fix', emoji: '🔧', color: '#E53935' },
  { name: 'Ready', emoji: '✅', color: '#1E88E5' },
  { name: 'Verified', emoji: '🛡️', color: '#4CAF50' },
  { name: 'Published', emoji: '🚀', color: '#E8793A' },
];

export default function Pipeline({ listings, onSelectListing }) {
  const getCounts = (stage) => listings.filter(l => l.status === stage).length;
  const total = listings.length || 1;

  return (
    <section className="animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold text-brown-900">⚡ Pipeline</h2>
        <span className="text-xs bg-brown-100 text-brown-500 px-3 py-1 rounded-full font-medium">{listings.length} total</span>
      </div>

      {/* Funnel bar */}
      <div className="card-elevated p-6 mb-8">
        <div className="flex items-end gap-3 mb-4" style={{ height: '80px' }}>
          {stages.map((stage) => {
            const count = getCounts(stage.name);
            const pct = Math.max((count / total) * 100, 8);
            return (
              <div key={stage.name} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-2xl font-mono font-bold" style={{ color: stage.color }}>
                  {count}
                </span>
                <div
                  className="w-full rounded-t-lg transition-all duration-700"
                  style={{
                    height: `${pct}%`,
                    backgroundColor: stage.color,
                    opacity: 0.8,
                    minHeight: '6px',
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          {stages.map((stage, i) => (
            <div key={stage.name} className="flex-1 flex items-center justify-center gap-1">
              <span className="text-sm">{stage.emoji}</span>
              <span className="text-xs text-brown-600 font-medium">{stage.name}</span>
              {i < stages.length - 1 && (
                <span className="text-brown-300 ml-2">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => {
          const stageListings = listings.filter(l => l.status === stage.name);
          return (
            <div key={stage.name} className="card p-4 min-h-[200px]">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-brown-100">
                <span>{stage.emoji}</span>
                <h3 className="text-sm font-semibold text-brown-700">{stage.name}</h3>
                <span
                  className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: stage.color + '15', color: stage.color }}
                >
                  {stageListings.length}
                </span>
              </div>

              <div className="space-y-2">
                {stageListings.slice(0, 3).map(l => (
                  <div
                    key={l.id}
                    onClick={() => onSelectListing(l)}
                    className="bg-brown-50 p-3 rounded-lg cursor-pointer hover:bg-brown-100 transition-colors group border border-transparent hover:border-brown-200"
                  >
                    <div className="text-sm font-medium text-brown-800 group-hover:text-brown-900 truncate">
                      {l.name}
                    </div>
                    <div className="text-[11px] text-brown-400 mt-0.5">{l.phone}</div>
                    {l.category && (
                      <span className="inline-block text-[10px] bg-brown-200/60 text-brown-500 px-2 py-0.5 rounded-full mt-1">
                        {l.category}
                      </span>
                    )}
                  </div>
                ))}
                {stageListings.length > 3 && (
                  <div className="text-xs text-brown-400 text-center pt-1">
                    +{stageListings.length - 3} more
                  </div>
                )}
                {stageListings.length === 0 && (
                  <div className="text-xs text-brown-300 text-center py-6">Empty</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
