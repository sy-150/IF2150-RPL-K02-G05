// Tampilan kosong EcoTrack: ikon kaca pembesar besar, judul, dan keterangan.
// Dipakai saat pencarian tidak menemukan hasil: Daur Ulang (I04) dan Jadwal (I08).
//
// Props:
//   judul       teks besar, misalnya "Material tidak ditemukan" / "Lokasi TPS tidak ditemukan".
//   keterangan  (opsional) teks kecil di bawahnya.
//               Default: "Coba kata kunci lain atau periksa ejaan pencarianmu".
//   gambar      (opsional) gambar pengganti, misalnya require('@/assets/images/lain.png').
//               Default: assets/images/notFound.png (kaca pembesar dengan bayangan).
//   style       style tambahan untuk pembungkus.
//
// Contoh:
//   {hasil.length === 0 ? <EmptyState judul="Material tidak ditemukan" /> : <FlatList ... />}
//
// Kalau dipakai sebagai ListEmptyComponent di FlatList, beri
//   contentContainerStyle={{ flexGrow: 1 }}
// pada FlatList supaya EmptyState bisa berada di tengah layar.

import { Image, StyleSheet, Text, View } from 'react-native';
import { COLOR, TEXT } from '@/ui/theme';

const GAMBAR_TIDAK_DITEMUKAN = require('@/assets/images/notFound.png');

export default function EmptyState({
  judul,
  keterangan = 'Coba kata kunci lain atau periksa ejaan pencarianmu',
  gambar = GAMBAR_TIDAK_DITEMUKAN,
  style,
}) {
  return (
    <View style={[styles.pembungkus, style]} accessibilityRole="text">
      <Image source={gambar} style={styles.gambar} resizeMode="contain" accessibilityIgnoresInvertColors />
      {judul ? <Text style={styles.judul}>{judul}</Text> : null}
      {keterangan ? <Text style={styles.keterangan}>{keterangan}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pembungkus: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 50,
  },
  gambar: {
    width: 120,
    height: 120,
  },
  judul: {
    ...TEXT.titleMedium,
    color: COLOR.deepForestGreen,
    textAlign: 'center',
  },
  keterangan: {
    ...TEXT.descriptiveText,
    color: COLOR.black,
    textAlign: 'center',
  },
});
