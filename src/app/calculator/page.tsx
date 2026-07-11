"use client";

import { useState } from 'react';
import Link from 'next/link';
import Dashboard from '../../components/Dashboard';

export default function CalculatorPage() {
  // State to control whether the Manual Guide is visible or hidden
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <main className="bg-[#060b19] min-h-screen relative">
      
      {/* --- TOP NAVIGATION BAR (Now hidden during PDF Print!) --- */}
      <div className="print:hidden w-full bg-[#030610] border-b border-slate-800 py-3 px-4 shadow-md flex justify-between items-center z-40 relative">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Return Home
        </Link>

        {/* MANUAL GUIDE BUTTON */}
        <button 
          onClick={() => setIsGuideOpen(true)}
          className="inline-flex items-center text-sm font-bold text-yellow-500 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 rounded-full hover:bg-yellow-500/20 transition-all shadow-[0_0_15px_rgba(202,138,4,0.1)]"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          Manual Guide
        </button>
      </div>

      {/* --- THE FARA'ID ENGINE --- */}
      <Dashboard />

      {/* --- PREMIUM MANUAL GUIDE MODAL (POPUP) --- */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm print:hidden">
          <div className="bg-slate-900 border border-yellow-600/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(202,138,4,0.15)] flex flex-col animate-in fade-in zoom-in duration-300">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">
                How to Use Al-Rahbiyyah Pro
              </h2>
              <button 
                onClick={() => setIsGuideOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-2 bg-slate-800 rounded-full hover:bg-red-500/20 hover:text-red-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Modal Body - The Steps */}
            <div className="p-6 space-y-8 text-slate-300">
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-900/50 text-blue-400 border border-blue-700/50 flex items-center justify-center font-bold flex-shrink-0 text-lg shadow-[0_0_10px_rgba(59,130,246,0.2)]">1</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Pre-Distribution Setup</h3>
                  <p className="text-slate-400 leading-relaxed">Before dividing the estate, input the total wealth. Ensure you first deduct funeral expenses, outstanding debts, and any documented Will (Wasiyyah). Note: The system will automatically warn you if the Wasiyyah exceeds the Shariah maximum of 1/3.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 text-emerald-400 border border-emerald-700/50 flex items-center justify-center font-bold flex-shrink-0 text-lg shadow-[0_0_10px_rgba(16,185,129,0.2)]">2</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Select Jurisprudence (Madhab)</h3>
                  <p className="text-slate-400 leading-relaxed">Choose your specific school of thought (Shafi'i, Hanafi, Maliki, or Hanbali). The mathematical algorithms will adapt instantly to follow the foundational texts of that exact school.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-yellow-900/50 text-yellow-400 border border-yellow-700/50 flex items-center justify-center font-bold flex-shrink-0 text-lg shadow-[0_0_10px_rgba(234,179,8,0.2)]">3</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Input Surviving Heirs</h3>
                  <p className="text-slate-400 leading-relaxed">Carefully add the living relatives. Do not worry about complex exclusion rules (Hajb)—the engine automatically identifies who blocks whom based on strict Shariah logic.</p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-purple-900/50 text-purple-400 border border-purple-700/50 flex items-center justify-center font-bold flex-shrink-0 text-lg shadow-[0_0_10px_rgba(168,85,247,0.2)]">4</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Review Proofs & Export</h3>
                  <p className="text-slate-400 leading-relaxed">Click calculate to view the final mathematical breakdown. You can expand the Verse-to-Variable section to see the exact Qur'anic proofs that justify the calculation.</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-950/80 rounded-b-2xl text-right">
              <button 
                onClick={() => setIsGuideOpen(false)}
                className="px-8 py-3 bg-yellow-600 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors w-full sm:w-auto"
              >
                I Understand, Let's Begin
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}