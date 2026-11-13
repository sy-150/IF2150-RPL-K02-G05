# EcoTrack

Aplikasi mobile (Android dan iOS) untuk membantu warga Kota Bandung mendaur ulang sampah dan mengetahui jadwal pengambilan sampah di setiap kelurahan.

- **Masyarakat umum (tanpa login)** dapat melihat informasi cara membuang, mengkreasikan, dan memakai ulang tiap jenis sampah, serta melihat jadwal pengambilan sampah di lokasi TPS kelurahannya.
- **Petugas kebersihan (login)** dapat mengubah jadwal pengambilan sampah untuk kelurahan yang menjadi wilayah tugasnya, serta mengelola akunnya (profil, kata sandi, keluar akun).

Kelompok K02-G05 "Join yang mau", IF2150 Rekayasa Perangkat Lunak.

---

## Daftar isi

1. [Teknologi](#1-teknologi)
2. [Prasyarat](#2-prasyarat)
3. [Instalasi](#3-instalasi)
4. [Konfigurasi dan basis data](#4-konfigurasi-dan-basis-data)
5. [Menjalankan aplikasi dan test](#5-menjalankan-aplikasi-dan-test)
6. [Akun dan data uji](#6-akun-dan-data-uji)
7. [Fitur dan pembagian anggota](#7-fitur-dan-pembagian-anggota)
8. [Koleksi basis data](#8-koleksi-basis-data)
9. [Struktur folder](#9-struktur-folder)
10. [Kendala umum](#10-kendala-umum)

---

## 1. Teknologi

| Bagian | Teknologi | Versi |
| --- | --- | --- |
| Runtime | Node.js | 22.13+ atau 24.3+ (diuji dengan 24.14.1) |
| Framework | Expo SDK | 58 (`expo` ~58.0.23) |
| UI | React Native / React | 0.88.1 / 19.3.0 |
| Navigasi | Expo Router | ~58.0.30 |
| Bahasa | JavaScript (JSX) | ES2022 |
| Basis data | Cloud Firestore | Firebase JS SDK ^13.2.0 |
| Autentikasi | Firebase Authentication (email + kata sandi) | Firebase JS SDK ^13.2.0 |
| Basis data lokal | Firebase Emulator Suite | firebase-tools ^14.0.0 |
| Seed data | firebase-admin | ^13.0.0 |
| Test | Jest + jest-expo | ~30.5.2 / ~58.0.14 |

Arsitektur mengikuti **MVC** pada DPPL: halaman (`src/app`) memanggil controller (`src/controller`), controller memanggil model (`src/model`), dan hanya model yang mengakses Firestore/Firebase Authentication.

## 2. Prasyarat

| Software | Kegunaan |
| --- | --- |
| [Node.js](https://nodejs.org) 22.13+ atau 24.3+ beserta npm | Menjalankan aplikasi, test, emulator, dan seed |
| [Java JDK 21](https://adoptium.net) | Wajib untuk Firebase Emulator (basis data lokal) |
| Aplikasi **Expo Go** versi untuk **SDK 58** di HP Android/iOS, **atau** Android Emulator (Android Studio) / iOS Simulator (Xcode) | Membuka aplikasi |
| Git | Mengambil source code |

HP dan laptop harus berada di **jaringan Wi-Fi yang sama** jika memakai Expo Go di HP.

## 3. Instalasi

Dari root repository:

```bash
# Aplikasi mobile
cd src/ecotrack
npm install

# Basis data (emulator + skrip seed)
cd ../firebase
npm install
```

## 4. Konfigurasi dan basis data

Aplikasi dapat memakai dua sumber data. **Untuk menjalankan dari source code, gunakan emulator lokal (Opsi A)**: tidak butuh akun, API key, atau koneksi ke Firebase cloud.

| Opsi | Kapan dipakai | Kebutuhan |
| --- | --- | --- |
| **A. Emulator lokal** | Asisten / siapa pun yang menjalankan dari source code | Java JDK 21 |
| B. Firebase cloud | Tim saat pengembangan dan build APK | Konfigurasi web app Firebase dari tim (tidak ada di repo) |

### Opsi A: Emulator lokal (disarankan)

1. **Nyalakan emulator** (terminal 1, biarkan tetap berjalan):

   ```bash
   cd src/firebase
   npm run emulator
   ```

   Emulator siap saat muncul tulisan *All emulators ready*. Firestore berjalan di port `8080`, Authentication di `9099`, dan tampilan Emulator UI di http://localhost:4000. Security rules (`firestore.rules`) otomatis dipakai.

2. **Isi data awal** (terminal 2, setelah emulator siap):

   ```bash
   cd src/firebase
   npm run seed
   ```

   Perintah ini mengisi semua koleksi dari `src/firebase/data/*.json` dan membuat akun uji di Authentication. Data emulator **hilang setiap emulator dimatikan**, jadi jalankan `npm run seed` lagi setiap emulator dinyalakan ulang.

3. **Buat file `.env`** di `src/ecotrack` dengan menyalin `.env.example`:

   ```bash
   cd src/ecotrack
   cp .env.example .env
   ```

   Lalu isi dua variabel berikut:

   ```env
   EXPO_PUBLIC_USE_EMULATOR=true
   EXPO_PUBLIC_EMULATOR_HOST=<IP laptop>
   ```

   | Membuka aplikasi dari | Nilai `EXPO_PUBLIC_EMULATOR_HOST` |
   | --- | --- |
   | HP dengan Expo Go | IP laptop di jaringan Wi-Fi, misalnya `192.168.1.5` (Windows: `ipconfig`, macOS/Linux: `ifconfig`) |
   | Android Emulator | `10.0.2.2` |
   | iOS Simulator | `127.0.0.1` |

   Variabel lain di `.env` boleh dibiarkan kosong saat memakai emulator.

### Opsi B: Firebase cloud

Isi `.env` dengan `EXPO_PUBLIC_USE_EMULATOR=false` dan konfigurasi web app Firebase (`EXPO_PUBLIC_FIREBASE_API_KEY`, `..._AUTH_DOMAIN`, `..._PROJECT_ID`, `..._APP_ID`). Nilainya dibagikan di dalam tim dan **tidak disimpan di repository**. Cara menyiapkan project cloud, mengirim data awal (`npm run seed:cloud`), dan memasang security rules dijelaskan di [`src/firebase/README.md`](firebase/README.md).

> Setiap kali `.env` diubah, jalankan ulang Expo dengan `npx expo start -c` supaya nilai barunya terbaca.

## 5. Menjalankan aplikasi dan test

### Menjalankan aplikasi

Pastikan emulator sudah menyala dan sudah di-seed (bagian 4), lalu di terminal 3:

```bash
cd src/ecotrack
npx expo start -c
```

Kemudian:

- **HP:** buka Expo Go, lalu pindai QR code yang muncul di terminal (iOS: lewat aplikasi Kamera).
- **Android Emulator:** tekan `a` di terminal.
- **iOS Simulator (macOS):** tekan `i` di terminal.

Aplikasi terbuka di halaman **Daur Ulang** (Informasi Sampah). Halaman lain dapat dibuka lewat navbar di bawah dan ikon profil di kanan atas.

### Menjalankan test

Unit test menguji logika Controller. Model (akses Firebase) diganti tiruan (*mock*), jadi test tidak butuh emulator maupun internet:

```bash
cd src/ecotrack
npm test
```

File test berada di branch `tests` `src/ecotrack/src/tests/`:

| File | Yang diuji |
| --- | --- |
| `JadwalController.test.js` | Urutan dan pencarian lokasi TPS, detail jadwal, hak edit petugas, penyimpanan jadwal, dan perhitungan kalender WIB |
| `AkunPetugasController.test.js` | Sign Up, Log In, lupa kata sandi, Log Out, ambil dan ubah profil, serta ubah kata sandi, termasuk pesan kesalahannya |
| `InformasiSampahController.test.js` | Pengecekan dasar bahwa Controller dapat diuji |

Untuk menjalankan satu file saja, misalnya `npm test -- JadwalController`.

## 6. Akun dan data uji

Semua data uji **fiktif**. NIK memakai awalan `9999` supaya tidak sama dengan NIK orang sungguhan.

### Peran pengguna

| Peran | Cara mencoba |
| --- | --- |
| Masyarakat umum | Tanpa login: buka tab **Daur Ulang** dan **Jadwal** |
| Petugas kebersihan | Login lewat ikon profil di kanan atas dengan akun di bawah, lalu buka **Jadwal → Lebak Siliwangi** (tombol **EDIT JADWAL** muncul) dan halaman profil |

### Akun petugas (Log In)

| Email | Kata sandi | Nama | Wilayah tugas |
| --- | --- | --- | --- |
| `petugas@ecotrack.test` | `Petugas123!` | Budi Santoso | Lebak Siliwangi (`lebak-siliwangi`) |

Petugas hanya dapat mengedit jadwal kelurahan wilayah tugasnya. Jadwal kelurahan lain (misalnya Pasteur) tidak menampilkan tombol edit.

### Sign Up (NIK yang terdaftar di data pemerintah tiruan)

| NIK | Nama lengkap | Wilayah tugas | Keterangan |
| --- | --- | --- | --- |
| `9999014505920001` | Siti Rahmawati | Pasteur | Bisa dipakai Sign Up |
| `9999022003880002` | Andi Pratama | Sukarasa | Bisa dipakai Sign Up |
| `9999036107950004` | Dewi Lestari | Tamansari | Bisa dipakai Sign Up |
| `9999041509870005` | Rudi Hartono | Kopo | Bisa dipakai Sign Up |
| `9999054402990006` | Nur Aisyah | Hegarmanah | Bisa dipakai Sign Up |
| `9999011201900003` | Budi Santoso | Lebak Siliwangi | Sudah dipakai akun uji → "NIK ini sudah mendaftarkan akun" |

Contoh kasus gagal: NIK `1234567890123456` → "NIK tidak terdaftar sebagai petugas kebersihan"; NIK `9999022003880002` dengan nama selain *Andi Pratama* → "Nama lengkap tidak sesuai dengan data NIK".

Setiap NIK hanya dapat dipakai untuk satu akun. Di emulator, semua NIK kembali bisa dipakai setelah emulator dinyalakan ulang dan di-seed.

### Fitur yang mengirim email

**Lupa kata sandi** dan **ganti email** di profil mengirim email berisi tautan. Saat memakai emulator, email tidak benar-benar dikirim: tautannya ditampilkan di **terminal emulator** (terminal 1), misalnya `To reset the password for ..., follow this link: ...`. Buka tautan itu di browser laptop. Untuk reset kata sandi, ganti `NEW_PASSWORD_HERE` di ujung tautan dengan kata sandi baru. Akun `@ecotrack.test` tidak dapat menerima email sungguhan di Firebase cloud.

### Data lain

| Data | Isi |
| --- | --- |
| Informasi sampah | 10 material: Plastik, Kaca, Logam, Kertas & Karton, Organik, Elektronik, Lainnya, Keramik & Porselen, Tekstil & Kain, Minyak Jelantah |
| Jadwal | 151 kelurahan di 30 kecamatan Kota Bandung (1 kelurahan = 1 lokasi TPS), tanggal contoh Januari 2026 – Februari 2027 |
| Barcode uji (untuk fitur Pemindai) | `2000000000015` → Plastik / Botol Plastik, `2000000000022` → Plastik / Kantong Plastik, `2000000000039` → Kaca / Botol Kaca, `2000000000046` → Logam / Kaleng Aluminium, `2000000000053` → Logam / Stainless Steel, `2000000000060` → Lainnya / Sampah Tidak Teridentifikasi,  |

## 7. Fitur dan pembagian anggota

| NIM | Nama |
| --- | --- |
| 13525038 | Mochammad Adhitya Nur Rohman |
| 13525068 | Kelvin Sebastian Yen |
| 13525086 | Arla Salsabila |
| 13525137 | Maharani Puan Satira |
| 13525146 | Muhammad Reffah |

| Use case | Fitur | Halaman | Status | Penanggung jawab |
| --- | --- | --- | --- | --- |
| UC01, UC06 | Log In, Sign Up, lupa kata sandi | `(auth)/login`, `(auth)/signup` | Selesai | Kelvin Sebastian Yen |
| UC07, UC08, UC09 | Profil, ubah profil, ubah kata sandi, keluar akun | `profil` | Selesai | Kelvin Sebastian Yen |
| UC04 | Melihat jadwal pengambilan sampah | `(tabs)/jadwal`, `(tabs)/jadwal/[idJadwal]` | Selesai | Arla Salsabila |
| UC03 | Mengatur jadwal (khusus petugas) | `(tabs)/jadwal/[idJadwal]/edit` | Selesai | Arla Salsabila |
| UC05 | Mengakses informasi sampah | `(tabs)/informasi`, `(tabs)/informasi/[idSampah]` | Selesai | Maharani Puan Satira |
| UC02 | Memindai sampah | `(tabs)/pemindai` | Belum selesai | Mochammad Adhitya Nur Rohman |

## 8. Koleksi basis data

Firestore tidak memakai tabel; data disimpan sebagai **koleksi** berisi **dokumen**. Data awal ditulis di `src/firebase/data/*.json` dan dikirim dengan skrip seed. Aturan akses ada di `src/firebase/firestore.rules`.

| Koleksi | ID dokumen | Field | Akses (ringkas) |
| --- | --- | --- | --- |
| `informasiSampah` | slug material, misalnya `plastik` | `nama`, `jenisSampah` (`anorganik`/`organik`/`campuran`/`limbah-cair`), `ringkasan`, `gambar`, `deskripsi`, `labelModel` (array), `daftarIdTipe` (dihitung seed), `tipe` (array: `idTipe`, `nama`, `dibuang`, `kreasi`, `gunakan`; masing-masing berisi `gambar`, `langkah` [{`judul`, `keterangan`}], dan untuk kreasi/gunakan `contohHasil` [{`nama`, `gambar`}]) | Baca: semua orang. Tulis: hanya seed |
| `jadwal` | slug kelurahan, misalnya `lebak-siliwangi` | `kecamatan`, `kelurahan`, `daftarTanggal` (array timestamp pukul 00:00 WIB), `diperbaruiPada` | Baca: semua orang. Ubah `daftarTanggal`/`diperbaruiPada`: hanya petugas yang wilayah tugasnya sama |
| `akunPetugas` | `uid` Firebase Authentication | `username`, `nik`, `email`, `noTelepon`, `wilayahTugas` (= ID dokumen `jadwal`), `dibuatPada`. **Tanpa kata sandi**; kata sandi dikelola Firebase Authentication | Baca/ubah: hanya pemilik akun, dan yang dapat diubah hanya `email` dan `noTelepon` |
| `dataPemerintah` | NIK (16 digit) | `namaLengkap`, `wilayahTugas`. Tiruan data pemerintah untuk verifikasi Sign Up | Baca satu dokumen tanpa login. Tulis: hanya seed |
| `nikTerdaftar` | NIK (16 digit) | `uid`, `dibuatPada`. Penanda NIK yang sudah punya akun (satu NIK satu akun) | Dibuat bersamaan dengan profil saat Sign Up, tidak dapat diubah/dihapus |
| `barcodeProduk` | kode barcode (8–14 digit) | `namaProduk`, `idSampah`, `idTipe`, `sumber` (`seed`/`pengguna`), `diperbaruiPada` | Baca satu kode. Tambah/ubah tanpa login dengan isi yang divalidasi |

Penjelasan lebih lengkap (cara menambah data, menyalin data cloud, dan mengubah rules) ada di [`src/firebase/README.md`](firebase/README.md).

## 9. Struktur folder

```
src/
├── README.md                 # dokumen ini
├── ecotrack/                 # aplikasi Expo (React Native)
│   ├── .env.example          # daftar environment variable (tanpa nilai rahasia)
│   ├── assets/images/        # logo, ilustrasi, dan gambar informasi sampah
│   ├── package.json
│   └── src/
│       ├── app/              # halaman (Expo Router) = Interface pada DPPL
│       ├── controller/       # AkunPetugasController, InformasiSampahController, JadwalController
│       ├── model/            # AkunPetugas, InformasiSampah, Jadwal (satu-satunya akses ke Firebase)
│       ├── database/         # inisialisasi Firebase (emulator atau cloud)
│       ├── ui/               # tema, komponen bersama, dan komponen per fitur
│       ├── utils/            # validasi input, pemetaan gambar, penjaga navigasi
│       └── tests/            # unit test Controller (Jest)
└── firebase/                 # basis data sebagai kode
    ├── data/*.json           # data awal semua koleksi
    ├── seed.js               # mengisi emulator/cloud dari data/*.json
    ├── firestore.rules       # security rules
    └── firebase.json         # konfigurasi emulator
```

## 10. Kendala umum

| Gejala | Penyebab dan solusi |
| --- | --- |
| Data tidak muncul, muncul "Gagal memuat ...", atau login selalu gagal saat memakai emulator | Emulator belum menyala, belum di-seed, atau `EXPO_PUBLIC_EMULATOR_HOST` salah. Cek bagian 4, lalu jalankan ulang `npx expo start -c` |
| HP tidak bisa terhubung ke emulator | HP dan laptop harus di Wi-Fi yang sama, dan firewall laptop harus mengizinkan port `8080` dan `9099` |
| Muncul error `EXPO_PUBLIC_EMULATOR_HOST belum diisi` | Isi variabel tersebut di `.env` (bagian 4) |
| Expo Go menolak membuka proyek karena versi SDK | Pasang Expo Go versi untuk SDK 58 |
| Terminal menampilkan `Unable to deserialize cloned data` | Cache Metro rusak. Aplikasi tetap berjalan; jalankan `npx expo start -c` untuk membersihkannya |
| Gambar informasi sampah tidak muncul saat internet HP dimatikan | Di Expo Go, gambar diunduh dari laptop. Pada build APK gambar sudah ada di dalam aplikasi |
| `npm run emulator` gagal | Pastikan Java JDK 21 terpasang dan port `8080`, `9099`, `4000` tidak dipakai program lain |

Batasan aplikasi yang sudah diketahui (known issues) dicatat di laporan implementasi, bagian B.3.
