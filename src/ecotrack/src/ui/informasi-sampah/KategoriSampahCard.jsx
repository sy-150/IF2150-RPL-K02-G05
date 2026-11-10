
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import { COLOR, TEXT } from "@/ui/theme";
import MetodeSolusiCard from "./MetodeSolusiCard";

const DAFTAR_METODE = [
  {
    id: "dibuang",
    judul: "Dibuang ke Tempat Sampah",
  },
  {
    id: "kreasi",
    judul: "Kreasikan Menjadi Barang Baru",
  },
  {
    id: "gunakan",
    judul: "Gunakan Ulang untuk Tujuan Lain",
  },
];

export default function KategoriSampahCard({
  tipe,
  nomor,
  gambarMetode,
  onPilihMetode,
}) {
  // Ambil metode yang tersedia pada masing-masing tipe sampah.
  const metodeTersedia = DAFTAR_METODE.filter(
    (metode) =>
      tipe[metode.id] !== undefined &&
      tipe[metode.id] !== null
  );

  return (
    <View style={styles.kartuKategori}>
      {/* Header kategori */}
      <View style={styles.header}>
        <View style={styles.nomor}>
          <Text style={styles.teksNomor}>
            {nomor}
          </Text>
        </View>

        <Text style={styles.namaKategori}>
          {tipe.nama}
        </Text>
      </View>

      {/* Daftar metode solusi */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daftarMetode}
        nestedScrollEnabled
      >
        {metodeTersedia.map((metode) => {
          const konten = tipe[metode.id];

          // Metode aktif jika memiliki minimal satu langkah.
          const tersedia =
            Array.isArray(konten.langkah) &&
            konten.langkah.length > 0;

          return (
            <MetodeSolusiCard
              key={metode.id}
              judul={
                metode.id === "dibuang"
                  ? `Dibuang ke Sampah ${
                      tipe.jenisSampah === "organik"
                        ? "Organik"
                        : tipe.jenisSampah === "anorganik"
                          ? "Anorganik"
                          : tipe.jenisSampah === "residu"
                            ? "Residu"
                            : "Campuran"
                    }`
                  : metode.judul
              }
              gambar={gambarMetode(
                tipe.idTipe,
                metode.id
              )}
              tersedia={tersedia}
              onPress={() =>
                onPilihMetode(tipe, metode.id)
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  kartuKategori: {
    backgroundColor: COLOR.forestEmerald,
    borderRadius: 14,
    padding: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  nomor: {
    width: 26,
    height: 26,
    borderRadius: 13,
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

  daftarMetode: {
    flexDirection: "row",
    gap: 10,
    paddingRight: 4,
  },
});
