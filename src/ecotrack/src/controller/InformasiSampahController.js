import InformasiSampah from "@/model/InformasiSampah";

class InformasiSampahController {

  // ==========================================
  // C08 - MENGAMBIL SELURUH INFORMASI
  // DPPL: getMain()
  // ==========================================

  static async getMain() {
    return await InformasiSampah.getMain();
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
  // Penyaringan dilakukan model (Algo-IS-003) dari data getMain().
  // ==========================================

  static cariInformasi(query) {
    return InformasiSampah.cariInformasi(query);
  }

  // ==========================================
  // TAMBAHAN - PENCARIAN BARCODE
  // ==========================================

  static async cariBarcode(barcode) {
    return await InformasiSampah.cariBarcode(barcode);
  }
}

export default InformasiSampahController;
