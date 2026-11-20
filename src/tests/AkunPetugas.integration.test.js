const fs = require('fs');
const path = require('path');

for (const dir of [process.cwd(), path.resolve(process.cwd(), '../..')]) {
  for (const envFile of ['.env', '.env.local']) {
    const envPath = path.join(dir, envFile);
    if (fs.existsSync(envPath)) {
      for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match && !process.env[match[1]]) {
          process.env[match[1]] = (match[2] || '').trim().replace(/^['"]|['"]$/g, '');
        }
      }
    }
  }
}
process.env.EXPO_PUBLIC_USE_EMULATOR = 'false';

// Pulihkan fetch nyata Node.js agar firebase/auth terhubung langsung ke server Firebase Cloud
try {
  const undici = require('undici');
  global.fetch = undici.fetch;
  global.Headers = undici.Headers;
  global.Request = undici.Request;
  global.Response = undici.Response;
} catch {
  try {
    const nodeFetch = require('node-fetch');
    global.fetch = nodeFetch.default || nodeFetch;
    global.Headers = nodeFetch.Headers;
    global.Request = nodeFetch.Request;
    global.Response = nodeFetch.Response;
  } catch {}
}

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const { AkunPetugasController } = require('@/controller/AkunPetugasController');
const { AkunPetugas } = require('@/model/AkunPetugas');
const { db, auth } = require('@/database/firebase');
const { doc, getDoc, deleteDoc } = require('firebase/firestore');
const { deleteUser } = require('firebase/auth');

// WAJIB DIGANTI: Isi dengan 1 pasangan NIK & namaLengkap asli dari koleksi 'dataPemerintah' yang belum ada di 'nikTerdaftar'
const TEST_NIK = '9999054402990006';
const TEST_NAMA = 'Nur Aisyah';

const TEST_EMAIL = `integrasi.petugas.${Date.now()}@ecotrack.id`;
const TEST_TELEPON_AWAL = '081234567890';
const TEST_TELEPON_BARU = '081299998888';
const TEST_PASSWORD_AWAL = 'PasswordUji123';
const TEST_PASSWORD_BARU = 'PasswordBaru456';

jest.setTimeout(30000);

describe('Pengujian Integrasi Nyata - Modul Autentikasi & Akun Petugas (I-01, I-02, I-03)', () => {
  let createdUid = null;

  afterAll(async () => {
    // Bersihkan data uji di Firestore dan Firebase Auth agar test dapat dijalankan ulang
    if (createdUid) {
      await deleteDoc(doc(db, 'akunPetugas', createdUid)).catch(() => {});
      await deleteDoc(doc(db, 'nikTerdaftar', TEST_NIK)).catch(() => {});
    }
    if (auth.currentUser) {
      await deleteUser(auth.currentUser).catch(() => {});
    }
  });

  test('INT-TC01 (I-01 Controller-Model): Registrasi petugas melalui AkunPetugasController diteruskan ke AkunPetugas', async () => {
    const hasilSignUp = await AkunPetugasController.signUp(
      TEST_NAMA,
      TEST_NIK,
      TEST_EMAIL,
      TEST_TELEPON_AWAL,
      TEST_PASSWORD_AWAL,
      TEST_PASSWORD_AWAL
    );

    expect(hasilSignUp).toBe('BERHASIL');
    expect(AkunPetugas.statusLogin).toBe(true);
    expect(AkunPetugas.idPetugas).toBeTruthy();
    createdUid = AkunPetugas.idPetugas;
  });

  test('INT-TC03 (I-02 Aplikasi-Database): Dokumen akunPetugas dan nikTerdaftar tersimpan nyata di Cloud Firestore', async () => {
    expect(createdUid).toBeTruthy();

    const snapAkun = await getDoc(doc(db, 'akunPetugas', createdUid));
    const snapNik = await getDoc(doc(db, 'nikTerdaftar', TEST_NIK));

    expect(snapAkun.exists()).toBe(true);
    expect(snapAkun.data().email).toBe(TEST_EMAIL);
    expect(snapAkun.data().nik).toBe(TEST_NIK);
    expect(snapAkun.data().noTelepon).toBe(TEST_TELEPON_AWAL);

   expect(snapNik.exists()).toBe(true);
    expect(snapNik.data()).toBeDefined();
  });

  test('INT-TC05 (I-03 Aplikasi-Eksternal): User baru terdaftar dan memiliki sesi aktif pada Firebase Authentication', async () => {
    expect(auth.currentUser).not.toBeNull();
    expect(auth.currentUser.uid).toBe(createdUid);
    expect(auth.currentUser.email).toBe(TEST_EMAIL);
  });

  test('INT-TC02 (I-01 Controller-Model): Pembacaan profil dan pembaruan nomor telepon melalui Controller', async () => {
    const profilAwal = await AkunPetugasController.getProfil();
    expect(profilAwal).not.toBeNull();
    expect(profilAwal.email).toBe(TEST_EMAIL);

    const hasilEdit = await AkunPetugasController.editProfil(TEST_EMAIL, TEST_TELEPON_BARU);
    expect(hasilEdit).toBe('BERHASIL');
  });

  test('INT-TC04 (I-02 Aplikasi-Database): Pembaruan nomor telepon tersimpan di dokumen Cloud Firestore', async () => {
    const snapAkunTerbaru = await getDoc(doc(db, 'akunPetugas', createdUid));

    expect(snapAkunTerbaru.exists()).toBe(true);
    expect(snapAkunTerbaru.data().noTelepon).toBe(TEST_TELEPON_BARU);
  });

  test('INT-TC06 (I-03 Aplikasi-Eksternal): Logout mengakhiri sesi dan login dengan sandi salah ditolak Firebase Auth', async () => {
    const hasilLogout = await AkunPetugasController.logout();
    expect(hasilLogout).toBe(true);
    expect(auth.currentUser).toBeNull();

    const hasilLoginGagal = await AkunPetugasController.prosesLogin(TEST_EMAIL, 'SandiSalah999');
    expect(hasilLoginGagal).toBe('KREDENSIAL_SALAH');
    expect(auth.currentUser).toBeNull();
  });

  test('INT-TC07 (I-03 Aplikasi-Eksternal): Ganti kata sandi diperbarui di Firebase Auth dan bisa dipakai login ulang', async () => {
    const loginAwal = await AkunPetugasController.prosesLogin(TEST_EMAIL, TEST_PASSWORD_AWAL);
    expect(loginAwal).toBe('BERHASIL');

    const hasilGantiSandi = await AkunPetugasController.changePassword(TEST_PASSWORD_BARU);
    expect(hasilGantiSandi).toBe('BERHASIL');

    await AkunPetugasController.logout();

    const loginSandiBaru = await AkunPetugasController.prosesLogin(TEST_EMAIL, TEST_PASSWORD_BARU);
    expect(loginSandiBaru).toBe('BERHASIL');
    expect(auth.currentUser.email).toBe(TEST_EMAIL);
  });
});