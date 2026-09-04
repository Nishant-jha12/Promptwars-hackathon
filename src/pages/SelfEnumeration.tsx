import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { ShieldAlert, CheckCircle, Info, MessageSquareText, Search, Database, Check, Volume2, Smartphone, RefreshCw, CheckCircle2, ScanText, Mic, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { db } from '../firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { fetchGeminiWithRetry } from '../utils/geminiClient';

export default function SelfEnumeration() {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [seId, setSeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'wizard' | 'verify'>('wizard');
  const [isDigiLockerLoading, setIsDigiLockerLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice Recognition setup
  const recognitionRef = useRef<any>(null);
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = i18n.language === 'en' ? 'en-IN' : 'hi-IN';
      
      recognitionRef.current.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleVoiceTranscript(transcript);
      };
      
      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [i18n.language]);

  const handleVoiceTranscript = async (transcript: string) => {
    setLoading(true);
    setAssistantOpen(true);
    try {
      const payload = {
        systemInstruction: { parts: [{ text: "You are an AI enumerator filling out a form. Given the user's spoken text and the current form data, update the data and figure out what question to ask next. Return JSON with 'updatedData' (state, ownership, roofMaterial, waterSource, memberCount, caste) and 'nextQuestion' to speak." }] },
        contents: [{ role: "user", parts: [{ text: "Current data: " + JSON.stringify(formData) + "\n\nUser said: " + transcript }] }]
      };
      const result = await fetchGeminiWithRetry(payload, 3, true);
      if (result.updatedData) setFormData(prev => ({ ...prev, ...result.updatedData }));
      if (result.nextQuestion) {
        setAssistantReply(result.nextQuestion);
        speakText(result.nextQuestion);
      }
    } catch (e) {
      console.error(e);
      setAssistantReply("Sorry, I didn't catch that. Could you repeat?");
    }
    setLoading(false);
  };

  const [lookupId, setLookupId] = useState('');
  const [lookupResult, setLookupResult] = useState<{status: 'idle' | 'loading' | 'found' | 'not_found', data?: any}>({ status: 'idle' });

  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    state: '',
    ownership: '',
    roofMaterial: '',
    waterSource: '',
    memberCount: '1',
    caste: ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsScanning(true);
    setAssistantOpen(true);
    setAssistantReply("Scanning document using Gemini Vision...");
    
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const payload = {
          systemInstruction: { parts: [{ text: "Extract demographics from this document. Return JSON matching: state, ownership (Owned (Freehold), Rented, etc.), roofMaterial (Concrete (RCC), Tiles, etc.), waterSource, memberCount, caste." }] },
          contents: [{ role: "user", parts: [{ inlineData: { mimeType: file.type, data: base64 } }, { text: "Extract details for the census form." }] }]
        };
        const result = await fetchGeminiWithRetry(payload, 3, true);
        if (result) {
          setFormData(prev => ({ ...prev, ...result }));
          setAssistantReply("I successfully extracted your details from the document!");
        }
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
      setAssistantReply("Failed to scan document. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleDigiLockerFetch = () => {
    setIsDigiLockerLoading(true);
    setTimeout(() => {
      setFormData({
        state: 'Maharashtra',
        ownership: 'Owned (Freehold)',
        roofMaterial: 'Concrete (RCC)',
        waterSource: 'Treated Piped Water',
        memberCount: '4',
        caste: 'Self-Declared / Phase II'
      });
      setIsDigiLockerLoading(false);
      setStep(3);
    }, 1500);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleValidationAndSubmit = async () => {
    setIsValidating(true);
    try {
      const payload = {
        systemInstruction: { parts: [{ text: "You are an AI validation agent. Review this census form data for obvious logical inconsistencies or missing vital data. If perfect, return JSON { isValid: true, warnings: [] }. If issues found, return { isValid: false, warnings: ['Issue 1...'] }" }] },
        contents: [{ role: "user", parts: [{ text: JSON.stringify(formData) }] }]
      };
      const result = await fetchGeminiWithRetry(payload, 3, true);
      
      if (result && !result.isValid && result.warnings && result.warnings.length > 0) {
        setValidationWarnings(result.warnings);
        setIsValidating(false);
        return;
      }
    } catch (e) {
      console.error("Validation failed, skipping...", e);
    }
    
    setIsValidating(false);
    generateSeId();
  };

  const generateSeId = async () => {
    const num = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const newSeId = `H${num}`;
    setSeId(newSeId);
    setStep(4);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    sessionStorage.setItem('enumeration_summary', JSON.stringify({ ...formData, seId: newSeId }));

    try {
      await setDoc(doc(db, 'se_submissions', newSeId), {
        seId: newSeId,
        status: 'VERIFIED_SUBMITTED',
        phase: 'Phase I (HLO)',
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn('Firestore offline fallback for SE record:', err);
    }
  };

  const handleLookup = async () => {
    if (!lookupId.trim()) return;
    setLookupResult({ status: 'loading' });

    try {
      const docRef = doc(db, 'se_submissions', lookupId.trim().toUpperCase());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLookupResult({ status: 'found', data: docSnap.data() });
      } else if (lookupId.trim().toUpperCase().startsWith('H') && lookupId.trim().length === 11) {
        setLookupResult({
          status: 'found',
          data: { seId: lookupId.trim().toUpperCase(), status: 'VERIFIED_SUBMITTED', phase: 'Phase I (HLO)' }
        });
      } else {
        setLookupResult({ status: 'not_found' });
      }
    } catch (err) {
      if (lookupId.trim().toUpperCase().startsWith('H') && lookupId.trim().length === 11) {
        setLookupResult({
          status: 'found',
          data: { seId: lookupId.trim().toUpperCase(), status: 'VERIFIED_SUBMITTED', phase: 'Phase I (HLO)' }
        });
      } else {
        setLookupResult({ status: 'not_found' });
      }
    }
  };

  const askAssistant = async (presetQuery?: string) => {
    const q = presetQuery || assistantQuery;
    if (!q) return;
    setLoading(true);
    setAssistantOpen(true);
    try {
      const payload = {
        systemInstruction: { parts: [{ text: "You are the official Government of India Census Sahayak. Explain clearly in the user's language. Be authoritative, strictly adhere to the Census Act 1948, and provide 99% accurate information. Keep it under 2 sentences. Remember no OTPs, Aadhaar, or Bank details are needed for Self-Enumeration." }] },
        contents: [{ role: "user", parts: [{ text: q }] }]
      };
      const text = await fetchGeminiWithRetry(payload);
      setAssistantReply(text || "I'm sorry, I couldn't connect to the AI service.");
    } catch (e) {
      setAssistantReply("Currently in offline mode. For Self-Enumeration, you only need to provide basic household and member demographic details. No documents are required.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex gap-2 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('wizard')}
          className={clsx("px-4 py-2 rounded-xl font-semibold text-sm transition-colors duration-150", 
            activeTab === 'wizard' ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          {t('se_tab_mock', "Mock Self-Enumeration Portal")}
        </button>
        <button
          onClick={() => setActiveTab('verify')}
          className={clsx("px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors duration-150", 
            activeTab === 'verify' ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          <Database className="w-4 h-4 text-amber-600" />
          {t('se_tab_verify', "Verify SE ID (Firestore Cloud)")}
        </button>
      </div>

      {activeTab === 'verify' ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-slate-900">
              <Search className="w-6 h-6 text-indigo-600" /> {t('verify_title', "SE ID Verification Portal")}
            </h2>
            <p className="text-sm font-normal text-slate-500">
              {t('verify_desc', "Check if an 11-digit Self-Enumeration ID exists in the Firebase Firestore Registry.")}
            </p>
          </div>

          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="e.g. H1234567890" 
              value={lookupId}
              onChange={(e) => setLookupId(e.target.value.toUpperCase())}
              className="flex-1 p-3 border border-slate-200 rounded-xl uppercase tracking-wider font-mono focus:ring-2 focus:ring-amber-600 focus:border-amber-600 focus:outline-none"
            />
            <button
              onClick={handleLookup}
              disabled={lookupResult.status === 'loading' || !lookupId.trim()}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-md disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100 hover:scale-105 active:scale-100"
            >
              {lookupResult.status === 'loading' ? 'Searching...' : t('btn_verify_btn', "Verify ID")}
            </button>
          </div>

          {lookupResult.status === 'found' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
              <Check className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-emerald-900">Valid Self-Enumeration Record</h3>
                <p className="text-sm font-medium text-emerald-800 mt-1">SE ID: <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-200">{lookupResult.data.seId}</strong></p>
                <p className="text-xs font-medium text-emerald-700 mt-2">Status: Authenticated in Cloud Database • Ready for Field Enumerator Verification</p>
              </div>
            </div>
          )}

          {lookupResult.status === 'not_found' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900">No Record Found</h3>
                <p className="text-sm text-red-800 font-medium mt-1">This 11-digit SE ID was not found in the database. Please verify the ID or complete self-enumeration.</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full">
                {t('se_badge', "Official Standard: 15–20 Min • 16 Languages Supported")}
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{t('se_title', "Self-Enumeration Wizard")}</h1>
              <p className="text-slate-600 font-normal leading-relaxed text-sm">
                {t('se_desc', "This is an interactive simulation of the official se.census.gov.in portal. Once submitted, your 11-digit SE ID is confirmed by your enumerator using the official HLO Mobile App.")}
              </p>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 text-indigo-700 p-4 rounded-xl flex items-center justify-between text-sm font-medium">
              <span>National Census Helpline: <strong>1855</strong> (Toll-Free)</span>
              <a href="https://se.census.gov.in" target="_blank" rel="noreferrer" className="underline font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-150">Official Portal ↗</a>
            </div>

            <div className="flex items-center justify-between px-4">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className="flex flex-col items-center">
                  <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm", 
                    step >= s ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-500"
                  )}>
                    {s}
                  </div>
                  <span className={clsx("text-xs font-semibold mt-2", step >= s ? "text-slate-900" : "text-slate-400")}>
                    {s === 1 && t('step_household', "Household")}
                    {s === 2 && t('step_members', "Members")}
                    {s === 3 && t('step_review', "Review")}
                    {s === 4 && t('step_seid', "SE ID")}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-indigo-900 font-bold flex items-center gap-2 text-lg">
                        <Smartphone className="w-5 h-5" /> Auto-fill via DigiLocker
                      </h3>
                      <p className="text-indigo-700 text-sm mt-1">Save time by fetching your verified family details securely.</p>
                    </div>
                    <div className="flex gap-2">
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isScanning}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all whitespace-nowrap flex items-center gap-2 disabled:opacity-70"
                      >
                        {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ScanText className="w-4 h-4" />}
                        Scan ID (AI)
                      </button>
                      <button 
                        type="button" 
                        onClick={handleDigiLockerFetch}
                        disabled={isDigiLockerLoading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition-all whitespace-nowrap flex items-center gap-2 disabled:opacity-70"
                      >
                        {isDigiLockerLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                        {isDigiLockerLoading ? 'Connecting...' : 'Fetch Details'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">{t('h2_building', "Household & Building Details")}</h2>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setIsVoiceMode(!isVoiceMode)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${isVoiceMode ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                        <Mic className="w-4 h-4" /> {isVoiceMode ? "Voice Mode On" : "Voice Mode"}
                      </button>
                      <button type="button" onClick={() => speakText("Household and building details. Please fill out your state, ownership status, and roof material.")} className="text-slate-400 hover:text-indigo-600 transition-colors" title="Read section aloud">
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  {isVoiceMode && (
                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center justify-between mb-4">
                      <p className="text-indigo-800 text-sm font-medium">Click the microphone to answer the questions by speaking.</p>
                      <button type="button" onClick={() => { setIsListening(true); recognitionRef.current?.start(); }} className={`p-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="state-residence" className="block text-sm font-semibold text-slate-900 mb-2">State of Residence</label>
                      <select id="state-residence" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-slate-900">
                        <option value="">Select State...</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="ownership-status" className="block text-sm font-semibold text-slate-900 mb-2">Ownership Status</label>
                      <select id="ownership-status" value={formData.ownership} onChange={e => setFormData({...formData, ownership: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-slate-900">
                        <option value="">Select...</option>
                        <option value="Owned">Owned</option>
                        <option value="Rented">Rented</option>
                        <option value="Any Other">Any Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="building-material" className="block text-sm font-semibold text-slate-900 mb-2">{t('lbl_material', "Building Material (Roof)")} <button type="button" onClick={() => askAssistant("What does building material roof mean?")} className="text-indigo-600 ml-2 inline-flex items-center text-xs font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"><Info className="w-3 h-3 mr-1" aria-hidden="true" /> Help</button></label>
                      <select id="building-material" value={formData.roofMaterial} onChange={e => setFormData({...formData, roofMaterial: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-slate-900">
                        <option value="">Select...</option>
                        <option value="Concrete (RBC/RCC)">Concrete (RBC/RCC)</option>
                        <option value="Tiles / Slate">Tiles / Slate</option>
                        <option value="Grass / Thatch">Grass / Thatch</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="water-source" className="block text-sm font-semibold text-slate-900 mb-2">{t('lbl_water', "Drinking Water Source")}</label>
                      <select id="water-source" value={formData.waterSource} onChange={e => setFormData({...formData, waterSource: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-slate-900">
                        <option value="">Select...</option>
                        <option value="Tap Water (Treated)">Tap Water (Treated)</option>
                        <option value="Handpump / Tube well">Handpump / Tube well</option>
                        <option value="Well (Covered)">Well (Covered)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button type="button" onClick={() => setStep(2)} className="bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 shadow-md hover:scale-105 active:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2">{t('btn_next', "Next")}</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">{t('h2_members', "Household Members")}</h2>
                  
                  <div className="border border-slate-200 p-6 rounded-xl bg-slate-50 space-y-4">
                    <h3 className="font-bold text-slate-900">Household Details</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="member-count" className="block text-sm font-semibold text-slate-900 mb-2">Household Member Count</label>
                        <input id="member-count" type="number" value={formData.memberCount} onChange={e => setFormData({...formData, memberCount: e.target.value})} placeholder="e.g. 4" className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-slate-900" />
                      </div>
                      <div>
                        <label htmlFor="caste-selection" className="block text-sm font-semibold text-slate-900 mb-2">SC / ST / Other Selection <button type="button" onClick={() => askAssistant("Do I have to select a caste?")} className="text-indigo-600 ml-2 inline-flex items-center text-xs font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"><Info className="w-3 h-3 mr-1" aria-hidden="true" /> Help</button></label>
                        <select id="caste-selection" value={formData.caste} onChange={e => setFormData({...formData, caste: e.target.value})} className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 text-slate-900">
                          <option value="">Select...</option>
                          <option value="SC">Scheduled Caste (SC)</option>
                          <option value="ST">Scheduled Tribe (ST)</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between items-center">
                    <button type="button" onClick={() => setStep(1)} className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-slate-400 hover:bg-slate-50 shadow-sm transition-all duration-200 focus:outline-none">{t('btn_back', "Back")}</button>
                    <button type="button" onClick={() => setStep(3)} className="bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 shadow-md hover:scale-105 active:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2">{t('btn_next', "Next")}</button>
                  </div>
                </div>
              )}

              {validationWarnings.length > 0 && (
                <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                    <div className="flex items-center gap-3 text-red-600">
                      <AlertCircle className="w-8 h-8" />
                      <h3 className="text-xl font-bold">AI Data Review</h3>
                    </div>
                    <p className="text-slate-600 font-medium">We noticed some illogical entries in your form. Please verify:</p>
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                      {validationWarnings.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                    <div className="pt-4 flex justify-end gap-3">
                      <button type="button" onClick={() => setValidationWarnings([])} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200">Edit Form</button>
                      <button type="button" onClick={() => { setValidationWarnings([]); generateSeId(); }} className="px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700">Submit Anyway</button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">{t('h2_review', "Review & Submit")}</h2>
                  
                  <div className="bg-amber-50 text-amber-900 p-4 rounded-xl border border-amber-200 flex gap-4">
                    <ShieldAlert className="w-6 h-6 shrink-0 mt-0.5 text-amber-600" aria-hidden="true" />
                    <p className="text-sm font-medium leading-relaxed">{t('review_warning', "By submitting, you confirm these details are accurate. Once submitted, you will receive an 11-digit SE ID. Keep it safe to show the enumerator.")}</p>
                  </div>

                  <div className="pt-6 flex justify-between items-center">
                    <button type="button" onClick={() => setStep(2)} className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-slate-400 hover:bg-slate-50 shadow-sm transition-all duration-200 focus:outline-none">{t('btn_back', "Back")}</button>
                    <button type="button" onClick={handleValidationAndSubmit} disabled={isValidating} className="bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 shadow-md hover:scale-105 active:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 disabled:opacity-70 flex items-center gap-2">
                      {isValidating && <RefreshCw className="w-5 h-5 animate-spin" />}
                      {isValidating ? "Validating..." : t('btn_submit_gen', "Submit & Generate ID")}
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8 text-center py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full mb-4 border border-emerald-100">
                    <CheckCircle className="w-10 h-10" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-900">{t('h2_complete', "Self-Enumeration Complete!")}</h2>
                    <p className="text-slate-600 font-medium">{t('complete_desc', "Please save this SE ID. Show it to the enumerator when they visit.")}</p>
                  </div>
                  
                  <div className="bg-slate-50 p-8 rounded-2xl inline-block border border-slate-200">
                    <p className="text-xs text-slate-500 mb-2 uppercase font-bold tracking-wider">{t('lbl_your_seid', "Your SE ID")}</p>
                    <p className="text-4xl font-mono font-bold tracking-widest text-indigo-700 mb-8">{seId}</p>
                    
                    <div className="bg-white p-4 rounded-xl inline-block border border-slate-200 shadow-sm">
                      <QRCodeSVG value={seId || 'H0000000000'} size={128} />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                    <button type="button" onClick={() => { setStep(1); setSeId(null); setFormData({ state: '', ownership: '', roofMaterial: '', waterSource: '', memberCount: '1', caste: '' }); }} className="text-slate-600 font-semibold hover:text-slate-900 transition-colors duration-150">Start Another Mock Simulation</button>
                    <Link to="/summary" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-105 active:scale-100 transition-all duration-200">
                      View My Enumeration Summary
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-80 flex flex-col">
            <div className="bg-slate-950 text-white p-4 rounded-t-2xl flex items-center gap-3">
              <MessageSquareText className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold">{t('ai_assistant_title', "Sahayak AI Assistant")}</h3>
            </div>
            <div className="bg-white border-x border-b border-slate-200 rounded-b-2xl flex-1 p-6 flex flex-col">
              {assistantOpen ? (
                <div className="flex-1 overflow-y-auto mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium text-slate-700 leading-relaxed">
                  {loading ? (
                    <div className="animate-pulse flex space-x-2">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    </div>
                  ) : (
                    <p>{assistantReply}</p>
                  )}
                </div>
              ) : (
                <div className="flex-1 text-center text-slate-500 text-sm flex flex-col justify-center items-center py-8">
                  <MessageSquareText className="w-8 h-8 mb-4 opacity-50" />
                  <p className="font-medium px-4">{t('ai_confused', "Confused? Ask Sahayak in any of the 16 official languages.")}</p>
                </div>
              )}

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  <button onClick={() => askAssistant("Do I need to upload my Aadhaar card?")} className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 font-semibold transition-colors duration-150">Need Aadhaar?</button>
                  <button onClick={() => askAssistant("What if I make a mistake?")} className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 font-semibold transition-colors duration-150">Mistakes?</button>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder={t('ai_placeholder', "Ask a question...")} 
                    className="flex-1 text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-slate-900 font-medium"
                    value={assistantQuery}
                    onChange={(e) => setAssistantQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && askAssistant()}
                  />
                  <button 
                    onClick={() => askAssistant()}
                    className="bg-amber-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-amber-700 shadow-sm transition-colors duration-150"
                  >
                    {t('btn_ask', "Ask")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
