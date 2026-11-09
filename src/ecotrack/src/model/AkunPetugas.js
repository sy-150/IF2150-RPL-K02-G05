import SHA256 from 'crypto-js/sha256';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from '../database/firebase';

export function cekStatusLogin() {
  return (auth && auth.currentUser !== null) || AkunPetugas.statusLogin;
}

export const AkunPetugas = {
  idPetugas: '',
  username: '',
  nik: '',
  email: '',
  noTelepon: '',
  kataSandi: '',
  wilayahTugas: '',
  statusLogin: false,

  encrypt(password) {
    if (!password) return '';
    return SHA256(password).toString();
  },

  // 1. Cek Data Pemerintah berdasarkan Document ID (NIK)
  async cekDataPemerintah(nik) {
    try {
      const docRef = doc(db, 'dataPemerintah', nik);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { ada: true, data: docSnap.data() };
      }
      return { ada: false };
    } catch (error) {
      console.error('Error cekDataPemerintah:', error);
      return { ada: false };
    }
  },

  // 2. Cek apakah NIK sudah terdaftar akun
  async cekNikTerdaftar(nik) {
    try {
      const docRef = doc(db, 'nikTerdaftar', nik);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error('Error cekNikTerdaftar:', error);
      return false;
    }
  },

  // 3. Registrasi Firebase Auth & Firestore Batch
  async createAkunPetugas(username, nik, email, noTelepon, password, wilayahTugas) {
    try {
      // Step A: Buat akun di Firebase Auth (Otomatis cek duplikasi email)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const passwordHash = this.encrypt(password);

      // Step B: Batch write ke akunPetugas/{uid} dan nikTerdaftar/{nik}
      const batch = writeBatch(db);

      const refAkun = doc(db, 'akunPetugas', uid);
      batch.set(refAkun, {
        username: username,
        nik: nik,
        email: email,
        noTelepon: noTelepon,
        kataSandi: passwordHash,
        wilayahTugas: wilayahTugas,
      });

      const refNik = doc(db, 'nikTerdaftar', nik);
      batch.set(refNik, {
        uid: uid,
      });

      // Commit secara atomic agar lolos aturan security rules getAfter()
      await batch.commit();

      this.idPetugas = uid;
      this.username = username;
      this.nik = nik;
      this.email = email;
      this.noTelepon = noTelepon;
      this.kataSandi = passwordHash;
      this.wilayahTugas = wilayahTugas;
      this.statusLogin = true;

      return { sukses: true };
    } catch (error) {
      console.error('Error createAkunPetugas:', error);
      if (error.code === 'auth/email-already-in-use') {
        return { sukses: false, pesan: 'EMAIL_TERDAFTAR' };
      }
      return { sukses: false, pesan: error.message };
    }
  },

  // 4. Proses Login menggunakan Firebase Auth & Fetch Profil
  async loginAuth(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Ambil data profil milik sendiri (diizinkan oleh rules: auth.uid == uid)
      const docRef = doc(db, 'akunPetugas', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        this.idPetugas = uid;
        this.username = docData.username;
        this.nik = docData.nik;
        this.email = docData.email;
        this.noTelepon = docData.noTelepon;
        this.kataSandi = docData.kataSandi;
        this.wilayahTugas = docData.wilayahTugas;
        this.statusLogin = true;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error loginAuth:', error);
      return false;
    }
  },

  async logout() {
    await signOut(auth);
    this.statusLogin = false;
    this.idPetugas = '';
    return true;
  },
};