<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 5
<br>
DESKRIPSI PERANCANGAN PERANGKAT LUNAK (DPPL)
</h1>
<br>


## EcoTrack
### <p align="center">
<img alt="Contoh Arsitektur MVC" src="./assets/diagram/logo-EcoTrack.PNG" width="25%">
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

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | Bab 4 Diagram Kelas Keseluruhan bagian Daftar Kelas Perancangan Keseluruhan ada beberapa ID Kelas yang dihapus. |

---

<br>

---

# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Dokumen SKPL ditulis dengan tujuan menciptakan suatu dokumen penghubung antara pengembang dan pengguna perangkat lunak. Tidak dapat dipungkiri bahwa dalam pengembangan perangkat lunak, terdapat banyak masalah yang menghambat proses pengembangan, termasuk tapi tidak terbatas pada konflik kepentingan, tuntutan kontrak, dan pemahaman yang berbeda. Aplikasi EcoTrack sendiri tidak terlepas dari masalah ini, mengingat kompleksitas sistem yang dirancang dan akan dibangun. Oleh karena itu, diharapkan bahwa penulisan dokumen ini akan menghilangkan ambiguitas, mencegah miskomunikasi, dan menghasilkan perangkat lunak yang sesuai kebutuhan dan mudah dirawat.

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
| Kebutuhan Fungsional | KFXX | Penomoran untuk ID kebutuhan fungsional dengan 2 digit angka yang dimulai dari KF01. |
| Kebutuhan Non-Fungsional | KNFXX | Penomoran untuk ID kebutuhan non-fungsional dengan 2 digit angka yang dimulai dari KNF01. |
| Use Case | UCXX | Penomoran untuk ID use case dengan 2 digit angka yang dimulai dari UC01. |
| Kelas | CXX | Penomoran untuk ID kelas dengan 2 digit angka yang dimulai dari C01. |
| Kebutuhan | RXX | Penomoran untuk ID kebutuhan dengan 2 digit angka yang dimulai dari R01. |

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

---

# BAB 2: Perancangan Arsitektur

## 2.1 Rancangan Lingkungan Implementasi
Tabel 2.1. Rancangan Lingkungan Implementasi

| Komponen | Spesifikasi |
| :--- | :--- |
| OS | Android |
| DBMS | Firebase |
| *Development Tools* | GitHub, Visual Studio Code, Figma, Procreate |
| *Filing System* | Direktori model/ menyimpan kelas entitas dan representasi data, controller/ menyimpan kelas yang menangani logika PL, ui/ menyimpan komponen antarmuka pengguna, database/ menyimpan komponen untuk mengakses dan mengelola data Firebase, serta utils/ menyimpan fungsi utilitas yang digunakan bersama. |
| Bahasa Pemrograman | Python, Javascript |

## 2.2 Style/Pattern Arsitektur Acuan
Struktur MVC sesuai dengan kebutuhan fungsional EcoTrack karena setiap fitur dapat memiliki interface sebagai View, controller sebagai pengolah proses, dan entity sebagai Model. Sebagai contoh, proses pengelolaan jadwal melibatkan Jadwal Interface untuk interaksi pengguna, Jadwal Controller untuk menangani proses pengelolaan, dan Jadwal untuk mengelola data jadwal. Pembagian ini juga dapat diterapkan pada fitur autentikasi, pemindaian sampah, dan informasi sampah.

<p align="center">
<img alt="Contoh Arsitektur MVC" src="./assets/diagram/arsitektur-mvc.png" width="40%">
</p>
<p align="center">
<i>Gambar 1. Contoh Arsitektur MVC</i>
</p>

## 2.3 Identifikasi Komponen / Modul / Subsistem
Tabel 2.3. Identifikasi Komponen/Modul/Subsistem

