// model/AkunPetugas.js → C01 AkunPetugas.
// Untuk issue Jadwal baru berisi cekStatusLogin() dan getWilayahTugas(); operasi lain ditambahkan
// di issue Log In & Sign Up.

import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/database/firebase';

class AkunPetugas {
  // Menunggu Firebase selesai membaca sesi login yang tersimpan di HP, lalu mengembalikan user-nya
  // (null kalau belum login). auth.currentUser saja masih null sesaat setelah aplikasi dibuka.
  static #tungguSesiLogin() {
    return new Promise((selesai, gagal) => {
      const berhenti = onAuthStateChanged(
        auth,
        (user) => {
          berhenti();
          selesai(user);
        },
        gagal
      );
    });
  }

  static async cekStatusLogin() {
    return (await AkunPetugas.#tungguSesiLogin()) !== null;
  }

  // Wilayah tugas petugas yang sedang login (= id dokumen `jadwal`), atau null kalau belum login.
  static async getWilayahTugas() {
    const user = await AkunPetugas.#tungguSesiLogin();
    if (!user) return null;
    const profil = await getDoc(doc(db, 'akunPetugas', user.uid));
    return profil.exists() ? profil.data().wilayahTugas ?? null : null;
  }
}

export default AkunPetugas;
