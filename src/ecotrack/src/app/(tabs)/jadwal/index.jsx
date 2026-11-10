import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Keyboard, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRouter, useScrollToTop } from "expo-router";
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

  // Menekan tab Kalender saat sudah berada di tab ini mengosongkan pencarian dan menampilkan
  // semua lokasi lagi. Kalau sedang di detail/edit, stack otomatis kembali ke halaman ini dulu.
  // Datang dari tab lain tidak mengosongkan pencarian.
  const navigation = useNavigation();
  useEffect(() => {
    const tab = navigation.getParent();
    if (!tab) return;
    return tab.addListener("tabPress", () => {
      if (!tab.isFocused()) return;
      Keyboard.dismiss();
      inputKeywordLokasiTPS("");
    });
  }, [navigation]);

  // Sekaligus menggulir daftar kembali ke paling atas.
  const refDaftar = useRef(null);
  useScrollToTop(refDaftar);

  function chooseJadwal(idJadwal) {
    // Kartu tetap bisa ditekan walaupun keyboard pencarian masih terbuka (keyboardShouldPersistTaps),
    // jadi keyboard ditutup dulu supaya tidak masih terbuka saat kembali dari detail.
    Keyboard.dismiss();
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
          ref={refDaftar}
          data={daftarJadwal}
          keyExtractor={(jadwal) => jadwal.getIdJadwal()}
          renderItem={({ item }) => <KartuLokasi jadwal={item} onPress={() => chooseJadwal(item.getIdJadwal())} />}
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
