import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Globe, Shield, BarChart2, Volume2, VolumeX, Menu, X, FileText, Scale } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../i18n';

interface NavigationProps {
  t: (key: string) => string;
  i18n: any;
  handleReadPage: () => void;
  handleStopReading: () => void;
}

export default function Navigation({ t, i18n, handleReadPage, handleStopReading }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { to: "/", icon: Home, label: t('nav_home') || "Home" },
    { to: "/schedule", icon: Calendar, label: t('nav_schedule') || "Schedule" },
    { to: "/self-enumeration", icon: Globe, label: t('nav_se') || "Wizard" },
    { to: "/summary", icon: FileText, label: "Summary" },
    { to: "/trust", icon: Shield, label: t('nav_safety') || "Trust" },
    { to: "/data", icon: BarChart2, label: t('nav_data') || "Data" },
    { to: "/citizen-dashboard", icon: Shield, label: "Citizen e-KYC" },
    { to: "/terms", icon: Scale, label: "Legal" }
  ];

  return (
    <header className="print:hidden bg-slate-950 text-white shadow-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="text-xl font-bold flex items-center gap-2 z-50 relative">
            <span className="text-amber-600">CENSUS</span>
            <span className="text-white">2027</span>
            <span className="text-indigo-500">SAHAYAK</span>
          </Link>
          
          {/* Desktop & Tablet Navigation (hidden on mobile, shown on lg screens) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-300">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className={`flex flex-col items-center transition-colors duration-150 rounded p-1 ${isActive ? 'text-amber-600' : 'hover:text-amber-600'}`}
                >
                  <Icon className="w-4 h-4 mb-1" aria-hidden="true" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 z-50 relative">
            {/* Audio Controls */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
              <button onClick={handleReadPage} title="Read page aloud" className="p-1 hover:text-amber-600 text-slate-400 hover:bg-slate-800 rounded transition-colors duration-150" aria-label="Read page aloud">
                <Volume2 className="w-4 h-4" />
              </button>
              <button onClick={handleStopReading} title="Stop reading" className="p-1 hover:text-amber-600 text-slate-400 hover:bg-slate-800 rounded transition-colors duration-150" aria-label="Stop reading">
                <VolumeX className="w-4 h-4" />
              </button>
            </div>

            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <select 
                className="bg-slate-900 border border-slate-800 rounded-lg text-sm px-3 py-1.5 text-slate-200 focus:outline-none focus:border-amber-600 max-w-[130px] truncate transition-colors duration-150"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                aria-label="Select Language"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.englishName})
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out / Drop-down Menu */}
      <div 
        id="mobile-navigation"
        className={`lg:hidden absolute inset-x-0 top-full h-[calc(100vh-61px)] bg-slate-950/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out flex flex-col overflow-hidden origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
        aria-hidden={!isOpen}
      >
        <div className="flex-1 overflow-y-auto px-6 py-8 pb-32 flex flex-col gap-6 h-full">
          <nav className="flex flex-col gap-4 text-lg font-semibold">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link 
                  key={link.to} 
                  to={link.to} 
                  className={`flex items-center gap-4 p-3 rounded-xl transition-colors duration-150 border ${isActive ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-900/50 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'}`}
                  tabIndex={isOpen ? 0 : -1}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="h-px bg-slate-800 my-2"></div>

          {/* Mobile controls (Language + Audio) */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="mobile-lang-select" className="text-sm text-slate-400 font-semibold uppercase tracking-wider">Select Language</label>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-400" />
                <select 
                  id="mobile-lang-select"
                  className="bg-slate-900 border border-slate-700 rounded-xl text-base px-4 py-3 text-slate-200 focus:outline-none focus:border-amber-600 w-full transition-colors duration-150"
                  value={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.englishName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <span className="text-sm text-slate-400 font-semibold uppercase tracking-wider">Accessibility</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleReadPage} 
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white py-3 rounded-xl font-medium transition-colors"
                  tabIndex={isOpen ? 0 : -1}
                  aria-label="Read page aloud"
                >
                  <Volume2 className="w-5 h-5" /> Read
                </button>
                <button 
                  onClick={handleStopReading} 
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white py-3 rounded-xl font-medium transition-colors"
                  tabIndex={isOpen ? 0 : -1}
                  aria-label="Stop reading"
                >
                  <VolumeX className="w-5 h-5" /> Stop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
