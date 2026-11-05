// Header hijau EcoTrack, dipakai di semua halaman.
//
// Props:
//   judul         teks judul ("Mulai Daur Ulang"). Di varian logo, default "EcoTrack".
//   subjudul      teks kecil di bawah judul (opsional, contoh di Sign Up).
//   logo          true = varian logo besar (Log In, I01/I26).
//   tampilKembali true = tombol "← Kembali" di kiri atas.
//   onKembali     fungsi pengganti aksi Kembali (default: router.back()).
//   tampilProfil  true = ikon profil di kanan atas, membuka /profil.
//   children      isi tambahan di bawah judul, misalnya <SearchBar />.
//   style         style tambahan, misalnya { paddingBottom: 48 } kalau kartu putih
//                 halaman akan menumpuk di bawah header.
//
// Contoh:
//   <Header logo tampilKembali />                                         // Log In
//   <Header judul="Daftar Akun Petugas" subjudul="Buat akun untuk mulai mengelola sampah" tampilKembali />
//   <Header judul="Mulai Daur Ulang" tampilProfil><SearchBar ... /></Header>
//   <Header judul="Jadwal Pengambilan Sampah" tampilKembali tampilProfil />

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLOR, TEXT } from '@/ui/theme';

// Isi setelah gambar diexport dari Figma ke assets/images/, misalnya:
//   const GAMBAR_LOGO = require('@/assets/images/logo.png');
const GAMBAR_LOGO = require('@/assets/images/logo.png');
const DAUN_KIRI = require('@/assets/images/leafKiri.png'); // 92x127
const DAUN_KANAN = require('@/assets/images/leafKanan.png'); // 111x127
const TINGGI_DAUN = 100; // ubah angka ini kalau daun ingin lebih besar/kecil

export default function Header({
  judul,
  subjudul,
  logo = false,
  tampilKembali = false,
  onKembali,
  tampilProfil = false,
  children,
  style,
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  function kembali() {
    if (onKembali) return onKembali();
    if (router.canGoBack()) router.back();
    else router.replace('/informasi');
  }

  return (
    <LinearGradient
      colors={[COLOR.forestEmerald, COLOR.deepForestGreen]} // atas → bawah
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.header, { paddingTop: insets.top + 8 }, style]}
    >
      {/* Daun dipasang terpisah di pojok kiri-bawah dan kanan-bawah,
          jadi selalu seimbang berapa pun lebar layar dan tinggi header. */}
      <Image source={DAUN_KIRI} style={[styles.daun, styles.daunKiri]} resizeMode="contain" />
      <Image source={DAUN_KANAN} style={[styles.daun, styles.daunKanan]} resizeMode="contain" />

      <View style={styles.barisAtas}>
        {tampilKembali ? (
          <Pressable
            onPress={kembali}
            hitSlop={12}
            style={styles.kembali}
            accessibilityRole="button"
            accessibilityLabel="Kembali"
          >
            <MaterialIcons name="arrow-back" size={16} color={COLOR.white} />
            <Text style={styles.teksKembali}>Kembali</Text>
          </Pressable>
        ) : (
          <View />
        )}

        {tampilProfil ? (
          <Pressable
            onPress={() => router.push('/profil')}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Profil"
          >
            <MaterialIcons name="account-circle" size={28} color={COLOR.white} />
          </Pressable>
        ) : null}
      </View>

      {logo ? (
        <View style={styles.blokLogo}>
          <View style={styles.lingkaranLogo}>
            {GAMBAR_LOGO ? (
              <Image source={GAMBAR_LOGO} style={styles.gambarLogo} resizeMode="contain" />
            ) : (
              <MaterialCommunityIcons name="recycle" size={72} color={COLOR.forestEmerald} />
            )}
          </View>
          <Text style={styles.judulLogo}>{judul ?? 'EcoTrack'}</Text>
        </View>
      ) : (
        <View style={styles.blokJudul}>
          {judul ? (
            <Text style={styles.judul} numberOfLines={2}>
              {judul}
            </Text>
          ) : null}
          {subjudul ? <Text style={styles.subjudul}>{subjudul}</Text> : null}
        </View>
      )}

      {children ? <View style={styles.isi}>{children}</View> : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
    overflow: 'hidden',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  },
  // Tinggi kedua daun sama; lebar mengikuti rasio masing-masing gambar.
  daun: {
    position: 'absolute',
    bottom: 0,
    height: TINGGI_DAUN,
  },
  daunKiri: {
    left: 0,
    width: TINGGI_DAUN * (92 / 127),
  },
  daunKanan: {
    right: 0,
    width: TINGGI_DAUN * (111 / 127),
  },
  barisAtas: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kembali: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  teksKembali: {
    ...TEXT.descriptiveText,
    color: COLOR.white,
  },
  blokJudul: {
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  judul: {
    ...TEXT.titleMedium,
    color: COLOR.white,
    textAlign: 'center',
  },
  subjudul: {
    ...TEXT.descriptiveText,
    color: COLOR.white,
    textAlign: 'center',
  },
  blokLogo: {
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  lingkaranLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
  },
  gambarLogo: {
    width: 88,
    height: 88,
  },
  judulLogo: {
    ...TEXT.titleBold,
    color: COLOR.white,
  },
  isi: {
    marginTop: 16,
  },
});