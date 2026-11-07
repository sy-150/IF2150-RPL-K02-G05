# src/firebase — Database EcoTrack

Folder ini berisi semua yang membentuk database EcoTrack **sebagai kode**: isi data awal (`data/*.json` + `seed.js`), aturan akses (`firestore.rules`), dan pengaturan emulator (`firebase.json`). Firestore tidak punya tabel yang dibuat duluan; koleksi otomatis terbentuk saat `seed.js` menulis dokumen pertama.

Alur pemakaian:

- **Tim saat develop** memakai Firebase cloud (satu database bersama).
- **Asisten / menjalankan dari source code** memakai emulator lokal, tanpa akun dan tanpa API key.
- **APK** memakai Firebase cloud.

Emulator dan cloud **tidak sinkron**; keduanya diisi dari file `data/*.json` yang sama. Data pokok diubah lewat file ini lalu seed ulang, bukan diketik manual di Firebase Console.

Istilah: di Firestore, "tabel" = **koleksi**, "baris" = **dokumen**, "kolom/atribut" = **field**.

## Koleksi

| Koleksi | Id dokumen | Isi | File data |
| --- | --- | --- | --- |
| `informasiSampah` | `plastik`, `kaca`, `aluminium`, `stainless-steel`, `silikon`, `keramik` | `nama`, `jenisSampah` (`anorganik`/`organik`/`residu`), `ringkasan`, `gambar`, `deskripsi`, `labelModel` (array), `daftarIdTipe` (dihitung otomatis oleh seed dari `tipe`, dipakai rules; jangan ditulis di JSON), `tipe` (array: `idTipe`, `nama`, `dibuang` {`gambar`, `langkah`}, `kreasi` {`gambar`, `langkah`, `contohHasil`} atau `null`; `langkah` = array {`judul`, `keterangan`}, `contohHasil` = array {`nama`, `gambar`}) | `informasiSampah.json` |
| `jadwal` | `lebak-siliwangi`, `pasteur`, `sukarasa`, `tamansari`, `kopo`, `hegarmanah` | `kecamatan`, `kelurahan`, `daftarTanggal` (di JSON `"YYYY-MM-DD"`, disimpan sebagai timestamp 00:00 WIB), `diperbaruiPada` | `jadwal.json` |
| `barcodeProduk` | kode barcode (8-14 digit) | `namaProduk` (opsional), `idSampah`, `idTipe`, `sumber` (`seed` atau `pengguna`), `diperbaruiPada`. Dipakai mode barcode Pemindai. Pengguna aplikasi (tanpa login) boleh menambah kode baru dan mengganti kode yang salah | `barcodeProduk.json` (data awal) |
| `dataPemerintah` | NIK (16 digit) | `namaLengkap`, `wilayahTugas` (= id dokumen `jadwal`). Tiruan database pemerintah untuk verifikasi NIK saat Sign Up; nama dan wilayah tugas akun baru disalin dari sini | `dataPemerintah.json` |
| `akunPetugas` | uid dari Firebase Authentication | `username` (nama lengkap), `nik`, `email`, `noTelepon`, `wilayahTugas` (= id dokumen `jadwal`), `dibuatPada` (tanpa kata sandi) | `akunPetugas.json` (akun uji saja) |
| `nikTerdaftar` | NIK (16 digit) | `uid`, `dibuatPada`. Penanda NIK yang sudah punya akun; dibuat bersama profil saat Sign Up, sehingga satu NIK hanya bisa punya satu akun | dibuat otomatis (seed akun uji dan Sign Up) |

Semua data fiktif. NIK memakai awalan `9999` (bukan kode wilayah asli) supaya tidak mungkin sama dengan NIK orang sungguhan.

## Akun dan data uji

- Log In: `petugas@ecotrack.test` / `Petugas123!` (Budi Santoso, NIK `9999011201900003`, wilayah `lebak-siliwangi`). Hanya bisa mengedit jadwal Lebak Siliwangi.
- Sign Up berhasil: NIK `9999014505920001` + nama `Siti Rahmawati` (belum punya akun, wilayah `pasteur`).
- Sign Up gagal: NIK `1234567890123456` → `NIK_TIDAK_TERDAFTAR`; NIK `9999022003880002` + nama selain `Andi Pratama` → `NAMA_TIDAK_SESUAI`; NIK `9999011201900003` (sudah dipakai akun uji) → `NIK_SUDAH_TERDAFTAR`.
- Barcode uji (EAN-13 fiktif, awalan `20` = kode khusus toko, tidak bentrok dengan produk asli): lihat `data/barcodeProduk.json`, misalnya `2000000000015` → Plastik / Botol Plastik. Kode di luar daftar → "Informasi sampah belum tersedia".

