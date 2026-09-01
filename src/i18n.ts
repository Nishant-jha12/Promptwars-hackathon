import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export interface LanguageMeta {
  code: string;
  nativeName: string;
  englishName: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'as', nativeName: 'অসমীয়া', englishName: 'Assamese' },
  { code: 'bn', nativeName: 'বাংলা', englishName: 'Bengali' },
  { code: 'brx', nativeName: 'बोडो', englishName: 'Bodo' },
  { code: 'doi', nativeName: 'डोगरी', englishName: 'Dogri' },
  { code: 'gu', nativeName: 'ગુજરાતી', englishName: 'Gujarati' },
  { code: 'hi', nativeName: 'हिंदी', englishName: 'Hindi' },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada' },
  { code: 'kok', nativeName: 'कोंकणी', englishName: 'Konkani' },
  { code: 'ks', nativeName: 'كٲشُر', englishName: 'Kashmiri' },
  { code: 'ml', nativeName: 'മലയാളം', englishName: 'Malayalam' },
  { code: 'mni', nativeName: 'মণিপুরী', englishName: 'Manipuri' },
  { code: 'mai', nativeName: 'मैथिली', englishName: 'Maithili' },
  { code: 'mr', nativeName: 'मराठी', englishName: 'Marathi' },
  { code: 'ne', nativeName: 'नेपाली', englishName: 'Nepali' },
  { code: 'or', nativeName: 'ଓଡ଼ିଆ', englishName: 'Odia' },
  { code: 'pa', nativeName: 'ਪੰਜਾਬੀ', englishName: 'Punjabi' },
  { code: 'sa', nativeName: 'संस्कृत', englishName: 'Sanskrit' },
  { code: 'sat', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', englishName: 'Santali' },
  { code: 'sd', nativeName: 'सिंधी', englishName: 'Sindhi' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil' },
  { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu' },
  { code: 'ur', nativeName: 'اردو', englishName: 'Urdu' },
  { code: 'en', nativeName: 'English', englishName: 'English' },
];

const en = {
  app_name: "Census Sahayak 2027",
  disclaimer: "Unofficial hackathon prototype, built for PromptWars x ADYPU. Not affiliated with the Government of India or ORGI. Do not enter real Aadhaar, bank, or personal ID numbers.",
  nav_home: "The Two Phases",
  nav_schedule: "State Schedule",
  nav_se: "Self-Enumeration",
  nav_safety: "Trust & Safety",
  nav_data: "Data Viz",
  hero_title: "India's First Digital Census",
  hero_badge: "16th National Census • 8th After Independence",
  hero_desc: "Under the Census Act 1948 and Census Rules 1990, Census 2027 is India's first fully digital census. Understand your timeline, what data is collected, and how to participate securely.",
  phase2_banner: "Phase II is already underway in Ladakh and snow-bound districts, since 17 August 2026.",
  phase1: "Phase I: Houselisting & Housing Census",
  phase1_dates: "1 April – 30 September 2026",
  phase1_window: "(A 30-day window set by each State/UT)",
  phase1_what: "What is collected?",
  phase1_i1: "Housing conditions & building materials",
  phase1_i2: "Household amenities (water, electricity, LPG)",
  phase1_i3: "Household assets (vehicles, electronics)",
  phase1_digital: "Digital Innovation",
  phase1_geo1: "Every building is geo-tagged for the first time.",
  phase1_geo2: "Field Enumerators collect data using the official HLO Mobile Application.",
  phase2: "Phase II: Population Enumeration",
  phase2_dates: "February 2027",
  phase2_window: "(Reference Date: 1 March 2027. Snow-bound areas: Sept 2026)",
  phase2_what: "What is collected?",
  phase2_i1: "Demographic & socio-economic data",
  phase2_i2: "Migration and fertility data",
  phase2_i3: "Caste enumeration: a self-declared open answer, not sorted into a fixed list — the first time since 1931.",
  phase2_note: "Important: Population numbers for 2027 are NOT YET published. The census is still mid-collection.",
  
  // Schedule
  schedule_title: "State-Wise Schedule",
  schedule_desc: "Find out when Self-Enumeration (SE) and Houselisting (HLO) begin in your state.",
  schedule_search: "Search your state...",
  schedule_se_notice: "Self-Enumeration (SE): A 15-day online window just before each state's field period. You can fill out your census details online at se.census.gov.in.",
  th_state: "State / Union Territory",
  th_status: "Status",
  th_se: "Self-Enumeration Window",
  th_field: "Field Operations (HLO / PE)",
  
  // Self Enumeration
  se_badge: "Official Standard: 15–20 Min • 16 Languages Supported",
  se_title: "Self-Enumeration Wizard",
  se_desc: "This is an interactive simulation of the official se.census.gov.in portal. Once submitted, your 11-digit SE ID is confirmed by your enumerator using the official HLO Mobile App.",
  se_tab_mock: "Mock Self-Enumeration Portal",
  se_tab_verify: "Verify SE ID (Firestore Cloud)",
  step_household: "Household",
  step_members: "Members",
  step_review: "Review",
  step_seid: "SE ID",
  h2_building: "Household & Building Details",
  lbl_material: "Building Material (Roof)",
  lbl_water: "Drinking Water Source",
  btn_next: "Next",
  btn_back: "Back",
  h2_members: "Household Members",
  lbl_head: "Member 1 (Head)",
  lbl_age: "Age",
  lbl_tongue: "Mother Tongue",
  h2_review: "Review & Submit",
  review_warning: "By submitting, you confirm these details are accurate. Once submitted, you will receive an 11-digit SE ID. Keep it safe to show the enumerator.",
  btn_submit_gen: "Submit & Generate ID",
  h2_complete: "Self-Enumeration Complete!",
  complete_desc: "Please save this SE ID. Show it to the enumerator when they visit.",
  lbl_your_seid: "Your SE ID",
  btn_restart: "Start Another Mock Simulation",
  btn_verify_cloud: "Verify in Cloud Registry",
  verify_title: "SE ID Verification Portal",
  verify_desc: "Check if an 11-digit Self-Enumeration ID exists in the Firebase Firestore Registry.",
  btn_verify_btn: "Verify ID",
  ai_assistant_title: "Sahayak AI Assistant",
  ai_confused: "Confused? Ask Sahayak in any of the 16 official languages.",
  ai_placeholder: "Ask a question...",
  btn_ask: "Ask",

  // Trust & Safety
  trust_title: "Trust & Safety",
  trust_desc: "Your data is strictly protected under Section 15 of the Census Act 1948. Learn how to spot fake callers and phishing scams.",
  scam_checker_title: "Check a Suspicious Message",
  scam_checker_desc: "Paste an SMS or WhatsApp message here. Our AI will check it against known Census 2027 scams. This text is only sent securely to the AI and is never saved.",
  scam_placeholder: 'e.g. "Dear citizen, your Census is incomplete. Click here to update your Aadhaar OTP: http://fake-link.com"',
  btn_analyze: "Analyze Message",
  red_flags_title: "Red Flags (SCAMS)",
  red_flags_note: "Note: Being asked for Aadhaar or bank details isn't itself suspicious — it's how it's asked that matters. The official Phase II questionnaire does collect these where available. However, look out for these clear signs of a scam:",
  red_flag_1: "Being asked to read out or share an OTP with a caller (you should only enter it yourself on se.census.gov.in).",
  red_flag_2: "Unsolicited SMS/WhatsApp links asking you to \"update\" or \"verify\" your data.",
  red_flag_3: "Anyone asking for money to \"process\" your entry.",
  red_flag_4: "A census app from outside the official app store (like a fake APK).",
  red_flag_5: "An \"enumerator\" who won't show a valid official ID card.",
  official_facts_title: "Official Facts",
  fact_1: "No documents are required to be uploaded for Self-Enumeration.",
  fact_2: "The only official portal is se.census.gov.in.",
  fact_3: "Information you provide is strictly confidential under Section 15 of the Census Act 1948 and cannot be used in courts or against you.",
  report_cyber_fraud: "Report Cyber Fraud",
  dial_1930: "Dial 1930",

  // Data Viz
  dataviz_title: "Census Data Explorer",
  dataviz_desc: "Historical 2011 baselines and illustrative 2027 progress.",
  literacy_chart_title: "Literacy Rate by State (2011)",
  literacy_real_data: "Real 2011 Census Data",
  illustrative_title: "Illustrative: 2027 SE Progress",
  illustrative_note: "Note: 2027 population results are NOT published yet. This chart uses mock/sample data to demonstrate the dashboard capability."
};

const hi = {
  app_name: "जनगणना सहायक 2027",
  disclaimer: "अनौपचारिक हैकथॉन प्रोटोटाइप, PromptWars x ADYPU के लिए बनाया गया। भारत सरकार या ORGI से संबद्ध नहीं है। असली आधार या बैंक विवरण दर्ज न करें।",
  nav_home: "दो चरण",
  nav_schedule: "राज्य अनुसूची",
  nav_se: "स्व-गणना",
  nav_safety: "सुरक्षा एवं विश्वास",
  nav_data: "डेटा विज़",
  hero_title: "भारत की पहली डिजिटल जनगणना",
  hero_badge: "16वीं राष्ट्रीय जनगणना • स्वतंत्रता के बाद 8वीं",
  hero_desc: "जनगणना अधिनियम 1948 और जनगणना नियम 1990 के तहत, जनगणना 2027 भारत की पहली पूर्ण डिजिटल जनगणना है। अपनी समयरेखा, डेटा संग्रह और सुरक्षित भागीदारी समझें।",
  phase2_banner: "लद्दाख और बर्फबारी वाले जिलों में 17 अगस्त 2026 से चरण II पहले ही शुरू हो चुका है।",
  phase1: "चरण I: मकान सूचीकरण एवं आवास जनगणना",
  phase1_dates: "1 अप्रैल – 30 सितंबर 2026",
  phase1_window: "(प्रत्येक राज्य/केंद्र शासित प्रदेश द्वारा 30 दिनों की निर्धारित अवधि)",
  phase1_what: "क्या एकत्र किया जाता है?",
  phase1_i1: "आवास की स्थिति और निर्माण सामग्री",
  phase1_i2: "घरेलू सुविधाएं (पानी, बिजली, एलपीजी)",
  phase1_i3: "घरेलू संपत्ति (वाहन, इलेक्ट्रॉनिक्स)",
  phase1_digital: "डिजिटल नवाचार",
  phase1_geo1: "पहली बार प्रत्येक इमारत को जियो-टैग किया जा रहा है।",
  phase1_geo2: "फील्ड प्रगणक आधिकारिक HLO मोबाइल ऐप से डेटा एकत्र करते हैं।",
  phase2: "चरण II: जनसंख्या गणना",
  phase2_dates: "फरवरी 2027",
  phase2_window: "(संदर्भ तिथि: 1 मार्च 2027। बर्फीले क्षेत्र: सितंबर 2026)",
  phase2_what: "क्या एकत्र किया जाता है?",
  phase2_i1: "जनसांख्यिकीय और सामाजिक-आर्थिक डेटा",
  phase2_i2: "प्रवास और प्रजनन क्षमता डेटा",
  phase2_i3: "जाति गणना: एक स्व-घोषित खुला उत्तर, जिसे किसी निश्चित सूची में नहीं बांटा गया — 1931 के बाद पहली बार।",
  phase2_note: "महत्वपूर्ण: 2027 के जनसंख्या आंकड़े अभी प्रकाशित नहीं हुए हैं।",
  
  schedule_title: "राज्य-वार समय सारिणी",
  schedule_desc: "जानें कि आपके राज्य में स्व-गणना (SE) और मकान सूचीकरण (HLO) कब शुरू होगा।",
  schedule_search: "अपना राज्य खोजें...",
  schedule_se_notice: "स्व-गणना (SE): प्रत्येक राज्य की फील्ड अवधि से ठीक पहले 15 दिन की ऑनलाइन विंडो। आप se.census.gov.in पर विवरण भर सकते हैं।",
  th_state: "राज्य / केंद्र शासित प्रदेश",
  th_status: "स्थिति",
  th_se: "स्व-गणना विंडो",
  th_field: "फील्ड संचालन (HLO / PE)",
  
  se_badge: "आधिकारिक मानक: 15–20 मिनट • 16 भाषाएं समर्थित",
  se_title: "स्व-गणना विज़ार्ड",
  se_desc: "यह se.census.gov.in का एक सिमुलेशन है। जमा करने के बाद, आपका 11-अंकीय SE ID प्रगणक द्वारा HLO मोबाइल ऐप से सत्यापित किया जाता है।",
  se_tab_mock: "मॉक स्व-गणना पोर्टल",
  se_tab_verify: "SE ID सत्यापित करें (क्लाउड)",
  step_household: "घर",
  step_members: "सदस्य",
  step_review: "समीक्षा",
  step_seid: "SE ID",
  h2_building: "घर और भवन विवरण",
  lbl_material: "भवन सामग्री (छत)",
  lbl_water: "पीने के पानी का स्रोत",
  btn_next: "आगे बढ़ें",
  btn_back: "पीछे जाएं",
  h2_members: "घर के सदस्य",
  lbl_head: "सदस्य 1 (मुखिया)",
  lbl_age: "उम्र",
  lbl_tongue: "मातृभाषा",
  h2_review: "समीक्षा और सबमिट करें",
  review_warning: "सबमिट करने पर, आप पुष्टि करते हैं कि ये विवरण सही हैं। आपको 11 अंकों का SE ID प्राप्त होगा।",
  btn_submit_gen: "सबमिट करें और ID बनाएं",
  h2_complete: "स्व-गणना पूर्ण!",
  complete_desc: "कृपया इस SE ID को सुरक्षित रखें और प्रगणक के आने पर दिखाएं।",
  lbl_your_seid: "आपकी SE ID",
  btn_restart: "एक और मॉक सिमुलेशन शुरू करें",
  btn_verify_cloud: "क्लाउड रजिस्ट्री में जांचें",
  verify_title: "SE ID सत्यापन पोर्टल",
  verify_desc: "जांचें कि क्या 11 अंकों का SE ID क्लाउड डेटाबेस में मौजूद है।",
  btn_verify_btn: "ID सत्यापित करें",
  ai_assistant_title: "सहायक AI असिस्टेंट",
  ai_confused: "कोई प्रश्न है? 16 आधिकारिक भाषाओं में पूछें।",
  ai_placeholder: "प्रश्न पूछें...",
  btn_ask: "पूछें",

  trust_title: "सुरक्षा एवं विश्वास",
  trust_desc: "आपका डेटा जनगणना अधिनियम 1948 की धारा 15 के तहत पूरी तरह सुरक्षित है। फर्जी कॉल और धोखाधड़ी से सावधान रहें।",
  scam_checker_title: "संदिग्ध संदेश की जांच करें",
  scam_checker_desc: "संदेश यहाँ पेस्ट करें। हमारा AI इसे जनगणना धोखाधड़ी के खिलाफ जांचेगा।",
  scam_placeholder: 'उदा. "नागरिक, अपनी जनगणना पूरी करने के लिए OTP साझा करें..."',
  btn_analyze: "संदेश का विश्लेषण करें",
  red_flags_title: "धोखाधड़ी के संकेत (SCAMS)",
  red_flags_note: "नोट: आधार या बैंक विवरण पूछा जाना अपने आप में धोखाधड़ी नहीं है। लेकिन इन बातों से सावधान रहें:",
  red_flag_1: "फोन पर किसी कॉलर के साथ OTP साझा करने के लिए कहा जाना।",
  red_flag_2: "डेटा \"अपडेट\" करने के लिए अनचाहे SMS/WhatsApp लिंक।",
  red_flag_3: "प्रविष्टि संसाधित करने के लिए कोई पैसे मांगना।",
  red_flag_4: "अनौपचारिक APK ऐप डाउनलोड करने के लिए कहा जाना।",
  red_flag_5: "प्रगणक जो वैध आधिकारिक पहचान पत्र नहीं दिखाता है।",
  official_facts_title: "आधिकारिक तथ्य",
  fact_1: "स्व-गणना के लिए कोई दस्तावेज अपलोड करने की आवश्यकता नहीं है।",
  fact_2: "केवल आधिकारिक पोर्टल se.census.gov.in है।",
  fact_3: "जानकारी धारा 15 के तहत गोपनीय है और न्यायालय में उपयोग नहीं की जा सकती।",
  report_cyber_fraud: "साइबर धोखाधड़ी की रिपोर्ट करें",
  dial_1930: "डायल करें 1930",

  dataviz_title: "जनगणना डेटा एक्सप्लोरर",
  dataviz_desc: "2011 के आधिकारिक आधार और 2027 की अनुमानित प्रगति।",
  literacy_chart_title: "राज्य-वार साक्षरता दर (2011)",
  literacy_real_data: "वास्तविक 2011 डेटा",
  illustrative_title: "उदाहरण: 2027 स्व-गणना प्रगति",
  illustrative_note: "नोट: 2027 के परिणाम अभी प्रकाशित नहीं हुए हैं।"
};

const mr = {
  ...hi,
  app_name: "जनगणना सहायक २०२७",
  disclaimer: "अनधिकृत हॅकाथॉन प्रोटोटाइप. भारत सरकारशी संलग्न नाही. वास्तविक आधार किंवा बँक तपशील प्रविष्ट करू नका.",
  nav_home: "दोन टप्पे",
  nav_schedule: "राज्य वेळापत्रक",
  nav_se: "स्वतःची गणना",
  nav_safety: "सुरक्षा आणि विश्वास",
  nav_data: "माहिती फलक",
  hero_title: "भारताची पहिली डिजिटल जनगणना",
  hero_badge: "१६ वी राष्ट्रीय जनगणना • स्वातंत्र्यानंतरची ८ वी",
  phase1: "टप्पा १: घरसूची व गृह जनगणना",
  phase2: "टप्पा २: लोकसंख्या गणना",
  schedule_title: "राज्यवार वेळापत्रक",
  se_title: "स्वयं-गणना विझार्ड",
  trust_title: "सुरक्षा आणि विश्वास",
  dataviz_title: "जनगणना डेटा डॅशबोर्ड",
  btn_next: "पुढे",
  btn_back: "मागे",
  btn_ask: "विचारा",
  dial_1930: "डायल करा १९३०"
};

const resources: Record<string, { translation: Record<string, string> }> = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr },
};

// Populate other scheduled languages with fallback to Hindi / English
SUPPORTED_LANGUAGES.forEach(lang => {
  if (!resources[lang.code]) {
    // If it's a Devanagari script based language, default to Hindi translation base, else English base
    if (['mai', 'bho', 'doi', 'kok', 'sa', 'ne', 'brx', 'sd'].includes(lang.code)) {
      resources[lang.code] = {
        translation: {
          ...hi,
          app_name: `${lang.nativeName} - ${hi.app_name}`
        }
      };
    } else {
      resources[lang.code] = {
        translation: {
          ...en,
          app_name: `${lang.nativeName} - Census Sahayak 2027`
        }
      };
    }
  }
});

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
