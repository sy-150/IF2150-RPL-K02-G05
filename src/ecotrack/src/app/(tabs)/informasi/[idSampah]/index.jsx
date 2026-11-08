
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLOR, TEXT } from "@/ui/theme";
import Header from "@/ui/component/Header";

import InformasiSampahController from "@/controller/InformasiSampahController";

import KategoriSampahCard from "@/ui/informasi-sampah/KategoriSampahCard";
import TutorialModal from "@/ui/informasi-sampah/TutorialModal";

// ==========================================
// GAMBAR LOKAL
// ==========================================

const GAMBAR_ANORGANIK = require("../../../../../assets/images/informasi-sampah/solusi-plastik/solusi-plastik-1.png");

const GAMBAR_KREASI = {
  pot: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-1.png"),
  celengan: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-2.png"),
  mainan: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-3.png"),
  tasAnyaman: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-4.png"),
  dompet: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-5.png"),
  bunga: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-6.png"),
  tempatAlatTulis: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-7.png"),
  potWadah: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-8.png"),
  penyimpanan: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-9.png"),
};

// ==========================================
// GAMBAR KARTU METODE
// ==========================================

const GAMBAR_METODE_PLASTIK = {
  "botol-plastik": {
    dibuang: GAMBAR_ANORGANIK,
    kreasi: GAMBAR_KREASI.pot,
  },

  "kantong-plastik": {
    dibuang: GAMBAR_ANORGANIK,
    kreasi: require("../../../../../assets/images/informasi-sampah/solusi-plastik/solusi-plastik-3.png"),
  },

  "wadah-plastik": {
    dibuang: GAMBAR_ANORGANIK,
    kreasi: require("../../../../../assets/images/informasi-sampah/solusi-plastik/solusi-plastik-4.png"),
    gunakan: require("../../../../../assets/images/informasi-sampah/solusi-plastik/solusi-plastik-5.png"),
  },
};

// ==========================================
// GAMBAR CONTOH HASIL KREASI
// ==========================================

const GAMBAR_CONTOH_HASIL = {
  // Botol Plastik
  "hasil-pot-tanaman.png": GAMBAR_KREASI.pot,
  "hasil-celengan.png": GAMBAR_KREASI.celengan,
  "hasil-mainan.png": GAMBAR_KREASI.mainan,

  // Kantong Plastik
  "hasil-tas-anyaman.png": GAMBAR_KREASI.tasAnyaman,
  "hasil-dompet.png": GAMBAR_KREASI.dompet,
  "hasil-bunga-plastik.png": GAMBAR_KREASI.bunga,

  // Wadah Plastik
  "hasil-tempat-alat-tulis-wadah.png": GAMBAR_KREASI.tempatAlatTulis,
  "hasil-tempat-penyimpanan-wadah.png": GAMBAR_KREASI.penyimpanan,
};

// ==========================================
// HELPER
// ==========================================

const NAMA_METODE = {
  dibuang: "Dibuang ke Sampah Anorganik",
  kreasi: "Kreasikan Menjadi Barang Baru",
  gunakan: "Gunakan Ulang untuk Tujuan Lain",
};

// Mengambil gambar untuk kartu metode.
function gambarMetode(idSampah, idTipe, metode) {
  if (idSampah === "plastik") {
    return (
      GAMBAR_METODE_PLASTIK[idTipe]?.[metode] ??
      (metode === "dibuang"
        ? GAMBAR_ANORGANIK
        : GAMBAR_KREASI.pot)
    );
  }

  return metode === "dibuang"
    ? GAMBAR_ANORGANIK
    : GAMBAR_KREASI.pot;
}

// Mengambil gambar contoh hasil berdasarkan nama file dari Firestore.
function cariGambarContoh(item) {
  if (typeof item.gambar === "number") {
    return item.gambar;
  }

  return GAMBAR_CONTOH_HASIL[item.gambar] ?? null;
}

// ==========================================
// HALAMAN DETAIL INFORMASI SAMPAH
// ==========================================

export default function DetailInformasiPage() {
  const router = useRouter();
  const { idSampah } = useLocalSearchParams();

  const idKategori = Array.isArray(idSampah)
    ? idSampah[0]
    : idSampah;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [popupTerbuka, setPopupTerbuka] = useState(false);
  const [metodeTerpilih, setMetodeTerpilih] = useState(null);

  // ========================================
  // AMBIL DATA FIRESTORE
  // ========================================

  useEffect(() => {
    let masihAktif = true;

    async function muatDetail() {
      try {
        setLoading(true);
        setError(false);

        const hasil =
          await InformasiSampahController.getById(idKategori);

        if (!masihAktif) return;

        if (!hasil) {
          setData(null);
          setError(true);
          return;
        }

        // Seluruh data tipe sampah berasal dari Firestore.
        setData(hasil);
      } catch (err) {
        console.error(
          "Gagal mengambil detail sampah:",
          err
        );

        if (masihAktif) {
          setError(true);
        }
      } finally {
        if (masihAktif) {
          setLoading(false);
        }
      }
    }

    if (idKategori) {
      muatDetail();
    }

    return () => {
      masihAktif = false;
    };
  }, [idKategori]);

  // ========================================
  // PILIH METODE
  // ========================================

  function pilihMetode(tipe, metode) {
    const konten = tipe[metode];

    if (!konten || !Array.isArray(konten.langkah)) {
      return;
    }

    setMetodeTerpilih({
      namaTipe: tipe.nama,
      namaMetode: NAMA_METODE[metode],
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
  // LOADING
  // ========================================

  if (loading) {
    return (
      <View style={styles.halaman}>
        <Header
          judul="Informasi Sampah"
          tampilKembali
          tampilProfil
          onKembali={() => router.replace("/informasi")}
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
  // ERROR
  // ========================================

  if (error || !data) {
    return (
      <View style={styles.halaman}>
        <Header
          judul="Informasi Sampah"
          tampilKembali
          tampilProfil
          onKembali={() => router.replace("/informasi")}
        />

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
            onPress={() => router.replace("/informasi")}
          >
            <Text style={styles.teksRetry}>
              Kembali
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <View style={styles.halaman}>
      <Header
        judul={`Sampah ${data.nama}`}
        tampilKembali
        tampilProfil
        onKembali={() => router.replace("/informasi")}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* INFORMASI KATEGORI */}

        <View style={styles.kartuInformasi}>
          <Text style={styles.labelKategori}>
            {data.jenisSampah === "anorganik"
              ? "Anorganik"
              : "Residu"}
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
              gambarMetode={(idTipe, metode) =>
                gambarMetode(idKategori, idTipe, metode)
              }
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
        getImage={cariGambarContoh}
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

  scroll: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 130,
  },

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

  daftarKategori: {
    gap: 12,
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
});
