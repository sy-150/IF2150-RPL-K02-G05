<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 3
<br>
USE CASE & SCENARIO USE CASE
</h1>
<br>

## *Nama Perangkat Lunak*

### Untuk: *[Nama Asisten]*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *\[Kelas\]* |
| Kelompok | *\[Nomor Kelompok\]*  |

| NIM | Nama |
|---|---|
| *[NIM 1]* | *[Nama Anggota 1]* |
| *[NIM 2]* | *[Nama Anggota 2]* |
| *[NIM 3]* | *[Nama Anggota 3]* |
| *[NIM 4]* | *[Nama Anggota 4]* |
| *[NIM 5]* | *[Nama Anggota 5]* |
---

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

<br>
<br>

# BAB 1: Deskripsi Perangkat Lunak

EcoTrack adalah sebuah sistem aplikasi perangkat lunak berbasis mobile yang dirancang untuk mengatasi isutentang sampah. Aplikasi ini digunakan untuk mengidentifikasi jenis sampah secara praktis serta penghubung antara masyarakat dengan petugas kebersihan. Alur kerja sistem dibagi menjadi dua berdasarkan penggunanya. Bagi masyarakat, alur kerja dimulai dengan pengguna memindai sampah menggunakan perangkat mobile. Setelah itu, sistem akan mengidentifikasi jenis sampah tersebut dan menampilkan informasi terkait metode daur ulang yang dapat dilakukan. Sementara itu, bagi petugas kebersihan, alur kerjanya meliputi memasukkan, mengubah, dan mengelola jadwal pengambilan sampah. Jadwal yang dimasukkan oleh petugas ini kemudian akan ditampilkan kepada masyarakat secara konsisten. 

Harapan dari penerapan solusi ini adalah untuk memberikan kemudahan bagi masyarakat agar tidak kebingungan saat memilah sampah, sekaligus mempermudah pekerjaan petugas kebersihan agar tidak perlu memilah kembali sampah yang salah dikelompokkan. Secara jangka panjang, sistem ini diharapkan dapat meningkatkan pemahaman masyarakat dan mendorong perubahan perilaku yang berkelanjutan terkait daur ulang dan pemilahan sampah.  

---

# BAB 2: Kebutuhan Fungsional (KF)

| ID KF | ID Kebutuhan | Penjelasan |
| :--- | :--- | :--- |
| *KF01* | *R01* | *PL dapat menggunakan kamera setelah menyetujui akses aplikasi terkait penggunaan kamera* |
| *KF02* | *R01* | *PL dapat melakukan request ke API model computer vision setelah pengguna menyorot sampah melalui kamera* |
| *KF03* | *R03* | *PL dapat mengirimkan query jadwal pengambilan sampah setelah pengguna membuka menu cek jadwal* |
| *KF04* | *R03* | *PL dapat menampilkan jadwal pengambilan sampah setelah mendapat respons dari query ke database jadwal pengambilan sampah* |
| *KF05* | *R04* | *PL dapat melakukan query penambahan maupun perubahan jadwal ke database setelah petugas mengirimkan perubahan* |
| *KF06* | *R05* | *PL dapat menampilkan hasil pemilahan sampah dari respons API model computer vision* |
| *KF07* | *R06* | *PL dapat menampilkan cara mendaur ulang yang sesuai setelah pengguna melakukan search tipe sampah* |
| *KF08* | *R08* | *PL dapat melakukan autentikasi akun terhadap database ketika petugas melakukan login* |

---

# BAB 3: Model Use Case

## 3.1 Identifikasi Aktor

| Aktor | Deskripsi |
| :--- | :--- |
| *Masyarakat Umum* | *Pengguna yang melakukan scan pada sampah dan cek jadwal melalui sistem.* |
| *Petugas* | *Pengguna yang mengupdate jadwal secara berkala pada sistem.* |
| *API model computer vision* | *Sistem yang melakukan identifikasi jenis sampah yang didapat dari pengguna.* |
| *Database* | *Sistem yang menyimpan data jadwal yang didapat dari petugas.* |

## 3.2 Identifikasi Use Case
Identifikasi seluruh use case yang mencakup Kebutuhan Fungsional pada BAB 2. Satu use case boleh mencakup lebih dari satu KF, dan sebaliknya satu KF boleh muncul di lebih dari satu use case bila memang relevan.

