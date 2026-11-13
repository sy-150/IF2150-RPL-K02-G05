// Tombol EcoTrack.
//
// Props:
//   label     teks tombol, misalnya "MASUK", "SIMPAN", "BATAL".
//   onPress   fungsi saat ditekan. Boleh async: selama Promise-nya belum selesai,
//             tombol otomatis menampilkan loading dan tidak bisa ditekan lagi.
//   varian    'utama'         hijau penuh   (MASUK, DAFTAR, SIMPAN, EDIT PROFIL)  ← default
//             'outline'       outline hijau (BATAL)
//             'bahaya'        merah penuh   (Keluar di I19)
//             'bahayaOutline' outline merah (KELUAR AKUN di I15, Batal di I19)
//   ikon      (opsional) nama ikon MaterialIcons di kiri teks, misalnya "edit" untuk pensil.
//   nonaktif  true = tombol abu-abu pudar dan tidak bisa ditekan.
//   loading   true = tampil putaran loading dan tidak bisa ditekan
//             (dipakai kalau halaman mengatur loading sendiri).
//   style     style tambahan, misalnya { flex: 1 } untuk dua tombol berdampingan.
//
// Contoh:
//   <Button label="MASUK" onPress={inputKredensial} />
//   <Button label="EDIT PROFIL" ikon="edit" onPress={() => setModeEdit(true)} />
//   <Button label="BATAL" varian="outline" onPress={batal} />
//   <Button label="KELUAR AKUN" varian="bahayaOutline" onPress={() => setDialogKeluar(true)} />
//   <View style={{ flexDirection: 'row', gap: 12 }}>
//     <Button label="Keluar" varian="bahaya" onPress={logout} style={{ flex: 1 }} />
//     <Button label="Batal" varian="bahayaOutline" onPress={tutupDialog} style={{ flex: 1 }} />
//   </View>

import { useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { COLOR, TEXT } from '@/ui/theme';

// Warna tiap varian: latar, garis tepi, dan warna teks/ikon.
const VARIAN = {
  utama: { latar: COLOR.forestEmerald, tepi: COLOR.forestEmerald, teks: COLOR.white },
  outline: { latar: COLOR.white, tepi: COLOR.forestEmerald, teks: COLOR.forestEmerald },
  bahaya: { latar: COLOR.redBright, tepi: COLOR.redBright, teks: COLOR.white },
  bahayaOutline: { latar: COLOR.white, tepi: COLOR.redBright, teks: COLOR.redBright },
};

export default function Button({
  label,
  onPress,
  varian = 'utama',
  ikon,
  nonaktif = false,
  loading = false,
  style,
}) {
  const warna = VARIAN[varian] ?? VARIAN.utama;

  // `sibuk` untuk tampilan loading; `kunci` (ref) mencegah ketukan ganda yang sangat cepat,
  // karena perubahan state baru terlihat di render berikutnya.
  const [sibuk, setSibuk] = useState(false);
  const kunci = useRef(false);

  const sedangLoading = loading || sibuk;
  const tidakBisaDitekan = nonaktif || sedangLoading;

  async function tekan() {
    if (tidakBisaDitekan || kunci.current || !onPress) return;
    kunci.current = true;
    try {
      const hasil = onPress();
      // Kalau onPress async, tunggu sampai selesai sambil menampilkan loading.
      if (hasil && typeof hasil.then === 'function') {
        setSibuk(true);
        await hasil;
      }
    } finally {
      kunci.current = false;
      setSibuk(false);
    }
  }

  return (
    <Pressable
      onPress={tekan}
      disabled={tidakBisaDitekan}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: tidakBisaDitekan, busy: sedangLoading }}
      style={({ pressed }) => [
        styles.tombol,
        { backgroundColor: warna.latar, borderColor: warna.tepi },
        pressed && styles.ditekan,
        nonaktif && styles.nonaktif,
        style,
      ]}
    >
      {sedangLoading ? (
        <ActivityIndicator size="small" color={warna.teks} />
      ) : (
        <>
          {ikon ? <MaterialIcons name={ikon} size={18} color={warna.teks} /> : null}
          <Text style={[styles.label, { color: warna.teks }]} numberOfLines={1}>
            {label}
          </Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tombol: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2,
  },
  label: {
    ...TEXT.bodyText,
  },
  ditekan: {
    opacity: 0.8,
  },
  nonaktif: {
    opacity: 0.4,
  },
});
