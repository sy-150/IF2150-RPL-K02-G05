// model/AkunPetugas.js → C01 AkunPetugas.
// Untuk issue Jadwal baru berisi cekStatusLogin(); operasi lain ditambahkan di issue Log In & Sign Up.

import { auth } from '@/database/firebase';

export function cekStatusLogin() {
  return auth.currentUser !== null;
}
