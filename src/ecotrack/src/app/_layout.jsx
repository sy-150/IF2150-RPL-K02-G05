import { Stack } from "expo-router";
import { Keyboard, StyleSheet, View } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ToastHost } from '@/ui/component/Toast';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  if (!fontsLoaded) return null;

  return (
    // Menekan area kosong di mana pun menutup keyboard (TextInput tidak melakukannya sendiri).
    // Tombol dan input di dalamnya tetap menerima sentuhan lebih dulu, jadi tidak terganggu.
    //
    // PENTING: jangan ganti dengan Pressable. Di Android, view yang memegang sentuhan JS menahan
    // semua gerakan jari sehingga ScrollView di dalamnya tidak bisa di-scroll. Karena itu sentuhan
    // hanya diambil saat keyboard sedang terbuka.
    <View
      style={styles.layar}
      onStartShouldSetResponder={() => Keyboard.isVisible()}
      onResponderRelease={() => Keyboard.dismiss()}
    >
      <Stack screenOptions={{ headerShown: false }} />
      <ToastHost />
    </View>
  );
}

const styles = StyleSheet.create({
  layar: { flex: 1 },
});
