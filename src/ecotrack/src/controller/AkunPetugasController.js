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

  // DPPL Algo-APC-004: Mengeluarkan sesi akun
  async logout() {
    return await AkunPetugas.logout();
  },

  // DPPL Tabel 5.2.1: Menjembatani permintaan pengeditan profil
  async editProfil(emailBaru, nomorteleponBaru) {
    try {
      const berhasil = await AkunPetugas.editProfil(emailBaru, nomorteleponBaru);
      return berhasil ? 'BERHASIL' : 'GAGAL';
    } catch (error) {
      return 'NETWORK_ERROR';
    }
  },

  // DPPL Tabel 5.2.1: Ganti Kata Sandi menggunakan re-autentikasi wajib Firebase
  async changePassword(passwordLama, passwordBaru) {
    try {
      const credential = EmailAuthProvider.credential(AkunPetugas.email, passwordLama);
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      const berhasil = await AkunPetugas.changePassword(passwordBaru);
      return berhasil ? 'BERHASIL' : 'GAGAL';
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        return 'KREDENSIAL_LAMA_SALAH';
      }
      return 'NETWORK_ERROR';
    }
  }
};