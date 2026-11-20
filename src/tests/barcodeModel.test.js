import { doc, getDoc } from "firebase/firestore";
import { ambilInfoSampah, cariProduk } from "@/model/barcodeModel";

jest.mock("firebase/firestore", () => ({
  doc: jest.fn((db, koleksi, id) => ({ koleksi, id })),
  getDoc: jest.fn(),
}));

jest.mock("@/database/firebase", () => ({
  db: {},
}));

describe("BarcodeModel (C10-UT16 s.d. C10-UT18)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // C10-UT16: Normal - barcode ditemukan langsung
  test("C10-UT16: cariProduk mengembalikan objek produk saat ID dokumen ditemukan langsung", async () => {
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      id: "8992761139018",
      data: () => ({
        namaProduk: "Air Mineral 600ml",
        idSampah: "plastik",
        idTipe: "botol-plastik",
      }),
    });

    const produk = await cariProduk("8992761139018");

    expect(doc).toHaveBeenCalledWith(expect.anything(), "barcodeProduk", "8992761139018");
    expect(produk).toEqual({
      id: "8992761139018",
      namaProduk: "Air Mineral 600ml",
      idSampah: "plastik",
      idTipe: "botol-plastik",
    });
  });

  // C10-UT17: Batas - konversi UPC-A (12 digit) <-> EAN-13 (13 digit awalan '0')
  test("C10-UT17: cariProduk menangani trim spasi dan konversi 12 digit <-> 13 digit awalan 0", async () => {
    // Skenario A: Input 12 digit (dengan spasi), tersimpan sebagai 13 digit berawalan "0"
    getDoc
      .mockResolvedValueOnce({ exists: () => false }) // pencarian 12 digit gagal
      .mockResolvedValueOnce({
        exists: () => true,
        id: "0012345678905",
        data: () => ({ namaProduk: "Produk UPC-A", idSampah: "kertas" }),
      });

    const hasil12 = await cariProduk(" 012345678905 ");
    expect(doc).toHaveBeenNthCalledWith(1, expect.anything(), "barcodeProduk", "012345678905");
    expect(doc).toHaveBeenNthCalledWith(2, expect.anything(), "barcodeProduk", "0012345678905");
    expect(hasil12.id).toBe("0012345678905");

    jest.clearAllMocks();

    // Skenario B: Input 13 digit berawalan "0", tersimpan sebagai 12 digit tanpa "0"
    getDoc
      .mockResolvedValueOnce({ exists: () => false }) // pencarian 13 digit gagal
      .mockResolvedValueOnce({
        exists: () => true,
        id: "012345678905",
        data: () => ({ namaProduk: "Produk EAN-13", idSampah: "plastik" }),
      });

    const hasil13 = await cariProduk("0012345678905");
    expect(doc).toHaveBeenNthCalledWith(1, expect.anything(), "barcodeProduk", "0012345678905");
    expect(doc).toHaveBeenNthCalledWith(2, expect.anything(), "barcodeProduk", "012345678905");
    expect(hasil13.id).toBe("012345678905");
  });

  // C10-UT18: Negatif - input kosong, tidak ditemukan, atau Firestore error
  test("C10-UT18: cariProduk & ambilInfoSampah mengembalikan null pada input kosong atau error", async () => {
    // cariProduk dengan string spasi
    expect(await cariProduk("   ")).toBeNull();
    expect(getDoc).not.toHaveBeenCalled();

    // ambilInfoSampah dengan null/kosong
    expect(await ambilInfoSampah(null)).toBeNull();
    expect(await ambilInfoSampah("")).toBeNull();

    // ambilInfoSampah normal
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      id: "plastik",
      data: () => ({ nama: "Plastik", jenisSampah: "anorganik" }),
    });
    const info = await ambilInfoSampah("plastik");
    expect(info).toEqual({ id: "plastik", nama: "Plastik", jenisSampah: "anorganik" });

    // ambilInfoSampah saat Firestore melempar error
    getDoc.mockRejectedValueOnce(new Error("Firestore offline"));
    expect(await ambilInfoSampah("plastik")).toBeNull();
  });
});