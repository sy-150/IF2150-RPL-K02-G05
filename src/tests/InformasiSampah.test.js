import InformasiSampah from "../ecotrack/src/model/InformasiSampah";

import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/database/firebase";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock("@/database/firebase", () => ({
  db: {},
}));

const dataSampah = [
  {
    id: "plastik",
    nama: "Plastik",
    ringkasan: "Sampah botol plastik",
    deskripsi: "Daur ulang botol plastik",
    jenisSampah: "anorganik",
    tipe: [
      { nama: "Botol Plastik" },
      { nama: "Wadah Plastik" },
    ],
  },
  {
    id: "kaca",
    nama: "Kaca",
    ringkasan: "Sampah botol kaca",
    deskripsi: "Daur ulang botol kaca",
    jenisSampah: "anorganik",
    tipe: [
      { nama: "Botol Kaca" },
    ],
  },
  {
    id: "logam",
    nama: "Logam",
    ringkasan: "Sampah kaleng",
    deskripsi: "Daur ulang logam",
    jenisSampah: "anorganik",
    tipe: [
      { nama: "Kaleng Aluminium" },
    ],
  },
  {
    id: "organik",
    nama: "Organik",
    ringkasan: "Sampah sisa makanan",
    deskripsi: "Sampah yang mudah terurai",
    jenisSampah: "organik",
  },
];

const mockSnapshot = (data, fromCache = false) => ({
  metadata: { fromCache },
  docs: data.map((item) => ({
    id: item.id,
    data: () => {
      const { id, ...rest } = item;
      return rest;
    },
  })),
});

const mockDocumentSnapshot = (
  id,
  data,
  exists = true,
  fromCache = false
) => ({
  id,
  metadata: { fromCache },
  exists: () => exists,
  data: () => data,
});

const isiCache = async () => {
  getDocs.mockResolvedValue(mockSnapshot(dataSampah));
  await InformasiSampah.getMain();
};

