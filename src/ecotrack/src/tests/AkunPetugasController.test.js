
import { AkunPetugas } from "@/model/AkunPetugas";
import { auth } from "@/database/firebase";
import { AkunPetugasController } from "@/controller/AkunPetugasController";

jest.mock("@/model/AkunPetugas", () => ({
  AkunPetugas: {
    verifikasiPetugas: jest.fn(),
    createAkunPetugas: jest.fn(),
    loginAuth: jest.fn(),
    kirimResetKataSandi: jest.fn(),
    logout: jest.fn(),
    getProfil: jest.fn(),
    editProfil: jest.fn(),
    changePassword: jest.fn(),
    username: "Petugas",
    wilayahTugas: "Bandung",
  },
}));

jest.mock("@/database/firebase", () => ({
  auth: {
    currentUser: null,
  },
}));

describe("AkunPetugasController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    auth.currentUser = null;
  });

  describe("signUp", () => {
    test("mengembalikan KONFIRMASI_SANDI_BEDA jika password berbeda", async () => {
      const hasil = await AkunPetugasController.signUp(
        "Rani", "123", "rani@mail.com", "08123", "abc", "xyz"
      );

      expect(hasil).toBe("KONFIRMASI_SANDI_BEDA");
      expect(AkunPetugas.verifikasiPetugas).not.toHaveBeenCalled();
    });

    test("mengembalikan status jika verifikasi petugas gagal", async () => {
      AkunPetugas.verifikasiPetugas.mockResolvedValue("TIDAK_VALID");

      const hasil = await AkunPetugasController.signUp(
        "Rani", "123", "rani@mail.com", "08123", "abc", "abc"
      );

      expect(hasil).toBe("TIDAK_VALID");
      expect(AkunPetugas.createAkunPetugas).not.toHaveBeenCalled();
    });

    test("membuat akun jika verifikasi berhasil", async () => {
      AkunPetugas.verifikasiPetugas.mockResolvedValue("VALID");
      AkunPetugas.createAkunPetugas.mockResolvedValue("BERHASIL");

      const hasil = await AkunPetugasController.signUp(
        "Rani", "123", "rani@mail.com", "08123", "abc", "abc"
      );

      expect(hasil).toBe("BERHASIL");
      expect(AkunPetugas.createAkunPetugas).toHaveBeenCalled();
    });

    test("mengembalikan NETWORK_ERROR jika terjadi error", async () => {
      AkunPetugas.verifikasiPetugas.mockRejectedValue(new Error("Offline"));

      const hasil = await AkunPetugasController.signUp(
        "Rani", "123", "rani@mail.com", "08123", "abc", "abc"
      );

      expect(hasil).toBe("NETWORK_ERROR");
    });
  });

  describe("prosesLogin", () => {
    test("login berhasil", async () => {
      AkunPetugas.loginAuth.mockResolvedValue(true);

      const hasil = await AkunPetugasController.prosesLogin(
        "rani@mail.com", "password"
      );

      expect(hasil).toBe("BERHASIL");
    });

    test("login gagal", async () => {
      AkunPetugas.loginAuth.mockResolvedValue(false);

      const hasil = await AkunPetugasController.prosesLogin(
        "rani@mail.com", "password"
      );

      expect(hasil).toBe("KREDENSIAL_SALAH");
    });

    test("mengembalikan NETWORK_ERROR jika terjadi error", async () => {
      AkunPetugas.loginAuth.mockRejectedValue(new Error("Offline"));

      const hasil = await AkunPetugasController.prosesLogin(
        "rani@mail.com", "password"
      );

      expect(hasil).toBe("NETWORK_ERROR");
    });
  });

  describe("lupaKataSandi", () => {
    test("berhasil mengirim email reset", async () => {
      AkunPetugas.kirimResetKataSandi.mockResolvedValue();

      const hasil = await AkunPetugasController.lupaKataSandi(
        "rani@mail.com"
      );

      expect(hasil).toBe("TERKIRIM");
    });

    test("tetap TERKIRIM jika email tidak terdaftar", async () => {
      AkunPetugas.kirimResetKataSandi.mockRejectedValue({
        code: "auth/user-not-found",
      });

      const hasil = await AkunPetugasController.lupaKataSandi(
        "rani@mail.com"
      );

      expect(hasil).toBe("TERKIRIM");
    });

    test("mengembalikan EMAIL_TIDAK_VALID", async () => {
      AkunPetugas.kirimResetKataSandi.mockRejectedValue({
        code: "auth/invalid-email",
      });

      const hasil = await AkunPetugasController.lupaKataSandi(
        "email-salah"
      );

      expect(hasil).toBe("EMAIL_TIDAK_VALID");
    });

    test("mengembalikan TERLALU_SERING", async () => {
      AkunPetugas.kirimResetKataSandi.mockRejectedValue({
        code: "auth/too-many-requests",
      });

      const hasil = await AkunPetugasController.lupaKataSandi(
        "rani@mail.com"
      );

      expect(hasil).toBe("TERLALU_SERING");
    });
  });

  describe("logout", () => {
    test("memanggil logout pada model", async () => {
      AkunPetugas.logout.mockResolvedValue();

      await AkunPetugasController.logout();

      expect(AkunPetugas.logout).toHaveBeenCalled();
    });
  });

  describe("getProfil", () => {
    test("mengembalikan profil petugas", async () => {
      const profil = { nama: "Rani", email: "rani@mail.com" };
      AkunPetugas.getProfil.mockResolvedValue(profil);

      const hasil = await AkunPetugasController.getProfil();

      expect(hasil).toEqual(profil);
    });
  });

  describe("editProfil", () => {
    test("berhasil mengedit profil", async () => {
      AkunPetugas.editProfil.mockResolvedValue("BERHASIL");

      const hasil = await AkunPetugasController.editProfil(
        "baru@mail.com", "081234"
      );

      expect(hasil).toBe("BERHASIL");
    });

    test("mengembalikan EMAIL_TERDAFTAR", async () => {
      AkunPetugas.editProfil.mockRejectedValue({
        code: "auth/email-already-in-use",
      });

      const hasil = await AkunPetugasController.editProfil(
        "lama@mail.com", "081234"
      );

      expect(hasil).toBe("EMAIL_TERDAFTAR");
    });

    test("mengembalikan PERLU_LOGIN_ULANG", async () => {
      AkunPetugas.editProfil.mockRejectedValue({
        code: "auth/requires-recent-login",
      });

      const hasil = await AkunPetugasController.editProfil(
        "baru@mail.com", "081234"
      );

      expect(hasil).toBe("PERLU_LOGIN_ULANG");
    });
  });

  describe("changePassword", () => {
    test("mengembalikan BELUM_LOGIN jika tidak ada user", async () => {
      auth.currentUser = null;

      const hasil = await AkunPetugasController.changePassword("passwordBaru");

      expect(hasil).toBe("BELUM_LOGIN");
      expect(AkunPetugas.changePassword).not.toHaveBeenCalled();
    });

    test("berhasil mengubah password", async () => {
      auth.currentUser = { uid: "123" };
      AkunPetugas.changePassword.mockResolvedValue(true);

      const hasil = await AkunPetugasController.changePassword("passwordBaru");

      expect(hasil).toBe("BERHASIL");
    });

    test("mengembalikan PERLU_LOGIN_ULANG", async () => {
      auth.currentUser = { uid: "123" };
      AkunPetugas.changePassword.mockRejectedValue({
        code: "auth/requires-recent-login",
      });

      const hasil = await AkunPetugasController.changePassword("passwordBaru");

      expect(hasil).toBe("PERLU_LOGIN_ULANG");
    });

    test("mengembalikan SANDI_LEMAH", async () => {
      auth.currentUser = { uid: "123" };
      AkunPetugas.changePassword.mockRejectedValue({
        code: "auth/weak-password",
      });

      const hasil = await AkunPetugasController.changePassword("123");

      expect(hasil).toBe("SANDI_LEMAH");
    });
  });
});
