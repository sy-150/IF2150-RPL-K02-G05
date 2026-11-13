import JadwalController from '@/controller/JadwalController';
import { getSemuaJadwal } from '@/model/Jadwal';
import { cekStatusLogin } from '@/model/AkunPetugas';

jest.mock('@/model/Jadwal', () => ({ getSemuaJadwal: jest.fn() }));
jest.mock('@/model/AkunPetugas', () => ({ cekStatusLogin: jest.fn() }));

// 00:00 WIB = 17:00 UTC hari sebelumnya, sama seperti yang ditulis seed.js.
const wib = (tanggal) => new Date(`${tanggal}T00:00:00+07:00`);

const DATA = [
  { idJadwal: 'lebak-siliwangi', kecamatan: 'Coblong', kelurahan: 'Lebak Siliwangi', daftarTanggal: [wib('2026-11-02')] },
  { idJadwal: 'pasteur', kecamatan: 'Sukajadi', kelurahan: 'Pasteur', daftarTanggal: [] },
  { idJadwal: 'tamansari', kecamatan: 'Bandung Wetan', kelurahan: 'Tamansari', daftarTanggal: [] },
  { idJadwal: 'dago', kecamatan: 'Coblong', kelurahan: 'Dago', daftarTanggal: [] },
];

beforeEach(async () => {
  getSemuaJadwal.mockReset().mockResolvedValue(DATA);
  cekStatusLogin.mockReset().mockReturnValue(false);
  await JadwalController.getDaftarJadwal();
});

describe('getDaftarJadwal', () => {
  it('mengurutkan per kecamatan lalu kelurahan', async () => {
    const hasil = await JadwalController.getDaftarJadwal();
    expect(hasil.map((j) => j.idJadwal)).toEqual(['tamansari', 'dago', 'lebak-siliwangi', 'pasteur']);
  });

  it('melempar error kalau model gagal', async () => {
    getSemuaJadwal.mockRejectedValue(new Error('offline'));
    await expect(JadwalController.getDaftarJadwal()).rejects.toThrow('offline');
  });
});

describe('cariLokasiTPS', () => {
  it('mencari berdasarkan kecamatan', () => {
    expect(JadwalController.cariLokasiTPS('coblong').map((j) => j.idJadwal)).toEqual(['dago', 'lebak-siliwangi']);
  });

  it('mencari kelurahan tanpa peka huruf besar/kecil', () => {
    expect(JadwalController.cariLokasiTPS('PASTEUR').map((j) => j.idJadwal)).toEqual(['pasteur']);
  });

  it('mengabaikan spasi di awal dan akhir', () => {
    expect(JadwalController.cariLokasiTPS('  dago ').map((j) => j.idJadwal)).toEqual(['dago']);
  });

  it('mengembalikan list kosong kalau tidak cocok', () => {
    expect(JadwalController.cariLokasiTPS('jakarta')).toEqual([]);
  });

  it('mengembalikan semua lokasi kalau keyword kosong', () => {
    expect(JadwalController.cariLokasiTPS('')).toHaveLength(DATA.length);
  });
});

describe('getJadwal', () => {
  it('mengembalikan jadwal dan statusLogin', async () => {
    cekStatusLogin.mockReturnValue(true);
    const hasil = await JadwalController.getJadwal('pasteur');
    expect(hasil.jadwal.kelurahan).toBe('Pasteur');
    expect(hasil.statusLogin).toBe(true);
  });

  it('mengembalikan null kalau id tidak ada', async () => {
    await expect(JadwalController.getJadwal('tidak-ada')).resolves.toBeNull();
  });

  it('selalu mengambil data terbaru dari database', async () => {
    getSemuaJadwal.mockClear();
    getSemuaJadwal.mockResolvedValue([{ ...DATA[1], daftarTanggal: [wib('2026-12-25')] }]);
    const hasil = await JadwalController.getJadwal('pasteur');
    expect(getSemuaJadwal).toHaveBeenCalledTimes(1);
    expect(hasil.jadwal.daftarTanggal).toEqual([wib('2026-12-25')]);
  });
});

