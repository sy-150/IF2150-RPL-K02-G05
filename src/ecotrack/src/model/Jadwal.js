// model/Jadwal.js → C04 Jadwal.
// Satu-satunya tempat yang memanggil Firestore untuk koleksi `jadwal` (aturan MVC di guidebook).

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/database/firebase';

// Q-J-001: mengambil semua jadwal. daftarTanggal dikembalikan sebagai objek Date.
// Error (misalnya tidak ada koneksi) DILEMPAR supaya halaman bisa menampilkan pesan gagal.
export async function getSemuaJadwal() {
  const hasil = await getDocs(collection(db, 'jadwal'));

  // Saat offline getDocs TIDAK melempar error: ia mengembalikan isi cache, yang bisa saja kosong
  // sehingga terlihat seperti "lokasi tidak ditemukan". Karena itu dianggap gagal.
  if (hasil.metadata.fromCache) {
    throw new Error('Tidak bisa terhubung ke server');
  }

  return hasil.docs.map((d) => {
    const data = d.data();
    return {
      idJadwal: d.id,
      kecamatan: data.kecamatan,
      kelurahan: data.kelurahan,
      daftarTanggal: (data.daftarTanggal ?? []).map((t) => t.toDate()),
    };
  });
}
