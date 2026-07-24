"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link"; 

export default function ProDashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  if (!isLoaded) return <div className="p-8 text-center mt-20">Loading security...</div>;
  if (!isSignedIn) return null;

  const hasPaid = user.publicMetadata?.hasPaid === true;
  // This checks if they bought the bundle (defaults to desktop for older users)
  const userPlan = user.publicMetadata?.plan as string || "desktop"; 
  const isBundle = userPlan === "bundle";

  const handleCheckout = async (planType: string) => {
    setIsLoading(planType); 
    try {
      const res = await fetch("/api/pay", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planType }) 
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
           UNLOCKED STATE (Smart Vault)
           ========================================= */
        <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-3xl mx-auto shadow-lg">
          <h2 className="text-2xl font-bold text-emerald-800">
            Alhamdulillah! Your Vault is Unlocked.
          </h2>
          <p className="mt-4 text-lg mb-6 text-slate-700">Here are your premium professional tools:</p>
          
          <div className="flex flex-col gap-4">
            
            {/* Standard E-Books & Templates (Available to Desktop & Bundle) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <a href="/api/download?file=al-madkhal-english.pdf" className="p-4 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 flex items-center justify-center text-sm">
                Download PDF Book
              </a>
              <a href="/api/download?file=al-madkhal-english.epub" className="p-4 bg-indigo-600 text-white font-bold rounded-xl shadow hover:bg-indigo-700 flex items-center justify-center text-sm">
                Download EPUB Book
              </a>
              <a href="/api/download?file=wasiyyah-bundle.zip" className="p-4 bg-slate-800 text-white font-bold rounded-xl shadow hover:bg-slate-900 flex items-center justify-center text-sm">
                Wasiyyah Templates
              </a>
            </div>

            {/* Bundle Exclusive: Mobile App Download */}
            {isBundle && (
              <div className="p-6 bg-teal-50 border border-teal-200 rounded-xl text-left shadow-inner mt-4">
                <h3 className="text-xl font-bold text-teal-800 mb-2">
                  📱 Mobile App Download (Master Bundle Exclusive)
                </h3>
                <p className="text-slate-700 mb-4 text-sm">
                  Download the Android APK file directly to your phone to calculate Fara'id on the go.
                </p>

                <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg text-sm text-yellow-900">
                  <strong>🛡️ Android Security Warning:</strong> Because you are downloading this app directly outside the Google Play Store, your phone will show a warning about <em>"Unknown Sources"</em> or <em>"Harmful Files."</em> This is completely normal for independent software. Simply tap <strong>Settings</strong> on the warning popup and enable <strong>"Allow from this source"</strong> (or tap "Download anyway") to install.
                </div>

                <a 
                  href="https://drive.google.com/file/d/1H5tRiprKkVWAi6U6fbCLiDkqRGS9Qaml/view?usp=sharing" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-teal-600 text-white font-bold rounded-xl shadow hover:bg-teal-700 block text-center"
                >
                  Download Mobile App (.apk)
                </a>
              </div>
            )}

            {/* Desktop Software Instructions (Available to Desktop & Bundle) */}
            <div className="mt-4 p-6 bg-yellow-50 border border-yellow-200 rounded-xl text-left shadow-inner">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">
                🖥️ Windows Desktop Activation Guide
              </h3>
              <p className="text-slate-700 mb-4 text-sm">
                Your desktop software is secured with hardware-locked licensing. To unlock your copy, follow these steps:
              </p>
              
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-800 mb-6 font-medium">
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
              <ul className="space-y-4 mb-6 flex-1">
                {['Android .apk Download', 'Full Al-Hajb Engine', 'In-App Activation', 'No Desktop Access'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600">
                    <span className="text-emerald-500 font-bold">✓</span> {feature}
                  </li>
                ))}
              </ul>
              
              {/* THE ANDROID WARNING FOR DIRECT DOWNLOAD */}
              <div className="mb-6 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg text-xs text-yellow-900 leading-tight">
                <strong>🛡️ Android Warning:</strong> Your phone may flag this as an "Unknown Source". Tap <strong>Settings</strong> and <strong>"Allow from this source"</strong> to install safely.
              </div>

              <a 
                href="https://drive.google.com/file/d/1H5tRiprKkVWAi6U6fbCLiDkqRGS9Qaml/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-4 rounded-xl font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all mt-auto"
              >
                Download Android App
              </a>
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
                className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg transition-all disabled:opacity-50 mt-auto"
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
                className="w-full py-4 rounded-xl font-bold text-slate-700 bg-slate-100 border border-slate-300 hover:bg-slate-200 transition-all disabled:opacity-50 mt-auto"
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