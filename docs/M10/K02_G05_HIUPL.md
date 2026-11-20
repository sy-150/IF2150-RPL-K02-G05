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
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

---

# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Dokumen DPPL ditulis dengan tujuan menciptakan suatu dokumen penghubung antara pengembang dan pengguna perangkat lunak. Tidak dapat dipungkiri bahwa dalam pengembangan perangkat lunak, terdapat banyak masalah yang menghambat proses pengembangan, termasuk tapi tidak terbatas pada konflik kepentingan, tuntutan kontrak, dan pemahaman yang berbeda. Aplikasi EcoTrack sendiri tidak terlepas dari masalah ini, mengingat kompleksitas sistem yang dirancang dan akan dibangun. Oleh karena itu, diharapkan bahwa penulisan dokumen ini akan menghilangkan ambiguitas, mencegah miskomunikasi, dan menghasilkan perangkat lunak yang sesuai kebutuhan dan mudah dirawat.

Pengguna dokumen ini mencakup sejumlah pihak yang terlibat dalam proses pengembangan perangkat lunak. Pertama, dokumen ini akan digunakan oleh pengembang awal dan pengembang yang akan datang sebagai acuan kesesuaian spesifikasi dalam pengembangan dan perawatan lanjut. Kedua, dokumen ini menjadi standar untuk memverifikasi kesesuaian fungsionalitas perangkat lunak bagi penguji/evaluator. Ketiga, klien yang merupakan pemangku kepentingan dapat mengacu pada dokumen ini untuk memastikan kebutuhannya telah dipahami dan diimplementasikan dengan benar.

## 1.2 Lingkup Masalah
EcoTrack adalah sebuah sistem aplikasi perangkat lunak berbasis mobile yang dirancang untuk mengatasi isu tentang sampah. Aplikasi ini digunakan untuk mengidentifikasi jenis sampah secara praktis, penyedia panduan daur ulang serta sebagai penghubung antara masyarakat dengan petugas kebersihan.

## 1.3 Definisi, Istilah, dan Singkatan

Tabel 1.3. Definisi, Istilah, dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| P/L | Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu. |
| SKPL | Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan dalam membangun aplikasi agar dapat menjalankan tugasnya. |
| KF | Singkatan dari Kebutuhan Fungsional. |
| KNF | Singkatan dari Kebutuhan Non-Fungsional. |
| UC | Singkatan dari Use Case. |
| OS | Singkatan dari Operating System. |
| DBMS | Singkatan dari Database Management System. |
| UML | Singkatan dari Unified Modeling Language, yaitu bahasa notasi grafis untuk memodelkan sistem perangkat lunak. |
| TPS | Singkatan dari Tempat Penampungan Sementara untuk sampah. |
| API | Singkatan dari Application Programming Interface, yaitu mekanisme yang memungkinkan perangkat lunak berkomunikasi dengan perangkat lunak lainnya untuk bertukar data. |
| Computer Vision | Bidang dari kecerdasan buatan yang memungkinkan komputer memproses dan menganalisis gambar atau video agar dapat menghasilkan suatu informasi yang dapat digunakan untuk pengambilan keputusan. |
| Database | Kumpulan data yang disimpan secara terstruktur dalam sistem komputer. |
| Barcode | Representasi data dalam pola garis-garis vertikal dengan ketebalan dan jarak yang berbeda-beda yang dapat dipindai untuk mengidentifikasi suatu produk. |
| Query | Perintah yang dikirimkan ke database untuk mengambil, menambah, mengubah, atau menghapus data. |
| Dummy Data | Data tiruan yang digunakan untuk menguji sistem perangkat lunak. |
| Server | Sistem yang digunakan untuk memberikan layanan kepada komputer lain dalam satu jaringan. |
| Client | Sistem yang digunakan untuk mengakses layanan server. |

