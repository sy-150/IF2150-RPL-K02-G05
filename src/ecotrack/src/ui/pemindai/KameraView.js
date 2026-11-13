import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import usePemindaiController from "@/controller/PemindaiController";
import { COLOR } from "@/ui/theme";
import FotoDeteksi from "./FotoDeteksi";

const HIJAU = COLOR.forestEmerald;

const LABEL_JENIS = {
  anorganik: "Anorganik",
  organik: "Organik",
  campuran: "Campuran",
  "limbah-cair": "Limbah Cair",
};

const tombolBulat = {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "rgba(0,0,0,0.5)",
  alignItems: "center",
  justifyContent: "center",
};

export default function KameraView({ onTutup, onBukaDetail }) {
  const [izin, mintaIzin] = useCameraPermissions();
  // semua hook harus dipanggil SEBELUM early return
  const [manualVisible, setManualVisible] = useState(false);
  const [kodeManual, setKodeManual] = useState("");
  const {
    cameraRef,
    mode,
    setMode,
    loading,
    hasil,
    terpilih,
    barcode,
    tidakTerdaftar,
    torch,
    setTorch,
    pilih,
    identifikasi,
    onBarcodeScanned,
    cariKode,
    scanLagi,
    pindaiLagi,
  } = usePemindaiController();

  if (!izin) return <View style={{ flex: 1, backgroundColor: "#000" }} />;

  if (!izin.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 24,
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ color: "#000", fontSize: 16 }}>
          Aplikasi butuh izin kamera untuk mengidentifikasi sampah.
        </Text>
        <Pressable
          onPress={mintaIzin}
          style={{
            backgroundColor: "#2563eb",
            padding: 14,
            borderRadius: 8,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Izinkan Kamera
          </Text>
        </Pressable>
      </View>
    );
  }

  // Tampilan hasil: foto beku dengan kotak yang bisa diketuk
  if (hasil) {
    const dipilih = terpilih !== null ? hasil.deteksi[terpilih] : null;
    return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <FotoDeteksi
          dataUri={hasil.dataUri}
          lebar={hasil.lebar}
          tinggi={hasil.tinggi}
          deteksi={hasil.deteksi}
          terpilih={terpilih}
          onPilih={pilih}
        />
        <View style={{ padding: 16, paddingBottom: 32, backgroundColor: "#111" }}>
          {hasil.deteksi.length === 0 ? (
            <Text style={{ color: "#fff", fontSize: 16 }}>{hasil.pesan}</Text>
          ) : dipilih ? (
            <>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                {dipilih.nama}
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                {[
                  dipilih.namaSampah,
                  dipilih.namaTipe,
                  LABEL_JENIS[dipilih.jenisSampah],
                ]
                  .filter(Boolean)
                  .map((t, i) => (
                    <View
                      key={t}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 12,
                        backgroundColor: i === 0 ? HIJAU : "#2a2a2a",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 12 }}>{t}</Text>
                    </View>
                  ))}
              </View>
              <Pressable
                onPress={() => onBukaDetail?.(dipilih.idSampah)}
                style={{
                  backgroundColor: HIJAU,
                  padding: 14,
                  borderRadius: 10,
                  marginTop: 14,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Lihat Cara Daur Ulang
                </Text>
              </Pressable>
            </>
          ) : (
            <Text style={{ color: "#fff", fontSize: 16 }}>
              Terdeteksi {hasil.deteksi.length} objek. Ketuk kotak pada gambar
              untuk melihat detailnya.
            </Text>
          )}
          <Pressable
            onPress={pindaiLagi}
            style={{
              backgroundColor: "#2563eb",
              padding: 14,
              borderRadius: 8,
              marginTop: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Pindai Lagi</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ---------- Tampilan kamera langsung ----------
  const modeBarcode = mode === "barcode";

  // "botol-plastik" -> "Botol Plastik"
  const rapikan = (t) =>
    String(t ?? "")
      .split("-")
      .filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  // tipe yang cocok dengan idTipe pada barcode (mis. "botol-plastik")
  const tipe = barcode?.info?.tipe?.find(
    (t) => t.idTipe === barcode.produk.idTipe
  );

  // chip: jenis (Plastik), tipe (Botol Plastik), jenisSampah (Anorganik)
  const tags = barcode
    ? [
        ...new Set(
          [
            barcode.info?.nama ?? rapikan(barcode.produk.idSampah),
            tipe?.nama ?? rapikan(barcode.produk.idTipe),
            rapikan(barcode.info?.jenisSampah),
          ].filter(Boolean)
        ),
      ]
    : [];

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        enableTorch={modeBarcode && torch}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13", "ean8", "code128", "upc_a"],
        }}
        onBarcodeScanned={
          modeBarcode && !barcode && !tidakTerdaftar && !loading
            ? onBarcodeScanned
            : undefined
        }
      />

      {/* Header */}
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 16,
          right: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {onTutup ? (
          <Pressable onPress={onTutup} style={tombolBulat}>
            <Ionicons name="close" size={20} color="#fff" />
          </Pressable>
        ) : (
          <View style={{ width: 36 }} />
        )}
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          {modeBarcode ? "Pindai Barcode" : "Pindai Sampah"}
        </Text>
        {modeBarcode ? (
          <Pressable onPress={() => setTorch(!torch)} style={tombolBulat}>
            <Ionicons
              name={torch ? "flash" : "flash-outline"}
              size={18}
              color="#fff"
            />
          </Pressable>
        ) : (
          <View style={{ width: 36 }} />
        )}
      </View>

      {/* Bingkai pemindai */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          alignSelf: "center",
          top: modeBarcode ? "34%" : "16%",
          width: modeBarcode ? "78%" : "82%",
          height: modeBarcode ? 150 : "48%",
          justifyContent: "center",
        }}
      >
        {modeBarcode && !barcode ? (
          <View style={{ height: 2, backgroundColor: HIJAU, marginHorizontal: 8 }} />
        ) : null}
      </View>

      {/* Label petunjuk */}
      {!barcode ? (
        <View
          style={{
            position: "absolute",
            bottom: modeBarcode ? 190 : 170,
            alignSelf: "center",
            paddingHorizontal: 14,
            height: 34,
            borderRadius: 16,
            backgroundColor: HIJAU,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>
            {modeBarcode
              ? "Arahkan kamera ke barcode pada kemasan"
              : "Arahkan kamera ke sampah"}
          </Text>
        </View>
      ) : null}

      {/* Tombol rana (mode sampah) / ketik kode (mode barcode) */}
      {!barcode ? (
        <View
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            alignItems: "center",
          }}
        >
          {modeBarcode ? (
            <Pressable
              onPress={() => setManualVisible(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                backgroundColor: "rgba(0,0,0,0.6)",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 20,
              }}
            >
              <Ionicons name="keypad-outline" size={16} color="#fff" />
              <Text style={{ color: "#fff", fontSize: 13 }}>Ketik kode barcode</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={identifikasi}
              disabled={loading}
              style={{
                width: 76,
                height: 76,
                borderRadius: 38,
                backgroundColor: loading ? "#888" : "#fff",
                borderWidth: 4,
                borderColor: "#ddd",
              }}
            />
          )}
        </View>
      ) : null}

      {/* Toggle Sampah | Barcode */}
      {!barcode ? (
        <View
          style={{
            position: "absolute",
            bottom: 32,
            alignSelf: "center",
            flexDirection: "row",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 24,
            padding: 4,
          }}
        >
          {[
            { id: "sampah", label: "Sampah", icon: "camera-outline" },
            { id: "barcode", label: "Barcode", icon: "scan-outline" },
          ].map((t) => {
            const aktif = mode === t.id;
            return (
              <Pressable
                key={t.id}
                onPress={() => setMode(t.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 18,
                  paddingVertical: 10,
                  borderRadius: 20,
                  backgroundColor: aktif ? "#fff" : "transparent",
                }}
              >
                <Ionicons name={t.icon} size={16} color={aktif ? HIJAU : "#fff"} />
                <Text
                  style={{
                    color: aktif ? HIJAU : "#fff",
                    fontWeight: "bold",
                    fontSize: 13,
                  }}
                >
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}

      {loading ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : null}

      {/* Bottom sheet: barcode ditemukan */}
      {barcode ? (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
            paddingBottom: 32,
            backgroundColor: "#fff",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        >
          <Text style={{ color: HIJAU, fontSize: 11, fontWeight: "bold" }}>
            BARCODE {barcode.data}
          </Text>
          <Text
            style={{ color: "#111", fontSize: 18, fontWeight: "bold", marginTop: 4 }}
          >
            {barcode.produk.namaProduk}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
            {tags.map((t, i) => (
              <View
                key={t}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                  backgroundColor: i === 0 ? HIJAU : "#eef2ee",
                }}
              >
                <Text style={{ color: i === 0 ? "#fff" : "#333", fontSize: 12 }}>
                  {t}
                </Text>
              </View>
            ))}
          </View>
          <Pressable
            onPress={() => onBukaDetail?.(barcode.produk.idSampah)}
            style={{
              backgroundColor: HIJAU,
              padding: 14,
              borderRadius: 10,
              marginTop: 16,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Lihat Cara Daur Ulang
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </Pressable>
          <Pressable
            onPress={scanLagi}
            style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14 }}
          >
            <Ionicons name="scan-outline" size={16} color={HIJAU} />
            <Text style={{ color: HIJAU, fontWeight: "bold" }}>Pindai lagi</Text>
          </Pressable>
        </View>
      ) : null}

      {/* Modal: barcode belum terdaftar (hanya pesan, tanpa tambah data) */}
      <Modal
        visible={!!tidakTerdaftar}
        transparent
        animationType="fade"
        onRequestClose={scanLagi}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 24,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: HIJAU,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="scan-outline" size={24} color="#fff" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 14, color: "#111" }}>
              Barcode Belum Terdaftar
            </Text>
            <Text style={{ color: "#555", textAlign: "center", marginTop: 8 }}>
              Kode {tidakTerdaftar} belum ada di database kami.
            </Text>
            <Pressable
              onPress={scanLagi}
              style={{
                backgroundColor: HIJAU,
                paddingVertical: 12,
                borderRadius: 10,
                marginTop: 18,
                alignSelf: "stretch",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Modal: ketik kode manual */}
      <Modal
        visible={manualVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setManualVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <View style={{ backgroundColor: "#fff", borderRadius: 20, padding: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#111" }}>
              Ketik kode barcode
            </Text>
            <TextInput
              value={kodeManual}
              onChangeText={setKodeManual}
              keyboardType="number-pad"
              placeholder="Contoh: 8991234567890"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                padding: 12,
                marginTop: 12,
                color: "#111",
              }}
            />
            <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
              <Pressable
                onPress={() => setManualVisible(false)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: HIJAU,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: HIJAU, fontWeight: "bold" }}>Batal</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  const kode = kodeManual.trim();
                  if (!kode) return;
                  setManualVisible(false);
                  setKodeManual("");
                  cariKode(kode);
                }}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: HIJAU,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Cari</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}