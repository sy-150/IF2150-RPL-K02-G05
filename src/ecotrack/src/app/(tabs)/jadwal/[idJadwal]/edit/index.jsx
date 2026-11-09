import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';
import Button from "@/ui/component/Button";
import Dialog from "@/ui/component/Dialog";
import EmptyState from "@/ui/component/EmptyState";
import { toast } from "@/ui/component/Toast";
import { NAVBAR_TINGGI, TONJOLAN } from "@/ui/component/NavBar";
import Kalender from "@/ui/jadwal/Kalender";
import KartuInfoLokasi from "@/ui/jadwal/KartuInfoLokasi";
import JadwalController from "@/controller/JadwalController";

export default function EditJadwalPage() {
  const { idJadwal } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const ruangBawah = NAVBAR_TINGGI + TONJOLAN + insets.bottom + 16;

  const [status, setStatus] = useState("memuat"); // "memuat" | "siap" | "tidakBoleh" | "gagal"
  const [jadwal, setJadwal] = useState(null);
  const [daftarTanggal, setDaftarTanggal] = useState([]);
  const [dialogSimpan, setDialogSimpan] = useState(false);

  async function showFormEditJadwal() {
    setStatus("memuat");
    try {
      const hasil = await JadwalController.getJadwal(idJadwal);
      if (!hasil?.bolehEdit) {
        setStatus("tidakBoleh");
        return;
      }
      setJadwal(hasil.jadwal);
      setDaftarTanggal(hasil.jadwal.getTanggal());
      setStatus("siap");
    } catch (e) {
      console.warn("Gagal memuat jadwal:", e?.code ?? e?.message);
      setStatus("gagal");
    }
  }

  // Sengaja hanya saat halaman dibuka, supaya tanggal yang sedang dipilih tidak tertimpa data lama.
  useEffect(() => {
    showFormEditJadwal();
  }, []);

  function kembaliKeDetail() {
    if (router.canGoBack()) router.back();
    else router.replace(`/jadwal/${idJadwal}`);
  }

  async function fillFormEditJadwal() {
    const hasil = await JadwalController.editJadwal(idJadwal, daftarTanggal);
    setDialogSimpan(false);
    if (!hasil) {
      toast.gagal("Jadwal gagal diperbarui"); // I14: tanggal yang sudah dipilih tetap ada
      return;
    }
    toast.berhasil("Jadwal berhasil diperbarui"); // I13
    kembaliKeDetail(); // Detail memuat ulang datanya saat terbuka lagi
  }

  return (
    <View style={styles.halaman}>
      <Header judul={"Edit Jadwal\nPengambilan Sampah"} />

      {status === "memuat" ? (
        <View style={[styles.tengah, { paddingBottom: ruangBawah }]}>
          <ActivityIndicator size="large" color={COLOR.forestEmerald} />
        </View>
      ) : status === "gagal" ? (
        <View style={[styles.tengah, { paddingBottom: ruangBawah }]}>
          <MaterialIcons name="cloud-off" size={72} color={COLOR.deepForestGreen} />
          <Text style={styles.judulGagal}>Gagal memuat jadwal</Text>
          <Button label="COBA LAGI" onPress={showFormEditJadwal} style={styles.lebarPenuh} />
        </View>
      ) : status === "tidakBoleh" ? (
        <EmptyState
          judul="Jadwal tidak bisa diedit"
          keterangan="Hanya petugas di wilayah ini yang bisa mengedit jadwalnya"
          style={{ paddingBottom: ruangBawah }}
        />
      ) : (
        <ScrollView contentContainerStyle={[styles.isi, { paddingBottom: ruangBawah }]}>
          <KartuInfoLokasi jadwal={jadwal} />

          <Kalender daftarTanggal={daftarTanggal} onUbahTanggal={setDaftarTanggal} />

          <View style={styles.baris}>
            <Button label="BATAL" varian="outline" onPress={kembaliKeDetail} style={styles.lebar} />
            <Button label="SIMPAN" onPress={() => setDialogSimpan(true)} style={styles.lebar} />
          </View>
        </ScrollView>
      )}

      {/* I12: konfirmasi simpan */}
      <Dialog
        terlihat={dialogSimpan}
        onTutup={() => setDialogSimpan(false)}
        ikon="save"
        judul="Simpan Jadwal"
        pesan="Pastikan tanggal yang dipilih sudah benar!"
        tombolUtama={{ label: "Simpan", onPress: fillFormEditJadwal }}
        tombolKedua={{ label: "Batal", onPress: () => setDialogSimpan(false) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  halaman: {
    flex: 1,
    backgroundColor: COLOR.secondaryWhite,
  },
  tengah: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 32,
  },
  judulGagal: {
    ...TEXT.titleCenter,
    color: COLOR.deepForestGreen,
  },
  lebarPenuh: {
    alignSelf: "stretch",
  },
  isi: {
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  baris: {
    flexDirection: "row",
    gap: 12,
  },
  lebar: {
    flex: 1,
  },
});
