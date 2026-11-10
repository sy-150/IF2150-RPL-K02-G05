import JadwalController from '@/controller/JadwalController';
import Jadwal from '@/model/Jadwal';
import AkunPetugas from '@/model/AkunPetugas';

jest.mock('@/model/Jadwal', () => ({
  __esModule: true,
  default: { getJadwalById: jest.fn(), getSemuaJadwal: jest.fn() },
}));
jest.mock('@/model/AkunPetugas', () => ({
  __esModule: true,
  default: { cekStatusLogin: jest.fn(), getWilayahTugas: jest.fn() },
}));

const { getJadwalById, getSemuaJadwal } = Jadwal;
const { cekStatusLogin, getWilayahTugas } = AkunPetugas;

// Dipanggil setiap jadwal.simpanJadwal(), dengan id dan tanggal yang sedang tersimpan di objeknya.
const simpanJadwal = jest.fn();

// 00:00 WIB = 17:00 UTC hari sebelumnya, sama seperti yang ditulis seed.js.
const wib = (tanggal) => new Date(`${tanggal}T00:00:00+07:00`);

// Tiruan kelas Jadwal, dengan getter dan setter yang sama.
function buatJadwal(idJadwal, kecamatan, kelurahan, daftarTanggal) {
  let tanggal = daftarTanggal;
  return {
    getIdJadwal: () => idJadwal,
    getKecamatan: () => kecamatan,
    getKelurahan: () => kelurahan,
    getTanggal: () => tanggal,
    setTanggal: (baru) => {
      tanggal = baru;
    },
    simpanJadwal: () => simpanJadwal(idJadwal, tanggal),
  };
}

const salinan = (j) => buatJadwal(j.getIdJadwal(), j.getKecamatan(), j.getKelurahan(), j.getTanggal());

const DATA = [
  buatJadwal('lebak-siliwangi', 'Coblong', 'Lebak Siliwangi', [wib('2026-11-02')]),
  buatJadwal('pasteur', 'Sukajadi', 'Pasteur', []),
  buatJadwal('tamansari', 'Bandung Wetan', 'Tamansari', []),
  buatJadwal('dago', 'Coblong', 'Dago', []),
];

