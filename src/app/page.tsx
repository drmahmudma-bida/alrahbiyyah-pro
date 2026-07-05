import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#060b19] relative overflow-hidden flex flex-col items-center justify-start pt-24 pb-16 px-4">
      
      {/* Cinematic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-yellow-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Authority Badge */}
        <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm font-medium tracking-wide">
          <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></span>
          The Official Digital Companion to The Islamic Estate Blueprint
        </div>

        {/* The Main Headline (3D Embossed Gold Effect) */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-700 drop-shadow-lg">
          The Final Word in <br className="hidden md:block" />
          Shariah Estate Planning.
        </h1>

        {/* The Subheadline */}
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
          The world's first smart inheritance ecosystem powered by Matn Al-Rahbiyyah and the authoritative texts of all four Sunni Madhabs. Built for families, scholars, and legal professionals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center">
          <Link 
            href="/calculator"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-emerald-600 rounded-full shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(5,150,105,0.6)] transition-all duration-300 border border-emerald-400/50"
          >
            Calculate Your Estate Now — 100% Free
          </Link>
          
          <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-300 bg-slate-800/50 rounded-full hover:bg-slate-700/50 hover:text-white transition-all duration-300 border border-slate-700 backdrop-blur-sm">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
            </svg>
            Share Platform
          </button>
        </div>

        {/* The Device Mockup Placeholder */}
        <div className="w-full max-w-4xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md aspect-video flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b19] to-transparent z-10 pointer-events-none"></div>
          
          <div className="text-slate-500 flex flex-col items-center">
            <svg className="w-16 h-16 mb-4 opacity-50 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <p className="text-sm tracking-widest uppercase font-semibold">High-Fidelity Device Mockup Space</p>
          </div>
        </div>

      </div>
    </main>
  );
}