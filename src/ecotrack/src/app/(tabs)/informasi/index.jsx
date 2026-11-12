
import { useEffect, useMemo, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLOR, TEXT } from "@/ui/theme";
import Header from "@/ui/component/Header";
import SearchBar from "@/ui/component/SearchBar";
import EmptyState from "@/ui/component/EmptyState";
import InformasiSampahController from "@/controller/InformasiSampahController";
import { gambarSampah } from "@/utils/gambarSampah";

const HORIZONTAL_PADDING = 16;
const COLUMN_GAP = 12;

// ==========================================
// HALAMAN INFORMASI SAMPAH
// ==========================================

export default function InformasiPage() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const cardWidth =
    (width - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / 2;

  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [percobaan, setPercobaan] = useState(0);

  // ========================================
  // MEMUAT SELURUH INFORMASI SAMPAH
  // Fetch hanya ketika halaman dibuka atau retry.
  // ========================================

  useEffect(() => {
    let masihAktif = true;

    async function muatKategori() {
      try {
        setLoading(true);
        setError(false);

        await InformasiSampahController.getMain();

        if (!masihAktif) return;

      } catch (err) {
        console.error("Gagal memuat informasi sampah:", err);

        if (masihAktif) {
          setError(true);
        }
      } finally {
        if (masihAktif) {
          setLoading(false);
        }
      }
    }

    muatKategori();

    return () => {
      masihAktif = false;
    };
  }, [percobaan]);

  // ========================================
  // PENCARIAN LOKAL
  // Tidak melakukan request Firestore.
  // ========================================

  const kategori = useMemo(() => {
    return InformasiSampahController.cariInformasi(keyword);
  }, [keyword, loading, percobaan]);

  // ========================================
  // NAVIGASI KE DETAIL
  // ========================================

  function bukaDetail(idSampah) {
    Keyboard.dismiss();

    router.push({
      pathname: "/informasi/[idSampah]",
      params: { idSampah },
    });
  }

  // ========================================
  // RENDER KARTU KATEGORI
  // ========================================

  function renderKategori({ item }) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.kartu,
          { width: cardWidth },
          pressed && styles.kartuDitekan,
        ]}
        onPress={() => bukaDetail(item.idSampah)}
        accessibilityRole="button"
        accessibilityLabel={`Lihat informasi ${item.nama}`}
      >
        <Image
          source={gambarSampah(item.gambar)}
          style={styles.gambarKategori}
          resizeMode="cover"
        />

        <View style={styles.infoKartu}>
          <View style={styles.teksKartu}>
            <Text
              style={styles.namaKategori}
              numberOfLines={1}
            >
              {item.nama}
            </Text>

            <Text
              style={styles.ringkasan}
              numberOfLines={3}
            >
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

  // ========================================
  // JUDUL KATEGORI
  // ========================================

  function renderJudulKategori() {
    return (
      <Text style={styles.judulBagian}>
        Kategori Material Sampah
      </Text>
    );
  }

  // ========================================
  // HEADER
  // ========================================

  function renderHeader() {
    return (
      <Header judul="Mulai Daur Ulang" tampilProfil>
        <SearchBar
          placeholder="Cari Material Sampah"
          value={keyword}
          onChangeText={setKeyword}
          onClear={() => setKeyword("")}
          onSubmit={(teks) => setKeyword(teks)}
        />
      </Header>
    );
  }

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <View style={styles.halaman}>
        {renderHeader()}

        <View style={styles.status}>
          <ActivityIndicator
            size="large"
            color={COLOR.forestEmerald}
          />

          <Text style={styles.teksStatus}>
            Memuat kategori sampah...
          </Text>
        </View>
      </View>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <View style={styles.halaman}>
        {renderHeader()}

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
            onPress={() => setPercobaan((nilai) => nilai + 1)}
          >
            <Text style={styles.teksRetry}>
              Coba Lagi
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ========================================
  // EMPTY STATE
  // ========================================

  if (kategori.length === 0) {
    return (
      <View style={styles.halaman}>
        {renderHeader()}

        <View style={styles.emptyWrapper}>
          <EmptyState
            judul="Material tidak ditemukan"
            keterangan="Coba kata kunci lain atau periksa ejaan pencarianmu"
            style={styles.emptyState}
          />
        </View>
      </View>
    );
  }

  // ========================================
  // RENDER HALAMAN UTAMA
  // ========================================

  return (
    <View style={styles.halaman}>
      {renderHeader()}

      <FlatList
        key="kategori-grid-2"
        data={kategori}
        renderItem={renderKategori}
        keyExtractor={(item) => item.idSampah}
        numColumns={2}
        columnWrapperStyle={styles.barisKartu}
        ListHeaderComponent={renderJudulKategori}
        contentContainerStyle={styles.daftar}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </View>
  );
}

// ==========================================
// STYLING
// ==========================================

const styles = StyleSheet.create({
  halaman: {
    flex: 1,
    backgroundColor: COLOR.secondaryWhite,
  },

  judulBagian: {
    ...TEXT.bodyText,
    color: COLOR.deepForestGreen,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 20,
  },

  daftar: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 140,
  },

  barisKartu: {
    justifyContent: "space-between",
    columnGap: COLUMN_GAP,
    marginBottom: 18,
  },

  kartu: {
    height: 204,
    flexGrow: 0,
    flexShrink: 1,
    backgroundColor: COLOR.forestEmerald,
    borderRadius: 16,
    padding: 8,
    overflow: "hidden",
  },

  kartuDitekan: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  gambarKategori: {
    width: "100%",
    height: 112,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.deepForestGreen,
  },

  infoKartu: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    paddingTop: 5,
  },

  teksKartu: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
    minWidth: 0,
  },

  namaKategori: {
    ...TEXT.bodyText,
    color: COLOR.white,
    fontWeight: "600",
  },

  ringkasan: {
    ...TEXT.smallText,
    color: COLOR.secondaryWhite,
    lineHeight: 16,
  },

  tombolDetail: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLOR.emeraldGreen,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
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

  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 100,
  },

  emptyState: {
    width: "100%",
  },
});
