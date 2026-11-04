import { Tabs } from 'expo-router';
import { COLOR } from '@/ui/theme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: COLOR.forestEmerald }}>
      <Tabs.Screen name="informasi/index" options={{ title: 'Daur Ulang' }} />
      <Tabs.Screen name="pemindai/index" options={{ title: 'Pindai' }} />
      <Tabs.Screen name="jadwal/index" options={{ title: 'Kalendar' }} />

      {/* Halaman detail: tetap bisa dibuka, tapi tidak muncul di tab bar */}
      <Tabs.Screen name="informasi/[idSampah]/index" options={{ href: null }} />
      <Tabs.Screen name="jadwal/[idJadwal]/index" options={{ href: null }} />
      <Tabs.Screen name="jadwal/[idJadwal]/edit/index" options={{ href: null }} />
    </Tabs>
  );
}
