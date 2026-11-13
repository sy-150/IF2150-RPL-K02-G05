// Kartu satu lokasi TPS di daftar Jadwal (I07): ikon lokasi, kelurahan, kecamatan, dan panah.
//
// Props:
//   jadwal   objek Jadwal.
//   onPress  dipanggil saat kartu ditekan.

import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR, TEXT } from '@/ui/theme';

export default function KartuLokasi({ jadwal, onPress }) {
  return (
    <Pressable style={styles.kartu} onPress={onPress} accessibilityRole="button">
      <View style={styles.kotakIkon}>
        <Ionicons name="location-outline" size={28} color={COLOR.white} />
      </View>
      <View style={styles.teksKartu}>
        <Text style={styles.kelurahan}>Kelurahan {jadwal.getKelurahan()}</Text>
        <Text style={styles.kecamatan}>Kecamatan {jadwal.getKecamatan()}</Text>
      </View>
      <View style={styles.panah}>
        <MaterialIcons name="chevron-right" size={20} color={COLOR.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kartu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLOR.white,
  },
  kotakIkon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.forestEmerald,
  },
  teksKartu: {
    flex: 1,
    gap: 4,
  },
  kelurahan: {
    ...TEXT.bodyText,
    color: COLOR.black,
  },
  kecamatan: {
    ...TEXT.smallText,
    color: COLOR.deepForestGreen,
  },
  panah: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.forestEmerald,
  },
});
