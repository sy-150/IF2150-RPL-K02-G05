
const konteksGambar = require.context(
  "../../assets/images/informasi-sampah",
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
  if (!namaFile || typeof namaFile !== "string") {
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

  return DAFTAR_GAMBAR[namaBersih] ?? null;
}
