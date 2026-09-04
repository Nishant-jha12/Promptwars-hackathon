const fs = require('fs');
let code = fs.readFileSync('src/pages/SelfEnumeration.tsx', 'utf8');

// 1. Add imports
code = code.replace("import { RefreshCw, CheckCircle2, CheckCircle, ShieldAlert, Smartphone, MessageSquareText, Volume2 } from 'lucide-react';",
"import { RefreshCw, CheckCircle2, CheckCircle, ShieldAlert, Smartphone, MessageSquareText, Volume2, ScanText, Mic, AlertCircle } from 'lucide-react';\nimport { fetchGeminiWithRetry } from '../utils/geminiClient';");

// 2. Add state
code = code.replace("const [isDigiLockerLoading, setIsDigiLockerLoading] = useState(false);",
\const [isDigiLockerLoading, setIsDigiLockerLoading] = useState(false);
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
        contents: [{ role: "user", parts: [{ text: "Current data: " + JSON.stringify(formData) + "\\n\\nUser said: " + transcript }] }]
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
\);

// 3. Document Scanner function
code = code.replace("const handleDigiLockerFetch = () => {",
\const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleDigiLockerFetch = () => {\);

// 4. Refactor askAssistant
code = code.replace(/const askAssistant = async \\(presetQuery\\?: string\\) => \\{[\\s\\S]*?setLoading\\(false\\);\\n    \\};/,
\const askAssistant = async (presetQuery?: string) => {
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
    };\);

// 5. Submit validation
code = code.replace("const generateSeId = () => {",
\const handleValidationAndSubmit = async () => {
    setIsValidating(true);
    try {
      const payload = {
        systemInstruction: { parts: [{ text: "You are an AI validation agent. Review this census form data for obvious logical inconsistencies or missing vital data. If perfect, return JSON { isValid: true, warnings: [] }. If issues found, return { isValid: false, warnings: ['Issue 1...'] }" }] },
        contents: [{ role: "user", parts: [{ text: JSON.stringify(formData) }] }]
      };
      const result = await fetchGeminiWithRetry(payload, 3, true);
      
      if (!result.isValid && result.warnings?.length > 0) {
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

  const generateSeId = () => {\);

// 6. UI Updates
// Add Scanner button next to DigiLocker
code = code.replace(/<button \\n\\s*type="button" \\n\\s*onClick=\\{handleDigiLockerFetch\\}/,
\
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
  onClick={handleDigiLockerFetch}\);

// Add Voice Mode toggle
code = code.replace(/<h2 className="text-xl font-bold text-slate-900 flex items-center justify-between">/,
\<div className="flex items-center justify-between">
  <h2 className="text-xl font-bold text-slate-900">{t('h2_building', "Household & Building Details")}</h2>
  <button type="button" onClick={() => setIsVoiceMode(!isVoiceMode)} className={\\\lex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors \\\\}>
    <Mic className="w-4 h-4" /> {isVoiceMode ? "Voice Mode On" : "Voice Mode"}
  </button>
</div>
{isVoiceMode && (
  <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center justify-between">
    <p className="text-indigo-800 text-sm font-medium">Click the microphone to answer the questions by speaking.</p>
    <button type="button" onClick={() => { setIsListening(true); recognitionRef.current?.start(); }} className={\\\p-3 rounded-full \\\\}>
      <Mic className="w-5 h-5" />
    </button>
  </div>
)}
<div className="hidden">\); 

// Clean up the replaced h2
code = code.replace(/<div className="hidden">\\s*\\{t\\('h2_building', "Household & Building Details"\\)\\}\\s*<button type="button" onClick=\\{[\\s\\S]*?<\\/h2>/, '');

// Submit button validation intercept
code = code.replace(/<button type="button" onClick=\\{generateSeId\\} className="bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 shadow-md hover:scale-105 active:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2">\\{t\\('btn_submit_gen', "Submit & Generate ID"\\)\\}<\\/button>/,
\<button type="button" onClick={handleValidationAndSubmit} disabled={isValidating} className="bg-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-700 shadow-md hover:scale-105 active:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 disabled:opacity-70 flex items-center gap-2">
  {isValidating && <RefreshCw className="w-5 h-5 animate-spin" />}
  {isValidating ? "Validating..." : t('btn_submit_gen', "Submit & Generate ID")}
</button>\);

// Validation Modal
code = code.replace(/\\{step === 3 && \\(/,
\{validationWarnings.length > 0 && (
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
{step === 3 && (\);

fs.writeFileSync('src/pages/SelfEnumeration.tsx', code);
