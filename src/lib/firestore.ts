import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);

// Only connect to emulator if explicitly enabled and running
const shouldUseEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

if (shouldUseEmulator && process.env.NODE_ENV === 'development' && !(globalThis as any).firestoreEmulatorConnected) {
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    (globalThis as any).firestoreEmulatorConnected = true;
    console.log('Connected to Firestore emulator');
  } catch (error) {
    console.log('Firestore emulator connection failed, using production database');
  }
} else {
  // Ensure we're using production Firestore
  console.log('Using production Firestore database');
}

// Helper function to handle network issues
export const handleFirestoreError = (error: any) => {
  if (error.code === 'unavailable' || error.code === 'deadline-exceeded') {
    console.log('Firestore temporarily unavailable, retrying...');
    return true; // Indicates retry is possible
  }
  return false;
};

export { db, auth };
export default app;