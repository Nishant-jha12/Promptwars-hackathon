import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Map, Calendar, AlertCircle } from 'lucide-react';

const allStates = [
  "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli & Daman & Diu", "Delhi (NDMC & Cantonment areas)", "Delhi (Municipal Corporation areas)", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", 
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", 
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

function getStateData(state: string) {
  if (["Andaman & Nicobar Islands", "Delhi (NDMC & Cantonment areas)", "Goa", "Karnataka", "Lakshadweep", "Mizoram", "Odisha", "Sikkim"].includes(state)) {
    return {
      statusLabel: 'Completed',
      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      seWindow: '1-15 Apr 2026',
      hloWindow: '16 Apr-15 May 2026',
      note: ''
    };
  }
  if (["Maharashtra", "Delhi (Municipal Corporation areas)", "Meghalaya", "Rajasthan", "Jharkhand"].includes(state)) {
    return {
      statusLabel: 'Completed',
      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      seWindow: '1-15 May 2026',
      hloWindow: '16 May-14 Jun 2026',
      note: ''
    };
  }
  if (["Andhra Pradesh", "Arunachal Pradesh", "Chandigarh", "Chhattisgarh", "Madhya Pradesh", "Haryana"].includes(state)) {
    return {
      statusLabel: 'Completed',
      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      seWindow: 'Revised',
      hloWindow: 'Began 28 Jul 2026',
      note: 'Date shifted from original announcement'
    };
  }
  if (state === "Tamil Nadu") {
    return {
      statusLabel: 'Completed',
      statusClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      seWindow: 'Mid-Late Jul 2026',
      hloWindow: '1-30 Aug 2026',
      note: ''
    };
  }
  if (state === "Assam" || state === "West Bengal") {
    return {
      statusLabel: 'Live',
      statusClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      seWindow: 'Aug 2026',
      hloWindow: 'Mid Aug-Mid Sep 2026',
      note: ''
    };
  }
  if (["Ladakh", "Jammu & Kashmir", "Himachal Pradesh", "Uttarakhand"].includes(state)) {
    return {
      statusLabel: 'Phase II (Live)',
      statusClass: 'bg-amber-50 text-amber-700 border-amber-200 font-bold',
      seWindow: 'PE SE: 17-31 Aug 2026',
      hloWindow: 'PE: Sept 2026 onwards',
      note: 'Reference date: 1 Oct 2026 (Snow-bound)'
    };
  }

  return {
    statusLabel: 'Upcoming',
    statusClass: 'bg-slate-100 text-slate-700 border-slate-200',
    seWindow: 'To be notified by State Govt',
    hloWindow: 'To be notified by State Govt',
    note: ''
  };
}

export default function StateSchedule() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const filteredStates = React.useMemo(() => 
    allStates.filter(state => 
      state.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [searchTerm]
  );

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported.");
      setTimeout(() => setLocationError(''), 3000);
      return;
    }
    setLocationLoading(true);
    setLocationError("");
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=5&addressdetails=1`);
          const data = await res.json();
          let stateName = data.address?.state || data.address?.region || "";
          
          if (stateName) {
            // Normalize names
            if (stateName.includes("Delhi")) stateName = "Delhi";
            if (stateName.includes("Andaman")) stateName = "Andaman & Nicobar Islands";
            if (stateName.includes("Dadra") || stateName.includes("Daman")) stateName = "Dadra & Nagar Haveli & Daman & Diu";
            
            const match = allStates.find(s => s.toLowerCase().includes(stateName.toLowerCase()) || stateName.toLowerCase().includes(s.toLowerCase()));
            setSearchTerm(match || stateName);
          } else {
            setLocationError("Could not find your state.");
            setTimeout(() => setLocationError(''), 3000);
          }
        } catch (err) {
          setLocationError("Location lookup failed.");
          setTimeout(() => setLocationError(''), 3000);
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationError("Permission denied.");
        setTimeout(() => setLocationError(''), 3000);
        setLocationLoading(false);
      }
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{t('schedule_title', "State-Wise Schedule")}</h1>
          <p className="text-lg font-normal text-slate-600 max-w-2xl leading-relaxed">
            {t('schedule_desc', "Find out when Self-Enumeration (SE) and Houselisting (HLO) begin in your state.")}
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
          <label htmlFor="state-search" className="sr-only">{t('schedule_search', "Search your state")}</label>
          <input 
            id="state-search"
            type="text" 
            placeholder={t('schedule_search', "Search your state...")} 
            className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-shadow text-slate-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={handleFindLocation}
            disabled={locationLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors border border-slate-200"
            title="Find my state using GPS"
          >
            {locationLoading ? (
              <svg className="w-4 h-4 animate-spin text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            )}
            <span className="sr-only">Use my location</span>
          </button>
          {locationError && (
            <div className="absolute top-full mt-2 right-0 text-xs font-semibold text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200 shadow-sm z-10 animate-fade-in-up">
              {locationError}
            </div>
          )}
        </div>
      </div>

      <div className="bg-amber-50 text-amber-900 p-4 rounded-xl border border-amber-200 flex items-start gap-3 mb-8">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
        <div className="text-sm font-semibold">
          {t('schedule_se_notice', "Self-Enumeration (SE): A 15-day online window just before each state's field period. You can fill out your census details online at se.census.gov.in.")}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-slate-900 text-sm">{t('th_state', "State / Union Territory")}</th>
                <th className="p-4 font-bold text-slate-900 text-sm">{t('th_status', "Status")}</th>
                <th className="p-4 font-bold text-slate-900 text-sm">{t('th_se', "Self-Enumeration Window")}</th>
                <th className="p-4 font-bold text-slate-900 text-sm">{t('th_field', "Field Operations (HLO / PE)")}</th>
                <th className="p-4 font-bold text-slate-900 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStates.map((state) => {
                const data = getStateData(state);
                const isUpcoming = data.statusLabel === 'Upcoming';

                return (
                  <tr key={state} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="p-4 font-semibold text-slate-900">
                      {state}
                      {data.note && <span className="text-xs text-slate-500 font-normal block mt-1">{data.note}</span>}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${data.statusClass}`}>
                        {data.statusLabel}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">
                      {isUpcoming ? (
                        <span className="text-sm text-slate-500">{data.seWindow}</span>
                      ) : (
                        <div className="flex items-center gap-2 font-medium text-slate-900">
                          <Calendar className="w-5 h-5 text-indigo-600" /> 
                          {data.seWindow}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-slate-600">
                      {isUpcoming ? (
                        <span className="text-sm text-slate-500">{data.hloWindow}</span>
                      ) : (
                        <div className="flex items-center gap-2 font-medium text-slate-900">
                          <Map className="w-5 h-5 text-slate-400" /> 
                          {data.hloWindow}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <ShareRowActions state={state} data={data} />
                    </td>
                  </tr>
                );
              })}
              {filteredStates.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-medium">
                    No states found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Subcomponent for Share Actions
function ShareRowActions({ state, data }: { state: string, data: any }) {
  const [copied, setCopied] = useState(false);
  
  const text = `Census 2027 Dates for ${state}:\nSelf-Enumeration: ${data.seWindow}\nField Visit: ${data.hloWindow}\nFind out more at se.census.gov.in`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: `Census 2027 Dates for ${state}`,
          text: text
        });
      } catch (e) {
        // ignore cancellation
      }
    } else {
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <button 
        onClick={handleShare}
        className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-emerald-200"
        title="Share to WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        Share
      </button>
      <button 
        onClick={handleCopy}
        className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-slate-200"
        title="Copy to clipboard"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
