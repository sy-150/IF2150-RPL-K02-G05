// app/profil/index.jsx → AkunPetugasInterface (F4): Profil Petugas (I15–I20).
// Tanpa login, halaman ini langsung mengarahkan ke Log In.

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Redirect, useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { TEXT, COLOR } from '@/ui/theme';
import Header from "@/ui/component/Header";
import InputField from "@/ui/component/InputField";
import Button from "@/ui/component/Button";
import Dialog from "@/ui/component/Dialog";
import { toast } from "@/ui/component/Toast";
import { AkunPetugasController } from '@/controller/AkunPetugasController';
import { validateEmail, validatePhoneNumber, validatePassword } from '@/utils/validators';

export default function ProfilPage() {
  const router = useRouter();

  const [status, setStatus] = useState("memuat"); // "memuat" | "siap" | "belumLogin" | "gagal"
  const [profil, setProfil] = useState(null);

  // State untuk Edit Profil (I16)
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [errorEdit, setErrorEdit] = useState({});

  // State untuk Dialog
  const [modalLogout, setModalLogout] = useState(false);
  // Isi pesan dialog "Masuk Ulang Diperlukan"; null = dialog tertutup.
  const [pesanLoginUlang, setPesanLoginUlang] = useState(null);
  const [modalPassword, setModalPassword] = useState(false);

  // State untuk Ubah Kata Sandi (I20)
  const [passBaru, setPassBaru] = useState('');
  const [passKonfirm, setPassKonfirm] = useState('');
  const [errorPass, setErrorPass] = useState({});

  // Profil dibaca dari sesi Firebase + Firestore lewat controller (DPPL getProfil).
  async function muatProfil() {
    setStatus("memuat");
    try {
      const data = await AkunPetugasController.getProfil();
      if (!data) {
        setStatus("belumLogin");
        return;
      }
      setProfil(data);
      setStatus("siap");
    } catch (e) {
      console.warn("Gagal memuat profil:", e?.code ?? e?.message);
      setStatus("gagal");
    }
  }

  // Memperbarui profil tanpa menampilkan loading, misalnya setelah petugas kembali dari aplikasi
  // email setelah membuka tautan verifikasi email baru. Kalau gagal, tampilan lama dibiarkan.
  async function segarkanProfil() {
    try {
      const data = await AkunPetugasController.getProfil();
      if (!data) {
        // Sesi dibatalkan Firebase, misalnya setelah email login diganti lewat tautan verifikasi.
        toast.gagal("Sesi berakhir. Silakan masuk lagi");
        setStatus("belumLogin");
        return;
      }
      setProfil(data);
      setStatus("siap");
    } catch (e) {
      console.warn("Gagal memperbarui profil:", e?.code ?? e?.message);
    }
  }

  useEffect(() => {
    muatProfil();
    const langganan = AppState.addEventListener("change", (keadaan) => {
      if (keadaan === "active") segarkanProfil();
    });
    return () => langganan.remove();
  }, []);

  // PENTING: pakai profil?.xxx di dalam fungsi. React Compiler membaca nilai yang dipakai fungsi
  // setiap render, termasuk saat profil masih null.
  function mulaiEdit() {
    setEmail(profil?.email ?? "");
    setNoTelepon(profil?.noTelepon ?? "");
    setErrorEdit({});
    setIsEditing(true);
  }

  function ubahIsian(kolom, setter) {
    return (teks) => {
      setter(teks);
      if (errorEdit[kolom]) setErrorEdit((lama) => ({ ...lama, [kolom]: null }));
    };
  }

  // Handler Edit Profil (I16–I18)
  async function handleSimpanProfil() {
    const errEmail = validateEmail(email);
    const errTelepon = validatePhoneNumber(noTelepon);
    if (errEmail || errTelepon) {
      setErrorEdit({ email: errEmail, noTelepon: errTelepon });
      return;
    }

    const hasil = await AkunPetugasController.editProfil(email, noTelepon);

    if (hasil === 'BERHASIL' || hasil === 'VERIFIKASI_EMAIL') {
      setProfil((lama) => ({ ...lama, noTelepon: noTelepon.trim() }));
      setIsEditing(false);
      if (hasil === 'BERHASIL') {
        toast.berhasil("Profil berhasil diperbarui");
      } else {
        toast.berhasil("Tautan verifikasi dikirim ke email baru. Email berganti setelah tautan dibuka");
      }
    } else if (hasil === 'EMAIL_TERDAFTAR') {
      setErrorEdit({ email: "Email sudah terdaftar" });
    } else if (hasil === 'EMAIL_TIDAK_VALID') {
      setErrorEdit({ email: "Format email tidak valid" });
    } else if (hasil === 'PERLU_LOGIN_ULANG') {
      setPesanLoginUlang("Demi keamanan, email hanya bisa diganti tidak lama setelah masuk. Keluar lalu masuk lagi, kemudian ganti email.");
    } else if (hasil === 'TERLALU_SERING') {
      toast.gagal("Terlalu banyak percobaan. Coba lagi beberapa saat lagi.");
    } else if (hasil === 'BELUM_LOGIN') {
      setStatus("belumLogin");
    } else {
      toast.gagal("Profil gagal diperbarui"); // I18: isian tetap ada
    }
  }

  // Handler Logout (I19)
  async function handleLogout() {
    try {
      await AkunPetugasController.logout();
      setModalLogout(false);
      router.dismissTo("/informasi");
    } catch (e) {
      console.warn("Logout gagal:", e?.code ?? e?.message);
      toast.gagal("Gagal keluar akun");
    }
  }

  // Firebase hanya mengizinkan ganti kata sandi/email tidak lama setelah login. Kalau sudah lama,
  // petugas keluar lalu diarahkan ke Log In untuk masuk lagi.
  async function keluarUntukLoginUlang() {
    try {
      await AkunPetugasController.logout();
      setPesanLoginUlang(null);
      router.replace("/login");
    } catch (e) {
      console.warn("Logout gagal:", e?.code ?? e?.message);
      toast.gagal("Gagal keluar akun");
    }
  }

  function tutupModalPassword() {
    setModalPassword(false);
    setPassBaru('');
    setPassKonfirm('');
    setErrorPass({});
  }

  // Handler Ganti Kata Sandi (I20: kata sandi baru + konfirmasi)
  async function handleGantiPassword() {
    const errBaru = validatePassword(passBaru);
    const errKonfirm = !passKonfirm
      ? "Konfirmasi kata sandi wajib diisi"
      : passKonfirm !== passBaru
        ? "Konfirmasi kata sandi tidak sama"
        : null;

    if (errBaru || errKonfirm) {
      setErrorPass({ baru: errBaru, konfirm: errKonfirm });
      return;
    }

    const hasil = await AkunPetugasController.changePassword(passBaru);

    if (hasil === 'BERHASIL') {
      toast.berhasil("Kata sandi berhasil diperbarui");
      tutupModalPassword();
    } else if (hasil === 'PERLU_LOGIN_ULANG') {
      tutupModalPassword();
      setPesanLoginUlang("Demi keamanan, kata sandi hanya bisa diganti tidak lama setelah masuk. Keluar lalu masuk lagi, kemudian ganti kata sandi.");
    } else if (hasil === 'SANDI_LEMAH') {
      setErrorPass({ baru: "Kata sandi terlalu lemah" });
    } else if (hasil === 'TERLALU_SERING') {
      toast.gagal("Terlalu banyak percobaan. Coba lagi beberapa saat lagi.");
    } else if (hasil === 'BELUM_LOGIN') {
      tutupModalPassword();
      setStatus("belumLogin");
    } else {
      toast.gagal("Kata sandi gagal diperbarui");
    }
  }

  if (status === "belumLogin") return <Redirect href="/login" />;

  return (
    <View style={styles.halaman}>
      <Header judul="Profil Petugas" tampilKembali style={styles.header} />

      {status === "memuat" ? (
        <View style={styles.tengah}>
          <ActivityIndicator size="large" color={COLOR.forestEmerald} />
        </View>
      ) : status === "gagal" ? (
        <View style={styles.tengah}>
          <MaterialIcons name="cloud-off" size={72} color={COLOR.deepForestGreen} />
          <Text style={styles.judulGagal}>Gagal memuat profil</Text>
          <Button label="COBA LAGI" onPress={muatProfil} style={styles.lebarPenuh} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
        >
          {/* KARTU PROFIL UTAMA (I15 & I16) */}
          <View style={styles.kartuProfil}>
            <View style={styles.avatarWrapper}>
              <MaterialIcons name="account-circle" size={80} color={COLOR.deepForestGreen} />
            </View>
            <Text style={styles.namaText}>{profil?.username}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Petugas Kebersihan</Text>
            </View>

            {!isEditing ? (
              <View style={styles.infoWrapper}>
                <BarisInfo ikon="email" label="Email" nilai={profil?.email} />
                <BarisInfo ikon="phone" label="No. Telepon" nilai={profil?.noTelepon} />
                <BarisInfo ikon="location-on" label="Wilayah Tugas" nilai={profil?.wilayahTugas} terakhir />

                <Button label="EDIT PROFIL" ikon="edit" onPress={mulaiEdit} />
              </View>
            ) : (
              <View style={styles.formWrapper}>
                <InputField
                  label="Email" value={email} keyboardType="email-address" error={errorEdit.email}
                  onChangeText={ubahIsian("email", setEmail)}
                />
                <InputField
                  label="No. Telepon" value={noTelepon} keyboardType="phone-pad" maxLength={15} error={errorEdit.noTelepon}
                  onChangeText={ubahIsian("noTelepon", setNoTelepon)}
                />
                {/* Nama, NIK, dan wilayah tugas ditetapkan data pemerintah, jadi tidak bisa diubah */}
                <InputField label="Wilayah Tugas" value={profil?.wilayahTugas ?? "-"} terkunci />

                <View style={styles.barisTombol}>
                  <Button label="BATAL" varian="outline" onPress={() => setIsEditing(false)} style={styles.lebar} />
                  <Button label="SIMPAN" onPress={handleSimpanProfil} style={styles.lebar} />
                </View>
              </View>
            )}
          </View>

          {/* MENU TAMBAHAN (disembunyikan saat mode edit) */}
          {!isEditing && (
            <>
              <Pressable style={styles.kartuMenu} onPress={() => setModalPassword(true)} accessibilityRole="button">
                <MaterialIcons name="lock" size={20} color={COLOR.forestEmerald} />
                <Text style={styles.kartuMenuText}>Ganti Kata Sandi</Text>
                <MaterialIcons name="chevron-right" size={24} color={COLOR.black} />
              </Pressable>

              <Button
                label="KELUAR AKUN"
                varian="bahayaOutline"
                onPress={() => setModalLogout(true)}
                style={styles.tombolKeluar}
              />
            </>
          )}
        </ScrollView>
      )}

      {/* POP UP UBAH KATA SANDI (I20) */}
      <Modal
        visible={modalPassword}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={tutupModalPassword} // tombol Back Android
      >
        {/* Popup naik saat keyboard muncul, dan bisa di-scroll di layar kecil,
            supaya kolom kata sandi tidak tertutup keyboard */}
        <KeyboardAvoidingView style={styles.modalOverlay} behavior="padding">
          <ScrollView
            contentContainerStyle={styles.modalScroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
          <View style={styles.modalCard}>
            <View style={styles.modalIconBox}>
              <MaterialIcons name="lock" size={24} color={COLOR.forestEmerald} />
            </View>
            <Text style={styles.modalTitle}>Ubah Kata Sandi</Text>
            <Text style={styles.modalDesc}>Ganti kata sandi Anda untuk meningkatkan keamanan akun Anda</Text>

            <View style={styles.formPassword}>
              <InputField
                label="Kata Sandi Baru" placeholder="Masukkan kata sandi baru" value={passBaru} sandi
                error={errorPass.baru} onChangeText={setPassBaru}
              />
              <InputField
                label="Konfirmasi Kata Sandi Baru" placeholder="Masukkan kata sandi baru" value={passKonfirm} sandi
                error={errorPass.konfirm} onChangeText={setPassKonfirm}
              />
            </View>

            <View style={styles.barisTombol}>
              <Button label="BATAL" varian="outline" onPress={tutupModalPassword} style={styles.lebar} />
              <Button label="SIMPAN" onPress={handleGantiPassword} style={styles.lebar} />
            </View>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* POP UP MASUK ULANG (sesi login sudah lama untuk ganti kata sandi/email) */}
      <Dialog
        terlihat={pesanLoginUlang !== null}
        onTutup={() => setPesanLoginUlang(null)}
        ikon="lock-clock"
        judul="Masuk Ulang Diperlukan"
        pesan={pesanLoginUlang ?? ""}
        tombolUtama={{ label: "Keluar Sekarang", onPress: keluarUntukLoginUlang }}
        tombolKedua={{ label: "Nanti", onPress: () => setPesanLoginUlang(null) }}
      />

      {/* POP UP KELUAR AKUN (I19) */}
      <Dialog
        terlihat={modalLogout}
        onTutup={() => setModalLogout(false)}
        varian="bahaya"
        ikon="logout"
        judul="Keluar Akun"
        pesan="Apakah Anda yakin hendak keluar akun ini?"
        tombolUtama={{ label: "Keluar", onPress: handleLogout }}
        tombolKedua={{ label: "Batal", onPress: () => setModalLogout(false) }}
      />
    </View>
  );
}

