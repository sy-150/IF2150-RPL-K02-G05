
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLOR, TEXT } from "@/ui/theme";
import Header from "@/ui/component/Header";
import SearchBar from "@/ui/component/SearchBar";
import EmptyState from "@/ui/component/EmptyState";
import InformasiSampahController from "@/controller/InformasiSampahController";

// Gambar kategori disimpan di assets/images/informasi-sampah/
const GAMBAR_KATEGORI = {
  plastik: require("../../../../assets/images/informasi-sampah/plastik.png"),
  kaca: require("../../../../assets/images/informasi-sampah/kaca.png"),
  aluminium: require("../../../../assets/images/informasi-sampah/aluminium.png"),
  "stainless-steel": require("../../../../assets/images/informasi-sampah/steel.png"),
  silikon: require("../../../../assets/images/informasi-sampah/silikon.png"),
  keramik: require("../../../../assets/images/informasi-sampah/keramik.png"),
};

export default function InformasiPage() {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function muatKategori(kata = "") {
    try {
      setLoading(true);
      setError(false);

      const hasil = kata.trim()
        ? await InformasiSampahController.search(kata)
        : await InformasiSampahController.getAll();

      setKategori(hasil);
    } catch (err) {
      console.error("Gagal memuat kategori:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    muatKategori(keyword);
  }, [keyword]);

  function bukaDetail(idSampah) {
    router.push({
      pathname: "/informasi/[idSampah]",
      params: { idSampah },
    });
  }

  function renderKategori({ item }) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.kartu,
          pressed && styles.kartuDitekan,
        ]}
        onPress={() => bukaDetail(item.idSampah)}
        accessibilityRole="button"
        accessibilityLabel={`Lihat informasi ${item.nama}`}
      >
        <Image
          source={GAMBAR_KATEGORI[item.idSampah]}
          style={styles.gambarKategori}
          resizeMode="cover"
        />

        <View style={styles.infoKartu}>
          <View style={styles.teksKartu}>
            <Text style={styles.namaKategori}>
              {item.nama}
            </Text>

            <Text style={styles.ringkasan}>
              {item.ringkasan}
            </Text>
          </View>

          <View style={styles.tombolDetail}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={COLOR.forestEmerald}
            />
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.halaman}>
      <Header judul="Mulai Daur Ulang" tampilProfil>
        <SearchBar
          placeholder="Cari Material Sampah"
          value={keyword}
          onChangeText={setKeyword}
          onClear={() => setKeyword("")}
          onSubmit={(teks) => muatKategori(teks)}
        />
      </Header>

      <View style={styles.container}>
        <Text style={styles.judulBagian}>
          Kategori Material Sampah
        </Text>

        {loading ? (
          <View style={styles.status}>
            <ActivityIndicator
              size="large"
              color={COLOR.forestEmerald}
            />
            <Text style={styles.teksStatus}>
              Memuat kategori sampah...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.status}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={42}
              color={COLOR.red}
            />

            <Text style={styles.teksError}>
              Gagal memuat informasi sampah.
            </Text>

            <Pressable
              style={styles.tombolRetry}
              onPress={() => muatKategori(keyword)}
            >
              <Text style={styles.teksRetry}>
                Coba Lagi
              </Text>
            </Pressable>
          </View>
        ) : kategori.length === 0 ? (
          <View style={styles.emptyWrapper}>
            <EmptyState
              judul="Material tidak ditemukan"
              keterangan="Coba kata kunci lain atau periksa ejaan pencarianmu"
              style={styles.emptyState}
            />
          </View>
        ) : (
          <FlatList
            data={kategori}
            renderItem={renderKategori}
            keyExtractor={(item) => item.idSampah}
            numColumns={2}
            columnWrapperStyle={styles.barisKartu}
            contentContainerStyle={styles.daftar}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  halaman: {
    flex: 1,
    backgroundColor: COLOR.secondaryWhite,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyState: {
    width: "100%",
  },

  judulBagian: {
    ...TEXT.bodyText,
    color: COLOR.deepForestGreen,
    textAlign: "center",
    marginBottom: 16,
  },

  daftar: {
    paddingBottom: 140,
    gap: 24,
  },

  barisKartu: {
    justifyContent: "space-between",
    gap: 16,
  },

  kartu: {
    width: 180,
    height: 184,
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: COLOR.forestEmerald,
    borderRadius: 12,
    padding: 8,
    overflow: "hidden",
  },

  kartuDitekan: {
    opacity: 0.8,
  },

  gambarKategori: {
    width: "100%",
    height: 118,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.deepForestGreen,
  },

  infoKartu: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },

  teksKartu: {
    flex: 1,
    gap: 3,
  },

  namaKategori: {
    ...TEXT.bodyText,
    color: COLOR.white,
  },

  ringkasan: {
    ...TEXT.smallText,
    color: COLOR.secondaryWhite,
    lineHeight: 14,
    flexWrap: "wrap",
  },

  tombolDetail: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLOR.emeraldGreen,
    alignItems: "center",
    justifyContent: "center",
  },

  status: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  teksStatus: {
    ...TEXT.descriptiveText,
    color: COLOR.deepForestGreen,
  },

  teksError: {
    ...TEXT.bodyText,
    color: COLOR.red,
    textAlign: "center",
  },

  tombolRetry: {
    backgroundColor: COLOR.forestEmerald,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
  },

  teksRetry: {
    ...TEXT.bodyText,
    color: COLOR.white,
  },

  emptyState: {
    flex: 1,
  },
});
