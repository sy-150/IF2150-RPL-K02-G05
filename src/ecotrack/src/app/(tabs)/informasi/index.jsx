import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { TEXT, COLOR } from '@/ui/theme';
import Header from "@/ui/component/Header";
import SearchBar from "@/ui/component/SearchBar";
import Button from "@/ui/component/Button";

export default function InformasiPage() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  return (
    <View style={styles.halaman}>
      <Header judul="Mulai Daur Ulang" tampilProfil>
        <SearchBar
          placeholder="Cari Material Sampah"
          value={keyword}
          onChangeText={setKeyword}
          // TODO (F2): panggil InformasiSampahController untuk mencari kategori
          onSubmit={(teks) => console.log("cari:", teks)}
        />
      </Header>

      {/* TODO (F2): ganti View ini dengan FlatList katalog kategori sampah, dan beri prop:
            keyboardShouldPersistTaps="handled"  -> satu ketukan langsung membuka kartu
                                                    walaupun keyboard search bar masih terbuka
            keyboardDismissMode="on-drag"        -> keyboard tertutup saat daftar di-scroll */}
      <View style={styles.isi}>
        <Text style={styles.text}>INFORMASI SAMPAH PAGE</Text>
        {keyword ? <Text>Keyword: {keyword}</Text> : null}

        {/* Tombol sementara untuk mencoba navigasi ke tiap halaman.
            Alamat = path file di app/ tanpa folder berkurung (tabs)/(auth) dan tanpa index.jsx.
            Halaman [idSampah]/[idJadwal] butuh id; "contoh" di bawah hanya id percobaan. */}
        <Button label="Detail informasi" onPress={() => router.push("/informasi/contoh")} />
        <View style={styles.baris}>
          <Button label="Profil" varian="outline" onPress={() => router.push("/profil")} style={styles.lebar} />
          <Button label="Log In" onPress={() => router.push("/login")} style={styles.lebar} />
        </View>
        <View style={styles.baris}>
          <Button label="Sign Up" onPress={() => router.push("/signup")} style={styles.lebar} />
          <Button label="Detail Jadwal" varian="outline" onPress={() => router.push("/jadwal/contoh")} style={styles.lebar} />
        </View>
        <Button label="Edit jadwal" ikon="edit" onPress={() => router.push("/jadwal/contoh/edit")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  halaman: {
    flex: 1,
    backgroundColor: COLOR.secondaryWhite,
  },
  isi: {
    gap: 12,
    padding: 16,
  },
  baris: {
    flexDirection: "row",
    gap: 12,
  },
  lebar: {
    flex: 1,
  },
  text: {
    ...TEXT.titleCenter, color: COLOR.forestEmerald
  }
});
