import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Alert, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';
import InputField from '@/ui/component/InputField';
import Button from '@/ui/component/Button';
import { AkunPetugasController } from '../../../controller/AkunPetugasController';
import {
  validateEmail,
  validateNIK,
  validatePhoneNumber,
  validatePassword,
  validatePasswordConfirmation,
} from '../../../utils/validators';

export default function SignUpPage() {
  const router = useRouter();

  const [namaLengkap, setNamaLengkap] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Fungsi alert cross-platform (Web & Mobile)
  const tampilkanPesan = (judul, isi, tindakanKapanSelesai) => {
    console.log(`[ALERT] ${judul}: ${isi}`);
    if (Platform.OS === 'web') {
      alert(`${judul}\n\n${isi}`);
      if (tindakanKapanSelesai) tindakanKapanSelesai();
    } else {
      Alert.alert(judul, isi, [{ text: "OK", onPress: tindakanKapanSelesai }]);
    }
  };

  const handleSignUp = async () => {
    console.log("--> Tombol DAFTAR SEKARANG ditekan!");

    // 1. Validasi Input Format
    const errNama = !namaLengkap.trim() ? "Nama lengkap wajib diisi" : null;
    const errNik = validateNIK(nik);
    const errEmail = validateEmail(email);
    const errPhone = validatePhoneNumber(noTelepon);
    const errPass = validatePassword(password);
    const errConf = validatePasswordConfirmation(password, konfirmasiPassword);

    if (errNama || errNik || errEmail || errPhone || errPass || errConf) {
      console.log("--> Validasi form gagal:", { errNama, errNik, errEmail, errPhone, errPass, errConf });
      setErrors({
        namaLengkap: errNama,
        nik: errNik,
        email: errEmail,
        noTelepon: errPhone,
        password: errPass,
        konfirmasiPassword: errConf,
      });
      return;
    }

    setErrors({});
    console.log("--> Form valid! Mengirim data ke AkunPetugasController...");

    try {
      const hasil = await AkunPetugasController.signUp(
        namaLengkap, nik, email, noTelepon, password, konfirmasiPassword
      );

      console.log("--> Hasil dari Controller:", hasil);

      if (hasil.status === true) {
        tampilkanPesan("Sukses", "Akun berhasil dibuat! Silakan masuk.", () => {
          router.push('/(auth)/login');
        });
      } else {
        if (hasil.pesan === 'EMAIL_TERDAFTAR') {
          setErrors((prev) => ({ ...prev, email: "Email sudah terdaftar" }));
        } else if (hasil.pesan === 'NIK_TIDAK_TERDAFTAR') {
          setErrors((prev) => ({ ...prev, nik: "NIK tidak terdaftar sebagai petugas kebersihan" }));
        } else if (hasil.pesan === 'NAMA_TIDAK_SESUAI') {
          setErrors((prev) => ({ ...prev, namaLengkap: "Nama lengkap tidak sesuai dengan data NIK" }));
        } else if (hasil.pesan === 'NIK_SUDAH_TERDAFTAR') {
          setErrors((prev) => ({ ...prev, nik: "NIK ini sudah mendaftarkan akun" }));
        } else {
          tampilkanPesan("Pendaftaran Gagal", hasil.pesan);
        }
      }
    } catch (err) {
      console.error("--> Exception error saat Sign Up:", err);
      tampilkanPesan("Error", err.message || "Terjadi kesalahan sistem");
    }
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  return (
    <View style={styles.halaman}>
      <Header
        judul="Daftar Akun Petugas"
        subjudul={"Buat akun untuk\nmulai mengelola sampah"}
        tampilKembali
        style={styles.header}
      />

      <ScrollView
        style={styles.kartu}
        contentContainerStyle={styles.isiKartu}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <InputField
          label="Nama Lengkap"
          placeholder="Masukkan nama sesuai KTP"
          value={namaLengkap}
          onChangeText={(teks) => { setNamaLengkap(teks); clearError('namaLengkap'); }}
          error={errors.namaLengkap}
        />

        <InputField
          label="NIK (16 Digit)"
          placeholder="3204xxxxxxxxxxxx"
          value={nik}
          onChangeText={(teks) => { setNik(teks); clearError('nik'); }}
          keyboardType="numeric"
          error={errors.nik}
        />

        <InputField
          label="Email"
          placeholder="contoh@ecotrack.id"
          value={email}
          onChangeText={(teks) => { setEmail(teks); clearError('email'); }}
          keyboardType="email-address"
          error={errors.email}
        />

        <InputField
          label="Nomor Telepon"
          placeholder="0812xxxxxxxx"
          value={noTelepon}
          onChangeText={(teks) => { setNoTelepon(teks); clearError('noTelepon'); }}
          keyboardType="phone-pad"
          error={errors.noTelepon}
        />

        <InputField
          label="Kata Sandi"
          placeholder="Minimal 6 karakter"
          value={password}
          onChangeText={(teks) => { setPassword(teks); clearError('password'); }}
          sandi
          error={errors.password}
        />

        <InputField
          label="Konfirmasi Kata Sandi"
          placeholder="Ulangi kata sandi"
          value={konfirmasiPassword}
          onChangeText={(teks) => { setKonfirmasiPassword(teks); clearError('konfirmasiPassword'); }}
          sandi
          error={errors.konfirmasiPassword}
          onSubmitEditing={handleSignUp}
        />

        <View style={{ marginTop: 10 }}>
          <Button label="DAFTAR SEKARANG" onPress={handleSignUp} />
        </View>

        <Text style={styles.teksBawah}>
          Sudah punya akun?{" "}
          <Link href="/login" style={styles.tautan}>Masuk di sini</Link>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingBottom: 48, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
  halaman: { flex: 1, backgroundColor: COLOR.secondaryWhite },
  kartu: { flex: 1, marginTop: -24, borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: COLOR.white },
  isiKartu: { gap: 14, padding: 24 },
  teksBawah: { ...TEXT.descriptiveText, color: COLOR.black, textAlign: "center", marginTop: 8 },
  tautan: { fontFamily: TEXT.bodyText.fontFamily, color: COLOR.forestEmerald },
});