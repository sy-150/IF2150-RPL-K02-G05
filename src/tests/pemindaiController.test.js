import React from "react";
import { Alert } from "react-native";
import InformasiSampahController from "@/controller/InformasiSampahController";
import usePemindaiController from "@/controller/PemindaiController";
import { hapusFile, kirimFoto } from "@/model/sampahModel";

jest.mock("@/controller/InformasiSampahController", () => ({
  __esModule: true,
  default: {
    cariBarcode: jest.fn(),
    getDetail: jest.fn(),
  },
}));

jest.mock("@/model/sampahModel", () => ({
  kirimFoto: jest.fn(),
  hapusFile: jest.fn(),
}));

// Simulator hook ringan (pengganti React renderer agar tidak bentrok versi/path)
function createHookRunner(hookFn) {
  const states = [];
  const refs = [];
  let stateIdx = 0;
  let refIdx = 0;

  const useStateSpy = jest.spyOn(React, "useState").mockImplementation((init) => {
    const idx = stateIdx++;
    if (!(idx in states)) {
      states[idx] = typeof init === "function" ? init() : init;
    }
    const setState = (val) => {
      states[idx] = typeof val === "function" ? val(states[idx]) : val;
    };
    return [states[idx], setState];
  });

  const useRefSpy = jest.spyOn(React, "useRef").mockImplementation((init) => {
    const idx = refIdx++;
    if (!(idx in refs)) {
      refs[idx] = { current: init };
    }
    return refs[idx];
  });

  const run = () => {
    stateIdx = 0;
    refIdx = 0;
    return hookFn();
  };

  const cleanup = () => {
    useStateSpy.mockRestore();
    useRefSpy.mockRestore();
  };

  return { run, cleanup };
}

