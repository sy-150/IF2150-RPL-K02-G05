// Skrip pull EcoTrack: menyalin isi koleksi dari FIREBASE CLOUD ke file data/*.json.
// Kebalikan dari seed. Setelah ini, `npm run seed` mengisi emulator dengan data yang sama.
//
//   node pull.js                                   → semua koleksi data pokok
//   node pull.js --only=informasiSampah,jadwal     → koleksi tertentu
//
// Butuh service-account.json (JANGAN di-commit).
// akunPetugas dan nikTerdaftar sengaja tidak di-pull: isinya data pengguna (email, NIK, nomor HP)
// yang tidak boleh masuk repo public, dan kata sandi Authentication memang tidak bisa diekspor.
// Selalu cek `git diff src/firebase/data` sebelum commit.

const fs = require('fs');
const path = require('path');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

const lokasiKunci = path.join(__dirname, 'service-account.json');
if (!fs.existsSync(lokasiKunci)) {
  console.error('service-account.json tidak ditemukan di src/firebase/.');
  process.exit(1);
}
initializeApp({ credential: cert(require(lokasiKunci)) });
const db = getFirestore();

// koleksi → nama field id di JSON, dan field yang tidak ikut di-pull (diisi otomatis oleh seed)
const KOLEKSI = {
  informasiSampah: { id: 'idSampah', buang: ['daftarIdTipe'] },
  jadwal: { id: 'idJadwal', buang: ['diperbaruiPada'] },
  barcodeProduk: { id: 'kodeBarcode', buang: ['diperbaruiPada'] },
  dataPemerintah: { id: 'nik', buang: [] },
};

const argOnly = process.argv.find((a) => a.startsWith('--only='));
const dipilih = argOnly ? argOnly.slice('--only='.length).split(',').map((k) => k.trim()) : Object.keys(KOLEKSI);
const salah = dipilih.filter((k) => !KOLEKSI[k]);
if (salah.length) {
  console.error(`Koleksi tidak bisa di-pull: ${salah.join(', ')}. Pilihan: ${Object.keys(KOLEKSI).join(', ')}`);
  process.exit(1);
}

// Timestamp → "YYYY-MM-DD" menurut WIB (format yang dibaca seed untuk daftarTanggal).
function keTeks(nilai) {
  if (nilai instanceof Timestamp) {
    const wib = new Date(nilai.toMillis() + 7 * 60 * 60 * 1000);
    return wib.toISOString().slice(0, 10);
  }
  if (Array.isArray(nilai)) return nilai.map(keTeks);
  if (nilai && typeof nilai === 'object') {
    return Object.fromEntries(Object.entries(nilai).map(([k, v]) => [k, keTeks(v)]));
  }
  return nilai;
}

// Susun urutan field mengikuti JSON lama, supaya git diff hanya menunjukkan perubahan isi.
function ikutiUrutan(baru, lama) {
  if (Array.isArray(baru)) {
    const contoh = Array.isArray(lama) ? lama : [];
    return baru.map((isi, i) => ikutiUrutan(isi, contoh[i] ?? contoh[0]));
  }
  if (baru && typeof baru === 'object') {
    const pola = lama && typeof lama === 'object' && !Array.isArray(lama) ? lama : {};
    const kunci = [...Object.keys(pola).filter((k) => k in baru), ...Object.keys(baru).filter((k) => !(k in pola))];
    return Object.fromEntries(kunci.map((k) => [k, ikutiUrutan(baru[k], pola[k])]));
  }
  return baru;
}

async function pull(nama) {
  const { id, buang } = KOLEKSI[nama];
  const file = path.join(__dirname, 'data', `${nama}.json`);
  const lama = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : [];
  const lamaPerId = new Map(lama.map((o) => [o[id], o]));

  const hasil = await db.collection(nama).get();
  const baru = hasil.docs.map((d) => {
    const isi = keTeks(d.data());
    for (const f of buang) delete isi[f];
    return ikutiUrutan({ [id]: d.id, ...isi }, lamaPerId.get(d.id));
  });

  // Dokumen lama tetap di urutan lamanya, dokumen baru ditambahkan di akhir.
  const urutanLama = new Map(lama.map((o, i) => [o[id], i]));
  baru.sort((a, b) => (urutanLama.get(a[id]) ?? Infinity) - (urutanLama.get(b[id]) ?? Infinity));

  fs.writeFileSync(file, JSON.stringify(baru, null, 2) + '\n');
  const ditambah = baru.filter((o) => !lamaPerId.has(o[id])).length;
  const hilang = lama.filter((o) => !baru.some((b) => b[id] === o[id])).length;
  console.log(`  ✓ ${nama}: ${baru.length} dokumen (${ditambah} baru, ${hilang} tidak ada lagi di cloud)`);
}

async function main() {
  console.log(`Pull dari FIREBASE CLOUD ke data/*.json: ${dipilih.join(', ')}`);
  for (const nama of dipilih) await pull(nama);
  console.log('Selesai. Cek perubahan dengan: git diff src/firebase/data');
}

main().catch((e) => {
  console.error('Pull gagal:', e.message);
  process.exit(1);
});