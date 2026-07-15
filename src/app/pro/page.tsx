"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function ProDashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoaded) return <div className="p-8 text-center mt-20">Loading security...</div>;
  if (!isSignedIn) return null;

  const hasPaid = user.publicMetadata?.hasPaid === true;

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/pay", { method: "POST" });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; 
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
    <div className="min-h-screen p-8 text-center mt-10">
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
            <button className="p-4 bg-green-600 text-white font-bold rounded shadow hover:bg-green-700">Launch Fara'id Pro Calculator</button>
            <button className="p-4 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700">Download Al-Madkhal E-Books</button>
            <button className="p-4 bg-gray-800 text-white font-bold rounded shadow hover:bg-gray-900">Download farWasiyyah Templates</button>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg max-w-6xl mx-auto shadow-sm">
          <h2 className="text-2xl font-bold text-red-800">
            Your Vault is Currently Locked
          </h2>
          <p className="mt-4 text-lg mb-8">
            To unlock the Fara'id Software, E-books, and Templates, please purchase the Master Bundle using one of the methods below.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            
            {/* OPTION 1: PAYSTACK */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">1. Instant Card Payment</h3>
                <p className="text-sm text-gray-600 mb-4">Pay securely with your card via Paystack. Your account will unlock automatically.</p>
              </div>
              <button 
                onClick={handleCheckout} 
                disabled={isLoading}
                className="w-full py-3 bg-green-600 text-white font-bold rounded shadow hover:bg-green-700 transition-all disabled:bg-gray-400"
              >
                {isLoading ? "Connecting..." : "Pay Now (Automated)"}
              </button>
            </div>

            {/* OPTION 2: OPAY TRANSFER */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Local Bank Transfer</h3>
              <p className="text-sm text-gray-600 mb-4">Transfer NGN directly. Send receipt to our WhatsApp to unlock.</p>
              <div className="bg-gray-50 p-4 rounded border text-sm font-mono text-gray-800 space-y-2">
                <p><strong>Bank:</strong> OPay</p>
                <p><strong>Name:</strong> Muhammad Abdullahi Mahmud</p>
                <p><strong>Account:</strong> 6104806156</p>
              </div>
            </div>

            {/* OPTION 3: USD TRANSFER */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500">
              <h3 className="text-xl font-bold text-gray-800 mb-2">3. USD International Transfer</h3>
              <p className="text-sm text-gray-600 mb-4">Via ACH, Wire, Sendwave, Remitly, or Wise. Send receipt to unlock.</p>
              <div className="bg-gray-50 p-4 rounded border text-xs font-mono text-gray-800 space-y-1">
                <p><strong>Bank:</strong> Lead Bank</p>
                <p><strong>Name:</strong> Muhammad Abdullahi Mahmud</p>
                <p><strong>Account No:</strong> 219503676583</p>
                <p><strong>Routing No:</strong> 101019644</p>
                <p><strong>Type:</strong> Checking</p>
                <p><strong>Address:</strong> 1801 Main St., Kansas City, MO 64108</p>
              </div>
            </div>

          </div>

          <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-200">
            <strong>Notice for Bank Transfers:</strong> If you use OPay or the US Bank Transfer, please send a screenshot of your payment receipt along with this email address (<strong>{user.primaryEmailAddress?.emailAddress}</strong>) to our WhatsApp/Email. We will manually unlock your vault within minutes!
          </div>

        </div>
      )}
    </div>
  );
}