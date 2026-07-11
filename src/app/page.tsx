"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ReviewsSection from '../components/ReviewsSection';
import dynamic from 'next/dynamic';

interface PaystackProps {
  email: string;
  amount: number;
  publicKey: string;
  text: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
  className?: string;
}

const PaystackButton = dynamic<PaystackProps>(
  () => import('react-paystack').then((mod) => mod.PaystackButton as any),
  { ssr: false }
);

export default function LandingPage() {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(1000);
  const [donationEmail, setDonationEmail] = useState('');

  const onSuccess = (reference: any) => {
    alert(`Jazakallahu Khairan! Your donation was successful. Reference: ${reference.reference}`);
    setShowDonationModal(false);
    setDonationAmount(1000);
    setDonationEmail('');
  };

  const onClose = () => {
    console.log("Paystack window closed by user.");
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Al-Rahbiyyah Pro',
      text: 'The Final Word in Islamic Inheritance & Estate Planning. Calculate Shariah shares 100% free.',
      url: 'https://alrahbiyyah.com',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard! You can now paste and share it anywhere.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Account Number Copied!");
  };

  return (
    <main className="min-h-screen bg-[#030610] text-slate-200 font-sans selection:bg-yellow-500/30 overflow-hidden">
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
            The world&apos;s first smart Fara&apos;id (inheritance) ecosystem powered by Matn Al-Rahbiyyah and the authoritative texts of all four Sunni Madhabs. Built for families, scholars, and legal professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full justify-center">
            <Link 
              href="/calculator"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-emerald-600 rounded-full shadow-[0_0_30px_rgba(5,150,105,0.4)] hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(5,150,105,0.6)] transition-all duration-300 border border-emerald-400/50"
            >
              Calculate Inheritance Shares Now — 100% Free
            </Link>
            
            <button 
              onClick={handleShare}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-300 bg-slate-800/50 rounded-full hover:bg-slate-700/50 hover:text-white transition-all duration-300 border border-slate-700 backdrop-blur-sm cursor-pointer"
            >
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
              <p className="text-slate-400 leading-relaxed">Automatically calculate and lock away protective legal shares for pregnant heirs based on your school&apos;s unique rules.</p>
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

      <ReviewsSection />

      {/* --- FOOTER & PRICING TEASER --- */}
      <footer className="border-t border-slate-800 bg-[#030610] pt-12 pb-8 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-2">Transparent Access</h2>
          <p className="text-slate-400 mb-8 max-w-lg">
            The core multi-madhab calculator is <strong className="text-emerald-400">100% free forever</strong>. Advanced features, including court-ready legal Will PDF exports, unlock via a simple premium checkout.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full justify-center items-center">
            <Link href="/calculator" className="px-8 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors border border-slate-700 w-full sm:w-auto text-center">
              Start Free Core
            </Link>
            
            <button 
              onClick={handleShare}
              className="px-8 py-3 flex justify-center items-center bg-slate-800/50 text-slate-300 font-semibold rounded-lg hover:bg-slate-700/50 hover:text-white transition-colors border border-slate-700 cursor-pointer w-full sm:w-auto"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              Share Platform
            </button>

            <button 
              onClick={() => setShowDonationModal(true)}
              className="px-8 py-3 flex justify-center items-center bg-yellow-600/10 text-yellow-500 font-bold rounded-lg hover:bg-yellow-600 hover:text-black transition-all border border-yellow-600/30 shadow-[0_0_15px_rgba(202,138,4,0.1)] w-full sm:w-auto"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              Donate Fisabilillah
            </button>
          </div>
          
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Almahmudiyyah Press. All rights reserved. <br/> Built as the digital companion to The Islamic Estate Blueprint.
          </p>
        </div>
      </footer>

      {/* --- DONATION MODAL --- */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
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

              {/* Option 2: Paystack Gateway Integration */}
              <div>
                <h4 className="text-blue-400 font-bold mb-3 flex items-center text-sm uppercase tracking-wider">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                  Option 2: Secure Online Payment
                </h4>
                
                <div className="space-y-3 mb-4">
                  <input type="email" placeholder="Your Email Address (Optional)" value={donationEmail} onChange={e => setDonationEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₦</span>
                    <input type="number" placeholder="Amount" value={donationAmount} onChange={e => setDonationAmount(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                <PaystackButton
                  email={donationEmail || "donor@alrahbiyyah.com"}
                  amount={Math.max(100, donationAmount) * 100}
                  publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY'}
                  text={`Donate ₦${Math.max(100, donationAmount)} Securely`}
                  onSuccess={onSuccess}
                  onClose={onClose}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all transform hover:scale-[1.02] flex justify-center items-center gap-2 mb-4"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}