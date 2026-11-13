// Notifikasi Toast EcoTrack: kotak gelap di bawah layar dengan ikon ✓ hijau (berhasil)
// atau × merah (gagal), pesan, tombol tutup ×, dan garis progres. Hilang sendiri setelah 5 detik.
//
// Pemasangan (SEKALI saja, sudah dilakukan di app/_layout.jsx):
//   <ToastHost />
//
// Pemakaian dari halaman mana pun:
//   import { toast } from '@/ui/component/Toast';
//   toast.berhasil('Jadwal berhasil diperbarui');   // I13
//   toast.gagal('Jadwal gagal diperbarui');         // I14
//
// Catatan:
// - Hanya satu toast tampil sekaligus; memanggil lagi akan mengganti toast lama dan
//   mengulang hitungan 5 detik.
// - Di halaman yang punya navbar (tab Daur Ulang & Kalendar), toast otomatis muncul
//   di atas navbar. Di halaman lain (Profil, Login) toast muncul di dekat bawah layar.

import { useCallback, useEffect, useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLOR, TEXT } from '@/ui/theme';
import { NAVBAR_TINGGI, TONJOLAN } from '@/ui/component/NavBar';

const DURASI = 5000;
const DURASI_ANIMASI = 200;

const HALAMAN_DENGAN_NAVBAR = ['/informasi', '/jadwal'];

let tampilkanToast = null;

export const toast = {
  berhasil: (pesan) => tampilkanToast?.(pesan, 'berhasil'),
  gagal: (pesan) => tampilkanToast?.(pesan, 'gagal'),
};

export function ToastHost() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const [data, setData] = useState(null);
  const muncul = useRef(new Animated.Value(0)).current;
  const progres = useRef(new Animated.Value(1)).current;
  const timer = useRef(null);

  const tutup = useCallback(() => {
    clearTimeout(timer.current);
    progres.stopAnimation();
    Animated.timing(muncul, {
      toValue: 0,
      duration: DURASI_ANIMASI,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setData(null);
    });
  }, [muncul, progres]);

  const tampil = useCallback((pesan, jenis) => {
    setData({ id: Date.now(), pesan, jenis });
  }, []);

  useEffect(() => {
    tampilkanToast = tampil;
    return () => {
      tampilkanToast = null;
    };
  }, [tampil]);

  const idToast = data?.id;
  useEffect(() => {
    if (!idToast) return undefined;

    progres.setValue(1);
    Animated.timing(muncul, {
      toValue: 1,
      duration: DURASI_ANIMASI,
      useNativeDriver: true,
    }).start();
    Animated.timing(progres, {
      toValue: 0,
      duration: DURASI,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    clearTimeout(timer.current);
    timer.current = setTimeout(tutup, DURASI);
    return () => clearTimeout(timer.current);
  }, [idToast, muncul, progres, tutup]);

  if (!data) return null;

  const berhasil = data.jenis === 'berhasil';
  const warna = berhasil ? COLOR.emeraldGreen : COLOR.redBright;
  const adaNavbar = HALAMAN_DENGAN_NAVBAR.some((awal) => pathname.startsWith(awal));
  const jarakBawah = insets.bottom + (adaNavbar ? NAVBAR_TINGGI + TONJOLAN + 4 : 16);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.posisi,
        {
          bottom: jarakBawah,
          opacity: muncul,
          transform: [{ translateY: muncul.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
        },
      ]}
    >
      <View style={styles.kotak} accessibilityRole="alert" accessibilityLiveRegion="polite">
        <View style={styles.baris}>
          <View style={[styles.lingkaran, { backgroundColor: warna }]}>
            <MaterialIcons name={berhasil ? 'check' : 'close'} size={24} color={COLOR.white} />
          </View>

          <Text style={styles.pesan}>{data.pesan}</Text>

          <Pressable
            onPress={tutup}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Tutup notifikasi"
          >
            <MaterialIcons name="close" size={18} color={COLOR.white} />
          </Pressable>
        </View>

        <Animated.View
          style={[
            styles.progres,
            {
              backgroundColor: warna,
              width: progres.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  posisi: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
  kotak: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: COLOR.deepForestGreen,
    elevation: 6,
    shadowColor: COLOR.black,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  baris: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  lingkaran: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pesan: {
    flex: 1,
    ...TEXT.bodyText,
    color: COLOR.white,
  },
  progres: {
    height: 4,
  },
});
