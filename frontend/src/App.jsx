import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import DemoWorkflow from './components/DemoWorkflow';
import DataSources from './components/DataSources';
import Pipeline from './components/Pipeline';
import VerificationModal from './components/VerificationModal';
import RedFlags from './components/RedFlags';
import DuplicateAlert from './components/DuplicateAlert';
import Dashboard from './components/Dashboard';
import UserJourney from './components/UserJourney';

function App() {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchListings = useCallback(() => {
    fetch('/api/listings')
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch listings:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleSimulate = (source) => {
    return fetch('/api/incoming', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source })
    })
      .then(res => res.json())
      .then(() => fetchListings());
  };

  const handleVerify = (id, updates) => {
    fetch(`/api/listings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
      .then(res => res.json())
      .then(updated => {
        setListings(prev => prev.map(l => l.id === id ? updated : l));
        setShowVerification(false);
        setSelectedListing(null);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-accent-orange text-2xl font-semibold animate-pulse">Loading Pawzz Pipeline…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-brown-900 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-20">
        
        {/* 1. Demo Workflow Explainer */}
        <DemoWorkflow />

        {/* 2. User Journey (Top priority) */}
        <UserJourney />

        {/* 3. Data Intake */}
        <DataSources onSimulate={handleSimulate} />

        {/* 4. Pipeline */}
        <section id="pipeline" className="scroll-mt-24">
          <Pipeline
            listings={listings}
            onSelectListing={(l) => {
              setSelectedListing(l);
              setShowVerification(true);
            }}
          />
        </section>

        {/* 5. Red Flags */}
        <RedFlags />

        {/* 6. Duplicate Alert */}
        <DuplicateAlert />

        {/* 7. Dashboard */}
        <Dashboard listings={listings} />
      </main>

      {/* Footer */}
      <footer className="border-t border-brown-200 mt-20 py-6 text-center text-xs text-brown-400">
        Pawzz Data Pipeline Demo — Built with 🐾 — Feb 2026
      </footer>

      {showVerification && selectedListing && (
        <VerificationModal
          listing={selectedListing}
          onClose={() => {
            setShowVerification(false);
            setSelectedListing(null);
          }}
          onVerify={handleVerify}
        />
      )}
    </div>
  );
}

export default App;
