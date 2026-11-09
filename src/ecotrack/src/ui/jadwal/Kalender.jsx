// Kalender bulanan Jadwal: tombol ‹ › untuk pindah bulan pada tahun berjalan,
// tanggal pengambilan = lingkaran hijau (pudar kalau di luar bulan).
//   Mode lihat (I09): hari ini = titik merah, tanggal tidak bisa ditekan.
//   Mode edit (I11): tanggal pada bulan yang tampil bisa ditekan untuk memilih/membatalkan.
//
// Props:
//   daftarTanggal  list objek Date tanggal pengambilan, dari JadwalController.getJadwal().
//   onUbahTanggal  (opsional) kalau diisi, kalender masuk mode edit. Dipanggil dengan list Date
//                  yang baru setiap ada tanggal ditekan; halaman yang menyimpan state-nya.
//
// Contoh mode edit:
//   const [tanggal, setTanggal] = useState(jadwal.daftarTanggal);
//   <Kalender daftarTanggal={tanggal} onUbahTanggal={setTanggal} />

import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR, TEXT } from '@/ui/theme';
import JadwalController from '@/controller/JadwalController';

const NAMA_KOLOM = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];

export default function Kalender({ daftarTanggal, onUbahTanggal }) {
  const modeEdit = onUbahTanggal !== undefined;
  const [bulanTampil, setBulanTampil] = useState(() => JadwalController.getBulanIni());
  const sel = JadwalController.susunKalender(bulanTampil, daftarTanggal);
  const daftarMinggu = Array.from({ length: sel.length / 7 }, (_, i) => sel.slice(i * 7, (i + 1) * 7));
  const bisaMundur = JadwalController.bisaGeserBulan(bulanTampil, -1);
  const bisaMaju = JadwalController.bisaGeserBulan(bulanTampil, 1);

  return (
    <View style={styles.kalender}>
      <View style={styles.kepalaKalender}>
        <Text style={styles.judulBulan}>{JadwalController.getJudulBulan(bulanTampil)}</Text>
        <View style={styles.tombolBulan}>
          <Pressable
            onPress={() => setBulanTampil(JadwalController.geserBulan(bulanTampil, -1))}
            disabled={!bisaMundur}
            style={!bisaMundur && styles.tombolNonaktif}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Bulan sebelumnya"
            accessibilityState={{ disabled: !bisaMundur }}
          >
            <MaterialIcons name="chevron-left" size={28} color={COLOR.white} />
          </Pressable>
          <Pressable
            onPress={() => setBulanTampil(JadwalController.geserBulan(bulanTampil, 1))}
            disabled={!bisaMaju}
            style={!bisaMaju && styles.tombolNonaktif}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Bulan berikutnya"
            accessibilityState={{ disabled: !bisaMaju }}
          >
            <MaterialIcons name="chevron-right" size={28} color={COLOR.white} />
          </Pressable>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.baris}>
          {NAMA_KOLOM.map((nama, i) => (
            <View key={i} style={styles.sel}>
              <Text style={styles.namaKolom}>{nama}</Text>
            </View>
          ))}
        </View>
        {daftarMinggu.map((minggu) => (
          <View key={minggu[0].kunci} style={styles.baris}>
            {minggu.map((hari) => {
              const bisaDitekan = modeEdit && hari.bulanIni;
              return (
                <Pressable
                  key={hari.kunci}
                  style={styles.sel}
                  disabled={!bisaDitekan}
                  onPress={() => onUbahTanggal(JadwalController.toggleTanggal(daftarTanggal, hari.kunci))}
                  accessibilityRole={bisaDitekan ? 'button' : undefined}
                  accessibilityState={bisaDitekan ? { selected: hari.pengambilan } : undefined}
                >
                  <View
                    style={[
                      styles.lingkaran,
                      bisaDitekan && styles.lingkaranTersedia,
                      hari.pengambilan && styles.lingkaranHijau,
                      hari.pengambilan && !hari.bulanIni && styles.pudar,
                    ]}
                  >
                    <Text
                      style={[
                        styles.angka,
                        !hari.bulanIni && styles.angkaLuarBulan,
                        hari.pengambilan && styles.angkaPengambilan,
                      ]}
                    >
                      {hari.tanggal}
                    </Text>
                  </View>
                  {hari.hariIni && !modeEdit ? <View style={styles.titikHariIni} /> : null}
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <View style={styles.keterangan}>
        <View style={styles.barisKeterangan}>
          <View style={[styles.bulatan, modeEdit ? styles.bulatanTersedia : styles.bulatanMerah]} />
          <Text style={styles.teksKeterangan}>
            {modeEdit ? 'Jadwal tersedia' : `Hari ini: ${JadwalController.getTeksHariIni()} (WIB)`}
          </Text>
        </View>
        <View style={styles.barisKeterangan}>
          <View style={[styles.bulatan, styles.bulatanHijau]} />
          <Text style={styles.teksKeterangan}>{modeEdit ? 'Jadwal terpilih' : 'Hari pengambilan sampah'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kalender: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLOR.white,
  },
  kepalaKalender: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 21.5,
    backgroundColor: COLOR.forestEmerald,
  },
  judulBulan: {
    ...TEXT.titleCenter,
    textAlign: 'left',
    color: COLOR.white,
  },
  tombolBulan: {
    flexDirection: 'row',
    gap: 8,
  },
  tombolNonaktif: {
    opacity: 0.3,
  },
  grid: {
    padding: 12,
  },
  // Satu baris per minggu dengan kolom flex: 1. Jangan pakai width persen + flexWrap: di sebagian
  // HP Android pembulatan piksel membuat 7 kolom tidak muat, sehingga tanggal turun ke baris bawah.
  baris: {
    flexDirection: 'row',
  },
  sel: {
    flex: 1,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  namaKolom: {
    ...TEXT.smallText,
    color: COLOR.deepForestGreen,
  },
  lingkaran: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lingkaranTersedia: {
    borderWidth: 1,
    borderColor: COLOR.secondaryWhite,
  },
  lingkaranHijau: {
    borderWidth: 0,
    backgroundColor: COLOR.forestEmerald,
  },
  pudar: {
    opacity: 0.6,
  },
  angka: {
    ...TEXT.bodyText,
    fontSize: 14,
    color: COLOR.black,
  },
  angkaLuarBulan: {
    color: COLOR.secondaryWhite,
  },
  angkaPengambilan: {
    color: COLOR.white,
  },
  titikHariIni: {
    position: 'absolute',
    top: 4,
    right: '50%',
    marginRight: -18,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLOR.redBright,
  },
  keterangan: {
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderTopWidth: 1,
    borderTopColor: COLOR.secondaryWhite,
  },
  barisKeterangan: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bulatan: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  bulatanMerah: {
    backgroundColor: COLOR.redBright,
  },
  bulatanTersedia: {
    borderWidth: 1,
    borderColor: COLOR.secondaryWhite,
  },
  bulatanHijau: {
    backgroundColor: COLOR.forestEmerald,
  },
  teksKeterangan: {
    ...TEXT.smallText,
    color: COLOR.deepForestGreen,
  },
});
