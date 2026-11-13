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
<img alt="logo EcoTrack" src="./assets/logo-EcoTrack.PNG" width="25%">
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

# BAGIAN B: Laporan Implementasi

## B.1 Perubahan dari DPPL

Tabel B.1. Perubahan dari DPPL
| No | Bagian DPPL | Rancangan Awal | Implementasi Akhir | Alasan |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Kelas C10 PemindaiController, Algo-PC-001 (`prosesFrame`) | PemindaiController memanggil `CVModel.proses(frame)` secara langsung. Tidak ada kelas model tersendiri untuk akses CV. | Ditambahkan `sampahModel.js` yang mengirim foto ke layanan CV (Cloudflare Worker) dan menerima hasil deteksi. | Akses ke layanan CV dipisahkan dari controller sesuai pola MVC. Controller hanya mengatur alur proses. |
| 2 | Kelas C07 InformasiSampah dan C10 PemindaiController, Algo-PC-002 (`prosesBarcode`) | Data barcode diakses melalui `InformasiSampah.cariBarcode()` tanpa model khusus barcode. | Ditambahkan `barcodeModel.js` untuk mengakses data barcode produk (koleksi `barcodeProduk`) dan informasi jenis sampahnya. | Akses data barcode dipisahkan dari kelas InformasiSampah agar tanggung jawab tiap model lebih jelas. |
| 3 | Kelas C10 PemindaiController, Tabel 5.10.2 (Atribut) | Atribut hanya `isMemindai` dan `hasilIdentifikasi`. | Ditambahkan atribut untuk menyimpan kondisi dan hasil fungsi, yaitu mode pemindaian, status memuat, hasil deteksi, kotak yang dipilih, hasil barcode, kode barcode yang tidak terdaftar, dan status senter. | Antarmuka perlu mengetahui kondisi dan hasil setiap proses untuk menampilkan tampilan yang sesuai. |
| 4 | Kelas C11 PemindaiInterface | Satu kelas antarmuka untuk seluruh tampilan pemindaian. | Dipecah menjadi dua file, yaitu `KameraView.js` untuk tampilan kamera dan `FotoDeteksi.js` untuk menggambar kotak deteksi pada hasil foto. | Pembagian tanggung jawab antarkomponen lebih jelas sehingga kode lebih mudah dirawat. |
| 5 | Kelas C01 AkunPetugas, Algo-AP-003 (`encrypt`) dan Algo-APC-003 (`signUp`) | Kata sandi dienkripsi dengan SHA-256 (`crypto-js`) sebelum disimpan ke database. | Tidak menggunakan `crypto-js`. Kata sandi dikelola oleh Firebase Authentication. | Pengelolaan autentikasi dan kredensial diserahkan kepada Firebase Authentication sehingga tidak memerlukan enkripsi manual di sisi aplikasi. |
| 6 | Kelas C03 AkunPetugasInterface, Algo-API-009 (`showSignUp`), UC06 | Setelah Sign Up berhasil, petugas diarahkan ke halaman Log In dan harus masuk menggunakan akun yang baru dibuat. | Setelah Sign Up berhasil, petugas langsung diarahkan ke halaman utama. | Petugas tidak perlu mengulang proses Log In setelah mendaftar. |
| 7 | Kelas C01 AkunPetugas dan C02 AkunPetugasController, UC01 (`cekEmail`, `cekPassword`, `validasiLogin`) | Log In menggunakan fungsi validasi buatan sendiri yang mencocokkan email dan kata sandi dengan data di database. | Log In menggunakan fitur autentikasi dari SDK Firebase Authentication. | Sistem memanfaatkan fitur autentikasi yang sudah tersedia dibandingkan membuat fitur sendiri yang berpotensi menimbulkan kekeliruan. |
| 8 | Kelas C04 Jadwal, Tabel 5.4.2 (Atribut), Algo-J-001 s.d. Algo-J-005 dan `simpanJadwal` | Data diambil per atribut (`getData()`, `getDataTanggal()`, dan sebagainya). `setTanggal` menghapus lalu menulis ulang tanggal ke database dan memanggil `simpanJadwal()`. Hasil penyimpanan dicatat pada atribut `statusSimpan`. | Data diambil melalui `getSemuaJadwal()` dan `getJadwalById()`. `setTanggal` hanya mengubah daftar tanggal pada objek, sedangkan `simpanJadwal()` yang menulis ke Firestore dan melempar error jika gagal. Atribut `statusSimpan` dihapus dan `daftarTanggal` berupa list Date. | Tanggung jawab tiap operasi lebih jelas, dan kegagalan dapat ditangkap controller untuk ditampilkan kepada pengguna. |
| 9 | Kelas C05 JadwalController, Q-JC-002 | Perubahan jadwal disimpan menggunakan `updateDoc`. | Perubahan disimpan menggunakan `runTransaction`, sekaligus memperbarui `diperbaruiPada`. Data yang terbaca dari cache (saat offline) dianggap gagal dimuat. | Saat offline, `updateDoc` tidak langsung gagal, tetapi mengantre dan terkirim belakangan, sehingga aplikasi tidak bisa langsung memberi tahu bahwa penyimpanan gagal. |
| 10 | Kelas C05 JadwalController, Algo-JC-003 (`getJadwal`) dan Algo-JC-004 (`editJadwal`) | Jadwal dicari dari atribut `daftarJadwal` yang sudah diambil sebelumnya. | Satu dokumen jadwal dibaca langsung dari database. Tanggal baru dirapikan sebelum disimpan (tanpa duplikat, terurut, dan pukul 00:00 WIB). | Jadwal yang ditampilkan dan diedit selalu menggunakan data terbaru, cukup dengan membaca satu dokumen. |
| 11 | Kelas C05 JadwalController (`getJadwal`) dan C06 JadwalInterface, Algo-JI-004, Algo-JI-006, Algo-JI-007 | Tombol edit ditampilkan jika `statusLogin = true`. Jika belum login, `chooseEditJadwal` menampilkan pesan bahwa edit memerlukan login. | Tombol edit hanya ditampilkan jika petugas sudah login dan wilayah tugasnya sama dengan lokasi jadwal (`bolehEdit`). Pengguna tanpa hak tidak melihat tombol edit, dan status login hanya diperiksa di halaman detail jadwal. | Petugas hanya boleh mengubah jadwal di wilayah tugasnya. Aturan ini juga ditegakkan melalui Firestore Security Rules. |
| 12 | Kelas C05 JadwalController dan C06 JadwalInterface (penambahan) | Tampilan kalender, aturan pencarian, dan perilaku form edit tidak dirinci. | Ditambahkan fungsi bantuan kalender di controller (`susunKalender`, `toggleTanggal`, `apakahBerubah`, dan sebagainya). Kalender dibatasi pada tahun berjalan, pencarian tidak peka huruf besar/kecil, dan terdapat konfirmasi sebelum meninggalkan form edit yang belum disimpan. | Perhitungan tanggal (WIB) tetap berada di controller, dan perubahan yang belum disimpan tidak hilang tanpa sengaja. |
| 13 | Kelas C01 AkunPetugas (Algo-AP-004, Algo-AP-007, Algo-AP-010) dan Kelas C03 AkunPetugasInterface (Algo-API-011) | Atribut `wilayahTugas` dikosongkan saat Sign Up dan diisi atau diubah melalui Edit Profil. Verifikasi pendaftaran hanya mengecek data pemerintah. | Saat Sign Up (`verifikasiPetugas`), sistem juga mengecek duplikasi NIK pada koleksi `nikTerdaftar`, lalu langsung mengisi nama resmi dan `wilayahTugas` dari data pemerintah. Kolom `wilayahTugas` dikunci di halaman Edit Profil. | Mencegah satu NIK digunakan untuk mendaftar lebih dari satu akun serta menjaga nama dan wilayah tugas tetap sesuai data resmi pemerintah. |
| 14 | Kelas C01 AkunPetugas, Algo-AP-007 (`editProfil`) dan Q-AP-003 | Perubahan email langsung menimpa data email pada dokumen `akunPetugas` di database. | Perubahan email menggunakan `verifyBeforeUpdateEmail` dari Firebase Authentication. Email baru baru aktif dan disinkronkan ke Firestore setelah petugas membuka tautan verifikasi. | Memastikan alamat email baru valid dan benar-benar dimiliki petugas sebelum mengganti kredensial login. |
| 15 | Kelas C01 AkunPetugas (Algo-AP-007, Algo-AP-008), Kelas C03 AkunPetugasInterface (Algo-API-011, Algo-API-014), dan Layar I-02 | Belum ada penanganan sesi kedaluwarsa saat mengganti email atau kata sandi, serta belum ada algoritma untuk tombol "Lupa kata sandi?". | Ditambahkan dialog masuk ulang (`PERLU_LOGIN_ULANG`) jika sesi login sudah terlalu lama saat mengubah email atau kata sandi, serta fitur `sendPasswordResetEmail` pada tombol "Lupa kata sandi?". | Firebase Authentication mewajibkan sesi login yang masih baru sebelum mengubah kredensial, dan fitur reset membantu petugas memulihkan akun yang lupa kata sandi. |
| 16 | Kelas C01 AkunPetugas, Algo-AP-006 (`getProfil`) | Operasi `getProfil()` hanya mengambil data profil dari atribut lokal di memori kelas. | Operasi `getProfil()` memeriksa sesi aktif Firebase (`onAuthStateChanged`) dan membaca dokumen terbaru langsung dari Firestore. | Atribut di memori kosong saat aplikasi ditutup dan dibuka kembali, sehingga data harus dibaca dari sesi Firebase dan Firestore. |
| 17 | Kelas C03 AkunPetugasInterface, Algo-API-002, Algo-API-003 (`inputKredensial`), Algo-API-005 (`clearInput`), dan Algo-API-007 | Jika Log In gagal, sistem menampilkan pesan notifikasi umum (`showPesan`) dan mengosongkan kolom input (`clearInput`). Perpindahan halaman Log In dan Sign Up menumpuk halaman baru. | Kesalahan kredensial ditandai garis merah pada kedua kolom dan pesan error di bawah kolom kata sandi tanpa menghapus isian, pemisahan pesan gangguan koneksi, serta pengaturan stack navigasi Log In dan Sign Up. | Memudahkan petugas memperbaiki isian tanpa mengetik ulang, membedakan gangguan jaringan dari salah kata sandi, dan mencegah tombol kembali melewati halaman berulang. |
| 18 | Kelas C08 InformasiSampahController (`cariInformasi()`) | Mengambil data Firestore setiap pencarian. | Data diambil sekali melalui `getMain()`, kemudian pencarian dilakukan secara lokal. | Mengurangi request Firestore. |
| 19 | Kelas C09 InformasiSampahInterface | Gambar kategori menggunakan pemetaan ID kategori secara manual. | Gambar diambil berdasarkan atribut `gambar` menggunakan `gambarSampah()`. | Mempermudah pengelolaan gambar. |
| 20 | Kelas C09 InformasiSampahInterface | Label jenis sampah terbatas pada Anorganik dan Residu. | Mendukung Anorganik, Organik, Residu, Campuran, dan Limbah Cair. | Menyesuaikan klasifikasi data. |
| 21 | Kelas C09 InformasiSampahInterface | Judul metode pembuangan bersifat umum. | Judul disesuaikan dengan jenis sampah, termasuk Limbah Cair. | Memperjelas informasi pengelolaan sampah. |

