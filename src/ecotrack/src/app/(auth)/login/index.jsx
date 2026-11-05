import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';
import InputField from '@/ui/component/InputField';
import Button from '@/ui/component/Button';

// TODO (F1): halaman ini masih DUMMY untuk mencoba InputField & Button.
// Nanti validasi dan login diganti dengan AkunPetugasController.prosesLogin(email, password),
// dan pesan error ditampilkan lewat showErrorInput(...).
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // Validasi sederhana sementara (I26): kolom kosong & format email.
  function inputKredensial() {
    const pesanEmail = !email
      ? "Email wajib diisi"
      : !/^\S+@\S+\.\S+$/.test(email)
        ? "Format email tidak valid"
        : "";
    const pesanPassword = !password ? "Kata sandi wajib diisi" : "";

    setErrorEmail(pesanEmail);
    setErrorPassword(pesanPassword);

    if (!pesanEmail && !pesanPassword) console.log("login (dummy):", email);
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
  header: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 49,
  },
  halaman: {
    flex: 1,
    backgroundColor: COLOR.forestEmerald,
  },
  kartu: {
    flex: 1,
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: COLOR.white,
  },
  isiKartu: {
    gap: 14,
    padding: 24,
  },
  blokJudul: {
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  judul: {
    ...TEXT.titleMedium,
    color: COLOR.black,
  },
  subjudul: {
    ...TEXT.descriptiveText,
    color: COLOR.black,
  },
  lupa: {
    ...TEXT.descriptiveText,
    color: COLOR.forestEmerald,
    alignSelf: "flex-end",
  },
  teksBawah: {
    ...TEXT.descriptiveText,
    color: COLOR.black,
    textAlign: "center",
  },
  tautan: {
    fontFamily: TEXT.bodyText.fontFamily,
    color: COLOR.forestEmerald,
  },
});
