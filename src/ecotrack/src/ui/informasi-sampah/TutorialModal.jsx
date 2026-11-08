
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
    ["kreasi", "gunakan"].includes(data.metode) &&
    Array.isArray(data.konten?.contohHasil) &&
    data.konten.contohHasil.length > 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
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

            <Pressable
              style={styles.tombolTutup}
              onPress={onClose}
              hitSlop={10}
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

            {tampilkanContoh && (
              <ContohHasilKreasi
                data={data.konten.contohHasil}
                getImage={getImage}
              />
            )}
          </ScrollView>

          {/* TOMBOL SELESAI */}

          <Pressable
            style={styles.tombolSelesai}
            onPress={onClose}
          >
            <Text style={styles.teksSelesai}>
              Selesai
            </Text>
          </Pressable>
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

  tombolSelesai: {
    backgroundColor: COLOR.emeraldGreen,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  teksSelesai: {
    ...TEXT.bodyText,
    color: COLOR.white,
    fontWeight: "bold",
  },
});
