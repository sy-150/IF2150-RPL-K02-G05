
import InformasiSampah from "@/model/InformasiSampah";

class InformasiSampahController {
  static async getAll() {
    return await InformasiSampah.getAll();
  }

  static async getById(idSampah) {
    return await InformasiSampah.getById(idSampah);
  }

  static async search(keyword) {
    return await InformasiSampah.search(keyword);
  }

  static async cariBarcode(barcode) {
    return await InformasiSampah.cariBarcode(barcode);
  }
}

export default InformasiSampahController;