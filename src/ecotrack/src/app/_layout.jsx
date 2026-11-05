import { Stack } from "expo-router";
import { Keyboard, Pressable, StyleSheet } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ToastHost } from '@/ui/component/Toast';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  if (!fontsLoaded) return null;

  return (
    // Menekan area kosong di mana pun menutup keyboard (TextInput tidak melakukannya sendiri).
    // Tombol dan input di dalamnya tetap menerima sentuhan lebih dulu, jadi tidak terganggu.
    // accessible={false} supaya pembaca layar tidak menganggap seluruh aplikasi satu tombol.
    <Pressable style={styles.layar} onPress={Keyboard.dismiss} accessible={false}>
      <Stack screenOptions={{ headerShown: false }} />
      <ToastHost />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  layar: { flex: 1 },
});
