// Kartu "LOKASI TPS" di detail (I09, I10) dan edit jadwal (I11).
//
// Props:
//   jadwal  objek Jadwal (boleh null selama data dimuat).

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR, TEXT } from '@/ui/theme';

export default function KartuInfoLokasi({ jadwal }) {
  return (
    <View style={styles.kartu}>
      <View style={styles.kotakIkon}>
        <Ionicons name="location-outline" size={28} color={COLOR.white} />
      </View>
      <View style={styles.teks}>
        <Text style={styles.label}>LOKASI TPS</Text>
        <Text style={styles.kelurahan}>Kelurahan {jadwal?.getKelurahan()}</Text>
        <Text style={styles.label}>Kecamatan {jadwal?.getKecamatan()}, Kota Bandung</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kartu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  teks: {
    flex: 1,
    gap: 2,
  },
  label: {
    ...TEXT.smallText,
    color: COLOR.deepForestGreen,
  },
  kelurahan: {
    ...TEXT.bodyText,
    color: COLOR.black,
  },
});
