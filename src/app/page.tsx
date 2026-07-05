import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#060b19] text-slate-300 relative overflow-x-hidden selection:bg-yellow-500/30 selection:text-yellow-200">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 px-4 flex flex-col items-center justify-start z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></span>
            The Official Digital Companion to The Islamic Estate Blueprint
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 drop-shadow-lg">
            The Final Word in <br className="hidden md:block" />
            Shariah Estate Planning.
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
            The world's first smart inheritance ecosystem powered by Matn Al-Rahbiyyah and the authoritative texts of all four Sunni Madhabs. Built for families, scholars, and legal professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center">
            <Link 
              href="/calculator"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-emerald-600 rounded-full shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(5,150,105,0.6)] transition-all duration-300 border border-emerald-400/50"
            >
              Calculate Your Estate Now — 100% Free
            </Link>
            
            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-300 bg-slate-800/50 rounded-full hover:bg-slate-700/50 hover:text-white transition-all duration-300 border border-slate-700 backdrop-blur-sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              Share Platform
            </button>
          </div>
        </div>
      </section>

      {/* --- AUTHORITY SECTION: FOUR-SCHOOL MATRIX --- */}
      <section className="py-20 bg-slate-950 border-y border-slate-800/50 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">No More Compromises.</h2>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg">
              Most calculators guess. Al-Rahbiyyah Pro executes the exact mathematical algorithms dictated by the foundational texts of your specific school of jurisprudence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { madhab: "Shafi'i", text: "Matn Al-Rahbiyyah" },
              { madhab: "Hanafi", text: "Al-Sirajiyyah" },
              { madhab: "Maliki", text: "Al-Jaybiyyah" },
              { madhab: "Hanbali", text: "Nazm al-Mufradat" }
            ].map((school, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-yellow-600/50 transition-colors duration-300 group">
                <span className="text-yellow-500 font-semibold mb-2 uppercase tracking-widest text-xs">{school.madhab} School</span>
                <span className="text-white text-lg font-bold group-hover:text-yellow-400 transition-colors">{school.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID: THE LAST BORN --- */}
      <section className="py-24 relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Engineered for Precision.</h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              Advanced feature sets that generic calculators completely lack. Designed to handle the most complex family structures flawlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center text-blue-400 mb-6 border border-blue-700/50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">The Verse-to-Variable Engine</h3>
              <p className="text-slate-400 leading-relaxed">Instantly view the exact classical Arabic verse and English translation that justifies every single decimal split in your calculation.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-emerald-900/50 flex items-center justify-center text-emerald-400 mb-6 border border-emerald-700/50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Unborn Foetus Escrow System</h3>
              <p className="text-slate-400 leading-relaxed">Automatically calculate and lock away protective legal shares for pregnant heirs based on your selected school's unique rules.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-yellow-900/50 flex items-center justify-center text-yellow-400 mb-6 border border-yellow-700/50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Modern Asset Integration</h3>
              <p className="text-slate-400 leading-relaxed">Seamlessly factor in modern financial instruments including digital assets, real estate mortgages, and corporate stock options.</p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-purple-900/50 flex items-center justify-center text-purple-400 mb-6 border border-purple-700/50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">The Pre-Distribution Sequencer</h3>
              <p className="text-slate-400 leading-relaxed">Automatically deduct funeral costs, outstanding debts, and documented Wasiyyah (up to 1/3) before calculating final inheritance shares.</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}