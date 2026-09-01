import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from './i18n';
import { AlertCircle } from 'lucide-react';
import VoiceAssistant from './components/VoiceAssistant';
import BhashiniLanguageBar from './components/BhashiniLanguageBar';
import GlobalChatbot from './components/GlobalChatbot';
import Navigation from './components/Navigation';

const PhaseTwo = React.lazy(() => import('./pages/PhaseTwo'));
const StateSchedule = React.lazy(() => import('./pages/StateSchedule'));
const SelfEnumeration = React.lazy(() => import('./pages/SelfEnumeration'));
const TrustSafety = React.lazy(() => import('./pages/TrustSafety'));
const DataViz = React.lazy(() => import('./pages/DataViz'));
const CitizenDashboard = React.lazy(() => import('./pages/CitizenDashboard'));
const LegalTerms = React.lazy(() => import('./pages/LegalTerms'));
const EnumerationSummary = React.lazy(() => import('./pages/EnumerationSummary'));

function App() {
  const { t, i18n } = useTranslation();

  const handleReadPage = () => {
    window.speechSynthesis.cancel();
    const mainContent = document.querySelector('main')?.innerText || "No content found.";
    const utterance = new SpeechSynthesisUtterance(mainContent);
    utterance.lang = i18n.language;
    window.speechSynthesis.speak(utterance);
  };

  const handleStopReading = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 transition-colors duration-200">
        
        <div className="print:hidden bg-amber-50 text-amber-900 px-4 py-2 text-sm flex items-start sm:items-center justify-center gap-2 border-b border-amber-200">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 sm:mt-0" />
          <p className="font-medium">
            {t('disclaimer')}
          </p>
        </div>

        <Navigation 
          t={t} 
          i18n={i18n} 
          handleReadPage={handleReadPage} 
          handleStopReading={handleStopReading} 
        />

        <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
          <BhashiniLanguageBar />

          <React.Suspense fallback={<div className="flex justify-center py-16"><div className="animate-pulse text-slate-400">Loading...</div></div>}>
            <Routes>
              <Route path="/" element={<PhaseTwo />} />
              <Route path="/schedule" element={<StateSchedule />} />
              <Route path="/self-enumeration" element={<SelfEnumeration />} />
              <Route path="/trust" element={<TrustSafety />} />
              <Route path="/data" element={<DataViz />} />
              <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
              <Route path="/terms" element={<LegalTerms />} />
              <Route path="/privacy" element={<LegalTerms />} />
              <Route path="/summary" element={<EnumerationSummary />} />
            </Routes>
          </React.Suspense>
        </main>

        <footer className="print:hidden bg-slate-950 text-slate-400 py-12 text-sm border-t border-slate-800">
          <div className="container mx-auto px-4 max-w-5xl space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white text-base mb-4">Official Sources & Methodology</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Official Portal: <a href="https://censusindia.gov.in/census.website/en" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition-colors duration-150">censusindia.gov.in (ORGI / MHA)</a></li>
                  <li>• Knowledge Partner: <a href="https://en.vikaspedia.in/viewcontent/social-welfare/community-power/census-2027/self-enumeration-in-census-2027?lgn=en" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition-colors duration-150">Vikaspedia (MeitY / C-DAC)</a></li>
                  <li>• Legal Framework: Census Act 1948 & Census Rules 1990</li>
                  <li>• Press Information Bureau (PIB) State Rollout Schedules</li>
                </ul>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <p className="text-sm text-slate-400 leading-relaxed">
                  <strong>Important Reminder:</strong> State schedules and field operation dates have shifted before (e.g. July 2026 revisions). The dates shown here are accurate as of September 2026, but you should always confirm your exact state window on the official portal at <a href="https://se.census.gov.in" target="_blank" rel="noreferrer" className="text-amber-600 hover:text-amber-700 transition-colors duration-150 font-semibold">se.census.gov.in</a>.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-semibold">
              <Link to="/terms" className="hover:text-amber-600 transition-colors duration-150">Terms & Conditions</Link>
              <Link to="/terms" className="hover:text-amber-600 transition-colors duration-150">Privacy Policy (Section 15)</Link>
              <Link to="/terms" className="hover:text-amber-600 transition-colors duration-150">Hyperlinking Policy</Link>
              <Link to="/terms" className="hover:text-amber-600 transition-colors duration-150">Copyright Policy</Link>
              <Link to="/terms" className="hover:text-amber-600 transition-colors duration-150">RTI Exemptions</Link>
            </div>
            
            <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
              <p>Unofficial Prototype • Built for PromptWars x ADYPU</p>
              <div className="flex items-center gap-6 font-bold text-slate-300">
                <span>Census Helpline: <span className="text-emerald-500">1855</span></span>
                <span>Cybercrime Helpline: <span className="text-amber-500">1930</span></span>
              </div>
            </div>
          </div>
        </footer>

        <VoiceAssistant />
        <GlobalChatbot />
      </div>
    </Router>
  );
}

export default App;
