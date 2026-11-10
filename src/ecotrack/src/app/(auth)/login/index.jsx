import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, ToastAndroid, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';
import InputField from '@/ui/component/InputField';
import Button from '@/ui/component/Button';
import { AkunPetugasController } from '../../../controller/AkunPetugasController';
import { validateEmail } from '../../../utils/validators';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  function showToast(pesan) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(pesan, ToastAndroid.SHORT);
    } else {
      alert(pesan); // Fallback untuk Web jika komponen Toast tim belum diatur
    }
  }

  function showErrorInput(kolom, pesan) {
    if (kolom === "email") setErrorEmail(pesan);
    else setErrorPassword(pesan);
  }

  async function inputKredensial() {
    const pesanEmail = validateEmail(email);
    const pesanPassword = !password ? "Kata sandi wajib diisi" : "";

    setErrorEmail(pesanEmail || "");
    setErrorPassword(pesanPassword);

    if (pesanEmail || pesanPassword) return;

    const status = await AkunPetugasController.prosesLogin(email, password);

    if (status === 'BERHASIL') {
      showToast("Selamat datang kembali!");
      router.replace('/profil');
    } else if (status === 'KREDENSIAL_SALAH') {
      showErrorInput("password", "Email/Kata sandi salah");
    } else {
      showToast("Gagal terhubung ke server. Periksa koneksi internet Anda.");
    }
  }

  return (
    <View style={styles.halaman}>
      <Header judul="EcoTrack" logo tampilKembali style={styles.header} />

      <ScrollView
        style={styles.kartu}
        contentContainerStyle={styles.isiKartu}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
      >
        <View style={styles.blokJudul}>
          <Text style={styles.judul}>Masuk Akun</Text>
          <Text style={styles.subjudul}>Masuk untuk mengakses akun petugas</Text>
        </View>

        <InputField
          label="Email"
          placeholder="Masukkan Email"
          value={email}
          onChangeText={(teks) => {
            setEmail(teks);
            if (errorEmail) setErrorEmail("");
          }}
          keyboardType="email-address"
          error={errorEmail}
        />

        <InputField
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          value={password}
          onChangeText={(teks) => {
            setPassword(teks);
            if (errorPassword) setErrorPassword("");
          }}
          sandi
          error={errorPassword}
          onSubmitEditing={inputKredensial}
        />

        <Text style={styles.lupa}>Lupa kata sandi?</Text>

        <Button label="MASUK" onPress={inputKredensial} />

        <Text style={styles.teksBawah}>
          Belum punya akun?{" "}
          <Link href="/signup" style={styles.tautan}>Klik di sini</Link>
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