## 1.4 Aturan Penomoran

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| Use Case | UCXX | Penomoran untuk ID use case dengan 2 digit angka yang dimulai dari UC01. |
| Kelas | CXX | Penomoran untuk ID kelas dengan 2 digit angka yang dimulai dari C01. |
| Algoritma Kelas AkunPetugas | Algo-AP-XXX | Penomoran untuk ID algoritma kelas AkunPetugas dengan 3 digit angka yang dimulai dari Algo-AP-001. |
| Algoritma Kelas AkunPetugasController | Algo-AP-XXX | Penomoran untuk ID algoritma kelas AkunPetugasController dengan 3 digit angka yang dimulai dari Algo-APC-001. |
| Algoritma Kelas AkunPetugasInterface | Algo-API-XXX | Penomoran untuk ID algoritma kelas AkunPetugasInterface dengan 3 digit angka yang dimulai dari Algo-API-001. |
| Algoritma Kelas Jadwal | Algo-J-XXX | Penomoran untuk ID algoritma kelas Jadwal dengan 3 digit angka yang dimulai dari Algo-J-001. |
| Algoritma Kelas JadwalController | Algo-JC-XXX | Penomoran untuk ID algoritma kelas JadwalController dengan 3 digit angka yang dimulai dari Algo-JC-001. |
| Algoritma Kelas JadwalInterface | Algo-JI-XXX | Penomoran untuk ID algoritma kelas JadwalInterface dengan 3 digit angka yang dimulai dari Algo-JI-001. |
| Algoritma Kelas InformasiSampah | Algo-IS-XXX | Penomoran untuk ID algoritma kelas InformasiSampah dengan 3 digit angka yang dimulai dari Algo-IS-001. |
| Algoritma Kelas InformasiSampahController | Algo-ISC-XXX | Penomoran untuk ID algoritma kelas InformasiSampahController dengan 3 digit angka yang dimulai dari Algo-ISC-001. |
| Algoritma Kelas InformasiSampahInterface | Algo-ISI-XXX | Penomoran untuk ID algoritma kelas InformasiSampahInterface dengan 3 digit angka yang dimulai dari Algo-ISI-001. |
| Algoritma Kelas PemindaiController | Algo-PC-XXX | Penomoran untuk ID algoritma kelas PemindaiController dengan 3 digit angka yang dimulai dari Algo-PC-001. |
| Algoritma Kelas PemindaiInterface | Algo-PI-XXX | Penomoran untuk ID algoritma kelas PemindaiInterface dengan 3 digit angka yang dimulai dari Algo-PI-001. |
| Query Kelas AkunPetugas | Q-AP-XXX | Penomoran untuk ID Query kelas AkunPetugas dengan 3 digit angka yang dimulai dari Q-AP-001. |
| Query Kelas AkunPetugasController | Q-AP-XXX | Penomoran untuk ID Query kelas AkunPetugasController dengan 3 digit angka yang dimulai dari Q-APC-001. |
| Query Kelas AkunPetugasInterface | Q-API-XXX | Penomoran untuk ID Query kelas AkunPetugasInterface dengan 3 digit angka yang dimulai dari Q-API-001. |
| Query Kelas Jadwal | Q-J-XXX | Penomoran untuk ID Query kelas Jadwal dengan 3 digit angka yang dimulai dari Q-J-001. |
| Query Kelas JadwalController | Q-JC-XXX | Penomoran untuk ID Query kelas JadwalController dengan 3 digit angka yang dimulai dari Q-JC-001. |
| Query Kelas JadwalInterface | Q-JI-XXX | Penomoran untuk ID Query kelas JadwalInterface dengan 3 digit angka yang dimulai dari Q-JI-001. |
| Query Kelas InformasiSampah | Q-IS-XXX | Penomoran untuk ID Query kelas InformasiSampah dengan 3 digit angka yang dimulai dari Q-IS-001. |
| Query Kelas InformasiSampahController | Q-ISC-XXX | Penomoran untuk ID Query kelas InformasiSampahController dengan 3 digit angka yang dimulai dari Q-ISC-001. |
| Query Kelas InformasiSampahInterface | Q-ISI-XXX | Penomoran untuk ID Query kelas InformasiSampahInterface dengan 3 digit angka yang dimulai dari Q-ISI-001. |
| Query Kelas PemindaiController | Q-PC-XXX | Penomoran untuk ID Query kelas PemindaiController dengan 3 digit angka yang dimulai dari Q-PC-001. |
| Query Kelas PemindaiInterface | Q-PI-XXX | Penomoran untuk ID Query kelas PemindaiInterface dengan 3 digit angka yang dimulai dari Q-PI-001. |
| Layar | I-XX | Penomoran untuk ID layar dengan 2 digit angka yang dimulai dari Q-PI-01. |

