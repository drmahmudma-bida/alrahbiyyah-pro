import React, { useState } from 'react';
// These imports assume you have your math engine and proofs files ready
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

  // 2. Pre-Distribution Financial State (The Sequencer)
  const [finances, setFinances] = useState({
    grossEstate: '',
    funeralCosts: '',
    debts: '',
    wasiyyah: ''
  });

  // 3. Currency Selector State (Defaults to Naira)
  const [currency, setCurrency] = useState('₦');

  // 4. Shariah Sequencer Math (Calculates automatically)
  const gross = parseFloat(finances.grossEstate) || 0;
  const funeral = parseFloat(finances.funeralCosts) || 0;
  const debts = parseFloat(finances.debts) || 0;
  const requestedWasiyyah = parseFloat(finances.wasiyyah) || 0;

  // Step A: Deduct Funeral & Debts first
  const remainderAfterDebts = Math.max(0, gross - funeral - debts);
  
  // Step B: Calculate maximum Wasiyyah (Strict 1/3 limit of what remains)
  const wasiyyahMaxLimit = remainderAfterDebts / 3;
  
  // Step C: Apply Wasiyyah (cap it if they enter too much)
  const appliedWasiyyah = Math.min(requestedWasiyyah, wasiyyahMaxLimit);
  const isWasiyyahExceeded = requestedWasiyyah > wasiyyahMaxLimit;
  
  // Step D: The Final Tarikah (Net Estate) available for Fara'id division
  const netEstate = remainderAfterDebts - appliedWasiyyah;

  // Helper to handle input typing smoothly
  const handleFinanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinances(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      
      {/* --- STEP 1: PRE-DISTRIBUTION SEQUENCER --- */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-xl mb-8 relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 relative z-10 gap-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold text-lg mr-4 border border-blue-700/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]">1</div>
            <div>
              <h2 className="text-2xl font-bold text-white">Pre-Distribution Sequencer</h2>
              <p className="text-slate-400 text-sm mt-1">Determine the exact Net Estate (Tarikah) before Fara'id division.</p>
            </div>
          </div>
          
          {/* CURRENCY SELECTOR DROPDOWN */}
          <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 w-max">
            <span className="text-slate-400 text-sm mr-2">Currency:</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-transparent text-yellow-500 font-bold focus:outline-none cursor-pointer appearance-none pr-4"
            >
              <option value="₦">NGN (₦)</option>
              <option value="$">USD ($)</option>
              <option value="£">GBP (£)</option>
              <option value="€">EUR (€)</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
          {/* Gross Estate */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Total Gross Estate Value</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">{currency}</span>
              <input 
                type="number" 
                name="grossEstate"
                value={finances.grossEstate}
                onChange={handleFinanceChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all shadow-inner"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Funeral Costs */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Funeral & Burial Expenses</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/70 font-bold">-{currency}</span>
              <input 
                type="number" 
                name="funeralCosts"
                value={finances.funeralCosts}
                onChange={handleFinanceChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all shadow-inner"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Debts */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Outstanding Debts</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500/70 font-bold">-{currency}</span>
              <input 
                type="number" 
                name="debts"
                value={finances.debts}
                onChange={handleFinanceChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all shadow-inner"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Wasiyyah */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">Documented Will (Wasiyyah)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600/70 font-bold">-{currency}</span>
              <input 
                type="number" 
                name="wasiyyah"
                value={finances.wasiyyah}
                onChange={handleFinanceChange}
                className={`w-full bg-slate-950 border ${isWasiyyahExceeded ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-yellow-500 focus:ring-yellow-500'} rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-1 transition-all shadow-inner`}
                placeholder="0.00"
              />
            </div>
            {/* The Auto-Warning for Exceeding 1/3 */}
            {isWasiyyahExceeded && (
               <p className="text-red-400 text-sm mt-2 flex items-center font-medium animate-pulse">
                 <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                 Shariah Cap Applied: Maximum 1/3 allowed is {currency}{wasiyyahMaxLimit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
               </p>
            )}
          </div>
        </div>

        {/* Tarikah Summary Banner */}
        <div className="bg-[#030610] border border-emerald-900/50 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center relative overflow-hidden z-10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-transparent pointer-events-none"></div>
          <div className="mb-4 md:mb-0 relative z-10">
            <h3 className="text-slate-300 font-bold text-lg mb-1">Final Net Estate (Tarikah)</h3>
            <p className="text-sm text-emerald-400/80">Available for Fara'id division after all mandatory deductions.</p>
          </div>
          <div className="relative z-10 text-right flex items-center justify-end">
            <span className="text-2xl text-emerald-500 mr-2 font-bold">{currency}</span>
            <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-sm">
              {netEstate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* --- NEXT STEPS PLACEHOLDERS --- */}
      {/* We will build the Madhab Selector and Heirs Input Grid here next */}
      
    </div>
  );
}