"use client";

import React, { useState } from 'react';
import { calculateUltimateRahbiyyah } from '../lib/mathEngine';
import { proofsDatabase } from '../lib/proofsData';

export default function AlRahbiyyahDashboard() {
  const [heirs, setHeirs] = useState({
    husband: 0, wives: 0, 
    sons: 0, daughters: 0, grandsons: 0, granddaughters: 0,
    father: 0, mother: 0, paternal_grandfather: 0, paternal_grandmother: 0, maternal_grandmother: 0,
    full_brothers: 0, full_sisters: 0, paternal_brothers: 0, paternal_sisters: 0, maternal_siblings: 0, 
    unborn_foetus: 0
  });

  const [madhab, setMadhab] = useState('shafii');
  const [showSpecialist, setShowSpecialist] = useState(false);

  const calculate = () => calculateUltimateRahbiyyah(heirs, madhab, 100000);

  const updateHeir = (key: keyof typeof heirs, delta: number) => {
    setHeirs((prev) => {
      let newValue = Math.max(0, prev[key] + delta);
      
      // Biological Constraints
      if (['husband', 'father', 'mother', 'paternal_grandfather', 'paternal_grandmother', 'maternal_grandmother', 'unborn_foetus'].includes(key) && newValue > 1) newValue = 1;
      if (key === 'wives' && newValue > 4) newValue = 4;

      let updatedHeirs = { ...prev, [key]: newValue };
      if (key === 'husband' && newValue > 0) updatedHeirs.wives = 0;
      if (key === 'wives' && newValue > 0) updatedHeirs.husband = 0;

      return updatedHeirs;
    });
  };

  const results = calculate();

  const handlePrint = () => {
    setShowSpecialist(true);
    setTimeout(() => window.print(), 300);
  };

  const heirInputs = [
    { category: "Spouses", items: [{ label: 'Husband', key: 'husband' }, { label: 'Wives', key: 'wives' }] },
    { category: "Descendants", items: [{ label: 'Sons', key: 'sons' }, { label: 'Daughters', key: 'daughters' }, { label: "Son's Sons", key: 'grandsons' }, { label: "Son's Daughters", key: 'granddaughters' }] },
    { category: "Ascendants", items: [{ label: 'Father', key: 'father' }, { label: 'Mother', key: 'mother' }, { label: 'Pat. Grandfather', key: 'paternal_grandfather' }, { label: 'Pat. Grandmother', key: 'paternal_grandmother' }, { label: 'Mat. Grandmother', key: 'maternal_grandmother' }] },
    { category: "Siblings & Others", items: [{ label: 'Full Brothers', key: 'full_brothers' }, { label: 'Full Sisters', key: 'full_sisters' }, { label: 'Pat. Brothers', key: 'paternal_brothers' }, { label: 'Pat. Sisters', key: 'paternal_sisters' }, { label: 'Maternal Siblings', key: 'maternal_siblings' }, { label: 'Unborn Foetus', key: 'unborn_foetus' }] }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 font-sans print:bg-[#faf9f6] print:text-gray-900 print:p-0">
      
      <header className="mb-10 text-center print:hidden">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-300">Al-Rahbiyyah Pro</h1>
        <p className="text-gray-400 mt-2 tracking-wide text-sm uppercase">The Definitive Islamic Estate Framework</p>
      </header>

      <div className="hidden print:block w-full bg-slate-900 border-b-8 border-yellow-600 text-center py-10 mb-10 shadow-sm" style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>
        <h1 className="text-4xl font-extrabold text-yellow-500 tracking-tight">AL-RAHBIYYAH PRO</h1>
        <p className="text-yellow-100 mt-2 uppercase tracking-[0.3em] text-xs font-semibold">Official Estate Distribution Certificate</p>
        <div className="mt-6 inline-block bg-slate-800 border border-yellow-700/50 px-6 py-2 rounded-full">
          <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest">Jurisprudence: {madhab} Madhab</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 print:block print:max-w-full print:mx-8">
        
        {/* INPUT ENGINE */}
        <div className="lg:col-span-1 bg-gray-900 border border-yellow-700/30 p-6 rounded-xl shadow-2xl h-fit print:hidden overflow-y-auto max-h-[85vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-yellow-500">Family Structure</h2>
            <select className="bg-gray-800 text-yellow-500 border border-yellow-600 rounded text-xs p-1" value={madhab} onChange={(e) => setMadhab(e.target.value)}>
              <option value="shafii">Shafi'i (Strict)</option>
              <option value="hanafi">Hanafi (Radd)</option>
              <option value="maliki">Maliki (Bayt al-Mal)</option>
              <option value="hanbali">Hanbali (Grandmother)</option>
            </select>
          </div>

          {heirInputs.map((group, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-800 pb-1">{group.category}</h3>
              <div className="space-y-3">
                {group.items.map(({ label, key }) => (
                  <div key={key} className="flex justify-between items-center bg-gray-800/50 p-2 rounded">
                    <span className="text-gray-300 text-sm">{label}</span>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => updateHeir(key, -1)} className="w-7 h-7 rounded bg-gray-700 hover:bg-gray-600 text-yellow-500 font-bold transition-colors flex items-center justify-center">-</button>
                      <span className="w-4 text-center font-bold text-sm">{heirs[key]}</span>
                      <button onClick={() => updateHeir(key, 1)} className="w-7 h-7 rounded bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold transition-colors flex items-center justify-center">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* OUTPUT SCREEN */}
        <div className="lg:col-span-2 space-y-6 print:space-y-10">
          <div className="flex justify-end print:hidden">
            <button onClick={handlePrint} className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-950 font-bold py-3 px-6 rounded-lg shadow-[0_0_15px_rgba(202,138,4,0.4)] hover:scale-105 transition-all flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Generate Official Report
            </button>
          </div>

          <div className="bg-gray-900 border border-yellow-700/30 p-6 rounded-xl shadow-2xl flex flex-col items-center justify-center min-h-[300px] print:bg-white print:border-2 print:border-yellow-600 print:shadow-none print:rounded-2xl print:p-8" style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>
             <div className="hidden print:block w-full border-b-2 border-gray-100 pb-4 mb-6 text-center"><h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest">Final Distribution</h2></div>
             <div className="w-48 h-48 rounded-full border-8 border-gray-800 flex items-center justify-center mb-8 relative print:border-slate-100">
                <div className="absolute w-full h-full rounded-full border-t-8 border-yellow-500 rotate-45 transition-transform duration-500 print:border-yellow-500"></div>
                <div className="text-center"><p className="text-gray-400 text-xs uppercase print:text-slate-500 font-bold tracking-wider">Total Distributed</p><p className="text-2xl font-bold text-yellow-500 print:text-slate-900 text-3xl">100%</p></div>
             </div>
             <div className="w-full grid grid-cols-2 gap-4 print:gap-6">
                {results.map((r, i) => (
                  <div key={i} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center border-l-4 border-yellow-500 shadow-md print:bg-slate-50 print:border-l-8 print:border-yellow-500 print:rounded-xl print:shadow-sm">
                    <div>
                      <h3 className="font-bold text-white text-sm print:text-slate-900 print:text-lg">{r.heir}</h3>
                      <p className="text-xs text-gray-400 print:text-slate-500 font-mono mt-1">{r.fraction}</p>
                    </div>
                    <span className="text-xl font-bold text-yellow-400 print:text-slate-900 print:text-2xl">{r.percentage}%</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 p-1 rounded-xl shadow-2xl print:bg-transparent print:border-0 print:shadow-none print:p-0">
            <button onClick={() => setShowSpecialist(!showSpecialist)} className="w-full flex justify-between items-center p-4 text-gray-300 hover:text-yellow-500 transition-colors print:hidden">
              <span className="font-semibold text-sm tracking-widest uppercase">Academic Proofs (Verified Database)</span><span>{showSpecialist ? '▲' : '▼'}</span>
            </button>
            <div className={`${showSpecialist ? 'block' : 'hidden'} print:block p-6 border-t border-gray-800 bg-gray-950/50 print:bg-transparent print:border-0 print:p-0 print:mt-10`}>
              <div className="hidden print:flex items-center justify-center gap-4 mb-8">
                <div className="h-px bg-yellow-600 flex-grow"></div><h2 className="text-xl font-bold text-slate-900 uppercase tracking-[0.2em] px-4">Jurisprudential Basis (Al-Adillah)</h2><div className="h-px bg-yellow-600 flex-grow"></div>
              </div>
              <div className="space-y-8 print:space-y-6">
                {results.map((r, i) => {
                  const targetKey = r.lookupKey || r.heir;
                  const heirData = proofsDatabase[targetKey];
                  const proofData = heirData?.[madhab];
                  const quranData = heirData?.quran_verse;
                  return (
                    <div key={i} className="flex flex-col space-y-4 pb-6 border-b border-gray-800 print:border-gray-300 print:pb-8 print:break-inside-avoid last:border-0 last:pb-0" style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}>
                      <div className="flex items-center"><span className="text-yellow-500 text-lg font-bold print:text-slate-900 uppercase tracking-wide print:bg-yellow-100 print:px-4 print:py-1 print:rounded-sm border-l-4 border-yellow-600 pl-3">{r.heir}</span></div>
                      {quranData && (
                        <div className="bg-emerald-950/30 border-l-4 border-emerald-600 p-4 rounded-r print:bg-emerald-50 print:border-emerald-600 print:shadow-sm">
                          <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest print:text-emerald-700">Divine Text & Principle - {quranData.reference}</span>
                          <p className="text-right text-2xl font-arabic text-emerald-100 leading-loose py-3 print:text-slate-900" dir="rtl">{quranData.arabic}</p>
                          <p className="text-sm text-emerald-200/70 italic print:text-slate-600 print:font-medium">"{quranData.english}"</p>
                        </div>
                      )}
                      <div className="pl-2 print:pl-4 print:border-l-2 print:border-slate-200 print:ml-2 mt-4">
                        <span className="text-gray-500 text-xs font-mono bg-gray-800 px-2 py-1 rounded print:bg-slate-800 print:text-yellow-400 inline-block mb-3 font-bold">Madhab Derivation: {proofData ? proofData.textbook : "Awaiting Verification"}</span>
                        {proofData ? (
                          <><p className="text-right text-lg font-arabic text-gray-300 leading-loose py-1 print:text-slate-800" dir="rtl">{proofData.arabic}</p><p className="text-sm text-gray-400 italic border-l-2 border-yellow-700/50 pl-3 print:text-slate-500 print:border-slate-300">"{proofData.english}"</p></>
                        ) : (<p className="text-sm text-gray-500 italic print:text-slate-400">Academic derivation for {targetKey} in {madhab.toUpperCase()} is queued for pending update.</p>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden print:block fixed bottom-0 left-0 w-full text-center py-4 bg-white border-t border-gray-200" style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}><p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Generated securely by Al-Rahbiyyah Pro</p></div>
    </div>
  );
}