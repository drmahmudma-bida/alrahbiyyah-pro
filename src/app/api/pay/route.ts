import React from 'react';
import Link from 'next/link';

export default function PricingSection() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 my-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 mb-4">
          Choose Your Professional License
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Whether you calculate on the go or need full desktop PDF generation, we have the right tier for your Fara'id practice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        {/* TIER 1: MOBILE APP */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl flex flex-col h-full">
          <h3 className="text-xl font-bold text-white mb-2">Mobile Edition</h3>
          <p className="text-slate-400 text-sm mb-6">For on-the-go quick calculations.</p>
          <div className="text-4xl font-extrabold text-white mb-6">
            ₦5,000 <span className="text-lg text-slate-500 font-normal">/device</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {['Android .apk Download', 'Full Al-Hajb Engine', 'In-App Activation', 'No Desktop Access'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {feature}
              </li>
            ))}
          </ul>
          
          {/* --- UPDATED BUTTON FOR GOOGLE DRIVE --- */}
          <a 
            href="https://drive.google.com/file/d/1H5tRiprKkVWAi6U6fbCLiDkqRGS9Qaml/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center py-4 rounded-xl font-bold text-emerald-400 bg-emerald-900/20 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-all"
          >
            Download Android App
          </a>
        </div>

        {/* TIER 2: MASTER BUNDLE (Highlighted Middle Column) */}
        <div className="bg-gradient-to-b from-emerald-900 to-slate-900 border-2 border-emerald-500 rounded-3xl p-8 shadow-2xl shadow-emerald-900/50 flex flex-col relative transform lg:-translate-y-4 z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            MOST POPULAR
          </div>
          <h3 className="text-xl font-bold text-white mb-2">The Master Bundle</h3>
          <p className="text-emerald-200 text-sm mb-6">The ultimate toolkit for serious practitioners.</p>
          <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-6">
            ₦17,500 <span className="text-lg text-emerald-400 font-normal">/lifetime</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {['Windows Desktop Toolkit', 'Mobile Android App Included', 'Premium PDF Generation', 'Master VIP Unlock PIN Provided'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-white">
                <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span className="font-medium">{feature}</span>
              </li>
            ))}
          </ul>
          <button className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg shadow-emerald-500/30 transition-all">
            Get the Ultimate Bundle
          </button>
        </div>

        {/* TIER 3: DESKTOP ONLY */}
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl flex flex-col h-full">
          <h3 className="text-xl font-bold text-white mb-2">Desktop Pro</h3>
          <p className="text-slate-400 text-sm mb-6">For detailed office drafting & printing.</p>
          <div className="text-4xl font-extrabold text-white mb-6">
            ₦15,000 <span className="text-lg text-slate-500 font-normal">/lifetime</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {['Windows Desktop Toolkit', 'Certified PDF Exports', 'Wasiyyah Implementation', 'Mobile App NOT Included'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full py-4 rounded-xl font-bold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all">
            Unlock Desktop Vault
          </button>
        </div>

      </div>
    </div>
  );
}