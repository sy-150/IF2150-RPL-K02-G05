<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 1
<br>
TOPIC BRAINSTORMING
</h1>
<br>

## *Nama Perangkat Lunak*

### Untuk: Agatha

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *K2* |
| Kelompok | *5* |

| NIM | Nama |
|---|---|
| *13525038* | *Mochammad Adhitya Nur Rohman* |
| *13525068* | *Kelvin Sebastian Yen* |
| *13525086* | *Arla Salsabila* |
| *13525137* | *Maharani Puan Satira* |
| *13525146* | *Muhammad Reffah* |
---

<br>
<br>

# BAB 1: Analisis Permasalahan

## 1.1 Latar Belakang Masalah
Sampah merupakan permasalahan umum di Indonesia, seperti tingginya volume sampah yang tidak terkelola dengan baik, keterbatasan kapasitas Tempat Pembuangan Akhir (TPA), sampai ke kesadaran masyarakat itu sendiri. Berdasarkan data Sistem Informasi Pengolahan Nasional (SIPSN) Kementerian Lingkungan Hidup dan Kehutanan (KLHK) pada 2023, per 24 Juli 2024 hasil input dari 290 kabupaten/kota se-Indonesia jumlah timbunan sampah nasional mencapai angka 31,9 juta ton. Dari total produksi sampah nasional, 63,3% atau 20,5 juta ton dapat terkelola, tetapi sisanya 35,67% atau 11,3 juta ton sampah tidak terkelola (BRIN, 2026).

Apabila permasalahan sampah dibiarkan terus, agenda global yang disusun oleh Perserikatan Bangsa-Bangsa, yaitu Sustainable Development Goals (SDG)/Tujuan Pembangunan Berkelanjutan (TPB)  tak terpenuhkan, terutama TPB ke-15 yaitu Life on Land atau Ekosistem daratan. TPB ke-15 yaitu Ekosistem daratan memiliki tujuan utama melindungi, merestorasi, dan meningkatkan pemanfaatan ekosistem daratan. Dampak apabila TPB ke-15 terutama di ranah pengelolaan sampah yang buruk yaitu:
1. Pencemaran lingkungan tanah.
2. Memberikan dampak buruk bagi kesehatan manusia sebab timbulnya beberapa penyakit.
3. Tingkat kematian hewan dan tumbuhan meningkat sebab rusaknya habitat mereka.

Pemerintah telah menyiapkan strategi komprehensif untuk mengelola sampah. Menurut Kementerian Sekretariat Negara Republik Indonesia (2025), Agus Harimurti Yudhoyono (AHY) menyatakan bahwa diperlukan terobosan termasuk penggunaan teknologi dan infrastruktur yang berfokus pada penangan sampah dari hulu hingga hilir, dari rumah tangga, industri, dan semua yang memproduksi sampah. Menurut AHY, tak hanya teknologi yang penting, tetapi meningkatkan kesadaran masyarakat dan memastikan pengelolaan sampah dilakukan secara berkelanjutan. Namun, selain solusi yang ditawarkan oleh pemerintah, terdapat aksi yang dapat dilakukan oleh semua orang, yaitu:
1. Pilah-pilih sampah sebab memudahkan pengelolaan selanjutnya dan mengurangi pencemaran yang diakibatkan penumpukkan sampah yang tercampur.
2. Daur ulang sampah sebab meminimalisir pencemaran lingkungan dan melestarikan sumber daya alam.

Meskipun berbagai upaya tersebut sudah dilakukan, pengelolaan sampah tetap membutuhkan keterlibatan masyarakat secara aktif dan berkelanjutan. Pemilahan dan daur ulang sampah tidak akan berjalan optimal apabila masyarakat belum memiliki pengetahuan yang cukup mengenai jenis sampah, cara pengelolaan, dan tindakan yang tepat terhadap sampah yang dihasilkan. Maka dari itu, diperlukan sumber atau pendekatan yang mudah diakses oleh semua masyarakat untuk meningkatkan pemahaman dan mendorong perubahan perilaku masyarakat secara berkelanjutan.