## 1.5 Referensi
- 11,3 Juta Ton Sampah di Indonesia Tidak Terkelola dengan Baik, brin.go.id, 26 Juli 2024, https://brin.go.id/drid/posts/kabar/113-juta-ton-sampah-di-indonesia-tidak-terkelola-dengan-baik. Accessed 30 Agustus 2026.
- Dampak Sampah yang Tidak Dikelola dengan Baik, paxel.co, 8 Juni 2025, https://paxel.co/id/berita-dan-promo/dampak-sampah-yang-tidak-dikelola-dengan-baik. Accessed 30 Agustus 2026.
- Apa yang terjadi jika target SDGs gagal tercapai pada tahun 2030?, jejakin.com, https://www.jejakin.com/id/blog/if-sdgs-fail-by-2030. Accessed 30 Agustus 2026.
- Pengelolaan Sampah Jadi Prioritas, Pemerintah Siapkan Strategi Komprehensif, Kementerian Sekretariat Negara Republik Indonesia, 12 Maret 2025, https://setneg.go.id/baca/index/pengelolaan_sampah_jadi_prioritas_pemerintah_siapkan_strategi_komprehensif. Accessed 30 Agustus 2026.
- 8 Manfaat Daur Ulang Sampah dan Cara Membiasakannya, BANK MEGA Syariah, 9 Desember 2024, https://www.megasyariah.co.id/id/artikel/edukasi-tips/lainnya/manfaat-daur-ulang. Accessed 30 Agustus 2026.
- Pristiandaru, Danur Lumbang. Mengenal Tujuan 15 SDGs: Ekosistem Daratan Sumber: https://lestari.kompas.com/read/2023/05/23/080000286/mengenal-tujuan-15-sdgs--ekosistem-daratan. Membership: https://kmp.im/plus6 Download aplikasi: https://kmp.im/app6, Kompas.com, 23 Mei 2023, https://lestari.kompas.com/read/2023/05/23/080000286/mengenal-tujuan-15-sdgs--ekosistem-daratan. Accessed 30 Agustus 2026.

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Dokumen SKPL ini terdiri dari enam bab. Bab pertama adalah pendahuluan, yang merupakan penjelasan dari dokumen SKPL ini. Bab tersebut terdiri dari tujuan penulisan, lingkup masalah, tabel definisi, istilah, dan singkatan, aturan penomoran yang digunakan, referensi pembuatan dokumen, serta deskripsi umum dokumen. Bab kedua membahas deskripsi perangkat lunak yang dirancang. Bab tersebut terdiri dari deskripsi umum sistem, dan perangkat lunak, pengguna dan kebutuhannya, batasan perangkat lunak, dan lingkungan operasi perangkat lunak.

Bab tiga berisi deskripsi kebutuhan perangkat lunak, yang terdiri dari kebutuhan fungsional dan non fungsional perangkat lunak terkait. Bab empat membahas pemodelan use case, yang berisi identifikasi aktor dan use case, diagram use case, dan skenario-skenario terhadap use case terkait. Bab lima mendeskripsikan pemodelan kelas, yang terdiri dari identifikasi kelas, pemodelan kelas per use case, dan gabungan pemodelan kelas secara keseluruhan. Terkahkih, bab enam berisi tabel traceability yang menghubungkan kelas dan use case dengan kebutuhan awalnya.

<br>

---

# BAB 2: Deskripsi Umum Perangkat Lunak

