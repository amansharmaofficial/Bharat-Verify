
import React, { useState } from 'react';
import AnalysisTool from './components/AnalysisTool';
import EducationCenter from './components/EducationCenter';
import VerificationHistory from './components/VerificationHistory';
import Logo from './components/Logo';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'verify' | 'history' | 'education' | 'community'>('verify');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <button onClick={() => setActiveTab('verify')} className="focus:outline-none">
            <Logo showText={true} size={42} />
          </button>

          <nav className="hidden lg:flex items-center bg-gray-50 p-1 rounded-2xl border border-gray-100">
            <button 
              onClick={() => setActiveTab('verify')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'verify' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Verify
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              History
            </button>
            <button 
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'education' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Academy
            </button>
            <button 
              onClick={() => setActiveTab('community')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'community' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Feed
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
              <i className="fa-solid fa-bell"></i>
            </button>
            <div className="hidden sm:block h-8 w-px bg-gray-200 mx-1"></div>
            
            <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider">
               Local Mode
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50/50">
        {activeTab === 'verify' && (
          <div className="py-8">
            <div className="max-w-4xl mx-auto px-4 text-center mb-10">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Identify the Truth in Seconds</h2>
              <p className="text-lg text-gray-600">Analyze news, articles, and images for manipulation using cutting-edge Gemini AI.</p>
            </div>
            <AnalysisTool />
          </div>
        )}

        {activeTab === 'history' && <VerificationHistory />}

        {activeTab === 'education' && <EducationCenter />}

        {activeTab === 'community' && (
          <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
              <i className="fa-solid fa-users text-4xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Verification Feed</h2>
            <p className="text-gray-500 mb-8">This section features content flagged by the community and reviewed by accredited fact-checkers. Coming soon.</p>
            <button className="text-blue-600 font-bold hover:underline" onClick={() => setActiveTab('verify')}>
              Go back to verification tool
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 h-20 flex items-center justify-around z-50">
        <button 
          onClick={() => setActiveTab('verify')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'verify' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <i className="fa-solid fa-shield-check text-xl"></i>
          <span className="text-[10px] font-bold uppercase">Verify</span>
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <i className="fa-solid fa-clock-rotate-left text-xl"></i>
          <span className="text-[10px] font-bold uppercase">History</span>
        </button>
        <button 
          onClick={() => setActiveTab('education')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'education' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <i className="fa-solid fa-graduation-cap text-xl"></i>
          <span className="text-[10px] font-bold uppercase">Academy</span>
        </button>
        <button 
          onClick={() => setActiveTab('community')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'community' ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <i className="fa-solid fa-earth-asia text-xl"></i>
          <span className="text-[10px] font-bold uppercase">Feed</span>
        </button>
      </div>

      {/* Footer (Desktop) */}
      <footer className="hidden lg:block py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-12 mb-12">
            <div className="col-span-1">
              <Logo showText={true} size={32} className="mb-6" />
              <p className="text-sm text-gray-500 leading-relaxed">Combatting misinformation across Bharat through advanced AI technology and community engagement.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-600">Text Verification</a></li>
                <li><a href="#" className="hover:text-blue-600">Image Forensic</a></li>
                <li><a href="#" className="hover:text-blue-600">Video Analysis</a></li>
                <li><a href="#" className="hover:text-blue-600">Fact-Check API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-600">Digital Literacy</a></li>
                <li><a href="#" className="hover:text-blue-600">Deepfake Guide</a></li>
                <li><a href="#" className="hover:text-blue-600">Partner Program</a></li>
                <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Integrations</h4>
              <div className="flex gap-4">
                <a href="#" className="text-2xl text-gray-400 hover:text-blue-600 transition-colors"><i className="fa-brands fa-whatsapp"></i></a>
                <a href="#" className="text-2xl text-gray-400 hover:text-blue-400 transition-colors"><i className="fa-brands fa-twitter"></i></a>
                <a href="#" className="text-2xl text-gray-400 hover:text-blue-700 transition-colors"><i className="fa-brands fa-facebook"></i></a>
              </div>
              <p className="mt-4 text-[10px] text-gray-400 font-medium">Available in Hindi, Marathi, Bengali, Tamil, Telugu, and English.</p>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">© 2025 Bharat Verify. All data is stored locally on your device.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600">Terms of Service</a>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600">Ethical AI Principles</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
