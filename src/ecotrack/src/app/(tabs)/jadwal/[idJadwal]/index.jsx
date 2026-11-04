import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';

export default function DetailJadwalPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DETAIL JADWAL SAMPAH PAGE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    ...TEXT.titleCenter, color: COLOR.forestEmerald
  }
});