| ID UC | Nama Use Case | Deskripsi Singkat | Aktor Terlibat | ID KF Terkait |
| :--- | :--- | :--- | :--- | :--- |
| *UC01* | *Melakukan Pembayaran Digital* | *Pelanggan memilih metode pembayaran dan menyelesaikan transaksi.* | *Pelanggan* | *KF01, KF02* |
| *UC02* | *Memverifikasi Status Pembayaran* | *Kasir mengecek status transaksi pelanggan sebelum menyerahkan barang.* | *Kasir* | *KF03* |
| *...* | *...* | *...* | *...* | *...* |

## 3.3 Use Case Diagram
Buatlah **satu** use case diagram yang mencakup seluruh aktor dan use case. Sertakan relasi *include*/*extend* apabila ada use case yang saling bergantung.
<br>
<p align="center">
<img alt="Contoh Activity Diagram" src="./assets/diagram/contoh-uc-diagram.webp" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Use Case Diagram</i>
</p>
<br>

Hal-hal yang perlu diperhatikan dalam pembuatan use case diagram:
- Pastikan notasi UML use case (aktor, oval use case, garis asosiasi, *include/extend*) digambar dengan benar.
- Seluruh aktor dan use case yang telah didefinisikan harus muncul di diagram, tidak ada yang terlewat maupun berlebih.
- Hindari garis yang saling bersilangan tanpa alasan jelas, susun diagram agar mudah dibaca.
- Hindari istilah solusi teknis (misalnya nama tabel database, nama endpoint API) muncul di dalam diagram use case karena use case menjelaskan *interaksi fungsional*, bukan detail implementasi.

## 3.4 Skenario Use Case
Buat skenario untuk **setiap** use case yang telah diidentifikasi pada 3.2. Setiap skenario dapat terdiri dari dua jenis alur:
- **Skenario Normal**: alur utama (*happy path*) di mana interaksi aktor-sistem berjalan lancar tanpa kendala hingga tujuan use case tercapai.
- **Skenario Alternatif**: alur percabangan dari skenario normal, misalnya kondisi gagal, input tidak valid, atau pilihan lain yang tersedia bagi aktor. Boleh ada lebih dari satu skenario alternatif per use case jika ada beberapa titik percabangan berbeda.

Format tabel skenario: kolom **Aksi Aktor** berisi apa yang dilakukan/diinput aktor, kolom **Reaksi Perangkat Lunak** berisi respons sistem terhadap aksi tersebut secara **berurutan** (nomor langkah harus berpasangan/selaras antar dua kolom).


### 3.4.1 Skenario UC01

**Nama Use Case:** *Melakukan Pembayaran Digital*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pelanggan memilih menu checkout* | *Sistem menampilkan ringkasan pesanan dan pilihan metode pembayaran* |
| 2 | *Pelanggan memilih metode pembayaran (misal: e-wallet)* | *Sistem mengarahkan pelanggan ke halaman konfirmasi e-wallet* |
| 3 | *Pelanggan mengonfirmasi pembayaran* | *Sistem menerima respons pembayaran berhasil, memperbarui status pesanan menjadi "Lunas", dan menampilkan notifikasi pembayaran berhasil* |


<br>

**Skenario Alternatif 1: Otorisasi Pembayaran Gagal**


| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pelanggan memilih menu checkout* | *Sistem menampilkan ringkasan pesanan dan pilihan metode pembayaran* |
| 2 | *Pelanggan memilih metode pembayaran (misal: e-wallet)* | *Sistem mengarahkan pelanggan ke halaman konfirmasi e-wallet* |
| 3 | *Pelanggan mengonfirmasi pembayaran* | *Sistem menerima respons pembayaran gagal (misal: saldo tidak cukup). Sistem menampilkan pesan error dan meminta pelanggan memilih metode pembayaran lain* |
| 4 | *Pelanggan memilih metode pembayaran lain* | *Sistem kembali ke langkah 2 skenario normal* |

### 3.4.2 Skenario UC02

**Nama Use Case:** *Memverifikasi Status Pembayaran*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Kasir memasukkan ID Pesanan pelanggan* | *Sistem menampilkan status pembayaran ("Lunas") beserta detail transaksi* |

<br>

**Skenario Alternatif 1: ID Pesanan Tidak Ditemukan**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Kasir memasukkan ID Pesanan yang salah/tidak ada* | *Sistem menampilkan pesan "ID Pesanan tidak ditemukan" dan meminta kasir memasukkan ulang* |


<sub>*Lanjutkanlah pola 3.4.x ini untuk setiap ID UC yang telah diidentifikasi pada 3.2, sampai seluruh use case memiliki skenario normal dan skenario alternatif (tidak usah dibuat jika use case tersebut memang tidak memiliki skenario alternatif).*<sub>