// Satu baris data profil: ikon, label kecil, dan nilainya (I15).
function BarisInfo({ ikon, label, nilai, terakhir = false }) {
  return (
    <View style={[styles.infoRow, terakhir && styles.infoRowTerakhir]}>
      <MaterialIcons name={ikon} size={20} color={COLOR.forestEmerald} style={styles.infoIcon} />
      <View style={styles.infoTextWrapper}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{nilai || "-"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  halaman: { flex: 1, backgroundColor: COLOR.secondaryWhite },
  header: { paddingBottom: 96, zIndex: 0, elevation: 0 },
  scrollView: { flex: 1, marginTop: -76, zIndex: 10, elevation: 10 },
  scrollContainer: { paddingHorizontal: 24, paddingTop: 4, gap: 16, paddingBottom: 40 },

  // MEMUAT & GAGAL
  tengah: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingHorizontal: 32 },
  judulGagal: { ...TEXT.titleCenter, color: COLOR.deepForestGreen },
  lebarPenuh: { alignSelf: 'stretch' },

  // KARTU PROFIL
  kartuProfil: {
    backgroundColor: COLOR.white,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarWrapper: {
    marginBottom: 8,
  },
  namaText: { ...TEXT.titleCenter, color: COLOR.black, marginBottom: 8 },
  badge: {
    backgroundColor: COLOR.secondaryWhite,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  badgeText: { ...TEXT.smallText, color: COLOR.deepForestGreen },

  // BARIS INFO
  infoWrapper: { width: '100%', gap: 16 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.secondaryWhite,
  },
  infoRowTerakhir: { borderBottomWidth: 0 },
  infoIcon: { marginRight: 16 },
  infoTextWrapper: { flex: 1 },
  infoLabel: { ...TEXT.descriptiveText, color: COLOR.forestEmerald, fontSize: 12 },
  infoValue: { ...TEXT.bodyText, color: COLOR.black, marginTop: 2 },

  // FORM EDIT & TOMBOL
  formWrapper: { width: '100%', gap: 14 },
  barisTombol: { width: '100%', flexDirection: 'row', gap: 12, marginTop: 8 },
  lebar: { flex: 1 },

  // MENU KARTU BAWAH
  kartuMenu: {
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  kartuMenuText: { flex: 1, ...TEXT.bodyText, color: COLOR.black, marginLeft: 12 },
  tombolKeluar: { marginTop: 20 },

  // MODAL UBAH SANDI
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLOR.white,
    width: '100%',
    maxWidth: 360,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  modalIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLOR.secondaryWhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: { ...TEXT.titleMedium, color: COLOR.black, marginBottom: 8, textAlign: 'center' },
  modalDesc: { ...TEXT.descriptiveText, color: COLOR.black, textAlign: 'center', marginBottom: 24, paddingHorizontal: 10 },
  formPassword: { width: '100%', gap: 12, marginBottom: 12 },
});
