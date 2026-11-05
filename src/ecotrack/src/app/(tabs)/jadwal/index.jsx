import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';
import Header from "@/ui/component/Header";
import SearchBar from "@/ui/component/SearchBar";

export default function JadwalPage() {
  const [keyword, setKeyword] = useState("");

  return (
    <View style={styles.halaman}>
      <Header judul="Jadwal Pengambilan Sampah" tampilProfil>
        <SearchBar
          placeholder="Cari Kecamatan/Kelurahan"
          value={keyword}
          onChangeText={setKeyword}
          onSubmit={(teks) => console.log("cari:", teks)}
        />
      </Header>

      {/* TODO (F3): ganti View ini dengan FlatList daftar lokasi TPS, dan beri prop:
            keyboardShouldPersistTaps="handled"  -> satu ketukan langsung membuka lokasi
                                                    walaupun keyboard search bar masih terbuka
            keyboardDismissMode="on-drag"        -> keyboard tertutup saat daftar di-scroll */}
      <View style={styles.isi}>
        <Text style={styles.text}>JADWAL PENGAMBILAN SAMPAH PAGE</Text>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    ...TEXT.titleCenter, color: COLOR.forestEmerald
  }
});
