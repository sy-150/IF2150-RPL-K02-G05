import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from 'firebase/auth';
import { db, auth } from '../database/firebase';

const KODE_KREDENSIAL_SALAH = [
  "auth/invalid-credential",
  "auth/invalid-login-credentials",
  "auth/wrong-password",
  "auth/user-not-found",
  "auth/invalid-email",
];

export function cekStatusLogin() {
  return (auth && auth.currentUser !== null) || AkunPetugas.statusLogin;
}

export const AkunPetugas = {
  idPetugas: '',
  username: '',
  nik: '',
  email: '',
  noTelepon: '',
  wilayahTugas: '',
  statusLogin: false,

  async cekDataPemerintah(nik) {
    const docSnap = await getDoc(doc(db, 'dataPemerintah', nik));
    return docSnap.exists() ? { ada: true, data: docSnap.data() } : { ada: false };
  },

  async cekNikTerdaftar(nik) {
    const docSnap = await getDoc(doc(db, 'nikTerdaftar', nik));
    return docSnap.exists();
  },

  async verifikasiPetugas(nik, username) {
    const govData = await this.cekDataPemerintah(nik);
    if (!govData.ada) return "NIK_TIDAK_TERDAFTAR";
    
    if (govData.data.namaLengkap.toLowerCase() !== username.trim().toLowerCase()) {
      return "NAMA_TIDAK_SESUAI";
    }

    const nikSudahPakai = await this.cekNikTerdaftar(nik);
    if (nikSudahPakai) return "NIK_SUDAH_TERDAFTAR";
    
    return "VALID";
  },

  async createAkunPetugas(username, nik, email, noTelepon, password, wilayahTugas) {
    let userBaru = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      userBaru = userCredential.user;
      const uid = userBaru.uid;

      const batch = writeBatch(db);
      batch.set(doc(db, 'akunPetugas', uid), {
        username: username,
        nik: nik,
        email: email,
        noTelepon: noTelepon,
        wilayahTugas: wilayahTugas,
      });
      batch.set(doc(db, 'nikTerdaftar', nik), {
        uid: uid,
      });
      await batch.commit();

      this.idPetugas = uid;
      this.username = username;
      this.nik = nik;
      this.email = email;
      this.noTelepon = noTelepon;
      this.wilayahTugas = wilayahTugas;
      this.statusLogin = true;

      return "BERHASIL";
    } catch (error) {
      if (userBaru) await deleteUser(userBaru).catch(() => {});
      
      if (error.code === 'auth/email-already-in-use') {
        return "EMAIL_TERDAFTAR";
      }
      throw error; 
    }
  },

  async loginAuth(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const docRef = doc(db, 'akunPetugas', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        this.idPetugas = uid;
        this.username = docData.username;
        this.nik = docData.nik;
        this.email = docData.email;
        this.noTelepon = docData.noTelepon;
        this.wilayahTugas = docData.wilayahTugas;
        this.statusLogin = true;
        return true;
      } else {
        await signOut(auth);
        return false;
      }
    } catch (error) {
      if (KODE_KREDENSIAL_SALAH.includes(error.code)) return false;
      throw error;
    }
  },

  async logout() {
    await signOut(auth);
    this.statusLogin = false;
    this.idPetugas = '';
    this.username = '';
    this.nik = '';
    this.email = '';
    this.noTelepon = '';
    this.wilayahTugas = '';
    return true;
  },
};