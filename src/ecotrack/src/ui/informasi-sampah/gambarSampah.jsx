
const konteksGambar = require.context(
  "../../../assets/images/informasi-sampah",
  true,
  /\.png$/i
);

const DAFTAR_GAMBAR = Object.fromEntries(
  konteksGambar.keys().map((path) => {
    const namaFile = path.split("/").pop().toLowerCase();

    return [namaFile, konteksGambar(path)];
  })
);

export function gambarSampah(namaFile) {
  console.log("[DEBUG] Mencari gambar:", namaFile);

  if (!namaFile || typeof namaFile !== "string") {
    console.log("[DEBUG] Nama gambar kosong atau tidak valid");
    return null;
  }

  if (/^https?:\/\//i.test(namaFile)) {
    return { uri: namaFile };
  }

  const namaBersih = namaFile
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    .toLowerCase();

  const hasil = DAFTAR_GAMBAR[namaBersih];

  console.log("[DEBUG] Nama setelah dibersihkan:", namaBersih);
  console.log("[DEBUG] Gambar ditemukan:", Boolean(hasil));

  return hasil ?? null;
}