## 1.2 Analisis Kondisi Saat Ini
Saat ini, sudah ada beberapa aplikasi berbasis deteksi jenis sampah dan daur ulang. Aplikasi yang peneliti telah coba yaitu Scrapp dan EcoScan. Scrapp memiliki fitur scan sampah berbasis *barcode*. Apabila data *barcode*-nya ada, maka info terkait jenis sampah dan cara daur ulang akan muncul. Namun, aplikasi Scrapp tidak dapat memindai sampah yang tidak memiliki *barcode*, pengguna harus memasukkan sendiri informasinya. Sedangkan, aplikasi EcoScan sudah menerapkan pemindaian sampah hanya dengan memfoto sampah tersebut, tetapi hasil deteksi jenis sampah tidak seakurat Scrapp.

Kekurangan yang dimiliki dua aplikasi tersebut adalah tidak memiliki jadwal pembuangan sampah. Walaupun Scrapp memiliki fitur peta untuk melihat lokasi untuk melakukan daur ulang, tetapi hanya berbasis di Amerika Serikat saja dan tidak memenuhi kondisi di Indonesia yang mana lokasi untuk melakukan daur ulang masih terbatas. Maka dari itu, diperlukan perangkat lunak yang tidak hanya menyediakan sistem pemindaian sampah tanpa barcode dengan hasil deteksi yang akurat, tetapi juga dilengkapi dengan fitur jadwal pembuangan sampah. Fitur tersebut memungkinkan pengguna melihat jadwal pembuangan sampah secara konsisten, sementara petugas kebersihan dapat memperbarui jadwal tersebut sesuai dengan kondisi operasional di lapangan.

---

# BAB 2: Analisis Solusi

## 2.1 Deskripsi Perangkat Lunak
Berdasarkan permasalahan yang telah dikaji, dirumuskan sebuah solusi untuk memitigasi isu sampah, yaitu mobile application pendeteksi sampah. Aplikasi ini dirancang agar pengguna dapat dengan mudah mengidentifikasi jenis sampah melalui handphone, kemudian mendapatkan solusi untuk menanganinya. Mengidentifikasi jenis sampah adalah fitur utama dari aplikasi ini, dengan 2 metode identifikasi tersedia, yaitu barcode untuk sampah produk spesifik dan visual untuk sampah secara umum. Aplikasi ini juga menawarkan informasi terkait metode daur ulang berdasarkan jenis sampah sebagai alternatif dari membuang sampah. Selain itu, tersedia layanan bagi petugas kebersihan untuk membuat dan mengawasi jadwal pembuangan sampah.

Keunggulan inti dari aplikasi ini adalah mengkoordinasi antara masyarakat dan petugas kebersihan dalam mengelola sampah. Saat ini, tidak tersedia layanan spesifik yang dapat menjadi alat identifikasi jenis sampah atau media komunikasi cepat antara masyarakat dengan petugas kebersihan. Untuk masyarakat, aplikasi ini menyediakan layanan untuk dengan cepat mengidentifikasi jenis sampah, sehingga pengguna tidak kebingungan saat memilah sampah. Petugas sendiri dimudahkan pekerjaannya karena tidak kerepotan memilah kembali sampah yang dikelompokkan dalam jenis salah, serta dapat mengatur jadwal dengan fleksibel. Selain itu, karena aplikasi ini berbasis seluler, pengguna dapat dengan mudah mengaksesnya kapan saja melalui handphonenya.


## 2.2 Asumsi dan Batasan
Definisikan secara tegas asumsi (baik teknis maupun dari sisi pengguna) yang menjadi dasar pengembangan. Tuliskan batasan seperti regulasi/hukum, keterbatasan sumber daya, dan ruang lingkup solusi.

---

# BAB 3: Spesifikasi Kebutuhan dan Proses Bisnis

