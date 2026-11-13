// src/database/firebase.js
// Satu-satunya tempat yang menyiapkan koneksi Firebase. Model mengimpor `db` dan `auth` dari sini.
//
// EXPO_PUBLIC_USE_EMULATOR=true  → emulator di laptop (EXPO_PUBLIC_EMULATOR_HOST = IP laptop)
// EXPO_PUBLIC_USE_EMULATOR=false → Firebase cloud (config dari EXPO_PUBLIC_FIREBASE_*)

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const pakaiEmulator = process.env.EXPO_PUBLIC_USE_EMULATOR === 'true';

const config = pakaiEmulator
  ? {
      // Emulator tidak memeriksa nilai ini; project "demo-" tidak butuh akun.
      apiKey: 'demo-key',
      authDomain: 'demo-ecotrack.firebaseapp.com',
      projectId: 'demo-ecotrack',
      appId: 'demo-app',
    }
  : {
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    };

const app = getApps().length ? getApp() : initializeApp(config);

// Status login disimpan di HP, jadi tetap login setelah aplikasi ditutup.
// initializeAuth hanya boleh dipanggil sekali; saat Fast Refresh pakai yang sudah ada.
let auth;
try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch {
  auth = getAuth(app);
}

const db = getFirestore(app);

if (pakaiEmulator && !globalThis.__ecotrackEmulatorTersambung) {
  const host = process.env.EXPO_PUBLIC_EMULATOR_HOST?.trim();

  // Tanpa pengecekan ini, host kosong membuat Firebase menyambung ke "undefined" dan aplikasi
  // hanya loading/timeout tanpa pesan jelas. localhost juga salah di HP (menunjuk HP itu sendiri).
  if (!host) {
    throw new Error(
      'EXPO_PUBLIC_EMULATOR_HOST belum diisi di .env. Isi dengan IP laptop (cek dengan ipconfig), ' +
        'lalu jalankan ulang: npx expo start -c'
    );
  }
  if (host === 'localhost' || host === '127.0.0.1') {
    console.warn(
      'EXPO_PUBLIC_EMULATOR_HOST = ' + host + '. Di HP/Expo Go ini menunjuk HP itu sendiri, bukan laptop. ' +
        'Pakai IP laptop (cek dengan ipconfig) kalau tidak bisa tersambung.'
    );
  }

  connectFirestoreEmulator(db, host, 8080);
  connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true });
  globalThis.__ecotrackEmulatorTersambung = true;
}

export { app, auth, db, pakaiEmulator };
