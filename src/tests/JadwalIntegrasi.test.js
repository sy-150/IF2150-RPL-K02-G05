/**
 * Pengujian integrasi fitur jadwal (antarmuka I-07 s.d. I-14 pada DPPL).
 * Memakai komponen NYATA: JadwalController → Jadwal / AkunPetugas → Firestore + Firebase Authentication
 * di Firebase Emulator, termasuk security rules (firestore.rules). Tidak ada mock.
 *
 * Prasyarat:
 *   1. cd src/firebase && npm run emulator   (biarkan berjalan)
 *   2. cd src/firebase && npm run seed
 *   3. cd src/ecotrack && EXPO_PUBLIC_USE_EMULATOR=true EXPO_PUBLIC_EMULATOR_HOST=127.0.0.1 \
 *        npx jest JadwalIntegrasi
 *
 * Tanpa variabel EXPO_PUBLIC_USE_EMULATOR=true, test ini dilewati (skip) supaya `npm test` biasa
 * tetap bisa dijalankan tanpa emulator.
 */

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

function fetchNode(url, opsi = {}) {
  const http = require('http');
  return new Promise((selesai, gagal) => {
    const header = opsi.headers instanceof Headers ? Object.fromEntries(opsi.headers) : opsi.headers;
    const req = http.request(url, { method: opsi.method ?? 'GET', headers: header }, (res) => {
      const potongan = [];
      res.on('data', (p) => potongan.push(p));
      res.on('end', () => {
        const isi = Buffer.concat(potongan).toString('utf8');
        selesai(new Response(isi, { status: res.statusCode, headers: res.headers }));
      });
    });
    req.on('error', gagal);
    if (opsi.body) req.write(opsi.body);
    req.end();
  });
}

const pakaiEmulator = process.env.EXPO_PUBLIC_USE_EMULATOR === 'true';
const describeEmulator = pakaiEmulator ? describe : describe.skip;

const ID_PETUGAS = 'lebak-siliwangi';
const ID_LAIN = 'pasteur';
const EMAIL = 'petugas@ecotrack.test';
const PASSWORD = 'Petugas123!';

const kunci = (tanggal) => new Date(tanggal.getTime() + 7 * 3600 * 1000).toISOString().slice(0, 10);
const wib = (k) => new Date(`${k}T00:00:00+07:00`);

