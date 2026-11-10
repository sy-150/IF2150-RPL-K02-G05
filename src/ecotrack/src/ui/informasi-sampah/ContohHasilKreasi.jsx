
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR, TEXT } from "@/ui/theme";

export default function ContohHasilKreasi({
  data = [],
  getImage,
}) {
  // Ambil maksimal 3 contoh ilustrasi.
  const daftarContoh = Array.isArray(data)
    ? data.slice(0, 3)
    : [];

  if (daftarContoh.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>
        Contoh Hasil
      </Text>

      <Text style={styles.deskripsi}>
        Inspirasi pemanfaatan material bekas.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daftar}
      >
        {daftarContoh.map((item, index) => {
          const gambar = getImage?.(item);

          return (
            <View
              key={`${index}-${item.nama}`}
              style={styles.kartu}
            >
              {gambar ? (
                <Image
                  source={gambar}
                  style={styles.gambar}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.placeholder}>
                  <MaterialCommunityIcons
                    name="image-off-outline"
                    size={30}
                    color={COLOR.forestEmerald}
                  />

                  <Text style={styles.teksPlaceholder}>
                    Gambar belum tersedia
                  </Text>
                </View>
              )}

              <Text style={styles.nama}>
                {item.nama}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.secondaryWhite,
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
  },

  judul: {
    ...TEXT.descriptiveText,
    color: COLOR.deepForestGreen,
    fontWeight: "bold",
  },

  deskripsi: {
    ...TEXT.smallText,
    color: COLOR.deepForestGreen,
    marginTop: 4,
    marginBottom: 10,
  },

  daftar: {
    gap: 10,
  },

  kartu: {
    width: 118,
    backgroundColor: COLOR.forestEmerald,
    borderRadius: 10,
    padding: 7,
    alignItems: "center",
  },

  gambar: {
    width: "100%",
    height: 100,
    borderRadius: 7,
  },

  nama: {
    ...TEXT.smallText,
    color: COLOR.white,
    textAlign: "center",
    marginTop: 6,
  },

  placeholder: {
    width: "100%",
    height: 100,
    borderRadius: 7,
    backgroundColor: COLOR.secondaryWhite,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  teksPlaceholder: {
    ...TEXT.smallText,
    color: COLOR.forestEmerald,
    textAlign: "center",
  },
});
