<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 10
<br>
HASIL IMPLEMENTASI DAN UJI PERANGKAT LUNAK (HIUPL)
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
| 13525146 | Muhammad Reffah |
---

## Daftar Isi

- [BAB 1: Pendahuluan](#bab-1-pendahuluan)
  - [1.1 Tujuan Penulisan Dokumen](#11-tujuan-penulisan-dokumen)
  - [1.2 Lingkup Masalah](#12-lingkup-masalah)
  - [1.3 Definisi, Istilah, dan Singkatan](#13-definisi-istilah-dan-singkatan)
  - [1.4 Aturan Penomoran](#14-aturan-penomoran)
  - [1.5 Referensi](#15-referensi)
  - [1.6 Deskripsi Umum Dokumen (Ikhtisar)](#16-deskripsi-umum-dokumen-ikhtisar)
- [BAB 2: Deskripsi Umum Perangkat Lunak](#bab-2-deskripsi-umum-perangkat-lunak)
- [BAB 3: Implementasi](#bab-3-implementasi)
  - [3.1 Lingkungan Implementasi](#31-lingkungan-implementasi)
  - [3.2 Implementasi Modul](#32-implementasi-modul)
  - [3.3 Implementasi Antarmuka](#33-implementasi-antarmuka)
  - [3.4 File Lain](#34-file-lain)
- [BAB 4: Hasil Pengujian](#bab-4-hasil-pengujian)
  - [4.1 Strategi dan Kedalaman Pengujian Kelas](#41-strategi-dan-kedalaman-pengujian-kelas)
  - [4.2 Pengujian Unit Kelas](#42-pengujian-unit-kelas)
  - [4.3 Pengujian Integrasi](#43-pengujian-integrasi)
  - [4.4 Pengujian Use Case](#44-pengujian-use-case)
  - [4.5 Pengujian Kebutuhan Non-Fungsional (KNF)](#45-pengujian-kebutuhan-non-fungsional-knf)
  - [4.6 Tangkapan Layar dan Bukti Hasil Pengujian](#46-tangkapan-layar-dan-bukti-hasil-pengujian)
- [BAB 5: Traceability](#bab-5-traceability)

---

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Menambahkan fitur memindai barcode dan komponen-komponennya* |
| *B* |  |
| *C* |  |
| ... |  |

---

# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Dokumen HIUPL ditulis dengan tujuan menciptakan suatu dokumen penghubung antara pengembang dan pengguna perangkat lunak. Tidak dapat dipungkiri bahwa dalam pengembangan perangkat lunak, terdapat banyak masalah yang menghambat proses pengembangan, termasuk tapi tidak terbatas pada konflik kepentingan, tuntutan kontrak, dan pemahaman yang berbeda. Aplikasi EcoTrack sendiri tidak terlepas dari masalah ini, mengingat kompleksitas sistem yang dirancang dan akan dibangun. Oleh karena itu, diharapkan bahwa penulisan dokumen ini akan menghilangkan ambiguitas, mencegah miskomunikasi, dan menghasilkan perangkat lunak yang sesuai kebutuhan dan mudah dirawat.

Pengguna dokumen ini mencakup sejumlah pihak yang terlibat dalam proses pengembangan perangkat lunak. Pertama, dokumen ini akan digunakan oleh pengembang awal dan pengembang yang akan datang sebagai acuan kesesuaian spesifikasi dalam pengembangan dan perawatan lanjut. Kedua, dokumen ini menjadi standar untuk memverifikasi kesesuaian fungsionalitas perangkat lunak bagi penguji/evaluator. Ketiga, klien yang merupakan pemangku kepentingan dapat mengacu pada dokumen ini untuk memastikan kebutuhannya telah dipahami dan diimplementasikan dengan benar.

## 1.2 Lingkup Masalah
EcoTrack adalah sebuah sistem aplikasi perangkat lunak berbasis mobile yang dirancang untuk mengatasi isu tentang sampah. Aplikasi ini digunakan untuk mengidentifikasi jenis sampah secara praktis, penyedia panduan daur ulang serta sebagai penghubung antara masyarakat dengan petugas kebersihan.

## 1.3 Definisi, Istilah, dan Singkatan

Tabel 1.3. Definisi, Istilah, dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| P/L | Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu. |
| SKPL | Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan dalam membangun aplikasi agar dapat menjalankan tugasnya. |
| DPPL | Singkatan dari Deskripsi Perancangan Perangkat Lunak, yaitu dokumen yang berisi rancangan arsitektur, kelas, algoritma, dan antarmuka P/L yang menjadi acuan implementasi. |
| HIUPL | Singkatan dari Hasil Implementasi dan Uji Perangkat Lunak, yaitu dokumen ini, yang melaporkan elemen P/L yang telah diimplementasikan beserta hasil pengujiannya. |
| KF | Singkatan dari Kebutuhan Fungsional. |
| KNF | Singkatan dari Kebutuhan Non-Fungsional. |
| UC | Singkatan dari Use Case. |
| OS | Singkatan dari Operating System. |
| DBMS | Singkatan dari Database Management System. |
| UML | Singkatan dari Unified Modeling Language, yaitu bahasa notasi grafis untuk memodelkan sistem perangkat lunak. |
| MVC | Singkatan dari Model-View-Controller, yaitu pola arsitektur yang memisahkan data (Model), tampilan (View/Interface), dan logika pemrosesan (Controller). |
| TPS | Singkatan dari Tempat Penampungan Sementara untuk sampah. |
| WIB | Singkatan dari Waktu Indonesia Barat (UTC+7), yaitu zona waktu acuan seluruh tanggal jadwal pengambilan sampah. |
| API | Singkatan dari Application Programming Interface, yaitu mekanisme yang memungkinkan perangkat lunak berkomunikasi dengan perangkat lunak lainnya untuk bertukar data. |
| Computer Vision | Bidang dari kecerdasan buatan yang memungkinkan komputer memproses dan menganalisis gambar atau video agar dapat menghasilkan suatu informasi yang dapat digunakan untuk pengambilan keputusan. |
| Database | Kumpulan data yang disimpan secara terstruktur dalam sistem komputer. |
| Barcode | Representasi data dalam pola garis-garis vertikal dengan ketebalan dan jarak yang berbeda-beda yang dapat dipindai untuk mengidentifikasi suatu produk. |
| Query | Perintah yang dikirimkan ke database untuk mengambil, menambah, mengubah, atau menghapus data. |
| Dummy Data | Data tiruan yang digunakan untuk menguji sistem perangkat lunak. |
| Server | Sistem yang digunakan untuk memberikan layanan kepada komputer lain dalam satu jaringan. |
| Client | Sistem yang digunakan untuk mengakses layanan server. |
| Expo / React Native | *Framework* JavaScript untuk membangun aplikasi *mobile* Android dan iOS dari satu basis kode. Expo Go adalah aplikasi untuk menjalankan proyek Expo langsung di HP selama pengembangan. |
| Cloud Firestore | DBMS NoSQL milik Firebase yang menyimpan data dalam bentuk koleksi dan dokumen. |
| Firebase Authentication | Layanan Firebase untuk autentikasi pengguna (email dan kata sandi) yang mengelola kredensial petugas. |
| Security Rules | Aturan akses pada Cloud Firestore yang menentukan siapa yang boleh membaca atau mengubah suatu dokumen. |
| Firebase Emulator Suite | Emulator lokal Cloud Firestore dan Firebase Authentication yang dipakai untuk menjalankan aplikasi dan pengujian integrasi tanpa mengakses Firebase *cloud*. |
| Seed | Proses dan skrip pengisian data awal (data uji) ke basis data. |
| Jest | *Framework* pengujian JavaScript yang dipakai untuk menjalankan *unit test*, *integration test*, dan mengukur *coverage*. |
| Unit Test | Pengujian terhadap satu kelas atau operasi secara terisolasi; dependensi luar diganti tiruan (*mock*). |
| Integration Test | Pengujian interaksi antarkomponen yang melewati batas (Controller - Model, aplikasi - basis data, aplikasi - sistem eksternal) menggunakan komponen nyata. |
| Mock | Objek tiruan yang menggantikan dependensi asli (misalnya Firestore) agar suatu unit dapat diuji secara terisolasi. |
| Coverage | Persentase baris (*line*) dan cabang (*branch*) kode yang dieksekusi oleh pengujian. |
| Test Case | Satu skenario pengujian yang terdiri dari prosedur, masukan, hasil yang diharapkan, hasil aktual, dan kesimpulan. |
| Pass / Fail | Kesimpulan test case. *Pass* berarti hasil aktual sesuai dengan hasil yang diharapkan; *Fail* berarti tidak sesuai. |
| Traceability | Keterlacakan hubungan antara kebutuhan (KF/KNF), use case, kelas, file implementasi, dan test case. |

## 1.4 Aturan Penomoran

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| Kebutuhan Fungsional | KFXX | ID kebutuhan fungsional sesuai SKPL dengan 2 digit angka, dimulai dari KF01. |
| Kebutuhan Non-Fungsional | KNFXX | ID kebutuhan non-fungsional sesuai SKPL dengan 2 digit angka, dimulai dari KNF01. |
| Use Case | UCXX | ID use case sesuai SKPL dengan 2 digit angka, dimulai dari UC01. |
| Kelas | CXX | ID kelas sesuai DPPL dengan 2 digit angka, dimulai dari C01. |
| Antarmuka (Layar) | I-XX | ID layar sesuai DPPL dengan 2 digit angka, dimulai dari I-01. |
| Algoritma Kelas AkunPetugas | Algo-AP-XXX | ID algoritma kelas AkunPetugas sesuai DPPL dengan 3 digit angka, dimulai dari Algo-AP-001. |
| Algoritma Kelas AkunPetugasController | Algo-APC-XXX | ID algoritma kelas AkunPetugasController sesuai DPPL dengan 3 digit angka, dimulai dari Algo-APC-001. |
| Algoritma Kelas AkunPetugasInterface | Algo-API-XXX | ID algoritma kelas AkunPetugasInterface sesuai DPPL dengan 3 digit angka, dimulai dari Algo-API-001. |
| Algoritma Kelas Jadwal | Algo-J-XXX | ID algoritma kelas Jadwal sesuai DPPL dengan 3 digit angka, dimulai dari Algo-J-001. |
| Algoritma Kelas JadwalController | Algo-JC-XXX | ID algoritma kelas JadwalController sesuai DPPL dengan 3 digit angka, dimulai dari Algo-JC-001. |
| Algoritma Kelas JadwalInterface | Algo-JI-XXX | ID algoritma kelas JadwalInterface sesuai DPPL dengan 3 digit angka, dimulai dari Algo-JI-001. |
| Algoritma Kelas InformasiSampah | Algo-IS-XXX | ID algoritma kelas InformasiSampah sesuai DPPL dengan 3 digit angka, dimulai dari Algo-IS-001. |
| Algoritma Kelas InformasiSampahController | Algo-ISC-XXX | ID algoritma kelas InformasiSampahController sesuai DPPL dengan 3 digit angka, dimulai dari Algo-ISC-001. |
| Algoritma Kelas InformasiSampahInterface | Algo-ISI-XXX | ID algoritma kelas InformasiSampahInterface sesuai DPPL dengan 3 digit angka, dimulai dari Algo-ISI-001. |
| Algoritma Kelas PemindaiController | Algo-PC-XXX | ID algoritma kelas PemindaiController sesuai DPPL dengan 3 digit angka, dimulai dari Algo-PC-001. |
| Algoritma Kelas PemindaiInterface | Algo-PI-XXX | ID algoritma kelas PemindaiInterface sesuai DPPL dengan 3 digit angka, dimulai dari Algo-PI-001. |
| Pengujian Unit Kelas | CXX-UTYY | ID test case unit untuk kelas CXX dengan 2 digit nomor urut YY, dimulai dari CXX-UT01 (contoh: C04-UT01). |
| Pengujian Integrasi | INT-IXX-TCYY | ID test case integrasi untuk antarmuka I-XX dengan 2 digit nomor urut YY, dimulai dari INT-IXX-TC01 (contoh: INT-I09-TC01). |
| Pengujian Use Case | UCXX-TCYY | ID test case use case UCXX dengan 2 digit nomor urut YY, dimulai dari UCXX-TC01 (contoh: UC03-TC01). |
| Pengujian KNF | KNFXX-TCYY | ID test case kebutuhan non-fungsional KNFXX dengan 2 digit nomor urut YY, dimulai dari KNFXX-TC01 (contoh: KNF05-TC01). |
| Tabel | Tabel X.Y | Nomor tabel mengikuti nomor subbab tempat tabel berada. |
| Gambar | Gambar X.Y | Nomor gambar mengikuti nomor bab tempat gambar berada. |

## 1.5 Referensi
- 11,3 Juta Ton Sampah di Indonesia Tidak Terkelola dengan Baik, brin.go.id, 26 Juli 2024, https://brin.go.id/drid/posts/kabar/113-juta-ton-sampah-di-indonesia-tidak-terkelola-dengan-baik. Accessed 30 Agustus 2026.
- Dampak Sampah yang Tidak Dikelola dengan Baik, paxel.co, 8 Juni 2025, https://paxel.co/id/berita-dan-promo/dampak-sampah-yang-tidak-dikelola-dengan-baik. Accessed 30 Agustus 2026.
- Apa yang terjadi jika target SDGs gagal tercapai pada tahun 2030?, jejakin.com, https://www.jejakin.com/id/blog/if-sdgs-fail-by-2030. Accessed 30 Agustus 2026.
- Pengelolaan Sampah Jadi Prioritas, Pemerintah Siapkan Strategi Komprehensif, Kementerian Sekretariat Negara Republik Indonesia, 12 Maret 2025, https://setneg.go.id/baca/index/pengelolaan_sampah_jadi_prioritas_pemerintah_siapkan_strategi_komprehensif. Accessed 30 Agustus 2026.
- 8 Manfaat Daur Ulang Sampah dan Cara Membiasakannya, BANK MEGA Syariah, 9 Desember 2024, https://www.megasyariah.co.id/id/artikel/edukasi-tips/lainnya/manfaat-daur-ulang. Accessed 30 Agustus 2026.
- Pristiandaru, Danur Lumbang. Mengenal Tujuan 15 SDGs: Ekosistem Daratan Sumber: https://lestari.kompas.com/read/2023/05/23/080000286/mengenal-tujuan-15-sdgs--ekosistem-daratan. Membership: https://kmp.im/plus6 Download aplikasi: https://kmp.im/app6, Kompas.com, 23 Mei 2023, https://lestari.kompas.com/read/2023/05/23/080000286/mengenal-tujuan-15-sdgs--ekosistem-daratan. Accessed 30 Agustus 2026.

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Dokumen HIUPL ini terdiri dari lima bab. Bab pertama adalah pendahuluan yang menjelaskan dokumen HIUPL ini. Bab tersebut terdiri dari tujuan penulisan dokumen, lingkup masalah, definisi, istilah, dan singkatan, aturan penomoran, referensi, serta deskripsi umum dokumen. Bab kedua berisi deskripsi umum perangkat lunak, yaitu gambaran sistem EcoTrack beserta *use case diagram*, keterkaitannya dengan sistem lain di luarnya, dan batasan perangkat lunak.

Bab ketiga membahas implementasi perangkat lunak, yang terdiri dari lingkungan implementasi, implementasi modul atau kelas, implementasi antarmuka, dan file lain yang digunakan. Bab keempat memuat hasil pengujian, yang terdiri dari strategi dan kedalaman pengujian kelas, pengujian unit kelas, pengujian integrasi, pengujian *use case*, pengujian kebutuhan non-fungsional, serta tangkapan layar dan bukti hasil pengujian. Terakhir, bab kelima berisi tabel *traceability* yang menghubungkan setiap kebutuhan fungsional dan non-fungsional dengan *use case*, kelas, file implementasi, dan *test case* terkait.

<br>

---

# BAB 2: Deskripsi Umum Perangkat Lunak

Aplikasi perangkat lunak berbasis mobile yang dirancang untuk mengatasi isu tentang sampah. Aplikasi ini digunakan untuk mengidentifikasi jenis sampah secara praktis serta penghubung antara masyarakat dengan petugas kebersihan. Alur kerja sistem dibagi menjadi dua berdasarkan penggunanya. Bagi masyarakat, alur kerja dimulai dengan pengguna memindai sampah menggunakan perangkat mobile. Setelah itu, sistem akan mengidentifikasi jenis sampah tersebut dan menampilkan informasi terkait metode daur ulang yang dapat dilakukan. Sementara itu, bagi petugas kebersihan, alur kerjanya meliputi memasukkan, mengubah, dan mengelola jadwal pengambilan sampah. Jadwal yang dimasukkan oleh petugas ini kemudian akan ditampilkan kepada masyarakat secara konsisten. 

Harapan dari penerapan solusi ini adalah untuk memberikan kemudahan bagi masyarakat agar tidak kebingungan saat memilah sampah, sekaligus mempermudah pekerjaan petugas kebersihan agar tidak perlu memilah kembali sampah yang salah dikelompokkan. Secara jangka panjang, sistem ini diharapkan dapat meningkatkan pemahaman masyarakat dan mendorong perubahan perilaku yang berkelanjutan terkait daur ulang dan pemilahan sampah.

<p align="center">
<img alt="System Overview / Use Case Diagram" src="./assets/uc-diagram.png" width="90%">
</p>
<p align="center">
<i>Gambar 2.1. Use Case Diagram EcoTrack</i>
</p>

<br>

---

# BAB 3: Implementasi

## 3.1 Lingkungan Implementasi

Tabel 3.1. Lingkungan Implementasi

| Aspek | Keterangan |
| :--- | :--- |
| *Hardware* | *Smartphone* Android dengan kamera dan koneksi internet. |
| *Operating System* | Android 7.0 (API 24) atau lebih baru. |
| *Bahasa Pemrograman* | JavaScript (ES2022) dengan JSX, dijalankan oleh Node.js 22.13+ atau 24.3+ (diuji dengan Node.js 22.23.1 dan 24.14.1). |
| *Framework/Library* | Expo SDK 58 (`expo` ~58.0.23), React Native 0.88.1, React 19.3.0, Expo Router ~58.0.30 (navigasi), Firebase JS SDK ^13.2.0 (Firestore dan Authentication), `expo-camera` ~58.0.14 (kamera dan barcode), `@react-native-async-storage/async-storage` 2.2.0 (penyimpanan sesi login), `@expo/vector-icons` ^15.0.2, `@expo-google-fonts/roboto` ^0.4.3. Sisi basis data: `firebase-admin` ^13.0.0 (skrip seed) dan `firebase-tools` ^14.0.0 (emulator dan *deploy rules*). |
| *DBMS* | Cloud Firestore (NoSQL) dan Firebase Authentication. Untuk pengembangan dan pengujian digunakan Firebase Emulator Suite (Firestore emulator v1.19.8 pada port 8080, Authentication emulator pada port 9099) dengan Java JDK 21 atau lebih baru. |
| *Development Tools* | Visual Studio Code, Git dan GitHub (*version control*, Pull Request, Issues, Projects), Figma dan Procreate (desain antarmuka), Android Studio (Android Emulator), Expo Go, Expo CLI dan Metro Bundler, npm. |
| *Testing Tools* | Jest ~30.5.2 dengan preset `jest-expo` ~58.0.14 (*unit test* dan *integration test*), Jest Coverage/Istanbul (`--coverage`, laporan *line* dan *branch coverage*), Firebase Emulator Suite dan Emulator UI (`http://localhost:4000`) untuk pengujian integrasi serta inspeksi basis data. |

## 3.2 Implementasi Modul

Tabel 3.2. Implementasi Modul

| No | ID Kelas | Nama Modul/Kelas | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | C01 | AkunPetugas | `src/ecotrack/src/model/AkunPetugas.js` | - |
| 2 | C02 | AkunPetugasController | `src/ecotrack/src/controller/AkunPetugasController.js` | - |
| 3 | C03 | AkunPetugasInterface | `src/ecotrack/src/app/(auth)/login/index.jsx`<br>`src/ecotrack/src/app/(auth)/signup/index.jsx`<br>`src/ecotrack/src/app/profil/index.jsx` | - |
| 4 | C04 | Jadwal | `src/ecotrack/src/model/Jadwal.js` | - |
| 5 | C05 | JadwalController | `src/ecotrack/src/controller/JadwalController.js` | - |
| 6 | C06 | JadwalInterface | `src/ecotrack/src/app/(tabs)/jadwal/index.jsx`<br>`src/ecotrack/src/app/(tabs)/jadwal/[idJadwal]/index.jsx`<br>`src/ecotrack/src/app/(tabs)/jadwal/[idJadwal]/edit/index.jsx`<br>`src/ecotrack/src/ui/jadwal/Kalender.jsx`<br>`src/ecotrack/src/ui/jadwal/KartuLokasi.jsx`<br>`src/ecotrack/src/ui/jadwal/KartuInfoLokasi.jsx` | - |
| 7 | C07 | InformasiSampah | `src/ecotrack/src/model/InformasiSampah.js` | - |
| 8 | C08 | InformasiSampahController | `src/ecotrack/src/controller/InformasiSampahController.js` | - |
| 9 | C09 | InformasiSampahInterface | `src/ecotrack/src/app/(tabs)/informasi/index.jsx`<br>`src/ecotrack/src/app/(tabs)/informasi/[idSampah]/index.jsx`<br>`src/ecotrack/src/ui/informasi-sampah/KategoriSampahCard.jsx`<br>`src/ecotrack/src/ui/informasi-sampah/MetodeSolusiCard.jsx`<br>`src/ecotrack/src/ui/informasi-sampah/TutorialModal.jsx`<br>`src/ecotrack/src/ui/informasi-sampah/LangkahTutorial.jsx`<br>`src/ecotrack/src/ui/informasi-sampah/ContohHasilKreasi.jsx` | - |
| 10 | C10 | PemindaiController | `src/ecotrack/src/controller/PemindaiController.js` | - |
| 11 | C11 | PemindaiInterface | `src/ecotrack/src/app/(tabs)/pemindai/index.jsx`<br>`src/ecotrack/src/ui/pemindai/KameraView.js`<br>`src/ecotrack/src/ui/pemindai/FotoDeteksi.js` | - |

## 3.3 Implementasi Antarmuka

Tabel 3.3. Implementasi Antarmuka

| No | ID Antarmuka | Nama Antarmuka | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | I-01 | Daftar Akun/Sign Up | `src/ecotrack/src/app/(auth)/signup/index.jsx` | - |
| 2 | I-02 | Masuk Akun/Log In | `src/ecotrack/src/app/(auth)/login/index.jsx` | - |
| 3 | I-03 | Halaman Utama Daur Ulang | `src/ecotrack/src/app/(tabs)/informasi/index.jsx`, `src/ecotrack/src/ui/informasi-sampah/KategoriSampahCard.jsx` | - |
| 4 | I-04 | Halaman Utama Kosong Daur Ulang | `src/ecotrack/src/app/(tabs)/informasi/index.jsx` (keadaan hasil pencarian kosong, memakai `src/ecotrack/src/ui/component/EmptyState.jsx`) | - |
| 5 | I-05 | Halaman Informasi Material Sampah | `src/ecotrack/src/app/(tabs)/informasi/[idSampah]/index.jsx`, `src/ecotrack/src/ui/informasi-sampah/MetodeSolusiCard.jsx` | - |
| 6 | I-06 | Pop-up Panduan Daur Ulang | `src/ecotrack/src/ui/informasi-sampah/TutorialModal.jsx`, `src/ecotrack/src/ui/informasi-sampah/LangkahTutorial.jsx`, `src/ecotrack/src/ui/informasi-sampah/ContohHasilKreasi.jsx` | - |
| 7 | I-07 | Halaman Utama Jadwal Pengambilan Sampah | `src/ecotrack/src/app/(tabs)/jadwal/index.jsx`, `src/ecotrack/src/ui/jadwal/KartuLokasi.jsx` | - |
| 8 | I-08 | Halaman Utama Kosong Jadwal Pengambilan Sampah | `src/ecotrack/src/app/(tabs)/jadwal/index.jsx` (keadaan hasil pencarian kosong, memakai `src/ecotrack/src/ui/component/EmptyState.jsx`) | - |
| 9 | I-09 | Halaman Utama Jadwal (Masyarakat Umum) | `src/ecotrack/src/app/(tabs)/jadwal/[idJadwal]/index.jsx`, `src/ecotrack/src/ui/jadwal/Kalender.jsx`, `src/ecotrack/src/ui/jadwal/KartuInfoLokasi.jsx` | - |
| 10 | I-10 | Halaman Utama Jadwal (Petugas Kebersihan) | `src/ecotrack/src/app/(tabs)/jadwal/[idJadwal]/index.jsx` (tombol EDIT JADWAL tampil jika `bolehEdit = true`), `src/ecotrack/src/ui/jadwal/Kalender.jsx` | - |
| 11 | I-11 | Halaman Edit Jadwal (Petugas Kebersihan) | `src/ecotrack/src/app/(tabs)/jadwal/[idJadwal]/edit/index.jsx`, `src/ecotrack/src/ui/jadwal/Kalender.jsx` (mode edit) | - |
| 12 | I-12 | Pop-up Simpan Jadwal Baru (Petugas Kebersihan) | `src/ecotrack/src/app/(tabs)/jadwal/[idJadwal]/edit/index.jsx` (dialog "Simpan Jadwal"), `src/ecotrack/src/ui/component/Dialog.jsx` | - |
| 13 | I-13 | Pop-up Jadwal Baru Berhasil Tersimpan (Petugas Kebersihan) | `src/ecotrack/src/app/(tabs)/jadwal/[idJadwal]/edit/index.jsx` (`toast.berhasil`), `src/ecotrack/src/ui/component/Toast.jsx` | - |
| 14 | I-14 | Pop-up Jadwal Baru Gagal Tersimpan (Petugas Kebersihan) | `src/ecotrack/src/app/(tabs)/jadwal/[idJadwal]/edit/index.jsx` (`toast.gagal`), `src/ecotrack/src/ui/component/Toast.jsx` | - |
| 15 | I-15 | Halaman Utama Profil Petugas Kebersihan | `src/ecotrack/src/app/profil/index.jsx` | - |
| 16 | I-16 | Halaman Edit Profil Petugas Kebersihan | `src/ecotrack/src/app/profil/index.jsx` (mode edit profil) | - |
| 17 | I-17 | Halaman Berhasil Simpan Profil Baru Petugas Kebersihan | `src/ecotrack/src/app/profil/index.jsx` (`toast.berhasil`), `src/ecotrack/src/ui/component/Toast.jsx` | - |
| 18 | I-18 | Halaman Gagal Simpan Profil Baru Petugas Kebersihan | `src/ecotrack/src/app/profil/index.jsx` (`toast.gagal`), `src/ecotrack/src/ui/component/Toast.jsx` | - |
| 19 | I-19 | Pop-up Keluar Akun Petugas | `src/ecotrack/src/app/profil/index.jsx` (dialog "Keluar Akun"), `src/ecotrack/src/ui/component/Dialog.jsx` | - |
| 20 | I-20 | Halaman Edit Password Akun Petugas | `src/ecotrack/src/app/profil/index.jsx` (mode ubah kata sandi) | - |
| 21 | I-21 | Halaman Berhasil Edit Password Akun Petugas | `src/ecotrack/src/app/profil/index.jsx` (`toast.berhasil`), `src/ecotrack/src/ui/component/Toast.jsx` | - |
| 22 | I-22 | Halaman Gagal Edit Password Akun Petugas | `src/ecotrack/src/app/profil/index.jsx` (`toast.gagal`), `src/ecotrack/src/ui/component/Toast.jsx` | - |
| 23 | I-23 | Halaman Utama Pemindaian Sampah | `src/ecotrack/src/app/(tabs)/pemindai/index.jsx`, `src/ecotrack/src/ui/pemindai/KameraView.js` | - |
| 24 | I-24 | Halaman Hasil Pemindaian Sampah | `src/ecotrack/src/app/(tabs)/pemindai/index.jsx`, `src/ecotrack/src/ui/pemindai/FotoDeteksi.js` | - |
| 25 | I-25 | Pop-up Material Sampah Belum Tersedia | `src/ecotrack/src/app/(tabs)/pemindai/index.jsx` | - |
| 26 | I-26 | Masuk Akun/Log In Salah | `src/ecotrack/src/app/(auth)/login/index.jsx` (keadaan kredensial salah) | - |
| 27 | I-27 | Daftar Akun/Sign Up Salah | `src/ecotrack/src/app/(auth)/signup/index.jsx` (keadaan isian tidak valid) | - |

## 3.4 File Lain

Tabel 3.4. File Lain

| No | Nama File | Keterangan |
| :--- | :--- | :--- |
| 1 | `src/README.md` | Panduan instalasi, konfigurasi, menjalankan aplikasi dan test, akun uji, serta struktur folder. |
| 2 | `src/ecotrack/package.json`, `src/ecotrack/package-lock.json` | Daftar dependensi aplikasi, skrip npm (`start`, `android`, `test`), dan konfigurasi Jest. |
| 3 | `src/ecotrack/app.json` | Konfigurasi Expo (nama aplikasi, ikon, *splash screen*, dan *plugin*). |
| 4 | `src/ecotrack/jsconfig.json` | Alias impor `@/` ke folder `src/ecotrack/src/`. |
| 5 | `src/ecotrack/.env.example` | Daftar *environment variable* (mode emulator/cloud, host emulator, konfigurasi Firebase, URL layanan pemindai) tanpa nilai rahasia. |
| 6 | `src/ecotrack/src/database/firebase.js` | Inisialisasi Firebase App, Firestore, dan Authentication; menyambungkan ke emulator atau *cloud* sesuai `.env`. |
| 7 | `src/ecotrack/src/model/barcodeModel.js` | Fungsi akses koleksi `barcodeProduk` dan informasi jenis sampah untuk fitur pemindai (Tabel B.1 No. 2 dokumen Implementasi). Pada rilis ini file belum dipanggil; pencarian barcode berjalan melalui `InformasiSampahController.cariBarcode()`. |
| 8 | `src/ecotrack/src/model/sampahModel.js` | Mengirim foto ke layanan *computer vision* (Cloudflare Worker) dan menerima hasil deteksi (Tabel B.1 No. 1 dokumen Implementasi). |
| 9 | `src/ecotrack/src/app/_layout.jsx`, `src/ecotrack/src/app/index.jsx` | Layout akar aplikasi (memuat font Roboto dan wadah Toast) dan pengalihan awal ke halaman Daur Ulang. |
| 10 | `src/ecotrack/src/app/(tabs)/_layout.jsx`, `src/ecotrack/src/app/(tabs)/jadwal/_layout.jsx`, `src/ecotrack/src/app/(tabs)/informasi/_layout.jsx` | Layout navigasi tab dan *stack* untuk setiap fitur. |
| 11 | `src/ecotrack/src/ui/theme.js` | Token warna dan tipografi bersama. |
| 12 | `src/ecotrack/src/ui/component/Button.jsx`, `Dialog.jsx`, `EmptyState.jsx`, `Header.jsx`, `InputField.jsx`, `NavBar.jsx`, `SearchBar.jsx`, `Toast.jsx` | Komponen antarmuka bersama yang dipakai oleh seluruh kelas Interface. |
| 13 | `src/ecotrack/src/utils/validators.js` | Validasi isian (email, NIK, nomor telepon, kata sandi, dan konfirmasi kata sandi). |
| 14 | `src/ecotrack/src/utils/gambarSampah.js` | Pemetaan atribut `gambar` ke file gambar informasi sampah. |
| 15 | `src/ecotrack/src/utils/penjagaNavigasi.js` | Penjaga perpindahan tab saat masih ada perubahan jadwal yang belum disimpan. |
| 16 | `src/ecotrack/assets/images/**` | Logo, ikon aplikasi, ilustrasi, dan gambar informasi sampah. |
| 17 | `src/firebase/firebase.json`, `src/firebase/firestore.indexes.json` | Konfigurasi Firebase Emulator (port Firestore, Authentication, dan Emulator UI) serta indeks Firestore. |
| 18 | `src/firebase/firestore.rules` | *Security rules* Firestore (misalnya hanya petugas dengan wilayah tugas yang sama yang boleh mengubah jadwal). |
| 19 | `src/firebase/seed.js` | Skrip pengisian data awal ke emulator atau *cloud* dan pembuatan akun uji. |
| 20 | `src/firebase/pull.js` | Skrip menyalin data dari Firebase *cloud* ke file `data/*.json`. |
| 21 | `src/firebase/data/informasiSampah.json`, `jadwal.json`, `barcodeProduk.json`, `dataPemerintah.json`, `akunPetugas.json` | Data awal (*seed*) dan data uji seluruh koleksi; juga dipakai sebagai data acuan pengujian KNF05. |
| 22 | `src/firebase/README.md` | Panduan basis data (emulator, *seed*, *cloud*, dan *rules*). |
| 23 | `src/tests/JadwalController.test.js` | *Unit test* kelas C05 JadwalController (C05-UT01 s.d. C05-UT36). |
| 24 | `src/tests/Jadwal.test.js` | *Unit test* kelas C04 Jadwal (C04-UT01 s.d. C04-UT17). |
| 25 | `src/tests/JadwalIntegrasi.test.js` | *Integration test* antarmuka I-07 s.d. I-14 terhadap Firebase Emulator (INT-I07-TC01 s.d. INT-I14-TC02). |
| 26 | `src/tests/KNF05Akurasi.test.js` | Pengujian KNF05 (akurasi jadwal, informasi daur ulang, dan kategori barcode) terhadap Firebase Emulator. |

<br>

---

# BAB 4: Hasil Pengujian

## 4.1 Strategi dan Kedalaman Pengujian Kelas

Tabel 4.1.1. Identifikasi Tingkat Pengujian Kelas

| ID Kelas | Nama Kelas | Tingkat | Alasan | Test Case Terkait |
| :--- | :--- | :--- | :--- | :--- |
| C01 | AkunPetugas | Mendalam | Memuat logika validasi NIK pemerintah, pencegahan duplikasi NIK, transaksi `writeBatch`, pembaruan email terverifiikasi, dan penanganan sesi kedaluwarsa. | C01-UT01 s.d. C01-UT20 |
| C02 | AkunPetugasController | Mendalam | Mengoordinasikan alur autentikasi, memvalidasi kecocokan kata sandi, serta memetakan kode kesalahan Firebase menjadi status spesifik pada antarmuka. | C02-UT01 s.d. C02-UT14 |
| C03 | AkunPetugasInterface | Tidak perlu | Hanya komponen antarmuka tanpa logika, diuji secara fungsional pada subbab 4.4 | - |
| C10 | PemindaiController | Mendalam | Mengatur jalannya pengambilan foto dan pembacaan barcode, serta mengatur status tampilan | C10-UT01 s.d. C10-UT11, INT-TC01 s.d. INT-TC04 |
| C11 | PemindaiInterface | Tidak perlu | Hanya bertugas menampilkan layar kamera, kotak penanda objek sampah, dan kartu hasil pemindaian | - |
| C12 | SampahModel | Mendalam | Bertugas mengirim foto sampah ke layanan AI di server luar | C12-UT01 s.d. C12-UT04, INT-TC03, INT-TC04 |
| C13 | BarcodeModel | Mendalam | Bertugas mencocokkan nomor barcode produk ke basis data serta mengambil panduan cara daur ulangnya | C13-UT01 s.d. C13-UT03, INT-TC01, INT-TC02, INT-TC05, INT-TC06 |


## 4.2 Pengujian Unit Kelas

Pengujian unit dilakukan pada kelas bertingkat Mendalam dan Sedang. Kelas Mendalam diuji pada seluruh operasi public dengan kasus normal, batas, dan negatif, serta mencapai coverage minimal 70%. Kelas Sedang diuji minimal dengan satu kasus normal dan satu kasus gagal pada operasi public utama.

Cara menjalankan seluruh unit test sekaligus: `npx jest ../tests --coverage --runInBand` (dijalankan dari direktori `src/ecotrack/`).

Lokasi file test: src/tests

### 4.2.1 Kelas AkunPetugas

**ID Kelas:** C01  
**Nama Kelas:** AkunPetugas  
**Tingkat:** Mendalam

Tabel 4.2.1. Hasil Pengujian Unit Kelas C01

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C01-UT01 | `verifikasiPetugas(nik, username)` | Normal | Panggil dengan `nik` (`3273010101900001`) dan `username` (`Budi Santoso`) yang terdaftar pada koleksi `dataPemerintah` serta belum tercatat pada `nikTerdaftar` | Mengembalikan `"VALID"` serta mengisi atribut static `username` dan `wilayahTugas` sesuai data pemerintah | Operasi mengembalikan `"VALID"`, `AkunPetugas.username` terisi `"Budi Santoso"`, dan `AkunPetugas.wilayahTugas` terisi `"lebak-siliwangi"` | Pass |
| C01-UT02 | `verifikasiPetugas(nik, username)` | Batas | Panggil dengan `nik` valid dan `username` yang memiliki spasi berlebih di awal/akhir serta perbedaan huruf kapital (`"  bUDI sANTOSO  "`) | Parameter `username` dinormalisasi (`.trim().toLowerCase()`) dan mengembalikan `"VALID"` | Input berhasil dinormalisasi dan operasi mengembalikan `"VALID"` dengan nama resmi `"Budi Santoso"` | Pass |
| C01-UT03 | `verifikasiPetugas(nik, username)` | Negatif | Panggil dengan `nik` (`9999999999999999`) yang tidak ditemukan pada koleksi `dataPemerintah` | Mengembalikan `"NIK_TIDAK_TERDAFTAR"` | Operasi mengembalikan `"NIK_TIDAK_TERDAFTAR"` | Pass |
| C01-UT04 | `verifikasiPetugas(nik, username)` | Negatif | Panggil dengan `nik` valid di `dataPemerintah`, tetapi `username` (`Andi Wijaya`) berbeda dari `namaLengkap` | Mengembalikan `"NAMA_TIDAK_SESUAI"` | Operasi mengembalikan `"NAMA_TIDAK_SESUAI"` | Pass |
| C01-UT05 | `verifikasiPetugas(nik, username)` | Negatif | Panggil dengan `nik` yang sudah tercatat pada koleksi `nikTerdaftar` | Mengembalikan `"NIK_SUDAH_TERDAFTAR"` | Operasi mengembalikan `"NIK_SUDAH_TERDAFTAR"` | Pass |
| C01-UT06 | `createAkunPetugas(...)` | Normal | Panggil dengan data registrasi valid (`username`, `nik`, `email`, `noTelepon`, `password`, `wilayahTugas`) | Membuat user di Firebase Auth, menyimpan dokumen `akunPetugas/{uid}` dan `nikTerdaftar/{nik}` via `writeBatch`, mengatur `statusLogin = true`, dan mengembalikan `"BERHASIL"` | User Auth terbentuk, 2 dokumen tersimpan melalui `writeBatch.commit()`, `statusLogin` bernilai `true`, dan mengembalikan `"BERHASIL"` | Pass |
| C01-UT07 | `createAkunPetugas(...)` | Negatif | Panggil ketika Firebase Auth melempar error `auth/email-already-in-use` | Mengembalikan `"EMAIL_TERDAFTAR"` tanpa mengeksekusi `writeBatch` ke Firestore | Operasi mengembalikan `"EMAIL_TERDAFTAR"` dan `writeBatch` tidak dipanggil | Pass |
| C01-UT08 | `createAkunPetugas(...)` | Negatif | Panggil ketika user Auth berhasil dibuat, tetapi `batch.commit()` ke Firestore gagal | Melakukan *rollback* dengan memanggil `deleteUser(userBaru)` dan melempar ulang *error* | `deleteUser` dipanggil untuk menghapus akun Auth yang baru dibuat dan *error* dilempar ulang | Pass |
| C01-UT09 | `loginAuth(email, password)` | Normal | Panggil dengan `email` dan `password` yang valid serta dokumen `akunPetugas/{uid}` tersedia di Firestore | Memuat atribut profil ke kelas, mengatur `statusLogin = true`, dan mengembalikan `true` | Atribut profil dimuat ke kelas, `statusLogin` bernilai `true`, dan mengembalikan `true` | Pass |
| C01-UT10 | `loginAuth(email, password)` | Normal | Panggil dengan kredensial valid saat `user.email` di Auth (`baru@ecotrack.id`) berbeda dengan `docData.email` di Firestore (`lama@ecotrack.id`) | Menyinkronkan `email` pada dokumen Firestore melalui `runTransaction` dan mengembalikan `true` | `runTransaction` memperbarui `email` Firestore menjadi `"baru@ecotrack.id"` dan mengembalikan `true` | Pass |
| C01-UT11 | `loginAuth(email, password)` | Negatif | Uji saat Firebase Auth melempar `auth/invalid-credential` dan saat dokumen `akunPetugas/{uid}` tidak ditemukan | Mengembalikan `false` pada kredensial salah; memanggil `signOut` lalu mengembalikan `false` jika dokumen profil tidak ada | Mengembalikan `false` pada kredensial salah; `signOut` terpanggil dan mengembalikan `false` saat dokumen profil kosong | Pass |
| C01-UT12 | `kirimResetKataSandi(email)` | Normal | Panggil dengan string email yang memiliki spasi di awal/akhir (`"  budi@ecotrack.id  "`) | Mengatur `auth.languageCode = 'id'` dan memanggil `sendPasswordResetEmail` dengan email yang telah di-`trim()` | `auth.languageCode` diatur ke `'id'` dan `sendPasswordResetEmail` dipanggil dengan `"budi@ecotrack.id"` | Pass |
| C01-UT13 | `getProfil()` | Normal | Panggil saat sesi pengguna aktif, dokumen `akunPetugas/{uid}` bukan dari *cache*, dan dokumen `jadwal/{wilayahTugas}` tersedia | Mengembalikan objek `{ username, email, noTelepon, wilayahTugas }` dengan nama kelurahan dari koleksi `jadwal` | Mengembalikan objek profil lengkap dengan `wilayahTugas: "Lebak Siliwangi"` | Pass |
| C01-UT14 | `getProfil()` & `getNamaWilayah()` | Batas | Panggil saat dokumen `jadwal/{wilayahTugas}` tidak ditemukan atau parameter kosong | Menggunakan *fallback* pemformatan slug ID wilayah (`"lebak-siliwangi"` menjadi `"Lebak Siliwangi"`) dan `""` untuk input kosong | Mengembalikan `"Lebak Siliwangi"` untuk slug wilayah dan `""` untuk string kosong | Pass |
| C01-UT15 | `getProfil()` | Negatif | Uji saat sesi tidak aktif (`user === null`) dan saat `hasil.metadata.fromCache === true` | Mengembalikan `null` jika belum login, dan melempar `Error('Tidak bisa terhubung ke server')` jika data berasal dari *cache* | Mengembalikan `null` saat belum login dan melempar `Error('Tidak bisa terhubung ke server')` saat `fromCache` bernilai `true` | Pass |
| C01-UT16 | `editProfil(emailBaru, noTeleponBaru)` | Normal | Panggil dengan `emailBaru` yang sama dengan `user.email` dan `noTeleponBaru` yang diperbarui (`" 0899999999 "`) | Memperbarui `noTelepon` di Firestore via `runTransaction` tanpa memanggil `verifyBeforeUpdateEmail`, dan mengembalikan `'BERHASIL'` | `noTelepon` diperbarui menjadi `"0899999999"` tanpa memanggil `verifyBeforeUpdateEmail`, dan mengembalikan `'BERHASIL'` | Pass |
| C01-UT17 | `editProfil(emailBaru, noTeleponBaru)` | Normal | Panggil dengan `emailBaru` (`baru@ecotrack.id`) yang berbeda dari `user.email` (`lama@ecotrack.id`) | Memanggil `verifyBeforeUpdateEmail(user, email)`, memperbarui `noTelepon` di Firestore, dan mengembalikan `'VERIFIKASI_EMAIL'` | `verifyBeforeUpdateEmail` dipanggil ke email baru, `noTelepon` diperbarui, dan mengembalikan `'VERIFIKASI_EMAIL'` | Pass |
| C01-UT18 | `editProfil(emailBaru, noTeleponBaru)` | Negatif | Panggil saat `auth.currentUser` bernilai `null` | Mengembalikan `'BELUM_LOGIN'` tanpa memanggil Firebase Auth maupun Firestore | Mengembalikan `'BELUM_LOGIN'` dan `runTransaction` tidak dipanggil | Pass |
| C01-UT19 | `changePassword(passwordBaru)` | Normal & Negatif | Uji saat `auth.currentUser` aktif dengan `passwordBaru` valid dan saat `auth.currentUser === null` | Memanggil `updatePassword` dan mengembalikan `true` saat sesi aktif; mengembalikan `false` saat belum login | Mengembalikan `false` saat `currentUser` bernilai `null`, serta memanggil `updatePassword` dan mengembalikan `true` saat sesi aktif | Pass |
| C01-UT20 | `logout()`, `cekStatusLogin()`, `getWilayahTugas()` | Normal & Negatif | Uji `logout()` saat login aktif, `cekStatusLogin()` saat login aktif, dan `getWilayahTugas()` saat login aktif | `logout()` memanggil `signOut`, mereset atribut static, dan mengembalikan `true`; `cekStatusLogin()` mengembalikan `true`; `getWilayahTugas()` mengembalikan ID wilayah | `logout()` mereset state dan mengembalikan `true`; `cekStatusLogin()` mengembalikan `true`; `getWilayahTugas()` mengembalikan `'lebak-siliwangi'` | Pass |

### 4.2.2 Kelas AkunPetugasController

**ID Kelas:** C02  
**Nama Kelas:** AkunPetugasController  
**Tingkat:** Mendalam

Tabel 4.2.2. Hasil Pengujian Unit Kelas C02

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C02-UT01 | `signUp(namalengkap, nik, email, nomortelepon, password, konfirmasi)` | Normal | Panggil dengan `password === konfirmasi` dan `AkunPetugas.verifikasiPetugas` mengembalikan `"VALID"` | Memanggil `AkunPetugas.createAkunPetugas` menggunakan `username` dan `wilayahTugas` hasil verifikasi, lalu mengembalikan `"BERHASIL"` | `createAkunPetugas` dipanggil dengan data resmi dari Model dan mengembalikan `"BERHASIL"` | Pass |
| C02-UT02 | `signUp(...)` | Negatif | Panggil dengan `password` kosong atau `password !== konfirmasi` | Mengembalikan `'KONFIRMASI_SANDI_BEDA'` tanpa memanggil `AkunPetugas.verifikasiPetugas` | Mengembalikan `'KONFIRMASI_SANDI_BEDA'` pada kedua kasus dan `verifikasiPetugas` tidak dipanggil | Pass |
| C02-UT03 | `signUp(...)` | Negatif | Panggil ketika `AkunPetugas.verifikasiPetugas` mengembalikan status gagal (`'NIK_TIDAK_TERDAFTAR'`) | Meneruskan status kegagalan tersebut tanpa memanggil `createAkunPetugas` | Mengembalikan `'NIK_TIDAK_TERDAFTAR'` dan `createAkunPetugas` tidak dipanggil | Pass |
| C02-UT04 | `signUp(...)` | Negatif | Panggil ketika operasi *Model* melempar *exception* jaringan/tak terduga | Menangkap *error* dan mengembalikan `'NETWORK_ERROR'` | *Exception* ditangkap dan mengembalikan `'NETWORK_ERROR'` | Pass |
| C02-UT05 | `prosesLogin(email, password)` | Normal | Panggil ketika `AkunPetugas.loginAuth` mengembalikan `true` | Mengembalikan `'BERHASIL'` | Operasi mengembalikan `'BERHASIL'` | Pass |
| C02-UT06 | `prosesLogin(email, password)` | Negatif | Panggil ketika `AkunPetugas.loginAuth` mengembalikan `false` | Mengembalikan `'KREDENSIAL_SALAH'` | Operasi mengembalikan `'KREDENSIAL_SALAH'` | Pass |
| C02-UT07 | `prosesLogin(email, password)` | Negatif | Panggil ketika `AkunPetugas.loginAuth` melempar *exception* (`auth/network-request-failed`) | Mengembalikan `'NETWORK_ERROR'` | Operasi mengembalikan `'NETWORK_ERROR'` | Pass |
| C02-UT08 | `lupaKataSandi(email)` | Normal & Batas | Uji saat `kirimResetKataSandi` berhasil dan saat melempar `auth/user-not-found` | Mengembalikan `'TERKIRIM'` pada kedua kondisi untuk mencegah enumerasi akun | Mengembalikan `'TERKIRIM'` baik saat email terdaftar maupun saat `auth/user-not-found` | Pass |
| C02-UT09 | `lupaKataSandi(email)` | Negatif | Uji saat *Model* melempar `auth/invalid-email`, `auth/too-many-requests`, dan error jaringan umum | Memetakan berturut-turut menjadi `'EMAIL_TIDAK_VALID'`, `'TERLALU_SERING'`, dan `'NETWORK_ERROR'` | Berhasil memetakan menjadi `'EMAIL_TIDAK_VALID'`, `'TERLALU_SERING'`, dan `'NETWORK_ERROR'` | Pass |
| C02-UT10 | `editProfil(emailBaru, nomorteleponBaru)` | Normal | Panggil dengan data pembaruan kontak valid (*Model* mengembalikan `'BERHASIL'` atau `'VERIFIKASI_EMAIL'`) | Meneruskan pembaruan ke `AkunPetugas.editProfil` dan mengembalikan status hasil dari *Model* | Meneruskan panggilan ke Model dan mengembalikan `'BERHASIL'` serta `'VERIFIKASI_EMAIL'` sesuai hasil Model | Pass |
| C02-UT11 | `editProfil(emailBaru, nomorteleponBaru)` | Negatif | Uji saat *Model* melempar `auth/requires-recent-login`, `auth/email-already-in-use`, `auth/invalid-email`, `auth/too-many-requests`, dan error jaringan | Memetakan berturut-turut menjadi `'PERLU_LOGIN_ULANG'`, `'EMAIL_TERDAFTAR'`, `'EMAIL_TIDAK_VALID'`, `'TERLALU_SERING'`, dan `'NETWORK_ERROR'` | Seluruh kode *error* dipetakan dengan tepat menjadi `'PERLU_LOGIN_ULANG'`, `'EMAIL_TERDAFTAR'`, `'EMAIL_TIDAK_VALID'`, `'TERLALU_SERING'`, dan `'NETWORK_ERROR'` | Pass |
| C02-UT12 | `changePassword(passwordBaru)` | Normal | Panggil saat `auth.currentUser` aktif dan `AkunPetugas.changePassword` mengembalikan `true` | Mengembalikan `'BERHASIL'` | Operasi mengembalikan `'BERHASIL'` | Pass |
| C02-UT13 | `changePassword(passwordBaru)` | Negatif | Uji saat `auth.currentUser === null` dan saat *Model* melempar `auth/requires-recent-login`, `auth/weak-password`, `auth/too-many-requests`, atau error jaringan | Mengembalikan `'BELUM_LOGIN'` jika tidak ada sesi; memetakan error menjadi `'PERLU_LOGIN_ULANG'`, `'SANDI_LEMAH'`, `'TERLALU_SERING'`, dan `'NETWORK_ERROR'` | Mengembalikan `'BELUM_LOGIN'` saat sesi kosong dan memetakan seluruh *error* menjadi `'PERLU_LOGIN_ULANG'`, `'SANDI_LEMAH'`, `'TERLALU_SERING'`, dan `'NETWORK_ERROR'` | Pass |
| C02-UT14 | `logout()` & `getProfil()` | Normal | Panggil `AkunPetugasController.logout()` dan `AkunPetugasController.getProfil()` | Mendelegasikan langsung ke `AkunPetugas.logout()` dan `AkunPetugas.getProfil()` serta mengembalikan hasilnya | Berhasil mendelegasikan dan mengembalikan data profil serta status `true` saat logout | Pass |

Khusus kelas **Mendalam**:

Tabel 4.2.2b. Ringkasan Cakupan Kelas C02

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `prosesLogin()`, `signUp()`, `logout()`, `changePassword()`, `editProfil()` |
| Operasi yang diuji | `prosesLogin()`, `signUp()`, `logout()`, `changePassword()`, `editProfil()`, `lupaKataSandi()`, `getProfil()` |
| ID Algoritma yang tercakup | Algo-APC-001, Algo-APC-003, Algo-APC-004 *(Algo-APC-002 digantikan oleh Firebase Authentication sesuai Tabel B.1 No. 7)* |
| Coverage (wajib ≥ 70%) | 100% statements / 92,5% branch (100% functions, 100% lines) menggunakan Jest, bukti pada Subbab 4.6 |


### 4.2.3 Kelas Jadwal

**ID Kelas:** C04  
**Nama Kelas:** Jadwal  
**Tingkat:** Mendalam

Tabel 4.2.3. Hasil Pengujian Unit Kelas C04

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C04-UT01 | `getIdJadwal()`, `getKecamatan()`, `getKelurahan()`, `getTanggal()` | Normal | Buat `Jadwal` dengan id `lebak-siliwangi`, kecamatan Coblong, kelurahan Lebak Siliwangi, tanggal [2 Nov 2026, 5 Nov 2026] | Setiap getter mengembalikan nilai yang sama dengan masukan konstruktor | Seluruh getter mengembalikan nilai sesuai masukan | Pass |
| C04-UT02 | `getTanggal(): List<Date>` | Batas | Tambahkan tanggal ke list hasil `getTanggal()`, lalu panggil `getTanggal()` lagi | List di dalam objek tidak ikut berubah (yang dikembalikan adalah salinan) | List tetap berisi [2 Nov 2026] | Pass |
| C04-UT03 | Atribut privat (`#idJadwal`, `#daftarTanggal`) | Negatif | Akses `jadwal.idJadwal` dan `jadwal.daftarTanggal` dari luar kelas | Bernilai `undefined` (atribut tidak dapat diakses dari luar) | Keduanya `undefined` | Pass |
| C04-UT04 | `setTanggal(daftarTanggalBaru)` | Normal | `setTanggal([9 Nov 2026])` | `getTanggal()` = [9 Nov 2026] dan tidak ada penulisan ke database | Sesuai harapan; `runTransaction` tidak dipanggil | Pass |
| C04-UT05 | `setTanggal(daftarTanggalBaru)` | Batas | `setTanggal([])` (semua tanggal dihapus) | `getTanggal()` = [] | `getTanggal()` = [] | Pass |
| C04-UT06 | `setTanggal(daftarTanggalBaru)` | Batas | `setTanggal(list)`, lalu tambahkan tanggal ke `list` asal | Objek tidak terpengaruh perubahan list asal | `getTanggal()` tetap [9 Nov 2026] | Pass |
| C04-UT07 | `simpanJadwal()` | Normal | Jadwal `lebak-siliwangi` dengan 2 tanggal, `runTransaction` tiruan berhasil | Dokumen `jadwal/lebak-siliwangi` di-*update* dengan `daftarTanggal` berupa 2 Timestamp dan `diperbaruiPada` = `serverTimestamp()` | Isi *update* sesuai harapan | Pass |
| C04-UT08 | `simpanJadwal()` | Batas | Jadwal dengan daftar tanggal kosong | Dokumen di-*update* dengan `daftarTanggal: []` | Sesuai harapan | Pass |
| C04-UT09 | `simpanJadwal()` | Negatif | `runTransaction` gagal dengan error `permission-denied` | Error dilempar ke pemanggil (Controller) | Melempar `permission-denied` | Pass |
| C04-UT10 | `getSemuaJadwal()` | Normal | `getDocs` mengembalikan 2 dokumen (pasteur dengan 1 tanggal, dago tanpa tanggal) | List 2 objek `Jadwal` dengan tanggal bertipe `Date` | 2 objek `Jadwal`, tanggal sesuai | Pass |
| C04-UT11 | `getSemuaJadwal()` | Batas | Dokumen `kopo` tanpa *field* `daftarTanggal` | `getTanggal()` = [] (tidak error) | `getTanggal()` = [] | Pass |
| C04-UT12 | `getSemuaJadwal()` | Batas | Koleksi kosong | List kosong | List kosong | Pass |
| C04-UT13 | `getSemuaJadwal()` | Negatif | `getDocs` mengembalikan data dengan `metadata.fromCache = true` (offline) | Melempar error "Tidak bisa terhubung ke server" | Melempar error sesuai harapan | Pass |
| C04-UT14 | `getSemuaJadwal()` | Negatif | `getDocs` gagal dengan error `unavailable` | Error diteruskan ke pemanggil | Melempar `unavailable` | Pass |
| C04-UT15 | `getJadwalById(idJadwal)` | Normal | `getJadwalById('lebak-siliwangi')`, dokumen ada | Objek `Jadwal` dengan kelurahan Lebak Siliwangi dan tanggal [2 Nov 2026] | Sesuai harapan | Pass |
| C04-UT16 | `getJadwalById(idJadwal)` | Negatif | `getJadwalById('tidak-ada')`, dokumen tidak ada | `null` | `null` | Pass |
| C04-UT17 | `getJadwalById(idJadwal)` | Negatif | `getDoc` mengembalikan data dari *cache* (offline) | Melempar error "Tidak bisa terhubung ke server" | Melempar error sesuai harapan | Pass |

Tabel 4.2.3b. Ringkasan Cakupan Kelas C04

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `getIdJadwal()`, `getKecamatan()`, `getKelurahan()`, `getTanggal()`, `setTanggal(daftarTanggalBaru)`, `simpanJadwal()`. Operasi pengambilan data pada implementasi: `getSemuaJadwal()` dan `getJadwalById(idJadwal)` (Tabel B.1 No. 8 dokumen Implementasi). |
| Operasi yang diuji | Seluruh operasi di atas (8 dari 8 operasi public). |
| ID Algoritma yang tercakup | Algo-J-001, Algo-J-002, Algo-J-003, Algo-J-004, Algo-J-005, dan algoritma `simpanJadwal()` (tertulis Algo-IS-006 pada DPPL 5.4.6); Q-J-001 dan Q-J-002 pada implementasi. |
| Coverage (wajib ≥ 70%) | `src/ecotrack/src/model/Jadwal.js`: **100% baris, 100% cabang, 100% fungsi**. Alat: Jest Coverage (Istanbul). |

### 4.2.4 Kelas JadwalController

**ID Kelas:** C05  
**Nama Kelas:** JadwalController  
**Tingkat:** Mendalam

Tabel 4.2.4b. Ringkasan Cakupan Kelas C01

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `cekEmail()`, `cekPassword()`, `encrypt()`, `createAkunPetugas()`, `cekStatusLogin()`, `getProfil()`, `editProfil()`, `changePassword()`, `verifikasiPetugas()`, `logout()` |
| Operasi yang diuji | `verifikasiPetugas()`, `cekDataPemerintah()`, `cekNikTerdaftar()`, `createAkunPetugas()`, `loginAuth()`, `kirimResetKataSandi()`, `tungguSesiLogin()`, `getProfil()`, `getNamaWilayah()`, `editProfil()`, `changePassword()`, `logout()`, `cekStatusLogin()`, `getWilayahTugas()` |
| ID Algoritma yang tercakup | Algo-AP-004, Algo-AP-005, Algo-AP-006, Algo-AP-007, Algo-AP-008, Algo-AP-009, Algo-AP-010 *(Algo-AP-001 s.d. Algo-AP-003 digantikan oleh Firebase Authentication sesuai Tabel B.1 No. 5 dan No. 7)* |
| Coverage (wajib ≥ 70%) | 92,51% statements / 78,57% branch (90,47% functions, 93,28% lines) menggunakan Jest, bukti pada Subbab 4.6 |

---


Tabel 4.2.4. Hasil Pengujian Unit Kelas C05

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C05-UT01 | `getJadwal(idJadwal)` | Normal | Petugas login dengan wilayah tugas `lebak-siliwangi`, `getJadwal('lebak-siliwangi')` | `statusLogin = true`, `bolehEdit = true` | Sesuai harapan | Pass |
| C05-UT02 | `getJadwal(idJadwal)` | Negatif | Petugas wilayah `lebak-siliwangi` membuka `getJadwal('pasteur')` | `statusLogin = true`, `bolehEdit = false` | Sesuai harapan | Pass |
| C05-UT03 | `getJadwal(idJadwal)`, `cekStatusLogin()` | Negatif | Belum login, `getJadwal('lebak-siliwangi')` | `statusLogin = false`, `bolehEdit = false`, wilayah tugas tidak dibaca | Sesuai harapan; `getWilayahTugas` tidak dipanggil | Pass |
| C05-UT04 | `getJadwal(idJadwal)` | Negatif | Login, tetapi pembacaan wilayah tugas gagal (offline) | Detail jadwal tetap dikembalikan, `bolehEdit = false` | Kelurahan Lebak Siliwangi tetap dikembalikan, `bolehEdit = false` | Pass |
| C05-UT05 | `editJadwal(idJadwal, daftarTanggalBaru)` | Batas | `editJadwal('pasteur', [9 Nov 00:00, 2 Nov 10:30, 2 Nov 00:00])` (duplikat dan jam bukan 00:00) | Disimpan [2 Nov 00:00 WIB, 9 Nov 00:00 WIB] | Sesuai harapan | Pass |
| C05-UT06 | `editJadwal(idJadwal, daftarTanggalBaru)` | Normal | `editJadwal('pasteur', [5 Nov 2026])` | Mengembalikan objek Jadwal `pasteur` dengan tanggal [5 Nov 2026] | Sesuai harapan | Pass |
| C05-UT07 | `editJadwal(idJadwal, daftarTanggalBaru)` | Normal | Simpan berhasil, lalu `cariLokasiTPS('pasteur')` | Daftar jadwal di *cache* ikut diperbarui | Tanggal pada *cache* = [5 Nov 2026] | Pass |
| C05-UT08 | `editJadwal(idJadwal, daftarTanggalBaru)` | Batas | `editJadwal('lebak-siliwangi', [])` | Disimpan dengan daftar tanggal kosong | Sesuai harapan | Pass |
| C05-UT09 | `editJadwal(idJadwal, daftarTanggalBaru)` | Negatif | `simpanJadwal()` gagal `permission-denied` | Mengembalikan `null`, *cache* tidak berubah | `null`, *cache* tetap [2 Nov 2026] | Pass |
| C05-UT10 | `editJadwal(idJadwal, daftarTanggalBaru)` | Negatif | `editJadwal('tidak-ada', [])` | Mengembalikan `null` tanpa menyimpan | `null`, `simpanJadwal()` tidak dipanggil | Pass |
| C05-UT11 | `getDaftarJadwal()` | Normal | Data 4 lokasi acak | Terurut per kecamatan lalu kelurahan: tamansari, dago, lebak-siliwangi, pasteur | Sesuai harapan | Pass |
| C05-UT12 | `getDaftarJadwal()` | Negatif | Model gagal (offline) | Error dilempar ke halaman | Melempar `offline` | Pass |
| C05-UT13 | `cariLokasiTPS(keyword)` | Normal | `cariLokasiTPS('coblong')` | [dago, lebak-siliwangi] | Sesuai harapan | Pass |
| C05-UT14 | `cariLokasiTPS(keyword)` | Normal | `cariLokasiTPS('PASTEUR')` (huruf besar) | [pasteur] | Sesuai harapan | Pass |
| C05-UT15 | `cariLokasiTPS(keyword)` | Batas | `cariLokasiTPS('  dago ')` (spasi di awal dan akhir) | [dago] | Sesuai harapan | Pass |
| C05-UT16 | `cariLokasiTPS(keyword)` | Negatif | `cariLokasiTPS('jakarta')` | List kosong (*notFound*) | List kosong | Pass |
| C05-UT17 | `cariLokasiTPS(keyword)` | Batas | `cariLokasiTPS('')` | Seluruh lokasi (4) | 4 lokasi | Pass |
| C05-UT18 | `getJadwal(idJadwal)` | Normal | Login, `getJadwal('pasteur')` | Objek berisi jadwal Pasteur dan `statusLogin = true` | Sesuai harapan | Pass |
| C05-UT19 | `getJadwal(idJadwal)` | Negatif | `getJadwal('tidak-ada')` | `null` | `null` | Pass |
| C05-UT20 | `getJadwal(idJadwal)` | Normal | Data Pasteur di database berubah menjadi [25 Des 2026] | Data terbaru diambil dengan `getJadwalById` (1 dokumen), bukan seluruh koleksi | `getJadwalById('pasteur')` dipanggil, `getSemuaJadwal` tidak; tanggal [25 Des 2026] | Pass |
| C05-UT21 | `getJadwal(idJadwal)` | Negatif | Model gagal (offline) | Error dilempar ke halaman | Melempar `offline` | Pass |
| C05-UT22 | `susunKalender(bulan, daftarTanggal)` | Normal | November 2026, tanggal [2 Nov 2026] | Sel 2 Nov ditandai pengambilan, 1 Nov tidak | Sesuai harapan | Pass |
| C05-UT23 | `susunKalender(bulan, daftarTanggal)` | Batas | Desember 2026 dengan tanggal 31 Des 2026 dan 1 Jan 2027; Januari 2026 dengan 29 Des 2025 | Tanggal tahun tetangga yang terlihat tetap ditandai (`bulanIni = false`) | Sesuai harapan | Pass |
| C05-UT24 | `bisaGeserBulan(bulan, selisih)` | Batas | Sekarang 31 Des 2026 18:00 UTC (= 1 Jan 2027 WIB), tampilan Januari 2027 | Mundur tidak boleh, maju boleh (tahun berjalan 2027 menurut WIB) | Sesuai harapan | Pass |
| C05-UT25 | `bisaGeserBulan(bulan, selisih)` | Batas | Tahun berjalan 2026: Januari mundur, Januari maju, Desember maju, Desember mundur | false, true, false, true | Sesuai harapan | Pass |
| C05-UT26 | `toggleTanggal(daftarTanggal, kunci)` | Normal | [2 Nov, 9 Nov] + `'2026-11-05'` | [2 Nov, 5 Nov, 9 Nov] pukul 00:00 WIB; list asli tidak berubah | Sesuai harapan | Pass |
| C05-UT27 | `apakahBerubah(daftarAwal, daftarBaru)` | Batas | Hari sama, urutan dan jam berbeda, ada duplikat | `false` | `false` | Pass |
| C05-UT28 | `apakahBerubah(daftarAwal, daftarBaru)` | Normal | Satu tanggal dihapus; satu tanggal ditambah | `true` untuk keduanya | `true` | Pass |
| C05-UT29 | `apakahBerubah(daftarAwal, daftarBaru)` | Batas | Tanggal dipilih lalu dibatalkan lagi dengan `toggleTanggal` | `false` | `false` | Pass |
| C05-UT30 | `toggleTanggal(daftarTanggal, kunci)` | Normal | [2 Nov, 9 Nov] dengan `'2026-11-02'` | [9 Nov] (tanggal yang sudah ada dihapus) | Sesuai harapan | Pass |
| C05-UT31 | `susunKalender(bulan, daftarTanggal, sekarang)` | Batas | Sekarang 5 Nov 2026 18:00 UTC (= 6 Nov 01:00 WIB) | Penanda hari ini pada 6 Nov, bukan 5 Nov | Sesuai harapan | Pass |
| C05-UT32 | `susunKalender(bulan, daftarTanggal)` | Normal | November 2026 (1 Nov hari Minggu, 30 hari) | 35 sel; sel pertama 1 Nov, sel terakhir 5 Des (`bulanIni = false`) | Sesuai harapan | Pass |
| C05-UT33 | `susunKalender(bulan, daftarTanggal)` | Normal | Oktober 2026 (1 Okt hari Kamis) | Sel pertama 27 Sep (`bulanIni = false`), sel ke-5 1 Okt | Sesuai harapan | Pass |
| C05-UT34 | `geserBulan(bulan, selisih)` | Batas | Desember 2026 + 1; Januari 2026 − 1 | Januari 2027; Desember 2025 | Sesuai harapan | Pass |
| C05-UT35 | `getJudulBulan(bulan)`, `getTeksHariIni(sekarang)` | Normal | Oktober 2026; 5 Okt 2026 | "Oktober 2026"; "Senin, 5 Oktober 2026" | Sesuai harapan | Pass |
| C05-UT36 | `getBulanIni(sekarang)` | Batas | 31 Okt 2026 20:00 UTC (= 1 Nov WIB) | `{ tahun: 2026, bulan: 10 }` (November) | Sesuai harapan | Pass |

Tabel 4.2.4b. Ringkasan Cakupan Kelas C05

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `getDaftarJadwal()`, `cariLokasiTPS(keyword)`, `getJadwal(idJadwal)`, `cekStatusLogin()`, `editJadwal(idJadwal, daftarTanggalBaru)`. Operasi bantuan kalender pada implementasi (Tabel B.1 No. 12 dokumen Implementasi): `apakahBerubah()`, `toggleTanggal()`, `getBulanIni()`, `geserBulan()`, `bisaGeserBulan()`, `getJudulBulan()`, `getTeksHariIni()`, `susunKalender()`. |
| Operasi yang diuji | Seluruh operasi di atas (13 dari 13 operasi public). `cekStatusLogin()` diuji melalui C05-UT01 s.d. C05-UT03. |
| ID Algoritma yang tercakup | Algo-JC-001 (`getDaftarJadwal`), Algo-JC-002 (`cariLokasiTPS`), Algo-JC-003 (`getJadwal`), Algo-JC-004 (`editJadwal`); Q-JC-001 dan Q-JC-002 (melalui *mock* model). |
| Coverage (wajib ≥ 70%) | `src/ecotrack/src/controller/JadwalController.js`: **100% baris, 80,76% cabang, 100% fungsi**. Cabang yang tidak tercakup hanya nilai bawaan parameter `sekarang = new Date()` dan `keyword ?? ''`. Alat: Jest Coverage (Istanbul). |

### 4.2.5 Kelas InformasiSampah

**ID Kelas:** *[C07]*  
**Nama Kelas:** *[InformasiSampah]*  
**Tingkat:** *[Mendalam]*

Tabel 4.2.5. Hasil Pengujian Unit Kelas [C07]

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C07-UT01 | `getMain()` | Normal | Firestore (mock) mengembalikan 4 dokumen: plastik, kaca, logam, organik | List berisi 4 objek berurutan, masing-masing memiliki `idSampah` | List berisi 4 objek dengan `idSampah` plastik, kaca, logam, organik | Pass |
| C07-UT02 | `getMain()` | Batas | Koleksi `informasiSampah` kosong | Mengembalikan list kosong dan `cariInformasi("")` juga list kosong | Mengembalikan `[]` | Pass |
| C07-UT03 | `getMain()` | Negatif | Snapshot berasal dari cache (`fromCache = true`, simulasi offline) | Melempar error "Tidak bisa terhubung ke server" | Error "Tidak bisa terhubung ke server" dilempar | Pass |
| C07-UT04 | `getDetail(id)` | Normal | id = "plastik", dokumen ada | Objek `{ idSampah: "plastik", nama: "Plastik", jenisSampah: "anorganik" }` | Objek sesuai harapan dikembalikan | Pass |
| C07-UT05 | `getDetail(id)` | Batas | id = "" dan id = undefined | Mengembalikan `null` tanpa memanggil Firestore | `null`, `getDoc` tidak dipanggil | Pass |
| C07-UT06 | `getDetail(id)` | Negatif | id = "styrofoam", dokumen tidak ada | Mengembalikan `null` | `null` | Pass |
| C07-UT07 | `getDetail(id)` | Negatif | Snapshot dari cache (offline) | Melempar error "Tidak bisa terhubung ke server" | Error dilempar | Pass |
| C07-UT08 | `cariInformasi(query)` | Normal | query = "Plastik" | Hanya kategori plastik | `["plastik"]` | Pass |
| C07-UT09 | `cariInformasi(query)` | Normal | query = "aluminium" (hanya cocok dengan nama tipe "Kaleng Aluminium") | Hanya kategori logam | `["logam"]` | Pass |
| C07-UT10 | `cariInformasi(query)` | Batas | query = "  BOTOL  " (huruf besar dan spasi) | Kategori plastik dan kaca | `["plastik", "kaca"]` | Pass |
| C07-UT11 | `cariInformasi(query)` | Batas | query = "" dan query = null | Seluruh data (4 kategori) | 4 kategori dikembalikan | Pass |
| C07-UT12 | `cariInformasi(query)` | Negatif | query = "styrofoam" (termasuk data organik tanpa atribut `tipe`) | List kosong tanpa error | `[]` | Pass |
| C07-UT13 | `cariBarcode(barcode)` | Normal | barcode = "2000000000015" (terdaftar) | Objek produk dengan `idSampah: "plastik"`, `idTipe: "botol-plastik"` | Objek produk sesuai harapan | Pass |
| C07-UT14 | `cariBarcode(barcode)` | Batas | barcode = "   " | Mengembalikan `null` tanpa memanggil Firestore | `null`, `getDoc` tidak dipanggil | Pass |
| C07-UT15 | `cariBarcode(barcode)` | Negatif | barcode = "9999999999999" (tidak terdaftar) | Mengembalikan `null` | `null` | Pass |
| C07-UT16 | `cariBarcode(barcode)` | Negatif | Snapshot dari cache (offline) | Melempar error "Tidak bisa terhubung ke server" | Error dilempar | Pass |

Tabel 4.2.5b. Ringkasan Cakupan Kelas [C07]

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `getDetail(id)`, `getMain()`, `cariInformasi(query)` (ditambah `cariBarcode(barcode)` pada implementasi) |
| Operasi yang diuji | `getDetail(id)`, `getMain()`, `cariInformasi(query)`, `cariBarcode(barcode)` |
| ID Algoritma yang tercakup | Algo-IS-001, Algo-IS-002, Algo-IS-003 |
| Coverage (wajib ≥ 70%) | [... % baris / ... % cabang], Jest `--coverage`, bukti pada 4.6 |

### 4.2.6 Kelas InformasiSampahController

**ID Kelas:** *[C08]*  
**Nama Kelas:** *[InformasiSampahController]*  
**Tingkat:** *[Sedang]*

Tabel 4.2.6. Hasil Pengujian Unit Kelas [C08]

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C08-UT01 | `getMain()` | Normal | Model (mock) mengembalikan `[Plastik]` | Controller mengembalikan `[Plastik]` | `[Plastik]` | Pass |
| C08-UT02 | `getMain()` | Gagal | Model melempar error "Tidak bisa terhubung ke server" | Error diteruskan ke pemanggil | Error diteruskan | Pass |
| C08-UT03 | `getDetail(id)` | Normal | id = "plastik" | Model dipanggil dengan "plastik", hasil diteruskan | Model dipanggil dengan "plastik", objek Plastik dikembalikan | Pass |
| C08-UT04 | `getDetail(id)` | Gagal | id = "styrofoam", model mengembalikan `null` | Mengembalikan `null` | `null` | Pass |
| C08-UT05 | `cariInformasi(query)` | Normal | query = "plastik" | Model dipanggil dengan "plastik", hasil diteruskan | `[Plastik]` | Pass |
| C08-UT06 | `cariInformasi(query)` | Gagal | query = "styrofoam", model mengembalikan `[]` | Mengembalikan list kosong | `[]` | Pass |
| C08-UT07 | `cariBarcode(barcode)` | Normal | barcode = "2000000000015" | Data produk dari model diteruskan | Objek dengan `idSampah: "plastik"` | Pass |
| C08-UT08 | `cariBarcode(barcode)` | Gagal | Model melempar error | Error diteruskan ke pemanggil | Error diteruskan | Pass |

### 4.2.7 Kelas InformasiSampahInterface

**ID Kelas:** *[C09]*  
**Nama Kelas:** *[InformasiSampahInterface]*  
**Tingkat:** *[Tidak perlu]*

### 4.2.7 Kelas PemindaiController

**ID Kelas:** *C10*  
**Nama Kelas:** *PemindaiController*  
**Tingkat:** *Mendalam*

Tabel 4.2.7. Hasil Pengujian Unit Kelas PemindaiController

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C10-UT01 | identifikasi() | Normal | Pengguna menekan tombol pemindai saat kamera aktif, lalu layanan AI mengenali 2 objek sampah (Botol & Kaleng) | Hasil deteksi dan ukuran foto tersimpan untuk ditampilkan, status memuat (loading) berhenti, dan berkas foto sementara dihapus | Data 2 objek sampah berhasil diterima, status memuat berhenti, dan berkas foto sementara langsung dihapus | Pass |
| C10-UT02 | identifikasi() | Batas | Kamera berhasil memotret, tetapi layanan AI tidak menemukan satu pun objek sampah di dalam foto (hasil kosong) | Sistem tetap menampilkan foto dengan daftar deteksi kosong beserta pesan pemberitahuan, dan berkas foto sementara tetap dihapus | Daftar deteksi kosong ([]) tercatat bersama pesan dari sistem, ukuran foto menggunakan ukuran bawaan kamera (640x480), dan berkas foto dihapus | Pass |
| C10-UT03 | identifikasi() | Negatif | Tombol pemindai ditekan saat kamera belum siap atau proses sebelumnya masih berjalan | Sistem mengabaikan perintah tersebut agar tidak terjadi pemrosesan ganda | Perintah langsung dihentikan tanpa mengirim permintaan ke server | Pass |
| C10-UT04 | identifikasi() | Negatif | Proses identifikasi gagal karena koneksi internet terputus atau server bermasalah | Muncul pesan peringatan kegagalan kepada pengguna, status memuat berhenti, dan berkas foto sementara tetap dihapus | Pesan peringatan "Gagal mengidentifikasi" muncul, berkas foto tetap dihapus, dan status memuat berhenti | Pass |
| C10-UT05 | cariKode() | Normal | Memasukkan atau memindai kode barcode produk yang terdaftar (899123) beserta jenis sampahnya (plastik) | Data nama produk dan panduan jenis sampahnya berhasil dimuat, serta status memuat berhenti | Informasi produk dan panduan sampah "plastik" berhasil dimuat dengan lengkap | Pass |
| C10-UT06 | cariKode() | Batas | Kamera menangkap kode barcode yang sama berkali-kali secara beruntun dalam waktu sepersekian detik | Sistem mengunci pemindaian pertama sehingga pencarian ke basis data hanya dilakukan 1 kali, bukan berulang-ulang | Pencarian ke basis data hanya dijalankan 1 kali untuk kode pertama ("111111"), sedangkan pindaian susulan diabaikan | Pass |
| C10-UT07 | cariKode() | Negatif | Memindai kode barcode yang belum tercatat di basis data (0000000000000) | Sistem menandai kode tersebut sebagai "tidak terdaftar" dan tidak menampilkan kartu informasi produk | Kode tercatat sebagai tidak terdaftar dan kartu hasil produk tetap kosong | Pass |
| C10-UT08 | cariKode() | Negatif | Terjadi gangguan jaringan saat mencari data barcode ke basis data | Muncul pesan peringatan gagal mencari barcode dan kunci pemindaian dibuka kembali agar pengguna bisa mencoba memindai ulang | Pesan peringatan "Gagal mencari barcode" tampil dan pemindai siap digunakan kembali untuk percobaan berikutnya | Pass |
| C10-UT09 | onBarcodeScanned() | Normal | Kamera mendeteksi kode QR/barcode (QR123) saat layar dalam keadaan siap memindai | Sistem otomatis meneruskan kode tersebut ke proses pencarian data produk | Proses pencarian produk otomatis dijalankan untuk kode "QR123" | Pass |
| C10-UT10 | onBarcodeScanned() | Negatif | Kamera mendeteksi barcode baru saat hasil pemindaian foto sampah sebelumnya masih tampil di layar | Sistem mengabaikan barcode baru tersebut agar tidak menimpa hasil yang sedang dilihat pengguna | Pemindaian barcode baru diabaikan sepenuhnya | Pass |
| C10-UT11 | setMode() & pindaiLagi() | Normal | Pengguna mengganti mode dari Sampah ke Barcode saat lampu kilat (flash) menyala, lalu menekan tombol Pindai Lagi | Lampu kilat otomatis dimatikan, mode berpindah, dan seluruh hasil pemindaian sebelumnya dibersihkan seperti semula | Mode berpindah ke Barcode, lampu kilat mati, dan seluruh hasil pemindaian sebelumnya bersih kembali | Pass |


Tabel 4.2.7b. Ringkasan Cakupan Kelas PemindaiController

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | startPemindaian(), prosesFrame(), prosesBarcode() (diimplementasikan sebagai identifikasi(), cariKode(), onBarcodeScanned(), scanLagi(), setMode(), pindaiLagi(), pilih()) | 
| Operasi yang diuji | identifikasi(), cariKode(), onBarcodeScanned(), scanLagi(), setMode(), pindaiLagi(), pilih() | 
| ID Algoritma yang tercakup | Algo-PC-001, Algo-PC-002 | 
| Coverage (wajib ≥ 70%) | 100% line / 88.88% branch, tool: Jest, bukti pada Subbab 4.6 | 

### 4.2.8 Kelas sampahModel

**ID Kelas:** *C12*  
**Nama Kelas:** *sampahModel*  
**Tingkat:** *Sedang*

Tabel 4.2.8. Hasil Pengujian Unit Kelas C12

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C12-UT01 | kirimFoto() | Normal | Mengirim data foto sampah saat pengguna sudah masuk (login) dan server merespons berhasil | Foto terkirim ke server AI beserta identitas token pengguna, lalu daftar objek sampah yang terdeteksi dikembalikan | Foto berhasil dikirim beserta identitas pengguna dan data hasil deteksi diterima dengan sesuai | Pass |
| C12-UT02 | kirimFoto() | Batas | Mengirim data foto sampah saat pengguna memakai aplikasi sebagai tamu (tanpa login) | Foto tetap dapat dikirim ke server AI tanpa token identitas dan tetap menghasilkan deteksi sampah | Permintaan tetap terkirim sebagai pengguna umum dan hasil deteksi berhasil diterima | Pass |
| C12-UT03 | kirimFoto() | Negatif | Mengirim data foto yang rusak sehingga ditolak oleh server AI | Sistem menangkap penolakan dari server dan meneruskan pesan kesalahan yang jelas | Sistem menampilkan pesan kesalahan sesuai respons server ("Gambar tidak valid" atau "Permintaan gagal") | Pass |
| C12-UT04 | hapusFile() | Normal & Negatif | Menghapus berkas foto sementara pada 3 kondisi: berkas masih ada, berkas sudah terhapus, dan akses penyimpanan ditolak | Berkas dihapus jika memang ada; jika berkas tidak ada atau akses ditolak, aplikasi tetap berjalan normal tanpa error | Berkas dihapus hanya saat tersedia, dan aplikasi tetap berjalan stabil tanpa gangguan pada kondisi gagal | Pass |

Tabel 4.2.8b. Ringkasan Cakupan Kelas PemindaiController

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | kirimFoto(), hapusFile() | 
| Operasi yang diuji | kirimFoto(), hapusFile() | 
| ID Algoritma yang tercakup | Algo-PC-001 | 
| Coverage (wajib ≥ 70%) | 100% line / 90% branch, tool: Jest, bukti pada Subbab 4.6 |

### 4.2.9 Kelas barcodeModel

**ID Kelas:** *C13*  
**Nama Kelas:** *barcodeModel*  
**Tingkat:** *Sedang*

Tabel 4.2.9. Hasil Pengujian Unit Kelas C13

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C13-UT01 | cariProduk() | Normal | Mencari kode barcode standar (8992761139018) yang sudah tersimpan di basis data | Sistem mengembalikan informasi lengkap produk beserta kategori jenis sampahnya | Informasi nama produk dan kategori sampah berhasil ditemukan dari basis data | Pass |
| C13-UT02 | cariProduk() | Batas | Memasukkan kode barcode dengan spasi berlebih atau perbedaan panjang standar 12 digit (UPC-A) dengan 13 digit awalan angka 0 (EAN-13) | Sistem otomatis membersihkan spasi serta mencocokkan variasi 12 dan 13 digit secara dua arah hingga produk ditemukan | Spasi dibersihkan dan variasi kode 12 digit maupun 13 digit berhasil dicocokkan dengan tepat | Pass |
| C13-UT03 | cariProduk() | Negatif | Menguji masukan kosong/spasi | Sistem mengembalikan hasil kosong (null) tanpa error | Masukan kosong ditangani dengan aman tanpa membuat aplikasi terhenti | Pass |
| C13-UT03 | ambilInfoSampah() | Normal & Negatif | Mengambil panduan daur ulang untuk kategori valid ("plastik"), serta saat basis data sedang luring (offline) | Panduan daur ulang dikembalikan untuk kategori valid; untuk gangguan basis data, sistem mengembalikan hasil kosong (null) tanpa error | Panduan sampah "plastik" berhasil dimuat, sedangkan gangguan koneksi ditangani dengan aman tanpa membuat aplikasi terhenti | Pass |

Tabel 4.2.9b. Ringkasan Cakupan Kelas BarcodeModel

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | cariProduk(), ambilInfoSampah() |
| Operasi yang diuji | cariProduk(), ambilInfoSampah() |
| ID Algoritma yang tercakup | Algo-PC-002 |
| Coverage (wajib ≥ 70%) | 100% line / 100% branch, tool: Jest, bukti pada Subbab 4.6 |

<br>


## 4.3 Pengujian Integrasi

Tabel 4.3.1. Daftar Antarmuka Antarkomponen

| ID Antarmuka | Komponen Asal | Komponen Tujuan | Jenis Batas | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| I-01 | AkunPetugasController (`signUp`) | AkunPetugas (`verifikasiPetugas`, `createAkunPetugas`) → Cloud Firestore (`dataPemerintah`, `akunPetugas`, `nikTerdaftar`) dan Firebase Authentication | Controller - Model, Aplikasi - Basis data, Aplikasi - Sistem eksternal | INT-I01-TC01, INT-I01-TC02 |
| I-02 | AkunPetugasController (`prosesLogin`) | AkunPetugas (`loginAuth`) → Firebase Authentication dan Cloud Firestore (`akunPetugas`) | Controller - Model, Aplikasi - Sistem eksternal, Aplikasi - Basis data | INT-I02-TC01, INT-I02-TC02 |
| I-03 | InformasiSampahInterface (`informasi/index.jsx`) → InformasiSampahController | InformasiSampah (Model) → Firestore koleksi `informasiSampah` | View - Controller - Model; Aplikasi - Basis data | INT-I03-TC01, INT-I03-TC02, INT-I03-TC03 |
| I-04 | InformasiSampahInterface (`informasi/index.jsx`) → InformasiSampahController | InformasiSampah (Model) | View - Controller - Model | INT-I04-TC01, INT-I04-TC02 |
| I-05 | InformasiSampahInterface (`informasi/[idSampah]/index.jsx`) → InformasiSampahController | InformasiSampah (Model) → Firestore dokumen `informasiSampah/{id}` | View - Controller - Model; Aplikasi - Basis data | INT-I05-TC01, INT-I05-TC02, INT-I05-TC03 |
| I-06 | InformasiSampahInterface (`TutorialModal.jsx`) | Data tipe sampah dari InformasiSampah (Model) | View - Model | INT-I06-TC01, INT-I06-TC02 |
| I-07 | JadwalController (`getDaftarJadwal`, `cariLokasiTPS`) | Jadwal (Model, `getSemuaJadwal`) → Cloud Firestore (`jadwal`) | Controller - Model, Aplikasi - Basis data | INT-I07-TC01, INT-I07-TC02 |
| I-08 | JadwalController (`cariLokasiTPS`) | Jadwal (Model) → Cloud Firestore (`jadwal`) | Controller - Model, Aplikasi - Basis data | INT-I08-TC01 |
| I-09 | JadwalController (`getJadwal`, `susunKalender`) | Jadwal (Model) → Cloud Firestore (`jadwal`) | Controller - Model, Aplikasi - Basis data | INT-I09-TC01, INT-I09-TC02, INT-I09-TC03 |
| I-10 | JadwalController (`getJadwal`, `cekStatusLogin`) | AkunPetugas (Model) → Firebase Authentication dan Cloud Firestore (`akunPetugas`) | Controller - Model, Aplikasi - Sistem eksternal | INT-I10-TC01, INT-I10-TC02 |
| I-11 | JadwalController (`getJadwal`, `toggleTanggal`, `apakahBerubah`) | Jadwal (Model) → Cloud Firestore (`jadwal`) | Controller - Model, Aplikasi - Basis data | INT-I11-TC01 |
| I-12 | JadwalController (`editJadwal`) | Jadwal (Model, `simpanJadwal`) → Cloud Firestore (`jadwal`, *transaction*) | Controller - Model, Aplikasi - Basis data | INT-I12-TC01 |
| I-13 | JadwalController (`getJadwal` setelah `editJadwal`) | Jadwal (Model) → Cloud Firestore (`jadwal`) | Controller - Model, Aplikasi - Basis data | INT-I13-TC01 |
| I-14 | JadwalController (`editJadwal`) | Jadwal (Model) → Cloud Firestore dan *Security Rules* (`firestore.rules`) | Aplikasi - Basis data, Aplikasi - Sistem eksternal | INT-I14-TC01, INT-I14-TC02 |
| I-15 | AkunPetugasController (`getProfil`) | AkunPetugas (`getProfil`, `getNamaWilayah`) → Cloud Firestore (`akunPetugas`, `jadwal`) | Controller - Model, Aplikasi - Basis data | INT-I15-TC01 |
| I-16 | AkunPetugasController (`editProfil`) | AkunPetugas (`editProfil`) → Cloud Firestore (`akunPetugas`, *transaction*) dan Firebase Authentication | Controller - Model, Aplikasi - Basis data, Aplikasi - Sistem eksternal | INT-I16-TC01 |
| I-17 | AkunPetugasController (`editProfil`) | AkunPetugas (`editProfil`) → Cloud Firestore (`akunPetugas`, *transaction*) dan Firebase Authentication | Controller - Model, Aplikasi - Basis data, Aplikasi - Sistem eksternal | INT-I17-TC01 |
| I-18 | AkunPetugasController (`editProfil`) | AkunPetugas (`editProfil`) → Cloud Firestore (`akunPetugas`, *transaction*) dan Firebase Authentication | Controller - Model, Aplikasi - Basis data, Aplikasi - Sistem eksternal | INT-I18-TC01 |
| I-19 | AkunPetugasController (`logout`) | AkunPetugas (`logout`) → Firebase Authentication (`signOut`) | Controller - Model, Aplikasi - Sistem eksternal | INT-I19-TC01 |
| I-20 | AkunPetugasController (`changePassword`) | AkunPetugas (`changePassword`) → Firebase Authentication (`updatePassword`) | Controller - Model, Aplikasi - Sistem eksternal | INT-I20-TC01 |
| I-21 | AkunPetugasController (`changePassword`) | AkunPetugas (`changePassword`) → Firebase Authentication (`updatePassword`) | Controller - Model, Aplikasi - Sistem eksternal | INT-I21-TC01 |
| I-22 | AkunPetugasController (`changePassword`) | AkunPetugas (`changePassword`) → Firebase Authentication (`updatePassword`) | Controller - Model, Aplikasi - Sistem eksternal | INT-I22-TC01 |
| I-23 | PemindaiInterface -> PemindaiController | SampahModel dan BarcodeModel | Controller - Model | INT-I23-TC01, INT-I23-TC02 |
| I-24 | PemindaiInterface -> PemindaiController | SampahModel -> Cloudflare Worker API (ai-penilai.3no.workers.dev) | Aplikasi - Sistem eksternal | INT-I24-TC01, INT-I24-TC02 |
| I-25 | PemindaiInterface -> PemindaiController | BarcodeModel -> Cloud Firestore (barcodeProduk) | Aplikasi - basis data | INT-I25-TC01, INT-I25-TC02 |

Tabel 4.3.2. Hasil Pengujian Integrasi

| ID Pengujian | ID Antarmuka | Skenario | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| INT-I01-TC01 | I-01 | Normal: registrasi petugas valid melalui Controller | Jalankan `AkunPetugasController.signUp(...)` dengan nama lengkap dan NIK valid dari koleksi `dataPemerintah` (belum ada di `nikTerdaftar`), email baru, nomor telepon, serta kata sandi dan konfirmasi yang cocok | *Controller* meneruskan verifikasi NIK ke `AkunPetugas`, membuat akun di Firebase Auth, menyimpan dokumen `akunPetugas/{uid}` dan `nikTerdaftar/{nik}` di Firestore via `writeBatch`, mengisi `statusLogin = true`, dan mengembalikan `'BERHASIL'` | *Controller* berhasil meneruskan registrasi ke `AkunPetugas`, akun Auth dan dokumen Firestore tersimpan, `statusLogin = true`, dan mengembalikan `'BERHASIL'` | Pass |
| INT-I01-TC02 | I-01 | Normal: dokumen `akunPetugas` dan `nikTerdaftar` tersimpan di Cloud Firestore | Setelah registrasi berhasil, baca dokumen `akunPetugas/{uid}` dan `nikTerdaftar/{nik}` di Cloud Firestore | Dokumen `akunPetugas/{uid}` berisi `username`, `nik`, `email`, `noTelepon`, dan `wilayahTugas` yang sesuai, serta dokumen `nikTerdaftar/{nik}` berisi `uid` | Dokumen `akunPetugas/{uid}` dan `nikTerdaftar/{nik}` berhasil tersimpan di Cloud Firestore dengan data yang sesuai | Pass |
| INT-I02-TC01 | I-02 | Normal: login petugas dengan kredensial valid membentuk sesi aktif | Jalankan `AkunPetugasController.prosesLogin(email, password)` dengan email dan kata sandi valid terhadap Firebase Authentication | Firebase Authentication mengautentikasi kredensial, profil `akunPetugas/{uid}` dimuat ke `AkunPetugas` (`statusLogin = true`), sesi aktif terbentuk, dan *Controller* mengembalikan `'BERHASIL'` | Kredensial berhasil diautentikasi oleh Firebase Auth, data profil dimuat ke `AkunPetugas`, sesi aktif terbentuk, dan *Controller* mengembalikan `'BERHASIL'` | Pass |
| INT-I02-TC02 | I-02 | Gagal: login dengan kata sandi salah ditolak Firebase Authentication | Jalankan `AkunPetugasController.prosesLogin(email, 'SandiSalah999')` pada akun yang sudah terdaftar | Firebase Authentication menolak kredensial (`auth/invalid-credential`), `loginAuth` mengembalikan `false`, sesi tidak terbentuk, dan *Controller* mengembalikan `'KREDENSIAL_SALAH'` | Firebase Auth menolak kredensial salah, `auth.currentUser` tetap `null`, dan *Controller* mengembalikan `'KREDENSIAL_SALAH'` | Pass |
| INT-I03-TC01 | I-03 | Normal: memuat daftar kategori | Jalankan aplikasi dengan koneksi internet, buka tab Daur Ulang | Tampil 10 kartu kategori sesuai koleksi `informasiSampah` (Plastik, Kaca, Logam, Kertas & Karton, Organik, Elektronik, Lainnya, Keramik & Porselen, Tekstil & Kain, Minyak Jelantah) | 10 kartu kategori tampil dengan gambar, nama, dan ringkasan sesuai data Firestore | Pass |
| INT-I03-TC02 | I-03 | Normal: pencarian material | Ketik "botol" pada kolom Cari Material Sampah | Hanya kartu Plastik dan Kaca yang tampil, tanpa request Firestore baru | Kartu Plastik dan Kaca tampil | Pass |
| INT-I03-TC03 | I-03 | Gagal: database tidak dapat diakses | Aktifkan mode pesawat, buka ulang tab Daur Ulang; lalu matikan mode pesawat dan tekan "Coba Lagi" | Tampil pesan "Gagal memuat informasi sampah." dan tombol "Coba Lagi"; setelah koneksi pulih, kartu kategori tampil kembali | Pesan gagal dan tombol "Coba Lagi" tampil; setelah ditekan, kartu kategori kembali tampil | Pass |
| INT-I04-TC01 | I-04 | Gagal: material tidak ditemukan | Ketik "styrofoam" pada kolom pencarian | Tampil "Material tidak ditemukan" dan "Coba kata kunci lain atau periksa ejaan pencarianmu" | Tampilan kosong dengan kedua pesan muncul | Pass |
| INT-I04-TC02 | I-04 | Batas: menghapus kata kunci | Dari kondisi INT-I04-TC01, hapus seluruh kata kunci | Seluruh 10 kartu kategori tampil kembali | 10 kartu kategori tampil kembali | Pass |
| INT-I05-TC01 | I-05 | Normal: membuka detail kategori | Tekan kartu Plastik | Judul "Sampah Plastik", label "Anorganik", deskripsi, serta kartu tipe Botol Plastik, Wadah Plastik, dan Kantong Plastik dengan pilihan "Dibuang ke Sampah Anorganik" dan "Kreasikan Menjadi Barang Baru" | Detail Plastik tampil sesuai dokumen `informasiSampah/plastik` | Pass |
| INT-I05-TC02 | I-05 | Normal: jenis sampah limbah cair | Tekan kartu Minyak Jelantah | Label "Limbah Cair" dan pilihan metode "Kelola sebagai Limbah Cair" | Label dan judul metode sesuai | Pass |
| INT-I05-TC03 | I-05 | Gagal: database tidak dapat diakses | Aktifkan mode pesawat, lalu buka detail kategori | Tampil "Gagal memuat informasi sampah. Periksa koneksi internetmu." dan tombol "Coba Lagi" | Pesan gagal dan tombol "Coba Lagi" tampil | Pass |
| INT-I06-TC01 | I-06 | Normal: panduan kreasi | Pada detail Plastik, tekan "Kreasikan Menjadi Barang Baru" pada Botol Plastik, lalu tekan tombol tutup | Pop-up berjudul "Kreasikan Menjadi Barang Baru", subjudul "Botol Plastik", langkah-langkah, dan contoh hasil kreasi; pop-up tertutup saat tombol tutup ditekan | Pop-up tampil dengan langkah dan contoh hasil, lalu tertutup | Pass |
| INT-I06-TC02 | I-06 | Normal: panduan pembuangan | Tekan "Dibuang ke Sampah Anorganik" pada Botol Plastik | Pop-up berisi langkah pembuangan tanpa bagian contoh hasil kreasi | Pop-up tampil dengan 4 langkah pembuangan tanpa contoh hasil | Pass |
| INT-I07-TC01 | I-07 | Normal: menampilkan daftar lokasi TPS | Panggil `JadwalController.getDaftarJadwal()`, lalu bandingkan dengan koleksi `jadwal` yang dibaca langsung dari server | Jumlah dan ID lokasi sama dengan database (151 lokasi), terurut per kecamatan lalu kelurahan | 151 lokasi sama dengan database dan terurut per kecamatan lalu kelurahan (378 ms) | Pass |
| INT-I07-TC02 | I-07 | Normal: mencari lokasi TPS | Setelah INT-I07-TC01, `cariLokasiTPS('coblong')`, lalu bandingkan dengan dokumen di database yang kecamatan/kelurahannya memuat "coblong" | Hasil tidak kosong dan ID lokasi sama dengan hasil penyaringan dari database | 6 lokasi Kecamatan Coblong, sama dengan database (160 ms) | Pass |
| INT-I08-TC01 | I-08 | Gagal: lokasi yang dicari tidak terdata | `cariLokasiTPS('Bekasi')` | Mengembalikan daftar kosong (halaman menampilkan "Lokasi TPS tidak ditemukan") | Daftar kosong (< 1 ms) | Pass |
| INT-I09-TC01 | I-09 | Normal: masyarakat (belum login) membuka halaman jadwal lokasi TPS | Tanpa login, panggil `JadwalController.getJadwal('lebak-siliwangi')`, lalu bandingkan dengan dokumen `jadwal/lebak-siliwangi` yang dibaca langsung dari server | Kecamatan, kelurahan, dan seluruh tanggal sama dengan database; `statusLogin = false`, `bolehEdit = false` | Data sama dengan database, `statusLogin = false`, `bolehEdit = false` (21 ms) | Pass |
| INT-I09-TC02 | I-09 | Gagal: lokasi tidak ada di database | `getJadwal('kelurahan-tidak-ada')` | Mengembalikan `null` (halaman menampilkan "Lokasi TPS tidak ditemukan") | `null` (6 ms) | Pass |
| INT-I09-TC03 | I-09 | Normal: penanda kalender sesuai data database | Ambil jadwal Lebak Siliwangi, susun kalender bulan tanggal pertamanya dengan `susunKalender()` | Sel yang ditandai pengambilan pada bulan itu sama persis dengan tanggal di database | Sel yang ditandai sama dengan tanggal di database (7 ms) | Pass |
| INT-I10-TC01 | I-10 | Normal: petugas login di wilayah tugasnya | Login ke Authentication emulator sebagai `petugas@ecotrack.test` / `Petugas123!`, lalu `getJadwal('lebak-siliwangi')` | `getWilayahTugas()` = `lebak-siliwangi` (dibaca dari `akunPetugas`); `statusLogin = true`, `bolehEdit = true` | Sesuai harapan (41 ms) | Pass |
| INT-I10-TC02 | I-10 | Gagal: petugas membuka jadwal wilayah lain | Masih login, `getJadwal('pasteur')` | `statusLogin = true`, `bolehEdit = false` (tombol EDIT JADWAL tidak tampil) | Sesuai harapan (10 ms) | Pass |
| INT-I11-TC01 | I-11 | Normal: memilih lalu membatalkan tanggal di form edit | Ambil jadwal, `toggleTanggal(awal, '2026-12-25')`, lalu `toggleTanggal` lagi pada tanggal yang sama; baca database | `apakahBerubah` = `true` setelah dipilih dan `false` setelah dibatalkan; database tidak berubah | Sesuai harapan; isi database tetap (34 ms) | Pass |
| INT-I12-TC01 | I-12 | Normal: petugas menyimpan jadwal baru | Login sebagai petugas Lebak Siliwangi, `editJadwal('lebak-siliwangi', [24 Des 00:00, 21 Des 09:30, 24 Des 00:00])`, lalu baca dokumen dari server | Mengembalikan jadwal [21 Des, 24 Des]; dokumen di database berisi tepat 2 Timestamp pukul 00:00 WIB dan `diperbaruiPada` lebih baru dari sebelumnya | Sesuai harapan (42 ms) | Pass |
| INT-I13-TC01 | I-13 | Normal: detail menampilkan data yang baru disimpan | Setelah INT-I12-TC01, panggil `getJadwal('lebak-siliwangi')` | Tanggal = [21 Des 2026, 24 Des 2026] | Sesuai harapan (11 ms) | Pass |
| INT-I14-TC01 | I-14 | Gagal: *security rules* menolak perubahan jadwal wilayah lain | Masih login sebagai petugas Lebak Siliwangi, `editJadwal('pasteur', [25 Des 2026])` | Firestore menolak (`permission-denied`), `editJadwal` mengembalikan `null` (halaman menampilkan "Jadwal gagal diperbarui"), dokumen Pasteur tidak berubah | `null`, log `permission-denied`, dokumen Pasteur tetap (38 ms) | Pass |
| INT-I14-TC02 | I-14 | Gagal: pengguna belum login mencoba menyimpan | Logout, `editJadwal('lebak-siliwangi', [25 Des 2026])` | Firestore menolak (`permission-denied`), mengembalikan `null`, dokumen tidak berubah | `null`, log `permission-denied`, dokumen tetap [21 Des, 24 Des] (18 ms) | Pass |
| INT-I15-TC01 | I-15 | Normal: pembacaan profil petugas beserta nama wilayah dari Firestore | Pada sesi aktif, panggil `AkunPetugasController.getProfil()` untuk membaca data profil dari `akunPetugas/{uid}` dan nama kelurahan dari `jadwal/{wilayahTugas}` | *Controller* meneruskan pembacaan ke `AkunPetugas` dan mengembalikan objek `{ username, email, noTelepon, wilayahTugas }` dengan nama kelurahan yang sesuai | Objek profil beserta data `email` dan nama wilayah tugas berhasil dibaca dan dikembalikan oleh `getProfil()` | Pass |
| INT-I16-TC01 | I-16 | Normal: pembaruan nomor telepon tersimpan di Cloud Firestore | Pada sesi aktif, panggil `AkunPetugasController.editProfil(emailSaatIni, teleponBaru)`, lalu periksa dokumen `akunPetugas/{uid}` di Cloud Firestore | *Controller* meneruskan pembaruan ke `AkunPetugas`, `noTelepon` diperbarui via `runTransaction` di Firestore, dan mengembalikan `'BERHASIL'` | `editProfil` mengembalikan `'BERHASIL'` dan *field* `noTelepon` pada dokumen `akunPetugas/{uid}` di Cloud Firestore terbarui sesuai nilai baru | Pass |
| INT-I17-TC01 | I-17 | Alternatif: pembaruan email memicu verifikasi email baru | Pada sesi aktif, panggil `AkunPetugasController.editProfil(emailBaru, telepon)` dengan email baru yang berbeda dari email saat ini | *Controller* meneruskan pembaruan ke `AkunPetugas`, memanggil `verifyBeforeUpdateEmail`, memperbarui `noTelepon` di Firestore, dan mengembalikan `'VERIFIKASI_EMAIL'` | Pembaruan kontak diteruskan ke `AkunPetugas`, `verifyBeforeUpdateEmail` dipanggil, `noTelepon` diperbarui, dan status `'VERIFIKASI_EMAIL'` dikembalikan | Pass |
| INT-I18-TC01 | I-18 | Gagal: edit profil ditolak saat sesi tidak aktif atau terjadi galat jaringan | Panggil `AkunPetugasController.editProfil(...)` saat `auth.currentUser` bernilai `null` atau koneksi/operasi terputus | Mengembalikan `'BELUM_LOGIN'` jika sesi kosong, atau `'NETWORK_ERROR'` saat terjadi kegagalan jaringan/autentikasi tanpa mengubah dokumen Firestore | Pembaruan profil ditolak dan status gagal (`'BELUM_LOGIN'` / `'NETWORK_ERROR'`) dikembalikan sesuai kondisi | Pass |
| INT-I19-TC01 | I-19 | Normal: logout mengakhiri sesi autentikasi aktif | Pada sesi aktif, panggil `AkunPetugasController.logout()` | *Controller* meneruskan proses ke `AkunPetugas`, memanggil `signOut(auth)`, mereset atribut sesi, dan mengembalikan `true` | Sesi berhasil diakhiri (`auth.currentUser` menjadi `null`), atribut direset, dan `logout()` mengembalikan `true` | Pass |
| INT-I20-TC01 | I-20 | Normal: ganti kata sandi diperbarui di Firebase Auth dan dipakai login ulang | Panggil `AkunPetugasController.changePassword(passwordBaru)` pada sesi aktif, lakukan `logout()`, lalu login ulang menggunakan `prosesLogin(email, passwordBaru)` | Kata sandi baru diperbarui di Firebase Auth (`updatePassword`), *Controller* mengembalikan `'BERHASIL'`, sesi terhapus saat logout, dan login ulang dengan sandi baru mengembalikan `'BERHASIL'` | Kata sandi berhasil diperbarui (`'BERHASIL'`), sesi terhapus setelah logout, dan login ulang dengan kata sandi baru mengembalikan `'BERHASIL'` | Pass |
| INT-I21-TC01 | I-21 | Normal: status keberhasilan penggantian kata sandi terverifikasi pada sesi aktif | Periksa hasil kembalian `AkunPetugasController.changePassword(passwordBaru)` saat `auth.currentUser` aktif dan kata sandi memenuhi syarat | *Controller* meneruskan perubahan ke `AkunPetugas.changePassword` (`true`) dan mengembalikan `'BERHASIL'` setelah Firebase Auth memperbarui sandi | Operasi `changePassword` mengembalikan `'BERHASIL'` dan kredensial baru terpasang pada akun Firebase Authentication | Pass |
| INT-I22-TC01 | I-22 | Gagal: ganti kata sandi ditolak saat belum login atau sandi lemah | Panggil `AkunPetugasController.changePassword(...)` saat `auth.currentUser` kosong atau saat Firebase Auth menolak kata sandi (`auth/weak-password`) | Mengembalikan `'BELUM_LOGIN'` jika belum login, atau memetakan `auth/weak-password` menjadi `'SANDI_LEMAH'` tanpa mengubah kata sandi | Perubahan kata sandi ditolak dan mengembalikan status gagal (`'BELUM_LOGIN'` / `'SANDI_LEMAH'`) sesuai kondisi | Pass |
| INT-I23-TC01 | I-23 | Normal: Alur terpadu pemindaian barcode dari layar pemindai hingga pengambilan detail sampah | Memanggil cariKode("2000000000015") pada PemindaiController untuk memicu pencarian produk melalui BarcodeModel, lalu meneruskannya ke kartu hasil | Data produk dan informasi panduan daur ulang terhubung dengan benar serta siap ditampilkan pada antarmuka | Data produk dari BarcodeModel berhasil diteruskan dan digabungkan dengan detail panduan sampah di PemindaiController untuk ditampilkan | Pass |
| INT-I23-TC02 | I-23 | Gagal: Penanganan ketika data jenis sampah belum tersedia | Memanggil cariKode("98909899") dari layar pemindai dengan kode barcode produk yang terdaftar, tetapi kode jenis sampahnya belum ada | Kartu hasil tetap menampilkan informasi produk sementara bagian panduan sampah bernilai kosong | Informasi produk tetap berhasil dimuat dan tampil di layar I-25 | Pass |
| INT-I24-TC01 | I-24 | Normal: Pengiriman foto sampah dari layar kamera ke server AI | Mengambil foto pada antarmuka pemindai dan mengirimkan gambar botol plastik melalui kirimFoto() | Server merespons status berhasil dan mengembalikan daftar objek terdeteksi beserta koordinat kotak deteksi untuk ditampilkan pada antarmuka hasil | Server AI merespons dengan status 200 dan mengembalikan objek deteksi botol plastik beserta koordinat dan kategori sampahnya untuk ditampilkan di antarmuka | Pass |
| INT-I24-TC02 | I-24 | Gagal: Pengiriman data gambar tidak valid ke server AI | Mengirimkan teks kosong atau format gambar yang rusak melalui kirimFoto() | Server menolak permintaan tersebut dan aplikasi menangkap pesan kesalahan dari server | Server menolak permintaan dan fungsi meneruskan pesan kesalahan sesuai respons server | Pass |
| INT-I25-TC01 | I-25 | Normal: Pembacaan data produk dari Cloud Firestore | Memanggil cariProduk() dengan kode barcode yang tersimpan di koleksi barcodeProduk, lalu meneruskan kode jenis sampahnya ke ambilInformasiSampah() | Dokumen produk dari koleksi barcodeProduk dan koleksi informasiSampah berhasil dibaca secara lengkap dari basis data | Dokumen produk dan panduan daur ulang berhasil dibaca dari Cloud Firestore sesuai dengan data yang tersimpan | Pass |
| INT-I25-TC02 | I-25 | Gagal: Pencarian kode barcode yang tidak ada di Cloud Firestore | Memanggil cariProduk("9999999999999") secara langsung ke koleksi barcodeProduk dari mode barcode | Basis data mengembalikan hasil kosong sehingga antarmuka menampilkan modal "Barcode Belum Terdaftar" | Fungsi mengembalikan nilai kosong dengan aman | Pass |

<br>

## 4.4 Pengujian Use Case

### 4.4.1 Use Case Melakukan Log In

**ID Use Case:** UC01  
**Nama Use Case:** Melakukan Log In

Tabel 4.4.1. Hasil Pengujian Use Case UC01

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC01-TC01 | KF08 | Normal | 1. Buka aplikasi EcoTrack dan pilih menu **Profil**.<br>2. Pilih tombol/opsi **Masuk / Log In**.<br>3. Masukkan email dan kata sandi akun petugas yang terdaftar.<br>4. Tekan tombol **MASUK**. | Email: `windah@ecotrack.id`<br>Password: *(kata sandi valid)* | Sistem memverifikasi kredensial ke Firebase Authentication dan Firestore (`akunPetugas`), menampilkan notifikasi login berhasil, serta mengarahkan petugas ke halaman utama/profil. | Sistem berhasil memverifikasi kredensial, menampilkan notifikasi *"Selamat datang kembali!"*, dan membuka sesi akun petugas. | Pass |
| UC01-TC02 | KF08 | Alternatif 1: Otorisasi Log In Akun Gagal | 1. Buka menu **Profil** lalu pilih **Masuk / Log In**.<br>2. Masukkan email petugas dengan kata sandi yang salah.<br>3. Tekan tombol **MASUK**. | Email: `windah@ecotrack.id`<br>Password: `SalahPassword123` | Sistem menolak proses autentikasi, menampilkan pesan kesalahan kredensial (email atau kata sandi salah), dan meminta petugas memasukkan kredensial ulang. | Sistem menolak autentikasi, menandai kolom input dengan garis merah, dan menampilkan pesan *"Email/Kata sandi salah"*. | Pass |

### 4.4.2 Use Case Memindai Sampah

**ID Use Case:** *UC02*  
**Nama Use Case:** *Memindai Sampah*

Tabel 4.4.1. Hasil Pengujian Use Case UC02

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC02-TC01 | KF01, KF02, KF06 | Normal | 1. Buka aplikasi EcoTrack dan tekan tombol ikon kamera pada bilah navigasi bawah<br>2. Setujui permintaan akses kamera perangkat<br>3. Arahkan kamera ke objek sampah lalu ambil gambar<br>4. Setelah foto hasil muncul, tekan kotak deteksi pada objek dan tekan tombol "Lihat Cara Daur Ulang" |gambar botol plastik | Foto beku tampil disertai kotak deteksi berlabel "Plastik" dan kategori "Anorganik", lalu pengguna diarahkan ke halaman panduan daur ulang jika menekan tombolnya | Gambar botol plastik terdeteksi dengan kotak berlabel "Plastik" dan tag "Anorganik", serta tombol navigasi mengarah ke halaman panduan daur ulang dengan tepat | Pass |
| UC02-TC02 | KF01 | Alternatif 1: Akses izin kamera ditolak | 1. Buka menu pemindai pada perangkat yang belum memberikan atau menolak izin akses kamera | Izin akses kamera ditolak | Aplikasi menampilkan halaman pemberitahuan "Aplikasi butuh izin kamera untuk mengidentifikasi sampah" beserta tombol "Izinkan Kamera" | Layar pemberitahuan kebutuhan izin kamera dan tombol "Izinkan Kamera" tampil dengan jelas | Pass |
| UC02-TC03 | KF06 | Alternatif 2: Memindai barcode kemasan lewat kamera | 1. Pada layar pemindai, tekan tab "Barcode" di bagian bawah<br>2. Arahkan kamera ke barcode pada kemasan produk yang terdaftar<br> 3. tekan tombol "Lihat Cara Daur Ulang" pada kartu hasil yang muncul | Kemasan produk dengan barcode terdaftar | Sistem menampilkan kartu hasil berisi informasi produk dan kategori sampah yang sesuai | Barcode terbaca otomatis, kartu informasi produk dan kategori sampahnya muncul dari bawah, serta tombol panduan daur ulang berfungsi | Pass |
| UC02-TC04 | KF06 | Alternatif 2b: Memasukkan kode barcode secara manual | 1. Pada mode "Barcode", tekan tombol "Ketik kode barcode"<br>2. Masukkan angka kode barcode produk terdaftar pada kolom isian, lalu tekan "Cari" | 2000000000015 | Sistem menampilkan kartu hasil berisi informasi produk dan kategori sampah yang sesuai | Dialog input tertutup dan kartu informasi produk beserta kategori sampahnya muncul sesuai kode yang diketik | Pass |
| UC02-TC05 | KF06 | Alternatif 3: Kode barcode tidak ditemukan di basis data | 1. Pada mode "Barcode", tekan "Ketik kode barcode"<br>2. Masukkan kombinasi angka acak yang tidak terdaftar, lalu tekan Cari | 101940 (kode tidak terdaftar) | Muncul jendela peringatan ("Barcode Belum Terdaftar") beserta tombol "Tutup" | Jendela peringatan "Barcode Belum Terdaftar" dan tombol "Tutup" tampil di layar pemindai | Pass |
| UC02-TC06 | KF06 | Alternatif 4: Objek sampah tidak terdeteksi / belum tersedia | 1. Pada mode "Sampah", arahkan kamera ke bidang kosong<br>2. Ambil gambar | Foto dinding kosong | Layar hasil menampilkan pesan dari sistem bahwa tidak ada sampah yang terdeteksi dan menampilkan tombol "Pindai Lagi" untuk mengulang pemindaian | Sistem menampilkan pesan bahwa objek tidak terdeteksi beserta tombol "Pindai Lagi" untuk memindai ulang | Pass |

### 4.4.3 Use Case Mengatur Jadwal

**ID Use Case:** UC03  
**Nama Use Case:** Mengatur Jadwal

Tabel 4.4.3. Hasil Pengujian Use Case UC03

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC03-TC01 | KF05 | Normal | 1. Tekan ikon profil, lalu Log In sebagai petugas.<br>2. Buka tab Jadwal, cari dan pilih "Lebak Siliwangi".<br>3. Tekan EDIT JADWAL, lalu geser ke bulan Desember 2026.<br>4. Tekan satu tanggal kosong (menambah) dan satu tanggal hijau (menghapus).<br>5. Tekan SIMPAN, lalu Simpan pada *pop-up*.<br>6. Periksa dokumen `jadwal/lebak-siliwangi` di Emulator UI. | Email: `petugas@ecotrack.test`<br>Kata sandi: `Petugas123!`<br>Tambah: 25 Desember 2026<br>Hapus: 3 Desember 2026 | Tombol EDIT JADWAL tampil (I-10). Halaman edit (I-11) dan *pop-up* "Simpan Jadwal" (I-12) tampil. Muncul *toast* "Jadwal berhasil diperbarui" (I-13) dan aplikasi kembali ke halaman jadwal yang menampilkan 25 Des sebagai hari pengambilan, sedangkan 3 Des tidak lagi. `daftarTanggal` di database ikut berubah dan `diperbaruiPada` diperbarui. | Tombol EDIT JADWAL tampil pada halaman jadwal Lebak Siliwangi. Halaman edit dan *pop-up* "Simpan Jadwal" tampil. Setelah menekan Simpan, muncul *toast* "Jadwal berhasil diperbarui" dan aplikasi kembali ke halaman jadwal yang menampilkan 25 Desember 2026 sebagai hari pengambilan, sedangkan 3 Desember 2026 tidak lagi ditandai. Pada Emulator UI, `daftarTanggal` dokumen `jadwal/lebak-siliwangi` ikut berubah dan `diperbaruiPada` diperbarui, sesuai hasil yang diharapkan. | Pass |
| UC03-TC02 | KF05 | Alternatif: batal pada *pop-up* simpan | 1. Lakukan langkah 1–4 UC03-TC01.<br>2. Tekan SIMPAN, lalu Batal pada *pop-up*. | Tambah: 26 Desember 2026 | *Pop-up* tertutup, form edit tetap terbuka dengan pilihan tanggal yang sama, dan database tidak berubah. | Setelah menekan Batal, *pop-up* tertutup dan form edit tetap terbuka dengan 26 Desember 2026 masih terpilih. Dokumen `jadwal/lebak-siliwangi` di database tidak berubah, sesuai hasil yang diharapkan. | Pass |
| UC03-TC03 | KF05 | Alternatif: penyimpanan gagal (koneksi terputus) | 1. Lakukan langkah 1–4 UC03-TC01.<br>2. Matikan emulator atau putuskan Wi-Fi HP.<br>3. Tekan SIMPAN, lalu Simpan. | Tambah: 29 Desember 2026 | Muncul *toast* "Jadwal gagal diperbarui" (I-14), form tetap terbuka dengan tanggal yang sudah dipilih, dan database tidak berubah. | Saat koneksi terputus, muncul *toast* "Jadwal gagal diperbarui". Form edit tetap terbuka dengan 29 Desember 2026 masih terpilih, dan database tidak berubah, sesuai hasil yang diharapkan. | Pass |
| UC03-TC04 | KF05 | Alternatif: petugas membuka jadwal di luar wilayah tugasnya | 1. Log In sebagai petugas.<br>2. Buka tab Jadwal, pilih "Pasteur". | Lokasi: Kelurahan Pasteur | Halaman jadwal Pasteur tampil tanpa tombol EDIT JADWAL, sehingga petugas tidak dapat mengubah jadwal wilayah lain. | Halaman jadwal Kelurahan Pasteur tampil tanpa tombol EDIT JADWAL sehingga petugas tidak dapat mengubah jadwal wilayah lain, sesuai hasil yang diharapkan. | Pass |
| UC03-TC05 | KF05 | Alternatif: keluar dari form saat ada perubahan belum disimpan | 1. Lakukan langkah 1–4 UC03-TC01.<br>2. Tekan BATAL (atau tombol Back Android, atau tab lain).<br>3. Pada dialog, tekan "Buang Perubahan". | Tambah: 30 Desember 2026 | Muncul dialog "Perubahan Belum Disimpan". Setelah "Buang Perubahan", aplikasi kembali ke halaman jadwal dengan tanggal semula dan database tidak berubah. | Muncul dialog "Perubahan Belum Disimpan". Setelah menekan "Buang Perubahan", aplikasi kembali ke halaman jadwal dengan tanggal semula (30 Desember 2026 tidak ditandai) dan database tidak berubah, sesuai hasil yang diharapkan. | Pass |
| UC03-TC06 | KF05 | Alternatif: tempat pembuangan sampah belum terdata | 1. Log In sebagai petugas.<br>2. Buka tab Jadwal.<br>3. Ketik nama lokasi yang belum terdata pada kolom "Cari Kecamatan/Kelurahan". | Kata kunci: "Bekasi" | Tampil "Lokasi TPS tidak ditemukan" (I-08). | Tampil "Lokasi TPS tidak ditemukan", sesuai hasil yang diharapkan. | Pass |

### 4.4.4 Use Case Melihat Jadwal

**ID Use Case:** UC04  
**Nama Use Case:** Melihat Jadwal

Tabel 4.4.4. Hasil Pengujian Use Case UC04

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC04-TC01 | KF03, KF04 | Normal | 1. Buka aplikasi tanpa login.<br>2. Tekan tab Jadwal.<br>3. Pilih kartu "Lebak Siliwangi". | Lokasi: Kelurahan Lebak Siliwangi, Kecamatan Coblong | Daftar "Lokasi TPS Kota Bandung" (151 lokasi) tampil terurut per kecamatan (I-07). Setelah lokasi dipilih, halaman jadwal (I-09) tampil dengan kalender bulan berjalan, kartu lokasi, penanda hari ini, dan tanggal pengambilan berwarna hijau sesuai `jadwal.json`, tanpa tombol EDIT JADWAL. | Daftar "Lokasi TPS Kota Bandung" tampil terurut per kecamatan. Setelah memilih Lebak Siliwangi, halaman jadwal tampil dengan kalender bulan berjalan, kartu lokasi, penanda hari ini, dan tanggal pengambilan berwarna hijau, tanpa tombol EDIT JADWAL, sesuai hasil yang diharapkan. | Pass |
| UC04-TC02 | KF03 | Alternatif: mencari lokasi TPS | 1. Buka tab Jadwal.<br>2. Ketik kata kunci pada kolom "Cari Kecamatan/Kelurahan". | Kata kunci: "coblong" | Hanya lokasi di Kecamatan Coblong yang tampil; pencarian tidak peka huruf besar/kecil. | Hanya lokasi di Kecamatan Coblong yang tampil, sesuai hasil yang diharapkan. | Pass |
| UC04-TC03 | KF03 | Alternatif: lokasi tidak ditemukan | 1. Buka tab Jadwal.<br>2. Ketik kata kunci lokasi di luar Kota Bandung. | Kata kunci: "Bekasi" | Tampil "Lokasi TPS tidak ditemukan" (I-08). | Tampil "Lokasi TPS tidak ditemukan", sesuai hasil yang diharapkan. | Pass |
| UC04-TC04 | KF04 | Alternatif: melihat jadwal bulan lain | 1. Buka halaman jadwal Lebak Siliwangi.<br>2. Tekan panah kanan dan kiri berulang kali. | - | Kalender berpindah bulan dan tetap menandai tanggal pengambilan; panah tidak dapat melewati Januari dan Desember tahun berjalan. | Kalender berpindah ke bulan sebelumnya dan berikutnya dengan tanggal pengambilan tetap ditandai. Panah kiri tidak aktif pada Januari dan panah kanan tidak aktif pada Desember tahun berjalan, sesuai hasil yang diharapkan. | Pass |
| UC04-TC05 | KF03, KF04 | Alternatif: sistem gagal mengambil jadwal dari database | 1. Matikan emulator atau putuskan Wi-Fi HP.<br>2. Buka tab Jadwal.<br>3. Nyalakan kembali emulator, lalu tekan COBA LAGI. | - | Tampil ikon *cloud-off*, "Gagal memuat jadwal", dan tombol COBA LAGI. Setelah koneksi pulih, COBA LAGI menampilkan daftar lokasi. | Saat koneksi terputus, tampil ikon *cloud-off*, "Gagal memuat jadwal", dan tombol COBA LAGI. Setelah emulator dinyalakan kembali, menekan COBA LAGI menampilkan daftar lokasi TPS, sesuai hasil yang diharapkan. | Pass |

### 4.4.5 Use Case Mengakses Tampilan Informasi

**ID Use Case:** UC05  
**Nama Use Case:** Mengakses Tampilan Informasi

Tabel 4.4.5. Hasil Pengujian Use Case UC05

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC05-TC01 | KF06, KF07 | Normal | 1. Buka aplikasi dan pilih menu Daur Ulang.<br>2. Tekan kartu Plastik.<br>3. Tekan "Kreasikan Menjadi Barang Baru" pada Botol Plastik. | Kategori: Plastik | Halaman informasi tampil; detail Sampah Plastik (Anorganik) tampil beserta tipe dan cara pembuangan/daur ulangnya; pop-up panduan tampil. | Halaman informasi, detail Sampah Plastik, dan pop-up panduan tampil sesuai hasil yang diharapkan. | Pass |
| UC05-TC02 | KF07 | Alternatif 1: Masyarakat menggunakan fitur pencarian | 1. Buka menu Daur Ulang.<br>2. Ketik kata kunci pada kolom Cari Material Sampah.<br>3. Tekan kartu Kaca pada hasil pencarian. | Kata kunci: "botol" | Hanya kartu Plastik dan Kaca yang tampil; detail Sampah Kaca beserta cara daur ulangnya tampil setelah dipilih. | Kartu Plastik dan Kaca tampil, dan detail Sampah Kaca tampil sesuai hasil yang diharapkan. | Pass |
| UC05-TC03 | KF07 | Alternatif 1: Kata kunci pencarian tidak ditemukan | 1. Buka menu Daur Ulang.<br>2. Ketik kata kunci yang tidak ada di database. | Kata kunci: "styrofoam" | Tampil pesan "Material tidak ditemukan" beserta arahan mencoba kata kunci lain. | Pesan "Material tidak ditemukan" tampil sesuai hasil yang diharapkan. | Pass |
| UC05-TC04 | KF06, KF07 | Alternatif 2: Sistem gagal mengambil informasi dari database | 1. Aktifkan mode pesawat.<br>2. Buka menu Daur Ulang.<br>3. Matikan mode pesawat, tekan "Coba Lagi". | Koneksi internet terputus | Sistem menampilkan notifikasi error 504 dan tombol refresh. | Sistem menampilkan pesan "Gagal memuat informasi sampah." dan tombol "Coba Lagi" (bukan kode "error 504"); data tampil kembali setelah koneksi pulih. | Pass. Perilaku sesuai maksud skenario, tetapi pesan tidak menampilkan kode 504 dan tidak menunggu batas 20 detik. Usulan: SKPL disesuaikan atau ditambahkan batas waktu 20 detik pada pemanggilan `getMain()`. |

### 4.4.6 Use Case Membuat Akun

**ID Use Case:** UC06  
**Nama Use Case:** Membuat Akun

Tabel 4.4.6. Hasil Pengujian Use Case UC06


| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC06-TC01 | KF09 | Normal | 1. Buka aplikasi EcoTrack, pilih menu **Profil**, lalu pilih **Daftar / Sign Up**.<br>2. Masukkan Nama Lengkap dan NIK yang terdaftar di `dataPemerintah` (belum terdaftar di `nikTerdaftar`), Email baru, Nomor Telepon, Kata Sandi, dan Konfirmasi Kata Sandi.<br>3. Tekan tombol **DAFTAR**. | Nama: `Rudi Hartono`<br>NIK: `9999041509870005`<br>Email: `windah@ecotrack.id`<br>No. Telp: `087846947207`<br>Password: *(valid ≥ 6 karakter)* | Sistem memverifikasi NIK, menambahkan akun baru pada Firebase Authentication dan Firestore (`akunPetugas` serta `nikTerdaftar`), serta menampilkan notifikasi pendaftaran berhasil. | Akun berhasil didaftarkan ke Firebase Auth dan Firestore, sistem menampilkan notifikasi *"Akun berhasil dibuat"*, dan mengarahkan pengguna ke layar utama. | Pass |
| UC06-TC02 | KF09 | Alternatif 1: Akun sudah ada di database | 1. Buka menu **Profil** lalu pilih **Daftar / Sign Up**.<br>2. Masukkan data dengan NIK yang sudah tercatat di `nikTerdaftar`.<br>3. Tekan tombol **DAFTAR**. | Nama: `Rudi Hartono`<br>NIK: `9999041509870005`<br>Email: `windah@ecotrack.id`<br>No. Telp: `087846947207` | Sistem mendeteksi NIK/akun sudah terdaftar di database dan menampilkan notifikasi bahwa akun sudah terdaftar kepada petugas. | Sistem menolak pendaftaran, menandai kolom NIK dengan garis merah, dan menampilkan pesan *"NIK ini sudah mendaftarkan akun"*. | Pass |
| UC06-TC03 | KF09 | Alternatif 2: Sistem gagal menambahkan informasi ke database | 1. Buka halaman **Daftar Akun Petugas** dan isi seluruh kolom pendaftaran dengan data yang valid.<br>2. Matikan koneksi internet perangkat (*offline*) sebelum menekan tombol kirim.<br>3. Tekan tombol **DAFTAR**. | Data pendaftaran valid (`Rudi Hartono`, NIK `9999041509870005`, `windah@ecotrack.id`) dalam kondisi *offline* | Sistem gagal menambahkan akun ke server/database, menampilkan notifikasi kegagalan koneksi kepada petugas, dan tetap menyediakan tombol **DAFTAR** untuk dicoba kembali. | Sistem gagal terhubung ke server dan menampilkan notifikasi *"Gagal menghubungi server. Periksa koneksi internet Anda."* dengan tombol **DAFTAR** tetap tersedia. | Pass |

<br>

## 4.5 Pengujian Kebutuhan Non-Fungsional (KNF)

Tabel 4.5. Hasil Pengujian KNF

| ID Pengujian | ID KNF | Parameter | Target Terukur | Metode dan Alat | Hasil Aktual | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| KNF01-TC01 | KNF01 | Ergonomy | Setiap fitur dapat dicapai dari halaman pertama aplikasi dalam ≤ 5 ketukan layar tanpa petunjuk | Telusuri alur navigasi aplikasi (Expo Go pada *smartphone* Android) mulai dari halaman pertama saat aplikasi dibuka (Daur Ulang), lalu hitung jumlah ketukan hingga halaman atau komponen fitur tujuan tampil. Ketikan teks pada kolom isian tidak dihitung sebagai ketukan navigasi. | Pindai sampah: 1 (Pindai), atau 3 saat pertama kali karena ada Izinkan Kamera dan izin sistem.<br>Pindai *barcode*: 2 (Pindai, Barcode), atau 4 saat pertama kali.<br>Panduan daur ulang: 2 (kartu material, pilihan metode).<br>Cari informasi sampah: 1 (kolom pencarian).<br>Lihat jadwal: 2 (Jadwal, kartu lokasi).<br>Cari lokasi TPS: 2 (Jadwal, kolom pencarian).<br>Log In: 1 (ikon profil).<br>Daftar akun: 2 (ikon profil, tautan Daftar).<br>Mengatur jadwal (petugas sudah login): 3 (Jadwal, kartu lokasi, EDIT JADWAL).<br>Profil petugas: 1 (ikon profil).<br>Maksimum 4 ketukan, sesuai target ≤ 5. | Pass |
| KNF02-TC01 | KNF02 | Response Time | Rata-rata waktu respons klasifikasi sampah melalui computer vision beserta kategori daur ulang tampil dalam waktu <5 detik | Pengukuran selisih waktu menggunakan pencatatan timestamp log pada 5 kali percobaan pengiriman gambar sampah ke layanan AI, lalu dihitung rata-ratanya | Dari 5 kali pengujian diperoleh waktu respons masing-masing 4,23 detik, 4,02 detik, 3,34 detik, 8,55 detik, dan 3,70 detik, dengan rata-rata 4,77 detik serta seluruh respons berstatus HTTP 200 | Pass |
| KNF03-TC01 | KNF03 | Response time | Hasil pencarian cara mendaur ulang tampil < 5 detik | Ketik 5 kata kunci berbeda ("plastik", "botol", "kaca", "minyak", "styrofoam") pada halaman Daur Ulang di Android Emulator; waktu diukur dengan `console.time()`/`console.timeEnd()` dari input hingga hasil disaring, 5 kali ukur, ambil rata-rata | Rata-rata 15,80 ms, maksimum 21,03 ms. | Pass |
| KNF04-TC01 | KNF04 | Availability | Layanan pemindaian tersedia dengan tingkat ketersediaan ≥99% | Pengujian availability probe dengan mengirimkan 20 permintaan beruntun secara otomatis ke endpoint Cloudflare Worker API dan Cloud Firestore REST API serta pemeriksaan status respons server | Dari 20 kali pengujian ketersediaan beruntun, diperoleh tingkat ketersediaan 100% pada Cloudflare Worker API dan 100% pada Cloud Firestore | Pass |
| KNF05-TC01 | KNF05 | Reliability (akurasi jadwal pembuangan sampah) | Akurasi ≥ 90% jadwal yang ditampilkan (kecamatan, kelurahan, dan seluruh tanggal pengambilan) sama dengan data acuan | Jest (`src/tests/KNF05Akurasi.test.js`) terhadap Firebase Emulator yang di-*seed*. Untuk setiap lokasi pada `src/firebase/data/jadwal.json`, panggil `JadwalController.getJadwal(id)` (Controller → Model → Firestore) dan bandingkan hasilnya dengan data acuan. Akurasi = lokasi cocok / seluruh lokasi. | 151/151 lokasi cocok, **akurasi 100,00%** (903 ms untuk 151 pembacaan) | Pass |
| KNF05-TC02 | KNF05 | Reliability (akurasi informasi cara mendaur ulang) | Akurasi ≥ 90% informasi material (nama, jenis sampah, deskripsi, serta seluruh tipe beserta langkah dibuang/kreasi/gunakan ulang) sama dengan data acuan | Jest terhadap emulator. Untuk setiap material pada `informasiSampah.json`, bandingkan hasil `InformasiSampahController.getMain()` dan `getDetail(id)` dengan data acuan. | 10/10 material cocok pada halaman daftar dan detail, **akurasi 100,00%** | Pass |
| KNF05-TC03 | KNF05 | Reliability (akurasi kategori sampah melalui barcode) | Akurasi ≥ 90% kategori (`idSampah`) dan tipe (`idTipe`) hasil pencarian barcode sesuai data acuan dan tipe tersebut ada pada informasi material | Jest terhadap emulator. Untuk setiap kode pada `barcodeProduk.json`, panggil `InformasiSampahController.cariBarcode(kode)` dan bandingkan dengan data acuan. | 6/6 barcode cocok, **akurasi 100,00%** | Pass |
| KNF05-TC04 | KNF05 | Reliability (akurasi kategori sampah melalui *computer vision*) | Akurasi ≥ 90% kategori sampah hasil deteksi model *computer vision* terhadap foto sampah berlabel | Jest (`src/tests/KNF05ComputerVision.test.js`). Sepuluh foto material pada `src/ecotrack/assets/images/informasi-sampah/material/` (satu foto per material, label = nama file) dikirim ke layanan pemindai (Cloudflare Worker, `EXPO_PUBLIC_PEMINDAI_URL`) melalui `sampahModel.kirimFoto()` yang dipanggil `PemindaiController.identifikasi()`. `idSampah` deteksi pertama dibandingkan dengan label foto. Akurasi = deteksi benar / total foto. | 9/10 foto benar, **akurasi 90,00%**. Foto yang salah: `lainnya.png` (tumpukan barang campuran) terdeteksi sebagai plastik. | Pass |
| KNF06-TC01 | KNF06 | Security | Data kredensial petugas saat registrasi (`R07`) maupun *login* (`R10`) harus terenkripsi sebelum dikirimkan ke server (protokol HTTPS/TLS) dan tidak tersimpan dalam bentuk *plaintext* di basis data | Inspeksi lalu lintas jaringan pada *Firefox Developer Tools* (tab *Network* & *Security*) saat proses autentikasi serta pemeriksaan struktur dokumen koleksi `akunPetugas` pada *Firebase Console* | Pengiriman kredensial menuju `identitytoolkit.googleapis.com` terenkripsi menggunakan protokol **HTTPS (`TLSv1.3`)** dengan *cipher suite* **`TLS_AES_256_GCM_SHA384`**, dan dokumen pada koleksi `akunPetugas` di Cloud Firestore tidak menyimpan kata sandi *plaintext* (pengelolaan dan *hashing* sandi ditangani secara terenkripsi oleh Firebase Authentication) | Pass |

<br>

## 4.6 Tangkapan Layar dan Bukti Hasil Pengujian

Tabel 4.6. Bukti Hasil Pengujian

| ID Pengujian | Bukti Hasil Pengujian |
| :--- | :--- |
| C01-UT01 – C01-UT20 | ![Hasil Unit Test C01](./assets/C01-unit-test.png) |
| C02-UT01 – C02-UT14 | ![Hasil Unit Test C02](./assets/C02-unit-test.png) |
| C04-UT01 – C04-UT17, C05-UT01 – C05-UT36 | <img src="./assets/unit-test-C04-C05-1.png" alt="unit-test-C04-C05-1.png" width="600"><br><img src="./assets/unit-test-C04-C05-2.png" alt="unit-test-C04-C05-2.png" width="600"><br><img src="./assets/unit-test-C04-C05-3.png" alt="unit-test-C04-C05-3.png" width="600"> |
| C07-UT01 – C07-UT16 | <img src="./assets/C07-UT01–C07-UT16 (1).png" width="50%"> |
| C08-UT01 – C08-UT08 | <img src="./assets/C08-UT01–C08-UT08 (1).png" width="50%"> |
| C10-UT01 – C10-UT11, C12-UT01 – C12-UT04, C13-UT01 – C13-UT03 | <img src="./assets/testpemindai.png" width="100%"> |
| C01, C02 (coverage) | ![Laporan Code Coverage C01 dan C02](./assets/C01-C02-coverage.png) |
| C04, C05 (coverage) | <img src="./assets/coverage-C04-C05.png" alt="coverage-C04-C05.png" width="600"> |
| C07 (coverage) | <img src="./assets/C07-UT01–C07-UT16 (2).png" width="50%"> |
| C08 (coverage) | <img src="./assets/C08-UT01–C08-UT08 (2).png" width="50%"> |
| C10, C12, C13(Coverage) | <img src="./assets/tespemindaicoverage.png" width="100%"> |
| INT-TC01 – INT-TC07 | ![Hasil Test Runner Integrasi](./assets/INT-runner.png) |
| INT-I01-TC02 | <img src="./assets/INT-I01-TC02.jpeg" alt="INT-I01-TC02.jpeg" width="600"> |
| INT-I03-TC01 – INT-I03-TC03 | <img src="./assets/INT-I03-TC01–INT-I03-TC03 (1).jpeg" alt="Hasil unit test I03" width="25%"> <img src="./assets/INT-I03-TC01–INT-I03-TC03 (2).jpeg" alt="Hasil unit test I03" width="25%"> <img src="./assets/INT-I03-TC01–INT-I03-TC03 (3).jpeg" alt="Hasil unit test I03" width="25%"> |
| INT-I04-TC01 – INT-I04-TC02 | <img src="./assets/INT-I04-TC01–INT-I04-TC02 (1).jpeg" alt="Hasil unit test I04" width="25%"> <img src="./assets/INT-I04-TC01–INT-I04-TC02 (2).jpeg" alt="Hasil unit test I04" width="25%"> |
| INT-I05-TC01 – INT-I05-TC03 | <img src="./assets/INT-I05-TC01–INT-I05-TC03 (1).jpeg" alt="Hasil unit test I05" width="25%"> <img src="./assets/INT-I05-TC01–INT-I05-TC03 (2).jpeg" alt="Hasil unit test I05" width="25%"> <img src="./assets/INT-I05-TC01–INT-I05-TC03 (3).jpeg" alt="Hasil unit test I05" width="25%"> |
| INT-I06-TC01 – INT-I06-TC02 | <img src="./assets/INT-I06-TC01–INT-I06-TC02 (1).jpeg" alt="Hasil unit test I06" width="25%"> <img src="./assets/INT-I06-TC01–INT-I06-TC02 (2).jpeg" alt="Hasil unit test I06" width="25%"> |
| INT-I07-TC01 – INT-I14-TC02 | <img src="./assets/integrasi-I07-I14.png" alt="integrasi-I09-I14.png" width="600"> |
| INT-I15-TC01 | <img src="./assets/INT-I15-TC01.jpeg" alt="INT-I15-TC01.jpeg" width="180"> |
| INT-I16-TC01 | <img src="./assets/INT-I16-TC01.jpeg" alt="INT-I16-TC01.jpeg" width="180"> |
| INT-I17-TC01 | <img src="./assets/INT-I17-TC01.jpeg" alt="INT-I17-TC01.jpeg" width="180"> |
| INT-I18-TC01 | <img src="./assets/INT-I18-TC01.jpeg" alt="INT-I18-TC01.jpeg" width="180"> |
| INT-I19-TC01 | <img src="./assets/INT-I19-TC01.jpeg" alt="INT-I19-TC01.jpeg" width="180"> |
| INT-I20-TC01 | <img src="./assets/INT-I20-TC01-a.jpeg" alt="INT-I20-TC01-a.jpeg" width="180"> <img src="./assets/INT-I20-TC01-b.jpeg" alt="INT-I20-TC01-b.jpeg" width="180"> <img src="./assets/INT-I20-TC01-c.jpeg" alt="INT-I20-TC01-c.jpeg" width="180"> <img src="./assets/INT-I20-TC01-d.jpeg" alt="INT-I20-TC01-d.jpeg" width="180"> <img src="./assets/INT-I20-TC01-e.jpeg" alt="INT-I20-TC01-e.jpeg" width="180"> |
| INT-I21-TC01 | <img src="./assets/INT-I21-TC01-a.jpeg" alt="INT-I21-TC01-a.jpeg" width="180"> <img src="./assets/INT-I21-TC01-b.jpeg" alt="INT-I21-TC01-b.jpeg" width="180"> <img src="./assets/INT-I21-TC01-c.jpeg" alt="INT-I21-TC01-c.jpeg" width="180"> |
| INT-I22-TC01 | <img src="./assets/INT-I22-TC01.jpeg" alt="INT-I22-TC01.jpeg" width="180"> |
| INT-I23-TC01, INT-I23-TC02, INT-I24-TC01, INT-I24-TC02, INT-I25-TC01, INT-I25-TC02 | <img src="./assets/tes_knf04.png" width="100%"> |
| UC01-TC01 | ![Bukti UC01-TC01](./assets/UC01-TC01.png) |
| UC01-TC02 | ![Bukti UC01-TC02](./assets/UC01-TC02.png) |
| UC02-TC01 | <img src="./assets/pemindai1.png" width="20%"> |
| UC02-TC02 | <img src="./assets/pemindai2.png" width="20%"> |
| UC02-TC03 | <img src="./assets/pemindai3.jpeg" width="20%"> |
| UC02-TC04 | <img src="./assets/pemindai4.jpeg" width="20%"> |
| UC02-TC05 | <img src="./assets/pemindai5.jpeg" width="20%"> |
| UC02-TC06 | <img src="./assets/pemindai6.jpeg" width="20%"> |
| UC03-TC01 | <img src="./assets/UC03-TC01-a.png" alt="UC03-TC01-a.png" width="180"><br><img src="./assets/UC03-TC01-b.jpeg" alt="UC03-TC01-b.jpeg" width="180"> <img src="./assets/UC03-TC01-c.jpeg" alt="UC03-TC01-c.jpeg" width="180"> <img src="./assets/UC03-TC01-d.jpeg" alt="UC03-TC01-d.jpeg" width="180"><br><img src="./assets/UC03-TC01-e.jpeg" alt="UC03-TC01-e.jpeg" width="180"> <img src="./assets/UC03-TC01-f.jpeg" alt="UC03-TC01-f.jpeg" width="180"><br><img src="./assets/UC03-TC01-g.png" alt="UC03-TC01-g.png" width="180"> |
| UC03-TC02 | <img src="./assets/UC03-TC02.jpeg" alt="UC03-TC02.jpeg" width="180"> |
| UC03-TC03 | <img src="./assets/UC03-TC03.jpeg" alt="UC03-TC03.jpeg" width="180"> |
| UC03-TC04 | <img src="./assets/UC03-TC04.jpeg" alt="UC03-TC04.jpeg" width="180"> |
| UC03-TC05 | <img src="./assets/UC03-TC05-a.jpeg" alt="UC03-TC05-a.jpeg" width="180"> <img src="./assets/UC03-TC05-b.jpeg" alt="UC03-TC05-b.jpeg" width="180"> |
| UC03-TC06 | <img src="./assets/UC03-TC06.jpeg" alt="UC03-TC06.jpeg" width="180"> |
| UC04-TC01 | <img src="./assets/UC04-TC01-a.jpeg" alt="UC04-TC01-a.jpeg" width="180"> <img src="./assets/UC04-TC01-b.jpeg" alt="UC04-TC01-b.jpeg" width="180"> |
| UC04-TC02 | <img src="./assets/UC04-TC02.jpeg" alt="UC04-TC02.jpeg" width="180"> |
| UC04-TC03 | <img src="./assets/UC04-TC03.jpeg" alt="UC04-TC03.jpeg" width="180"> |
| UC04-TC04 | <img src="./assets/UC04-TC04-a.jpeg" alt="UC04-TC04-a.jpeg" width="180"> <img src="./assets/UC04-TC04-b.jpeg" alt="UC04-TC04-b.jpeg" width="180"> |
| UC04-TC05 | <img src="./assets/UC04-TC05-a.jpeg" alt="UC04-TC05-a.jpeg" width="180"> <img src="./assets/UC04-TC05-b.jpeg" alt="UC04-TC05-b.jpeg" width="180"> |
| UC05-TC01 – UC05-TC04 | <img src="./assets/UC05 (1).jpeg" alt="Hasil unit test case UC05" width="25%"> <img src="./assets/UC05 (2).jpeg" alt="Hasil unit test case UC05" width="25%"> <img src="./assets/UC05 (3).jpeg" alt="Hasil unit test case UC05" width="25%"> |
| UC06-TC01 | ![Bukti UC06-TC01](./assets/UC06-TC01.png) |
| UC06-TC02 | ![Bukti UC06-TC02](./assets/UC06-TC02.png) |
| UC06-TC03 | ![Bukti UC06-TC03](./assets/UC06-TC03.png) |
| KNF02-TC01 | <img src="./assets/tes_knf02.png" width="100%"> |
| KNF03-TC01 – KNF03-TC02 | <img src="./assets/KNF03-TC01 – KNF03-TC02 (1).png" alt="Hasil log.console TC01" width="50%"> <img src="./assets/KNF03-TC01 – KNF03-TC02 (2).png" alt="Hasil log.console TC02" width="50%"> |
| KNF04-TC01 | <img src="./assets/tes_knf04.png" width="100%"> |
| KNF05-TC01 – KNF05-TC03 | <img src="./assets/knf05-tc01-tc03.png" alt="knf05-tc01-tc03.png" width="600"> |
| KNF05-TC04 | <img src="./assets/knf05-tc04.png" alt="knf05-tc04.png" width="600"> |
| KNF06-TC01 | !![Bukti Enkripsi TLSv1.3 Firefox DevTools](./assets/KNF06-network-tls.png)<br>![Bukti Dokumen Firestore Tanpa Plaintext Password](./assets/KNF06-firestore-security.png) |

<br>

---

# BAB 5: Traceability

Tabel 5.1. Matriks Kerunutan KF terhadap Implementasi dan Pengujian

| KF ID | KNF Terkait | Use Case ID | Kelas Terkait | Implementasi File Terkait | Test Case (UC) | Test Case (Unit/Integrasi/KNF) |
|---|---|---|---|---|---|---|
| KF01 | - | UC02, UC05 | C07 - InformasiSampah<br>C08 - InformasiSampahController<br>C09 - InformasiSampahInterface<br>C10 - Nama kelas belum diketahui<br>C11–C14 - Nama kelas belum diketahui | Perlu disesuaikan dengan file implementasi masing-masing kelas | UC02-TC01, UC02-TC02, UC02-TC03<br>Test case UC05 | C07-UT01 s.d. C07-UT16<br>C08-UT01 s.d. C08-UT08 |
| KF02 | - | UC02, UC05 | C07 - InformasiSampah<br>C08 - InformasiSampahController<br>C09 - InformasiSampahInterface<br>C10–C14 - Nama kelas belum diketahui | Perlu disesuaikan dengan file implementasi masing-masing kelas | Test case UC02 dan UC05 | C07-UT01 s.d. C07-UT16<br>C08-UT01 s.d. C08-UT08 |
| KF03 | - | UC03, UC04 | C04 - Nama kelas belum diketahui<br>C05 - Nama kelas belum diketahui<br>C06 - Nama kelas belum diketahui | Perlu disesuaikan dengan file implementasi masing-masing kelas | Test case UC03 dan UC04 | Sesuaikan dengan hasil pengujian kelas dan integrasi |
| KF04 | - | UC03, UC04 | C04 - Nama kelas belum diketahui<br>C05 - Nama kelas belum diketahui<br>C06 - Nama kelas belum diketahui | Perlu disesuaikan dengan file implementasi masing-masing kelas | Test case UC03 dan UC04 | Sesuaikan dengan hasil pengujian kelas dan integrasi |
| KF05 | - | UC01, UC03, UC04, UC06 | C02 - Nama kelas belum diketahui<br>C04 - Nama kelas belum diketahui<br>C05 - Nama kelas belum diketahui<br>C06 - Nama kelas belum diketahui | Perlu disesuaikan dengan file implementasi masing-masing kelas | Test case UC01, UC03, UC04, dan UC06 | Sesuaikan dengan hasil pengujian kelas dan integrasi |
| KF06 | - | UC02, UC05 | C07 - InformasiSampah<br>C08 - InformasiSampahController<br>C09 - InformasiSampahInterface<br>C10–C14 - Nama kelas belum diketahui | Perlu disesuaikan dengan file implementasi masing-masing kelas | Test case UC02 dan UC05 | C07-UT01 s.d. C07-UT16<br>C08-UT01 s.d. C08-UT08 |
| KF07 | - | UC02, UC05 | C07 - InformasiSampah<br>C08 - InformasiSampahController<br>C09 - InformasiSampahInterface<br>C10 - Nama kelas belum diketahui | Perlu disesuaikan dengan file implementasi masing-masing kelas | Test case UC02 dan UC05 | Sesuaikan dengan hasil pengujian kelas dan integrasi |
| KF08 | - | UC01, UC06 | C01 - Nama kelas belum diketahui<br>C02 - Nama kelas belum diketahui<br>C03 - Nama kelas belum diketahui | Perlu disesuaikan dengan file implementasi masing-masing kelas | Test case UC01 dan UC06 | Sesuaikan dengan hasil pengujian kelas dan integrasi |
| KF09 | - | UC01, UC06 | C01 - Nama kelas belum diketahui<br>C02 - Nama kelas belum diketahui<br>C03 - Nama kelas belum diketahui | Perlu disesuaikan dengan file implementasi masing-masing kelas | Test case UC01 dan UC06 | Sesuaikan dengan hasil pengujian kelas dan integrasi |

Tabel 5.2. Matriks Kerunutan KNF terhadap Pengujian

| ID KNF | Parameter | KF/UC Terkait | Test Case |
| :--- | :--- | :--- | :--- |
| KNF01 | Ergonomy | KF01–KF13 / UC01–UC07 | KNF01-TC01 |
| KNF02 | Response Time | KF02 / UC02 | KNF02-TC01 |
| KNF03 | Compatibility | KF01–KF13 / UC01–UC07 | KNF03-TC03 |
| KNF04 | Availability | KF02–KF13 / UC01–UC07 | KNF04-TC01 |
| KNF05 | Reliability | KF02–KF07 / UC02–UC05 | KNF05-TC01, KNF05-TC02, KNF05-TC03, KNF05-TC04 |
| KNF06 | Security | KF05, KF08–KF13 / UC01, UC03, UC06, UC07 | KNF06-TC01, INT-I14-TC01, INT-I14-TC02 |