Bagian ini diisi dengan *System Overview*, dalam bentuk gambar dan narasi yang memberikan gambaran tentang aplikasi dan konteksnya. **Batasan dan keterkaitan** antara sistem yang dibangun dengan sistem lain di luarnya harus jelas. Deskripsi umum sistem perlu dilengkapi dengan pemodelan kasus yang dihadapi, seperti *use case diagram*. Berikan narasi yang jelas untuk setiap gambar yang ditampilkan.

Bagian ini dapat menyalin atau meringkas dari dokumen SKPL atau DPPL.

<p align="center">
<img alt="System Overview / Use Case Diagram" src="./assets/contoh-uc-diagram.webp" width="90%">
</p>
<p align="center">
<i>Gambar 2.1. Use Case Diagram [Nama P/L]</i>
</p>

<br>

---

# BAB 3: Implementasi

Bagian ini diisi dengan informasi tentang elemen P/L yang dikembangkan (*executable files*, *configuration files*, *data files*, dan sebagainya) serta perubahannya terhadap rancangan pada DPPL (jika ada).

## 3.1 Lingkungan Implementasi

Tuliskan *hardware* dan *software* yang digunakan untuk implementasi, mencakup *operating system*, bahasa pemrograman beserta versinya, *framework*/*library*, DBMS, *development tools*, dan *version control*. Lingkungan ini harus konsisten dengan **Subbab 2.1 DPPL**; jelaskan jika ada perubahan. Cantumkan juga *framework* dan alat pengujian yang dipakai.

Tabel 3.1. Lingkungan Implementasi

| Aspek | Keterangan |
| :--- | :--- |
| *Hardware* | *[Spesifikasi perangkat keras]* |
| *Operating System* | *[Nama dan versi OS]* |
| *Bahasa Pemrograman* | *[Bahasa dan versi]* |
| *Framework/Library* | *[Daftar framework/library beserta versi]* |
| *DBMS* | *[Nama dan versi DBMS]* |
| *Development Tools* | *[IDE, version control, tools lain]* |
| *Testing Tools* | *[Framework unit test, alat ukur performa, alat coverage]* |

## 3.2 Implementasi Modul

Daftar modul/kelas yang **TELAH** diimplementasikan. Gunakan nama dan ID kelas yang sama dengan DPPL, dan konsisten dengan Tabel B.5 pada dokumen Implementasi (Tugas 9).

Tabel 3.2. Implementasi Modul

| No | ID Kelas | Nama Modul/Kelas | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *[C01]* | *[Nama modul/kelas]* | *[path/ke/file]* | *[Nama file executable, atau - jika tidak ada]* |
| 2 | *[C02]* | *[Nama modul/kelas]* | *[path/ke/file]* | *[...]* |
| ... | *...* | *...* | *...* | *...* |

## 3.3 Implementasi Antarmuka

Daftar antarmuka yang telah diimplementasikan. Gunakan ID dan nama layar yang sama dengan ID dan nama layar pada tugas DPPL.

Tabel 3.3. Implementasi Antarmuka

| No | ID Antarmuka | Nama Antarmuka | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | *[I-01]* | *[Nama layar]* | *[path/ke/file]* | *[Nama file executable, atau - jika tidak ada]* |
| 2 | *[I-02]* | *[Nama layar]* | *[path/ke/file]* | *[...]* |
| ... | *...* | *...* | *...* | *...* |

## 3.4 File Lain

Daftar file lain yang dibuat selain file kelas dan antarmuka, misalnya file *utility*, *configuration*, *database schema/seed*, *file test*, atau *data*.

Tabel 3.4. File Lain

| No | Nama File | Keterangan |
| :--- | :--- | :--- |
| 1 | *[Nama file]* | *[Fungsi file]* |
| ... | *...* | *...* |

<br>

---

# BAB 4: Hasil Pengujian

Bab ini melaporkan hasil pengujian P/L pada level unit, integrasi, dan sistem. Pengujian dilakukan pada tag release terakhir Tugas 9. Hasil aktual diisi berdasarkan pengamatan saat pengujian. Kesimpulan diisi `Pass` atau `Fail`, dan untuk `Fail` dilengkapi penyebab serta usulan perbaikan.

## 4.1 Strategi dan Kedalaman Pengujian Kelas

Setiap kelas perancangan pada Tabel 4.1 DPPL diklasifikasikan ke dalam tiga tingkat kedalaman pengujian. Tingkat **Mendalam** diberikan pada kelas yang memuat logika bisnis, perhitungan, validasi, aturan status, algoritma, integrasi eksternal, atau keamanan. Tingkat **Sedang** diberikan pada kelas yang hanya mengoordinasikan atau mendelegasikan proses. Tingkat **Tidak perlu** diberikan pada kelas tanpa logika, seperti *entity/DTO* dan kelas konfigurasi, yang teruji secara tidak langsung melalui test case use case. Seluruh kelas wajib dicantumkan beserta alasan penentuan tingkatnya.

Tabel 4.1.1. Identifikasi Tingkat Pengujian Kelas

| ID Kelas | Nama Kelas | Tingkat | Alasan | Test Case Terkait |
| :--- | :--- | :--- | :--- | :--- |
| *C02* | *Pesanan* | *Mendalam* | *Memuat `hitungTotal()` dan transisi status pembayaran* | *C02-UT01 s.d. C02-UT08* |
| *C03* | *Keranjang* | *Sedang* | *Delegasi sederhana ke Produk dan Pesanan* | *C03-UT01 s.d. C03-UT03, INT-TC02* |
| *C01* | *Pelanggan* | *Tidak perlu* | *Hanya menyimpan data akun, tanpa logika* | *-* |
| *[CXX]* | *[Nama kelas]* | *[Mendalam/Sedang/Tidak perlu]* | *[Alasan penentuan tingkat pengujian]* | *[ID test case atau -]* |
| *...* | *...* | *...* | *...* | *...* |

## 4.2 Pengujian Unit Kelas

Pengujian unit dilakukan pada kelas bertingkat Mendalam dan Sedang. Kelas Mendalam diuji pada seluruh operasi public dengan kasus normal, batas, dan negatif, serta mencapai *coverage* minimal 70%. Kelas Sedang diuji minimal dengan satu kasus normal dan satu kasus gagal pada operasi public utama.

Cara menjalankan unit test: *[tuliskan perintah, mis. `pytest src/tests/`]*.

Lokasi file test: *[path, mis. `src/tests/`]*.

### 4.2.1 Kelas [Nama Kelas 1]

**ID Kelas:** *[C02]*  
**Nama Kelas:** *[Pesanan]*  
**Tingkat:** *[Mendalam]*

Tabel 4.2.1. Hasil Pengujian Unit Kelas [C02]

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *C02-UT01* | *`hitungTotal(): Decimal`* | *Normal* | *Pesanan berisi 2 item: 10.000 x 2 dan 5.000 x 1* | *Total = 25.000* | *[Hasil aktual]* | *Pass/Fail* |
| *C02-UT02* | *`hitungTotal(): Decimal`* | *Batas* | *Pesanan berisi tepat 1 item dengan jumlah 1* | *Total = harga item tersebut* | *[...]* | *Pass/Fail* |
| *C02-UT03* | *`hitungTotal(): Decimal`* | *Negatif* | *Pesanan tanpa item* | *Total = 0 atau melempar kesalahan sesuai rancangan* | *[...]* | *Pass/Fail* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

Khusus kelas **Mendalam**:

Tabel 4.2.1b. Ringkasan Cakupan Kelas [C02]

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | *[op1(), op2(), ...]* |
| Operasi yang diuji | *[op1(), op2(), ...]* |
| ID Algoritma yang tercakup | *[Algo-001, ...]* |
| Coverage (wajib ≥ 70%) | *[% baris / % cabang, alat dan bukti pada 4.6]* |

### 4.2.7 Kelas InformasiSampah

**ID Kelas:** *[C07]*  
**Nama Kelas:** *[InformasiSampah]*  
**Tingkat:** *[Mendalam]*

Tabel 4.2.7. Hasil Pengujian Unit Kelas [C07]

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

Tabel 4.2.7b. Ringkasan Cakupan Kelas [C07]

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `getDetail(id)`, `getMain()`, `cariInformasi(query)` (ditambah `cariBarcode(barcode)` pada implementasi) |
| Operasi yang diuji | `getDetail(id)`, `getMain()`, `cariInformasi(query)`, `cariBarcode(barcode)` |
| ID Algoritma yang tercakup | Algo-IS-001, Algo-IS-002, Algo-IS-003 |
| Coverage (wajib ≥ 70%) | [... % baris / ... % cabang], Jest `--coverage`, bukti pada 4.6 |

### 4.2.8 Kelas InformasiSampahController

**ID Kelas:** *[C08]*  
**Nama Kelas:** *[InformasiSampahController]*  
**Tingkat:** *[Sedang]*

Tabel 4.2.1. Hasil Pengujian Unit Kelas [C08]

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

### 4.2.9 Kelas InformasiSampahInterface

**ID Kelas:** *[C09]*  
**Nama Kelas:** *[InformasiSampahInterface]*  
**Tingkat:** *[Tidak perlu]*

<br>

## 4.3 Pengujian Integrasi

Tabel 4.3.1. Daftar Antarmuka Antarkomponen

| ID Antarmuka | Komponen Asal | Komponen Tujuan | Jenis Batas | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| I-03 | InformasiSampahInterface (`informasi/index.jsx`) → InformasiSampahController | InformasiSampah (Model) → Firestore koleksi `informasiSampah` | View - Controller - Model; Aplikasi - Basis data | INT-I03-TC01, INT-I03-TC02, INT-I03-TC03 |
| I-04 | InformasiSampahInterface (`informasi/index.jsx`) → InformasiSampahController | InformasiSampah (Model) | View - Controller - Model | INT-I04-TC01, INT-I04-TC02 |
| I-05 | InformasiSampahInterface (`informasi/[idSampah]/index.jsx`) → InformasiSampahController | InformasiSampah (Model) → Firestore dokumen `informasiSampah/{id}` | View - Controller - Model; Aplikasi - Basis data | INT-I05-TC01, INT-I05-TC02, INT-I05-TC03 |
| I-06 | InformasiSampahInterface (`TutorialModal.jsx`) | Data tipe sampah dari InformasiSampah (Model) | View - Model | INT-I06-TC01, INT-I06-TC02 |
| I-07 | JadwalInterface (`jadwal/index.jsx`) → JadwalController | Jadwal (Model) → Firestore koleksi `jadwal` | View - Controller - Model; Aplikasi - Basis data | INT-I07-TC01, INT-I07-TC02, INT-I07-TC03 |
| I-08 | JadwalInterface (`jadwal/index.jsx`) → JadwalController | Jadwal (Model) | View - Controller - Model | INT-I08-TC01 |

Tabel 4.3.2. Hasil Pengujian Integrasi

| ID Pengujian | ID Antarmuka | Skenario | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
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
| INT-I07-TC01 | I-07 | Normal: memuat daftar lokasi TPS | Buka tab Kalender dengan koneksi internet | Tampil judul "Lokasi TPS Kota Bandung" dan 151 kartu lokasi, terurut per kecamatan lalu kelurahan | Daftar lokasi TPS tampil terurut sesuai koleksi `jadwal` | Pass |
| INT-I07-TC02 | I-07 | Normal: pencarian lokasi | Ketik "coblong" pada kolom Cari Kecamatan/Kelurahan | Tampil 6 lokasi di Kecamatan Coblong (Cipaganti, Dago, Lebakgede, Lebak Siliwangi, Sadangserang, Sekeloa) | 6 kartu lokasi Kecamatan Coblong tampil | Pass |
| INT-I07-TC03 | I-07 | Gagal: database tidak dapat diakses | Aktifkan mode pesawat, buka tab Kalender | Tampil "Gagal memuat jadwal" dan tombol "COBA LAGI" | Pesan gagal dan tombol "COBA LAGI" tampil | Pass |
| INT-I08-TC01 | I-08 | Gagal: lokasi tidak ditemukan | Ketik "Bekasi" pada kolom pencarian | Tampil "Lokasi TPS tidak ditemukan" | Tampilan kosong dengan pesan "Lokasi TPS tidak ditemukan" | Pass |


<br>

## 4.4 Pengujian Use Case

Pengujian use case dilakukan pada seluruh skenario normal dan alternatif sesuai Subbab 4.4 SKPL, dengan minimal satu test case untuk setiap skenario. Kolom ID KF menunjukkan KF yang diverifikasi oleh test case tersebut.

### 4.4.1 Use Case [Nama Use Case 1]

**ID Use Case:** *[UC01 sesuai SKPL]*  
**Nama Use Case:** *[Nama use case sesuai SKPL]*

Tabel 4.4.1. Hasil Pengujian Use Case [UC01]

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *UC01-TC01* | *KF01* | *Normal* | *1. Buka halaman login.<br>2. Masukkan kredensial.<br>3. Klik tombol "Login".* | *User: rpl@gmail.com<br>Pass: 123456* | *Pengguna diarahkan ke Halaman Dashboard.* | *Pengguna diarahkan ke Halaman Dashboard sesuai hasil yang diharapkan.* | *Pass* |
| *UC01-TC02* | *KF01* | *Alternatif 1: [Nama skenario]* | *[Langkah-langkah pengujian]* | *[Data masukan]* | *[Hasil yang diharapkan]* | *[Hasil aktual]* | *[Pass/Fail. Jika Fail: penjelasan dan solusi]* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* | *...* |

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

<br>

## 4.5 Pengujian Kebutuhan Non-Fungsional (KNF)

Tabel 4.5. Hasil Pengujian KNF

| ID Pengujian | ID KNF | Parameter | Target Terukur | Metode dan Alat | Hasil Aktual | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| KNF03-TC01 | KNF03 | Response time | Hasil pencarian cara mendaur ulang tampil < 5 detik | Ketik 5 kata kunci berbeda ("plastik", "botol", "kaca", "minyak", "styrofoam") pada halaman Daur Ulang di Android Emulator; waktu diukur dengan `console.time()`/`console.timeEnd()` dari input hingga hasil disaring, 5 kali ukur, ambil rata-rata | Rata-rata 15,80 ms, maksimum 21,03 ms. | Pass |

<br>

## 4.6 Tangkapan Layar dan Bukti Hasil Pengujian

Tabel 4.6. Bukti Hasil Pengujian

| ID Pengujian | Bukti Hasil Pengujian |
| :--- | :--- |
| C07-UT01 – C07-UT16 | <img src="./assets/C07-UT01–C07-UT16 (1).png" width="50%"> |
| C07 (coverage) | <img src="./assets/C07-UT01–C07-UT16 (2).png" width="50%"> |
| C08-UT01 – C08-UT08 | <img src="./assets/C08-UT01–C08-UT08 (1).png" width="50%"> |
| C08 (coverage) | <img src="./assets/C08-UT01–C08-UT08 (2).png" width="50%"> |
| INT-I03-TC01 – INT-I03-TC03 | <img src="./assets/INT-I03-TC01–INT-I03-TC03 (1).jpeg" alt="Hasil unit test I03" width="25%"> <img src="./assets/INT-I03-TC01–INT-I03-TC03 (2).jpeg" alt="Hasil unit test I03" width="25%"> <img src="./assets/INT-I03-TC01–INT-I03-TC03 (3).jpeg" alt="Hasil unit test I03" width="25%"> |
| INT-I04-TC01 – INT-I04-TC02 | <img src="./assets/INT-I04-TC01–INT-I04-TC02 (1).jpeg" alt="Hasil unit test I04" width="25%"> <img src="./assets/INT-I04-TC01–INT-I04-TC02 (2).jpeg" alt="Hasil unit test I04" width="25%"> |
| INT-I05-TC01 – INT-I05-TC03 | <img src="./assets/INT-I05-TC01–INT-I05-TC03 (1).jpeg" alt="Hasil unit test I05" width="25%"> <img src="./assets/INT-I05-TC01–INT-I05-TC03 (2).jpeg" alt="Hasil unit test I05" width="25%"> <img src="./assets/INT-I05-TC01–INT-I05-TC03 (3).jpeg" alt="Hasil unit test I05" width="25%"> |
| INT-I06-TC01 – INT-I06-TC02 | <img src="./assets/INT-I06-TC01–INT-I06-TC02 (1).jpeg" alt="Hasil unit test I06" width="25%"> <img src="./assets/INT-I06-TC01–INT-I06-TC02 (2).jpeg" alt="Hasil unit test I06" width="25%"> |
| INT-I07-TC01 – INT-I07-TC03 | <img src="./assets/INT-I07-TC01–INT-I07-TC03 (1).jpeg" alt="Hasil unit test I07" width="25%"> <img src="./assets/INT-I07-TC01–INT-I07-TC03 (2).jpeg" alt="Hasil unit test I07" width="25%"> <img src="./assets/INT-I07-TC01–INT-I07-TC03 (3).jpeg" alt="Hasil unit test I07" width="25%"> |
| INT-I08-TC01 | <img src="./assets/INT-I08-TC01.jpeg" alt="Hasil unit test C07" width="25%"> |
| UC05-TC01 – UC05-TC04 | <img src="./assets/UC05 (1).jpeg" alt="Hasil unit test case UC05" width="25%"> <img src="./assets/UC05 (2).jpeg" alt="Hasil unit test case UC05" width="25%"> <img src="./assets/UC05 (3).jpeg" alt="Hasil unit test case UC05" width="25%"> |
| KNF03-TC01 – KNF03-TC02 | <img src="./assets/KNF03-TC01 – KNF03-TC02 (1).png" alt="Hasil log.console TC01" width="50%"> <img src="./assets/KNF03-TC01 – KNF03-TC02 (2).png" alt="Hasil log.console TC02" width="50%"> |

<br>

---

# BAB 5: Traceability

Petakan setiap KF ke KNF, use case, kelas perancangan, file implementasi, dan test case. Tabel traceability berikut akan menjadi sarana verifikasi KF. Setiap KF memiliki minimal satu test case dan dinyatakan terpenuhi apabila **seluruh** test case terkaitnya berkesimpulan `Pass`. KF yang tidak diimplementasikan tetap dicantumkan beserta alasannya.

Tabel 5.1. Matriks Kerunutan KF terhadap Implementasi dan Pengujian

| KF ID | KNF Terkait | Use Case ID | Kelas Terkait | Implementasi File Terkait | Test Case (UC) | Test Case (Unit/Integrasi/KNF) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *KF05* | *KNF01* | *UC03* | *C02 - Pesanan* | *`src/...`* | *UC03-TC01* | *C02-UT05, INT-TC04, KNF01-TC01* |
| *KF01* | *-* | *UC01<br>UC02* | *[C01 - Nama kelas]<br>[C02 - Nama kelas]* | *[path/ke/file1]<br>[path/ke/file2]* | *UC01-TC01, UC01-TC02<br>UC02-TC01* | *-* |
| *KF02* | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| *KFXX* | *-* | *[UCXX atau -]* | *[CXX - Nama kelas atau -]* | *Tidak diimplementasikan: [alasan]* | *-* | *-* |
| *...* | *...* | *...* | *...* | *...* | *...* | *...* |

Tabel 5.2. Matriks Kerunutan KNF terhadap Pengujian

| ID KNF | Parameter | KF/UC Terkait | Test Case |
| :--- | :--- | :--- | :--- |
| *KNF01* | *Reliability* | *KF05 / UC03* | *KNF01-TC01* |
| *KNFXX* | *[Parameter]* | *[KFXX / UCXX atau -]* | *[KNFXX-TCYY]* |
| *...* | *...* | *...* | *...* |