| Nama Komponen/Modul/Subsistem | Jenis                 | Penjelasan                                                                                                           |
| :---------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------- |
| AkunPetugasInterface                 | View                | Menampilkan antarmuka Log In, Sign Up, Log Out, dan akun petugas. Lalu meneruskan aksi ke AkunPetugasController     |
| JadwalInterface               | View                | Menampilkan antarmuka daftar jadwal pembuangan sampah, pencarian lokasi TPS, dan pengaturan jadwal. Lalu meneruskan aksi ke JadwalController.                                                       |
| InformasiSampahInterface                | View                | Menampilkan antarmuka daftar katalog informasi sampah dan cara mendaur ulang.                                        |
| PemindaiInterface          | View                | Menampilkan antarmuka pemindaian sampah.                                         |
| AkunPetugasController           | Controller          | Memproses logika autentikasi petugas (Log In, Sign Up, Log Out), melakukan validasi kredensial, dan melakukan enkripsi dan dekripsi data kredensial.                                             |
| JadwalController         | Controller          | Memproses permintaan penambahan, perubahan, dan penghapusan jadwal pengambilan sampah, serta mencari lokasi TPS.                                          |
| InformasiSampahController        | Controller          | Memproses permintaan data informasi sampah dan cara daur ulang yang sesuai.                |
| PemindaiController           | Controller          | Memproses pemindaian sampah.                                                              |
| AkunPetugas                      | Model               | Merepresentasikan data akun petugas kebersihan serta metode untuk verifikasi dan mengelola kredensial.                        |
| Jadwal                   | Model               | Merepresentasikan data jadwal pengambilan sampah serta metode untuk mengakses dan mengubahnya.       |
| InformasiSampah                     | Model               | Merepresentasikan data informasi sampah serta metode untuk mengakses detailnya.          |
| Database                     | Penyimpanan Data               | Menyimpan seluruh data model secara terpusat di Firebase.          |

## 2.4 Model Arsitektur Perangkat Lunak

### 2.4.1 Logical View 
Alasan penggunaan Logical View sebagai arsitektur model perangkat lunak EcoTrack adalah pemisahan tanggung jawab, ketertelusuran komponen, dan tingkat abstraksi logis. Melalui logical view, tanggung jawab setiap kelas terisolasi dengan jelas menurut perannya selaras arsitektur Modell-View-Controller (MVC). Selain itu, Logical View menjamin setiap komponen yang diidentifikasi pada bab 2 terpetakan secara lengkap dan konsisten pada diagram perancangan selama pengembangan. Relasi dan alur interaksi logis antar setiap komponen juga dapat dipahami dengan mudah.

<p align="center">
<img alt="Gambar 2. Logical View pada P/L EcoTrack" src="./assets/diagram/logical-view.png" width="50%">
</p>
<p align="center">
<i>Gambar 2. Logical View pada P/L EcoTrack</i>
</p>

# BAB 3: Realisasi Use Case

## 3.1 Use Case [Nama Use Case 1]

**ID Use Case:** *[UC01 sesuai SKPL]*  
**Nama Use Case:** *[Nama use case sesuai SKPL]*

### 3.1.1 Identifikasi Kelas

Identifikasi kelas yang terkait dengan use case tersebut. Kelas di tahap perancangan dapat berbeda dengan dengan kelas di tahap analisis. Dapat menggunakan tabel di bawah:

Tabel 3.1. Identifikasi Kelas Use Case [UC01]

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | *[Nama kelas perancangan]* | *[Nama kelas analisis pada SKPL]* |
| 2 | *[Nama kelas perancangan]* | *[Nama kelas analisis pada SKPL]* |
| ... | *...* | *...* |

### 3.1.2 Sequence Diagram

Buat *sequence diagram* untuk **setiap skenario use case**, mencakup skenario normal dan alternatif pada subbab 4.4 SKPL. Diagram melibatkan kelas-kelas yang telah diidentifikasi pada SKPL. 

- **Skenario Normal**

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-sequence_diagram.png" width="50%">
</p>
<p align="center">
<i>Gambar X. Sequence Diagram [UC01]</i>
</p>

- **Skenario Alternatif [Nomor]: [Nama Skenario]**

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-sequence_diagram.png" width="50%">
</p>
<p align="center">
<i>Gambar X. Sequence Diagram [UC01] - [Nama skenario alternatif]</i>
</p>

### 3.1.3 Diagram Kelas

Buatlah diagram kelas untuk use case ini yang terdiri atas kelas-kelas dari 3.1.1. **Setiap kelas pada diagram wajib menampilkan atribut dan metode/operasi langsung di dalam kotak kelasnya**, sehingga tidak perlu membuat tabel daftar atribut dan metode per kelas pada subbab ini. Daftar lengkap atribut dan metode seluruh kelas disajikan pada Tabel 4.1 (Bab 4).

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh_class-diagram2.jpg" width="35%">
</p>
<p align="center">
<i>Gambar X. Diagram Kelas [Nama Uce Case]</i>
</p>

