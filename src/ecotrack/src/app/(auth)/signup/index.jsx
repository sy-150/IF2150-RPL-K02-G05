import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';
import InputField from '@/ui/component/InputField';
import Button from '@/ui/component/Button';
import { AkunPetugasController } from '../../../controller/AkunPetugasController';
import { validateEmail, validateNIK, validatePhoneNumber, validatePassword, validatePasswordConfirmation } from '../../../utils/validators';

import { toast } from "@/ui/component/Toast";
import { bukaHalamanAuth } from '../../../utils/navigasiAuth';

export default function ShowSignUp() {
  const router = useRouter();
  const navigation = useNavigation();

  const [namaLengkap, setNamaLengkap] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [errors, setErrors] = useState({});

  function showSignUp(statusCreate) {
    if (statusCreate === 'BERHASIL') {
      toast.berhasil("Akun berhasil dibuat");
      router.dismissTo("/informasi");
    } else if (statusCreate === 'EMAIL_TERDAFTAR') {
      setErrors((prev) => ({ ...prev, email: "Email sudah terdaftar" }));
    } else if (statusCreate === 'NIK_TIDAK_TERDAFTAR') {
      setErrors((prev) => ({ ...prev, nik: "NIK tidak terdaftar sebagai petugas kebersihan" }));
    } else if (statusCreate === 'NAMA_TIDAK_SESUAI') {
      setErrors((prev) => ({ ...prev, namaLengkap: "Nama lengkap tidak sesuai dengan data NIK" }));
    } else if (statusCreate === 'NIK_SUDAH_TERDAFTAR') {
      setErrors((prev) => ({ ...prev, nik: "NIK ini sudah mendaftarkan akun" }));
    } else if (statusCreate === 'KONFIRMASI_SANDI_BEDA') {
      setErrors((prev) => ({ ...prev, konfirmasiPassword: "Konfirmasi kata sandi tidak sesuai" }));
    } else {
      toast.gagal("Gagal menghubungi server. Periksa koneksi internet Anda.");
    }
  }

  const handleSignUp = async () => {
    const errNama = !namaLengkap.trim() ? "Nama lengkap wajib diisi" : null;
    const errNik = validateNIK(nik);
    const errEmail = validateEmail(email);
    const errPhone = validatePhoneNumber(noTelepon);
    const errPass = validatePassword(password);
    const errConf = validatePasswordConfirmation(password, konfirmasiPassword);

    if (errNama || errNik || errEmail || errPhone || errPass || errConf) {
      setErrors({ namaLengkap: errNama, nik: errNik, email: errEmail, noTelepon: errPhone, password: errPass, konfirmasiPassword: errConf });
      return;
    }

    setErrors({});

    const statusCreate = await AkunPetugasController.signUp(
      namaLengkap, nik, email, noTelepon, password, konfirmasiPassword
    );

    showSignUp(statusCreate);
  };

  const clearError = (field) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  return (
    <View style={styles.halaman}>
      <Header judul="Daftar Akun Petugas" subjudul={"Buat akun untuk\nmulai mengelola sampah"} tampilKembali style={styles.header} />
      
      <ScrollView style={styles.kartu} contentContainerStyle={styles.isiKartu} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
        <InputField label="Nama Lengkap" placeholder="Masukkan nama sesuai KTP" value={namaLengkap} error={errors.namaLengkap} onChangeText={(teks) => { setNamaLengkap(teks); clearError('namaLengkap'); }} />
        <InputField label="NIK (16 Digit)" placeholder="3204xxxxxxxxxxxx" value={nik} maxLength={16} keyboardType="numeric" error={errors.nik} onChangeText={(teks) => { setNik(teks); clearError('nik'); }} />
        <InputField label="Email" placeholder="contoh@ecotrack.id" value={email} keyboardType="email-address" error={errors.email} onChangeText={(teks) => { setEmail(teks); clearError('email'); }} />
        <InputField label="Nomor Telepon" placeholder="0812xxxxxxxx" value={noTelepon} keyboardType="phone-pad" error={errors.noTelepon} onChangeText={(teks) => { setNoTelepon(teks); clearError('noTelepon'); }} />
        <InputField label="Kata Sandi" placeholder="Minimal 6 karakter" value={password} sandi error={errors.password} onChangeText={(teks) => { setPassword(teks); clearError('password'); }} />
        <InputField label="Konfirmasi Kata Sandi" placeholder="Ulangi kata sandi" value={konfirmasiPassword} sandi error={errors.konfirmasiPassword} onSubmitEditing={handleSignUp} onChangeText={(teks) => { setKonfirmasiPassword(teks); clearError('konfirmasiPassword'); }} />
        
        <View style={{ marginTop: 10 }}>
          <Button label="DAFTAR" onPress={handleSignUp} />
        </View>

        <Text style={styles.teksBawah}>
          Sudah punya akun?{" "}
          <Text style={styles.tautan} onPress={() => bukaHalamanAuth(navigation, router, "(auth)/login/index", "/login")}>
            Masuk di sini
          </Text>
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