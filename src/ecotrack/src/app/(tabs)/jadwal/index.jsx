import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TEXT, COLOR } from '@/ui/theme';
import Header from "@/ui/component/Header";
import SearchBar from "@/ui/component/SearchBar";
import Button from "@/ui/component/Button";
import EmptyState from "@/ui/component/EmptyState";
import { NAVBAR_TINGGI, TONJOLAN } from "@/ui/component/NavBar";
import KartuLokasi from "@/ui/jadwal/KartuLokasi";
import JadwalController from "@/controller/JadwalController";

export default function JadwalPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  // Navbar menumpuk di atas halaman, jadi area ini dikurangi supaya posisinya sama dengan EmptyState.
  const ruangTengah = { paddingTop: 16, paddingBottom: NAVBAR_TINGGI + TONJOLAN + insets.bottom + 16 };
  const [status, setStatus] = useState("memuat");
  const [keyword, setKeyword] = useState("");
  const [daftarJadwal, setDaftarJadwal] = useState([]);

  async function openJadwalPage() {
    setStatus("memuat");
    try {
      await JadwalController.getDaftarJadwal();
      setDaftarJadwal(JadwalController.cariLokasiTPS(keyword));
      setStatus("siap");
    } catch (e) {
      console.warn("Gagal memuat jadwal:", e?.code ?? e?.message);
      setStatus("gagal");
    }
  }

  useEffect(() => {
    openJadwalPage();
  }, []);

  function inputKeywordLokasiTPS(teks) {
    setKeyword(teks);
    setDaftarJadwal(JadwalController.cariLokasiTPS(teks));
  }

  function chooseJadwal(idJadwal) {
    router.push(`/jadwal/${idJadwal}`);
  }

  return (
    <View style={styles.halaman}>
      <Header judul="Jadwal Pengambilan Sampah" tampilProfil>
        <SearchBar
          placeholder="Cari Kecamatan/Kelurahan"
          value={keyword}
          onChangeText={inputKeywordLokasiTPS}
        />
      </Header>

      {status === "memuat" ? (
        <View style={[styles.tengah, ruangTengah]}>
          <ActivityIndicator size="large" color={COLOR.forestEmerald} />
        </View>
      ) : status === "gagal" ? (
        <View style={[styles.tengah, ruangTengah]}>
          <MaterialIcons name="cloud-off" size={72} color={COLOR.deepForestGreen} />
          <Text style={styles.judulGagal}>Gagal memuat jadwal</Text>
          <Button label="COBA LAGI" onPress={openJadwalPage} style={styles.lebarPenuh} />
        </View>
      ) : (
        <FlatList
          data={daftarJadwal}
          keyExtractor={(jadwal) => jadwal.idJadwal}
          renderItem={({ item }) => <KartuLokasi jadwal={item} onPress={() => chooseJadwal(item.idJadwal)} />}
          ListHeaderComponent={
            daftarJadwal.length > 0 ? <Text style={styles.judulDaftar}>Lokasi TPS Kota Bandung</Text> : null
          }
          ListEmptyComponent={<EmptyState judul="Lokasi TPS tidak ditemukan" />}
          contentContainerStyle={[
            styles.isiDaftar,
            { paddingBottom: NAVBAR_TINGGI + TONJOLAN + insets.bottom + 16 },
          ]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
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
  isiDaftar: {
    flexGrow: 1,
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  judulDaftar: {
    ...TEXT.titleCenter,
    color: COLOR.deepForestGreen,
  },
});
