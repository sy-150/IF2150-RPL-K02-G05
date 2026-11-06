
import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { TEXT, COLOR } from "@/ui/theme";
import Header from "@/ui/component/Header";

// Gambar tempat sampah anorganik
const GAMBAR_ANORGANIK = require("../../../../../assets/images/informasi-sampah/solusi-plastik/solusi-plastik-1.png");

// Gambar contoh kreasi dan penggunaan ulang
const GAMBAR_KREASI = {
  pot: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-1.png"),
  celengan: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-2.png"),
  mainan: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-3.png"),
  alatTulis: require("../../../../../assets/images/informasi-sampah/solusi-plastik/contoh-hasil-2/contoh-4.png"),
};

// Gambar solusi plastik lainnya
const GAMBAR_SOLUSI = {
  langkah2: require("../../../../../assets/images/informasi-sampah/solusi-plastik/solusi-plastik-2.png"),
  langkah3: require("../../../../../assets/images/informasi-sampah/solusi-plastik/solusi-plastik-3.png"),
  langkah4: require("../../../../../assets/images/informasi-sampah/solusi-plastik/solusi-plastik-4.png"),
  langkah5: require("../../../../../assets/images/informasi-sampah/solusi-plastik/solusi-plsatik-5.png"),
};

// Data kategori dan pilihan pengelolaan plastik
const KATEGORI_PLASTIK = [
  {
    id: "1",
    nama: "Botol Plastik",
    pilihan: [
      {
        judul: "Dibuang ke Sampah Anorganik",
        gambar: GAMBAR_ANORGANIK,
        tipe: "anorganik",
      },
      {
        judul: "Kreasikan Menjadi Barang Baru",
        gambar: GAMBAR_KREASI.pot,
        tipe: "kreasi",
      },
    ],
  },
  {
    id: "2",
    nama: "Kantong Plastik",
    pilihan: [
      {
        judul: "Dibuang ke Sampah Anorganik",
        gambar: GAMBAR_ANORGANIK,
        tipe: "anorganik",
      },
      {
        judul: "Gunakan Ulang untuk Tujuan Lain",
        gambar: GAMBAR_SOLUSI.langkah2,
        tipe: "gunakan",
      },
    ],
  },
  {
    id: "3",
    nama: "Wadah Plastik",
    pilihan: [
      {
        judul: "Kreasikan Menjadi Barang Baru",
        gambar: GAMBAR_KREASI.celengan,
        tipe: "kreasi",
      },
      {
        judul: "Gunakan Ulang untuk Tujuan Lain",
        gambar: GAMBAR_KREASI.alatTulis,
        tipe: "gunakan",
      },
    ],
  },
];

// Tutorial daur ulang botol plastik
const LANGKAH_DAUR_ULANG = [
  {
    judul: "Bersihkan botol plastik",
    deskripsi: "Cuci botol hingga bersih dari sisa minuman, lalu keringkan.",
    gambar: GAMBAR_ANORGANIK,
  },
  {
    judul: "Lepas label dan tutup",
    deskripsi: "Lepas label botol dan pisahkan bagian tutupnya.",
    gambar: GAMBAR_SOLUSI.langkah2,
  },
  {
    judul: "Potong sesuai kebutuhan",
    deskripsi: "Potong botol mengikuti bentuk dan ukuran kreasi yang diinginkan.",
    gambar: GAMBAR_SOLUSI.langkah3,
  },
  {
    judul: "Hias dan kreasikan",
    deskripsi: "Tambahkan warna, stiker, atau hiasan agar kreasi semakin menarik.",
    gambar: GAMBAR_SOLUSI.langkah4,
  },
  {
    judul: "Kreasi siap digunakan!",
    deskripsi: "Botol plastik bekas kini memiliki fungsi dan tampilan baru.",
    gambar: GAMBAR_SOLUSI.langkah5,
  },
];

const CONTOH_HASIL_KREASI = [
  { nama: "Pot Tanaman", gambar: GAMBAR_KREASI.pot },
  { nama: "Celengan", gambar: GAMBAR_KREASI.celengan },
  { nama: "Mainan", gambar: GAMBAR_KREASI.mainan },
  { nama: "Tempat Alat Tulis", gambar: GAMBAR_KREASI.alatTulis },
];

