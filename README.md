# Census Sahayak 2027

An unofficial, GenAI-powered web application prototype built for Indian citizens to understand and participate in Census 2027 (India's first fully digital census). Built for PromptWars x ADYPU.

## How this app meets the brief

This app meticulously maps all 6 required features into an accessible, responsive, and multilingual user experience:

1. **Explain the two phases:** 
   - **Location:** Home page (`src/pages/PhaseTwo.tsx`)
   - **Details:** Side-by-side Phase I (HLO) and Phase II (PE) cards detailing exactly what is collected in each, including the newly introduced self-declared caste enumeration.

2. **State-wise SE & HLO dates:**
   - **Location:** `/schedule` (`src/pages/StateSchedule.tsx`)
   - **Details:** A searchable, fully updated table reflecting the precise roll-out dates (e.g. Batch 1 vs Batch 2, delayed states, and the currently active Phase II for snow-bound districts).

3. **Guided self-enumeration:**
   - **Location:** `/self-enumeration` (`src/pages/SelfEnumeration.tsx`)
   - **Details:** A 4-step interactive wizard that collects mock household/member data and generates a valid 11-digit SE ID starting with "H", complete with a QR code and an embedded GenAI help assistant.

4. **Data privacy & misinformation:**
   - **Location:** `/trust` (`src/pages/TrustSafety.tsx`)
   - **Details:** Explains Section 15 of the Census Act 1948 and features a Gemini-powered scam detector. The detector accurately differentiates between legitimate requests (like Aadhaar/Bank details on the official questionnaire) and actual red flags (like OTP requests and fake APK links).

5. **Meaningful data visualisation:**
   - **Location:** `/data` (`src/pages/DataViz.tsx`)
   - **Details:** Uses Recharts to plot precise 2011 Census literacy figures (Maharashtra, Gujarat, Bihar) as a baseline, alongside an illustrative 2027 SE progress chart.

6. **Citizen e-KYC Portal & Privacy Dashboard:**
   - **Location:** `/citizen-dashboard` (`src/pages/CitizenDashboard.tsx`)
   - **Details:** Simulated Aadhaar e-KYC authentication (with OTP verification & 1-click demo login). Upon authentication, renders the citizen's complete census dossier: masked UIDAI details, geo-tagged housing records, registered family members, Phase I/II status, digital QR census pass, and Section 15 immutable access audit trails.

7. **Multi-language support:**
   - **Location:** Global (`src/App.tsx`, `src/i18n.ts`, `src/components/BhashiniLanguageBar.tsx`)
   - **Details:** Full-page localized rendering across all 22 Scheduled Indian Languages + English matching the Digital India / Bhashini pill switcher. Furthermore, the Gemini-powered components (Scam Checker & SE Assistant) can ingest and reply in any language dynamically.

---

## Technical Excellence

- **Code Quality:** Built with React 18, Vite, TypeScript, and Tailwind CSS. The architecture separates concerns cleanly into modular pages (`src/pages/`), client-side Firebase integrations (`src/firebase.ts`), and isolates Gemini API interactions to a secure Express backend (`server.js`).
- **Firebase & Cloud Persistence:** 
  - **Cloud Firestore Real-Time Scam Feed:** Citizens can report suspicious messages, which stream live into a crowdsourced community threat feed via Firestore `onSnapshot` subscriptions.
  - **SE ID Cloud Verification Registry:** Stores generated mock SE IDs anonymously in Firestore, with an interactive **"Verify SE ID"** portal for enumerators and citizens to confirm submission status.
  - **Firebase Hosting:** Configured with `firebase.json` and `.firebaserc` for instant static hosting and single-page routing rewrites.
- **Security:** Strict separation of client and server. The Gemini API key is heavily protected in the `.env` file and utilized exclusively by the backend proxy (`server.js`). No private API keys are ever exposed to the client.
- **Efficiency:** Utilizes Vite's rapid bundling, React's lazy loading for route splitting, and Tailwind's minimal CSS footprint for high performance and low bandwidth usage.
- **Testing:** Implemented automated component tests using Vitest and React Testing Library (`npm test`). Core functionalities—such as search filtering, wizard progression, and AI offline fallbacks—are verified to prevent regressions.
- **Accessibility (a11y):** The entire application is navigable via keyboard with explicit `focus:ring` states on all interactive elements. Semantic HTML, `aria-hidden` attributes for decorative icons, and `sr-only` screen-reader labels for placeholders ensure absolute compliance with WCAG standards. The Web Speech API provides native voice-command and Text-to-Speech support out-of-the-box.

---

*Disclaimer: Unofficial hackathon prototype, built for PromptWars x ADYPU. Not affiliated with the Government of India or ORGI. Do not enter real Aadhaar, bank, or personal ID numbers.*
