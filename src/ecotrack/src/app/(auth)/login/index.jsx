import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';
import InputField from '@/ui/component/InputField';
import Button from '@/ui/component/Button';
import { AkunPetugasController } from '../../../controller/AkunPetugasController';
import { validateEmail } from '../../../utils/validators';

import { toast } from "@/ui/component/Toast";
import { bukaHalamanAuth } from '../../../utils/navigasiAuth';

export default function LoginPage() {
  const router = useRouter();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  function showErrorInput(kolom, pesan) {
    if (kolom === "email") setErrorEmail(pesan);
    else setErrorPassword(pesan);
  }

  function bersihkanErrorKredensial() {
    if (errorEmail) setErrorEmail("");
    if (errorPassword) setErrorPassword("");
  }

  async function inputKredensial() {
    const pesanEmail = validateEmail(email);
    const pesanPassword = !password ? "Kata sandi wajib diisi" : "";

    setErrorEmail(pesanEmail || "");
    setErrorPassword(pesanPassword);

    if (pesanEmail || pesanPassword) return;

    const status = await AkunPetugasController.prosesLogin(email, password);

    if (status === 'BERHASIL') {
      toast.berhasil("Selamat datang kembali!");
      router.dismissTo("/informasi");
    } else if (status === 'KREDENSIAL_SALAH') {
      // Kesepakatan Baru: Garis merah tanpa pesan di email, garis merah dgn pesan di password
      showErrorInput("email", true);
      showErrorInput("password", "Email/Kata sandi salah");
    } else {
      toast.gagal("Gagal terhubung ke server. Periksa koneksi internet Anda.");
    }
  }

  return (
    <View style={styles.halaman}>
      <Header judul="EcoTrack" logo tampilKembali style={styles.header} />

      <ScrollView style={styles.kartu} contentContainerStyle={styles.isiKartu} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
        <View style={styles.blokJudul}>
          <Text style={styles.judul}>Masuk Akun</Text>
          <Text style={styles.subjudul}>Masuk untuk mengakses akun petugas</Text>
        </View>

        <InputField 
          label="Email" placeholder="Masukkan Email" value={email} keyboardType="email-address" error={errorEmail}
          onChangeText={(teks) => { setEmail(teks); bersihkanErrorKredensial(); }} 
        />

        <InputField 
          label="Kata Sandi" placeholder="Masukkan kata sandi" value={password} sandi error={errorPassword} onSubmitEditing={inputKredensial}
          onChangeText={(teks) => { setPassword(teks); bersihkanErrorKredensial(); }} 
        />

        <Text style={styles.lupa}>Lupa kata sandi?</Text>
        <Button label="MASUK" onPress={inputKredensial} />

        <Text style={styles.teksBawah}>
          Belum punya akun?{" "}
          <Text style={styles.tautan} onPress={() => bukaHalamanAuth(navigation, router, "(auth)/signup/index", "/signup")}>
            Klik di sini
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, paddingBottom: 49 },
  halaman: { flex: 1, backgroundColor: COLOR.forestEmerald },
  kartu: { flex: 1, marginTop: -24, borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: COLOR.white },
  isiKartu: { gap: 14, padding: 24 },
  blokJudul: { alignItems: "center", gap: 4, marginBottom: 8 },
  judul: { ...TEXT.titleMedium, color: COLOR.black },
  subjudul: { ...TEXT.descriptiveText, color: COLOR.black },
  lupa: { ...TEXT.descriptiveText, color: COLOR.forestEmerald, alignSelf: "flex-end" },
  teksBawah: { ...TEXT.descriptiveText, color: COLOR.black, textAlign: "center" },
  tautan: { fontFamily: TEXT.bodyText.fontFamily, color: COLOR.forestEmerald },
});