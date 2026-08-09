"use client";

export default function ProLandingPage() {
  // 👇 REPLACE THIS WITH YOUR ACTUAL WHATSAPP NUMBER (e.g., 2348012345678)
  const WHATSAPP_NUMBER = "2348110350355"; 

  const handleWhatsApp = (planType: string) => {
    let message = "";

    if (planType === 'bundle') {
      message = "Hello Dr. Mahmud, I am interested in unlocking the Fara'id Master Bundle (₦12,000). Please guide me on how to make the payment and receive my files.";
    } else if (planType === 'desktop') {
      message = "Hello Dr. Mahmud, I am interested in unlocking the Fara'id Desktop Pro (₦10,000). Please guide me on how to make the payment and receive my files.";
    } else if (planType === 'mobile') {
      message = "Hello Dr. Mahmud, I am interested in unlocking the Fara'id Mobile Edition (₦5,000). Please guide me on how to make the payment and receive my app.";
    }

    // Encode the message so it formats correctly in the web URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen p-4 md:p-8 text-center mt-12 md:mt-20">
      <h1 className="text-3xl font-bold text-emerald-700">
        Al-Rahbiyyah Pro Toolkit
      </h1>
      <p className="mt-2 text-slate-500 mb-8">
        Select a license below to unlock your practitioner tools.
      </p>

      {/* =========================================
          THE 3-TIER PRICING GRID (PUBLIC)
          ========================================= */}
      <div className="w-full max-w-6xl mx-auto">
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
            
            <div className="mb-6 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg text-xs text-yellow-900 leading-tight">
              <strong>🛡️ Android Warning:</strong> Your phone may flag this as an "Unknown Source". Tap <strong>Settings</strong> and <strong>"Allow from this source"</strong> to install safely.
            </div>

            {/* DIRECT WHATSAPP LINK FOR MOBILE */}
            <button 
              onClick={() => handleWhatsApp('mobile')}
              className="w-full py-4 rounded-xl font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all mt-auto"
            >
              Get Mobile App via WhatsApp
            </button>
          </div>

          {/* TIER 2: MASTER BUNDLE */}
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-8 shadow-2xl flex flex-col relative transform lg:-translate-y-4 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-bold text-white mb-2">The Master Bundle</h3>
            <p className="text-emerald-200 text-sm mb-6">The ultimate toolkit for serious practitioners.</p>
            <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 mb-6">
              ₦12,000 <span className="text-lg text-emerald-400 font-normal">/lifetime</span>
            </div>
            
            <div className="mt-2 mb-8 flex-1">
              <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wide border-b border-slate-700 pb-2 mb-4">
                Includes Everything in Tier 1 & Desktop Pro:
              </h4>
              <div className="space-y-5">
                <div className="flex items-start">
                  <span className="text-blue-400 text-xl mr-3">📚</span>
                  <div>
                    <h5 className="font-bold text-white text-sm">I. Core Commentary Volume</h5>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      <span className="font-bold text-white">Islamic Inheritance Made Easy:</span> The Islamic Estate Blueprint — A Layman’s Guide to Wills, Debts and Divine Shares (PDF & EPUB)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-400 text-xl mr-3">💻</span>
                  <div>
                    <h5 className="font-bold text-white text-sm">II. Fara'id Desktop App</h5>
                    <p className="text-xs text-slate-300 mt-1">Automated Windows (.exe) software.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 text-xl mr-3">📝</span>
                  <div>
                    <h5 className="font-bold text-white text-sm">III. Wasiyyah Template Pack</h5>
                    <p className="text-xs text-slate-300 mt-1">Customizable Word (.docx) legal schedules.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-teal-400 text-xl mr-3">📱</span>
                  <div>
                    <h5 className="font-bold text-white text-sm">IV. Fara'id Mobile Edition</h5>
                    <p className="text-xs text-slate-300 mt-1">Android (.apk) app with VIP Unlock.</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleWhatsApp('bundle')}
              className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-lg transition-all mt-auto"
            >
              Get the Ultimate Bundle via WhatsApp
            </button>
          </div>

          {/* TIER 3: DESKTOP PRO */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg flex flex-col">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Desktop Pro</h3>
            <p className="text-slate-500 text-sm mb-6">For detailed office drafting & printing.</p>
            <div className="text-4xl font-extrabold text-slate-900 mb-6">
              ₦10,000 <span className="text-lg text-slate-400 font-normal">/lifetime</span>
            </div>
            
            <div className="mt-2 mb-8 flex-1">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2 mb-4">
                Ecosystem Bundle Includes:
              </h4>
              <div className="space-y-5">
                <div className="flex items-start">
                  <span className="text-blue-600 text-xl mr-3">📚</span>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">I. Core Commentary Volume</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      <span className="font-bold text-slate-900">Islamic Inheritance Made Easy:</span> The Islamic Estate Blueprint (PDF & EPUB)
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-600 text-xl mr-3">💻</span>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">II. Fara'id Calculator App</h5>
                    <p className="text-xs text-slate-600 mt-1">Automated Windows (.exe) software.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-600 text-xl mr-3">📝</span>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">III. Wasiyyah Template Pack</h5>
                    <p className="text-xs text-slate-600 mt-1">Customizable Word (.docx) legal schedules.</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleWhatsApp('desktop')}
              className="w-full py-4 rounded-xl font-bold text-slate-700 bg-slate-100 border border-slate-300 hover:bg-slate-200 transition-all mt-auto"
            >
               Unlock Desktop Vault via WhatsApp
            </button>
          </div>

        </div>

        {/* --- SOFTWARE ACTIVATION NOTICE --- */}
        <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-left max-w-3xl mx-auto shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            🖥️ 📱 Important: How Software Activation Works
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Both your <strong>Desktop PC</strong> and <strong>Mobile Android</strong> applications are secured with hardware-locked licensing. To fully unlock your software <strong>after payment</strong>, follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm text-slate-700 font-medium mb-4">
            <li>Download your software files provided after purchase.</li>
            <li>Install and open the application on your device.</li>
            <li>Copy the unique <strong>Machine ID / Device ID</strong> displayed on the startup screen.</li>
            <li>Send your ID via WhatsApp or email it to <strong>drmahmud2@gmail.com</strong>.</li>
            <li>I will verify your purchase and send you your unique Activation Key!</li>
          </ol>

          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg text-sm text-blue-900">
            <strong>🛡️ Installation Security Note:</strong> Because this is an independently published professional tool, your device may show a security warning. For Windows, click <em>"More info"</em> then <em>"Run anyway"</em>. For Android, allow installation from <em>"Unknown Sources"</em> in your settings.
          </div>
        </div>

      </div>
    </div>
  );
}