Pada diagram, pastikan:
- Atribut dituliskan beserta visibilitas dan tipe datanya, misalnya `- email: String`.
- Operasi dituliskan beserta visibilitas, parameter, dan tipe kembaliannya, misalnya `+ login(email: String, password: String): Boolean`.
- Relasi antarkelas (asosiasi, agregasi, komposisi, generalisasi, dan dependensi) digambarkan lengkap dengan multiplisitas.
- Semua operasi yang dipanggil pada sequence diagram 3.1.2 (skenario normal dan alternatif) ada pada kelas yang bersangkutan.
- Kelas yang sama dengan kelas di use case lain memakai nama, atribut, dan metode yang konsisten.

## 3.2 Use Case XX

Silahkan lanjutkan untuk  *use case* berikutnya dengan content yang sama dengan 3.1

<br>

---

# BAB 4: Diagram Kelas Keseluruhan

## 4.1 Diagram Kelas

<p align="center">
<img alt="Kelas Diagram EcoTrack" src="./assets/diagram/KelasDiagramKeseluruhan.png" width="35%">
</p>
<p align="center">
<i>Gambar 4.1. Diagram Kelas Perancangan Keseluruhan [Nama P/L]</i>
</p>

Tabel 4.1. Daftar Kelas Perancangan Keseluruhan

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C01* | AkunPetugas | -statusLogin, #lokasi, #email, #lokasi, -enskripsiPass | +cekStatusLogin(), +getNama(), +getLokasi(), +getEmail(), -validasiEmail(), -validasiPass() |
| *C02* | AkunPetugasController | - | -enskripsi(), -deskripsi(), +singup() |
| *C03* | AkunPetugasInterface | - | +showSignup() |
| *C04* | Jadwal | -idJadwal, -tanggal, -kecamatan, -kelurahan | +getIdJadwal(), +getTanggal(), +getKecamatan(), +getKelurahan(), +setTanggal(), +setKecamatan(), +setKelurahan() |
| *C05* | JadwalController | -daftarJadwal | +cariLokasiTPS(), +getDaftarKecamatan(), +getDaftarKelurahan(), +addJadwal(), +editJadwal(), +removeJadwal(), +addLokasiTPS(), +getJadwal() |
| *C06* | JadwalInterface | - | +showHalamanJadwal(), +showPencarianLokasiTPS(), +showDaftarLokasiTPS(), +showFormJadwal(), +showFormLokasiTPS(), +showNotifikasi(), +showKonfirmasiHapus(), +showJadwal(), +refresh() |
| *C07* | InformasiSampah | -id, -judul, -deskripsi | +getDetail(id) |
| *C08* | InformasiSampahController | - | +getMain(), +getDetail(id) |
| *C09* | InformasiSampahInterface | - | +showMain(), +showDetail(id), +showSearch(list), +showError(kode) |
| *C10* | PemindaiController | *-isScanning, -hasilIdentifikasi* | *+startPemindaian(), +prosesFrame(), +stopPemindaian()* |
| *C11* | *Pemindai Interface* | *-viewKamera, -overlayBox, -labelJenisSampah* | *+showLiveFeed(), +showJenis()* |

<br>

# BAB 5: Matriks Kerunutan

| Kelas | Use Case Terkait |
| :--- | :--- |
| *C01* - AkunPetugas | *UC01 - Melakukan Login, UC06 - Membuat Akun* |
| *C02* - AkunPetugasController | *UC01 - Melakukan Login, UC03 - Mengatur Jadwal, UC06 - Membuat Akun* |
| *C03* - AkunPetugasInterface | *UC01 - Melakukan Login, UC06 - Membuat Akun* |
| *C04* - Jadwal | *UC03 - Mengatur Jadwal, UC04 - Melihat Jadwal* |
| *C05* - JadwalControler | *UC03 - Mengatur Jadwal, UC04 - Melihat Jadwal* |
| *C06* - JadwalInterface | *UC03 - Mengatur Jadwal, UC04 - Melihat Jadwal* |
| *C07* - InformasiSampah | *UC02 - Memindai Sampah, UC05 - Mengakses Tampilan Informasi* |
| *C08* - InformasiSampahController | *UC02 - Memindai Sampah, UC05 - Mengakses Tampilan Informasi* |
| *C09* - InformasiSampahInterface | *UC02 - Memindai Sampah, UC05 - Mengakses Tampilan Informasi* |
| *C10* - PemindaiController | *UC02 - Memindai Sampah* | *KF01
| *C11* - PemindaiInterface | *UC02 - Memindai Sampah* | *KF01
