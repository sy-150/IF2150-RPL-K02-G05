import { File } from "expo-file-system";
import { auth } from "@/database/firebase";
import { hapusFile, kirimFoto } from "@/model/sampahModel";

jest.mock("expo-file-system", () => ({
  File: jest.fn(),
}));

jest.mock("@/database/firebase", () => ({
  auth: {
    currentUser: null,
  },
}));

describe("SampahModel (C10-UT12 s.d. C10-UT15)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    auth.currentUser = null;
  });

  // C10-UT12: Normal - pengguna terautentikasi
  test("C10-UT12: kirimFoto mengirim token Bearer saat user login dan mengembalikan data deteksi", async () => {
    auth.currentUser = {
      getIdToken: jest.fn().mockResolvedValue("mock-firebase-token-123"),
    };

    const mockResponseData = {
      hasil: "Ditemukan sampah plastik",
      deteksi: [
        {
          nama: "Botol Plastik",
          idSampah: "plastik",
          idTipe: "botol-plastik",
          namaSampah: "Plastik",
          namaTipe: "Botol Plastik",
          jenisSampah: "anorganik",
          kotak: [100, 200, 500, 600],
        },
      ],
    };

    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponseData),
    });

    const result = await kirimFoto("base64-encoded-image");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://ai-penilai.3no.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mock-firebase-token-123",
        },
        body: JSON.stringify({ imageBase64: "base64-encoded-image" }),
      }
    );
    expect(result).toEqual(mockResponseData);
  });

  // C10-UT13: Batas - pengguna tamu (tanpa login)
  test("C10-UT13: kirimFoto mengirim request tanpa header Authorization saat user null", async () => {
    auth.currentUser = null;
    const mockResponseData = { hasil: "Tidak ada objek", deteksi: [] };

    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponseData),
    });

    const result = await kirimFoto("base64-guest-image");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://ai-penilai.3no.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageBase64: "base64-guest-image" }),
      }
    );
    expect(result).toEqual(mockResponseData);
  });

  // C10-UT14: Negatif - server merespons gagal (!res.ok)
  test("C10-UT14: kirimFoto melempar Error saat respons HTTP tidak ok", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ error: "Gambar tidak valid" }),
    });

    await expect(kirimFoto("corrupt-base64")).rejects.toThrow("Gambar tidak valid");

    // Uji fallback pesan error default jika data.error kosong
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({}),
    });

    await expect(kirimFoto("corrupt-base64")).rejects.toThrow("Permintaan gagal");
  });

  // C10-UT15: Normal & Negatif - hapusFile
  test("C10-UT15: hapusFile menghapus file jika ada, dan aman jika file tidak ada atau error", () => {
    const deleteMock = jest.fn();

    // Kasus 1: File ada -> delete() dipanggil
    File.mockImplementationOnce(() => ({
      exists: true,
      delete: deleteMock,
    }));
    hapusFile("file:///cache/foto1.jpg");
    expect(deleteMock).toHaveBeenCalledTimes(1);

    // Kasus 2: File tidak ada -> delete() tidak dipanggil
    File.mockImplementationOnce(() => ({
      exists: false,
      delete: deleteMock,
    }));
    hapusFile("file:///cache/tidak-ada.jpg");
    expect(deleteMock).toHaveBeenCalledTimes(1);

    // Kasus 3: Terjadi exception -> tertangkap tanpa crash
    File.mockImplementationOnce(() => {
      throw new Error("Permission denied");
    });
    expect(() => hapusFile("file:///cache/error.jpg")).not.toThrow();
  });
});