`labelModel` masih contoh; sesuaikan dengan nama kelas yang benar-benar dikeluarkan model Pemindai.

## A. Emulator lokal (tanpa akun)

Butuh Java (JDK 21).

```bash
npm install
npm run emulator      # terminal 1; UI di http://localhost:4000
npm run seed          # terminal 2, setelah emulator siap
```

Di `src/ecotrack/.env`: `EXPO_PUBLIC_USE_EMULATOR=true` dan `EXPO_PUBLIC_EMULATOR_HOST=<IP laptop>`.

Data emulator hilang setiap emulator dimatikan; jalankan `npm run seed` lagi.

## B. Firebase cloud

Dilakukan sekali oleh satu orang (pemegang `service-account.json`):

1. Buat project di https://console.firebase.google.com.
2. Build → **Firestore Database** → Create database (edition Standard, database `(default)`, lokasi `asia-southeast2`, production mode).
3. Build → **Authentication** → Get started → aktifkan **Email/Password**.
4. Project settings → **Service accounts** → Generate new private key. Simpan sebagai `src/firebase/service-account.json`. File ini **rahasia** dan sudah ada di `.gitignore`.
5. Isi data dan pasang aturan akses:

```bash
npm install
npm run seed:cloud
npx firebase login
npx firebase deploy --only firestore --project <id-project>
```

Data cloud yang berantakan karena testing bisa dikembalikan kapan saja dengan `npm run seed:cloud` (lihat peringatan di bagian C).

## C. Menambah atau mengubah data

### Perintah seed

| Perintah | Mengisi |
| --- | --- |
| `npm run seed` | Emulator, semua koleksi |
| `npm run seed:cloud` | Cloud, semua koleksi |
| `npm run seed -- --only=<koleksi>` | Emulator, koleksi tertentu |
| `npm run seed:cloud -- --only=<koleksi>` | Cloud, koleksi tertentu |

Pilihan `<koleksi>`: `informasiSampah`, `jadwal`, `barcodeProduk`, `dataPemerintah`, `akunPetugas`. Bisa digabung dengan koma, misalnya `--only=informasiSampah,barcodeProduk`. Tanda `--` sebelum `--only` wajib ditulis supaya npm meneruskannya ke `seed.js`.

Cara kerja seed:

- Data hanya mengalir satu arah, **JSON → database**. Seed tidak membaca isi cloud dan tidak menyentuh emulator kecuali `npm run seed` dijalankan.
- Dokumen yang id-nya ada di JSON **ditimpa utuh** dengan isi JSON. Perubahan pada dokumen itu yang dibuat lewat aplikasi atau Console akan hilang (misalnya jadwal yang diedit petugas kembali ke tanggal awal).
- Dokumen yang id-nya tidak ada di JSON **tidak disentuh** (misalnya akun hasil Sign Up).
- Karena itu, setelah demo jalankan seed hanya untuk koleksi yang memang berubah, dengan `--only`.

### Menambah baris (dokumen baru)

1. Tambahkan satu objek ke file JSON koleksinya. Id dokumen diambil dari field id di objek itu (`idSampah`, `idJadwal`, `kodeBarcode`, `nik`, `uid`), jadi harus unik.
2. Jalankan seed untuk koleksi itu, ke cloud dan (kalau sedang jalan) ke emulator.
3. Commit file JSON-nya, misalnya `feat(data): add kardus category`.

Contoh per koleksi:

```jsonc
// informasiSampah.json: material baru. Ikuti bentuk material lain, termasuk tipe-nya.
{
  "idSampah": "kardus",
  "nama": "Kardus",
  "jenisSampah": "anorganik",
  "ringkasan": "Kardus kemasan, karton, kotak sepatu",
  "gambar": "kardus.png",
  "deskripsi": "Kardus terbuat dari serat kertas yang mudah didaur ulang selama tetap kering dan bersih.",
  "labelModel": ["cardboard"],
  "tipe": [
    {
      "idTipe": "kardus-kemasan",
      "nama": "Kardus Kemasan",
      "dibuang": { "gambar": "tempat-sampah-anorganik.png", "langkah": [{ "judul": "Lepas selotip", "keterangan": "Buang selotip dan label plastik." }] },
      "kreasi": null
    }
  ]
}

// jadwal.json: kelurahan baru. Id = slug kelurahan, huruf kecil dan tanda hubung.
{ "idJadwal": "dago", "kecamatan": "Coblong", "kelurahan": "Dago", "daftarTanggal": ["2026-11-03", "2026-11-06"] }

// barcodeProduk.json: produk baru. idSampah dan idTipe harus ada di informasiSampah.json.
{ "kodeBarcode": "8991234567890", "namaProduk": "Botol Teh 350 ml", "idSampah": "plastik", "idTipe": "botol-plastik" }

// dataPemerintah.json: petugas baru yang boleh Sign Up. wilayahTugas harus ada di jadwal.json.
{ "nik": "9999061108910007", "namaLengkap": "Rina Wulandari", "wilayahTugas": "dago" }

// akunPetugas.json: akun uji baru (seed juga membuat akun login-nya dan penanda nikTerdaftar).
// NIK dan nama harus sama dengan salah satu isi dataPemerintah.json.
{ "uid": "petugas-uji-002", "email": "petugas2@ecotrack.test", "kataSandi": "Petugas123!",
  "username": "Rina Wulandari", "nik": "9999061108910007", "noTelepon": "081200000002", "wilayahTugas": "dago" }
```

