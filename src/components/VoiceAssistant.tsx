import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

export default function VoiceAssistant() {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // @ts-ignore - SpeechRecognition is not always in TS DOM types
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(() => {
    if (SpeechRecognition) {
      setSupported(true);
    }
  }, []);

  const readPageContent = () => {
    window.speechSynthesis.cancel();
    const mainContent = document.querySelector('main')?.innerText || "No content found.";
    const utterance = new SpeechSynthesisUtterance(mainContent);
    utterance.lang = i18n.language === 'en' ? 'en-IN' : i18n.language === 'hi' ? 'hi-IN' : 'mr-IN';
    window.speechSynthesis.speak(utterance);
    setFeedback('Reading page aloud...');
    setTimeout(() => setFeedback(''), 3000);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setFeedback('Speech stopped.');
    setTimeout(() => setFeedback(''), 3000);
  };

  const processCommand = useCallback((transcript: string) => {
    const text = transcript.toLowerCase();
    
    if (text.includes('go home')) {
      navigate('/');
      return 'Going to Home page...';
    }
    if (text.includes('show schedule')) {
      navigate('/schedule');
      return 'Opening State Schedule...';
    }
    if (text.includes('start wizard') || text.includes('self enumeration')) {
      navigate('/self-enumeration');
      return 'Opening Self-Enumeration Wizard...';
    }
    if (text.includes('trust and safety') || text.includes('check scam')) {
      navigate('/trust');
      return 'Opening Trust & Safety...';
    }
    if (text.includes('show dashboard') || text.includes('show data')) {
      navigate('/data');
      return 'Opening Data Dashboard...';
    }
    if (text.includes('citizen') || text.includes('aadhaar') || text.includes('my profile') || text.includes('ekyc')) {
      navigate('/citizen-dashboard');
      return 'Opening Citizen e-KYC Portal...';
    }
    if (text.includes('read this page') || text.includes('read page')) {
      readPageContent();
      return 'Reading this page...';
    }
    if (text.includes('stop') || text.includes('cancel speech')) {
      stopReading();
      return 'Stopped reading.';
    }

    // Dynamic voice switching for all 22 official languages
    const langMatch = text.match(/switch to (\w+)/);
    if (langMatch) {
      const requestedLang = langMatch[1].toLowerCase();
      const foundLang = [
        { code: 'hi', name: 'hindi' },
        { code: 'mr', name: 'marathi' },
        { code: 'bn', name: 'bengali' },
        { code: 'ta', name: 'tamil' },
        { code: 'te', name: 'telugu' },
        { code: 'gu', name: 'gujarati' },
        { code: 'kn', name: 'kannada' },
        { code: 'ml', name: 'malayalam' },
        { code: 'pa', name: 'punjabi' },
        { code: 'or', name: 'odia' },
        { code: 'as', name: 'assamese' },
        { code: 'ur', name: 'urdu' },
        { code: 'sa', name: 'sanskrit' },
        { code: 'en', name: 'english' }
      ].find(l => l.name === requestedLang);

      if (foundLang) {
        i18n.changeLanguage(foundLang.code);
        return `Switched to ${requestedLang}.`;
      }
    }

    // Unrecognized command - pass to Sahayak Chatbot
    window.dispatchEvent(new CustomEvent('sahayak-ask', { detail: { question: transcript, speak: true } }));
    return `Asking Sahayak...`;
  }, [navigate, i18n]);

  const toggleListen = () => {
    if (listening) {
      setListening(false);
      return;
    }

    if (!SpeechRecognition) return;
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN'; // Default to english parsing for commands

    recognition.onstart = () => {
      setListening(true);
      setFeedback('Listening... Try saying "Go Home" or "Read this page"');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const resultMessage = processCommand(transcript);
      setFeedback(resultMessage);
      
      // Clear feedback after 3 seconds
      setTimeout(() => setFeedback(''), 3000);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setListening(false);
      
      if (event.error === 'not-allowed') {
        setSupported(false); // Hide button permanently if mic denied
      } else {
        setFeedback(`Microphone error: ${event.error}`);
        setTimeout(() => setFeedback(''), 3000);
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  if (!supported) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {feedback && (
        <div className="bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-in fade-in slide-in-from-bottom-2 max-w-xs text-center border border-slate-700">
          {feedback}
        </div>
      )}
      <button
        onClick={toggleListen}
        className={`p-4 rounded-full shadow-lg transition-all ${
          listening 
            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
            : 'bg-slate-950 hover:bg-slate-800 text-white'
        }`}
        aria-label={listening ? "Stop listening" : "Start voice assistant"}
      >
        {listening ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
      </button>
    </div>
  );
}
