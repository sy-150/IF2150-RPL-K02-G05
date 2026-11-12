import InformasiSampah from "@/model/InformasiSampah";

class InformasiSampahController {
  static semuaKategori = [];

  // ==========================================
  // C08 - MENGAMBIL SELURUH INFORMASI
  // DPPL: getMain()
  // ==========================================

  static async getMain() {
    const hasil = await InformasiSampah.getMain();

    this.semuaKategori = Array.isArray(hasil) ? hasil : [];

    return this.semuaKategori;
  }

  // ==========================================
  // C08 - MENGAMBIL DETAIL INFORMASI
  // DPPL: getDetail(id)
  // ==========================================

  static async getDetail(id) {
    return await InformasiSampah.getDetail(id);
  }

  // ==========================================
  // C08 - MENCARI INFORMASI
  // DPPL: cariInformasi(query)
  // ==========================================

  static cariInformasi(query) {
    const kataKunci = query.trim().toLowerCase();

    if (!kataKunci) {
      return this.semuaKategori;
    }

    return this.semuaKategori.filter((item) => {
      const cocokNama = item.nama
        ?.toLowerCase()
        .includes(kataKunci);

      const cocokRingkasan = item.ringkasan
        ?.toLowerCase()
        .includes(kataKunci);

      const cocokDeskripsi = item.deskripsi
        ?.toLowerCase()
        .includes(kataKunci);

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
  // TAMBAHAN - PENCARIAN BARCODE
  // ==========================================

  static async cariBarcode(barcode) {
    return await InformasiSampah.cariBarcode(barcode);
  }
}

export default InformasiSampahController;