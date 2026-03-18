'use client';

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Prefer environment variables so keys aren't hard‑coded
const firebaseConfig = {
  apiKey: "AIzaSyDsKXzSQPqi0intO7NsFc0uJziiuxfS3kY",
  authDomain: "eduquest-21cea.firebaseapp.com",
  projectId: "eduquest-21cea",
  storageBucket: "eduquest-21cea.firebasestorage.app",
  messagingSenderId: "1003690631055",
  appId: "1:1003690631055:web:99a1cfc6fcfc526c7375fa",
  measurementId: "G-D0TMEMRWXQ"
};

function validateConfig(cfg: Record<string, any>) {
  const missing = Object.entries(cfg)
    .filter(([_, v]) => !v)
    .map(([k]) => k);
  if (missing.length) {
    console.warn("[Firebase] Missing env vars (non-fatal):", missing.join(", "));
    return false;
  }
  return true;
}

function initializeFirebase() {
  try {
    const ok = validateConfig(firebaseConfig);
    if (!ok) {
      // Return no-op auth placeholder to avoid runtime crashes; consumers can detect missing config
      return { app: undefined as any, auth: undefined as any };
    }
    if (!getApps().length) {
      const app = initializeApp(firebaseConfig);
      return { app, auth: getAuth(app) };
    }
    return { app: getApp(), auth: getAuth() };
  } catch (error) {
    console.error('[Firebase] Initialization error (non-fatal fallback applied):', error);
    return { app: undefined as any, auth: undefined as any };
  }
}

const { app, auth } = initializeFirebase();

export { app, auth };