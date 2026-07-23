import React from 'react';
import Link from 'next/link'; // Added Next.js Link import

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
  // Removed the fake showLoginModal state completely!

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
        
        {/* --- LIVE EMAIL LINK BUTTON --- */}
        <Link 
          href="mailto:user@almahmudiyyah.com?subject=My Review for Al-Rahbiyyah Pro Toolkit"
          className="px-6 py-3 bg-emerald-600/10 border border-emerald-500/50 text-emerald-400 font-bold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          Write a Review
        </Link>
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
    </div>
  );
}