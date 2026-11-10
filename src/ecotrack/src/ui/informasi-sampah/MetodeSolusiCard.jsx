
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR, TEXT } from "@/ui/theme";

export default function MetodeSolusiCard({
  judul,
  gambar,
  tersedia = true,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.kartu,
        !tersedia && styles.kartuTidakTersedia,
        pressed && tersedia && styles.kartuDitekan,
      ]}
      onPress={onPress}
      disabled={!tersedia}
      accessibilityRole="button"
      accessibilityLabel={judul}
    >
      {/* Gambar metode */}
      {gambar ? (
        <Image
          source={gambar}
          style={styles.gambar}
          resizeMode="cover"
          onLoad={() => {
            console.log("[IMAGE LOADED]", judul, gambar);
          }}
          onError={(error) => {
            console.log("[IMAGE ERROR]", judul, error.nativeEvent);
          }}
        />
      ) : (
        <View style={styles.placeholder}>
          <MaterialCommunityIcons
            name="image-off-outline"
            size={32}
            color={COLOR.forestEmerald}
          />

          <Text style={styles.teksPlaceholder}>
            Gambar belum tersedia
          </Text>
        </View>
      )}

      {/* Footer kartu */}
      <View style={styles.footer}>
        <Text
          style={styles.judul}
          numberOfLines={2}
        >
          {judul}
        </Text>

        <View style={styles.tombolPanah}>
          <MaterialCommunityIcons
            name={
              tersedia
                ? "chevron-right"
                : "lock-outline"
            }
            size={20}
            color={COLOR.forestEmerald}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  kartu: {
    width: 172,
    height: 180,
    flexShrink: 0,
    backgroundColor: COLOR.white,
    borderRadius: 10,
    overflow: "hidden",
  },

  kartuDitekan: {
    opacity: 0.8,
  },

  kartuTidakTersedia: {
    opacity: 0.55,
  },

  gambar: {
    width: "100%",
    height: 108,
  },

  placeholder: {
    width: "100%",
    height: 108,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.secondaryWhite,
    gap: 4,
  },

  teksPlaceholder: {
    ...TEXT.smallText,
    color: COLOR.forestEmerald,
    textAlign: "center",
  },

  footer: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 7,
    paddingVertical: 6,
    gap: 4,
  },

  judul: {
    ...TEXT.smallText,
    color: COLOR.forestEmerald,
    fontWeight: "bold",
    flex: 1,
    lineHeight: 15,
  },

  tombolPanah: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLOR.emeraldGreen,
    alignItems: "center",
    justifyContent: "center",
  },
});
