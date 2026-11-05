import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';

export default function SignUpPage() {
  return (
    <View style={styles.halaman}>
      <Header judul="Daftar Akun Petugas" subjudul={"Buat akun untuk\nmulai mengelola sampah"} tampilKembali style={styles.header} />
      <View style={styles.container}>
        <Text style={styles.text}>SIGNUP PAGE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 48,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

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