Perhatikan hubungan antarkoleksi:

- Kelurahan baru di `jadwal.json` belum punya petugas. Tambahkan NIK dengan `wilayahTugas` kelurahan itu ke `dataPemerintah.json` supaya ada yang bisa mengeditnya.
- Barcode baru harus menunjuk ke `idSampah` dan `idTipe` yang sudah ada.
- Nama file `gambar` baru harus ditambahkan ke aplikasi (`assets/images/` dan peta di `ui/gambarSampah.js`), kecuali isinya link `https://`.

Menghapus baris: hapus objeknya dari JSON **tidak** menghapus dokumennya di database, karena seed hanya menulis. Hapus juga dokumennya lewat Firebase Console (cloud) atau UI emulator di http://localhost:4000.

### Menambah atribut (field baru)

Firestore tidak punya struktur kolom yang kaku, jadi tidak ada perintah "tambah kolom". Caranya:

1. Tambahkan field itu ke **setiap** objek di file JSON koleksinya, dengan tipe yang sama di semua objek (misalnya selalu string, selalu array).
2. Jalankan seed untuk koleksi itu (cloud dan emulator).
3. Tampilkan di aplikasi. Model yang membaca dengan `getDoc`/`getDocs` otomatis ikut membawa field baru; yang perlu diubah biasanya hanya halaman yang menampilkannya.
4. Perbarui tabel **Koleksi** di README ini dan skema basis data di `src/README.md` (poin 8), lalu catat di laporan B.1 kalau atribut itu belum ada di DPPL.
5. Commit, misalnya `feat(data): add jenisSampah to informasiSampah`.

Khusus koleksi yang juga diisi aplikasi (`akunPetugas`):

- Akun yang sudah dibuat lewat Sign Up tidak otomatis punya field baru. Kode harus tetap jalan walaupun field belum ada, misalnya `data.fotoProfil ?? null`.
- Kalau field itu boleh diubah petugas, tambahkan namanya ke `hasOnly([...])` di aturan `update` `akunPetugas` dalam `firestore.rules`, lalu deploy ulang rules (bagian D). Kalau ikut diisi saat Sign Up, sesuaikan juga aturan `create`.

### Menambah koleksi baru

1. Buat file `data/<koleksi>.json`.
2. Di `seed.js`, buat fungsi `seed<Koleksi>()` (contek `seedBarcodeProduk`) dan daftarkan di objek `LANGKAH`.
3. Tambahkan aturan aksesnya di `firestore.rules`. Tanpa aturan, aplikasi ditolak membaca koleksi itu.
4. Seed, deploy rules, dan perbarui tabel **Koleksi**.

### Menyalin data cloud ke JSON dan emulator (pull)

Kalau data ditambah langsung di Firebase Console dan ingin ikut ada di repo dan emulator, balik arahnya dengan `pull.js` (butuh `service-account.json`):

```bash
npm run pull:cloud -- --only=informasiSampah     # cloud → data/informasiSampah.json
git diff data/                                    # cek apa saja yang berubah
npm run seed -- --only=informasiSampah            # JSON → emulator (kalau sedang jalan)
```

- Koleksi yang bisa di-pull: `informasiSampah`, `jadwal`, `barcodeProduk`, `dataPemerintah`. Tanpa `--only`, keempatnya di-pull.
- `akunPetugas` dan `nikTerdaftar` sengaja tidak di-pull: isinya data pengguna yang tidak boleh masuk repo public, dan kata sandi login memang tidak bisa diekspor.
- File JSON **ditimpa** dengan isi cloud. Urutan dan susunan field mengikuti file lama, jadi `git diff` hanya menunjukkan isi yang berubah. Dokumen yang sudah tidak ada di cloud ikut hilang dari JSON.
- `jadwal` yang di-pull ikut membawa tanggal hasil edit petugas. Kalau itu bukan yang diinginkan, jangan pull `jadwal`, atau kembalikan perubahannya dengan `git checkout data/jadwal.json`.

