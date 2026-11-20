import InformasiSampahController from "@/controller/InformasiSampahController";
import InformasiSampah from "@/model/InformasiSampah";

jest.mock("@/model/InformasiSampah", () => ({
  __esModule: true,
  default: {
    getMain: jest.fn(),
    getDetail: jest.fn(),
    cariInformasi: jest.fn(),
    cariBarcode: jest.fn(),
  },
}));

describe("C08 - InformasiSampahController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================
  // C08 - MENGAMBIL SELURUH INFORMASI
  // ==========================================

  test("C08-UT01: getMain mengembalikan seluruh data sampah", async () => {
    const mockData = [
      { idSampah: "plastik", nama: "Plastik" },
      { idSampah: "kaca", nama: "Kaca" },
    ];

    InformasiSampah.getMain.mockResolvedValue(mockData);

    const result = await InformasiSampahController.getMain();

    expect(result).toEqual(mockData);
    expect(InformasiSampah.getMain).toHaveBeenCalledTimes(1);
  });

  test("C08-UT02: getMain meneruskan error dari model", async () => {
    const mockError = new Error("Tidak bisa terhubung ke server");

    InformasiSampah.getMain.mockRejectedValue(mockError);

    await expect(
      InformasiSampahController.getMain()
    ).rejects.toThrow("Tidak bisa terhubung ke server");

    expect(InformasiSampah.getMain).toHaveBeenCalledTimes(1);
  });

  // ==========================================
  // C08 - MENGAMBIL DETAIL INFORMASI
  // ==========================================

  test("C08-UT03: getDetail mengembalikan detail sampah berdasarkan ID", async () => {
    const mockData = {
      idSampah: "plastik",
      nama: "Plastik",
      ringkasan: "Sampah berbahan plastik",
    };

    InformasiSampah.getDetail.mockResolvedValue(mockData);

    const result = await InformasiSampahController.getDetail("plastik");

    expect(result).toEqual(mockData);
    expect(InformasiSampah.getDetail).toHaveBeenCalledWith("plastik");
  });

  test("C08-UT04: getDetail mengembalikan null jika data tidak ditemukan", async () => {
    InformasiSampah.getDetail.mockResolvedValue(null);

    const result = await InformasiSampahController.getDetail("tidak-ada");

    expect(result).toBeNull();
    expect(InformasiSampah.getDetail).toHaveBeenCalledWith("tidak-ada");
  });

  // ==========================================
  // C08 - MENCARI INFORMASI
  // ==========================================

  test("C08-UT05: cariInformasi mengembalikan hasil pencarian", () => {
    const mockData = [
      { idSampah: "plastik", nama: "Plastik" },
    ];

    InformasiSampah.cariInformasi.mockReturnValue(mockData);

    const result = InformasiSampahController.cariInformasi("plastik");

    expect(result).toEqual(mockData);
    expect(InformasiSampah.cariInformasi).toHaveBeenCalledWith("plastik");
  });

  test("C08-UT06: cariInformasi mengembalikan list kosong jika tidak ada hasil", () => {
    InformasiSampah.cariInformasi.mockReturnValue([]);

    const result = InformasiSampahController.cariInformasi("tidak-ada");

    expect(result).toEqual([]);
    expect(InformasiSampah.cariInformasi).toHaveBeenCalledWith("tidak-ada");
  });

  // ==========================================
  // TAMBAHAN - PENCARIAN BARCODE
  // ==========================================

  test("C08-UT07: cariBarcode mengembalikan data produk jika barcode terdaftar", async () => {
    const mockData = {
      kodeBarcode: "2000000000015",
      idSampah: "plastik",
      idTipe: "botol-plastik",
    };

    InformasiSampah.cariBarcode.mockResolvedValue(mockData);

    const result = await InformasiSampahController.cariBarcode(
      "2000000000015"
    );

    expect(result).toEqual(mockData);
    expect(InformasiSampah.cariBarcode).toHaveBeenCalledWith(
      "2000000000015"
    );
  });

  test("C08-UT08: cariBarcode meneruskan error dari model", async () => {
    const mockError = new Error("Tidak bisa terhubung ke server");

    InformasiSampah.cariBarcode.mockRejectedValue(mockError);

    await expect(
      InformasiSampahController.cariBarcode("2000000000015")
    ).rejects.toThrow("Tidak bisa terhubung ke server");

    expect(InformasiSampah.cariBarcode).toHaveBeenCalledWith(
      "2000000000015"
    );
  });
});