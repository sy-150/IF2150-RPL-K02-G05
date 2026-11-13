
import { useEffect, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLOR, TEXT } from "@/ui/theme";

import Header from "@/ui/component/Header";
import EmptyState from "@/ui/component/EmptyState";

import InformasiSampahController from "@/controller/InformasiSampahController";

import KategoriSampahCard from "@/ui/informasi-sampah/KategoriSampahCard";
import TutorialModal from "@/ui/informasi-sampah/TutorialModal";

import { gambarSampah } from "@/utils/gambarSampah";

// ==========================================
// KONSTANTA
// ==========================================

const LABEL_JENIS = {
  anorganik: "Anorganik",
  organik: "Organik",
  residu: "Residu",
  campuran: "Campuran",
  "limbah-cair": "Limbah Cair",
};

const NAMA_METODE = {
  kreasi: "Kreasikan Menjadi Barang Baru",
  gunakan: "Gunakan Ulang untuk Tujuan Lain",
};

function buatNamaMetode(metode, jenisSampah) {
  if (metode !== "dibuang") {
    return NAMA_METODE[metode] ?? metode;
  }

  if (jenisSampah === "limbah-cair") {
    return "Kelola sebagai Limbah Cair";
  }

  const label = LABEL_JENIS[jenisSampah] ?? "Lainnya";
  return `Dibuang ke Sampah ${label}`;
}

// ==========================================
// HALAMAN DETAIL INFORMASI SAMPAH
// ==========================================

