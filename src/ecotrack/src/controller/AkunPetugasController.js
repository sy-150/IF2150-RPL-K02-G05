import { AkunPetugas } from '../model/AkunPetugas';

export const AkunPetugasController = {
  async signUp(namalengkap, nik, email, nomortelepon, password, konfirmasi) {
    if (!password || password !== konfirmasi) {
      return 'KONFIRMASI_SANDI_BEDA';
    }

    try {
      const statusVerifikasi = await AkunPetugas.verifikasiPetugas(nik, namalengkap);
      if (statusVerifikasi !== "VALID") {
        return statusVerifikasi;
      }

      // Ambil wilayah tugas dari data pemerintah yang dipastikan ada
      const govData = await AkunPetugas.cekDataPemerintah(nik);

      const statusCreate = await AkunPetugas.createAkunPetugas(
        govData.data.namaLengkap, 
        nik,
        email,
        nomortelepon,
        password,
        govData.data.wilayahTugas
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
};