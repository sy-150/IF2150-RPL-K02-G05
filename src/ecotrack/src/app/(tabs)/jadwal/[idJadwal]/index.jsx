import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TEXT, COLOR } from '@/ui/theme';
import Header from '@/ui/component/Header';
import Button from "@/ui/component/Button";
import EmptyState from "@/ui/component/EmptyState";
import { NAVBAR_TINGGI, TONJOLAN } from "@/ui/component/NavBar";
import Kalender from "@/ui/jadwal/Kalender";
import JadwalController from "@/controller/JadwalController";

export default function DetailJadwalPage() {
  const { idJadwal } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  // Navbar menumpuk di atas halaman, jadi area ini dikurangi supaya isinya tepat di tengah area yang terlihat.
  const ruangTengah = { paddingTop: 16, paddingBottom: NAVBAR_TINGGI + TONJOLAN + insets.bottom + 16 };
  const [status, setStatus] = useState("memuat");
  const [jadwal, setJadwal] = useState(null);

  const muatJadwal = useCallback(async () => {
    try {
      const hasil = await JadwalController.getJadwal(idJadwal);
      if (!hasil) {
        setStatus("tidakAda");
        return;
      }
      setJadwal(hasil.jadwal);
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
          <View style={styles.kartuLokasi}>
            <View style={styles.kotakIkon}>
              <Ionicons name="location-outline" size={28} color={COLOR.white} />
            </View>
            <View style={styles.teksLokasi}>
              <Text style={styles.labelLokasi}>LOKASI TPS</Text>
              <Text style={styles.kelurahan}>Kelurahan {jadwal?.kelurahan}</Text>
              <Text style={styles.labelLokasi}>Kecamatan {jadwal?.kecamatan}, Kota Bandung</Text>
            </View>
          </View>

          <Kalender daftarTanggal={jadwal?.daftarTanggal ?? []} />
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
  kartuLokasi: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
    borderRadius: 16,
    backgroundColor: COLOR.white,
  },
  kotakIkon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.forestEmerald,
  },
  teksLokasi: {
    flex: 1,
    gap: 2,
  },
  labelLokasi: {
    ...TEXT.smallText,
    color: COLOR.deepForestGreen,
  },
  kelurahan: {
    ...TEXT.bodyText,
    color: COLOR.black,
  },
});
