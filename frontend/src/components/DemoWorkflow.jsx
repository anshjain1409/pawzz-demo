import React, { useState } from 'react';
import { DEMO_SCENARIO } from '../data/mockData';

export default function DemoWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { 
      label: 'The Challenge', 
      desc: 'We are tracking 2 messy datasets.',
      content: (
        <div className="grid grid-cols-2 gap-4 mt-2">
          {DEMO_SCENARIO.datasets.map(d => (
            <div key={d.id} className="bg-brown-50 p-3 rounded-lg border border-brown-100">
              <div className="font-bold text-brown-900 text-sm">{d.name}</div>
              <div className="text-xs text-brown-500 mt-1">"{d.record}"</div>
              <div className="mt-2 text-xs font-semibold text-accent-red">Problem: {d.problem}</div>
            </div>
          ))}
        </div>
      )
    },
    { 
      label: 'The Pipeline', 
      desc: 'System processes raw data.',
      content: (
        <div className="flex gap-2 mt-4 items-center justify-center text-xs text-brown-400">
          <span className="p-2 bg-white border border-brown-100 rounded">Raw Data</span>
          <span>→</span>
          <span className="p-2 bg-accent-orange/10 text-accent-orange rounded font-bold">Intake</span>
          <span>→</span>
          <span className="p-2 bg-accent-blue/10 text-accent-blue rounded font-bold">Processing</span>
        </div>
      )
    },
    { 
      label: 'The Solution', 
      desc: 'Automatic detection & resolution.',
      content: (
        <div className="grid grid-cols-2 gap-4 mt-2">
          {DEMO_SCENARIO.datasets.map(d => (
            <div key={d.id} className="bg-white p-3 rounded-lg border-l-4 border-accent-green shadow-sm">
              <div className="font-bold text-brown-900 text-sm">{d.problem}</div>
              <div className="text-xs text-accent-green mt-1">Solution: {d.solution}</div>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <section className="animate-fade-in mb-16">
      <div className="card-elevated p-8 bg-gradient-to-br from-white to-brown-50 border-brown-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-brown-900">🚀 Demo Workflow</h2>
            <p className="text-sm text-brown-500 mt-1">
              See how Pawzz handles messy data • <span className="font-semibold text-accent-orange">Est. 5 mins</span>
            </p>
          </div>
          <button 
            onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
            className="bg-accent-orange text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-opacity-90 transition"
          >
            {activeStep === steps.length - 1 ? 'Restart Tour' : 'Next Step →'}
          </button>
        </div>

        <div className="flex gap-4">
          {/* Stepper */}
          <div className="w-1/3 space-y-2">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  activeStep === idx 
                    ? 'bg-white border-accent-orange shadow-md' 
                    : 'bg-transparent border-transparent hover:bg-brown-100/50'
                }`}
              >
                <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  activeStep === idx ? 'text-accent-orange' : 'text-brown-400'
                }`}>
                  Step {idx + 1}
                </div>
                <div className="font-bold text-brown-900">{step.label}</div>
                <div className="text-xs text-brown-500 mt-1">{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="w-2/3 bg-white rounded-xl border border-brown-100 p-6 flex flex-col justify-center min-h-[200px]">
             <div className="animate-fade-in key={activeStep}">
               <h3 className="text-lg font-bold text-brown-900 mb-2">{steps[activeStep].label}</h3>
               <p className="text-sm text-brown-500">{steps[activeStep].desc}</p>
               {steps[activeStep].content}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