beforeEach(async () => {
  getSemuaJadwal.mockReset().mockImplementation(async () => DATA.map(salinan));
  getJadwalById.mockReset().mockImplementation(async (id) => {
    const jadwal = DATA.find((j) => j.getIdJadwal() === id);
    return jadwal ? salinan(jadwal) : null;
  });
  simpanJadwal.mockReset().mockResolvedValue(undefined);
  cekStatusLogin.mockReset().mockResolvedValue(false);
  getWilayahTugas.mockReset().mockResolvedValue(null);
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  await JadwalController.getDaftarJadwal();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('bolehEdit', () => {
  it('true kalau petugas login di wilayah jadwal itu', async () => {
    cekStatusLogin.mockResolvedValue(true);
    getWilayahTugas.mockResolvedValue('lebak-siliwangi');
    const hasil = await JadwalController.getJadwal('lebak-siliwangi');
    expect(hasil).toMatchObject({ statusLogin: true, bolehEdit: true });
  });

  it('false untuk petugas wilayah lain', async () => {
    cekStatusLogin.mockResolvedValue(true);
    getWilayahTugas.mockResolvedValue('lebak-siliwangi');
    const hasil = await JadwalController.getJadwal('pasteur');
    expect(hasil).toMatchObject({ statusLogin: true, bolehEdit: false });
  });

  it('false kalau belum login', async () => {
    const hasil = await JadwalController.getJadwal('lebak-siliwangi');
    expect(hasil).toMatchObject({ statusLogin: false, bolehEdit: false });
    expect(getWilayahTugas).not.toHaveBeenCalled();
  });

  it('detail tetap tampil kalau wilayah tugas gagal dibaca', async () => {
    cekStatusLogin.mockResolvedValue(true);
    getWilayahTugas.mockRejectedValue(new Error('offline'));
    const hasil = await JadwalController.getJadwal('lebak-siliwangi');
    expect(hasil.jadwal.getKelurahan()).toBe('Lebak Siliwangi');
    expect(hasil.bolehEdit).toBe(false);
  });
});

describe('editJadwal', () => {
  it('menyimpan tanggal tanpa duplikat, terurut, pukul 00:00 WIB', async () => {
    const tanggal = [
      wib('2026-11-09'),
      new Date('2026-11-02T10:30:00+07:00'), // jam bukan 00:00
      wib('2026-11-02'), // hari yang sama
    ];
    await JadwalController.editJadwal('pasteur', tanggal);
    expect(simpanJadwal).toHaveBeenCalledWith('pasteur', [wib('2026-11-02'), wib('2026-11-09')]);
  });

  it('mengembalikan jadwal yang sudah diperbarui', async () => {
    const hasil = await JadwalController.editJadwal('pasteur', [wib('2026-11-05')]);
    expect(hasil.getIdJadwal()).toBe('pasteur');
    expect(hasil.getKelurahan()).toBe('Pasteur');
    expect(hasil.getTanggal()).toEqual([wib('2026-11-05')]);
  });

  it('memperbarui cache setelah berhasil', async () => {
    await JadwalController.editJadwal('pasteur', [wib('2026-11-05')]);
    expect(JadwalController.cariLokasiTPS('pasteur')[0].getTanggal()).toEqual([wib('2026-11-05')]);
  });

  it('bisa menghapus semua tanggal', async () => {
    await JadwalController.editJadwal('lebak-siliwangi', []);
    expect(simpanJadwal).toHaveBeenCalledWith('lebak-siliwangi', []);
  });

  it('mengembalikan null dan tidak mengubah cache kalau penyimpanan gagal', async () => {
    simpanJadwal.mockRejectedValue(new Error('permission-denied'));
    await expect(JadwalController.editJadwal('lebak-siliwangi', [wib('2026-12-25')])).resolves.toBeNull();
    expect(JadwalController.cariLokasiTPS('lebak')[0].getTanggal()).toEqual([wib('2026-11-02')]);
  });

  it('mengembalikan null tanpa menyimpan kalau id tidak ada', async () => {
    await expect(JadwalController.editJadwal('tidak-ada', [])).resolves.toBeNull();
    expect(simpanJadwal).not.toHaveBeenCalled();
  });
});

describe('getDaftarJadwal', () => {
  it('mengurutkan per kecamatan lalu kelurahan', async () => {
    const hasil = await JadwalController.getDaftarJadwal();
    expect(hasil.map((j) => j.getIdJadwal())).toEqual(['tamansari', 'dago', 'lebak-siliwangi', 'pasteur']);
  });

  it('melempar error kalau model gagal', async () => {
    getSemuaJadwal.mockRejectedValue(new Error('offline'));
    await expect(JadwalController.getDaftarJadwal()).rejects.toThrow('offline');
  });
});

describe('cariLokasiTPS', () => {
  it('mencari berdasarkan kecamatan', () => {
    expect(JadwalController.cariLokasiTPS('coblong').map((j) => j.getIdJadwal())).toEqual(['dago', 'lebak-siliwangi']);
  });

  it('mencari kelurahan tanpa peka huruf besar/kecil', () => {
    expect(JadwalController.cariLokasiTPS('PASTEUR').map((j) => j.getIdJadwal())).toEqual(['pasteur']);
  });

  it('mengabaikan spasi di awal dan akhir', () => {
    expect(JadwalController.cariLokasiTPS('  dago ').map((j) => j.getIdJadwal())).toEqual(['dago']);
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
    cekStatusLogin.mockResolvedValue(true);
    const hasil = await JadwalController.getJadwal('pasteur');
    expect(hasil.jadwal.getKelurahan()).toBe('Pasteur');
    expect(hasil.statusLogin).toBe(true);
  });

  it('mengembalikan null kalau id tidak ada', async () => {
    await expect(JadwalController.getJadwal('tidak-ada')).resolves.toBeNull();
  });

  it('selalu mengambil data terbaru, cukup satu dokumen', async () => {
    getSemuaJadwal.mockClear();
    getJadwalById.mockResolvedValue(buatJadwal('pasteur', 'Sukajadi', 'Pasteur', [wib('2026-12-25')]));
    const hasil = await JadwalController.getJadwal('pasteur');
    expect(getJadwalById).toHaveBeenCalledWith('pasteur');
    expect(getSemuaJadwal).not.toHaveBeenCalled();
    expect(hasil.jadwal.getTanggal()).toEqual([wib('2026-12-25')]);
  });

  it('melempar error kalau model gagal', async () => {
    getJadwalById.mockRejectedValue(new Error('offline'));
    await expect(JadwalController.getJadwal('pasteur')).rejects.toThrow('offline');
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

  it('apakahBerubah false kalau harinya sama walaupun urutan dan jam beda', () => {
    const awal = [wib('2026-11-02'), wib('2026-11-09')];
    const baru = [new Date('2026-11-09T10:00:00+07:00'), wib('2026-11-02'), wib('2026-11-02')];
    expect(JadwalController.apakahBerubah(awal, baru)).toBe(false);
  });

  it('apakahBerubah true kalau ada tanggal ditambah atau dihapus', () => {
    const awal = [wib('2026-11-02'), wib('2026-11-09')];
    expect(JadwalController.apakahBerubah(awal, [wib('2026-11-02')])).toBe(true);
    expect(JadwalController.apakahBerubah(awal, [...awal, wib('2026-11-12')])).toBe(true);
  });

  it('apakahBerubah false kalau tanggal dipilih lalu dibatalkan lagi', () => {
    const awal = [wib('2026-11-02')];
    const pilih = JadwalController.toggleTanggal(awal, '2026-11-05');
    expect(JadwalController.apakahBerubah(awal, JadwalController.toggleTanggal(pilih, '2026-11-05'))).toBe(false);
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
