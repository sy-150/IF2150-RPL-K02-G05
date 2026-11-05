import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';
import Header from "@/ui/component/Header";
import SearchBar from "@/ui/component/SearchBar";

export default function InformasiPage() {
  const [keyword, setKeyword] = useState("");

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
