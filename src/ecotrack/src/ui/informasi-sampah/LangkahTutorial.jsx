
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { COLOR, TEXT } from "@/ui/theme";

export default function LangkahTutorial({
  nomor,
  judul,
  keterangan,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.nomor}>
        <Text style={styles.teksNomor}>
          {nomor}
        </Text>
      </View>

      <View style={styles.informasi}>
        <Text style={styles.judul}>
          {judul}
        </Text>

        <Text style={styles.keterangan}>
          {keterangan}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 18,
  },

  nomor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLOR.white,
    alignItems: "center",
    justifyContent: "center",
  },

  teksNomor: {
    ...TEXT.bodyText,
    color: COLOR.forestEmerald,
    fontWeight: "bold",
  },

  informasi: {
    flex: 1,
    paddingTop: 2,
  },

  judul: {
    ...TEXT.descriptiveText,
    color: COLOR.white,
    fontWeight: "bold",
    marginBottom: 4,
  },

  keterangan: {
    ...TEXT.smallText,
    color: COLOR.secondaryWhite,
    lineHeight: 17,
  },
});
