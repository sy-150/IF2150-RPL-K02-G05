import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MAIN SCREEN</Text>
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
