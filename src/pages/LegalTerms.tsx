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
          <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Portal Terms of Use & Privacy Policy</h2>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
          <ul className="space-y-4 text-sm text-slate-700 font-medium">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>This portal is <strong>Designed, Developed and Hosted by</strong> the National Informatics Centre (NIC), Ministry of Electronics & Information Technology, Government of India.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>All interactions with the AI assistant (Sahayak) are strictly logged and audited under the guidelines of the <strong>Information Technology Act, 2000 (Section 43A)</strong> to protect citizen privacy and digital infrastructure.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>As per the hyperlinking policy of the Government of India, we do not object to you linking directly to the information that is hosted on this site and no prior permission is required for the same. However, it is mandatory to inform us of any links provided to this portal.</span>
            </li>
          </ul>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              For any queries regarding this legal framework, citizens can contact the Chief Information Security Officer (CISO) at the Office of the Registrar General & Census Commissioner, India (ORGI).
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