describe("PemindaiController / usePemindaiController (C10-UT01 s.d. C10-UT11)", () => {
  let runner;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
    runner = createHookRunner(usePemindaiController);
  });

  afterEach(() => {
    runner.cleanup();
  });

  // C10-UT01: Normal - identifikasi sampah berhasil
  test("C10-UT01: identifikasi mengambil foto, memanggil kirimFoto, mengisi hasil, dan menghapus file", async () => {
    let ctrl = runner.run();

    ctrl.cameraRef.current = {
      takePictureAsync: jest.fn().mockResolvedValue({
        base64: "abc123base64",
        uri: "file:///tmp/photo.jpg",
        width: 1080,
        height: 1920,
      }),
    };

    kirimFoto.mockResolvedValue({
      hasil: "Terdeteksi 2 objek",
      gambar: { lebar: 800, tinggi: 600 },
      deteksi: [
        { nama: "Botol", idSampah: "plastik" },
        { nama: "Kaleng", idSampah: "aluminium" },
      ],
    });

    await ctrl.identifikasi();
    ctrl = runner.run();

    expect(ctrl.hasil).toEqual({
      dataUri: "data:image/jpeg;base64,abc123base64",
      lebar: 800,
      tinggi: 600,
      deteksi: [
        { nama: "Botol", idSampah: "plastik" },
        { nama: "Kaleng", idSampah: "aluminium" },
      ],
      pesan: "Terdeteksi 2 objek",
    });
    expect(ctrl.terpilih).toBeNull();
    expect(ctrl.loading).toBe(false);
    expect(hapusFile).toHaveBeenCalledWith("file:///tmp/photo.jpg");
  });

  // C10-UT02: Batas - tidak ada objek terdeteksi & fallback dimensi foto kamera
  test("C10-UT02: identifikasi menangani deteksi kosong dan menggunakan dimensi foto kamera sebagai fallback", async () => {
    let ctrl = runner.run();

    ctrl.cameraRef.current = {
      takePictureAsync: jest.fn().mockResolvedValue({
        base64: "emptyimg",
        uri: "file:///tmp/empty.jpg",
        width: 640,
        height: 480,
      }),
    };

    kirimFoto.mockResolvedValue({
      hasil: "Tidak ada sampah terdeteksi",
    });

    await ctrl.identifikasi();
    ctrl = runner.run();

    expect(ctrl.hasil.deteksi).toEqual([]);
    expect(ctrl.hasil.lebar).toBe(640);
    expect(ctrl.hasil.tinggi).toBe(480);
    expect(hapusFile).toHaveBeenCalledWith("file:///tmp/empty.jpg");
  });

  // C10-UT03: Negatif - cameraRef null
  test("C10-UT03: identifikasi melakukan early return jika cameraRef.current null", async () => {
    let ctrl = runner.run();
    ctrl.cameraRef.current = null;

    await ctrl.identifikasi();
    ctrl = runner.run();

    expect(kirimFoto).not.toHaveBeenCalled();
    expect(ctrl.loading).toBe(false);
  });

  // C10-UT04: Negatif - kirimFoto gagal / error jaringan
  test("C10-UT04: identifikasi menampilkan Alert dan tetap menghapus file jika kirimFoto gagal", async () => {
    let ctrl = runner.run();

    ctrl.cameraRef.current = {
      takePictureAsync: jest.fn().mockResolvedValue({
        base64: "errimg",
        uri: "file:///tmp/err.jpg",
      }),
    };

    kirimFoto.mockRejectedValue(new Error("Server timeout"));

    await ctrl.identifikasi();
    ctrl = runner.run();

    expect(Alert.alert).toHaveBeenCalledWith("Gagal mengidentifikasi", "Server timeout");
    expect(hapusFile).toHaveBeenCalledWith("file:///tmp/err.jpg");
    expect(ctrl.loading).toBe(false);
  });

  // C10-UT05: Normal - cariKode menemukan produk dan detail sampah
  test("C10-UT05: cariKode mengisi state barcode dengan data produk dan info sampah", async () => {
    let ctrl = runner.run();

    const mockProduk = { kodeBarcode: "899123", namaProduk: "Teh Botol", idSampah: "plastik" };
    const mockInfo = { id: "plastik", nama: "Plastik" };

    InformasiSampahController.cariBarcode.mockResolvedValue(mockProduk);
    InformasiSampahController.getDetail.mockResolvedValue(mockInfo);

    await ctrl.cariKode("899123", "ean13");
    ctrl = runner.run();

    expect(ctrl.barcode).toEqual({
      type: "ean13",
      data: "899123",
      produk: mockProduk,
      info: mockInfo,
    });
    expect(ctrl.tidakTerdaftar).toBeNull();
    expect(ctrl.loading).toBe(false);
  });

  // C10-UT06: Batas - kunci sinkron mencegah scan beruntun
  test("C10-UT06: cariKode mengabaikan pemanggilan kedua saat scan pertama sedang berjalan", async () => {
    const ctrl = runner.run();

    let resolveScan;
    InformasiSampahController.cariBarcode.mockImplementation(
      () => new Promise((resolve) => { resolveScan = resolve; })
    );
    InformasiSampahController.getDetail.mockResolvedValue(null);

    const p1 = ctrl.cariKode("111111", "ean13");
    const p2 = ctrl.cariKode("222222", "ean13");
    resolveScan({ kodeBarcode: "111111", namaProduk: "Produk 1", idSampah: "kertas" });
    await Promise.all([p1, p2]);

    expect(InformasiSampahController.cariBarcode).toHaveBeenCalledTimes(1);
    expect(InformasiSampahController.cariBarcode).toHaveBeenCalledWith("111111");
  });

  // C10-UT07: Negatif - barcode tidak ditemukan di database
  test("C10-UT07: cariKode mengisi state tidakTerdaftar jika produk null", async () => {
    let ctrl = runner.run();
    InformasiSampahController.cariBarcode.mockResolvedValue(null);

    await ctrl.cariKode("0000000000000");
    ctrl = runner.run();

    expect(ctrl.tidakTerdaftar).toBe("0000000000000");
    expect(ctrl.barcode).toBeNull();
  });

  // C10-UT08: Negatif - galat jaringan saat mencari barcode
  test("C10-UT08: cariKode me-reset kunci scan dan menampilkan Alert saat terjadi error", async () => {
    let ctrl = runner.run();
    InformasiSampahController.cariBarcode.mockRejectedValueOnce(new Error("Network error"));

    await ctrl.cariKode("899123");
    ctrl = runner.run();

    expect(Alert.alert).toHaveBeenCalledWith("Gagal mencari barcode", "Network error");

    // Pastikan kunci scan sudah terbuka kembali untuk percobaan berikutnya
    InformasiSampahController.cariBarcode.mockResolvedValueOnce(null);
    await ctrl.cariKode("899123");
    expect(InformasiSampahController.cariBarcode).toHaveBeenCalledTimes(2);
  });

  // C10-UT09 & C10-UT10: onBarcodeScanned (Normal & Negatif)
  test("C10-UT09 & C10-UT10: onBarcodeScanned meneruskan data saat idle dan mengabaikan saat hasil sudah ada", async () => {
    let ctrl = runner.run();
    InformasiSampahController.cariBarcode.mockResolvedValue(null);

    // Normal (idle)
    ctrl.onBarcodeScanned({ type: "qr", data: "QR123" });
    await Promise.resolve();
    expect(InformasiSampahController.cariBarcode).toHaveBeenCalledWith("QR123");

    // Negatif (jika hasil foto CV sudah ada, scan barcode diabaikan)
    ctrl.cameraRef.current = {
      takePictureAsync: jest.fn().mockResolvedValue({ base64: "x", uri: "u" }),
    };
    kirimFoto.mockResolvedValue({ hasil: "ok", deteksi: [] });

    await ctrl.identifikasi();
    ctrl = runner.run();

    ctrl.onBarcodeScanned({ type: "qr", data: "QR999" });
    expect(InformasiSampahController.cariBarcode).toHaveBeenCalledTimes(1);
  });

  // C10-UT11: setMode & pindaiLagi
  test("C10-UT11: setMode dan pindaiLagi me-reset seluruh state pemindaian dan torch", () => {
    let ctrl = runner.run();

    ctrl.setTorch(true);
    ctrl.pilih(0);
    ctrl = runner.run();
    expect(ctrl.torch).toBe(true);
    expect(ctrl.terpilih).toBe(0);

    ctrl.setMode("barcode");
    ctrl = runner.run();
    expect(ctrl.mode).toBe("barcode");
    expect(ctrl.torch).toBe(false);

    ctrl.pindaiLagi();
    ctrl = runner.run();
    expect(ctrl.hasil).toBeNull();
    expect(ctrl.terpilih).toBeNull();
    expect(ctrl.barcode).toBeNull();
    expect(ctrl.tidakTerdaftar).toBeNull();
  });
});