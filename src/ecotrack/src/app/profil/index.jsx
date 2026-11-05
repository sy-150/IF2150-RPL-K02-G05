import { Text, View, StyleSheet } from "react-native";
import { TEXT, COLOR } from '@/ui/theme';
import Header from "@/ui/component/Header";
import Button from "@/ui/component/Button";

// Simulasi proses yang butuh waktu (misalnya simpan ke Firebase), untuk mencoba loading.
const tunggu = (ms) => new Promise((selesai) => setTimeout(selesai, ms));

export default function ProfilPage() {
  return (
    <View style={styles.halaman}>
      <Header judul="Profil Petugas" tampilProfil tampilKembali>
      </Header>

      <View style={styles.isi}>
        <Text style={styles.text}>PROFIL PETUGAS PAGE</Text>

        {/* TODO (F4): contoh pemakaian Button, sesuaikan dengan isi halaman profil sebenarnya */}
        <Button label="EDIT PROFIL" ikon="edit" onPress={() => tunggu(2000)} />
        <View style={styles.baris}>
          <Button label="BATAL" varian="outline" onPress={() => {}} style={styles.lebar} />
          <Button label="SIMPAN" nonaktif onPress={() => {}} style={styles.lebar} />
        </View>
        <View style={styles.baris}>
          <Button label="Keluar" varian="bahaya" onPress={() => tunggu(2000)} style={styles.lebar} />
          <Button label="Batal" varian="bahayaOutline" onPress={() => {}} style={styles.lebar} />
        </View>
        <Button label="KELUAR AKUN" varian="bahayaOutline" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  halaman: {
    flex: 1,
    backgroundColor: COLOR.secondaryWhite,
  },
  isi: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
    padding: 16,
  },
  baris: {
    flexDirection: "row",
    gap: 12,
  },
  lebar: {
    flex: 1,
  },
  text: {
    ...TEXT.titleCenter, color: COLOR.forestEmerald
  }
});
