
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/database/firebase";

class InformasiSampah {
  static collectionName = "informasiSampah";
  static barcodeCollectionName = "barcodeProduk";

  // ==========================================
  // C07 - MENGAMBIL SELURUH INFORMASI SAMPAH
  // DPPL: getMain()
  // ==========================================

  static async getMain() {
    const snapshot = await getDocs(
      collection(db, this.collectionName)
    );

    // Memastikan data diperoleh dari server.
    if (snapshot.metadata.fromCache) {
      throw new Error("Tidak bisa terhubung ke server");
    }

    return snapshot.docs.map((item) => ({
      idSampah: item.id,
      ...item.data(),
    }));
  }

  // ==========================================
  // C07 - MENGAMBIL DETAIL INFORMASI SAMPAH
  // DPPL: getDetail(id)
  // ==========================================

  static async getDetail(id) {
    if (!id) {
      return null;
    }

    const docRef = doc(
      db,
      this.collectionName,
      id
    );

    const snapshot = await getDoc(docRef);

    if (snapshot.metadata.fromCache) {
      throw new Error("Tidak bisa terhubung ke server");
    }

    if (!snapshot.exists()) {
      return null;
    }

    return {
      idSampah: snapshot.id,
      ...snapshot.data(),
    };
  }

  // ==========================================
  // C07 - PENCARIAN INFORMASI SAMPAH
  // DPPL: cariInformasi(query)
  // ==========================================

  static async cariInformasi(query) {
    const kataKunci = String(query ?? "")
      .trim()
      .toLowerCase();

    // Mengambil seluruh data informasi.
    const data = await this.getMain();

    // Jika query kosong, tampilkan seluruh data.
    if (!kataKunci) {
      return data;
    }

    // Mencari berdasarkan nama, ringkasan,
    // deskripsi, dan nama tipe sampah.
    return data.filter((item) => {
      const cocokNama =
        item.nama?.toLowerCase().includes(kataKunci);

      const cocokRingkasan =
        item.ringkasan?.toLowerCase().includes(kataKunci);

      const cocokDeskripsi =
        item.deskripsi?.toLowerCase().includes(kataKunci);

      const cocokTipe = item.tipe?.some((tipe) =>
        tipe.nama?.toLowerCase().includes(kataKunci)
      );

      return (
        cocokNama ||
        cocokRingkasan ||
        cocokDeskripsi ||
        cocokTipe
      );
    });
  }

  // ==========================================
  // TAMBAHAN - PENCARIAN BERDASARKAN BARCODE
  // Digunakan oleh fitur Pemindai UC02.
  // ==========================================

  static async cariBarcode(barcode) {
    const kodeBarcode = String(barcode ?? "").trim();

    if (!kodeBarcode) {
      return null;
    }

    const docRef = doc(
      db,
      this.barcodeCollectionName,
      kodeBarcode
    );

    const snapshot = await getDoc(docRef);

    if (snapshot.metadata.fromCache) {
      throw new Error("Tidak bisa terhubung ke server");
    }

    if (!snapshot.exists()) {
      return null;
    }

    return {
      kodeBarcode: snapshot.id,
      ...snapshot.data(),
    };
  }
}

export default InformasiSampah;
