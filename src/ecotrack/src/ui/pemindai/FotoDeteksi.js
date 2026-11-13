import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const WARNA = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7", "#14b8a6"];

function warnaKelas(kelas) {
  let h = 0;
  for (const c of String(kelas)) h = (h * 31 + c.charCodeAt(0)) % 997;
  return WARNA[h % WARNA.length];
}

// Setiap deteksi dari Worker: { nama, idSampah, idTipe, namaSampah, namaTipe, jenisSampah,
//   kotak: [ymin, xmin, ymax, xmax] } dengan koordinat dinormalisasi 0 sampai 1000.
export default function FotoDeteksi({
  dataUri,
  lebar,
  tinggi,
  deteksi,
  terpilih,
  onPilih,
}) {
  const [area, setArea] = useState({ w: 0, h: 0 });

  // Foto ditampilkan "contain", jadi hitung ukuran dan posisi foto yang sebenarnya
  const skala = area.w && area.h ? Math.min(area.w / lebar, area.h / tinggi) : 0;
  const offsetX = (area.w - lebar * skala) / 2;
  const offsetY = (area.h - tinggi * skala) / 2;
  const fotoW = lebar * skala;
  const fotoH = tinggi * skala;

  return (
    <View
      style={{ flex: 1, backgroundColor: "#000" }}
      onLayout={(e) =>
        setArea({
          w: e.nativeEvent.layout.width,
          h: e.nativeEvent.layout.height,
        })
      }
    >
      <Image
        source={{ uri: dataUri }}
        style={StyleSheet.absoluteFill}
        resizeMode="contain"
      />
      {skala > 0 &&
        deteksi.map((d, i) => {
          const [y0, x0, y1, x1] = d.kotak;
          const warna = warnaKelas(d.idSampah);
          const aktif = terpilih === i;
          return (
            <Pressable
              key={i}
              onPress={() => onPilih(i)}
              style={{
                position: "absolute",
                left: offsetX + (x0 / 1000) * fotoW,
                top: offsetY + (y0 / 1000) * fotoH,
                width: ((x1 - x0) / 1000) * fotoW,
                height: ((y1 - y0) / 1000) * fotoH,
                borderWidth: aktif ? 4 : 2,
                borderColor: warna,
                backgroundColor: aktif ? warna + "55" : "transparent",
                borderRadius: 6,
              }}
            >
              <View
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: warna,
                  paddingHorizontal: 6,
                  borderBottomRightRadius: 4,
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
                  {d.nama}
                </Text>
              </View>
            </Pressable>
          );
        })}
    </View>
  );
}