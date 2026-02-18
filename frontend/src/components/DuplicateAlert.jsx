import React, { useState } from 'react';

export default function DuplicateAlert() {
  const [show, setShow] = useState(true);
  const [resolving, setResolving] = useState(false);

  if (!show) return null;

  const handleResolve = () => {
    setResolving(true);
    setTimeout(() => setShow(false), 600);
  };

  return (
    <section className="animate-slide-up">
      <div className="card-elevated p-6 relative overflow-hidden border-l-4 border-l-accent-amber">
        {/* Background emoji */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
          <div className="text-[120px] leading-none">⚠️</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-xl font-bold text-accent-amber">Potential Duplicate Detected</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-accent-amber/5 p-4 rounded-xl border border-accent-amber/20">
                <div className="text-xs text-brown-400 mb-1">Listing A</div>
                <div className="font-semibold text-brown-900">Dr. Mehta Clinic</div>
                <div className="text-sm text-brown-500">📞 9876543210</div>
                <div className="text-sm text-brown-500">📍 Shop 5, Shanti Nagar</div>
              </div>
              <div className="bg-accent-amber/5 p-4 rounded-xl border border-accent-amber/20">
                <div className="text-xs text-brown-400 mb-1">Listing B</div>
                <div className="font-semibold text-brown-900">Dr. Mehta Veterinary</div>
                <div className="text-sm text-brown-500">📞 9876501234</div>
                <div className="text-sm text-brown-500">📍 Shop 7, Shanti Nagar</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-brown-500">
              <span className="bg-accent-amber/15 text-accent-amber text-xs px-2 py-0.5 rounded-full font-bold">50m apart</span>
              <span>Same owner name · Similar phone · Proximity match</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 min-w-[140px]">
            <button
              onClick={handleResolve}
              disabled={resolving}
              className="bg-accent-amber text-white font-bold px-4 py-2.5 rounded-full text-sm hover:opacity-90 transition shadow-sm disabled:opacity-50"
            >
              {resolving ? 'Resolving…' : '🔗 Merge'}
            </button>
            <button
              onClick={handleResolve}
              disabled={resolving}
              className="bg-brown-100 text-brown-600 px-4 py-2.5 rounded-full text-sm hover:bg-brown-200 transition disabled:opacity-50"
            >
              Keep Both
            </button>
            <button
              onClick={() => setShow(false)}
              className="text-brown-300 text-xs hover:text-brown-500 transition"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
