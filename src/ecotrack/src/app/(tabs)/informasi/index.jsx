import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { TEXT, COLOR } from '@/ui/theme';
import Header from "@/ui/component/Header";
import SearchBar from "@/ui/component/SearchBar";
import Button from "@/ui/component/Button";
import { toast } from "@/ui/component/Toast";
import Dialog from "@/ui/component/Dialog";

const tunggu = (ms) => new Promise((selesai) => setTimeout(selesai, ms));

export default function InformasiPage() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  // Percobaan Dialog: null = tidak ada dialog, atau "simpan" | "keluar" | "info"
  const [dialog, setDialog] = useState(null);
  const tutupDialog = () => setDialog(null);

  return (
    <View style={styles.halaman}>
      <Header judul="Mulai Daur Ulang" tampilProfil>
        <SearchBar
          placeholder="Cari Material Sampah"
          value={keyword}
          onChangeText={setKeyword}
          // TODO (F2): panggil InformasiSampahController untuk mencari kategori
          onSubmit={(teks) => console.log("cari:", teks)}
        />
      </Header>

      {/* TODO (F2): ganti View ini dengan FlatList katalog kategori sampah, dan beri prop:
            keyboardShouldPersistTaps="handled"  -> satu ketukan langsung membuka kartu
                                                    walaupun keyboard search bar masih terbuka
            keyboardDismissMode="on-drag"        -> keyboard tertutup saat daftar di-scroll */}
      <ScrollView contentContainerStyle={styles.isi} keyboardShouldPersistTaps="handled">
        <Text style={styles.text}>INFORMASI SAMPAH PAGE</Text>
        {keyword ? <Text>Keyword: {keyword}</Text> : null}

        {/* Tombol sementara untuk mencoba navigasi ke tiap halaman.
            Alamat = path file di app/ tanpa folder berkurung (tabs)/(auth) dan tanpa index.jsx.
            Halaman [idSampah]/[idJadwal] butuh id; "contoh" di bawah hanya id percobaan. */}
        <Button label="Detail informasi" onPress={() => router.push("/informasi/contoh")} />
        <View style={styles.baris}>
          <Button label="Profil" varian="outline" onPress={() => router.push("/profil")} style={styles.lebar} />
          <Button label="Log In" onPress={() => router.push("/login")} style={styles.lebar} />
        </View>
        <View style={styles.baris}>
          <Button label="Sign Up" onPress={() => router.push("/signup")} style={styles.lebar} />
          <Button label="Detail Jadwal" varian="outline" onPress={() => router.push("/jadwal/contoh")} style={styles.lebar} />
        </View>
        <Button label="Edit jadwal" ikon="edit" onPress={() => router.push("/jadwal/contoh/edit")} />

        {/* Tombol sementara untuk mencoba Toast */}
        <View style={styles.baris}>
          <Button label="Toast berhasil" onPress={() => toast.berhasil("Jadwal berhasil diperbarui")} style={styles.lebar} />
          <Button label="Toast gagal" varian="bahaya" onPress={() => toast.gagal("Jadwal gagal diperbarui")} style={styles.lebar} />
        </View>

        {/* Tombol sementara untuk mencoba Dialog */}
        <View style={styles.baris}>
          <Button label="Dialog Simpan" varian="outline" onPress={() => setDialog("simpan")} style={styles.lebar} />
          <Button label="Dialog Keluar" varian="bahayaOutline" onPress={() => setDialog("keluar")} style={styles.lebar} />
        </View>
        <Button label="Dialog Info (I25)" varian="outline" onPress={() => setDialog("info")} />
      </ScrollView>

      {/* I12: konfirmasi simpan, dua tombol bertumpuk */}
      <Dialog
        terlihat={dialog === "simpan"}
        onTutup={tutupDialog}
        ikon="save"
        judul="Simpan Jadwal"
        pesan="Pastikan tanggal yang dipilih sudah benar!"
        tombolUtama={{
          label: "Simpan",
          onPress: async () => {
            await tunggu(1500); // pura-pura menyimpan
            tutupDialog();
            toast.berhasil("Jadwal berhasil diperbarui");
          },
        }}
        tombolKedua={{ label: "Batal", onPress: tutupDialog }}
      />

      {/* I19: varian bahaya (merah) */}
      <Dialog
        terlihat={dialog === "keluar"}
        onTutup={tutupDialog}
        varian="bahaya"
        ikon="logout"
        judul="Keluar Akun"
        pesan="Apakah Anda yakin hendak keluar akun ini?"
        tombolUtama={{ label: "Keluar", onPress: tutupDialog }}
        tombolKedua={{ label: "Batal", onPress: tutupDialog }}
      />

      {/* I25: satu tombol + tombol × di kanan atas */}
      <Dialog
        terlihat={dialog === "info"}
        onTutup={tutupDialog}
        tampilTutup
        ikon="speaker-notes-off"
        judul="Informasi Sampah Belum Tersedia"
        pesan="Informasi detail tentang daur ulang belum tersedia di database kami."
        tombolUtama={{ label: "Mengerti", onPress: tutupDialog }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  halaman: {
    flex: 1,
    backgroundColor: COLOR.secondaryWhite,
  },
  isi: {
    gap: 12,
    padding: 16,
    paddingBottom: 140, // ruang supaya tombol terakhir tidak tertutup navbar
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
