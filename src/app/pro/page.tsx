"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link"; // Added for the mobile download link

export default function ProDashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  if (!isLoaded) return <div className="p-8 text-center mt-20">Loading security...</div>;
  if (!isSignedIn) return null;

  const hasPaid = user.publicMetadata?.hasPaid === true;

  // Updated to accept the specific plan they clicked
  const handleCheckout = async (planType: string) => {
    setIsLoading(planType); // Tracks which button is spinning
    try {
      const res = await fetch("/api/pay", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planType }) // Send the chosen plan to the server
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; 
      } else {
        alert("Payment gateway error. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-center mt-12 md:mt-20">
      <h1 className="text-3xl font-bold text-emerald-700">
        Al-Rahbiyyah Pro Toolkit
      </h1>
      <p className="mt-2 text-slate-500 mb-8">
        Securely logged in as: {user.primaryEmailAddress?.emailAddress}
      </p>

      {hasPaid ? (
        /* =========================================
           UNLOCKED STATE (Kept exactly as you had it)
           ========================================= */
        <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-2xl mx-auto shadow-lg">
          <h2 className="text-2xl font-bold text-emerald-800">
            Alhamdulillah! Your Vault is Unlocked.
          </h2>
          <p className="mt-4 text-lg mb-6">Here are your premium tools:</p>
          <div className="flex flex-col gap-4">
            
            <a href="/api/download?file=al-madkhal-english.pdf" className="p-4 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 block text-center">
              Download Al-Madkhal (PDF)
            </a>

            <a href="/api/download?file=al-madkhal-english.epub" className="p-4 bg-indigo-600 text-white font-bold rounded-xl shadow hover:bg-indigo-700 block text-center">
              Download Al-Madkhal (EPUB for Mobile/Tablets)
            </a>

            <a href="/api/download?file=wasiyyah-bundle.zip" className="p-4 bg-slate-800 text-white font-bold rounded-xl shadow hover:bg-slate-900 block text-center">
              Download Wasiyyah Templates (ZIP)
            </a>

            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-left shadow-inner">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">
                🖥️ Al-Madkhal fi 'Ilmil Mirath Activation Guide
              </h3>
              <p className="text-slate-700 mb-4 text-sm">
                Your desktop software is secured with hardware-locked licensing. To unlock your copy, follow these steps:
              </p>
              
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-800 mb-6">
                <li>Download the software using the button below.</li>
                <li>Install and open the application on your Windows PC.</li>
                <li>Copy the <strong>Machine ID</strong> displayed on the startup screen.</li>
                <li>Email your Machine ID to <strong>drmahmud2@gmail.com</strong>.</li>
                <li>We will verify your purchase and send you your unique Activation Key!</li>
              </ol>

              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg text-sm text-blue-900">
                <strong>🛡️ Note on Windows Security:</strong> Because this is an independently published software, Microsoft Defender may show a blue <em>"Windows protected your PC"</em> screen when you open the installer. This is completely normal. Simply click <strong>"More info"</strong> and then <strong>"Run anyway"</strong> to proceed.
              </div>

              <a 
                href="https://drive.google.com/uc?export=download&id=1P6D3MZ-Ob_V-9aQHk7_mwIGuEay_PJqZ" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-emerald-600 text-white font-bold rounded-xl shadow hover:bg-emerald-700 block text-center"
              >
                Download Al-Madkhal Software (Windows .exe)
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================
           LOCKED STATE: THE 3-TIER PRICING GRID
           ========================================= */
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 mb-4">
              Your Vault is Currently Locked
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Select a license below to unlock your practitioner tools. 
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left">
            
            {/* TIER 1: MOBILE APP */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg flex flex-col">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Mobile Edition</h3>
              <p className="text-slate-500 text-sm mb-6">For on-the-go quick calculations.</p>
              <div className="text-4xl font-extrabold text-slate-900 mb-6">
                ₦5,000 <span className="text-lg text-slate-400 font-normal">/device</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Android .apk Download', 'Full Al-Hajb Engine', 'In-App Activation', 'No Desktop Access'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <span className="text-emerald-500 font-bold">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href="/al-madkhal-mobile.apk" 
                className="w-full block text-center py-4 rounded-xl font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all"
              >
                Download Android App
              </Link>
            </div>

            {/* TIER 2: MASTER BUNDLE */}
            <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-8 shadow-2xl flex flex-col relative transform lg:-translate-y-4 z-10">
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
                    <span className="text-yellow-400 font-bold">✓</span> <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleCheckout('bundle')}
                disabled={isLoading !== null}
                className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg transition-all disabled:opacity-50"
              >
                {isLoading === 'bundle' ? "Connecting..." : "Get the Ultimate Bundle"}
              </button>
            </div>

            {/* TIER 3: DESKTOP ONLY */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg flex flex-col">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Desktop Pro</h3>
              <p className="text-slate-500 text-sm mb-6">For detailed office drafting & printing.</p>
              <div className="text-4xl font-extrabold text-slate-900 mb-6">
                ₦15,000 <span className="text-lg text-slate-400 font-normal">/lifetime</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Windows Desktop Toolkit', 'Certified PDF Exports', 'Wasiyyah Implementation', 'Mobile App NOT Included'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <span className="text-emerald-500 font-bold">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleCheckout('desktop')}
                disabled={isLoading !== null}
                className="w-full py-4 rounded-xl font-bold text-slate-700 bg-slate-100 border border-slate-300 hover:bg-slate-200 transition-all disabled:opacity-50"
              >
                 {isLoading === 'desktop' ? "Connecting..." : "Unlock Desktop Vault"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}