<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 9
<br>
IMPLEMENTASI PERANGKAT LUNAK
</h1>
<br>

## EcoTrack
### <p align="center">
<img alt="logo EcoTrack" src="./assets/diagram/logo-EcoTrack.PNG" width="25%">
</p>
<p align="center">

### Untuk: Agatha Tatianingseto

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | K2 |
| Kelompok | 5 |

| NIM | Nama |
|---|---|
| 13525038 | Mochammad Adhitya Nur Rohman |
| 13525068 | Kelvin Sebastian Yen |
| 13525086 | Arla Salsabila |
| 13525137 | Maharani Puan Satira |

---

> **Petunjuk pengerjaan:** *[Silahkan hapus bagian ini setelah selesai mengerjakan]*
>
> Dokumen ini adalah **spesifikasi sekaligus template laporan singkat** Tugas 9. Bagian **Ketentuan Implementasi** (Bagian A) adalah aturan yang harus kalian ikuti, boleh dihapus dari laporan akhir. Bagian **Laporan Implementasi** (Bagian B) adalah yang **wajib kalian isi**. Gunakan nama, ID, kebutuhan, use case, dan kelas yang konsisten dengan SKPL, APL, dan DPPL.

---

**Deadline:** Rabu, 11 November 2026, 21.50 WIB
**Asistensi akbar:** *[Hari, DD Bulan YYYY, HH.MM WIB, lokasi/link]*

---

# BAGIAN A: Ketentuan Implementasi

## A.1 Deskripsi Tugas

Pada tugas ini, kalian mengimplementasikan perangkat lunak yang telah dirancang pada tugas-tugas sebelumnya (SKPL, APL, DPPL) menjadi aplikasi yang **dapat dijalankan**. Platform bebas (web, desktop, atau mobile) selama aplikasi dapat dijalankan ulang oleh asisten mengikuti petunjuk kalian.

Ketentuan umum:
- Setiap anggota bertanggung jawab atas **minimal satu fitur atau modul** dan harus terlihat jelas di riwayat commit/PR.
- Implementasi harus **mengacu pada DPPL**. Jika ada yang berubah (kelas, layar, basis data, dsb.), catat di Bagian B.1. Perubahan itu wajar, tetapi harus tercatat dan beralasan.
- Implementasi **tidak harus berupa kelas** (misalnya fungsi, komponen, *route/handler*, *stored procedure*, atau skrip). Namun, setiap kelas perancangan pada DPPL **wajib dapat ditelusuri** ke implementasinya, dan penelusuran ini dicatat di Bagian B.5.
- Seluruh use case pada SKPL **diprioritaskan** untuk diimplementasikan. Status tiap use case akan dilaporkan pada HIUPL (Tugas 10).
- Seluruh mahasiswa **wajib** mengikuti asistensi akbar.

## A.2 Platform, Bahasa, dan Teknologi

Kalian **bebas** memilih bahasa, framework, library, dan basis data, dengan syarat:

1. **Dapat dijalankan ulang** oleh asisten pada mesin biasa dengan mengikuti README. Versi bahasa/runtime dan seluruh dependensi harus tertulis jelas.
2. **Dependensi dikelola lewat file standar**, misalnya `package.json` + lockfile, `requirements.txt`/`pyproject.toml`, `pom.xml`/`build.gradle`, `composer.json`, `pubspec.yaml`, dan sejenisnya. Jangan meng-commit folder hasil instalasi (`node_modules/`, `venv/`, `build/`, dll.).
3. **Jika memakai layanan eksternal** (basis data cloud, API pihak ketiga, auth, dll.), sediakan cara menjalankan tanpa akun pribadi kalian, atau sediakan data/akun uji pada README. Basis data **sangat disarankan** dapat dijalankan lokal (SQLite, atau Docker Compose untuk PostgreSQL/MySQL/MongoDB).
4. **Arsitektur sesuai DPPL.** Pola arsitektur yang kalian pilih di APL/DPPL (MVC, layered, client-server, dll.) harus terlihat pada struktur kode.

