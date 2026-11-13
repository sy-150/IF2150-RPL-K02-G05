import { AkunPetugas } from '../model/AkunPetugas';
import { auth } from '../database/firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

export const AkunPetugasController = {
  async signUp(namalengkap, nik, email, nomortelepon, password, konfirmasi) {
    if (!password || password !== konfirmasi) return 'KONFIRMASI_SANDI_BEDA';

    try {
      const statusVerifikasi = await AkunPetugas.verifikasiPetugas(nik, namalengkap);
      if (statusVerifikasi !== "VALID") return statusVerifikasi;

      // Kesepakatan Baru: Gunakan state model secara langsung tanpa getDoc ulang
      const statusCreate = await AkunPetugas.createAkunPetugas(
        AkunPetugas.username, nik, email, nomortelepon, password, AkunPetugas.wilayahTugas
      );
      return statusCreate;
    } catch (error) {
      return 'NETWORK_ERROR';
    }
  },

  async prosesLogin(email, password) {
    try {
      const berhasil = await AkunPetugas.loginAuth(email, password);
      return berhasil ? 'BERHASIL' : 'KREDENSIAL_SALAH';
    } catch (error) {
      return 'NETWORK_ERROR';
    }
  },

  // Lupa kata sandi. Hasil untuk email terdaftar dan tidak terdaftar sengaja disamakan ("TERKIRIM"),
  // supaya orang lain tidak bisa mengetahui email mana yang punya akun.
  // "TERKIRIM" | "EMAIL_TIDAK_VALID" | "TERLALU_SERING" | "NETWORK_ERROR"
  async lupaKataSandi(email) {
    try {
      await AkunPetugas.kirimResetKataSandi(email);
      return 'TERKIRIM';
    } catch (error) {
      if (error.code === 'auth/user-not-found') return 'TERKIRIM';
      if (error.code === 'auth/invalid-email' || error.code === 'auth/missing-email') return 'EMAIL_TIDAK_VALID';
      if (error.code === 'auth/too-many-requests') return 'TERLALU_SERING';
      return 'NETWORK_ERROR';
    }
  },

  // DPPL Algo-APC-004: Mengeluarkan sesi akun
  async logout() {
    return await AkunPetugas.logout();
  },

  // Profil petugas yang sedang login, atau null kalau belum login. Error (misalnya offline) dilempar
  // ke halaman supaya bisa menampilkan pesan gagal memuat.
  async getProfil() {
    return await AkunPetugas.getProfil();
  },

  // DPPL Tabel 5.2.1: Menjembatani permintaan pengeditan profil.
  // "BERHASIL" | "VERIFIKASI_EMAIL" | "EMAIL_TERDAFTAR" | "EMAIL_TIDAK_VALID" | "PERLU_LOGIN_ULANG"
  // | "TERLALU_SERING" | "BELUM_LOGIN" | "NETWORK_ERROR"
  async editProfil(emailBaru, nomorteleponBaru) {
    try {
      return await AkunPetugas.editProfil(emailBaru, nomorteleponBaru);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') return 'EMAIL_TERDAFTAR';
      if (error.code === 'auth/invalid-email' || error.code === 'auth/invalid-new-email') return 'EMAIL_TIDAK_VALID';
      if (error.code === 'auth/requires-recent-login') return 'PERLU_LOGIN_ULANG';
      if (error.code === 'auth/too-many-requests') return 'TERLALU_SERING';
      console.warn('Edit profil gagal:', error?.code ?? error?.message);
      return 'NETWORK_ERROR';
    }
  },

  // DPPL Tabel 5.2.1: Ganti Kata Sandi menggunakan re-autentikasi wajib Firebase.
  // Email untuk re-autentikasi diambil dari sesi Firebase, bukan atribut memori yang bisa kosong.
  // "BERHASIL" | "KREDENSIAL_LAMA_SALAH" | "SANDI_LEMAH" | "TERLALU_SERING" | "BELUM_LOGIN" | "NETWORK_ERROR"
  async changePassword(passwordLama, passwordBaru) {
    const user = auth.currentUser;
    if (!user?.email) return 'BELUM_LOGIN';

    try {
      const credential = EmailAuthProvider.credential(user.email, passwordLama);
      await reauthenticateWithCredential(user, credential);

      const berhasil = await AkunPetugas.changePassword(passwordBaru);
      return berhasil ? 'BERHASIL' : 'BELUM_LOGIN';
    } catch (error) {
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/invalid-login-credentials'
      ) {
        return 'KREDENSIAL_LAMA_SALAH';
      }
      if (error.code === 'auth/weak-password') return 'SANDI_LEMAH';
      if (error.code === 'auth/too-many-requests') return 'TERLALU_SERING';
      console.warn('Ganti kata sandi gagal:', error?.code ?? error?.message);
      return 'NETWORK_ERROR';
    }
  }
};