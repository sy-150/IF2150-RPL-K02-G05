import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';
import Button from "@/ui/component/Button";
import EmptyState from "@/ui/component/EmptyState";
import { NAVBAR_TINGGI, TONJOLAN } from "@/ui/component/NavBar";
import Kalender from "@/ui/jadwal/Kalender";
import KartuInfoLokasi from "@/ui/jadwal/KartuInfoLokasi";
import JadwalController from "@/controller/JadwalController";

export default function DetailJadwalPage() {
  const { idJadwal } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // Navbar menumpuk di atas halaman, jadi area ini dikurangi supaya isinya tepat di tengah area yang terlihat.
  const ruangTengah = { paddingTop: 16, paddingBottom: NAVBAR_TINGGI + TONJOLAN + insets.bottom + 16 };
  const [status, setStatus] = useState("memuat");
  const [jadwal, setJadwal] = useState(null);
  const [bolehEdit, setBolehEdit] = useState(false);

  const muatJadwal = useCallback(async () => {
    try {
      const hasil = await JadwalController.getJadwal(idJadwal);
      if (!hasil) {
        setStatus("tidakAda");
        return;
      }
      setJadwal(hasil.jadwal);
      setBolehEdit(hasil.bolehEdit);
      setStatus("siap");
    } catch (e) {
      console.warn("Gagal memuat jadwal:", e?.code ?? e?.message);
      setStatus("gagal");
    }
  }, [idJadwal]);

  useFocusEffect(
    useCallback(() => {
      muatJadwal();
    }, [muatJadwal])
  );

  function cobaLagi() {
    setStatus("memuat");
    return muatJadwal();
  }

  function chooseEditJadwal() {
    router.push(`/jadwal/${idJadwal}/edit`);
  }

  return (
    <View style={styles.halaman}>
      <Header judul="Jadwal Pengambilan Sampah" tampilKembali tampilProfil />

      {status === "memuat" ? (
        <View style={[styles.tengah, ruangTengah]}>
          <ActivityIndicator size="large" color={COLOR.forestEmerald} />
        </View>
      ) : status === "gagal" ? (
        <View style={[styles.tengah, ruangTengah]}>
          <MaterialIcons name="cloud-off" size={72} color={COLOR.deepForestGreen} />
          <Text style={styles.judulGagal}>Gagal memuat jadwal</Text>
          <Button label="COBA LAGI" onPress={cobaLagi} style={styles.lebarPenuh} />
        </View>
      ) : status === "tidakAda" ? (
        <EmptyState judul="Lokasi TPS tidak ditemukan" keterangan="Lokasi ini tidak ada di daftar jadwal" style={[styles.kosong, ruangTengah]} />
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.isi,
            { paddingBottom: NAVBAR_TINGGI + TONJOLAN + insets.bottom + 16 },
          ]}
        >
          <KartuInfoLokasi jadwal={jadwal} />

          <Kalender daftarTanggal={jadwal?.getTanggal() ?? []} />

          {/* Hanya untuk petugas yang login dan wilayah tugasnya sama dengan jadwal ini (I10) */}
          {bolehEdit ? <Button label="EDIT JADWAL" ikon="edit" onPress={chooseEditJadwal} /> : null}
        </ScrollView>
      )}
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
  kosong: {
    flex: 1,
  },
  isi: {
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
