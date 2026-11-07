// Skrip seed EcoTrack: membuat koleksi Firestore + akun uji di Firebase Authentication.
//
//   node seed.js           → mengisi EMULATOR lokal (project demo-ecotrack, tanpa akun)
//   node seed.js --cloud   → mengisi FIREBASE CLOUD, butuh file service-account.json (JANGAN di-commit)
//   --only=informasiSampah,dataPemerintah  → hanya koleksi tertentu (koleksi lain tidak disentuh)
//
// Aman dijalankan berulang kali: dokumen ditulis dengan id tetap, jadi isinya ditimpa, bukan diduplikasi.

const fs = require('fs');
const path = require('path');

const keCloud = process.argv.includes('--cloud');
const argOnly = process.argv.find((a) => a.startsWith('--only='));
const hanya = argOnly ? argOnly.slice('--only='.length).split(',').map((k) => k.trim()) : null;

if (!keCloud) {
  // Harus di-set SEBELUM firebase-admin dipakai, supaya semua tulisan masuk ke emulator.
  process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099';
}

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

function bacaJson(nama) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', nama), 'utf8'));
}

if (keCloud) {
  const lokasiKunci = path.join(__dirname, 'service-account.json');
  if (!fs.existsSync(lokasiKunci)) {
    console.error('service-account.json tidak ditemukan.');
    console.error('Unduh dari Firebase Console → Project settings → Service accounts → Generate new private key,');
    console.error('simpan sebagai src/firebase/service-account.json (sudah ada di .gitignore).');
    process.exit(1);
  }
  initializeApp({ credential: cert(require(lokasiKunci)) });
} else {
  initializeApp({ projectId: 'demo-ecotrack' });
}

const db = getFirestore();
const auth = getAuth();

// daftarTanggal di jadwal.json ditulis sebagai "YYYY-MM-DD", lalu disimpan sebagai Timestamp tengah malam WIB.
function keTimestamp(tanggal) {
  return Timestamp.fromDate(new Date(`${tanggal}T00:00:00+07:00`));
}

async function seedInformasiSampah() {
  const batch = db.batch();
  for (const { idSampah, ...isi } of bacaJson('informasiSampah.json')) {
    batch.set(db.collection('informasiSampah').doc(idSampah), {
      ...isi,
      // Daftar id tipe, dihitung otomatis. Dipakai security rules untuk memeriksa
      // barcode yang ditambahkan pengguna menunjuk ke tipe yang benar-benar ada.
      daftarIdTipe: (isi.tipe ?? []).map((t) => t.idTipe),
    });
  }
  await batch.commit();
}

async function seedJadwal() {
  const batch = db.batch();
  for (const { idJadwal, daftarTanggal, ...isi } of bacaJson('jadwal.json')) {
    batch.set(db.collection('jadwal').doc(idJadwal), {
      ...isi,
      daftarTanggal: daftarTanggal.map(keTimestamp),
      diperbaruiPada: FieldValue.serverTimestamp(),
    });
  }
  await batch.commit();
}

// Barcode produk → material dan tipe barangnya. Id dokumen = kode barcode.
async function seedBarcodeProduk() {
  const batch = db.batch();
  for (const { kodeBarcode, ...isi } of bacaJson('barcodeProduk.json')) {
    // namaProduk, idSampah, idTipe; sumber = 'seed' kecuali JSON menulis lain (misalnya hasil pull)
    batch.set(db.collection('barcodeProduk').doc(kodeBarcode), { sumber: 'seed', ...isi });
  }
  await batch.commit();
}

// Tiruan "database pemerintah" untuk verifikasi NIK saat Sign Up. Id dokumen = NIK.
async function seedDataPemerintah() {
  const batch = db.batch();
  for (const { nik, ...isi } of bacaJson('dataPemerintah.json')) {
    batch.set(db.collection('dataPemerintah').doc(nik), isi); // namaLengkap, wilayahTugas
  }
  await batch.commit();
}

async function seedAkunPetugas() {
  for (const { uid, email, kataSandi, ...profil } of bacaJson('akunPetugas.json')) {
    try {
      await auth.createUser({ uid, email, password: kataSandi, displayName: profil.username });
    } catch (e) {
      if (e.code === 'auth/uid-already-exists' || e.code === 'auth/email-already-exists') {
        await auth.updateUser(uid, { email, password: kataSandi, displayName: profil.username });
      } else {
        throw e;
      }
    }
    // Profil disimpan di Firestore TANPA kata sandi; kata sandi hanya ada di Firebase Authentication.
    await db.collection('akunPetugas').doc(uid).set({
      ...profil,
      email,
      dibuatPada: FieldValue.serverTimestamp(),
    });
    // Tandai NIK ini sudah punya akun, supaya tidak bisa dipakai Sign Up lagi.
    await db.collection('nikTerdaftar').doc(profil.nik).set({
      uid,
      dibuatPada: FieldValue.serverTimestamp(),
    });
  }
}

const LANGKAH = {
  informasiSampah: seedInformasiSampah,
  jadwal: seedJadwal,
  barcodeProduk: seedBarcodeProduk,
  dataPemerintah: seedDataPemerintah,
  akunPetugas: seedAkunPetugas, // termasuk akun uji di Authentication dan nikTerdaftar
};

async function main() {
  const dipilih = hanya ?? Object.keys(LANGKAH);
  const salah = dipilih.filter((k) => !LANGKAH[k]);
  if (salah.length) {
    console.error(`Koleksi tidak dikenal: ${salah.join(', ')}. Pilihan: ${Object.keys(LANGKAH).join(', ')}`);
    process.exit(1);
  }

  console.log(`Mengisi ${keCloud ? 'FIREBASE CLOUD' : 'emulator lokal (demo-ecotrack)'}: ${dipilih.join(', ')}`);
  for (const nama of dipilih) {
    await LANGKAH[nama]();
    console.log(`  ✓ ${nama}`);
  }
  console.log('Selesai.');
}

main().catch((e) => {
  console.error('Seed gagal:', e.message);
  process.exit(1);
});