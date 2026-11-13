// controller/JadwalController.js → C05 JadwalController.
// Dipanggil halaman (tabs)/jadwal, memanggil model/Jadwal dan model/AkunPetugas.
//
// Semua perhitungan tanggal memakai WIB dengan menggeser waktu +7 jam lalu membaca nilai UTC-nya.
// Getter lokal seperti getDate() dan toLocaleDateString() sengaja tidak dipakai, karena hasilnya
// mengikuti zona waktu HP sehingga tanggal bisa bergeser.

import { getSemuaJadwal } from '@/model/Jadwal';
import { cekStatusLogin } from '@/model/AkunPetugas';

const SELISIH_WIB_MS = 7 * 60 * 60 * 1000;

const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

// Cache hasil getDaftarJadwal(), dipakai cariLokasiTPS().
let daftarJadwal = [];

// Date → objek Date yang nilai UTC-nya sama dengan jam di WIB.
function keWIB(tanggal) {
  return new Date(tanggal.getTime() + SELISIH_WIB_MS);
}

// Date → "YYYY-MM-DD" menurut WIB.
function kunciWIB(tanggal) {
  return keWIB(tanggal).toISOString().slice(0, 10);
}

const JadwalController = {
  // Mengambil semua jadwal, diurutkan per kecamatan lalu kelurahan. Error dilempar ke halaman.
  async getDaftarJadwal() {
    const data = await getSemuaJadwal();
    daftarJadwal = [...data].sort(
      (a, b) =>
        a.kecamatan.localeCompare(b.kecamatan, 'id') || a.kelurahan.localeCompare(b.kelurahan, 'id')
    );
    return daftarJadwal;
  },

  // Mencari di cache berdasarkan kecamatan/kelurahan, tidak peka huruf besar/kecil.
  // Keyword kosong mengembalikan semua lokasi.
  cariLokasiTPS(keyword) {
    const dicari = (keyword ?? '').trim().toLowerCase();
    if (!dicari) return daftarJadwal;
    return daftarJadwal.filter(
      (j) => j.kecamatan.toLowerCase().includes(dicari) || j.kelurahan.toLowerCase().includes(dicari)
    );
  },

  // Selalu mengambil ulang dari database supaya hasil edit petugas langsung terlihat.
  // Mengembalikan { jadwal, statusLogin }, atau null kalau idJadwal tidak ada.
  async getJadwal(idJadwal) {
    const daftar = await JadwalController.getDaftarJadwal();
    const jadwal = daftar.find((j) => j.idJadwal === idJadwal);
    if (!jadwal) return null;
    return { jadwal, statusLogin: JadwalController.cekStatusLogin() };
  },

  cekStatusLogin() {
    return cekStatusLogin();
  },

  // ===== Bantuan kalender (I09, I11), semuanya menurut WIB =====

  // Mode edit: menambah tanggal (kunci "YYYY-MM-DD") kalau belum ada, menghapusnya kalau sudah ada.
  // Tanggal baru disimpan sebagai 00:00 WIB seperti data seed. Mengembalikan list baru yang terurut.
  toggleTanggal(daftarTanggal, kunci) {
    const sisa = daftarTanggal.filter((t) => kunciWIB(t) !== kunci);
    if (sisa.length < daftarTanggal.length) return sisa;
    const baru = new Date(Date.parse(`${kunci}T00:00:00Z`) - SELISIH_WIB_MS);
    return [...daftarTanggal, baru].sort((a, b) => a.getTime() - b.getTime());
  },

  // Bulan yang sedang berjalan: { tahun, bulan } dengan bulan 0–11.
  getBulanIni(sekarang = new Date()) {
    const wib = keWIB(sekarang);
    return { tahun: wib.getUTCFullYear(), bulan: wib.getUTCMonth() };
  },

  // Pindah bulan. selisih -1 = bulan sebelumnya, 1 = bulan berikutnya.
  geserBulan({ tahun, bulan }, selisih) {
    const hasil = new Date(Date.UTC(tahun, bulan + selisih, 1));
    return { tahun: hasil.getUTCFullYear(), bulan: hasil.getUTCMonth() };
  },

  // Kalender hanya boleh dibuka pada tahun berjalan (WIB), jadi Januari tidak bisa mundur
  // dan Desember tidak bisa maju.
  bisaGeserBulan(bulanTampil, selisih, sekarang = new Date()) {
    return (
      JadwalController.geserBulan(bulanTampil, selisih).tahun ===
      JadwalController.getBulanIni(sekarang).tahun
    );
  },

  // "Oktober 2026"
  getJudulBulan({ tahun, bulan }) {
    return `${NAMA_BULAN[bulan]} ${tahun}`;
  },

  // "Kamis, 5 Oktober 2026"
  getTeksHariIni(sekarang = new Date()) {
    const wib = keWIB(sekarang);
    return `${NAMA_HARI[wib.getUTCDay()]}, ${wib.getUTCDate()} ${NAMA_BULAN[wib.getUTCMonth()]} ${wib.getUTCFullYear()}`;
  },

  // Isi kalender satu bulan: minggu penuh dari Minggu sampai Sabtu, termasuk tanggal
  // bulan sebelum/sesudahnya. Setiap sel: { kunci, tanggal, bulanIni, pengambilan, hariIni }.
  // Tanggal pengambilan di luar bulan ini tetap ditandai (halaman menampilkannya hijau pudar),
  // termasuk yang jatuh di tahun tetangga, misalnya 1 Januari pada kalender Desember.
  susunKalender({ tahun, bulan }, daftarTanggal, sekarang = new Date()) {
    const tanggalPengambilan = new Set(daftarTanggal.map(kunciWIB));
    const kunciHariIni = kunciWIB(sekarang);

    const hariPertama = new Date(Date.UTC(tahun, bulan, 1)).getUTCDay();
    const jumlahHari = new Date(Date.UTC(tahun, bulan + 1, 0)).getUTCDate();
    const jumlahSel = Math.ceil((hariPertama + jumlahHari) / 7) * 7;

    return Array.from({ length: jumlahSel }, (_, i) => {
      const hari = new Date(Date.UTC(tahun, bulan, 1 - hariPertama + i));
      const kunci = hari.toISOString().slice(0, 10);
      return {
        kunci,
        tanggal: hari.getUTCDate(),
        bulanIni: hari.getUTCMonth() === bulan,
        pengambilan: tanggalPengambilan.has(kunci),
        hariIni: kunci === kunciHariIni,
      };
    });
  },
};

export default JadwalController;
