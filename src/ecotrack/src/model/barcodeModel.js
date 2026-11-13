// Data produk berdasarkan barcode (hanya baca; pengguna tidak bisa menambah/mengubah data).
//
// Koleksi "barcodeProduk": ID dokumen = barcode (string)
//   { namaProduk: "...", idSampah: "plastik", idTipe: "botol-plastik", sumber: "seed" }
// Koleksi "informasiSampah": dokumen dengan ID = idSampah (mis. "plastik")
import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/database/firebase";

async function ambilDoc(koleksi, id) {
  const snap = await getDoc(doc(db, koleksi, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Mencari produk berdasarkan barcode. Mengembalikan objek produk, atau null kalau tidak ada. */
export async function cariProduk(kode) {
  const k = String(kode).trim();
  if (!k) return null;

  let produk = await ambilDoc("barcodeProduk", k);

  // UPC-A (12 digit) = EAN-13 diawali "0": coba kedua bentuk
  if (!produk && k.length === 12) produk = await ambilDoc("barcodeProduk", "0" + k);
  if (!produk && k.length === 13 && k.startsWith("0")) {
    produk = await ambilDoc("barcodeProduk", k.slice(1));
  }
  return produk;
}

/** Info jenis sampah (kategori, cara, dst.) dari koleksi informasiSampah. null kalau tidak ada / gagal. */
export async function ambilInfoSampah(idSampah) {
  if (!idSampah) return null;
  try {
    return await ambilDoc("informasiSampah", String(idSampah));
  } catch (e) {
    console.log("Gagal membaca informasiSampah:", e);
    return null;
  }
}