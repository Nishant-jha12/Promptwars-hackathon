import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "lib-system-92934",
  appId: "1:1027083564607:web:0d4afefb0c4a64a597ea8a",
  storageBucket: "lib-system-92934.firebasestorage.app",
  apiKey: "AIzaSyDMP-NcTcNADUL7ip8fVhIBV7XYDkSqoV8",
  authDomain: "lib-system-92934.firebaseapp.com",
  messagingSenderId: "1027083564607",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export default app;