Ketentuan tambahan per platform:

| Platform | Ketentuan |
| :--- | :--- |
| **Web** | Berjalan lokal lewat satu-dua perintah yang terdokumentasi. Boleh juga di-*deploy*; jika ya, cantumkan URL, tetapi **tetap wajib bisa dijalankan lokal** (URL deploy bisa mati). |
| **Desktop** | Berjalan dari source lewat perintah yang terdokumentasi. Build/installer opsional. |
| **Mobile** | Berjalan di emulator/simulator atau perangkat. Sertakan langkah menjalankan, dan **sangat disarankan** melampirkan APK/build di Release. |

## A.3 Keamanan Repository

Repo fork kelompok bersifat **public**, sehingga:

- **Dilarang** meng-commit password, API key, token, `.env` asli, sertifikat/private key, atau data pribadi. Hal ini dapat mengurangi nilai.
- Sediakan `.env.example` berisi nama variabel tanpa nilai rahasia, dan masukkan `.env` ke `.gitignore`.
- Jika sudah terlanjur ter-commit, **cabut/ganti** kredensial tersebut. Menghapus commit saja tidak cukup.
- Data uji/seed harus berupa data fiktif.

## A.4 Struktur Folder

Seluruh kode ditempatkan di `src/` pada repo fork. Jangan mengubah folder milestone lama.

```
src/                              # SELURUH kode implementasi
	README.md                     # dokumentasi utama aplikasi (lihat A.5)
	.env.example                  # jika memakai environment variable
	<struktur kode kalian>        # bebas, mengikuti pola arsitektur DPPL
	tests/                        # test case (jika ada)
docs/
	M9/
		KXX_GYY_Implementasi.md   # laporan ini (Bagian B)
		KXX_GYY_Form-Asistensi.md
```

Catatan:
- `README.md` aplikasi diletakkan di **`src/README.md`**, bukan di root repo.
- Jika kerangka kerja kalian mewajibkan struktur tertentu (misalnya Maven `src/main/java`, Flutter `lib/`, monorepo `frontend/` dan `backend/`), letakkan semuanya **di dalam `src/`**.
- Nama file dan folder pada `docs/M9/` mengikuti aturan penamaan milestone sebelumnya (`KXX_GYY_...`).

## A.5 Isi Minimal `src/README.md`

README harus cukup bagi orang yang belum pernah melihat proyek kalian untuk menjalankan aplikasi dari nol. Minimal berisi:

1. **Deskripsi singkat** aplikasi.
2. **Teknologi yang digunakan** beserta versi (bahasa, framework, basis data).
3. **Prasyarat dan instalasi** (software yang harus ada, perintah instalasi dependensi).
4. **Konfigurasi** (environment variable, setup basis data, migrasi/seed) dan langkah demi langkah menjalankannya.
5. **Cara menjalankan aplikasi** (dan cara menjalankan test, jika ada).
6. **Akun/data uji** untuk mencoba tiap peran pengguna (jika ada login).
7. **Daftar modul/fitur yang diimplementasi** beserta pembagian anggota.
8. **Daftar tabel/koleksi basis data** beserta atributnya (atau tautan ke skema/ERD).

## A.6 Best Practices

Kalian dianjurkan menerapkan praktik berikut. Bukti penerapannya dirangkum pada Bagian B.2.

### 1. Branching
Sesuai aturan umum di README repository, `main` fork kelompok dijaga agar tetap bisa menerima sync dari asisten. Pada tugas ini **sangat disarankan** memakai branch per fitur dengan format `<tipe>/<nama-fitur>` (contoh: `feat/login-page`, `fix/null-cart`), lalu digabungkan ke `main` melalui Pull Request. Skema Gitflow penuh (dengan `develop`) boleh dipakai, tetapi tidak diwajibkan.