### Satu koleksi, satu sumber data

Pilih salah satu untuk setiap koleksi: **file JSON** atau **Firebase Console**. Jangan dicampur, karena seed menimpa perubahan dari Console pada dokumen yang id-nya ada di JSON. Sampai penilaian selesai, ubah data pokok lewat JSON. Setelah itu, kalau tim memutuskan memakai cloud saja, data boleh diubah langsung di Console (Document ID diisi sendiri, tipe field sama dengan dokumen lain), dan `seed:cloud` tidak dijalankan lagi untuk koleksi itu.

## D. Mengubah aturan akses

1. Edit `firestore.rules`.
2. Deploy ke cloud: `npx firebase deploy --only firestore --project <id-project>`. Emulator membaca file terbaru setiap kali dinyalakan ulang.
3. Cek di Firebase Console → Firestore → Rules → **Rules Playground**.
4. Commit `firestore.rules`.

`firebase deploy` memakai akun Google yang login di `npx firebase login`, bukan `service-account.json`. Akun itu harus terdaftar sebagai anggota project (Project settings → **Users and permissions**).

## E. CRUD dari aplikasi

Firestore tidak dipanggil lewat URL seperti REST API (GET, POST, PUT, DELETE), tapi lewat fungsi SDK `firebase/firestore`. Semua fungsi ini **hanya ditulis di `model/`**; halaman dan Controller tidak pernah memanggil Firestore langsung. Setiap panggilan diperiksa security rules (bagian D), jadi panggilan yang tidak diizinkan gagal dengan `permission-denied`.

| Mirip REST | Fungsi Firestore | Kapan dipakai |
| --- | --- | --- |
| GET satu | `getDoc(doc(db, 'koleksi', id))` | Detail material, profil, cari barcode |
| GET banyak | `getDocs(collection(db, 'koleksi'))` | Katalog, daftar jadwal |
| GET dengan filter | `getDocs(query(collection(db, 'koleksi'), where('field', '==', nilai)))` | Jarang dibutuhkan di proyek ini |
| POST dengan id sendiri | `setDoc(doc(db, 'koleksi', id), isi)` | Profil (`uid`), barcode (kode barcode) |
| POST dengan id otomatis | `addDoc(collection(db, 'koleksi'), isi)` | Data tanpa id alami (belum dipakai) |
| PUT (ganti semua) | `setDoc(doc(...), isi)` | Mengganti isi barcode yang salah |
| PATCH (ubah sebagian) | `updateDoc(doc(...), { field: nilai })` | Edit profil, simpan jadwal |
| DELETE | `deleteDoc(doc(...))` | Tidak diizinkan rules di koleksi mana pun |

Semua fungsi di atas asinkron: pakai `async`/`await` sampai ke Controller, dan bungkus penulisan dengan `try`/`catch`.

### Contoh

```js
import {
  doc, collection, getDoc, getDocs, setDoc, updateDoc,
  serverTimestamp, Timestamp, writeBatch,
} from 'firebase/firestore';
import { db } from '@/database/firebase';

// GET satu: detail material
const snap = await getDoc(doc(db, 'informasiSampah', 'plastik'));
const plastik = snap.exists() ? { idSampah: snap.id, ...snap.data() } : null;

// GET banyak: semua jadwal
const hasil = await getDocs(collection(db, 'jadwal'));
const daftarJadwal = hasil.docs.map((d) => ({ idJadwal: d.id, ...d.data() }));

// Timestamp → Date untuk ditampilkan, dan Date → Timestamp untuk disimpan
const tanggal = daftarJadwal[0].daftarTanggal.map((t) => t.toDate());
const untukDisimpan = tanggal.map((d) => Timestamp.fromDate(d));

// PATCH: petugas menyimpan jadwal wilayahnya (field lain tidak berubah)
await updateDoc(doc(db, 'jadwal', 'lebak-siliwangi'), {
  daftarTanggal: untukDisimpan,
  diperbaruiPada: serverTimestamp(), // jam server, bukan jam HP
});

// PATCH: petugas mengubah profilnya sendiri (hanya email dan noTelepon yang diizinkan rules)
await updateDoc(doc(db, 'akunPetugas', auth.currentUser.uid), { noTelepon: '081200000009' });

// POST/PUT dengan id sendiri: pengguna menambah atau membetulkan barcode
await setDoc(doc(db, 'barcodeProduk', '8991234567890'), {
  namaProduk: 'Botol Teh 350 ml',
  idSampah: 'plastik',
  idTipe: 'botol-plastik',
  sumber: 'pengguna',
  diperbaruiPada: serverTimestamp(),
});

// Beberapa tulisan sekaligus (semua berhasil atau semua batal): dipakai saat Sign Up
const batch = writeBatch(db);
batch.set(doc(db, 'akunPetugas', uid), profil);
batch.set(doc(db, 'nikTerdaftar', nik), { uid, dibuatPada: serverTimestamp() });
await batch.commit();
```

