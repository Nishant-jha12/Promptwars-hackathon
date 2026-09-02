import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Info, CheckCircle2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function EnumerationSummary() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('enumeration_summary');
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      // Provide an impressive mock state if the user navigates directly without completing the wizard
      setData({
        seId: "H8492019482",
        state: "Maharashtra",
        ownership: "Owned (Freehold)",
        roofMaterial: "Concrete (RCC)",
        waterSource: "Treated Piped Water",
        memberCount: "4",
        caste: "Self-Declared / Phase II"
      });
    }
  }, []);

  const handleDownload = () => {
    window.print();
  };

  if (!data) return null;

  // Demo Wizard answers 6 specific questions out of 33.
  const answeredCount = 6;
  const totalCount = 33;
  const percentage = Math.round((answeredCount / totalCount) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 print:py-0 print:space-y-4">
      
      {/* Non-printable header */}
      <div className="print:hidden flex items-center justify-between mb-8 border-b border-slate-200 pb-6">
        <Link to="/self-enumeration" className="flex items-center gap-2 text-slate-600 font-semibold hover:text-slate-900 transition-colors duration-150">
          <ArrowLeft className="w-5 h-5" /> Back to Wizard
        </Link>
        <button onClick={handleDownload} className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors duration-150">
          <Download className="w-4 h-4" /> Save as PDF
        </button>
      </div>

      <div className="print:hidden space-y-4 mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">My Enumeration Summary</h1>
        <p className="text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
          A clean, consolidated view of the data you entered in the demo wizard. Nothing more, nothing less.
        </p>
      </div>

      {/* Printable Receipt Card */}
      <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 print:border-none print:p-0 space-y-12">
        
        {/* Receipt Header */}
        <div className="border-b border-slate-100 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Session Receipt</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">What you entered</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Mock Self-Enumeration Submission</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center min-w-[140px]">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">Generated ID</span>
            <span className="font-mono text-xl font-bold text-slate-900">{data.seId || 'N/A'}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Data Key-Value pairs */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Entered Details</h3>
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 mb-1">State</span>
                <span className="text-base font-semibold text-slate-900">{data.state || 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 mb-1">Ownership Status</span>
                <span className="text-base font-semibold text-slate-900">{data.ownership || 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 mb-1">Roof Material</span>
                <span className="text-base font-semibold text-slate-900">{data.roofMaterial || 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 mb-1">Drinking Water Source</span>
                <span className="text-base font-semibold text-slate-900">{data.waterSource || 'Not specified'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 mb-1">Household Member Count</span>
                <span className="text-base font-semibold text-slate-900">{data.memberCount || '1'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-500 mb-1">SC / ST / Other Selection</span>
                <span className="text-base font-semibold text-slate-900">{data.caste || 'Not specified'}</span>
              </div>
            </div>
          </div>

          {/* Progress & QR */}
          <div className="space-y-12">
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" /> Demo Completeness
              </h3>
              
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={`${2 * Math.PI * 36}`} strokeDashoffset={`${2 * Math.PI * 36 * (1 - answeredCount/totalCount)}`} className="text-indigo-600" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-slate-900">{percentage}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Subset Preview</p>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed mt-1">
                    You entered {answeredCount} data points. The actual official Phase I questionnaire contains {totalCount} comprehensive questions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <QRCodeSVG value={window.location.origin} size={100} />
              <p className="text-xs font-bold text-slate-500 mt-4 text-center uppercase tracking-wider">Links to Demo Project</p>
            </div>

          </div>
        </div>
      </div>

      {/* Explainer */}
      <div className="print:hidden bg-amber-50 p-6 rounded-2xl border border-amber-200 mt-8 flex gap-4">
        <Info className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-amber-900 text-lg mb-2">What happens next?</h3>
          <p className="text-sm font-medium text-amber-800 leading-relaxed">
            In the real, official process, completing the online form does not finalize your registration. An official enumerator is mandated to visit your residence during the 45-day Houselisting Operations (HLO) period. When they arrive, the citizen simply shows their generated SE ID. The enumerator enters this ID into the secure HLO Mobile App, verifying your submission and completing the process.
          </p>
        </div>
      </div>

    </div>
  );
}
