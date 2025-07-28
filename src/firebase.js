// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtOFhFL51mAPB3uSbAZ0l910o6kr9Ad9A",
  authDomain: "personal-finance-tracker-92e3c.firebaseapp.com",
  projectId: "personal-finance-tracker-92e3c",
  storageBucket: "personal-finance-tracker-92e3c.firebasestorage.app",
  messagingSenderId: "949661966584",
  appId: "1:949661966584:web:f28a67b05aac18b2e71b0d",
  measurementId: "G-ZD29JR2NEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Helper function to sign in anonymously
export const signInAnonymous = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in anonymously:', error);
    throw error;
  }
};

export { db, auth };