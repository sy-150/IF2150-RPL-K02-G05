// Unit test model/Jadwal.js (C04 Jadwal).
// Firestore diganti tiruan (mock), jadi test tidak butuh emulator maupun internet.
// Interaksi nyata dengan Firestore diuji terpisah pada JadwalIntegrasi.test.js.

import Jadwal from '@/model/Jadwal';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

jest.mock('@/database/firebase', () => ({ __esModule: true, db: { nama: 'db-tiruan' } }));
jest.mock('firebase/firestore', () => ({
  collection: jest.fn((db, nama) => ({ koleksi: nama })),
  doc: jest.fn((db, koleksi, id) => ({ koleksi, id })),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  runTransaction: jest.fn(),
  serverTimestamp: jest.fn(() => 'WAKTU_SERVER'),
  Timestamp: { fromDate: jest.fn((tanggal) => ({ ts: tanggal.toISOString() })) },
}));

const wib = (tanggal) => new Date(`${tanggal}T00:00:00+07:00`);

// Tiruan Timestamp Firestore yang dibaca dari dokumen.
const ts = (tanggal) => ({ toDate: () => wib(tanggal) });

// Tiruan DocumentSnapshot.
function dokumen(id, data, { fromCache = false, exists = true } = {}) {
  return { id, data: () => data, exists: () => exists, metadata: { fromCache } };
}

const buatJadwal = (daftarTanggal = [wib('2026-11-02')]) =>
  new Jadwal({ idJadwal: 'lebak-siliwangi', kecamatan: 'Coblong', kelurahan: 'Lebak Siliwangi', daftarTanggal });

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getter', () => {
  it('C04-UT01 mengembalikan id, kecamatan, kelurahan, dan tanggal sesuai konstruktor', () => {
    const jadwal = buatJadwal([wib('2026-11-02'), wib('2026-11-05')]);
    expect(jadwal.getIdJadwal()).toBe('lebak-siliwangi');
    expect(jadwal.getKecamatan()).toBe('Coblong');
    expect(jadwal.getKelurahan()).toBe('Lebak Siliwangi');
    expect(jadwal.getTanggal()).toEqual([wib('2026-11-02'), wib('2026-11-05')]);
  });

  it('C04-UT02 getTanggal mengembalikan salinan sehingga data di dalam objek tidak ikut berubah', () => {
    const jadwal = buatJadwal();
    jadwal.getTanggal().push(wib('2026-12-25'));
    expect(jadwal.getTanggal()).toEqual([wib('2026-11-02')]);
  });

  it('C04-UT03 atribut bersifat privat dan tidak dapat diakses dari luar kelas', () => {
    const jadwal = buatJadwal();
    expect(jadwal.idJadwal).toBeUndefined();
    expect(jadwal.daftarTanggal).toBeUndefined();
  });
});

describe('setTanggal', () => {
  it('C04-UT04 mengganti daftar tanggal tanpa menulis ke database', () => {
    const jadwal = buatJadwal();
    jadwal.setTanggal([wib('2026-11-09')]);
    expect(jadwal.getTanggal()).toEqual([wib('2026-11-09')]);
    expect(runTransaction).not.toHaveBeenCalled();
  });

  it('C04-UT05 menerima list kosong (semua tanggal dihapus)', () => {
    const jadwal = buatJadwal();
    jadwal.setTanggal([]);
    expect(jadwal.getTanggal()).toEqual([]);
  });

  it('C04-UT06 menyalin list masukan sehingga perubahan list asal tidak memengaruhi objek', () => {
    const jadwal = buatJadwal();
    const baru = [wib('2026-11-09')];
    jadwal.setTanggal(baru);
    baru.push(wib('2026-11-12'));
    expect(jadwal.getTanggal()).toEqual([wib('2026-11-09')]);
  });
});

