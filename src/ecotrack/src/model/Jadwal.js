// model/Jadwal.js → C04 Jadwal.
// Satu-satunya tempat yang memanggil Firestore untuk koleksi `jadwal` (aturan MVC di guidebook).

import { collection, doc, getDoc, getDocs, runTransaction, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/database/firebase';

class Jadwal {
  #idJadwal;
  #kecamatan;
  #kelurahan;
  #daftarTanggal; // list objek Date

  constructor({ idJadwal, kecamatan, kelurahan, daftarTanggal }) {
    this.#idJadwal = idJadwal;
    this.#kecamatan = kecamatan;
    this.#kelurahan = kelurahan;
    this.#daftarTanggal = daftarTanggal;
  }

  getIdJadwal() {
    return this.#idJadwal;
  }

  getKecamatan() {
    return this.#kecamatan;
  }

  getKelurahan() {
    return this.#kelurahan;
  }

  getTanggal() {
    return [...this.#daftarTanggal];
  }

  setTanggal(daftarTanggalBaru) {
    this.#daftarTanggal = [...daftarTanggalBaru];
  }

  // Q-J-002: menyimpan daftar tanggal jadwal ini ke database. Error DILEMPAR ke pemanggil.
  //
  // Sengaja memakai transaction, bukan updateDoc: saat offline updateDoc tidak pernah gagal, tulisannya
  // mengantre dan terkirim diam-diam nanti. Transaction langsung gagal kalau tidak terhubung ke server.
  async simpanJadwal() {
    const dokumen = doc(db, 'jadwal', this.#idJadwal);
    const daftarTanggal = this.#daftarTanggal.map((t) => Timestamp.fromDate(t));
    await runTransaction(db, async (transaksi) => {
      transaksi.update(dokumen, { daftarTanggal, diperbaruiPada: serverTimestamp() });
    });
  }

  // Q-J-001: mengambil semua jadwal. Error (misalnya tidak ada koneksi) DILEMPAR ke pemanggil.
  static async getSemuaJadwal() {
    const hasil = await getDocs(collection(db, 'jadwal'));

    // Saat offline getDocs TIDAK melempar error: ia mengembalikan isi cache, yang bisa saja kosong
    // sehingga terlihat seperti "lokasi tidak ditemukan". Karena itu dianggap gagal.
    if (hasil.metadata.fromCache) {
      throw new Error('Tidak bisa terhubung ke server');
    }

    return hasil.docs.map(Jadwal.#dariDokumen);
  }

  // Mengambil satu jadwal (hemat kuota: 1 baca, bukan seluruh koleksi). null kalau id tidak ada.
  // Error (misalnya tidak ada koneksi) DILEMPAR ke pemanggil.
  static async getJadwalById(idJadwal) {
    const hasil = await getDoc(doc(db, 'jadwal', idJadwal));
    if (hasil.metadata.fromCache) {
      throw new Error('Tidak bisa terhubung ke server');
    }
    return hasil.exists() ? Jadwal.#dariDokumen(hasil) : null;
  }

  // Dokumen Firestore → objek Jadwal.
  static #dariDokumen(dokumen) {
    const data = dokumen.data();
    return new Jadwal({
      idJadwal: dokumen.id,
      kecamatan: data.kecamatan,
      kelurahan: data.kelurahan,
      daftarTanggal: (data.daftarTanggal ?? []).map((t) => t.toDate()),
    });
  }
}

export default Jadwal;
