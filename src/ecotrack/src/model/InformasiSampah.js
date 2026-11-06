
import dummyInformasiSampah from "@/database/dummyInformasiSampah";

class InformasiSampah {
  static async getAll() {
    return dummyInformasiSampah;
  }

  static async getById(idSampah) {
    return (
      dummyInformasiSampah.find(
        (item) => item.idSampah === idSampah
      ) ?? null
    );
  }

  static async search(keyword) {
    const kata = keyword.trim().toLowerCase();

    if (!kata) {
      return dummyInformasiSampah;
    }

    return dummyInformasiSampah.filter((item) => {
      const cocokNama = item.nama.toLowerCase().includes(kata);

      const cocokRingkasan = item.ringkasan
        .toLowerCase()
        .includes(kata);

      const cocokContoh = item.contoh.some((contoh) =>
        contoh.toLowerCase().includes(kata)
      );

      return cocokNama || cocokRingkasan || cocokContoh;
    });
  }

  static async cariBarcode(barcode) {
    return (
      dummyInformasiSampah.find((item) =>
        item.barcode.includes(barcode)
      ) ?? null
    );
  }
}

export default InformasiSampah;