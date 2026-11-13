import { File } from "expo-file-system";
import { auth } from "@/database/firebase";

const URL_PENILAI = process.env.EXPO_PUBLIC_PEMINDAI_URL;

export async function kirimFoto(imageBase64) {
  if (!URL_PENILAI) throw new Error("EXPO_PUBLIC_PEMINDAI_URL belum diisi di .env");
  // Pemindai terbuka untuk umum: token login dikirim hanya kalau pengguna sedang login.
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
  return data; // { hasil, deteksi: [{ nama, idSampah, idTipe, namaSampah, namaTipe, jenisSampah, kotak }] }
}

export function hapusFile(uri) {
  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch (e) {
    console.log("Gagal menghapus file:", e);
  }
}