import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';

export default function DetailInformasiPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DETAIL INFORMASI SAMPAH PAGE</Text>
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
