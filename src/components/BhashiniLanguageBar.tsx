import React from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../i18n';
import clsx from 'clsx';

export default function BhashiniLanguageBar() {
  const { i18n } = useTranslation();

  return (
    <div className="print:hidden bg-white border border-slate-200 rounded-2xl p-6 mb-8">
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
        
        <div className="flex items-center gap-2 flex-1 overflow-x-auto pb-2">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = i18n.language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                title={`${lang.englishName} (${lang.nativeName})`}
                aria-label={`Switch to ${lang.englishName}`}
                className={clsx(
                  "text-sm px-3 py-1.5 rounded-full border transition-colors duration-150 font-semibold select-none focus:outline-none focus:ring-2 focus:ring-amber-600 whitespace-nowrap shrink-0",
                  isSelected
                    ? "bg-amber-600 text-white border-amber-600"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {lang.nativeName}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end xl:self-center border-t border-slate-100 xl:border-t-0 pt-4 xl:pt-0 w-full xl:w-auto justify-end">
          <span className="text-sm text-slate-500 font-semibold">Powered by</span>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            <div className="flex flex-col justify-center w-4 h-4">
              <span className="h-1.5 bg-orange-500 rounded-t-sm"></span>
              <span className="h-1.5 bg-white"></span>
              <span className="h-1.5 bg-green-600 rounded-b-sm"></span>
            </div>
            <span className="font-extrabold tracking-tight text-sm text-slate-900 uppercase">
              BHASHINI
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