## 3.1 Identifikasi Aktor
| Aktor | Deskripsi |
| :--- | :--- |
| *Masyarakat Umum* | *Pengguna ini bertindak sebagai pihak yang memindai sampah dengan barcode kemasan produk atau visual sampah untuk mengetahui kategori sampah tersebut. Karakteristik dari pengguna ini adalah mengutamakan kemudahan dan kepraktisan akses melalui handphone agar tidak bingung saat memilah sampah.
| *Petugas Kebersihan* | *Pengguna ini bertindak sebagai pihak yang bertanggung jawab dalam pembuatan dan pengelolaan jadwal pembuangan sampah. Karakteristik dari pengguna ini adalah mengutamakan kemudahan input data dengan cepat dan fleksibel.* |

## 3.2 Kebutuhan Pengguna Awal
| ID | Aktor | Kebutuhan / Aktivitas | Tujuan / Nilai |
| :--- | :--- | :--- | :--- |
| US-01 | *Masyarakat Umum* |  *Memindai sampah dengan barcode kemasan produk atau visual sampah* | *Dapat mengetahui kategori dari sampah yang dipindai.* |
| US-02 | *Masyarakat Umum* |  *Memindai sampah dengan barcode kemasan produk atau visual sampah* | *Mendapatkan saran dan cara mendaur ulang sampah yang dipindai.* |
| US-03 | *Petugas Kebersihan* |  *Membuat dan mengelola jadwal pembuangan sampah* | *Jadwal pembuangan sampah dapat terdata dan ditampilkan kepada pengguna.* |

## 3.3 Model Proses Bisnis
Buatlah *Activity Diagram* atau *Swimlane Diagram* yang menunjukkan alur kerja proses bisnis dari sistem solusi. Diagram ini harus memvisualisasikan bagaimana alur operasional di dunia nyata berjalan lebih efisien dengan adanya interaksi antara aktor (yang didefinisikan pada poin 3.1) dan sistem perangkat lunak. Perhatikan notasi yang digunakan dalam pembuatannya.
<br>

<p align="center">
<img alt="Contoh Activity Diagram" src="./assets/diagram/diagram-act-1.avif" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Activity Diagram</i>
</p>

<br>

# Referensi
- 11,3 Juta Ton Sampah di Indonesia Tidak Terkelola dengan Baik, brin.go.id, 26 Juli 2024, https://brin.go.id/drid/posts/kabar/113-juta-ton-sampah-di-indonesia-tidak-terkelola-dengan-baik. Accessed 30 Agustus 2026.
- Dampak Sampah yang Tidak Dikelola dengan Baik, paxel.co, 8 Juni 2025, https://paxel.co/id/berita-dan-promo/dampak-sampah-yang-tidak-dikelola-dengan-baik. Accessed 30 Agustus 2026.
- Apa yang terjadi jika target SDGs gagal tercapai pada tahun 2030?, jejakin.com, https://www.jejakin.com/id/blog/if-sdgs-fail-by-2030. Accessed 30 Agustus 2026.
- Pengelolaan Sampah Jadi Prioritas, Pemerintah Siapkan Strategi Komprehensif, Kementerian Sekretariat Negara Republik Indonesia, 12 Maret 2025, https://setneg.go.id/baca/index/pengelolaan_sampah_jadi_prioritas_pemerintah_siapkan_strategi_komprehensif. Accessed 30 Agustus 2026.
- 8 Manfaat Daur Ulang Sampah dan Cara Membiasakannya, BANK MEGA Syariah, 9 Desember 2024, https://www.megasyariah.co.id/id/artikel/edukasi-tips/lainnya/manfaat-daur-ulang. Accessed 30 Agustus 2026.
- Pristiandaru, Danur Lumbang. Mengenal Tujuan 15 SDGs: Ekosistem Daratan Sumber: https://lestari.kompas.com/read/2023/05/23/080000286/mengenal-tujuan-15-sdgs--ekosistem-daratan. Membership: https://kmp.im/plus6 Download aplikasi: https://kmp.im/app6, Kompas.com, 23 Mei 2023, https://lestari.kompas.com/read/2023/05/23/080000286/mengenal-tujuan-15-sdgs--ekosistem-daratan. Accessed 30 Agustus 2026.

# Lampiran
