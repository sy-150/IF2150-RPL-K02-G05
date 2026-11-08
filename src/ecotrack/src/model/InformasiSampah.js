
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/database/firebase";

class InformasiSampah {
  static collectionName = "informasiSampah";

  // Mengambil seluruh data informasi sampah
  static async getAll() {
    const snapshot = await getDocs(
      collection(db, this.collectionName)
    );

    return snapshot.docs.map((item) => ({
      idSampah: item.id,
      ...item.data(),
    }));
  }

  // Mengambil detail berdasarkan document ID
  static async getById(idSampah) {
    const docRef = doc(db, this.collectionName, idSampah);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      idSampah: snapshot.id,
      ...snapshot.data(),
    };
  }

  // Pencarian berdasarkan nama dan ringkasan
  static async search(keyword) {
    const kata = keyword.trim().toLowerCase();

    const data = await this.getAll();

    if (!kata) {
      return data;
    }

    return data.filter((item) => {
      const cocokNama = item.nama
        ?.toLowerCase()
        .includes(kata);

      const cocokRingkasan = item.ringkasan
        ?.toLowerCase()
        .includes(kata);

      const cocokTipe = item.tipe?.some((tipe) =>
        tipe.nama?.toLowerCase().includes(kata)
      );

      return cocokNama || cocokRingkasan || cocokTipe;
    });
  }

  // Pencarian berdasarkan barcode
  static async cariBarcode(barcode) {
    const data = await this.getAll();

    return (
      data.find((item) =>
        item.barcode?.includes(barcode)
      ) ?? null
    );
  }
}

export default InformasiSampah;