describe('kalender WIB', () => {
  const NOV_2026 = { tahun: 2026, bulan: 10 };
  const sel = (kalender, kunci) => kalender.find((s) => s.kunci === kunci);

  it('menandai tanggal pengambilan pada hari yang benar', () => {
    const kalender = JadwalController.susunKalender(NOV_2026, [wib('2026-11-02')], wib('2026-11-20'));
    expect(sel(kalender, '2026-11-02').pengambilan).toBe(true);
    expect(sel(kalender, '2026-11-01').pengambilan).toBe(false);
  });

  it('tetap menandai tanggal pengambilan tahun tetangga yang terlihat di luar bulan', () => {
    const tanggal = [wib('2026-12-31'), wib('2027-01-01'), wib('2025-12-29')];
    const desember = JadwalController.susunKalender({ tahun: 2026, bulan: 11 }, tanggal, wib('2026-11-20'));
    expect(sel(desember, '2026-12-31')).toMatchObject({ pengambilan: true, bulanIni: true });
    expect(sel(desember, '2027-01-01')).toMatchObject({ pengambilan: true, bulanIni: false });

    // 1 Januari 2026 jatuh pada hari Kamis, jadi 28 Desember 2025 ikut terlihat
    const januari = JadwalController.susunKalender({ tahun: 2026, bulan: 0 }, [wib('2025-12-29')], wib('2026-11-20'));
    expect(sel(januari, '2025-12-29')).toMatchObject({ pengambilan: true, bulanIni: false });
  });

  it('memakai tahun menurut WIB saat pergantian tahun', () => {
    // 31 Desember 2026 18:00 UTC sudah 1 Januari 2027 WIB
    const sekarang = new Date('2026-12-31T18:00:00Z');
    expect(JadwalController.bisaGeserBulan({ tahun: 2027, bulan: 0 }, -1, sekarang)).toBe(false);
    expect(JadwalController.bisaGeserBulan({ tahun: 2027, bulan: 0 }, 1, sekarang)).toBe(true);
  });

  it('membatasi perpindahan bulan pada tahun berjalan', () => {
    const sekarang = wib('2026-11-20');
    expect(JadwalController.bisaGeserBulan({ tahun: 2026, bulan: 0 }, -1, sekarang)).toBe(false);
    expect(JadwalController.bisaGeserBulan({ tahun: 2026, bulan: 0 }, 1, sekarang)).toBe(true);
    expect(JadwalController.bisaGeserBulan({ tahun: 2026, bulan: 11 }, 1, sekarang)).toBe(false);
    expect(JadwalController.bisaGeserBulan({ tahun: 2026, bulan: 11 }, -1, sekarang)).toBe(true);
  });

  it('toggleTanggal menambah tanggal 00:00 WIB dan menjaga urutan', () => {
    const awal = [wib('2026-11-02'), wib('2026-11-09')];
    expect(JadwalController.toggleTanggal(awal, '2026-11-05')).toEqual([
      wib('2026-11-02'),
      wib('2026-11-05'),
      wib('2026-11-09'),
    ]);
    expect(awal).toHaveLength(2); // list asli tidak diubah
  });

  it('toggleTanggal menghapus tanggal yang sudah ada', () => {
    const awal = [wib('2026-11-02'), wib('2026-11-09')];
    expect(JadwalController.toggleTanggal(awal, '2026-11-02')).toEqual([wib('2026-11-09')]);
  });

  it('memakai hari ini menurut WIB, bukan UTC', () => {
    // 18:00 UTC tanggal 5 sudah tanggal 6 pukul 01:00 WIB
    const kalender = JadwalController.susunKalender(NOV_2026, [], new Date('2026-11-05T18:00:00Z'));
    expect(sel(kalender, '2026-11-06').hariIni).toBe(true);
    expect(sel(kalender, '2026-11-05').hariIni).toBe(false);
  });

  it('menyusun minggu penuh yang dimulai hari Minggu', () => {
    // 1 November 2026 jatuh pada hari Minggu, 30 hari → 5 minggu
    const kalender = JadwalController.susunKalender(NOV_2026, [], wib('2026-11-20'));
    expect(kalender).toHaveLength(35);
    expect(kalender[0].kunci).toBe('2026-11-01');
    expect(kalender[34]).toMatchObject({ kunci: '2026-12-05', bulanIni: false });
  });

  it('menampilkan sisa tanggal bulan sebelumnya', () => {
    // 1 Oktober 2026 jatuh pada hari Kamis
    const kalender = JadwalController.susunKalender({ tahun: 2026, bulan: 9 }, [], wib('2026-10-05'));
    expect(kalender[0]).toMatchObject({ kunci: '2026-09-27', bulanIni: false });
    expect(kalender[4]).toMatchObject({ kunci: '2026-10-01', bulanIni: true });
  });

  it('berpindah bulan melewati pergantian tahun', () => {
    expect(JadwalController.geserBulan({ tahun: 2026, bulan: 11 }, 1)).toEqual({ tahun: 2027, bulan: 0 });
    expect(JadwalController.geserBulan({ tahun: 2026, bulan: 0 }, -1)).toEqual({ tahun: 2025, bulan: 11 });
  });

  it('menulis nama bulan dan hari dalam bahasa Indonesia', () => {
    expect(JadwalController.getJudulBulan({ tahun: 2026, bulan: 9 })).toBe('Oktober 2026');
    expect(JadwalController.getTeksHariIni(wib('2026-10-05'))).toBe('Senin, 5 Oktober 2026');
  });

  it('menentukan bulan berjalan menurut WIB', () => {
    // 31 Oktober 20:00 UTC sudah 1 November WIB
    expect(JadwalController.getBulanIni(new Date('2026-10-31T20:00:00Z'))).toEqual({ tahun: 2026, bulan: 10 });
  });
});
