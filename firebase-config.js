// Firebase Configuration and Initialization
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAak40wl54A2kaSyxfFN5xiOShY3oPg6Ns",
  authDomain: "grock-fun-63159.firebaseapp.com",
  projectId: "grock-fun-63159",
  storageBucket: "grock-fun-63159.firebasestorage.app",
  messagingSenderId: "513451391473",
  appId: "1:513451391473:web:8d75c1ffab5aa2962a6c50",
  measurementId: "G-Q9FD6NHF7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;