describe('simpanJadwal', () => {
  it('C04-UT07 menulis daftarTanggal (Timestamp) dan diperbaruiPada lewat transaction', async () => {
    const update = jest.fn();
    runTransaction.mockImplementation(async (db, fungsi) => fungsi({ update }));
    const jadwal = buatJadwal([wib('2026-11-02'), wib('2026-11-05')]);

    await jadwal.simpanJadwal();

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'jadwal', 'lebak-siliwangi');
    expect(Timestamp.fromDate).toHaveBeenCalledTimes(2);
    expect(serverTimestamp).toHaveBeenCalled();
    expect(update).toHaveBeenCalledWith(
      { koleksi: 'jadwal', id: 'lebak-siliwangi' },
      {
        daftarTanggal: [{ ts: wib('2026-11-02').toISOString() }, { ts: wib('2026-11-05').toISOString() }],
        diperbaruiPada: 'WAKTU_SERVER',
      }
    );
  });

  it('C04-UT08 menyimpan list kosong ketika semua tanggal dihapus', async () => {
    const update = jest.fn();
    runTransaction.mockImplementation(async (db, fungsi) => fungsi({ update }));
    await buatJadwal([]).simpanJadwal();
    expect(update).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ daftarTanggal: [] }));
  });

  it('C04-UT09 melempar error ke pemanggil jika transaction gagal (offline / ditolak rules)', async () => {
    runTransaction.mockRejectedValue(new Error('permission-denied'));
    await expect(buatJadwal().simpanJadwal()).rejects.toThrow('permission-denied');
  });
});

describe('getSemuaJadwal', () => {
  it('C04-UT10 mengubah setiap dokumen menjadi objek Jadwal dengan tanggal bertipe Date', async () => {
    getDocs.mockResolvedValue({
      metadata: { fromCache: false },
      docs: [
        dokumen('pasteur', { kecamatan: 'Sukajadi', kelurahan: 'Pasteur', daftarTanggal: [ts('2026-11-03')] }),
        dokumen('dago', { kecamatan: 'Coblong', kelurahan: 'Dago', daftarTanggal: [] }),
      ],
    });

    const hasil = await Jadwal.getSemuaJadwal();

    expect(collection).toHaveBeenCalledWith(expect.anything(), 'jadwal');
    expect(hasil).toHaveLength(2);
    expect(hasil[0]).toBeInstanceOf(Jadwal);
    expect(hasil[0].getIdJadwal()).toBe('pasteur');
    expect(hasil[0].getTanggal()).toEqual([wib('2026-11-03')]);
    expect(hasil[1].getTanggal()).toEqual([]);
  });

  it('C04-UT11 dokumen tanpa field daftarTanggal dianggap tidak punya tanggal', async () => {
    getDocs.mockResolvedValue({
      metadata: { fromCache: false },
      docs: [dokumen('kopo', { kecamatan: 'Bojongloa Kaler', kelurahan: 'Kopo' })],
    });
    const [jadwal] = await Jadwal.getSemuaJadwal();
    expect(jadwal.getTanggal()).toEqual([]);
  });

  it('C04-UT12 koleksi kosong menghasilkan list kosong', async () => {
    getDocs.mockResolvedValue({ metadata: { fromCache: false }, docs: [] });
    await expect(Jadwal.getSemuaJadwal()).resolves.toEqual([]);
  });

  it('C04-UT13 data dari cache (offline) dianggap gagal', async () => {
    getDocs.mockResolvedValue({ metadata: { fromCache: true }, docs: [] });
    await expect(Jadwal.getSemuaJadwal()).rejects.toThrow('Tidak bisa terhubung ke server');
  });

  it('C04-UT14 error dari Firestore diteruskan ke pemanggil', async () => {
    getDocs.mockRejectedValue(new Error('unavailable'));
    await expect(Jadwal.getSemuaJadwal()).rejects.toThrow('unavailable');
  });
});

describe('getJadwalById', () => {
  it('C04-UT15 mengembalikan objek Jadwal untuk id yang ada', async () => {
    getDoc.mockResolvedValue(
      dokumen('lebak-siliwangi', { kecamatan: 'Coblong', kelurahan: 'Lebak Siliwangi', daftarTanggal: [ts('2026-11-02')] })
    );
    const jadwal = await Jadwal.getJadwalById('lebak-siliwangi');
    expect(doc).toHaveBeenCalledWith(expect.anything(), 'jadwal', 'lebak-siliwangi');
    expect(jadwal.getKelurahan()).toBe('Lebak Siliwangi');
    expect(jadwal.getTanggal()).toEqual([wib('2026-11-02')]);
  });

  it('C04-UT16 mengembalikan null untuk id yang tidak ada', async () => {
    getDoc.mockResolvedValue(dokumen('tidak-ada', undefined, { exists: false }));
    await expect(Jadwal.getJadwalById('tidak-ada')).resolves.toBeNull();
  });

  it('C04-UT17 data dari cache (offline) dianggap gagal', async () => {
    getDoc.mockResolvedValue(dokumen('pasteur', {}, { fromCache: true }));
    await expect(Jadwal.getJadwalById('pasteur')).rejects.toThrow('Tidak bisa terhubung ke server');
  });
});
