import React from 'react';

export default function Header() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative overflow-hidden bg-white border-b border-brown-200 sticky top-0 z-50 shadow-sm">
      {/* Warm gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/5 via-accent-amber/5 to-accent-warm/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-orange to-accent-warm flex items-center justify-center text-xl shadow-sm text-white">
            🐾
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-brown-900 leading-none">
              Pawzz
            </h1>
            <p className="text-[10px] text-brown-400 font-medium tracking-wide">
              DATA PIPELINE
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-brown-50/80 p-1 rounded-full border border-brown-100 backdrop-blur-sm">
          {[
            { label: 'Journey', id: 'journey' },
            { label: 'Intake', id: 'intake' },
            { label: 'Pipeline', id: 'pipeline' },
            { label: 'Red Flags', id: 'redflags' },
            { label: 'Dashboard', id: 'dashboard' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-brown-600 hover:bg-white hover:text-accent-orange hover:shadow-sm transition-all"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            <span className="text-[10px] text-green-700 font-bold tracking-wide uppercase">Live System</span>
          </div>
        </div>
      </div>
    </header>
  );
}
