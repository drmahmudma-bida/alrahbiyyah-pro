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
            Islamic Inheritance <span className="text-3xl md:text-5xl text-yellow-600/80">& Estate Planning</span>.
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
            The world's first smart Fara'id (inheritance) ecosystem powered by Matn Al-Rahbiyyah and the authoritative texts of all four Sunni Madhabs. Built for families, scholars, and legal professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center">
            <Link 
              href="/calculator"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-emerald-600 rounded-full shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(5,150,105,0.6)] transition-all duration-300 border border-emerald-400/50"
            >
              Calculate Inheritance Shares Now — 100% Free
            </Link>
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

      {/* --- FEATURE GRID --- */}
      <section className="py-24 relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Engineered for Precision.</h2>
            <p className="text-slate-400 text-lg max-w-2xl">
              Advanced feature sets that generic calculators completely lack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center"><span className="text-blue-400 mr-3">❖</span> The Verse-to-Variable Engine</h3>
              <p className="text-slate-400 leading-relaxed">Instantly view the exact classical Arabic verse and English translation that justifies every single decimal split.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center"><span className="text-emerald-400 mr-3">❖</span> Unborn Foetus Escrow System</h3>
              <p className="text-slate-400 leading-relaxed">Automatically calculate and lock away protective legal shares for pregnant heirs based on your school's unique rules.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center"><span className="text-yellow-400 mr-3">❖</span> Modern Asset Integration</h3>
              <p className="text-slate-400 leading-relaxed">Seamlessly factor in digital assets, real estate mortgages, and corporate stock options.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center"><span className="text-purple-400 mr-3">❖</span> The Pre-Distribution Sequencer</h3>
              <p className="text-slate-400 leading-relaxed">Automatically deduct funeral costs and outstanding debts before calculating final inheritance shares.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DUAL-AUDIENCE PORTAL --- */}
      <section className="py-20 bg-[#0a1128] border-y border-slate-800/50 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#060b19] border border-slate-700 rounded-2xl p-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-2xl">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold text-white mb-4">For the Public</h3>
              <p className="text-slate-400 mb-8">Protect Your Family. Generate a bulletproof, Shariah-compliant Islamic Will (Wasiyyah) and direct inheritance breakdown in minutes.</p>
              <Link href="/calculator" className="mt-auto px-6 py-3 border border-emerald-500 text-emerald-400 rounded-full hover:bg-emerald-900/30 transition-colors w-full font-semibold">Start Family Plan</Link>
            </div>
            
            <div className="bg-[#060b19] border border-yellow-700/50 rounded-2xl p-10 text-center flex flex-col items-center shadow-[0_0_30px_rgba(202,138,4,0.05)]">
              <div className="w-16 h-16 bg-yellow-900/30 border border-yellow-700/50 rounded-full flex items-center justify-center mb-6 text-2xl">⚖️</div>
              <h3 className="text-2xl font-bold text-yellow-500 mb-4">For Specialists</h3>
              <p className="text-slate-400 mb-8">For Imams, Lawyers, and Scholars. Access multi-client dashboards, cross-school mathematical overrides, and deep academic PDF reporting.</p>
              <Link href="/calculator" className="mt-auto px-6 py-3 bg-yellow-600 text-black rounded-full hover:bg-yellow-500 transition-colors w-full font-bold">Access Pro Tools</Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST & PRIVACY BADGES --- */}
      <section className="py-16 relative z-10 px-4">
        <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-700 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <svg className="w-10 h-10 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <div>
              <h4 className="text-white font-bold">Certified Accuracy</h4>
              <p className="text-sm text-slate-400">Mathematical algorithms verified by Muftis and Estate Attorneys.</p>
            </div>
          </div>
          <div className="w-px h-12 bg-slate-700 hidden md:block"></div>
          <div className="flex items-center gap-4">
            <svg className="w-10 h-10 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <div>
              <h4 className="text-white font-bold">Bank-Grade Privacy</h4>
              <p className="text-sm text-slate-400">Your data is encrypted. We do not store sensitive asset structures on public servers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER & PRICING TEASER --- */}
      <footer className="border-t border-slate-800 bg-[#030610] pt-12 pb-8 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-2">Transparent Access</h2>
          <p className="text-slate-400 mb-8 max-w-lg">
            The core multi-madhab calculator is <strong className="text-emerald-400">100% free forever</strong>. Advanced features, including court-ready legal Will PDF exports, unlock via a simple premium checkout.
          </p>
          
          <div className="flex gap-4 mb-12">
            <Link href="/calculator" className="px-8 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors border border-slate-700">
              Start Free Core
            </Link>
            <button className="px-8 py-3 flex items-center bg-yellow-600/10 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-600/20 transition-colors border border-yellow-600/30">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              Share Platform
            </button>
          </div>
          
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Almahmudiyyah Press. All rights reserved. <br/> Built as the digital companion to The Islamic Estate Blueprint.
          </p>
        </div>
      </footer>

    </main>
  );
}