describe("C07 - InformasiSampah", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    collection.mockReturnValue("mock-collection");
    doc.mockReturnValue("mock-document");
  });

  // ==========================================
  // getMain()
  // ==========================================

  test("C07-UT01: getMain mengembalikan seluruh data sampah", async () => {
    getDocs.mockResolvedValue(mockSnapshot(dataSampah));

    const hasil = await InformasiSampah.getMain();

    expect(collection).toHaveBeenCalledWith(
      db,
      "informasiSampah"
    );

    expect(hasil).toHaveLength(4);

    expect(hasil.map((item) => item.idSampah)).toEqual([
      "plastik",
      "kaca",
      "logam",
      "organik",
    ]);
  });

  test("C07-UT02: getMain mengembalikan list kosong jika koleksi kosong", async () => {
    getDocs.mockResolvedValue(mockSnapshot([]));

    const hasil = await InformasiSampah.getMain();

    expect(hasil).toEqual([]);
    expect(InformasiSampah.cariInformasi("")).toEqual([]);
  });

  test("C07-UT03: getMain melempar error jika data berasal dari cache", async () => {
    getDocs.mockResolvedValue(
      mockSnapshot(dataSampah, true)
    );

    await expect(
      InformasiSampah.getMain()
    ).rejects.toThrow("Tidak bisa terhubung ke server");
  });

  // ==========================================
  // getDetail(id)
  // ==========================================

  test("C07-UT04: getDetail mengembalikan detail sampah berdasarkan ID", async () => {
    const detail = {
      nama: "Plastik",
      jenisSampah: "anorganik",
    };

    getDoc.mockResolvedValue(
      mockDocumentSnapshot("plastik", detail)
    );

    const hasil = await InformasiSampah.getDetail("plastik");

    expect(doc).toHaveBeenCalledWith(
      db,
      "informasiSampah",
      "plastik"
    );

    expect(hasil).toEqual({
      idSampah: "plastik",
      ...detail,
    });
  });

  test("C07-UT05: getDetail mengembalikan null jika ID kosong atau undefined", async () => {
    const hasilKosong = await InformasiSampah.getDetail("");
    const hasilUndefined = await InformasiSampah.getDetail(undefined);

    expect(hasilKosong).toBeNull();
    expect(hasilUndefined).toBeNull();
    expect(getDoc).not.toHaveBeenCalled();
  });

  test("C07-UT06: getDetail mengembalikan null jika dokumen tidak ditemukan", async () => {
    getDoc.mockResolvedValue(
      mockDocumentSnapshot("styrofoam", null, false)
    );

    const hasil = await InformasiSampah.getDetail("styrofoam");

    expect(hasil).toBeNull();
  });

  test("C07-UT07: getDetail melempar error jika data berasal dari cache", async () => {
    getDoc.mockResolvedValue(
      mockDocumentSnapshot(
        "plastik",
        { nama: "Plastik" },
        true,
        true
      )
    );

    await expect(
      InformasiSampah.getDetail("plastik")
    ).rejects.toThrow("Tidak bisa terhubung ke server");
  });

  // ==========================================
  // cariInformasi(query)
  // ==========================================

  test("C07-UT08: cariInformasi mencari berdasarkan nama kategori", async () => {
    await isiCache();

    const hasil = InformasiSampah.cariInformasi("Plastik");

    expect(hasil).toHaveLength(1);
    expect(hasil[0].idSampah).toBe("plastik");
  });

  test("C07-UT09: cariInformasi mencari berdasarkan nama tipe sampah", async () => {
    await isiCache();

    const hasil = InformasiSampah.cariInformasi("aluminium");

    expect(hasil).toHaveLength(1);
    expect(hasil[0].idSampah).toBe("logam");
  });

  test("C07-UT10: cariInformasi mengabaikan huruf besar dan spasi", async () => {
    await isiCache();

    const hasil = InformasiSampah.cariInformasi(" BOTOL ");

    expect(hasil.map((item) => item.idSampah)).toEqual([
      "plastik",
      "kaca",
    ]);
  });

  test("C07-UT11: cariInformasi mengembalikan semua data jika query kosong atau null", async () => {
    await isiCache();

    const hasilKosong = InformasiSampah.cariInformasi("");
    const hasilNull = InformasiSampah.cariInformasi(null);

    expect(hasilKosong).toHaveLength(4);
    expect(hasilNull).toHaveLength(4);
  });

  test("C07-UT12: cariInformasi mengembalikan list kosong jika tidak ada hasil", async () => {
    await isiCache();

    const hasil = InformasiSampah.cariInformasi("styrofoam");

    expect(hasil).toEqual([]);
  });

  // ==========================================
  // cariBarcode(barcode)
  // ==========================================

  test("C07-UT13: cariBarcode mengembalikan produk jika barcode terdaftar", async () => {
    const dataProduk = {
      idSampah: "plastik",
      idTipe: "botol-plastik",
      namaProduk: "Contoh Botol Air Mineral 600 ml",
    };

    getDoc.mockResolvedValue(
      mockDocumentSnapshot("2000000000015", dataProduk)
    );

    const hasil = await InformasiSampah.cariBarcode(
      "2000000000015"
    );

    expect(doc).toHaveBeenCalledWith(
      db,
      "barcodeProduk",
      "2000000000015"
    );

    expect(hasil).toEqual({
      kodeBarcode: "2000000000015",
      ...dataProduk,
    });
  });

  test("C07-UT14: cariBarcode mengembalikan null jika barcode kosong", async () => {
    const hasil = await InformasiSampah.cariBarcode(" ");

    expect(hasil).toBeNull();
    expect(getDoc).not.toHaveBeenCalled();
  });

  test("C07-UT15: cariBarcode mengembalikan null jika barcode tidak terdaftar", async () => {
    getDoc.mockResolvedValue(
      mockDocumentSnapshot("9999999999999", null, false)
    );

    const hasil = await InformasiSampah.cariBarcode(
      "9999999999999"
    );

    expect(hasil).toBeNull();
  });

  test("C07-UT16: cariBarcode melempar error jika data berasal dari cache", async () => {
    getDoc.mockResolvedValue(
      mockDocumentSnapshot(
        "2000000000015",
        { idSampah: "plastik" },
        true,
        true
      )
    );

    await expect(
      InformasiSampah.cariBarcode("2000000000015")
    ).rejects.toThrow("Tidak bisa terhubung ke server");
  });
});