describeEmulator('Integrasi jadwal dengan Firebase Emulator', () => {
  let JadwalController;
  let AkunPetugas;
  let auth;
  let db;
  let fs;
  let signInWithEmailAndPassword;
  let signOut;
  let tanggalAwalPetugas;
  let tanggalAwalLain;

  async function bacaLangsung(idJadwal) {
    const snap = await fs.getDocFromServer(fs.doc(db, 'jadwal', idJadwal));
    return snap.data();
  }

  beforeAll(async () => {
    Object.defineProperty(globalThis, 'fetch', { value: fetchNode, configurable: true, writable: true });
    ({ default: JadwalController } = require('@/controller/JadwalController'));
    ({ default: AkunPetugas } = require('@/model/AkunPetugas'));
    ({ auth, db } = require('@/database/firebase'));
    fs = require('firebase/firestore');
    ({ signInWithEmailAndPassword, signOut } = require('firebase/auth'));

    await signOut(auth);
    tanggalAwalPetugas = (await bacaLangsung(ID_PETUGAS)).daftarTanggal.map((t) => t.toDate());
    tanggalAwalLain = (await bacaLangsung(ID_LAIN)).daftarTanggal.map((t) => t.toDate());
  }, 30000);

  afterAll(async () => {
    await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
    await JadwalController.editJadwal(ID_PETUGAS, tanggalAwalPetugas);
    await signOut(auth);
    await fs.terminate(db);
  }, 30000);

  it('INT-I07-TC01 daftar lokasi TPS diambil dari database dan terurut per kecamatan', async () => {
    const daftar = await JadwalController.getDaftarJadwal();
    const dariDb = await fs.getDocsFromServer(fs.collection(db, 'jadwal'));

    expect(daftar).toHaveLength(dariDb.size);
    expect(daftar.map((j) => j.getIdJadwal()).sort()).toEqual(dariDb.docs.map((d) => d.id).sort());
    const urutan = daftar.map((j) => [j.getKecamatan(), j.getKelurahan()]);
    const terurut = [...urutan].sort(
      (a, b) => a[0].localeCompare(b[0], 'id') || a[1].localeCompare(b[1], 'id')
    );
    expect(urutan).toEqual(terurut);
  });

  it('INT-I07-TC02 pencarian lokasi TPS berdasarkan kecamatan/kelurahan', async () => {
    const hasil = JadwalController.cariLokasiTPS('coblong');
    const dariDb = await fs.getDocsFromServer(fs.collection(db, 'jadwal'));
    const seharusnya = dariDb.docs
      .filter((d) => /coblong/i.test(d.data().kecamatan) || /coblong/i.test(d.data().kelurahan))
      .map((d) => d.id)
      .sort();

    expect(hasil.length).toBeGreaterThan(0);
    expect(hasil.map((j) => j.getIdJadwal()).sort()).toEqual(seharusnya);
  });

  it('INT-I08-TC01 pencarian lokasi yang tidak terdata menghasilkan daftar kosong', () => {
    expect(JadwalController.cariLokasiTPS('Bekasi')).toEqual([]);
  });

  it('INT-I09-TC01 masyarakat (belum login) membaca detail jadwal dari database', async () => {
    const hasil = await JadwalController.getJadwal(ID_PETUGAS);
    const dariDb = await bacaLangsung(ID_PETUGAS);

    expect(hasil.statusLogin).toBe(false);
    expect(hasil.bolehEdit).toBe(false);
    expect(hasil.jadwal.getKelurahan()).toBe(dariDb.kelurahan);
    expect(hasil.jadwal.getKecamatan()).toBe(dariDb.kecamatan);
    expect(hasil.jadwal.getTanggal().map(kunci)).toEqual(dariDb.daftarTanggal.map((t) => kunci(t.toDate())));
  });

  it('INT-I09-TC02 id lokasi yang tidak ada di database menghasilkan null', async () => {
    await expect(JadwalController.getJadwal('kelurahan-tidak-ada')).resolves.toBeNull();
  });

  it('INT-I09-TC03 kalender menandai tanggal pengambilan dari database', async () => {
    const { jadwal } = await JadwalController.getJadwal(ID_PETUGAS);
    const pertama = jadwal.getTanggal()[0];
    const wibPertama = new Date(pertama.getTime() + 7 * 3600 * 1000);
    const bulan = { tahun: wibPertama.getUTCFullYear(), bulan: wibPertama.getUTCMonth() };

    const kalender = JadwalController.susunKalender(bulan, jadwal.getTanggal());
    const ditandai = kalender.filter((s) => s.pengambilan && s.bulanIni).map((s) => s.kunci);
    const seharusnya = jadwal.getTanggal().map(kunci).filter((k) => k.startsWith(kunci(pertama).slice(0, 7)));
    expect(ditandai).toEqual(seharusnya);
  });

  it('INT-I10-TC01 petugas login di wilayahnya mendapat akses edit (Firebase Auth + akunPetugas)', async () => {
    await signInWithEmailAndPassword(auth, EMAIL, PASSWORD);
    const hasil = await JadwalController.getJadwal(ID_PETUGAS);
    expect(await AkunPetugas.getWilayahTugas()).toBe(ID_PETUGAS);
    expect(hasil).toMatchObject({ statusLogin: true, bolehEdit: true });
  });

  it('INT-I10-TC02 petugas login di wilayah lain tidak mendapat akses edit', async () => {
    const hasil = await JadwalController.getJadwal(ID_LAIN);
    expect(hasil).toMatchObject({ statusLogin: true, bolehEdit: false });
  });

  it('INT-I11-TC01 memilih dan membatalkan tanggal di form edit tidak menulis ke database', async () => {
    const { jadwal } = await JadwalController.getJadwal(ID_PETUGAS);
    const awal = jadwal.getTanggal();
    const dipilih = JadwalController.toggleTanggal(awal, '2026-12-25');
    expect(JadwalController.apakahBerubah(awal, dipilih)).toBe(true);
    const dibatalkan = JadwalController.toggleTanggal(dipilih, '2026-12-25');
    expect(JadwalController.apakahBerubah(awal, dibatalkan)).toBe(false);

    const dariDb = await bacaLangsung(ID_PETUGAS);
    expect(dariDb.daftarTanggal.map((t) => kunci(t.toDate()))).toEqual(awal.map(kunci));
  });

  it('INT-I12-TC01 petugas menyimpan jadwal baru dan database ikut berubah', async () => {
    const sebelum = await bacaLangsung(ID_PETUGAS);
    const baru = [wib('2026-12-24'), new Date('2026-12-21T09:30:00+07:00'), wib('2026-12-24')];

    const hasil = await JadwalController.editJadwal(ID_PETUGAS, baru);
    const sesudah = await bacaLangsung(ID_PETUGAS);

    expect(hasil).not.toBeNull();
    expect(hasil.getTanggal().map(kunci)).toEqual(['2026-12-21', '2026-12-24']);
    expect(sesudah.daftarTanggal.map((t) => t.toDate().toISOString())).toEqual([
      wib('2026-12-21').toISOString(),
      wib('2026-12-24').toISOString(),
    ]);
    expect(sesudah.diperbaruiPada.toMillis()).toBeGreaterThan(sebelum.diperbaruiPada?.toMillis?.() ?? 0);
  });

  it('INT-I13-TC01 detail jadwal langsung menampilkan data yang baru disimpan', async () => {
    const hasil = await JadwalController.getJadwal(ID_PETUGAS);
    expect(hasil.jadwal.getTanggal().map(kunci)).toEqual(['2026-12-21', '2026-12-24']);
  });

  it('INT-I14-TC01 security rules menolak petugas mengubah jadwal wilayah lain', async () => {
    const hasil = await JadwalController.editJadwal(ID_LAIN, [wib('2026-12-25')]);
    const dariDb = await bacaLangsung(ID_LAIN);
    expect(hasil).toBeNull();
    expect(dariDb.daftarTanggal.map((t) => kunci(t.toDate()))).toEqual(tanggalAwalLain.map(kunci));
  });

  it('INT-I14-TC02 pengguna yang belum login gagal menyimpan jadwal', async () => {
    await signOut(auth);
    const hasil = await JadwalController.editJadwal(ID_PETUGAS, [wib('2026-12-25')]);
    const dariDb = await bacaLangsung(ID_PETUGAS);
    expect(hasil).toBeNull();
    expect(dariDb.daftarTanggal.map((t) => kunci(t.toDate()))).toEqual(['2026-12-21', '2026-12-24']);
  });
});
