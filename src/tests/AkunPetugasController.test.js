import { AkunPetugasController } from '@/controller/AkunPetugasController';
import { AkunPetugas } from '@/model/AkunPetugas';
import { auth } from '@/database/firebase';

jest.mock('@/database/firebase', () => ({
  db: {},
  auth: {
    currentUser: null,
  },
}));

describe('C02 - AkunPetugasController Unit Tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    auth.currentUser = null;
  });

  test('C02-UT01: signUp memverifikasi petugas lalu membuat akun dengan data resmi dari Model', async () => {
    jest.spyOn(AkunPetugas, 'verifikasiPetugas').mockImplementation(async () => {
      AkunPetugas.username = 'Budi Santoso';
      AkunPetugas.wilayahTugas = 'lebak-siliwangi';
      return 'VALID';
    });
    const spyCreate = jest.spyOn(AkunPetugas, 'createAkunPetugas').mockResolvedValue('BERHASIL');

    const hasil = await AkunPetugasController.signUp(
      'budi santoso',
      '3273010101900001',
      'budi@ecotrack.id',
      '081234567890',
      'sandi123',
      'sandi123'
    );

    expect(hasil).toBe('BERHASIL');
    expect(spyCreate).toHaveBeenCalledWith(
      'Budi Santoso',
      '3273010101900001',
      'budi@ecotrack.id',
      '081234567890',
      'sandi123',
      'lebak-siliwangi'
    );
  });

  test('C02-UT02: signUp mengembalikan KONFIRMASI_SANDI_BEDA jika kata sandi kosong atau tidak cocok', async () => {
    const spyVerifikasi = jest.spyOn(AkunPetugas, 'verifikasiPetugas');

    const beda = await AkunPetugasController.signUp(
      'Budi',
      '3273010101900001',
      'budi@ecotrack.id',
      '081234567890',
      'sandi123',
      'sandi456'
    );
    const kosong = await AkunPetugasController.signUp(
      'Budi',
      '3273010101900001',
      'budi@ecotrack.id',
      '081234567890',
      '',
      ''
    );

    expect(beda).toBe('KONFIRMASI_SANDI_BEDA');
    expect(kosong).toBe('KONFIRMASI_SANDI_BEDA');
    expect(spyVerifikasi).not.toHaveBeenCalled();
  });

  test('C02-UT03: signUp meneruskan status kegagalan verifikasi tanpa memanggil createAkunPetugas', async () => {
    jest.spyOn(AkunPetugas, 'verifikasiPetugas').mockResolvedValue('NIK_TIDAK_TERDAFTAR');
    const spyCreate = jest.spyOn(AkunPetugas, 'createAkunPetugas');

    const hasil = await AkunPetugasController.signUp(
      'Budi',
      '9999999999999999',
      'budi@ecotrack.id',
      '081234567890',
      'sandi123',
      'sandi123'
    );

    expect(hasil).toBe('NIK_TIDAK_TERDAFTAR');
    expect(spyCreate).not.toHaveBeenCalled();
  });

  test('C02-UT04: signUp mengembalikan NETWORK_ERROR saat Model melempar exception', async () => {
    jest.spyOn(AkunPetugas, 'verifikasiPetugas').mockRejectedValue(new Error('Offline'));

    const hasil = await AkunPetugasController.signUp(
      'Budi',
      '3273010101900001',
      'budi@ecotrack.id',
      '081234567890',
      'sandi123',
      'sandi123'
    );

    expect(hasil).toBe('NETWORK_ERROR');
  });

  test('C02-UT05: prosesLogin mengembalikan BERHASIL ketika loginAuth mengembalikan true', async () => {
    jest.spyOn(AkunPetugas, 'loginAuth').mockResolvedValue(true);

    const hasil = await AkunPetugasController.prosesLogin('budi@ecotrack.id', 'sandi123');

    expect(hasil).toBe('BERHASIL');
  });

  test('C02-UT06: prosesLogin mengembalikan KREDENSIAL_SALAH ketika loginAuth mengembalikan false', async () => {
    jest.spyOn(AkunPetugas, 'loginAuth').mockResolvedValue(false);

    const hasil = await AkunPetugasController.prosesLogin('budi@ecotrack.id', 'salah');

    expect(hasil).toBe('KREDENSIAL_SALAH');
  });

  test('C02-UT07: prosesLogin mengembalikan NETWORK_ERROR saat loginAuth melempar exception', async () => {
    jest.spyOn(AkunPetugas, 'loginAuth').mockRejectedValue({ code: 'auth/network-request-failed' });

    const hasil = await AkunPetugasController.prosesLogin('budi@ecotrack.id', 'sandi123');

    expect(hasil).toBe('NETWORK_ERROR');
  });

  test('C02-UT08: lupaKataSandi mengembalikan TERKIRIM baik saat berhasil maupun auth/user-not-found', async () => {
    const spyReset = jest.spyOn(AkunPetugas, 'kirimResetKataSandi').mockResolvedValueOnce(undefined);
    expect(await AkunPetugasController.lupaKataSandi('budi@ecotrack.id')).toBe('TERKIRIM');

    spyReset.mockRejectedValueOnce({ code: 'auth/user-not-found' });
    expect(await AkunPetugasController.lupaKataSandi('tidakada@ecotrack.id')).toBe('TERKIRIM');
  });

  test('C02-UT09: lupaKataSandi memetakan kode error format email, rate limit, dan jaringan', async () => {
    const spyReset = jest.spyOn(AkunPetugas, 'kirimResetKataSandi');

    spyReset.mockRejectedValueOnce({ code: 'auth/invalid-email' });
    expect(await AkunPetugasController.lupaKataSandi('bukan-email')).toBe('EMAIL_TIDAK_VALID');

    spyReset.mockRejectedValueOnce({ code: 'auth/too-many-requests' });
    expect(await AkunPetugasController.lupaKataSandi('budi@ecotrack.id')).toBe('TERLALU_SERING');

    spyReset.mockRejectedValueOnce({ code: 'auth/network-request-failed' });
    expect(await AkunPetugasController.lupaKataSandi('budi@ecotrack.id')).toBe('NETWORK_ERROR');
  });

  test('C02-UT10: editProfil meneruskan pembaruan ke Model dan mengembalikan BERHASIL atau VERIFIKASI_EMAIL', async () => {
    const spyEdit = jest.spyOn(AkunPetugas, 'editProfil');

    spyEdit.mockResolvedValueOnce('BERHASIL');
    expect(await AkunPetugasController.editProfil('budi@ecotrack.id', '081234567890')).toBe('BERHASIL');

    spyEdit.mockResolvedValueOnce('VERIFIKASI_EMAIL');
    expect(await AkunPetugasController.editProfil('baru@ecotrack.id', '081234567890')).toBe('VERIFIKASI_EMAIL');
  });

  test('C02-UT11: editProfil memetakan seluruh kode error Firebase ke status spesifik antarmuka', async () => {
    const spyEdit = jest.spyOn(AkunPetugas, 'editProfil');

    spyEdit.mockRejectedValueOnce({ code: 'auth/requires-recent-login' });
    expect(await AkunPetugasController.editProfil('baru@ecotrack.id', '0812')).toBe('PERLU_LOGIN_ULANG');

    spyEdit.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    expect(await AkunPetugasController.editProfil('terpakai@ecotrack.id', '0812')).toBe('EMAIL_TERDAFTAR');

    spyEdit.mockRejectedValueOnce({ code: 'auth/invalid-email' });
    expect(await AkunPetugasController.editProfil('salah', '0812')).toBe('EMAIL_TIDAK_VALID');

    spyEdit.mockRejectedValueOnce({ code: 'auth/too-many-requests' });
    expect(await AkunPetugasController.editProfil('baru@ecotrack.id', '0812')).toBe('TERLALU_SERING');

    spyEdit.mockRejectedValueOnce({ code: 'auth/network-request-failed' });
    expect(await AkunPetugasController.editProfil('baru@ecotrack.id', '0812')).toBe('NETWORK_ERROR');
  });

  test('C02-UT12: changePassword mengembalikan BERHASIL saat sesi aktif dan Model sukses', async () => {
    auth.currentUser = { uid: 'uid-123' };
    jest.spyOn(AkunPetugas, 'changePassword').mockResolvedValue(true);

    const hasil = await AkunPetugasController.changePassword('sandiBaru123');

    expect(hasil).toBe('BERHASIL');
  });

  test('C02-UT13: changePassword menangani BELUM_LOGIN serta memetakan error Firebase Auth', async () => {
    auth.currentUser = null;
    expect(await AkunPetugasController.changePassword('sandiBaru123')).toBe('BELUM_LOGIN');

    auth.currentUser = { uid: 'uid-123' };
    const spyChange = jest.spyOn(AkunPetugas, 'changePassword');

    spyChange.mockRejectedValueOnce({ code: 'auth/requires-recent-login' });
    expect(await AkunPetugasController.changePassword('sandiBaru123')).toBe('PERLU_LOGIN_ULANG');

    spyChange.mockRejectedValueOnce({ code: 'auth/weak-password' });
    expect(await AkunPetugasController.changePassword('123')).toBe('SANDI_LEMAH');

    spyChange.mockRejectedValueOnce({ code: 'auth/too-many-requests' });
    expect(await AkunPetugasController.changePassword('sandiBaru123')).toBe('TERLALU_SERING');

    spyChange.mockRejectedValueOnce({ code: 'auth/network-request-failed' });
    expect(await AkunPetugasController.changePassword('sandiBaru123')).toBe('NETWORK_ERROR');
  });

  test('C02-UT14: logout dan getProfil mendelegasikan proses ke AkunPetugas', async () => {
    const profilDummy = { username: 'Budi', email: 'budi@ecotrack.id', noTelepon: '0812', wilayahTugas: 'Coblong' };
    jest.spyOn(AkunPetugas, 'getProfil').mockResolvedValue(profilDummy);
    jest.spyOn(AkunPetugas, 'logout').mockResolvedValue(true);

    expect(await AkunPetugasController.getProfil()).toEqual(profilDummy);
    expect(await AkunPetugasController.logout()).toBe(true);
  });
});