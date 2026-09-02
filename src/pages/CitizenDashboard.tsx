import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  UserCheck, 
  Home, 
  Users, 
  MapPin, 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Download, 
  Clock, 
  Sparkles,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface MockCitizen {
  name: string;
  aadhaarMasked: string;
  phoneMasked: string;
  dob: string;
  gender: string;
  address: string;
  geoTag: string;
  seId: string;
  hloStatus: 'Completed' | 'Pending';
  peStatus: 'Scheduled (Feb 2027)' | 'Completed';
  members: Array<{
    name: string;
    relation: string;
    age: number;
    motherTongue: string;
    casteStatus: string;
  }>;
  amenities: {
    roof: string;
    water: string;
    electricity: string;
    cooking: string;
    toilet: string;
  };
  auditLogs: Array<{
    date: string;
    action: string;
    officialId: string;
  }>;
}

const DEMO_CITIZEN: MockCitizen = {
  name: "Rajesh S. Sharma",
  aadhaarMasked: "XXXX-XXXX-4821",
  phoneMasked: "+91 98XXX-XX210",
  dob: "14-08-1982",
  gender: "Male",
  address: "House No. 42, Shanti Nagar, Kothrud, Pune, Maharashtra - 411038",
  geoTag: "18.5074° N, 73.8077° E (Geo-Tagged)",
  seId: "H8492019482",
  hloStatus: "Completed",
  peStatus: "Scheduled (Feb 2027)",
  members: [
    { name: "Rajesh S. Sharma", relation: "Head of Household", age: 44, motherTongue: "Marathi", casteStatus: "Self-Declared (Phase II)" },
    { name: "Sunita R. Sharma", relation: "Spouse", age: 41, motherTongue: "Marathi", casteStatus: "Self-Declared (Phase II)" },
    { name: "Aarav R. Sharma", relation: "Son", age: 16, motherTongue: "Marathi", casteStatus: "Self-Declared (Phase II)" },
    { name: "Ananya R. Sharma", relation: "Daughter", age: 12, motherTongue: "Marathi", casteStatus: "Self-Declared (Phase II)" }
  ],
  amenities: {
    roof: "Reinforced Concrete (RCC)",
    water: "Treated Piped Tap Water (Inside Premises)",
    electricity: "Domestic Power Grid + Rooftop Solar",
    cooking: "Piped Natural Gas (PNG)",
    toilet: "Flush Latrine connected to Municipal Sewer"
  },
  auditLogs: [
    { date: "2026-05-18 11:24 AM", action: "HLO Field Enumerator Verified SE ID with HLO Mobile App", officialId: "ENUM-MH-411038-04" },
    { date: "2026-05-02 04:15 PM", action: "Digital Self-Enumeration submitted online at se.census.gov.in", officialId: "CITIZEN-SELF" }
  ]
};