export default function DetailInformasiPage() {
  const router = useRouter();
  const [popupTerbuka, setPopupTerbuka] = useState(false);

  function pilihSolusi(tipe) {
    if (tipe === "kreasi") {
      setPopupTerbuka(true);
      return;
    }

    if (tipe === "anorganik") {
      setPopupTerbuka(true);
      return;
    }

    setPopupTerbuka(true);
  }

  function renderKartuSolusi(item, index) {
    return (
      <Pressable
        key={index}
        style={({ pressed }) => [
          styles.kartuSolusi,
          pressed && styles.kartuDitekan,
        ]}
        onPress={() => pilihSolusi(item.tipe)}
      >
        <Image
          source={item.gambar}
          style={styles.gambarSolusi}
          resizeMode="cover"
        />

        <View style={styles.footerSolusi}>
          <Text style={styles.teksSolusi} numberOfLines={2}>
            {item.judul}
          </Text>

          <View style={styles.tombolPanah}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color={COLOR.white}
            />
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.halaman}>
      {/* HEADER */}
      <Header
        judul="Sampah Plastik"
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
          <Text style={styles.labelKategori}>Anorganik</Text>

          <Text style={styles.deskripsiKategori}>
            Sampah plastik terdiri dari berbagai jenis, seperti PET pada
            botol minuman, HDPE pada botol detergen, LDPE pada kantong
            plastik, dan PP pada wadah makanan. Setiap jenis memiliki
            karakteristik dan tingkat kemudahan daur ulang yang berbeda,
            sehingga penting untuk mengenali dan memilahnya dengan tepat.
          </Text>
        </View>

        {/* DAFTAR KATEGORI PLASTIK */}
        <View style={styles.daftarKategori}>
          {KATEGORI_PLASTIK.map((kategori) => (
            <View key={kategori.id} style={styles.kartuKategori}>
              {/* JUDUL KATEGORI */}
              <View style={styles.headerKategori}>
                <View style={styles.nomorKategori}>
                  <Text style={styles.teksNomor}>
                    {kategori.id}
                  </Text>
                </View>

                <Text style={styles.namaKategori}>
                  {kategori.nama}
                </Text>
              </View>

              {/* PILIHAN SOLUSI */}
              <View style={styles.daftarSolusi}>
                {kategori.pilihan.map((item, index) =>
                  renderKartuSolusi(item, index)
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* POPUP TUTORIAL */}
      <Modal
        visible={popupTerbuka}
        transparent
        animationType="fade"
        onRequestClose={() => setPopupTerbuka(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={styles.headerPopup}>
              <Text style={styles.judulPopup}>
                Kreasikan Menjadi Barang Baru
              </Text>

              <Pressable
                style={styles.tombolTutup}
                onPress={() => setPopupTerbuka(false)}
                hitSlop={10}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={20}
                  color={COLOR.deepForestGreen}
                />
              </Pressable>
            </View>

            <Text style={styles.subjudulPopup}>
              Sulap botol plastik bekas menjadi kreasi unik dan bermanfaat!
            </Text>

            <ScrollView
              style={styles.scrollPopup}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.isiPopup}
            >
              {LANGKAH_DAUR_ULANG.map((langkah, index) => (
                <View key={index} style={styles.kartuLangkah}>
                  <Image
                    source={langkah.gambar}
                    style={styles.gambarLangkah}
                    resizeMode="cover"
                  />

                  <View style={styles.infoLangkah}>
                    <Text style={styles.nomorLangkah}>
                      LANGKAH {index + 1}
                    </Text>

                    <Text style={styles.judulLangkah}>
                      {langkah.judul}
                    </Text>

                    <Text style={styles.deskripsiLangkah}>
                      {langkah.deskripsi}
                    </Text>
                  </View>
                </View>
              ))}

              {/* CONTOH HASIL */}
              <View style={styles.bagianContoh}>
                <Text style={styles.judulContoh}>
                  Contoh Hasil Kreasi
                </Text>

                <Text style={styles.deskripsiContoh}>
                  Inspirasi barang baru dari botol plastik bekas.
                </Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.daftarKreasi}
                >
                  {CONTOH_HASIL_KREASI.map((item, index) => (
                    <View key={index} style={styles.kartuKreasi}>
                      <Image
                        source={item.gambar}
                        style={styles.gambarKreasi}
                        resizeMode="cover"
                      />

                      <Text style={styles.namaKreasi}>
                        {item.nama}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>

            <Pressable
              style={styles.tombolSelesai}
              onPress={() => setPopupTerbuka(false)}
            >
              <Text style={styles.teksTombolSelesai}>
                Selesai
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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

  // INFORMASI ANORGANIK
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
    lineHeight: 16,
    textAlign: "left",
  },

  // DAFTAR KATEGORI
  daftarKategori: {
    gap: 12,
  },

  kartuKategori: {
    backgroundColor: COLOR.forestEmerald,
    borderRadius: 14,
    padding: 10,
  },

  headerKategori: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  nomorKategori: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLOR.white,
    alignItems: "center",
    justifyContent: "center",
  },

  teksNomor: {
    ...TEXT.smallText,
    color: COLOR.forestEmerald,
    fontWeight: "bold",
  },

  namaKategori: {
    ...TEXT.descriptiveText,
    color: COLOR.white,
    fontWeight: "bold",
  },

  daftarSolusi: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  // KARTU SOLUSI
  kartuSolusi: {
    width: "48%",
    backgroundColor: COLOR.white,
    borderRadius: 9,
    overflow: "hidden",
  },

  kartuDitekan: {
    opacity: 0.8,
  },

  gambarSolusi: {
    width: "100%",
    height: 88,
  },

  footerSolusi: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    paddingVertical: 5,
    gap: 3,
  },

  teksSolusi: {
    ...TEXT.smallText,
    color: COLOR.forestEmerald,
    fontWeight: "bold",
    flex: 1,
    lineHeight: 13,
  },

  tombolPanah: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLOR.emeraldGreen,
    alignItems: "center",
    justifyContent: "center",
  },

  // POPUP
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },

  popup: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: COLOR.forestEmerald,
    borderRadius: 22,
    padding: 12,
  },

  headerPopup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  judulPopup: {
    ...TEXT.bodyText,
    color: COLOR.white,
    flex: 1,
    textAlign: "center",
  },

  tombolTutup: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLOR.white,
    alignItems: "center",
    justifyContent: "center",
  },

  subjudulPopup: {
    ...TEXT.smallText,
    color: COLOR.white,
    textAlign: "center",
    lineHeight: 17,
    marginBottom: 12,
  },

  scrollPopup: {
    flexGrow: 0,
  },

  isiPopup: {
    paddingBottom: 5,
  },

  kartuLangkah: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  gambarLangkah: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },

  infoLangkah: {
    flex: 1,
  },

  nomorLangkah: {
    ...TEXT.smallText,
    color: COLOR.secondaryWhite,
    marginBottom: 3,
  },

  judulLangkah: {
    ...TEXT.descriptiveText,
    color: COLOR.white,
    fontWeight: "bold",
    marginBottom: 3,
  },

  deskripsiLangkah: {
    ...TEXT.smallText,
    color: COLOR.white,
    lineHeight: 15,
  },

  bagianContoh: {
    backgroundColor: COLOR.secondaryWhite,
    borderRadius: 16,
    padding: 10,
    marginTop: 5,
  },

  judulContoh: {
    ...TEXT.descriptiveText,
    color: COLOR.deepForestGreen,
    fontWeight: "bold",
  },

  deskripsiContoh: {
    ...TEXT.smallText,
    color: COLOR.deepForestGreen,
    marginTop: 4,
    marginBottom: 10,
  },

  daftarKreasi: {
    gap: 10,
  },

  kartuKreasi: {
    width: 118,
    backgroundColor: COLOR.forestEmerald,
    borderRadius: 10,
    padding: 7,
    alignItems: "center",
  },

  gambarKreasi: {
    width: "100%",
    height: 100,
    borderRadius: 7,
  },

  namaKreasi: {
    ...TEXT.smallText,
    color: COLOR.white,
    textAlign: "center",
    marginTop: 6,
  },

  tombolSelesai: {
    backgroundColor: COLOR.emeraldGreen,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  teksTombolSelesai: {
    ...TEXT.bodyText,
    color: COLOR.white,
    fontWeight: "bold",
  },
});
