import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';

export default function EditJadwalPage() {
  return (
    <View style={styles.halaman}>
      <Header judul={"Edit Jadwal\nPengambilan Sampah"} />
      <View style={styles.container}>
        <Text style={styles.text}>EDIT JADWAL PENGAMBILAN SAMPAH PAGE</Text>
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