### 2. Semantic Commit
Gunakan format `<tipe>(<scope>): <deskripsi>`, misalnya `feat(auth): tambah validasi email`.

| Tipe | Kegunaan |
| :--- | :--- |
| `feat` | Menambahkan fitur baru |
| `fix` | Memperbaiki bug |
| `docs` | Mengubah dokumentasi |
| `style` | Perubahan format/spasi, tanpa mengubah logika |
| `refactor` | Perubahan kode yang tidak menambah fitur atau memperbaiki bug |
| `test` | Menambah/memperbaiki pengujian |
| `chore` | Tugas rutin (build, dependensi, konfigurasi) |

### 3. Track Tasks
Gunakan **GitHub Issues** (dan opsional GitHub Projects) untuk membagi tugas dan melacak progres.
- Pecah fitur besar menjadi issue yang lebih kecil dan tetapkan penanggung jawabnya.
- Hubungkan PR dengan issue (`Closes #12`) dan tutup issue ketika selesai.

### 4. Pull Request dan Code Review
- Setiap PR berisi penjelasan deskriptif tentang apa yang dikerjakan, beserta bukti (tangkapan layar/rekaman/hasil test).
- Setiap PR di-*review* minimal **1 anggota lain**, dengan komentar konstruktif atau approval.

### 5. Pengujian dan Optimasi Performa
- Tulis pengujian untuk logika inti (unit test dan/atau pengujian alur utama). Cakupan penuh tidak diwajibkan, tetapi pengujian pada logika utama dinilai.
- Lakukan **profiling** pada setidaknya satu fitur yang berat (query besar, proses pengolahan data, render list panjang, dsb.), lalu catat temuan dan perbaikannya. Contoh alat:

| Platform | Contoh alat |
| :--- | :--- |
| Web (frontend) | Chrome DevTools (Performance/Network), Lighthouse |
| Web (backend) | Profiler bawaan bahasa, `EXPLAIN` pada query basis data, logging waktu respons |
| Python | `cProfile`, `PyInstrument` |
| Java | VisualVM, JProfiler |
| Mobile | Android Studio Profiler, Flutter DevTools, Xcode Instruments |

### 6. Penggunaan AI
Penggunaan AI **tetap harus dicatat** pada `docs/KXX_GYY_AI-Usage.md` sesuai ketentuan yang sudah berlaku.

## A.7 Pengumpulan

Pengumpulan dinilai dari **tag release**, bukan commit terakhir.

1. Pastikan seluruh pekerjaan sudah di-*commit* dan di-*push* ke `main` fork kelompok.
2. Buat release dengan tag **`v9.0`** (revisi berikutnya `v9.1`, `v9.2`, dst.) dengan target branch `main`.
3. Yang dinilai adalah **tag terakhir yang dibuat sebelum deadline**.

## A.8 Aturan Tanya Jawab

Agar semua kelompok mendapat jawaban yang sama, pertanyaan dibagi menjadi dua jalur:

| Jenis Pertanyaan | Jalur |
| :--- | :--- |
| **Ketentuan tugas**, misalnya teknologi yang diperbolehkan, struktur folder, format pengumpulan, dan penilaian | **Sheets QnA:** *[tautan sheets QnA]* |
| **Kendala teknis kelompok sendiri**, misalnya error, setup, dan penggunaan git | Grup kelompok bersama asisten masing-masing |

Ketentuan:
1. Pertanyaan tentang ketentuan tugas **wajib** diajukan melalui Sheets QnA. Periksa terlebih dahulu apakah pertanyaan serupa sudah dijawab.
2. Jika pertanyaan tentang ketentuan tugas tetap diajukan langsung kepada asisten kelompok, asisten **berhak menolak menjawab** dan meminta kelompok memasukkan pertanyaannya ke Sheets QnA.
3. Jika pertanyaan di Sheets QnA **belum dijawab dalam 24 jam**, kelompok boleh menghubungi asisten kelompok masing-masing. Cantumkan pertanyaan yang sudah diajukan di sheets tersebut.
4. Jawaban pada Sheets QnA berlaku untuk **seluruh kelompok** dan menjadi acuan jika terjadi perbedaan pemahaman.

