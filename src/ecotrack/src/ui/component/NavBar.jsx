import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR, TEXT } from '@/ui/theme';

export const NAVBAR_TINGGI = 72;
const UKURAN_PINDAI = NAVBAR_TINGGI;
const TONJOLAN = 24;

const MENU = {
  informasi: { label: 'Daur Ulang', ikon: 'recycle' },
  'pemindai/index': { label: 'Pindai', ikon: 'camera-outline', tengah: true },
  jadwal: { label: 'Kalendar', ikon: 'calendar-blank-outline' },
};

export default function Navbar({ state, descriptors, emitter, navigateToTab, insets }) {
  const routeAktif = state.routes[state.index];
  if (descriptors[routeAktif.key]?.options?.tabBarStyle?.display === 'none') return null;

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]} pointerEvents="box-none">
      <LinearGradient
        colors={[COLOR.emeraldGreen, COLOR.deepForestGreen]} // atas → bawah
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.latar, { height: NAVBAR_TINGGI + insets.bottom }]}
      />

      <View style={styles.baris} pointerEvents="box-none">
        {state.routes.map((route, index) => {
          const menu = MENU[route.name];
          if (!menu) return null;
          const aktif = state.index === index;

          function tekan() {
            const event = emitter.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!aktif && !event.defaultPrevented) navigateToTab(route.key);
          }

          if (menu.tengah) {
            return (
              <View key={route.key} style={styles.itemTengah} pointerEvents="box-none">
                <Pressable
                  onPress={tekan}
                  style={styles.tombolPindai}
                  accessibilityRole="button"
                  accessibilityLabel={menu.label}
                >
                  <MaterialCommunityIcons name={menu.ikon} size={32} color={COLOR.white} />
                  <Text style={styles.labelPutih}>{menu.label}</Text>
                </Pressable>
              </View>
            );
          }

          const warna = aktif ? COLOR.deepForestGreen : COLOR.white;
          return (
            <Pressable
              key={route.key}
              onPress={tekan}
              style={styles.item}
              accessibilityRole="button"
              accessibilityState={{ selected: aktif }}
              accessibilityLabel={menu.label}
            >
              <View style={[styles.kotak, aktif && styles.kotakAktif]}>
                <MaterialCommunityIcons name={menu.ikon} size={32} color={warna} />
                <Text style={[styles.label, { color: warna }]}>{menu.label}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  latar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  baris: {
    height: NAVBAR_TINGGI + TONJOLAN,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: TONJOLAN,
  },
  kotak: {
    minWidth: 64,
    height: NAVBAR_TINGGI - 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  kotakAktif: {
    backgroundColor: COLOR.emeraldGreen,
  },
  label: {
    ...TEXT.smallText,
  },
  itemTengah: {
    flex: 1,
    alignItems: 'center',
  },
  tombolPindai: {
    width: UKURAN_PINDAI,
    height: UKURAN_PINDAI,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    backgroundColor: COLOR.deepForestGreen,
    elevation: 8,
    shadowColor: COLOR.black,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  labelPutih: {
    ...TEXT.smallText,
    color: COLOR.white,
  },
});