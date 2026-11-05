import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';

export default function LoginPage() {
  return (
    <View style={styles.halaman}>
      <Header judul="EcoTrack" logo tampilKembali style={styles.header} />
      <View style={styles.container}>
        <Text style={styles.text}>LOGIN PAGE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 49,
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
