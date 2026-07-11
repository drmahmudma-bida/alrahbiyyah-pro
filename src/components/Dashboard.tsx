import React, { useState } from 'react';
import { calculateUltimateRahbiyyah } from '../lib/mathEngine';

export default function AlRahbiyyahDashboard() {
  const [heirs, setHeirs] = useState({
    husband: 0, wives: 0, 
    sons: 0, daughters: 0, grandsons: 0, granddaughters: 0,
    father: 0, mother: 0, paternal_grandfather: 0, paternal_grandmother: 0, maternal_grandmother: 0,
    full_brothers: 0, full_sisters: 0, paternal_brothers: 0, paternal_sisters: 0, maternal_siblings: 0, 
    unborn_foetus: 0
  });

  const [finances, setFinances] = useState({ grossEstate: '', funeralCosts: '', debts: '', wasiyyah: '' });
  const [currency, setCurrency] = useState('₦');
  const [madhab, setMadhab] = useState('shafii'); 
  const [results, setResults] = useState<any>(null); 
  const [isCalculating, setIsCalculating] = useState(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const [showDonationModal, setShowDonationModal] = useState(false);

  // --- THE NEW NATIVE PDF ENGINE ---
  const exportPDF = () => {
    window.print();
  };

  const gross = parseFloat(finances.grossEstate) || 0;
  const funeral = parseFloat(finances.funeralCosts) || 0;
  const debts = parseFloat(finances.debts) || 0;
  const requestedWasiyyah = parseFloat(finances.wasiyyah) || 0;

  const remainderAfterDebts = Math.max(0, gross - funeral - debts);
  const wasiyyahMaxLimit = remainderAfterDebts / 3;
  const appliedWasiyyah = Math.min(requestedWasiyyah, wasiyyahMaxLimit);
  const isWasiyyahExceeded = requestedWasiyyah > wasiyyahMaxLimit;
  const netEstate = remainderAfterDebts - appliedWasiyyah;

  const handleFinanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinances(prev => ({ ...prev, [name]: value }));
    setResults(null); setExpandedRows([]);
  };

  const updateHeir = (heirName: string, delta: number) => {
    setHeirs(prev => ({ ...prev, [heirName]: Math.max(0, (prev[heirName as keyof typeof heirs] || 0) + delta) }));
    setResults(null); setExpandedRows([]);
  };

  const toggleRow = (idx: number) => {
    setExpandedRows(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const getMadhabBookName = () => {
    switch (madhab) {
      case 'shafii': return "Matn Al-Rahbiyyah";
      case 'hanafi': return "Al-Sirajiyyah";
      case 'maliki': return "Al-Jaybiyyah";
      case 'hanbali': return "Nazm al-Mufradat";
      default: return "Classical Jurisprudence";
    }
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setExpandedRows([]);
    setTimeout(() => {
      const finalShares = calculateUltimateRahbiyyah(heirs, madhab, netEstate);
      setResults(finalShares);
      setIsCalculating(false);
    }, 600);
  };

  const handleReset = () => {
    setHeirs({
      husband: 0, wives: 0, sons: 0, daughters: 0, grandsons: 0, granddaughters: 0,
      father: 0, mother: 0, paternal_grandfather: 0, paternal_grandmother: 0, maternal_grandmother: 0,
      full_brothers: 0, full_sisters: 0, paternal_brothers: 0, paternal_sisters: 0, maternal_siblings: 0, unborn_foetus: 0
    });
    setFinances({ grossEstate: '', funeralCosts: '', debts: '', wasiyyah: '' });
    setResults(null);
    setExpandedRows([]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Account Number Copied!");
  };

  const HeirCounter = ({ name, label, max = 99 }: { name: string, label: string, max?: number }) => (
    <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-xl hover:border-yellow-600/30 transition-colors print:border-none print:bg-transparent print:p-1">
      <span className="text-slate-300 font-medium print:text-black">{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={() => updateHeir(name, -1)} className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white flex items-center justify-center font-bold transition-colors print:hidden">-</button>
        <span className="w-4 text-center text-white font-bold print:text-black">{heirs[name as keyof typeof heirs]}</span>
        <button onClick={() => { if (heirs[name as keyof typeof heirs] < max) updateHeir(name, 1); }} className="w-8 h-8 rounded-full bg-slate-800 text-yellow-500 hover:bg-yellow-600/20 hover:text-yellow-400 flex items-center justify-center font-bold transition-colors print:hidden">+</button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-24 print:p-0 print:space-y-4">
      
      {/* Global Print Styles to make the PDF look like a clean white document */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background-color: white !important; color: black !important; }
          .print-hide { display: none !important; }
          .print-text-black { color: black !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}} />

      {/* --- ALL INPUT SECTIONS (Hidden during PDF generation) --- */}
      <div className="print-hide space-y-8">
        {/* --- SEQUENCER --- */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 relative z-10 gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold text-lg mr-4 border border-blue-700/50">1</div>
              <div>
                <h2 className="text-2xl font-bold text-white">Pre-Distribution Sequencer</h2>
                <p className="text-slate-400 text-sm mt-1">Determine the exact Net Estate (Tarikah) before Fara'id division.</p>
              </div>
            </div>
            <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 w-max">
              <span className="text-slate-400 text-sm mr-2">Currency:</span>
              <select value={currency} onChange={(e) => { setCurrency(e.target.value); setResults(null); }} className="bg-transparent text-yellow-500 font-bold focus:outline-none cursor-pointer appearance-none pr-4">
                <option value="₦">NGN (₦)</option>
                <option value="$">USD ($)</option>
                <option value="£">GBP (£)</option>
                <option value="€">EUR (€)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
            <div>
              <label className="block text-slate-300 font-semibold mb-2">Total Gross Estate Value</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">{currency}</span>
                <input type="number" name="grossEstate" value={finances.grossEstate} onChange={handleFinanceChange} className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-500 transition-all shadow-inner" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-2">Funeral & Burial Expenses</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/70 font-bold">-{currency}</span>
                <input type="number" name="funeralCosts" value={finances.funeralCosts} onChange={handleFinanceChange} className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500/50 transition-all shadow-inner" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-2">Outstanding Debts</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/70 font-bold">-{currency}</span>
                <input type="number" name="debts" value={finances.debts} onChange={handleFinanceChange} className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500/50 transition-all shadow-inner" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-2">Documented Will (Wasiyyah)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600/70 font-bold">-{currency}</span>
                <input type="number" name="wasiyyah" value={finances.wasiyyah} onChange={handleFinanceChange} className={`w-full bg-slate-950 border ${isWasiyyahExceeded ? 'border-red-500/80 focus:border-red-500' : 'border-slate-700 focus:border-yellow-500'} rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none transition-all shadow-inner`} placeholder="0.00" />
              </div>
              {isWasiyyahExceeded && (
                 <p className="text-red-400 text-sm mt-2 flex items-center font-medium animate-pulse">
                   <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                   Shariah Cap: Max 1/3 allowed is {currency}{wasiyyahMaxLimit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 </p>
              )}
            </div>
          </div>
        </div>

        {/* --- MADHAB SELECTOR --- */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center font-bold text-lg mr-4 border border-emerald-700/50">2</div>
            <div>
              <h2 className="text-2xl font-bold text-white">Jurisprudence (Madhab)</h2>
              <p className="text-slate-400 text-sm mt-1">Select the specific school of thought for mathematical algorithms.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[ { id: 'shafii', name: "Shafi'i", text: "Matn Al-Rahbiyyah" }, { id: 'hanafi', name: "Hanafi", text: "Al-Sirajiyyah" }, { id: 'maliki', name: "Maliki", text: "Al-Jaybiyyah" }, { id: 'hanbali', name: "Hanbali", text: "Nazm al-Mufradat" } ].map((m) => (
              <button key={m.id} onClick={() => { setMadhab(m.id); setResults(null); setExpandedRows([]); }} className={`p-4 rounded-xl border text-left transition-all duration-300 ${madhab === m.id ? 'bg-yellow-600/10 border-yellow-500 shadow-[0_0_15px_rgba(202,138,4,0.15)]' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                <div className={`font-bold text-lg ${madhab === m.id ? 'text-yellow-400' : 'text-white'}`}>{m.name}</div>
                <div className="text-xs text-slate-500 mt-1">{m.text}</div>
              </button>
            ))}
          </div>
        </div>

        {/* --- SURVIVING HEIRS --- */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-purple-900/50 text-purple-400 flex items-center justify-center font-bold text-lg mr-4 border border-purple-700/50">3</div>
            <div>
              <h2 className="text-2xl font-bold text-white">Surviving Heirs</h2>
              <p className="text-slate-400 text-sm mt-1">Add the living relatives. Engine automatically applies Hajb (exclusion).</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-yellow-600 font-bold uppercase tracking-wider text-sm border-b border-slate-800 pb-2">Spouses & Descendants</h3>
              <HeirCounter name="husband" label="Husband" max={1} />
              <HeirCounter name="wives" label="Wives" max={4} />
              <HeirCounter name="sons" label="Sons" />
              <HeirCounter name="daughters" label="Daughters" />
              <HeirCounter name="grandsons" label="Grandsons (Paternal)" />
              <HeirCounter name="granddaughters" label="Granddaughters (Pat)" />
            </div>
            <div className="space-y-4">
              <h3 className="text-yellow-600 font-bold uppercase tracking-wider text-sm border-b border-slate-800 pb-2">Parents & Grandparents</h3>
              <HeirCounter name="father" label="Father" max={1} />
              <HeirCounter name="mother" label="Mother" max={1} />
              <HeirCounter name="paternal_grandfather" label="Pat. Grandfather" max={1} />
              <HeirCounter name="paternal_grandmother" label="Pat. Grandmother" max={1} />
              <HeirCounter name="maternal_grandmother" label="Mat. Grandmother" max={1} />
            </div>
            <div className="space-y-4">
              <h3 className="text-yellow-600 font-bold uppercase tracking-wider text-sm border-b border-slate-800 pb-2">Siblings & Foetus</h3>
              <HeirCounter name="full_brothers" label="Full Brothers" />
              <HeirCounter name="full_sisters" label="Full Sisters" />
              <HeirCounter name="paternal_brothers" label="Paternal Brothers" />
              <HeirCounter name="paternal_sisters" label="Paternal Sisters" />
              <HeirCounter name="maternal_siblings" label="Maternal Siblings" />
              <HeirCounter name="unborn_foetus" label="Unborn Foetus" max={1} />
            </div>
          </div>
        </div>

        {/* --- EXECUTION BUTTONS --- */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 py-6 flex-wrap">
          <button 
            onClick={handleCalculate} 
            disabled={isCalculating || netEstate <= 0} 
            className={`px-12 py-4 rounded-full font-extrabold text-xl transition-all duration-300 shadow-[0_0_30px_rgba(5,150,105,0.3)] border flex items-center ${isCalculating || netEstate <= 0 ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed' : 'bg-emerald-600 text-white border-emerald-400/50 hover:bg-emerald-500 hover:scale-105'}`}
          >
            {isCalculating ? "Processing Logic..." : "Calculate Estate"}
          </button>

          <button 
            onClick={handleReset} 
            className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 border border-red-900/50 bg-red-950/30 text-red-400 hover:bg-red-900/50 hover:text-white"
          >
            Reset All Data
          </button>
        </div>
      </div>
      {/* --- END HIDDEN PRINT SECTION --- */}

      {/* --- RESULTS DISPLAY TERMINAL (THIS IS WHAT PRINTS) --- */}
      {results && (
        <div className="bg-[#030610] print:bg-white border border-yellow-600/50 print:border-slate-300 rounded-2xl shadow-[0_0_50px_rgba(202,138,4,0.15)] print:shadow-none overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 print:mt-0">
          
          {/* Header visible ONLY on print to show the context of the report */}
          <div className="hidden print:block p-8 border-b border-slate-200 bg-white">
            <h1 className="text-3xl font-extrabold text-black mb-2">Al-Rahbiyyah Pro: Official Fara'id Report</h1>
            <p className="text-slate-600 font-medium mb-4">The Final Word in Islamic Inheritance & Estate Planning</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-800">
              <div><strong>Jurisprudence:</strong> {madhab.charAt(0).toUpperCase() + madhab.slice(1)} School ({getMadhabBookName()})</div>
              <div><strong>Date Generated:</strong> {new Date().toLocaleDateString()}</div>
              <div><strong>Gross Estate:</strong> {currency}{gross.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
              <div><strong>Final Tarikah (Net):</strong> {currency}{netEstate.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-[#0a1128] print:bg-white print:bg-none border-b border-slate-800 print:border-slate-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 print-text-black">Final Shariah Distribution</h2>
              <p className="text-slate-400 print-text-black mt-1">Verified mathematically via the {madhab.charAt(0).toUpperCase() + madhab.slice(1)} School.</p>
            </div>
            
            <div className="flex items-center gap-6 bg-slate-950/50 print:bg-transparent px-6 py-3 rounded-xl border border-slate-800/80 print:border-none">
              <div className="text-right">
                <span className="text-xs text-slate-500 print:text-black uppercase tracking-widest block mb-1">Total Tarikah Distributed</span>
                <span className="text-2xl font-bold text-emerald-400 print-text-black">{currency}{netEstate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <div className="p-0 md:p-4 print:p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse print:text-sm">
                <thead>
                  <tr className="text-slate-500 print-text-black text-xs uppercase tracking-widest bg-slate-900/50 print:bg-slate-100 border-b border-slate-800 print:border-slate-300">
                    <th className="p-4 font-semibold">Surviving Heir</th>
                    <th className="p-4 font-semibold">Fraction</th>
                    <th className="p-4 font-semibold">Percentage</th>
                    <th className="p-4 font-semibold text-right">Monetary Payout</th>
                    <th className="p-4 font-semibold text-center print:hidden">Proofs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 print:divide-slate-200">
                  {results.map((heir: any, idx: number) => {
                    const isExpanded = expandedRows.includes(idx);
                    const quranProof = heir.quranProof || { arabic: "", translation: "", reference: "" };
                    const madhabProof = heir.madhabProof || { arabic: "", translation: "", reference: "" };

                    // Make rows always expand on print
                    const showProof = isExpanded || typeof window !== 'undefined' && window.matchMedia('print').matches;

                    return (
                      <React.Fragment key={idx}>
                        <tr onClick={() => toggleRow(idx)} className={`hover:bg-slate-800/30 print:hover:bg-transparent transition-colors cursor-pointer print:cursor-default group ${isExpanded ? 'bg-slate-800/20 print:bg-transparent' : ''}`}>
                          <td className="p-4 print:py-2">
                            <span className="font-bold text-white print-text-black text-lg print:text-base block">{heir.name}</span>
                            <span className="text-xs text-slate-500 print:text-slate-700">{heir.rule}</span>
                          </td>
                          <td className="p-4 print:py-2 font-mono text-yellow-500 print-text-black text-xl print:text-base">{heir.fraction}</td>
                          <td className="p-4 print:py-2 text-slate-300 print-text-black font-semibold">{heir.percentage}%</td>
                          <td className="p-4 print:py-2 text-right font-bold text-emerald-400 print-text-black text-xl print:text-base">{currency}{heir.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className="p-4 text-center print:hidden">
                            {heir.name !== 'Error' && (
                              <button className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-all ${isExpanded ? 'bg-yellow-600 text-black rotate-180' : 'bg-slate-800 text-yellow-500 group-hover:bg-slate-700'}`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                              </button>
                            )}
                          </td>
                        </tr>
                        
                        {(isExpanded || (showProof && heir.name !== 'Error')) && (
                          <tr className="bg-[#030610] print:bg-white print:break-inside-avoid">
                            <td colSpan={5} className="p-0">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 m-4 print:m-0 print:p-2 print:gap-2 animate-in slide-in-from-top-2 duration-300">
                                
                                <div className="p-6 print:p-4 border-l-2 border-yellow-600 print:border-slate-400 bg-gradient-to-r from-yellow-900/10 to-transparent print:bg-none rounded-r-xl shadow-inner print:shadow-none">
                                  <div className="flex items-center gap-2 mb-4 print:mb-2">
                                    <span className="text-yellow-500 print-text-black font-bold uppercase tracking-widest text-xs">Divine Proof (Qur'an/Sunnah)</span>
                                  </div>
                                  <div className="text-right mb-4 print:mb-2">
                                    <p className="text-2xl print:text-base text-yellow-400 print-text-black font-bold leading-relaxed" dir="rtl">{quranProof.arabic ? `"${quranProof.arabic}"` : ""}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-300 print:text-slate-800 italic text-sm border-l-2 border-slate-700 print:border-slate-300 pl-4 py-1">{quranProof.translation}</p>
                                    <div className="mt-3 print:mt-1 inline-block px-3 py-1 bg-slate-800 print:bg-slate-100 text-yellow-500 print-text-black text-xs font-semibold rounded-md border border-slate-700 print:border-slate-300">Ref: {quranProof.reference}</div>
                                  </div>
                                </div>

                                <div className="p-6 print:p-4 border-l-2 border-emerald-600 print:border-slate-400 bg-gradient-to-r from-emerald-900/10 to-transparent print:bg-none rounded-r-xl shadow-inner print:shadow-none">
                                  <div className="flex items-center gap-2 mb-4 print:mb-2">
                                    <span className="text-emerald-500 print-text-black font-bold uppercase tracking-widest text-xs">Juristic Text ({getMadhabBookName()})</span>
                                  </div>
                                  <div className="text-right mb-4 print:mb-2">
                                    <p className="text-2xl print:text-base text-emerald-400 print-text-black font-bold leading-relaxed" dir="rtl">{madhabProof.arabic ? `"${madhabProof.arabic}"` : ""}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-300 print:text-slate-800 italic text-sm border-l-2 border-slate-700 print:border-slate-300 pl-4 py-1">{madhabProof.translation}</p>
                                    <div className="mt-3 print:mt-1 inline-block px-3 py-1 bg-slate-800 print:bg-slate-100 text-emerald-500 print-text-black text-xs font-semibold rounded-md border border-slate-700 print:border-slate-300">Ref: {madhabProof.reference}</div>
                                  </div>
                                </div>

                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="hidden print:block text-center text-xs text-slate-500 mt-8 border-t border-slate-200 pt-4">
              Generated securely by Al-Rahbiyyah Pro | www.alrahbiyyah.com
            </div>
          </div>
          
          <div className="p-6 border-t border-slate-800 flex flex-col sm:flex-row justify-center items-center gap-4 bg-slate-900/50 print-hide">
             <button 
               onClick={exportPDF}
               className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] w-full sm:w-auto justify-center"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
               Save as PDF / Print Report
             </button>

             <button 
                onClick={() => setShowDonationModal(true)}
                className="px-8 py-3 rounded-lg font-bold transition-all border border-yellow-500/50 bg-yellow-900/20 text-yellow-400 hover:bg-yellow-500 hover:text-black flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(202,138,4,0.1)] w-full sm:w-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                Donate Fisabilillah
              </button>
           </div>
        </div>
      )}

      {/* --- DONATION MODAL --- */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300 print-hide">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full shadow-2xl overflow-y-auto max-h-[90vh] relative">
            <button onClick={() => setShowDonationModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="bg-gradient-to-br from-yellow-900/30 to-slate-900 p-8 text-center border-b border-slate-800">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Support Al-Rahbiyyah Pro</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your Sadaqah ensures this complex Shariah ecosystem remains 100% free for the Ummah. Choose your preferred way to support.
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Option 1: Bank Transfer */}
              <div className="bg-slate-950 border border-emerald-900/50 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <h4 className="text-emerald-400 font-bold mb-4 flex items-center text-sm uppercase tracking-wider">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                  Option 1: Direct Bank Transfer
                </h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Bank Name:</span>
                    <span className="text-white font-semibold">Jaiz Bank Plc</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Account Name:</span>
                    <span className="text-white font-semibold">Almahmudiyyah Press</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-500">Account No:</span>
                    <span className="text-yellow-400 font-bold text-lg">0123456789</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => copyToClipboard('0123456789')} 
                  className="w-full py-2 bg-emerald-900/30 text-emerald-400 font-medium rounded-lg hover:bg-emerald-800/40 transition-colors border border-emerald-800/50 flex justify-center items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  Copy Account Number
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-800 w-full absolute"></div>
                <span className="bg-slate-900 px-4 text-xs text-slate-500 relative z-10 uppercase font-bold">Or</span>
              </div>

              {/* Option 2: Paystack Gateway Link */}
              <div>
                <h4 className="text-blue-400 font-bold mb-3 flex items-center text-sm uppercase tracking-wider">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                  Option 2: Secure Online Payment
                </h4>
                
                <p className="text-sm text-slate-400 mb-4">
                  Click the button below to be securely redirected to our official Paystack storefront to complete your donation.
                </p>

                <a 
                  href="https://paystack.shop/pay/x2gnn2vwrt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all transform hover:scale-[1.02] flex justify-center items-center gap-2 mb-4"
                >
                  Proceed to Secure Checkout
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}