import React, { useState } from 'react';
import { Monitor } from 'lucide-react';

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState(false);

  const changeFontSize = (delta: number) => {
    const newSize = Math.max(90, Math.min(110, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleContrast = () => {
    const newContrast = !contrast;
    setContrast(newContrast);
    if (newContrast) {
      document.documentElement.style.filter = 'contrast(1.15) saturate(1.2)';
    } else {
      document.documentElement.style.filter = 'none';
    }
  };

  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 flex justify-between items-center print:hidden border-b border-slate-800" id="top">
      <div className="flex items-center gap-4 font-medium">
        <span className="hidden sm:inline">Government of India</span>
        <span className="opacity-50 hidden sm:inline">|</span>
        <a href="#main-content" className="hover:text-white transition-colors">Skip to Main Content</a>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 border-r border-slate-700 pr-3">
          <button onClick={() => changeFontSize(-5)} className="px-1.5 hover:text-white font-bold" aria-label="Decrease Font Size">A-</button>
          <button onClick={() => changeFontSize(0)} className="px-1.5 hover:text-white font-bold" aria-label="Normal Font Size">A</button>
          <button onClick={() => changeFontSize(5)} className="px-1.5 hover:text-white font-bold" aria-label="Increase Font Size">A+</button>
        </div>
        <button onClick={toggleContrast} className="flex items-center gap-1 hover:text-white font-medium" aria-label="Toggle High Contrast">
          <Monitor className="w-3.5 h-3.5" /> <span className="hidden sm:inline">High Contrast</span>
        </button>
      </div>
    </div>
  );
}
