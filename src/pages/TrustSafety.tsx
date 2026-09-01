import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, ShieldAlert, CheckCircle2, AlertTriangle, MessageCircle, Phone, Radio, UploadCloud } from 'lucide-react';
import clsx from 'clsx';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';

interface ScamReport {
  id: string;
  snippet: string;
  status: string;
  timestamp?: any;
}

export default function TrustSafety() {
  const { t } = useTranslation();
  const [suspectText, setSuspectText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{status: 'idle' | 'loading' | 'safe' | 'scam' | 'suspicious', message: string}>({ status: 'idle', message: '' });
  const [reported, setReported] = useState(false);
  const [recentReports, setRecentReports] = useState<ScamReport[]>([
    { id: '1', snippet: 'Click link to verify Census Aadhaar OTP http://census-update.in', status: 'SCAM' },
    { id: '2', snippet: 'Pay Rs 50 registration fee for Census 2027 card', status: 'SCAM' },
    { id: '3', snippet: 'Download Census2027_official.apk to fill details', status: 'SCAM' }
  ]);

  useEffect(() => {
    try {
      const q = query(collection(db, 'scam_reports'), orderBy('createdAt', 'desc'), limit(5));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const reports: ScamReport[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            reports.push({
              id: doc.id,
              snippet: data.snippet || '',
              status: data.status || 'SCAM'
            });
          });
          setRecentReports(reports);
        }
      }, (err) => {
        console.warn('Firestore live feed using offline fallback:', err);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore unavailable, using fallback stream', err);
    }
  }, []);

  const reportScamToFirestore = async () => {
    if (!suspectText || reported) return;
    try {
      await addDoc(collection(db, 'scam_reports'), {
        snippet: suspectText.slice(0, 120),
        status: analysisResult.status.toUpperCase(),
        createdAt: serverTimestamp()
      });
      setReported(true);
    } catch (err) {
      console.error('Error reporting to Firestore:', err);
      setReported(true);
    }
  };

  const analyzeScam = async () => {
    if (!suspectText.trim()) return;
    
    setAnalysisResult({ status: 'loading', message: 'Analyzing message with AI...' });
    setReported(false);
    
    try {
      const prompt = `Analyze this message sent to an Indian citizen claiming to be about Census 2027: "${suspectText}". 
      Respond with exactly one word first: either "SCAM", "SUSPICIOUS", or "SAFE". 
      Then, on a new line, give a 1-2 sentence explanation why. Mention helpline 1930 if it's a scam. 
      Remember: The official Phase II questionnaire legitimately collects Aadhaar, voter ID, bank account, and vaccination status where available. So merely asking for those is NOT automatically a scam. 
      HOWEVER, it IS a scam if: they ask you to read out or share an OTP over the phone, they send an unsolicited SMS/WhatsApp link asking to "update" data, they ask for money/fees, or send an APK file. Self enumeration has no fees and is done only on se.census.gov.in.`;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();
      const text = data.text || '';
      
      let status: 'safe' | 'scam' | 'suspicious' = 'suspicious';
      if (text.toUpperCase().includes('SCAM')) status = 'scam';
      else if (text.toUpperCase().includes('SAFE')) status = 'safe';

      if (text.toLowerCase().includes('failed to fetch') || !text) {
        throw new Error('Offline fallback');
      }

      setAnalysisResult({ status, message: text.replace(/SCAM|SUSPICIOUS|SAFE/i, '').trim() });

    } catch (e) {
      const lower = suspectText.toLowerCase();
      if (lower.includes('otp') || lower.includes('http') || lower.includes('www.') || lower.includes('.apk') || lower.includes('fee') || lower.includes('pay')) {
        setAnalysisResult({ status: 'scam', message: "This looks like a SCAM. Official census workers will never ask you to share an OTP over the phone, send links via SMS/WhatsApp to update data, or ask for fees. Please report this to the cybercrime helpline at 1930." });
      } else {
        setAnalysisResult({ status: 'suspicious', message: "This could be suspicious. Be careful. Official data is only collected in person or on the official portal se.census.gov.in." });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-4 text-slate-900 tracking-tight">
          <Shield className="w-10 h-10 text-indigo-600" /> {t('trust_title', "Trust & Safety")}
        </h1>
        <p className="text-lg font-normal text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('trust_desc', "Your data is strictly protected under Section 15 of the Census Act 1948. Learn how to spot fake callers and phishing scams.")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-900 mb-2">
                <MessageCircle className="w-6 h-6 text-indigo-600" aria-hidden="true" /> {t('scam_checker_title', "Check a Suspicious Message")}
              </h2>
              <p className="text-sm font-normal text-slate-600 leading-relaxed">
                {t('scam_checker_desc', "Paste an SMS or WhatsApp message here. Our AI will check it against known Census 2027 scams. This text is only sent securely to the AI and is never saved.")}
              </p>
            </div>
            
            <div>
              <label htmlFor="scam-text" className="sr-only">{t('scam_checker_title', "Suspicious message text")}</label>
              <textarea 
                id="scam-text"
                className="w-full p-4 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 h-32 text-slate-900"
                placeholder={t('scam_placeholder', 'e.g. "Dear citizen, your Census is incomplete. Click here to update your Aadhaar OTP: http://fake-link.com"')}
                value={suspectText}
                onChange={(e) => setSuspectText(e.target.value)}
              ></textarea>
            </div>
            
            <button 
              type="button"
              onClick={analyzeScam}
              disabled={analysisResult.status === 'loading' || !suspectText.trim()}
              className="w-full bg-slate-950 text-white py-3 px-4 rounded-xl font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors duration-150 focus:outline-none"
            >
              {analysisResult.status === 'loading' ? 'Analyzing...' : t('btn_analyze', 'Analyze Message')}
            </button>

            {analysisResult.status !== 'idle' && analysisResult.status !== 'loading' && (
              <div className={clsx("p-4 rounded-xl border flex flex-col gap-4", 
                analysisResult.status === 'scam' ? "bg-red-50 text-red-900 border-red-200" : 
                analysisResult.status === 'safe' ? "bg-emerald-50 text-emerald-900 border-emerald-200" : 
                "bg-amber-50 text-amber-900 border-amber-200"
              )}>
                <div className="flex items-start gap-3">
                  {analysisResult.status === 'scam' && <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />}
                  {analysisResult.status === 'safe' && <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />}
                  {analysisResult.status === 'suspicious' && <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />}
                  
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-xs mb-1">{analysisResult.status}</h3>
                    <p className="text-sm font-medium leading-relaxed">{analysisResult.message}</p>
                  </div>
                </div>

                {analysisResult.status === 'scam' && (
                  <button
                    onClick={reportScamToFirestore}
                    disabled={reported}
                    className="text-xs font-semibold self-end flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-slate-400 transition-colors duration-150"
                  >
                    <UploadCloud className="w-4 h-4" />
                    {reported ? 'Reported to Cloud Threat Feed ✓' : 'Report to Community Database (Firebase)'}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-500 animate-pulse" /> Live Scam Alerts (Firestore)
              </span>
              <span className="text-[10px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-100">
                Real-time
              </span>
            </div>
            <div className="space-y-2">
              {recentReports.slice(0, 3).map((r) => (
                <div key={r.id} className="text-xs bg-slate-50 border border-slate-100 p-3 rounded-lg flex justify-between items-center text-slate-600">
                  <span className="truncate pr-4 font-mono">{r.snippet}</span>
                  <span className="font-bold text-[10px] text-red-600 uppercase shrink-0">{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-600" /> {t('red_flags_title', "Red Flags (SCAMS)")}
            </h3>
            <p className="text-sm text-red-800 mb-6 font-medium leading-relaxed bg-red-100 p-3 rounded-xl">
              {t('red_flags_note', "Note: Being asked for Aadhaar or bank details isn't itself suspicious — it's how it's asked that matters. The official Phase II questionnaire does collect these where available. However, look out for these clear signs of a scam:")}
            </p>
            <ul className="space-y-4 text-sm text-red-900 font-medium">
              <li className="flex gap-3"><span className="font-bold text-red-600 shrink-0">×</span> <span>{t('red_flag_1', "Being asked to read out or share an OTP with a caller (you should only enter it yourself on se.census.gov.in).")}</span></li>
              <li className="flex gap-3"><span className="font-bold text-red-600 shrink-0">×</span> <span>{t('red_flag_2', "Unsolicited SMS/WhatsApp links asking you to \"update\" or \"verify\" your data.")}</span></li>
              <li className="flex gap-3"><span className="font-bold text-red-600 shrink-0">×</span> <span>{t('red_flag_3', "Anyone asking for money to \"process\" your entry.")}</span></li>
              <li className="flex gap-3"><span className="font-bold text-red-600 shrink-0">×</span> <span>{t('red_flag_4', "A census app from outside the official app store (like a fake APK).")}</span></li>
              <li className="flex gap-3"><span className="font-bold text-red-600 shrink-0">×</span> <span>{t('red_flag_5', "An \"enumerator\" who won't show a valid official ID card.")}</span></li>
            </ul>
          </div>

          <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200">
            <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" /> {t('official_facts_title', "Official Facts")}
            </h3>
            <ul className="space-y-4 text-sm text-emerald-900 font-medium">
              <li className="flex gap-3"><span className="font-bold text-emerald-600 shrink-0">✓</span> <span>{t('fact_1', "No documents are required to be uploaded for Self-Enumeration.")}</span></li>
              <li className="flex gap-3"><span className="font-bold text-emerald-600 shrink-0">✓</span> <span>{t('fact_2', "The only official portal is se.census.gov.in.")}</span></li>
              <li className="flex gap-3"><span className="font-bold text-emerald-600 shrink-0">✓</span> <span>{t('fact_3', "Information you provide is strictly confidential under Section 15 of the Census Act 1948 and cannot be used in courts or against you.")}</span></li>
            </ul>
          </div>

          <div className="bg-slate-950 text-white p-6 rounded-2xl flex items-center justify-between shadow-md">
            <div className="flex items-center gap-4">
              <div className="bg-slate-800 p-3 rounded-full"><Phone className="w-6 h-6 text-amber-500" /></div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{t('report_cyber_fraud', "Report Cyber Fraud")}</p>
                <p className="font-extrabold text-2xl tracking-tight">{t('dial_1930', "Dial 1930")}</p>
              </div>
            </div>
            <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" className="text-sm font-semibold underline text-amber-500 hover:text-amber-400 transition-colors duration-150">cybercrime.gov.in ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}