export default function DetailInformasiPage() {
  const { idSampah } = useLocalSearchParams();

  const idKategori = Array.isArray(idSampah)
    ? idSampah[0]
    : idSampah;

  // ========================================
  // STATE
  // ========================================

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [popupTerbuka, setPopupTerbuka] = useState(false);
  const [metodeTerpilih, setMetodeTerpilih] = useState(null);

  // Digunakan untuk mengulang pengambilan data.
  const [percobaan, setPercobaan] = useState(0);

  // ========================================
  // AMBIL DATA FIRESTORE
  // ========================================

  useEffect(() => {
    let masihAktif = true;

    async function muatDetail() {
      try {
        setLoading(true);
        setError(false);
        setNotFound(false);

        setData(null);

        if (!idKategori) {
          setNotFound(true);
          return;
        }

        const hasil =
          await InformasiSampahController.getDetail(
            idKategori
          );

        // Mencegah perubahan state jika halaman sudah ditinggalkan.
        if (!masihAktif) return;

        // Dokumen tidak ditemukan.
        if (!hasil) {
          setData(null);
          setNotFound(true);
          return;
        }

        // Data berhasil diperoleh.
        setData(hasil);

      } catch (err) {
        console.warn("Gagal mengambil detail sampah:", err?.code ?? err?.message);

        if (masihAktif) {
          setError(true);
        }

      } finally {
        if (masihAktif) {
          setLoading(false);
        }
      }
    }

    muatDetail();

    return () => {
      masihAktif = false;
    };
  }, [idKategori, percobaan]);

  // ========================================
  // PILIH METODE DAUR ULANG
  // ========================================

  function pilihMetode(tipe, metode) {
    const konten = tipe[metode];

    // Pastikan metode memiliki langkah tutorial.
    if (!konten || !Array.isArray(konten.langkah)) {
      return;
    }

    setMetodeTerpilih({
      namaTipe: tipe.nama,
      namaMetode: buatNamaMetode(metode, data?.jenisSampah),
      metode,
      konten,
    });

    setPopupTerbuka(true);
  }

  // ========================================
  // TUTUP POPUP
  // ========================================

  function tutupPopup() {
    setPopupTerbuka(false);
    setMetodeTerpilih(null);
  }

  // ========================================
  // COBA LAGI
  // ========================================

  function cobaLagi() {
    setPercobaan((sebelumnya) => sebelumnya + 1);
  }

  // ========================================
  // LOADING STATE
  // ========================================

  if (loading) {
    return (
      <View style={styles.halaman}>
        <Header
          judul="Informasi Sampah"
          tampilKembali
          tampilProfil
        />

        <View style={styles.status}>
          <ActivityIndicator
            size="large"
            color={COLOR.forestEmerald}
          />

          <Text style={styles.teksStatus}>
            Memuat informasi sampah...
          </Text>
        </View>
      </View>
    );
  }

  // ========================================
  // ERROR STATE
  // ========================================

  if (error) {
    return (
      <View style={styles.halaman}>
        <Header
          judul="Informasi Sampah"
          tampilKembali
          tampilProfil
        />

        <View style={styles.status}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={42}
            color={COLOR.red}
          />

          <Text style={styles.teksError}>
            Gagal memuat informasi sampah.
            Periksa koneksi internetmu.
          </Text>

          <Pressable
            style={styles.tombolRetry}
            onPress={cobaLagi}
            accessibilityRole="button"
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
  // Dokumen tidak ditemukan.
  // ========================================

  if (notFound || !data) {
    return (
      <View style={styles.halaman}>
        <Header
          judul="Informasi Sampah"
          tampilKembali
          tampilProfil
        />

        <View style={styles.emptyWrapper}>
          <EmptyState
            judul="Informasi tidak ditemukan"
            keterangan="Data material sampah yang kamu cari tidak tersedia."
            style={styles.emptyState}
          />
        </View>
      </View>
    );
  }

  // ========================================
  // RENDER DETAIL
  // ========================================

  return (
    <View style={styles.halaman}>

      {/* HEADER */}

      <Header
        judul={`Sampah ${data.nama}`}
        tampilKembali
        tampilProfil
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* INFORMASI KATEGORI */}

        <View style={styles.kartuInformasi}>
          <Text style={styles.labelKategori}>
            {LABEL_JENIS[data.jenisSampah] ?? "Lainnya"}
          </Text>

          <Text style={styles.deskripsiKategori}>
            {data.deskripsi}
          </Text>
        </View>

        {/* DAFTAR TIPE SAMPAH */}

        <View style={styles.daftarKategori}>
          {(data.tipe ?? []).map((tipe, index) => (
            <KategoriSampahCard
              key={tipe.idTipe}
              tipe={tipe}
              nomor={index + 1}
              jenisSampah={data.jenisSampah}
              gambarMetode={(idTipe, metode) => {
                const tipeTerpilih = data.tipe?.find(
                  (item) => item.idTipe === idTipe
                );

                return gambarSampah(
                  tipeTerpilih?.[metode]?.gambar
                );
              }}
              onPilihMetode={pilihMetode}
            />
          ))}
        </View>
      </ScrollView>

      {/* MODAL TUTORIAL */}

      <TutorialModal
        visible={popupTerbuka}
        data={metodeTerpilih}
        onClose={tutupPopup}

        // Mengambil gambar contoh berdasarkan nama file.
        getImage={(item) => gambarSampah(item.gambar)}
      />

    </View>
  );
}

// ==========================================
// STYLING HALAMAN
// ==========================================

const styles = StyleSheet.create({

  halaman: {
    flex: 1,
    backgroundColor: COLOR.secondaryWhite,
  },

  // ========================================
  // SCROLL VIEW
  // ========================================

  scroll: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 130,
  },

  // ========================================
  // KARTU INFORMASI KATEGORI
  // ========================================

  kartuInformasi: {
    backgroundColor: COLOR.forestEmerald,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },

  labelKategori: {
    ...TEXT.bodyText,
    color: COLOR.white,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  deskripsiKategori: {
    ...TEXT.smallText,
    color: COLOR.white,
    lineHeight: 18,
  },

  // ========================================
  // DAFTAR TIPE SAMPAH
  // ========================================

  daftarKategori: {
    gap: 12,
  },

  // ========================================
  // LOADING DAN ERROR
  // ========================================

  status: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
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

  // ========================================
  // EMPTY STATE
  // ========================================

  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  emptyState: {
    width: "100%",
  },

});