---

# BAGIAN B: Laporan Implementasi

## B.1 Perubahan dari DPPL

Tabel B.1. Perubahan dari DPPL

| No | Bagian DPPL | Rancangan Awal | Implementasi Akhir | Alasan |
| :--- | :--- | :--- | :--- | :--- |
| 1 | C08 – InformasiSampahController (`cariInformasi()`) | Mengambil data Firestore setiap pencarian. | Data diambil sekali melalui `getMain()`, kemudian pencarian dilakukan secara lokal. | Mengurangi request Firestore. |
| 2 | C09 – InformasiSampahInterface | Gambar kategori menggunakan pemetaan ID kategori secara manual. | Gambar diambil berdasarkan atribut `gambar` menggunakan `gambarSampah()`. | Mempermudah pengelolaan gambar. |
| 3 | C09 – InformasiSampahInterface | Label jenis sampah terbatas pada Anorganik dan Residu. | Mendukung Anorganik, Organik, Residu, Campuran, dan Limbah Cair. | Menyesuaikan klasifikasi data. |
| 4 | C09 – InformasiSampahInterface | Judul metode pembuangan bersifat umum. | Judul disesuaikan dengan jenis sampah, termasuk Limbah Cair. | Memperjelas informasi pengelolaan sampah. |

## B.2 Bukti Penerapan Best Practices

Tabel B.2. Bukti Best Practices

