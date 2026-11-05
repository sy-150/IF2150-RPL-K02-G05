import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';

export default function DetailInformasiPage() {
  return (
    <View style={styles.halaman}>
      <Header judul="Sampah X" tampilKembali tampilProfil />
      <View style={styles.container}>
        <Text style={styles.text}>DETAIL INFORMASI SAMPAH PAGE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  halaman: {
    flex: 1,
    backgroundColor: COLOR.secondaryWhite,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    ...TEXT.titleCenter, color: COLOR.forestEmerald
  }
});
