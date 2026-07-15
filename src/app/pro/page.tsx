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
            <button className="p-4 bg-green-600 text-white font-bold rounded shadow hover:bg-green-700">Launch Fara'id Pro Calculator</button>
            <button className="p-4 bg-blue-600 text-white font-bold rounded shadow hover:bg-blue-700">Download Al-Madkhal E-Books</button>
            <button className="p-4 bg-gray-800 text-white font-bold rounded shadow hover:bg-gray-900">Download farWasiyyah Templates</button>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto shadow-sm">
          <h2 className="text-2xl font-bold text-red-800">
            Your Vault is Currently Locked
          </h2>
          <p className="mt-4 text-lg">
            You have successfully created your secure account. To unlock the Fara'id Software, E-books, and Templates, please purchase the Master Bundle.
          </p>
          <button 
            onClick={handleCheckout} 
            disabled={isLoading}
            className="mt-8 px-8 py-4 bg-green-600 text-white font-bold text-lg rounded shadow-lg hover:bg-green-700 transition-all disabled:bg-gray-400"
          >
            {isLoading ? "Connecting to Paystack..." : "Buy Now to Unlock (Paystack)"}
          </button>
        </div>
      )}
    </div>
  );
}