## B.2 Bukti Penerapan Best Practices

Tabel B.2. Bukti Best Practices

| Praktik | Bukti | Keterangan |
| :--- | :--- | :--- |
| Branching | [Daftar Branch](https://github.com/sy-150/IF2150-RPL-K02-G05/branches) | Menggunakan Modified Gitflow Workflow, dengan `main` sebagai production branch, `develop` sebagai integration branch, serta branch `feature/*`, `fix/*`, . Perubahan digabungkan ke `develop` melalui Pull Request dan code review. |
| Semantic commit | [Semantic Commits](https://github.com/sy-150/IF2150-RPL-K02-G05/commits/main/) | Menggunakan konvensi **Conventional Commits** dengan tipe seperti `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, dan `ci` untuk mengategorikan perubahan kode dan dokumentasi agar riwayat commit lebih terstruktur dan mudah dipahami. |
| Track tasks | [Issues](https://github.com/sy-150/IF2150-RPL-K02-G05/issues), [Projects](https://github.com/users/Rani-design-art/projects/3/views/1) | Jumlah issue 9 dengan pembagian: (13523038) mengerjakan [FEAT] Pemindai sampah (kamera dan barcode), (13525068) [CHORE] Setup Firebase cloud + emulator, seed, dan security rules, [FEAT] Komponen UI bersama, [FEAT] Melihat jadwal pengambilan sampah, [CHORE] Setup project Expo & struktur folder src/, dan [FEAT] Mengatur jadwal (khusus petugas),  |
| Pull request dan review | [Pull Request & Review](https://github.com/sy-150/IF2150-RPL-K02-G05/pulls) | Rani (13525137) review bagian Arla (13525086), Arla review bagian Kelvin (13525068) |
| Pengujian | [Source Code](https://github.com/sy-150/IF2150-RPL-K02-G05/tree/tests/src/tests) dan [Hasil Uji](https://drive.google.com/drive/folders/1K1TIDUfPYCG6huXDXTIInf4nblEk3RJk) | Pengujian otomatis dilakukan terhadap fungsi Controller untuk memeriksa kesesuaian hasil pemrosesan data. Pengujian dijalankan menggunakan perintah npm test. Hasil pengujian didokumentasikan melalui laporan hasil test. |

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
| 1 | informasi-sampah | Data barcode masih berupa data dummy dan terbatas. |
| 2 | auth | Halaman login dan signup untuk petugas masih menggunakan data dummy. |
| 3 | auth | Saat mengganti email, sistem akan otomatis melakukan logout sehingga petugas harus melakukan autentikasi ulang. |
| 4 | auth | Penggantian password harus dilakukan segera setelah login. Jika sesi login sudah berlangsung terlalu lama, petugas harus login kembali sebelum mengganti password. |
| 5 | pemindai | Jika data produk belum tersedia, pengguna belum dapat menambahkan atau melaporkan data barcode yang belum dikenali. |


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