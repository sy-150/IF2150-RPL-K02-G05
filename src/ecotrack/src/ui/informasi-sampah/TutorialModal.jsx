
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR, TEXT } from "@/ui/theme";

import LangkahTutorial from "./LangkahTutorial";
import ContohHasilKreasi from "./ContohHasilKreasi";

export default function TutorialModal({
  visible,
  data,
  onClose,
  getImage,
}) {
  if (!data) {
    return null;
  }

  const tampilkanContoh =
    data.metode === "kreasi" &&
    data.konten?.contohHasil?.length > 0;

  const tampilkanContohGunakan =
    data.metode === "gunakan" &&
    data.konten?.contohHasil?.length > 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        {/* AREA LUAR: KETUK UNTUK MENUTUP */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />

        {/* POPUP TUTORIAL */}
        <View style={styles.popup}>

          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.headerTeks}>
              <Text style={styles.judul}>
                {data.namaMetode}
              </Text>

              <Text style={styles.subjudul}>
                {data.namaTipe}
              </Text>
            </View>

            {/* TOMBOL SILANG */}
            <Pressable
              style={styles.tombolTutup}
              onPress={onClose}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Tutup tutorial"
            >
              <MaterialCommunityIcons
                name="close"
                size={20}
                color={COLOR.deepForestGreen}
              />
            </Pressable>
          </View>

          {/* ISI TUTORIAL */}
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.isi}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.labelLangkah}>
              LANGKAH-LANGKAH
            </Text>

            {(data.konten?.langkah ?? []).map(
              (langkah, index) => (
                <LangkahTutorial
                  key={`${index}-${langkah.judul}`}
                  nomor={index + 1}
                  judul={langkah.judul}
                  keterangan={langkah.keterangan}
                />
              )
            )}

            {/* CONTOH HASIL KREASI */}
            {(tampilkanContoh || tampilkanContohGunakan) && (
              <ContohHasilKreasi
                data={data.konten.contohHasil}
                getImage={getImage}
              />
            )}
          </ScrollView>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },

  popup: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: COLOR.forestEmerald,
    borderRadius: 22,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },

  headerTeks: {
    flex: 1,
  },

  judul: {
    ...TEXT.bodyText,
    color: COLOR.white,
    fontWeight: "bold",
  },

  subjudul: {
    ...TEXT.smallText,
    color: COLOR.secondaryWhite,
    marginTop: 4,
  },

  tombolTutup: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLOR.white,
    alignItems: "center",
    justifyContent: "center",
  },

  scroll: {
    flexGrow: 0,
  },

  isi: {
    paddingBottom: 8,
  },

  labelLangkah: {
    ...TEXT.smallText,
    color: COLOR.secondaryWhite,
    fontWeight: "bold",
    marginBottom: 14,
  },
});
