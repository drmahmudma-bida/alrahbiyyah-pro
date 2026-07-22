"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function ProDashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  // If Clerk is still loading, show a blank screen or spinner
  if (!isLoaded) return <div className="p-8 text-center mt-20">Loading security...</div>;
  
  // If not signed in, Clerk's middleware will catch them, but just in case:
  if (!isSignedIn) return null;

  // The Payment Check
  const hasPaid = user.publicMetadata?.hasPaid === true;

  // The function to trigger Paystack when the button is clicked
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/pay", { method: "POST" });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirects them to the Paystack checkout
      } else {
        alert("Payment gateway error. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 text-center mt-20">
      <h1 className="text-3xl font-bold text-green-700">
        Al-Rahbiyyah Pro Toolkit
      </h1>
      <p className="mt-2 text-gray-600 mb-8">
        Securely logged in as: {user.primaryEmailAddress?.emailAddress}
      </p>

      {hasPaid ? (
        <div className="p-8 bg-green-50 border border-green-200 rounded-lg max-w-2xl mx-auto shadow-sm">
          <h2 className="text-2xl font-bold text-green-800">
            Alhamdulillah! Your Vault is Unlocked.
          </h2>
          <p className="mt-4 text-lg mb-6">Here are your premium tools:</p>
          <div className="flex flex-col gap-4">
            
            {/* 1. PDF E-Book */}
            <a 
              href="/api/download?file=al-madkhal-english.pdf" 
              className="p-4 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700 block text-center"
            >
              Download Al-Madkhal (PDF)
            </a>

            {/* 2. EPUB E-Book */}
            <a 
              href="/api/download?file=al-madkhal-english.epub" 
              className="p-4 bg-indigo-600 text-white font-bold rounded shadow hover:bg-indigo-700 block text-center"
            >
              Download Al-Madkhal (EPUB for Mobile/Tablets)
            </a>

            {/* 3. Wasiyyah Templates Bundle */}
            <a 
              href="/api/download?file=wasiyyah-bundle.zip" 
              className="p-4 bg-gray-800 text-white font-bold rounded shadow hover:bg-gray-900 block text-center"
            >
              Download Wasiyyah Templates (ZIP)
            </a>

            {/* 4. Windows Software Setup & Licensing Instructions */}
            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-left shadow-inner">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">
                🖥️ Al-Madkhal fi 'Ilmil Mirath Activation Guide
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                Your desktop software is secured with hardware-locked licensing. To unlock your copy, follow these steps:
              </p>
              
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-800 mb-6">
                <li>Download the software using the button below.</li>
                <li>Install and open the application on your Windows PC.</li>
                <li>Copy the <strong>Machine ID</strong> displayed on the startup screen.</li>
                <li>Email your Machine ID to <strong>drmahmud2@gmail.com</strong>.</li>
                <li>We will verify your purchase and send you your unique Activation Key!</li>
              </ol>

              {/* Windows SmartScreen Warning Box */}
              <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-sm text-blue-900">
                <strong>🛡️ Note on Windows Security:</strong> Because this is an independently published software, Microsoft Defender may show a blue <em>"Windows protected your PC"</em> screen when you open the installer. This is completely normal. Simply click <strong>"More info"</strong> and then <strong>"Run anyway"</strong> to proceed.
              </div>

              <a 
                href="https://drive.google.com/uc?export=download&id=1P6D3MZ-Ob_V-9aQHk7_mwIGuEay_PJqZ" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-green-600 text-white font-bold rounded shadow hover:bg-green-700 block text-center"
              >
                Download Al-Madkhal Software (Windows .exe)
              </a>
            </div>

          </div>
        </div>
      ) : (
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto shadow-sm">
          <h2 className="text-2xl font-bold text-red-800">
            Your Vault is Currently Locked
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            You have successfully created your secure account. To unlock the Fara'id Software, E-books, and Wasiyyah Templates, please purchase the Master Bundle.
          </p>
          
          <div className="mt-6 mb-2 p-4 bg-white rounded border border-red-100 shadow-sm">
            <div className="text-3xl font-bold text-gray-900">
              ₦15,000 <span className="text-lg font-normal text-gray-500">(approx. $10 USD)</span>
            </div>
            <div className="text-sm text-green-700 mt-2 font-semibold">
              ✨ Early Adopter Pricing — Price will increase when the Mobile App launches!
            </div>
          </div>

          <button 
            onClick={handleCheckout} 
            disabled={isLoading}
            className="mt-4 w-full px-8 py-4 bg-green-600 text-white font-bold text-lg rounded shadow-lg hover:bg-green-700 transition-all disabled:bg-gray-400"
          >
            {isLoading ? "Connecting to Paystack..." : "Buy Now via Paystack (Cards, Bank, USSD)"}
          </button>
        </div>
      )}
    </div>
  );
}