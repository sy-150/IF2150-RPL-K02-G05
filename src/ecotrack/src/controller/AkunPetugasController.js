import { AkunPetugas } from '../model/AkunPetugas';

export const AkunPetugasController = {
  async signUp(namalengkap, nik, email, nomortelepon, password, konfirmasi) {
    if (!password || password !== konfirmasi) {
      return { status: false, pesan: 'Konfirmasi kata sandi tidak sesuai' };
    }

    // 1. Cek NIK ke dataPemerintah/{nik} di Firestore
    const govData = await AkunPetugas.cekDataPemerintah(nik);
    if (!govData.ada) {
      return { status: false, pesan: 'NIK_TIDAK_TERDAFTAR' };
    }

    if (govData.data.namaLengkap.toLowerCase() !== namalengkap.trim().toLowerCase()) {
      return { status: false, pesan: 'NAMA_TIDAK_SESUAI' };
    }

    // 2. Cek apakah NIK sudah punya akun di nikTerdaftar/{nik}
    const nikSudahPakai = await AkunPetugas.cekNikTerdaftar(nik);
    if (nikSudahPakai) {
      return { status: false, pesan: 'NIK_SUDAH_TERDAFTAR' };
    }

    // 3. Eksekusi Pendaftaran Atomic (Auth + Firestore Batch Write)
    const hasilCreate = await AkunPetugas.createAkunPetugas(
      govData.data.namaLengkap, // Menggunakan nama resmi pemerintah
      nik,
      email,
      nomortelepon,
      password,
      govData.data.wilayahTugas // Menggunakan wilayah tugas resmi pemerintah
    );

    return {
      status: hasilCreate.sukses,
      pesan: hasilCreate.sukses ? 'BERHASIL' : hasilCreate.pesan,
    };
  },

  async prosesLogin(email, password) {
    return await AkunPetugas.loginAuth(email, password);
  },
};