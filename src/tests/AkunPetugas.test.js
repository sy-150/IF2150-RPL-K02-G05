import { AkunPetugas } from '@/model/AkunPetugas';
import { doc, getDoc, runTransaction, writeBatch } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  updatePassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';
import { auth } from '@/database/firebase';

jest.mock('firebase/firestore', () => ({
  doc: jest.fn((_db, col, id) => ({ col, id })),
  getDoc: jest.fn(),
  runTransaction: jest.fn(),
  writeBatch: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  deleteUser: jest.fn(),
  updatePassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  onAuthStateChanged: jest.fn(),
  verifyBeforeUpdateEmail: jest.fn(),
}));

jest.mock('@/database/firebase', () => ({
  db: {},
  auth: {
    currentUser: null,
    languageCode: 'en',
  },
}));

describe('C01 - AkunPetugas Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    auth.currentUser = null;
    auth.languageCode = 'en';
    AkunPetugas.idPetugas = '';
    AkunPetugas.username = '';
    AkunPetugas.nik = '';
    AkunPetugas.email = '';
    AkunPetugas.noTelepon = '';
    AkunPetugas.wilayahTugas = '';
    AkunPetugas.statusLogin = false;
  });

  test('C01-UT01: verifikasiPetugas mengembalikan VALID untuk NIK dan nama yang terdaftar serta belum dipakai', async () => {
    getDoc
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ namaLengkap: 'Budi Santoso', wilayahTugas: 'lebak-siliwangi' }),
      })
      .mockResolvedValueOnce({
        exists: () => false,
      });

    const hasil = await AkunPetugas.verifikasiPetugas('3273010101900001', 'Budi Santoso');

    expect(hasil).toBe('VALID');
    expect(AkunPetugas.username).toBe('Budi Santoso');
    expect(AkunPetugas.wilayahTugas).toBe('lebak-siliwangi');
  });

  test('C01-UT02: verifikasiPetugas menormalisasi spasi dan huruf kapital pada username', async () => {
    getDoc
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ namaLengkap: 'Budi Santoso', wilayahTugas: 'coblong' }),
      })
      .mockResolvedValueOnce({
        exists: () => false,
      });

    const hasil = await AkunPetugas.verifikasiPetugas('3273010101900001', '  bUDI sANTOSO  ');

    expect(hasil).toBe('VALID');
    expect(AkunPetugas.username).toBe('Budi Santoso');
  });

  test('C01-UT03: verifikasiPetugas mengembalikan NIK_TIDAK_TERDAFTAR jika NIK tidak ada di dataPemerintah', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => false });

    const hasil = await AkunPetugas.verifikasiPetugas('9999999999999999', 'Budi Santoso');

    expect(hasil).toBe('NIK_TIDAK_TERDAFTAR');
  });

  test('C01-UT04: verifikasiPetugas mengembalikan NAMA_TIDAK_SESUAI jika nama tidak cocok', async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ namaLengkap: 'Budi Santoso', wilayahTugas: 'coblong' }),
    });

    const hasil = await AkunPetugas.verifikasiPetugas('3273010101900001', 'Andi Wijaya');

    expect(hasil).toBe('NAMA_TIDAK_SESUAI');
  });

  test('C01-UT05: verifikasiPetugas mengembalikan NIK_SUDAH_TERDAFTAR jika NIK sudah ada di nikTerdaftar', async () => {
    getDoc
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ namaLengkap: 'Budi Santoso', wilayahTugas: 'coblong' }),
      })
      .mockResolvedValueOnce({
        exists: () => true,
      });

    const hasil = await AkunPetugas.verifikasiPetugas('3273010101900001', 'Budi Santoso');

    expect(hasil).toBe('NIK_SUDAH_TERDAFTAR');
  });

  test('C01-UT06: createAkunPetugas membuat user Auth dan menyimpan dokumen via writeBatch', async () => {
    const mockBatchSet = jest.fn();
    const mockBatchCommit = jest.fn().mockResolvedValue(undefined);
    writeBatch.mockReturnValue({ set: mockBatchSet, commit: mockBatchCommit });
    createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: 'uid-123' } });

    const hasil = await AkunPetugas.createAkunPetugas(
      'Budi Santoso',
      '3273010101900001',
      'budi@ecotrack.id',
      '081234567890',
      'rahasia123',
      'lebak-siliwangi'
    );

    expect(hasil).toBe('BERHASIL');
    expect(mockBatchSet).toHaveBeenCalledTimes(2);
    expect(mockBatchCommit).toHaveBeenCalledTimes(1);
    expect(AkunPetugas.idPetugas).toBe('uid-123');
    expect(AkunPetugas.statusLogin).toBe(true);
  });

  test('C01-UT07: createAkunPetugas mengembalikan EMAIL_TERDAFTAR saat email sudah digunakan', async () => {
    createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/email-already-in-use' });

    const hasil = await AkunPetugas.createAkunPetugas(
      'Budi Santoso',
      '3273010101900001',
      'budi@ecotrack.id',
      '081234567890',
      'rahasia123',
      'lebak-siliwangi'
    );

    expect(hasil).toBe('EMAIL_TERDAFTAR');
    expect(writeBatch).not.toHaveBeenCalled();
  });

  test('C01-UT08: createAkunPetugas melakukan rollback deleteUser jika batch.commit gagal', async () => {
    const mockUser = { uid: 'uid-rollback' };
    createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    writeBatch.mockReturnValue({
      set: jest.fn(),
      commit: jest.fn().mockRejectedValue(new Error('Firestore gagal')),
    });
    deleteUser.mockResolvedValue(undefined);

    await expect(
      AkunPetugas.createAkunPetugas(
        'Budi Santoso',
        '3273010101900001',
        'budi@ecotrack.id',
        '081234567890',
        'rahasia123',
        'lebak-siliwangi'
      )
    ).rejects.toThrow('Firestore gagal');

    expect(deleteUser).toHaveBeenCalledWith(mockUser);
  });

  test('C01-UT09: loginAuth berhasil memuat profil dan mengembalikan true', async () => {
    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: 'uid-123', email: 'budi@ecotrack.id' },
    });
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        username: 'Budi Santoso',
        nik: '3273010101900001',
        email: 'budi@ecotrack.id',
        noTelepon: '081234567890',
        wilayahTugas: 'lebak-siliwangi',
      }),
    });

    const hasil = await AkunPetugas.loginAuth('budi@ecotrack.id', 'rahasia123');

    expect(hasil).toBe(true);
    expect(AkunPetugas.statusLogin).toBe(true);
    expect(AkunPetugas.username).toBe('Budi Santoso');
  });

  test('C01-UT10: loginAuth menyinkronkan email baru di Firestore via runTransaction jika berbeda', async () => {
    const mockUpdate = jest.fn();
    runTransaction.mockImplementation(async (_db, callback) => {
      await callback({ update: mockUpdate });
    });
    signInWithEmailAndPassword.mockResolvedValue({
      user: { uid: 'uid-123', email: 'baru@ecotrack.id' },
    });
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        username: 'Budi Santoso',
        nik: '3273010101900001',
        email: 'lama@ecotrack.id',
        noTelepon: '081234567890',
        wilayahTugas: 'lebak-siliwangi',
      }),
    });

    const hasil = await AkunPetugas.loginAuth('baru@ecotrack.id', 'rahasia123');

    expect(hasil).toBe(true);
    expect(mockUpdate).toHaveBeenCalledWith(expect.anything(), { email: 'baru@ecotrack.id' });
    expect(AkunPetugas.email).toBe('baru@ecotrack.id');
  });

  test('C01-UT11: loginAuth mengembalikan false saat kredensial salah atau dokumen profil tidak ditemukan', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/invalid-credential' });
    const gagalKredensial = await AkunPetugas.loginAuth('budi@ecotrack.id', 'salah');
    expect(gagalKredensial).toBe(false);

    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: { uid: 'uid-kosong', email: 'budi@ecotrack.id' },
    });
    getDoc.mockResolvedValueOnce({ exists: () => false });
    signOut.mockResolvedValueOnce(undefined);

    const gagalDokumen = await AkunPetugas.loginAuth('budi@ecotrack.id', 'rahasia123');
    expect(signOut).toHaveBeenCalled();
    expect(gagalDokumen).toBe(false);
  });

  test('C01-UT12: kirimResetKataSandi mengatur bahasa Indonesia dan mengirim tautan ke email yang di-trim', async () => {
    sendPasswordResetEmail.mockResolvedValue(undefined);

    await AkunPetugas.kirimResetKataSandi('  budi@ecotrack.id  ');

    expect(auth.languageCode).toBe('id');
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, 'budi@ecotrack.id');
  });

  test('C01-UT13: getProfil mengembalikan data profil lengkap dengan nama kelurahan dari koleksi jadwal', async () => {
    const mockUser = { uid: 'uid-123', email: 'budi@ecotrack.id', reload: jest.fn().mockResolvedValue(undefined) };
    onAuthStateChanged.mockImplementation((_auth, cb) => {
      Promise.resolve().then(() => cb(mockUser));
      return jest.fn();
    });

    getDoc
      .mockResolvedValueOnce({
        metadata: { fromCache: false },
        exists: () => true,
        data: () => ({
          username: 'Budi Santoso',
          nik: '3273010101900001',
          email: 'budi@ecotrack.id',
          noTelepon: '081234567890',
          wilayahTugas: 'lebak-siliwangi',
        }),
      })
      .mockResolvedValueOnce({
        exists: () => true,
        data: () => ({ kelurahan: 'Lebak Siliwangi' }),
      });

    const profil = await AkunPetugas.getProfil();

    expect(profil).toEqual({
      username: 'Budi Santoso',
      email: 'budi@ecotrack.id',
      noTelepon: '081234567890',
      wilayahTugas: 'Lebak Siliwangi',
    });
  });

  test('C01-UT14: getNamaWilayah menggunakan fallback format kapitalisasi slug jika dokumen jadwal tidak ada', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => false });

    const namaWilayah = await AkunPetugas.getNamaWilayah('lebak-siliwangi');
    const wilayahKosong = await AkunPetugas.getNamaWilayah('');

    expect(namaWilayah).toBe('Lebak Siliwangi');
    expect(wilayahKosong).toBe('');
  });

  test('C01-UT15: getProfil mengembalikan null saat belum login dan melempar error jika data berasal dari cache', async () => {
    onAuthStateChanged.mockImplementationOnce((_auth, cb) => {
      Promise.resolve().then(() => cb(null));
      return jest.fn();
    });
    expect(await AkunPetugas.getProfil()).toBeNull();

    const mockUser = { uid: 'uid-123', email: 'budi@ecotrack.id', reload: jest.fn().mockResolvedValue(undefined) };
    onAuthStateChanged.mockImplementationOnce((_auth, cb) => {
      Promise.resolve().then(() => cb(mockUser));
      return jest.fn();
    });
    getDoc.mockResolvedValueOnce({
      metadata: { fromCache: true },
      exists: () => true,
    });

    await expect(AkunPetugas.getProfil()).rejects.toThrow('Tidak bisa terhubung ke server');
  });

  test('C01-UT16: editProfil memperbarui nomor telepon tanpa verifikasi email jika email tidak berubah', async () => {
    auth.currentUser = { uid: 'uid-123', email: 'budi@ecotrack.id' };
    const mockUpdate = jest.fn();
    runTransaction.mockImplementation(async (_db, callback) => {
      await callback({ update: mockUpdate });
    });

    const hasil = await AkunPetugas.editProfil('budi@ecotrack.id', ' 0899999999 ');

    expect(hasil).toBe('BERHASIL');
    expect(verifyBeforeUpdateEmail).not.toHaveBeenCalled();
    expect(mockUpdate).toHaveBeenCalledWith(expect.anything(), { noTelepon: '0899999999' });
    expect(AkunPetugas.noTelepon).toBe('0899999999');
  });

  test('C01-UT17: editProfil mengirim tautan verifikasi dan mengembalikan VERIFIKASI_EMAIL jika email berubah', async () => {
    auth.currentUser = { uid: 'uid-123', email: 'lama@ecotrack.id' };
    verifyBeforeUpdateEmail.mockResolvedValue(undefined);
    runTransaction.mockImplementation(async (_db, callback) => {
      await callback({ update: jest.fn() });
    });

    const hasil = await AkunPetugas.editProfil('baru@ecotrack.id', '081234567890');

    expect(hasil).toBe('VERIFIKASI_EMAIL');
    expect(verifyBeforeUpdateEmail).toHaveBeenCalledWith(auth.currentUser, 'baru@ecotrack.id');
  });

  test('C01-UT18: editProfil mengembalikan BELUM_LOGIN jika auth.currentUser bernilai null', async () => {
    auth.currentUser = null;

    const hasil = await AkunPetugas.editProfil('baru@ecotrack.id', '081234567890');

    expect(hasil).toBe('BELUM_LOGIN');
    expect(runTransaction).not.toHaveBeenCalled();
  });

  test('C01-UT19: changePassword memperbarui sandi saat login aktif dan mengembalikan false saat belum login', async () => {
    auth.currentUser = null;
    expect(await AkunPetugas.changePassword('sandiBaru123')).toBe(false);

    auth.currentUser = { uid: 'uid-123' };
    updatePassword.mockResolvedValue(undefined);
    expect(await AkunPetugas.changePassword('sandiBaru123')).toBe(true);
    expect(updatePassword).toHaveBeenCalledWith(auth.currentUser, 'sandiBaru123');
  });

  test('C01-UT20: logout mereset state lokal, cekStatusLogin dan getWilayahTugas membaca status sesi', async () => {
    AkunPetugas.idPetugas = 'uid-123';
    AkunPetugas.username = 'Budi Santoso';
    AkunPetugas.statusLogin = true;
    signOut.mockResolvedValue(undefined);

    const hasilLogout = await AkunPetugas.logout();
    expect(hasilLogout).toBe(true);
    expect(AkunPetugas.statusLogin).toBe(false);
    expect(AkunPetugas.idPetugas).toBe('');

    onAuthStateChanged.mockImplementationOnce((_auth, cb) => {
      Promise.resolve().then(() => cb({ uid: 'uid-123' }));
      return jest.fn();
    });
    expect(await AkunPetugas.cekStatusLogin()).toBe(true);

    onAuthStateChanged.mockImplementationOnce((_auth, cb) => {
      Promise.resolve().then(() => cb({ uid: 'uid-123' }));
      return jest.fn();
    });
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ wilayahTugas: 'lebak-siliwangi' }),
    });
    expect(await AkunPetugas.getWilayahTugas()).toBe('lebak-siliwangi');
  });
});