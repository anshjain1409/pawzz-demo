import React, { useState } from 'react';

const checkItems = [
  { key: 'phone', label: 'Call and confirm phone number', icon: '📞' },
  { key: 'address', label: 'Address matches on Google Maps', icon: '📍' },
  { key: 'license', label: 'License number valid (or waived)', icon: '🪪' },
  { key: 'online', label: 'Online presence verified', icon: '🌐' },
];

export default function VerificationModal({ listing, onClose, onVerify }) {
  const [checks, setChecks] = useState({
    phone: false,
    address: false,
    license: false,
    online: false,
  });
  const [verifying, setVerifying] = useState(false);

  const allChecked = Object.values(checks).every(Boolean);
  const checkedCount = Object.values(checks).filter(Boolean).length;

  const handleVerify = () => {
    if (!allChecked) return;
    setVerifying(true);
    setTimeout(() => {
      onVerify(listing.id, {
        status: 'Verified',
        verifiedBy: 'demo@verifier',
        verifiedAt: new Date().toISOString(),
      });
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ backgroundColor: 'rgba(62, 39, 35, 0.4)', backdropFilter: 'blur(8px)' }}
    >
      <div className="card-elevated accent-border-orange p-8 max-w-lg w-full mx-4 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-accent-orange font-semibold">Verification</span>
            <h2 className="text-2xl font-bold text-brown-900 mt-1">{listing.name}</h2>
            <div className="flex gap-3 mt-2 text-xs text-brown-400">
              <span>{listing.phone}</span>
              <span>•</span>
              <span>{listing.category}</span>
              {listing.address && <><span>•</span><span>{listing.address}</span></>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-brown-300 hover:text-brown-600 text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-brown-400 mb-2">
            <span>Checklist Progress</span>
            <span>{checkedCount}/4</span>
          </div>
          <div className="h-2 bg-brown-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-green rounded-full transition-all duration-500"
              style={{ width: `${(checkedCount / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3 mb-8">
          {checkItems.map(item => (
            <label
              key={item.key}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                checks[item.key]
                  ? 'bg-accent-green/5 border-accent-green/30'
                  : 'bg-brown-50 border-brown-100 hover:border-brown-200'
              }`}
            >
              <input
                type="checkbox"
                checked={checks[item.key]}
                onChange={(e) => setChecks({ ...checks, [item.key]: e.target.checked })}
              />
              <span className="text-lg">{item.icon}</span>
              <span className={`text-sm ${checks[item.key] ? 'text-accent-green font-medium' : 'text-brown-600'}`}>
                {item.label}
              </span>
              {checks[item.key] && <span className="ml-auto text-accent-green text-xs font-semibold">✓ Done</span>}
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleVerify}
            disabled={!allChecked || verifying}
            className="flex-1 bg-accent-green text-white font-bold py-3 rounded-full 
              disabled:opacity-30 disabled:cursor-not-allowed
              hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            {verifying ? '⏳ Verifying…' : '🛡️ Confirm Verify'}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-brown-100 text-brown-500 rounded-full hover:bg-brown-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
