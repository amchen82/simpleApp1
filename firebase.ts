import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDTIGECTOraix8INFtzOyY32SJSDiZMoOY",
  authDomain: "calendarapp-b0232.firebaseapp.com",
  projectId: "calendarapp-b0232",
  storageBucket: "calendarapp-b0232.firebasestorage.app",
  messagingSenderId: "162398064171",
  appId: "1:162398064171:web:729e2a8c56b91d196a246e",
  measurementId: "G-GQLMD801P7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 