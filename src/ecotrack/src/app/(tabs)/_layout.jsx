import { Tabs } from 'expo-router';
import Navbar from '@/ui/component/NavBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <Navbar {...props} />}
      backBehavior="history"
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="informasi" />
      <Tabs.Screen name="pemindai/index" options={{ tabBarStyle: { display: 'none' } }} />
      <Tabs.Screen name="jadwal" />
    </Tabs>
  );
}