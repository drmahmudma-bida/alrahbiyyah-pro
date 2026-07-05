import Dashboard from '../../components/Dashboard';
import Link from 'next/link';

export default function CalculatorPage() {
  return (
    <main className="bg-[#060b19] min-h-screen">
      
      {/* Return Home Navigation Bar */}
      <div className="w-full bg-[#030610] border-b border-slate-800 py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-yellow-500 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Return to Homepage
          </Link>
        </div>
      </div>

      {/* The Fara'id Engine */}
      <Dashboard />
      
    </main>
  );
}