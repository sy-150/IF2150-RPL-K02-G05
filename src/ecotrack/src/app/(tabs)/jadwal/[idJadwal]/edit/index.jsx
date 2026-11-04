import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';

export default function EditJadwalPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EDIT JADWAL SAMPAH PAGE</Text>
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
