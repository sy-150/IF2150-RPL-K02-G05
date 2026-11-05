// Dialog konfirmasi/informasi EcoTrack: kartu putih di tengah layar dengan overlay gelap.
// Dipakai untuk Simpan Jadwal (I12), Keluar Akun (I19), dan Informasi Sampah Belum Tersedia (I25).
// (Dialog Ubah Kata Sandi I20 dibuat sebagai komponen terpisah karena isinya berbeda.)
//
// Props:
//   terlihat     true = dialog tampil.
//   onTutup      dipanggil saat pengguna membatalkan: menekan DI LUAR kartu, tombol ×,
//                atau tombol Back Android. Kalau tidak diisi, dipakai onPress tombolKedua (Batal).
//   ikon         nama ikon MaterialIcons di dalam lingkaran, misalnya "save", "logout".
//   varian       'utama' (hijau, default) | 'bahaya' (merah). Mengatur warna lingkaran ikon
//                dan tombol.
//   judul        teks judul, misalnya "Simpan Jadwal".
//   pesan        (opsional) teks penjelasan di bawah judul.
//   tombolUtama  { label, onPress } tombol penuh, misalnya { label: 'Simpan', onPress: simpan }.
//   tombolKedua  (opsional) { label, onPress } tombol outline di bawahnya, misalnya Batal.
//   tampilTutup  true = tombol × di kanan atas (I25).
//
// Tombol memakai komponen Button, jadi kalau onPress async, tombol otomatis loading dan
// tidak bisa ditekan dua kali. Dialog TIDAK menutup sendiri setelah tombol utama ditekan;
// halaman yang memutuskan (misalnya tutup hanya kalau simpan berhasil).
//
// Contoh:
//   // I12
//   <Dialog terlihat={dialogSimpan} onTutup={() => setDialogSimpan(false)}
//     ikon="save" judul="Simpan Jadwal" pesan="Pastikan tanggal yang dipilih sudah benar!"
//     tombolUtama={{ label: 'Simpan', onPress: simpanJadwal }}
//     tombolKedua={{ label: 'Batal', onPress: () => setDialogSimpan(false) }} />
//
//   // I19
//   <Dialog terlihat={dialogKeluar} onTutup={() => setDialogKeluar(false)} varian="bahaya"
//     ikon="logout" judul="Keluar Akun" pesan="Apakah Anda yakin hendak keluar akun ini?"
//     tombolUtama={{ label: 'Keluar', onPress: logout }}
//     tombolKedua={{ label: 'Batal', onPress: () => setDialogKeluar(false) }} />
//
//   // I25
//   <Dialog terlihat={dialogInfo} onTutup={() => setDialogInfo(false)} tampilTutup
//     ikon="speaker-notes-off" judul="Informasi Sampah Belum Tersedia"
//     pesan="Informasi detail tentang daur ulang belum tersedia di database kami."
//     tombolUtama={{ label: 'Mengerti', onPress: () => setDialogInfo(false) }} />

import { MaterialIcons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR, TEXT } from '@/ui/theme';
import Button from '@/ui/component/Button';

const WARNA = {
  utama: { ikon: COLOR.forestEmerald, tombolUtama: 'utama', tombolKedua: 'outline' },
  bahaya: { ikon: COLOR.redBright, tombolUtama: 'bahaya', tombolKedua: 'bahayaOutline' },
};

export default function Dialog({
  terlihat,
  onTutup,
  ikon,
  varian = 'utama',
  judul,
  pesan,
  tombolUtama,
  tombolKedua,
  tampilTutup = false,
}) {
  const warna = WARNA[varian] ?? WARNA.utama;

  const batal = onTutup ?? tombolKedua?.onPress;

  return (
    <Modal
      visible={terlihat}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={batal}
    >
      <Pressable style={styles.overlay} onPress={batal} accessible={false}>
        <Pressable style={styles.kartu} onPress={() => {}} accessible={false}>
          {tampilTutup ? (
            <Pressable
              onPress={batal}
              hitSlop={12}
              style={styles.tombolX}
              accessibilityRole="button"
              accessibilityLabel="Tutup"
            >
              <MaterialIcons name="close" size={24} color={COLOR.black} />
            </Pressable>
          ) : null}

          {ikon ? (
            <View style={[styles.lingkaran, { backgroundColor: warna.ikon }]}>
              <MaterialIcons name={ikon} size={24} color={COLOR.white} />
            </View>
          ) : null}

          {judul ? (
            <Text style={styles.judul} accessibilityRole="header">
              {judul}
            </Text>
          ) : null}
          {pesan ? <Text style={styles.pesan}>{pesan}</Text> : null}

          {tombolUtama || tombolKedua ? (
            <View style={styles.areaTombol}>
              {tombolUtama ? (
                <Button
                  label={tombolUtama.label}
                  onPress={tombolUtama.onPress}
                  varian={warna.tombolUtama}
                />
              ) : null}
              {tombolKedua ? (
                <Button
                  label={tombolKedua.label}
                  onPress={tombolKedua.onPress}
                  varian={warna.tombolKedua}
                />
              ) : null}
            </View>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  kartu: {
    width: '100%',
    maxWidth: 264,
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 32,
    paddingVertical: 40,
    marginHorizontal: 72,
    borderRadius: 16,
    backgroundColor: COLOR.white,
  },
  tombolX: {
    position: 'absolute',
    top: 24,
    right: 32,
    zIndex: 1,
  },
  lingkaran: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  judul: {
    ...TEXT.titleCenter,
    color: COLOR.black,
  },
  pesan: {
    ...TEXT.descriptiveText,
    color: COLOR.deepForestGreen,
    opacity: 0.5,
    textAlign: 'center',
  },
  areaTombol: {
    alignSelf: 'stretch',
    gap: 10,
    marginTop: 24,
  },
});