| Praktik | Bukti | Keterangan |
| :--- | :--- | :--- |
| Branching | [Daftar Branch](https://github.com/sy-150/IF2150-RPL-K02-G05/branches) | Menggunakan Modified Gitflow Workflow, dengan `main` sebagai production branch, `develop` sebagai integration branch, serta branch `feature/*`, `fix/*`, . Perubahan digabungkan ke `develop` melalui Pull Request dan code review. |
| Semantic commit | [Semantic Commits](https://github.com/sy-150/IF2150-RPL-K02-G05/commits/main/) | Menggunakan konvensi **Conventional Commits** dengan tipe seperti `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, dan `ci` untuk mengategorikan perubahan kode dan dokumentasi agar riwayat commit lebih terstruktur dan mudah dipahami. |
| Track tasks | [Issues](https://github.com/sy-150/IF2150-RPL-K02-G05/issues), [Projects](https://github.com/users/Rani-design-art/projects/3/views/1) | Jumlah issue 9 dengan pembagian: (13523038) mengerjakan [FEAT] Pemindai sampah (kamera dan barcode), (13525068) [CHORE] Setup Firebase cloud + emulator, seed, dan security rules, [FEAT] Komponen UI bersama, [FEAT] Melihat jadwal pengambilan sampah, [CHORE] Setup project Expo & struktur folder src/, dan [FEAT] Mengatur jadwal (khusus petugas),  |
| Pull request dan review | [Pull Request & Review](https://github.com/sy-150/IF2150-RPL-K02-G05/pulls) | Rani (13525137) review bagian Arla (13525086), Arla review bagian Kelvin (13525068) |
| Pengujian | [Source Code]() dan [Hasil Uji]() | Pengujian otomatis dilakukan terhadap fungsi Controller untuk memeriksa kesesuaian hasil pemrosesan data. Pengujian dijalankan menggunakan perintah npm test. Hasil pengujian didokumentasikan melalui laporan hasil test. |

### B.2.1 Profiling dan Optimasi

## B.2.1 Profiling dan Optimasi

| Informasi | Keterangan |
| :--- | :--- |
| **Fitur / proses yang diprofil** | Pemuatan daftar kategori dan pencarian informasi sampah. |
| **Alat** | Android Studio Profiler untuk mengamati penggunaan CPU dan Memory, serta pengukuran waktu proses menggunakan `console.time()` dan `console.timeEnd()`. |
| **Temuan (sebelum)** | Proses pencarian memanggil model untuk mengambil data dari Firestore setiap kali pengguna memasukkan kata kunci. Hal ini berpotensi menyebabkan pembacaan database berulang dan meningkatkan waktu respons yang bergantung pada koneksi internet. |
| **Perbaikan** | Menerapkan caching pada fungsi `getMain()` di `InformasiSampahController`. Data kategori disimpan setelah berhasil dimuat pertama kali. Selanjutnya, pencarian dilakukan secara lokal menggunakan `filter()` berdasarkan nama, ringkasan, deskripsi, dan tipe sampah. |
| **Hasil (sesudah)** | Pencarian berikutnya tidak lagi memerlukan pengambilan data dari Firestore karena menggunakan data yang tersimpan di cache. Dengan demikian, jumlah request Firestore untuk proses pencarian berkurang dan pencarian tidak lagi bergantung pada koneksi internet selama data sudah berhasil dimuat. |

## B.3 Kendala dan Catatan Penting

### B.3.1 Kendala yang dialami
| Nomor | Kendala | 
| --- | --- | 
| 1 | Banyak sekali yang harus dikerjakan. |

### B.3.2 Fitur yang belum sempurna
| Nomor | Fitur yang belum sempurna | Penjelasan |  
| --- | --- | --- |
| 1 | informasi-sampah | data barcode masih berupa data dummy dan terbatas. |
| 2 | auth | Halaman login dan signup untuk petugas masih menggunakan data dummy. |
| 3 | auth | Saat ganti email/password, halaman akan otomatis logout dan harus autentikasi ulang. |

### B.3.3 Hal yang perlu diketahui asisten

Urutan Menjalankan:

1. Buka folder `src/ecotrack` 
2. Jalankan perintah `npm install` bila belum
3. Instal Android Studio melalui situs resminya. Setelah instalasi selesai, buka Android Studio dan jalankan Android Emulator melalui Device Manager
4. Jalankan perintah `adb devices`
5. Jalnkan perintah `npx expo start` untuk memulai aplikasi
6. Setelah Metro Bundler berjalan, tekan tombol `a` pada terminal untuk membuka aplikasi di Android Emulator.

Skenario Pengujian Aplikasi:

1. Halaman utama (informasi-sampah): Memastikan aplikasi berhasil dibuka dan navigasi utama dapat digunakan lalu membuka halaman Informasi Sampah, melihat daftar kategori, mencoba pencarian berdasarkan nama material, serta membuka halaman detail informasi sampah.
2. Pemindai Sampah: Membuka fitur pemindai dan mencoba pemindaian barcode menggunakan data barcode yang telah disediakan.
3. Jadwal Pengambilan Sampah: Membuka daftar jadwal, melihat detail jadwal, dan mencoba fitur pengubahan jadwal apabila tersedia.
4. Login dan Sign Up: Mencoba halaman login dan pendaftaran menggunakan data dummy yang disediakan untuk pengujian antarmuka.

Catatan dan Batasan:

1. Pastikan Node.js, npm, Android Studio, dan Android SDK sudah terinstal pada perangkat.
2. Jika file .env belum tersedia, salin .env.example menjadi .env, kemudian isi konfigurasi Firebase Client sesuai panduan yang disediakan tim.
3. Pastikan Android Emulator sudah dijalankan melalui Android Studio sebelum menjalankan adb devices.
4. Pastikan koneksi internet tersedia karena aplikasi membutuhkan akses ke Firebase Cloud Firestore atau gunakan hotspot pribadi.

## B.4 Kontribusi Anggota

Tabel B.4. Kontribusi Anggota

| NIM | Nama | Modul / Fitur yang Dikerjakan | Persentase Kontribusi |
| :--- | :--- | :--- | :--- |
| 13525038 | Mochammad Adhitya Nur Rohman | Pemindai sampah (kamera dan barcode) | 25% |
| 13525068 | Kelvin Sebastian Yen | Log In & Sign Up petugas serta Profil, ubah profil, ubah kata sandi, dan Log Out | 25% |
| 13525086 | Arla Salsabila | Setup Firebase cloud + emulator, seed, dan security rules, Setup project Expo & struktur folder src/, Komponen UI bersama, Melihat jadwal pengambilan sampah, dan Mengatur Jadwal | 25% |
| 13525137 | Maharani Puan Satira | Informasi sampah dan cara daur ulang | 25% |
| 13525146 | Muhammad Reffah | - | 0% |

## B.5 Traceability Kelas Perancangan ke Implementasi

| ID Kelas | Nama Kelas Perancangan | Bentuk Implementasi | Lokasi (File dan Nama) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| C01 | AkunPetugas | Model | `src/ecotrack/src/model/AkunPetugas.js` | Mengelola data akun petugas serta operasi validasi dan pengelolaan akun. |
| C02 | AkunPetugasController | Controller | `src/ecotrack/src/controller/AkunPetugasController.js` | Mengimplementasikan proses login, validasi kredensial, dan pendaftaran akun petugas. |
| C03 | AkunPetugasInterface | Komponen / Halaman | `src/ecotrack/src/app/(auth)/login/index.jsx`, `src/ecotrack/src/app/(auth)/signup/index.jsx`, dan `src/ecotrack/src/app/profil/index.jsx` | Mewujudkan antarmuka login dan pendaftaran petugas melalui komponen React Native. |
| C04 | Jadwal | Model | `src/ecotrack/src/model/Jadwal.js` | Mengelola data jadwal pengambilan sampah, lokasi, tanggal, dan status penyimpanan. |
| C05 | JadwalController | Controller | `src/ecotrack/src/controller/JadwalController.js` | Mengimplementasikan pengambilan jadwal, pencarian lokasi TPS, pemeriksaan status login, dan pengubahan jadwal. |
| C06 | JadwalInterface | Komponen / Halaman | `src/ecotrack/src/app/(tabs)/jadwal/index.jsx` dan `src/ecotrack/src/app/(tabs)/[idJadwal]/index.jsx` dan `src/ecotrack/src/app/(tabs)/[idJadwal]/edit/index.jsx` | Mewujudkan antarmuka untuk melihat dan mengatur jadwal pengambilan sampah. |
| C07 | InformasiSampah | Model | `src/ecotrack/src/model/InformasiSampah.js` | Mengimplementasikan pengambilan seluruh informasi sampah, pengambilan detail, dan pencarian barcode melalui Firestore. |
| C08 | InformasiSampahController | Controller | `src/ecotrack/src/controller/InformasiSampahController.js` | Mengelola pengambilan data informasi sampah, pencarian informasi, pengelolaan cache, dan pencarian barcode. |
| C09 | InformasiSampahInterface | Komponen / Halaman | `src/ecotrack/src/app/(tabs)/informasi/index.jsx` dan `src/ecotrack/src/app/(tabs)/informasi/[idSampah]/index.jsx` | Mewujudkan halaman daftar kategori informasi sampah dan halaman detail informasi sampah. |
| C10 | PemindaiController | Controller | `src/ecotrack/src/controller/PemindaiController.js` | Mengelola proses pemindaian, pengenalan barcode, dan pengolahan hasil pemindaian. |
| C11 | PemindaiInterface | Komponen / Halaman | `src/ecotrack/src/app/(tabs)/pemindai/index.jsx` | Mewujudkan antarmuka pemindaian sampah menggunakan kamera dan barcode. |