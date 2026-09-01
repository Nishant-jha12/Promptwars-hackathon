import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Users, MapPin, CalendarClock, Target, AlertTriangle, Info } from 'lucide-react';

export default function PhaseTwo() {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8">
      
      {/* Orchestrated Entrance: Hero Block */}
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 p-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold max-w-2xl mx-auto">
          <Info className="w-5 h-5 shrink-0 text-indigo-600" />
          {t('phase2_banner', "Phase II is already underway in Ladakh and snow-bound districts, since 17 August 2026.")}
        </div>

        <div className="space-y-4 pt-8">
          <span className="text-sm font-semibold text-indigo-600">
            {t('hero_badge', "16th National Census, 8th After Independence")}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('hero_title', "India's First Digital Census")}
          </h1>
          <p className="text-lg font-normal text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('hero_desc', "Under the Census Act 1948 and Census Rules 1990, Census 2027 is India's first fully digital census. Understand your timeline, what data is collected, and how to participate securely.")}
          </p>
        </div>
      </div>

      {/* Quick Start Navigation */}
      <div className="grid sm:grid-cols-3 gap-4 animate-fade-in-up [animation-delay:75ms] max-w-4xl mx-auto">
        <Link to="/schedule" className="bg-white border border-slate-200 hover:border-amber-600 hover:shadow-md p-4 rounded-xl flex items-center gap-3 transition-all duration-150 group">
          <div className="bg-slate-50 group-hover:bg-amber-50 p-2 rounded-lg text-slate-600 group-hover:text-amber-600 transition-colors shrink-0">
            <CalendarClock className="w-5 h-5" />
          </div>
          <div className="font-semibold text-slate-900 group-hover:text-amber-900 text-sm">Find my state's dates</div>
        </Link>
        <Link to="/self-enumeration" className="bg-white border border-slate-200 hover:border-amber-600 hover:shadow-md p-4 rounded-xl flex items-center gap-3 transition-all duration-150 group">
          <div className="bg-slate-50 group-hover:bg-amber-50 p-2 rounded-lg text-slate-600 group-hover:text-amber-600 transition-colors shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div className="font-semibold text-slate-900 group-hover:text-amber-900 text-sm">Start self-enumeration</div>
        </Link>
        <Link to="/trust" className="bg-white border border-slate-200 hover:border-amber-600 hover:shadow-md p-4 rounded-xl flex items-center gap-3 transition-all duration-150 group">
          <div className="bg-slate-50 group-hover:bg-amber-50 p-2 rounded-lg text-slate-600 group-hover:text-amber-600 transition-colors shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="font-semibold text-slate-900 group-hover:text-amber-900 text-sm">Check suspicious message</div>
        </Link>
      </div>

      {/* Orchestrated Entrance: Cards Block (delayed) */}
      <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up [animation-delay:150ms]">
        
        {/* Phase I Card */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-slate-50 p-8 border-b border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white border border-slate-200 text-slate-700 p-3 rounded-xl shadow-sm">
                <Home className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('phase1', "Phase I: Houselisting & Housing Census")}</h2>
            </div>
            <div className="space-y-1">
              <p className="text-slate-900 font-semibold flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-slate-400" /> {t('phase1_dates', "1 April – 30 September 2026")}
              </p>
              <p className="text-sm font-normal text-slate-500 pl-7">
                {t('phase1_window', "A 30-day window set by each State/UT")}
              </p>
            </div>
          </div>
          
          <div className="p-8 space-y-8 flex-1">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" /> {t('phase1_what', "What is collected?")}
              </h3>
              <ul className="space-y-3 text-slate-600 font-normal">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                  <span>{t('phase1_i1', "Housing conditions and building materials")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                  <span>{t('phase1_i2', "Household amenities like water, electricity, and LPG")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                  <span>{t('phase1_i3', "Household assets including vehicles and electronics")}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" /> {t('phase1_digital', "Digital Innovation")}
              </h3>
              <div className="bg-slate-50 rounded-xl p-4 text-sm font-normal text-slate-600 border border-slate-200 space-y-3">
                <p>{t('phase1_geo1', "Every building is geo-tagged for the first time.")}</p>
                <p>{t('phase1_geo2', "Field Enumerators collect data using the official HLO Mobile Application.")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase II Card */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-slate-50 p-8 border-b border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white border border-slate-200 text-slate-700 p-3 rounded-xl shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('phase2', "Phase II: Population Enumeration")}</h2>
            </div>
            <div className="space-y-1">
              <p className="text-slate-900 font-semibold flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-slate-400" /> {t('phase2_dates', "February 2027")}
              </p>
              <p className="text-sm font-normal text-slate-500 pl-7">
                {t('phase2_window', "Reference Date: 1 March 2027. Snow-bound areas: Sept 2026")}
              </p>
            </div>
          </div>
          
          <div className="p-8 space-y-8 flex-1 flex flex-col">
            <div className="space-y-4 flex-1">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-600" /> {t('phase2_what', "What is collected?")}
              </h3>
              <ul className="space-y-3 text-slate-600 font-normal">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                  <span>{t('phase2_i1', "Demographic and socio-economic data")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                  <span>{t('phase2_i2', "Migration and fertility data")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                  <span>{t('phase2_i3', "Caste enumeration: a self-declared open answer, not sorted into a fixed list, the first time since 1931.")}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-50 text-amber-900 p-4 rounded-xl border border-amber-200 flex items-start gap-3 mt-8">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
              <p className="text-sm font-semibold">
                {t('phase2_note', "Important: Population numbers for 2027 are NOT YET published. The census is still mid-collection.")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
