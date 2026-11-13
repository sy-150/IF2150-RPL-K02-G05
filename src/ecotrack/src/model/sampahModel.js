import { File } from "expo-file-system";
import { auth } from "@/database/firebase";

const URL_PENILAI = process.env.EXPO_PUBLIC_PEMINDAI_URL;

// Ganti kuncinya dengan nama kelas model Roboflow-mu (huruf kecil semua)
const INFO = {
  plastic: {
    kategori: "Anorganik",
    cara: "Kosongkan dan bilas, lalu masukkan ke tempat sampah plastik atau daur ulang.",
  },
  paper: {
    kategori: "Anorganik",
    cara: "Pastikan kering dan bersih, lalu pisahkan ke tempat sampah kertas.",
  },
  glass: {
    kategori: "Anorganik",
    cara: "Bungkus bagian yang pecah, lalu pisahkan ke tempat sampah kaca.",
  },
  metal: {
    kategori: "Anorganik",
    cara: "Bilas dan masukkan ke tempat sampah logam atau daur ulang.",
  },
  organic: {
    kategori: "Organik",
    cara: "Masukkan ke tempat sampah organik atau jadikan kompos.",
  },
};

export function infoKelas(kelas) {
  return (
    INFO[String(kelas).toLowerCase()] ?? {
      kategori: "Belum diketahui",
      cara: "Belum ada informasi untuk jenis sampah ini.",
    }
  );
}

export async function kirimFoto(imageBase64) {
  if (!URL_PENILAI) throw new Error("EXPO_PUBLIC_PEMINDAI_URL belum diisi di .env");
  // Pemindai terbuka untuk umum: token dikirim hanya kalau pengguna sedang login.
  const idToken = await auth.currentUser?.getIdToken();
  const headers = { "Content-Type": "application/json" };
  if (idToken) headers.Authorization = `Bearer ${idToken}`;
  const res = await fetch(URL_PENILAI, {
    method: "POST",
    headers,
    body: JSON.stringify({ imageBase64 }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Permintaan gagal");
  return data; // { hasil, deteksi, gambar }
}

export function hapusFile(uri) {
  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch (e) {
    console.log("Gagal menghapus file:", e);
  }
}