import { doc, getDoc, runTransaction, writeBatch } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  updatePassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';
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
    
    // Kesepakatan Baru: Simpan data resmi langsung ke kelas agar tidak perlu getDoc lagi
    this.username = govData.data.namaLengkap;
    this.wilayahTugas = govData.data.wilayahTugas;
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
      batch.set(doc(db, 'nikTerdaftar', nik), { uid: uid });
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
      if (error.code === 'auth/email-already-in-use') return "EMAIL_TERDAFTAR";
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

  // Tambahan di luar DPPL (tombol "Lupa kata sandi?" I01/I26): mengirim email berisi tautan untuk
  // membuat kata sandi baru. Halaman pengaturan ulangnya disediakan Firebase, jadi tidak ada
  // halaman tambahan di aplikasi. Error dilempar ke controller.
  async kirimResetKataSandi(email) {
    auth.languageCode = 'id'; // isi email dalam bahasa Indonesia
    await sendPasswordResetEmail(auth, email.trim());
  },

  // Menunggu Firebase selesai membaca sesi login yang tersimpan di HP, lalu mengembalikan user-nya
  // (null kalau belum login). auth.currentUser saja masih null sesaat setelah aplikasi dibuka.
  tungguSesiLogin() {
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
  },

  // DPPL Algo-AP-006: Mengambil data profil petugas yang sedang login.
  // Dibaca dari sesi Firebase + dokumen akunPetugas/{uid}, BUKAN dari atribut memori, karena
  // atribut memori kosong lagi setiap aplikasi dibuka ulang (sesi login tetap tersimpan di HP).
  // Mengembalikan null kalau belum login. Error (misalnya offline) dilempar ke controller.
  async getProfil() {
    const user = await this.tungguSesiLogin();
    if (!user) return null;

    const dokumen = doc(db, 'akunPetugas', user.uid);
    const hasil = await getDoc(dokumen);
    if (hasil.metadata.fromCache) throw new Error('Tidak bisa terhubung ke server');
    if (!hasil.exists()) return null;

    const data = hasil.data();

    // Setelah petugas memverifikasi email baru (lihat editProfil), email login di Auth sudah
    // berganti tapi Firestore belum. Samakan di sini.
    if (user.email && data.email !== user.email) {
      await runTransaction(db, async (transaksi) => {
        transaksi.update(dokumen, { email: user.email });
      });
      data.email = user.email;
    }

    this.idPetugas = user.uid;
    this.username = data.username;
    this.nik = data.nik;
    this.email = data.email;
    this.noTelepon = data.noTelepon;
    this.wilayahTugas = data.wilayahTugas;
    this.statusLogin = true;

    return {
      username: data.username,
      email: data.email,
      noTelepon: data.noTelepon,
      wilayahTugas: await this.getNamaWilayah(data.wilayahTugas),
    };
  },

  // wilayahTugas disimpan sebagai id dokumen jadwal (misalnya "lebak-siliwangi"). Untuk ditampilkan,
  // ambil nama kelurahan dari jadwal/{id} (misalnya "Lebak Siliwangi"). Kalau gagal dibaca,
  // pakai id-nya yang dirapikan supaya profil tetap tampil.
  async getNamaWilayah(idWilayah) {
    if (!idWilayah) return '';
    try {
      const jadwal = await getDoc(doc(db, 'jadwal', idWilayah));
      const kelurahan = jadwal.exists() ? jadwal.data().kelurahan : null;
      if (kelurahan) return kelurahan;
    } catch (error) {
      console.warn('Gagal membaca nama wilayah:', error?.code ?? error?.message);
    }
    return idWilayah
      .split('-')
      .map((kata) => kata.charAt(0).toUpperCase() + kata.slice(1))
      .join(' ');
  },

  // DPPL Algo-AP-007: Memperbarui kontak profil. Wilayah tugas, nama, dan NIK tidak bisa diubah
  // (ditetapkan data pemerintah dan dijaga firestore.rules).
  // - No. telepon langsung disimpan ke Firestore.
  // - Email login dikelola Firebase Auth, jadi email baru baru berlaku setelah petugas membuka
  //   tautan verifikasi yang dikirim ke email baru (verifyBeforeUpdateEmail). Firestore ikut
  //   disamakan oleh getProfil() setelah itu.
  // Mengembalikan "BERHASIL" | "VERIFIKASI_EMAIL" | "BELUM_LOGIN". Error dilempar ke controller.
  async editProfil(emailBaru, noTeleponBaru) {
    const user = auth.currentUser;
    if (!user) return 'BELUM_LOGIN';

    const email = emailBaru.trim();
    const noTelepon = noTeleponBaru.trim();
    const gantiEmail = email !== user.email;

    if (gantiEmail) {
      auth.languageCode = 'id';
      await verifyBeforeUpdateEmail(user, email);
    }

    // Transaction (bukan updateDoc) supaya langsung gagal saat offline, tidak mengantre diam-diam.
    await runTransaction(db, async (transaksi) => {
      transaksi.update(doc(db, 'akunPetugas', user.uid), { noTelepon });
    });
    this.noTelepon = noTelepon;

    return gantiEmail ? 'VERIFIKASI_EMAIL' : 'BERHASIL';
  },

  // DPPL Algo-AP-008: Mengganti kata sandi lewat Firebase Authentication.
  // Petugas harus sudah di-autentikasi ulang (lihat AkunPetugasController.changePassword).
  async changePassword(passwordBaru) {
    if (!auth.currentUser) return false;
    await updatePassword(auth.currentUser, passwordBaru);
    return true;
  },

  // DPPL Algo-AP-009: Keluar akun dan menghapus data memori lokal
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