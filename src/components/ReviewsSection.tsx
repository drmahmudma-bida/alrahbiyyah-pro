import React, { useState } from 'react';

// Temporary Dummy Data (Until we connect the database)
const DUMMY_REVIEWS = [
  {
    id: 1,
    name: "Sheikh Abdullah M.",
    role: "Islamic Scholar",
    avatar: "A",
    rating: 5,
    date: "July 2, 2026",
    text: "The precision of the Al-Gharrawayn and Mushtarakah calculations across the four Madhahib is unprecedented. A monumental tool for Fara'id students."
  },
  {
    id: 2,
    name: "Dr. Fatima S.",
    role: "Legal Practitioner",
    avatar: "F",
    rating: 5,
    date: "June 28, 2026",
    text: "Finally, a calculator that dynamically handles the Grandfather vs. Siblings Muqasamah accurately. The UI is incredibly intuitive."
  },
  {
    id: 3,
    name: "Umar K.",
    role: "Estate Planner",
    avatar: "U",
    rating: 4,
    date: "July 5, 2026",
    text: "Brilliant software. The inclusion of the exact Arabic juristic texts from Matn Al-Rahbiyyah provides absolute transparency."
  }
];

export default function ReviewsSection() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Helper to render gold stars
  const renderStars = (count: number) => {
    return [...Array(5)].map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < count ? 'text-yellow-500' : 'text-slate-700'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 mt-12 mb-24">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
            Community & Scholar Reviews
          </h2>
          <p className="text-slate-400 mt-2">Verified feedback from legal experts, scholars, and estate planners.</p>
        </div>
        
        <button 
          onClick={() => setShowLoginModal(true)}
          className="px-6 py-3 bg-emerald-600/10 border border-emerald-500/50 text-emerald-400 font-bold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          Write a Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_REVIEWS.map((review) => (
          <div key={review.id} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-yellow-600/30 transition-all">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-slate-800 flex items-center justify-center font-bold text-white shadow-inner">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{review.name}</h4>
                    <span className="text-xs text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-800/50">
                      {review.role}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {renderStars(review.rating)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                "{review.text}"
              </p>
            </div>
            <div className="text-xs text-slate-500 border-t border-slate-800 pt-3 mt-auto">
              Reviewed on {review.date}
            </div>
          </div>
        ))}
      </div>

      {/* Fake Login Modal (Will be replaced by NextAuth later) */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-700/50">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Authentication Required</h3>
              <p className="text-slate-400 text-sm">To maintain the integrity of Al-Rahbiyyah Pro, please sign in to leave a verified review.</p>
            </div>

            <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-3 mb-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Sign in with Google
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">Backend integration coming in Phase 2.</p>
          </div>
        </div>
      )}

    </div>
  );
}