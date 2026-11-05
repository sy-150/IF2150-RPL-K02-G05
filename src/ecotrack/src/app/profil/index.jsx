import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';
import Header from "@/ui/component/Header";

export default function ProfilPage() {
  return (
    <View style={styles.halaman}>
      <Header judul="Profil Petugas" tampilProfil tampilKembali style={styles.header}/>
        <View style={styles.container}>
          <Text style={styles.text}>PROFIL PETUGAS PAGE</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 67,
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
