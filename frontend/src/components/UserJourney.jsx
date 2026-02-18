import React, { useState, useEffect, useRef } from 'react';

const steps = [
  {
    id: 1,
    title: 'Submission',
    emoji: '💬',
    text: 'Priya sends a WhatsApp message: "New vet Dr. Mehta, 9876543210" with a photo of the clinic signboard.',
    detail: 'OCR extracts text from the image. NLP parses name & phone number.',
    status: 'Submitted',
  },
  {
    id: 2,
    title: 'Intake & Parse',
    emoji: '🔍',
    text: 'System creates a listing: name ✅, phone ✅, address ❌ missing. Status automatically set to "Needs Fix".',
    detail: 'Red flag: no address means geocoding will fail. Listing enters the fix queue.',
    status: 'Needs Fix',
  },
  {
    id: 3,
    title: 'Data Fix',
    emoji: '🔧',
    text: 'Intern searches Google Maps, finds "Dr. Mehta Clinic, Shop 5, Shanti Nagar". Address added. Status: Ready.',
    detail: 'Geocoding succeeds. Coordinates stored. Duplicate check runs — no match found.',
    status: 'Ready',
  },
  {
    id: 4,
    title: 'Verification',
    emoji: '🛡️',
    text: 'Verifier calls +919876543210, confirms it\'s Dr. Mehta. Checks Google Maps street view. All 4 checklist items pass.',
    detail: 'Verification timestamp and verifier ID recorded for audit trail.',
    status: 'Verified',
  },
  {
    id: 5,
    title: 'Published!',
    emoji: '🚀',
    text: 'Listing goes live on Pawzz with a "Phone-Verified" badge. Pet parents in Shanti Nagar can now find Dr. Mehta.',
    detail: 'Listing appears in search results. Re-verification scheduled in 90 days.',
    status: 'Published',
  },
];

const statusColors = {
  'Submitted': '#8D6E63',
  'Needs Fix': '#E53935',
  'Ready': '#1E88E5',
  'Verified': '#4CAF50',
  'Published': '#E8793A',
};

export default function UserJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const step = steps[currentStep];

  useEffect(() => {
    if (isPlaying) {
      // Advance step every 5 seconds
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return 0; // Reset or stop? Let's loop or stop. Let's stop.
          }
          return prev + 1;
        });
        setProgress(0);
      }, 5000);

      // Smooth progress bar update
      progressIntervalRef.current = setInterval(() => {
        setProgress((old) => Math.min(old + 2, 100)); // 5000ms / 100ms * 2% = 100%
      }, 100);
    } else {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying]);

  return (
    <section id="journey" className="animate-fade-in scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold text-brown-900">🐾 User Journey</h2>
        <span className="text-xs bg-accent-warm/10 text-accent-warm px-3 py-1 rounded-full font-semibold">
          Priya's Submission
        </span>
      </div>

      <div className="card-elevated p-8">
        {/* Step buttons with connecting line */}
        <div className="relative flex items-center justify-between mb-10">
          {/* Background line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-brown-200 -translate-y-1/2" />
          {/* Active progress line */}
          <div
            className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 transition-all duration-700"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
              background: 'linear-gradient(90deg, #C0785B, #E8793A, #4CAF50)',
            }}
          />

          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => { setCurrentStep(idx); setIsPlaying(false); setProgress(0); }}
              className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-xl 
                font-bold transition-all duration-300 border-2 shadow-sm ${
                idx <= currentStep
                  ? 'border-transparent scale-110'
                  : 'bg-white border-brown-200 text-brown-300 hover:border-brown-400'
              }`}
              style={idx <= currentStep ? {
                backgroundColor: statusColors[s.status],
                color: '#FFFFFF',
              } : {}}
            >
              {idx < currentStep ? '✓' : s.emoji}
            </button>
          ))}
        </div>

        {/* Step labels */}
        <div className="flex justify-between mb-8">
          {steps.map((s, idx) => (
            <div key={s.id} className="text-center" style={{ width: '18%' }}>
              <div className={`text-xs font-semibold ${idx === currentStep ? 'text-brown-900' : 'text-brown-300'}`}>
                {s.title}
              </div>
            </div>
          ))}
        </div>

        {/* Content card */}
        <div
          className="bg-brown-50 p-6 rounded-xl border-l-4 transition-all duration-300 relative overflow-hidden"
          style={{ borderColor: statusColors[step.status] }}
        >
          {/* Auto-play progress bar background for the card/step */}
          {isPlaying && (
              <div className="absolute top-0 left-0 h-1 bg-brown-200 w-full">
                  <div className="h-full bg-accent-orange transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
              </div>
          )}

          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{step.emoji}</span>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: statusColors[step.status] + '20', color: statusColors[step.status] }}
            >
              {step.status}
            </span>
          </div>
          <p className="text-lg text-brown-800 mb-3 leading-relaxed">{step.text}</p>
          <p className="text-sm text-brown-400 italic">{step.detail}</p>
        </div>

        {/* Navigation / Controls */}
        <div className="flex items-center justify-center mt-8 gap-4">
           <button 
             onClick={() => setIsPlaying(!isPlaying)}
             className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white shadow-md transition-all hover:scale-105 ${isPlaying ? 'bg-accent-red' : 'bg-accent-green'}`}
           >
             {isPlaying ? (
                 <><span>⏸</span> Pause Journey</>
             ) : (
                 <><span>▶</span> {currentStep >= steps.length - 1 ? 'Replay Journey' : 'Play Journey'}</>
             )}
           </button>
        </div>
      </div>
    </section>
  );
}
