import React from 'react';
import { useTranslation } from 'react-i18next';
import { Scale, AlertTriangle, CheckCircle2, Lock } from 'lucide-react';

export default function LegalTerms() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Scale className="w-4 h-4 text-indigo-600" /> Framework & Disclaimer
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Legal & Privacy Framework
        </h1>
        <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Understanding the Census Act, 1948 and important context regarding this application.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
          <Scale className="w-8 h-8 text-indigo-600 shrink-0" />
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">The law behind the census</h2>
        </div>
        
        <p className="text-slate-600 font-medium">
          Under the Census Act, 1948, both citizens and census officials have specific legal rights and duties.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg">Section 8 - The legal duty to answer</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Citizens are legally bound to answer census questions to the best of their knowledge and belief.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg">Section 9 - Reasonable access</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              A census officer has a legal right to reasonable access to a residence for enumeration purposes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg">Section 10 - Filling the schedule</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Citizens have a duty to fill in a census schedule when required to do so by an authorized officer.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg">Section 11 - Penalties</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Refusing to answer or knowingly giving a false answer is punishable with a fine of up to ₹1,000. Census officers who neglect their duties, ask improper questions, falsify returns, or disclose information without authorization face separate penalties, including up to three years' imprisonment for certain offences.
            </p>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200 mt-6 shadow-sm">
          <h3 className="font-bold text-indigo-900 flex items-center gap-2 text-lg mb-3">
            <Lock className="w-5 h-5 text-indigo-700" /> Section 15 - Confidentiality
          </h3>
          <p className="text-indigo-800 text-sm font-medium leading-relaxed">
            Answers cannot be disclosed under the RTI Act, used as evidence in any court, or shared with any other department or institution. They are used exclusively to build aggregate statistics.
          </p>
        </div>
      </div>

      <div className="space-y-6 pt-8">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
          <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">About this application</h2>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
          <ul className="space-y-4 text-sm text-slate-700 font-medium">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>This is an unofficial build and is <strong>not affiliated with or endorsed by</strong> the Government of India, the Office of the Registrar General & Census Commissioner, India (ORGI), or the Ministry of Home Affairs.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>It does <strong>not collect, store, or transmit</strong> any real personal, biometric, or government ID data. All sample data (including names, IDs, and addresses) shown anywhere in the app is strictly fictional.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>This project carries no warranty and should not be relied on for actual census participation. Please visit the official portal at <a href="https://se.census.gov.in" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">se.census.gov.in</a> for the real process.</span>
            </li>
          </ul>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              If you spot any inaccurate content or have concerns about this application, please contact the project maintainers via our repository issue tracker to have it corrected.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