Catatan:

- `setDoc` **menimpa seluruh dokumen**; field yang tidak ditulis ikut hilang. Untuk mengubah sebagian, pakai `updateDoc`, atau `setDoc(ref, isi, { merge: true })`.
- `updateDoc` gagal kalau dokumennya belum ada. `setDoc` membuat dokumen baru kalau belum ada.
- Untuk menambah satu isi ke array tanpa menimpa yang lain: `updateDoc(ref, { daftarTanggal: arrayUnion(tanggal) })`; menghapus satu isi: `arrayRemove(tanggal)`.
- Login, daftar, dan keluar bukan lewat Firestore, tapi lewat `firebase/auth`: `signInWithEmailAndPassword`, `createUserWithEmailAndPassword`, `signOut`, `updatePassword`.
- Pemindai kamera memanggil Cloudflare Worker dengan `fetch` biasa (HTTP POST), bukan lewat Firestore.

### Siapa boleh apa (ringkasan rules)

| Koleksi | Baca | Tambah | Ubah | Hapus |
| --- | --- | --- | --- | --- |
| `informasiSampah` | Siapa saja | Seed/Console | Seed/Console | Seed/Console |
| `jadwal` | Siapa saja | Seed/Console | Petugas login, hanya wilayahnya, hanya `daftarTanggal` + `diperbaruiPada` | Seed/Console |
| `barcodeProduk` | Siapa saja, satu kode | Siapa saja, isi diperiksa | Siapa saja, isi diperiksa | Seed/Console |
| `dataPemerintah` | Siapa saja, satu NIK | Seed/Console | Seed/Console | Seed/Console |
| `akunPetugas` | Pemiliknya | Saat Sign Up, nama dan wilayah harus cocok dengan data pemerintah | Pemiliknya, hanya `email` + `noTelepon` | Seed/Console |
| `nikTerdaftar` | Siapa saja, satu NIK | Saat Sign Up, bersamaan dengan profil | Tidak ada | Seed/Console |

"Seed/Console" = hanya lewat `seed.js` atau Firebase Console (akses admin), tidak bisa dari aplikasi.

### Barcode yang ditambah atau dibetulkan pengguna

Alur di Pemindai (UC02 alternatif):

1. Pengguna memindai barcode → `cariBarcode(kode)`.
2. **Belum ada** → tampilkan "Informasi sampah belum tersedia" (I25) dengan pilihan "Pilih jenis sampahnya". Pengguna memilih material lalu tipe barang (opsional mengisi nama produk) → `simpanBarcode(kode, idSampah, idTipe, namaProduk)` → buka detail material.
3. **Ada tapi salah** → pengguna menekan "Hasil salah?", memilih ulang material dan tipe → `simpanBarcode(...)` dengan kode yang sama menimpa isi lama.

Rules menjaga isinya: kode harus 8-14 digit, `idSampah` dan `idTipe` harus benar-benar ada (diperiksa lewat `daftarIdTipe`), nama produk maksimal 100 karakter, `sumber` harus `pengguna`, dan `diperbaruiPada` harus `serverTimestamp()`. Menghapus barcode tidak bisa dari aplikasi.

Karena tidak butuh login, siapa pun bisa mengganti isi barcode. Catat sebagai known issue di laporan B.3. Barcode tambahan pengguna bisa dimasukkan ke repo dengan `npm run pull:cloud -- --only=barcodeProduk`; isinya kode produk, bukan data pribadi.

Kalau material baru ditambah lewat Firebase Console (bukan seed), isi juga field `daftarIdTipe` (array berisi semua `idTipe`-nya), karena rules memakainya untuk memeriksa barcode.

## Yang boleh dan tidak boleh di-commit

| File | Commit? |
| --- | --- |
| `seed.js`, `data/*.json`, `firestore.rules`, `firestore.indexes.json`, `firebase.json`, `package.json`, `package-lock.json` | Ya |
| `service-account.json` (kunci admin) | **Tidak pernah** |
| `node_modules/`, `emulator-data/`, log emulator | Tidak |