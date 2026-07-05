import React, { useState } from 'react';
// import { calculateUltimateRahbiyyah } from '../lib/mathEngine';
// import { proofsDatabase } from '../lib/proofsData';

export default function AlRahbiyyahDashboard() {
  // 1. Existing Heirs State
  const [heirs, setHeirs] = useState({
    husband: 0, wives: 0, 
    sons: 0, daughters: 0, grandsons: 0, granddaughters: 0,
    father: 0, mother: 0, paternal_grandfather: 0, paternal_grandmother: 0, maternal_grandmother: 0,
    full_brothers: 0, full_sisters: 0, paternal_brothers: 0, paternal_sisters: 0, maternal_siblings: 0, 
    unborn_foetus: 0
  });

  // 2. Pre-Distribution Financial State
  const [finances, setFinances] = useState({
    grossEstate: '',
    funeralCosts: '',
    debts: '',
    wasiyyah: ''
  });

  // 3. UI States
  const [currency, setCurrency] = useState('₦');
  const [madhab, setMadhab] = useState('shafii'); 
  const [results, setResults] = useState<any>(null); 
  const [isCalculating, setIsCalculating] = useState(false);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // 4. Shariah Sequencer Math
  const gross = parseFloat(finances.grossEstate) || 0;
  const funeral = parseFloat(finances.funeralCosts) || 0;
  const debts = parseFloat(finances.debts) || 0;
  const requestedWasiyyah = parseFloat(finances.wasiyyah) || 0;

  const remainderAfterDebts = Math.max(0, gross - funeral - debts);
  const wasiyyahMaxLimit = remainderAfterDebts / 3;
  const appliedWasiyyah = Math.min(requestedWasiyyah, wasiyyahMaxLimit);
  const isWasiyyahExceeded = requestedWasiyyah > wasiyyahMaxLimit;
  const netEstate = remainderAfterDebts - appliedWasiyyah;

  // Handlers
  const handleFinanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinances(prev => ({ ...prev, [name]: value }));
    setResults(null);
    setExpandedRows([]);
  };

  const updateHeir = (heirName: string, delta: number) => {
    setHeirs(prev => ({
      ...prev,
      [heirName]: Math.max(0, (prev[heirName as keyof typeof heirs] || 0) + delta)
    }));
    setResults(null);
    setExpandedRows([]);
  };

  const toggleRow = (idx: number) => {
    setExpandedRows(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  // Helper to get the correct book name based on the selected Madhab
  const getMadhabBookName = () => {
    switch (madhab) {
      case 'shafii': return "Matn Al-Rahbiyyah";
      case 'hanafi': return "Al-Sirajiyyah";
      case 'maliki': return "Al-Jaybiyyah";
      case 'hanbali': return "Nazm al-Mufradat";
      default: return "Classical Jurisprudence";
    }
  };

  // THE EXECUTION TRIGGER
  const handleCalculate = () => {
    setIsCalculating(true);
    setExpandedRows([]);
    
    setTimeout(() => {
      // --- DUMMY DATA WITH DUAL-PROOFS FOR UI TESTING ---
      setResults([
        { 
          name: 'Husband', 
          fraction: '1/4', 
          percentage: 25, 
          amount: netEstate * 0.25, 
          rule: 'Presence of inheriting descendants.',
          quranProof: {
            arabic: "فَإِن كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْنَ",
            translation: "But if they have a child, you get one-fourth of what they leave...",
            reference: "Surah An-Nisa [4:12]"
          },
          madhabProof: {
            arabic: madhab === 'shafii' ? "وَالرُّبْعُ فَرْضُ الزَّوْجِ إِنْ كَانَ مَعَهْ ... مَنْ قَدْ مَنَعْهُ حَظَّهُ وَوَضَعَهْ" : "Classical Arabic text regarding the 1/4 share based on the selected school.",
            translation: "And one-fourth is the obligatory share of the husband if there is with him a descendant who restricts his share...",
            reference: `Chapter of the 1/4 Share (${getMadhabBookName()})`
          }
        },
        { 
          name: 'Son', 
          fraction: '3/4', 
          percentage: 75, 
          amount: netEstate * 0.75, 
          rule: 'Takes the remainder as Asabah.',
          quranProof: {
            arabic: "يُوصِيكُمُ اللَّهُ فِي أَوْلادِكُمْ لِلذَّكَرِ مِثْلُ حَظِّ الأُنثَيَيْنِ",
            translation: "Allah commands you regarding your children: for the male, what is equal to the share of two females...",
            reference: "Surah An-Nisa [4:11] (Asabah)"
          },
          madhabProof: {
            arabic: madhab === 'shafii' ? "وَكُلُّ مَنْ أَحْرَزَ كُلَّ الْمَالِ ... مِنَ الْقَرَابَاتِ أَوِ الْمَوَالِي" : "Classical Arabic text regarding Asabah based on the selected school.",
            translation: "And anyone who takes the entirety of the wealth (or remainder) from the relatives or freed slaves is an Asabah...",
            reference: `Chapter of Asabah (${getMadhabBookName()})`
          }
        }
      ]);
      setIsCalculating(false);
    }, 600);
  };

  const HeirCounter = ({ name, label, max = 99 }: { name: string, label: string, max?: number }) => (
    <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-3 rounded-xl hover:border-yellow-600/30 transition-colors">
      <span className="text-slate-300 font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <button onClick={() => updateHeir(name, -1)} className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white flex items-center justify-center font-bold transition-colors">-</button>
        <span className="w-4 text-center text-white font-bold">{heirs[name as keyof typeof heirs]}</span>
        <button onClick={() => { if (heirs[name as keyof typeof heirs] < max) updateHeir(name, 1); }} className="w-8 h-8 rounded-full bg-slate-800 text-yellow-500 hover:bg-yellow-600/20 hover:text-yellow-400 flex items-center justify-center font-bold transition-colors">+</button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-24">
      
      {/* --- PRE-DISTRIBUTION SEQUENCER --- */}
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

        <div className="bg-[#030610] border border-emerald-900/50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center relative z-10 shadow-2xl">
          <div className="mb-4 md:mb-0">
            <h3 className="text-slate-300 font-bold text-lg mb-1">Final Net Estate (Tarikah)</h3>
            <p className="text-sm text-emerald-400/80">Available for Fara'id division.</p>
          </div>
          <div className="text-right flex items-center justify-end">
            <span className="text-2xl text-emerald-500 mr-2 font-bold">{currency}</span>
            <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
              {netEstate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
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
            <p className="text-slate-400 text-sm mt-1">Add the living relatives. The engine automatically handles Hajb (exclusion) rules.</p>
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
            <HeirCounter name="granddaughters" label="Granddaughters (Paternal)" />
          </div>
          <div className="space-y-4">
            <h3 className="text-yellow-600 font-bold uppercase tracking-wider text-sm border-b border-slate-800 pb-2">Parents & Grandparents</h3>
            <HeirCounter name="father" label="Father" max={1} />
            <HeirCounter name="mother" label="Mother" max={1} />
            <HeirCounter name="paternal_grandfather" label="Paternal Grandfather" max={1} />
            <HeirCounter name="paternal_grandmother" label="Paternal Grandmother" max={1} />
            <HeirCounter name="maternal_grandmother" label="Maternal Grandmother" max={1} />
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

      {/* --- EXECUTE CALCULATION BUTTON --- */}
      <div className="flex justify-center py-6">
        <button 
          onClick={handleCalculate}
          disabled={isCalculating || netEstate <= 0}
          className={`px-12 py-5 rounded-full font-extrabold text-xl transition-all duration-300 shadow-[0_0_40px_rgba(5,150,105,0.4)] border flex items-center ${isCalculating || netEstate <= 0 ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed' : 'bg-emerald-600 text-white border-emerald-400/50 hover:bg-emerald-500 hover:scale-105'}`}
        >
          {isCalculating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Processing Shariah Logic...
            </>
          ) : (
            <>Calculate Estate Shares</>
          )}
        </button>
      </div>

      {/* --- RESULTS DISPLAY TERMINAL WITH DUAL PROOFS --- */}
      {results && (
        <div className="bg-[#030610] border border-yellow-600/50 rounded-2xl shadow-[0_0_50px_rgba(202,138,4,0.15)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="bg-gradient-to-r from-slate-900 to-[#0a1128] border-b border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">Final Distribution</h2>
              <p className="text-slate-400 mt-1">Verified mathematically via the {madhab.charAt(0).toUpperCase() + madhab.slice(1)} School.</p>
            </div>
            
            <div className="flex items-center gap-6 bg-slate-950/50 px-6 py-3 rounded-xl border border-slate-800/80">
              <div className="text-right">
                <span className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Total Tarikah Distributed</span>
                <span className="text-2xl font-bold text-emerald-400">{currency}{netEstate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0 bg-slate-900 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] border border-slate-700/50">
                <svg className="w-full h-full transform -rotate-90 p-1" viewBox="0 0 36 36">
                  <path className="text-slate-800" strokeWidth="2.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-emerald-500" strokeWidth="2.5" strokeDasharray="100, 100" strokeDashoffset="0" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }} />
                </svg>
                <div className="absolute flex flex-col items-center justify-center mt-0.5">
                  <span className="text-emerald-400 font-black text-sm leading-none">100%</span>
                  <span className="text-[0.4rem] text-slate-400 uppercase tracking-widest mt-0.5">Allocated</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-0 md:p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-500 text-xs uppercase tracking-widest bg-slate-900/50 border-b border-slate-800">
                    <th className="p-4 font-semibold rounded-tl-lg">Surviving Heir</th>
                    <th className="p-4 font-semibold">Fraction</th>
                    <th className="p-4 font-semibold">Percentage</th>
                    <th className="p-4 font-semibold text-right">Monetary Payout</th>
                    <th className="p-4 font-semibold text-center rounded-tr-lg">Proofs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {results.map((heir: any, idx: number) => {
                    const isExpanded = expandedRows.includes(idx);
                    return (
                      <React.Fragment key={idx}>
                        {/* MAIN ROW */}
                        <tr 
                          onClick={() => toggleRow(idx)} 
                          className={`hover:bg-slate-800/30 transition-colors cursor-pointer group ${isExpanded ? 'bg-slate-800/20' : ''}`}
                        >
                          <td className="p-4">
                            <span className="font-bold text-white text-lg block">{heir.name}</span>
                            <span className="text-xs text-slate-500">{heir.rule}</span>
                          </td>
                          <td className="p-4 font-mono text-yellow-500 text-xl">{heir.fraction}</td>
                          <td className="p-4 text-slate-300 font-semibold">{heir.percentage}%</td>
                          <td className="p-4 text-right font-bold text-emerald-400 text-xl">
                            {currency}{heir.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="p-4 text-center">
                            <button className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-all ${isExpanded ? 'bg-yellow-600 text-black rotate-180' : 'bg-slate-800 text-yellow-500 group-hover:bg-slate-700'}`}>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                          </td>
                        </tr>
                        
                        {/* DUAL PROOF EXPANDABLE ROW */}
                        {isExpanded && (
                          <tr className="bg-[#030610]">
                            <td colSpan={5} className="p-0">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 m-4 animate-in slide-in-from-top-2 duration-300">
                                
                                {/* 1. The Divine Text (Qur'an/Sunnah) */}
                                <div className="p-6 border-l-2 border-yellow-600 bg-gradient-to-r from-yellow-900/10 to-transparent rounded-r-xl shadow-inner">
                                  <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                    <span className="text-yellow-500 font-bold uppercase tracking-widest text-xs">Divine Proof (Qur'an/Sunnah)</span>
                                  </div>
                                  <div className="text-right mb-4">
                                    <p className="text-2xl text-yellow-400 font-bold leading-relaxed" dir="rtl">"{heir.quranProof.arabic}"</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-300 italic text-sm border-l-2 border-slate-700 pl-4 py-1">{heir.quranProof.translation}</p>
                                    <div className="mt-3 inline-block px-3 py-1 bg-slate-800 text-yellow-500 text-xs font-semibold rounded-md border border-slate-700">Ref: {heir.quranProof.reference}</div>
                                  </div>
                                </div>

                                {/* 2. The Madhab Text */}
                                <div className="p-6 border-l-2 border-emerald-600 bg-gradient-to-r from-emerald-900/10 to-transparent rounded-r-xl shadow-inner">
                                  <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                    <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Juristic Text ({getMadhabBookName()})</span>
                                  </div>
                                  <div className="text-right mb-4">
                                    <p className="text-2xl text-emerald-400 font-bold leading-relaxed" dir="rtl">"{heir.madhabProof.arabic}"</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-300 italic text-sm border-l-2 border-slate-700 pl-4 py-1">{heir.madhabProof.translation}</p>
                                    <div className="mt-3 inline-block px-3 py-1 bg-slate-800 text-emerald-500 text-xs font-semibold rounded-md border border-slate-700">Ref: {heir.madhabProof.reference}</div>
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
          </div>
        </div>
      )}

    </div>
  );
}