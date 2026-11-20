/**
 * Pengujian KNF05 (Reliability): sistem harus akurat minimal 90% saat menentukan kategori sampah,
 * informasi cara mendaur ulang, dan jadwal pembuangan sampah.
 *
 * Data acuan (ground truth) adalah file seed src/firebase/data/*.json. Data yang diterima aplikasi
 * diambil lewat Controller → Model → Firestore emulator (komponen nyata), lalu dibandingkan dengan
 * data acuan. Akurasi = jumlah data yang cocok / jumlah seluruh data.
 *
 * Prasyarat dan cara menjalankan sama dengan JadwalIntegrasi.test.js:
 *   EXPO_PUBLIC_USE_EMULATOR=true EXPO_PUBLIC_EMULATOR_HOST=127.0.0.1 npx jest KNF05 --forceExit
 */

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const path = require('path');

const pakaiEmulator = process.env.EXPO_PUBLIC_USE_EMULATOR === 'true';
const describeEmulator = pakaiEmulator ? describe : describe.skip;

const TARGET = 0.9;
const DATA = path.join(__dirname, '..', 'firebase', 'data');
const acuan = (nama) => require(path.join(DATA, nama));

const kunciWIB = (t) => new Date(t.getTime() + 7 * 3600 * 1000).toISOString().slice(0, 10);

function laporkan(nama, cocok, total, salah) {
  const persen = ((cocok / total) * 100).toFixed(2);
  console.log(`${nama}: ${cocok}/${total} cocok (akurasi ${persen}%)` + (salah.length ? `, tidak cocok: ${salah.join(', ')}` : ''));
  return cocok / total;
}

describeEmulator('KNF05 akurasi data', () => {
  let JadwalController;
  let InformasiSampahController;

  beforeAll(() => {
    ({ default: JadwalController } = require('@/controller/JadwalController'));
    ({ default: InformasiSampahController } = require('@/controller/InformasiSampahController'));
  });

  afterAll(async () => {
    const { db } = require('@/database/firebase');
    await require('firebase/firestore').terminate(db);
  });

  it('KNF05-TC01 jadwal pengambilan sampah yang ditampilkan sesuai data acuan', async () => {
    const dataAcuan = acuan('jadwal.json');
    const salah = [];

    for (const j of dataAcuan) {
      const hasil = await JadwalController.getJadwal(j.idJadwal);
      const cocok =
        hasil !== null &&
        hasil.jadwal.getKecamatan() === j.kecamatan &&
        hasil.jadwal.getKelurahan() === j.kelurahan &&
        JSON.stringify(hasil.jadwal.getTanggal().map(kunciWIB)) === JSON.stringify([...j.daftarTanggal].sort());
      if (!cocok) salah.push(j.idJadwal);
    }

    const akurasi = laporkan('Jadwal', dataAcuan.length - salah.length, dataAcuan.length, salah);
    expect(akurasi).toBeGreaterThanOrEqual(TARGET);
  }, 60000);

  it('KNF05-TC02 informasi cara mendaur ulang yang ditampilkan sesuai data acuan', async () => {
    const dataAcuan = acuan('informasiSampah.json');
    const semua = await InformasiSampahController.getMain();
    const salah = [];

    for (const s of dataAcuan) {
      const detail = await InformasiSampahController.getDetail(s.idSampah);
      const dariDaftar = semua.find((x) => x.idSampah === s.idSampah);
      const ringkas = (x) =>
        JSON.stringify({
          nama: x?.nama,
          jenisSampah: x?.jenisSampah,
          deskripsi: x?.deskripsi,
          tipe: x?.tipe,
        });
      if (ringkas(detail) !== ringkas(s) || ringkas(dariDaftar) !== ringkas(s)) salah.push(s.idSampah);
    }

    const akurasi = laporkan('Informasi daur ulang', dataAcuan.length - salah.length, dataAcuan.length, salah);
    expect(semua).toHaveLength(dataAcuan.length);
    expect(akurasi).toBeGreaterThanOrEqual(TARGET);
  }, 60000);

  it('KNF05-TC03 kategori sampah hasil pemindaian barcode sesuai data acuan', async () => {
    const dataAcuan = acuan('barcodeProduk.json');
    const informasi = acuan('informasiSampah.json');
    const salah = [];

    for (const b of dataAcuan) {
      const hasil = await InformasiSampahController.cariBarcode(b.kodeBarcode);
      const material = informasi.find((s) => s.idSampah === hasil?.idSampah);
      const cocok =
        hasil?.idSampah === b.idSampah &&
        hasil?.idTipe === b.idTipe &&
        material?.tipe.some((t) => t.idTipe === hasil.idTipe);
      if (!cocok) salah.push(b.kodeBarcode);
    }

    const akurasi = laporkan('Kategori barcode', dataAcuan.length - salah.length, dataAcuan.length, salah);
    expect(akurasi).toBeGreaterThanOrEqual(TARGET);
  }, 60000);
});