export default function CitizenDashboard() {
  const { t } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'privacy' | 'certificate'>('details');

  const formatAadhaar = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 12);
    const parts = [];
    for (let i = 0; i < raw.length; i += 4) {
      parts.push(raw.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleSendOtp = () => {
    const digits = aadhaarInput.replace(/\s/g, '');
    if (digits.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number (or use 1-Click Demo Login).');
      return;
    }
    setError('');
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otpInput.trim() === '123456' || otpInput.trim() === '543210' || otpInput.length >= 4) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid OTP. Use test OTP: 123456');
    }
  };

  const handleQuickLogin = () => {
    setAadhaarInput('9999 8888 4821');
    setOtpSent(true);
    setOtpInput('123456');
    setIsLoggedIn(true);
    setError('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAadhaarInput('');
    setOtpSent(false);
    setOtpInput('');
    setError('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 print:space-y-0">
      
      <div className="print:hidden bg-slate-950 text-white p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold bg-emerald-950/50 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-900 mb-4">
            <Lock className="w-4 h-4" /> e-KYC Secure Citizen Portal (Simulated Sandbox)
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Citizen Census Privacy Dashboard</h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl font-medium leading-relaxed">
            Access your verified household records, digital SE pass, and manage your data privacy rights under Section 15 of the Census Act 1948.
          </p>
        </div>

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-6 py-3 rounded-xl font-semibold transition-colors duration-150 self-end md:self-center"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        )}
      </div>

      {!isLoggedIn ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100">
              <KeyRound className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Aadhaar e-KYC Authentication</h2>
            <p className="text-sm font-medium text-slate-500">
              Simulated verification to retrieve your household census registration.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-sm font-medium text-amber-900">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
            <span>Sandbox Mode: Do NOT enter real Aadhaar numbers. Test with any 12 digits or click Demo Login below.</span>
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="aadhaar-no" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Aadhaar Number (12 Digits)
              </label>
              <input
                id="aadhaar-no"
                type="text"
                placeholder="XXXX XXXX XXXX"
                value={aadhaarInput}
                onChange={(e) => setAadhaarInput(formatAadhaar(e.target.value))}
                disabled={otpSent}
                className="w-full p-4 border border-slate-200 rounded-xl font-mono text-center tracking-widest text-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-600 text-slate-900"
              />
            </div>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white py-4 rounded-xl font-semibold transition-colors duration-150"
              >
                Send Verification OTP
              </button>
            ) : (
              <div className="space-y-6">
                <div>
                  <label htmlFor="otp-input" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Enter 6-Digit OTP (Use: 123456)
                  </label>
                  <input
                    id="otp-input"
                    type="text"
                    placeholder="123456"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="w-full p-4 border border-slate-200 rounded-xl font-mono text-center tracking-widest text-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-600 text-slate-900"
                  />
                  <span className="text-xs font-semibold text-emerald-600 block mt-3">
                    ✓ Simulated OTP sent to registered mobile linked with Aadhaar.
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-1/3 text-sm font-semibold text-slate-500 hover:text-slate-900 py-3 transition-colors duration-150"
                  >
                    Change Number
                  </button>
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="w-2/3 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-105 active:scale-100 transition-all duration-200"
                  >
                    Verify & Login
                  </button>
                </div>
              </div>
            )}

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-slate-200 transition-colors duration-150"
            >
              <Sparkles className="w-5 h-5 text-amber-600" /> 1-Click Instant Demo Login
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 print:space-y-0">
          
          <div className="print:hidden bg-white p-8 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-2xl border border-indigo-200">
                {DEMO_CITIZEN.name.charAt(0)}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-slate-900">{DEMO_CITIZEN.name}</h2>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" /> Aadhaar Verified
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-500">
                  <span>Aadhaar: <strong className="font-mono text-slate-700">{DEMO_CITIZEN.aadhaarMasked}</strong></span>
                  <span>•</span>
                  <span>DOB: {DEMO_CITIZEN.dob}</span>
                  <span>•</span>
                  <span>Gender: {DEMO_CITIZEN.gender}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-right self-stretch md:self-auto flex flex-row md:flex-col justify-between items-center md:items-end gap-2">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Digital SE ID</span>
                <span className="font-mono font-extrabold text-lg text-indigo-600">{DEMO_CITIZEN.seId}</span>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-2.5 py-1 rounded">
                Phase I: HLO Verified ✓
              </span>
            </div>
          </div>

          <div className="print:hidden flex border-b border-slate-200 gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-sm font-bold flex items-center gap-2 transition-colors duration-150 border-b-2 whitespace-nowrap ${
                activeTab === 'details'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Home className="w-5 h-5" /> Household & Family Record
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`pb-4 text-sm font-bold flex items-center gap-2 transition-colors duration-150 border-b-2 whitespace-nowrap ${
                activeTab === 'privacy'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-5 h-5" /> Data Privacy & Access Audit
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`pb-4 text-sm font-bold flex items-center gap-2 transition-colors duration-150 border-b-2 whitespace-nowrap ${
                activeTab === 'certificate'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-5 h-5" /> Official Census Pass
            </button>
          </div>

          {activeTab === 'details' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                
                <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                    <MapPin className="w-5 h-5 text-indigo-600" /> Geo-Tagged Residential Building
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Registered Address</span>
                      <span className="font-semibold text-slate-900">{DEMO_CITIZEN.address}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Digital Geo-Coordinates</span>
                      <div className="flex flex-col gap-3">
                        <span className="font-mono text-sm bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 inline-block text-slate-700 font-medium">
                          {DEMO_CITIZEN.geoTag}
                        </span>
                        
                        <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 relative group mt-1">
                          <iframe 
                            title="Property Geo-Location Map"
                            className="w-full h-full"
                            src="https://maps.google.com/maps?q=18.5074,73.8077&z=15&output=embed"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                          <a 
                            href="https://www.google.com/maps/search/?api=1&query=18.5074,73.8077"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px]"
                            aria-label="Open pinpoint location in Google Maps"
                          >
                            <span className="bg-white text-slate-900 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                              <ExternalLink className="w-4 h-4 text-amber-600" /> Open in Google Maps
                            </span>
                          </a>
                        </div>
                        <div className="text-right">
                          <a 
                            href="https://www.google.com/maps/search/?api=1&query=18.5074,73.8077"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center justify-end gap-1.5 transition-colors"
                          >
                            View exact plot location <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Roof Material:</span>
                      <span className="font-bold text-slate-900">{DEMO_CITIZEN.amenities.roof}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Drinking Water:</span>
                      <span className="font-bold text-slate-900">{DEMO_CITIZEN.amenities.water}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Power Source:</span>
                      <span className="font-bold text-slate-900">{DEMO_CITIZEN.amenities.electricity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">Cooking Fuel:</span>
                      <span className="font-bold text-slate-900">{DEMO_CITIZEN.amenities.cooking}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-6 text-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 2027 Census Participation Status
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <strong className="block text-emerald-900 mb-1">Phase I: Houselisting & Housing</strong>
                          <span className="text-emerald-700 text-sm font-medium">Field Enumeration verified on 18 May 2026</span>
                        </div>
                        <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded text-xs uppercase tracking-wider shrink-0">Completed</span>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <strong className="block text-indigo-900 mb-1">Phase II: Population Enumeration</strong>
                          <span className="text-indigo-700 text-sm font-medium">Demographic, socio-economic & caste survey</span>
                        </div>
                        <span className="bg-indigo-600 text-white font-bold px-3 py-1 rounded text-xs uppercase tracking-wider shrink-0">Feb 2027</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 font-medium leading-relaxed border border-slate-200">
                    💡 <strong>Enumerator Visit:</strong> During Phase II (February 2027), present your 11-digit SE ID <code className="font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{DEMO_CITIZEN.seId}</code> for quick confirmation.
                  </div>
                </div>

              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-indigo-600" /> Registered Household Members ({DEMO_CITIZEN.members.length})
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Confidential under Census Act 1948</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-white">
                        <th className="p-4 font-bold text-slate-900">Full Name</th>
                        <th className="p-4 font-bold text-slate-900">Relationship</th>
                        <th className="p-4 font-bold text-slate-900">Age</th>
                        <th className="p-4 font-bold text-slate-900">Mother Tongue</th>
                        <th className="p-4 font-bold text-slate-900">Phase II Caste Survey</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {DEMO_CITIZEN.members.map((m, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors duration-150">
                          <td className="p-4 font-bold text-slate-900">{m.name}</td>
                          <td className="p-4 text-slate-600 font-medium">{m.relation}</td>
                          <td className="p-4 font-mono font-medium text-slate-600">{m.age} yrs</td>
                          <td className="p-4 font-medium text-slate-600">{m.motherTongue}</td>
                          <td className="p-4">
                            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 rounded font-bold text-xs">
                              {m.casteStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">Statutory Privacy Protection (Section 15)</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                      Guaranteed non-disclosure protections under the Census Act 1948.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900 text-base mb-2">Inadmissible in Court</strong>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">Your census responses cannot be used as evidence in any judicial proceeding or legal inquiry.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900 text-base mb-2">Anonymized Aggregation</strong>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">Individual identity is stripped before statistical data is released to planning authorities.</p>
                  </div>
                  <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                    <strong className="block text-slate-900 text-base mb-2">No Commercial Sharing</strong>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">Data is strictly quarantined within ORGI servers with end-to-end encrypted storage.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
                <div>
                  <h3 className="font-bold text-slate-900 text-xl flex items-center gap-2 mb-2">
                    <Clock className="w-6 h-6 text-indigo-600" /> Official Data Access Audit Trail
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    Every time a government official or enumerator queries your record, an immutable timestamp is logged below.
                  </p>
                </div>

                <div className="space-y-4">
                  {DEMO_CITIZEN.auditLogs.map((log, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm">
                      <div>
                        <strong className="text-slate-900 block mb-1">{log.action}</strong>
                        <span className="text-slate-500 font-mono font-medium">Official ID: {log.officialId}</span>
                      </div>
                      <span className="text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-mono font-medium shadow-sm">
                        {log.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificate' && (
            <div className="bg-white p-12 rounded-2xl border-2 border-slate-200 max-w-lg mx-auto text-center space-y-8 print:border-none print:shadow-none print:p-0 print:max-w-full print:mt-12">
              <div className="border-b border-slate-200 pb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Republic of India • Census 2027</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">Official SE Pass</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Digital verification receipt for Household #{DEMO_CITIZEN.seId}</p>
              </div>

              <div className="p-6 bg-white rounded-2xl inline-block border-2 border-slate-100 shadow-sm print:border-none print:shadow-none">
                <QRCodeSVG value={`CENSUS2027:${DEMO_CITIZEN.seId}:VERIFIED:${DEMO_CITIZEN.name}`} size={200} />
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Head of Household</p>
                <p className="font-extrabold text-xl text-slate-900">{DEMO_CITIZEN.name}</p>
                <p className="font-mono text-indigo-600 font-bold text-2xl tracking-widest pt-2">{DEMO_CITIZEN.seId}</p>
                <p className="text-slate-500 font-medium pt-2">Kothrud, Pune, Maharashtra</p>
              </div>

              <button
                onClick={() => window.print()}
                className="print:hidden w-full bg-slate-950 hover:bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors duration-150"
              >
                <Download className="w-5 h-5" /> Download / Print Digital Pass
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
