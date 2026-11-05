import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';
import Header from "@/ui/component/Header";

export default function InformasiPage() {
  return (
    <View style={styles.halaman}>
      <Header judul="Mulai Daur Ulang" tampilProfil />

      <View style={styles.isi}>
        <Text style={styles.text}>INFORMASI SAMPAH PAGE</Text>
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
