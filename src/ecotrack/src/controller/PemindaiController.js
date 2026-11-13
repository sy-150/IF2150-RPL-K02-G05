import { useRef, useState } from "react";
import { Alert } from "react-native";
import InformasiSampahController from "@/controller/InformasiSampahController";
import { hapusFile, kirimFoto } from "@/model/sampahModel";

export default function usePemindaiController() {
  const cameraRef = useRef(null);
  const sudahScanRef = useRef(false); // kunci sinkron, state terlalu lambat untuk callback beruntun
  const [mode, setModeState] = useState("sampah"); // "sampah" | "barcode"
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(null); // { dataUri, lebar, tinggi, deteksi }
  const [terpilih, setTerpilih] = useState(null);
  const [barcode, setBarcode] = useState(null); // { type, data, produk, info }
  const [tidakTerdaftar, setTidakTerdaftar] = useState(null); // string kode, atau null
  const [torch, setTorch] = useState(false);

  const identifikasi = async () => {
    if (loading || !cameraRef.current) return;
    setLoading(true);
    let foto;
    try {
      foto = await cameraRef.current.takePictureAsync({
        quality: 0.4,
        base64: true,
      });
      const data = await kirimFoto(foto.base64);
      setHasil({
        dataUri: `data:image/jpeg;base64,${foto.base64}`,
        lebar: data.gambar?.lebar ?? foto.width,
        tinggi: data.gambar?.tinggi ?? foto.height,
        deteksi: data.deteksi ?? [],
        pesan: data.hasil,
      });
      setTerpilih(null);
    } catch (err) {
      Alert.alert("Gagal mengidentifikasi", String(err.message ?? err));
    } finally {
      if (foto?.uri) hapusFile(foto.uri); // file foto dihapus apa pun hasilnya
      setLoading(false);
    }
  };

  // dipakai oleh scan kamera DAN input kode manual
const cariKode = async (kode, type = "manual") => {
  if (sudahScanRef.current) return;
  sudahScanRef.current = true;
  console.log(`[BARCODE] terbaca: "${kode}" (tipe: ${type}, panjang: ${String(kode).length})`);
  setLoading(true);
  try {
    const produk = await InformasiSampahController.cariBarcode(kode);
    if (!produk) {
      console.log(`[BARCODE] "${kode}" TIDAK ditemukan di barcodeProduk`);
      setTidakTerdaftar(String(kode));
      return;
    }
    console.log(`[BARCODE] "${kode}" ditemukan: ${produk.namaProduk} (id dokumen: ${produk.kodeBarcode})`);
    const info = await InformasiSampahController.getDetail(produk.idSampah).catch(() => null);
    console.log(`[BARCODE] info sampah "${produk.idSampah}":`, info ? "ada" : "tidak ada");
    setBarcode({ type, data: String(kode), produk, info });
  } catch (err) {
    sudahScanRef.current = false; // gagal jaringan: boleh coba lagi
    console.log(`[BARCODE] ERROR saat mencari "${kode}":`, err);
    Alert.alert("Gagal mencari barcode", String(err.message ?? err));
  } finally {
    setLoading(false);
  }
};

  // dipasang ke <CameraView onBarcodeScanned={...} />
  const onBarcodeScanned = ({ type, data }) => {
    if (loading || hasil) return;
    cariKode(data, type);
  };

  const scanLagi = () => {
    sudahScanRef.current = false;
    setBarcode(null);
    setTidakTerdaftar(null);
  };

  const setMode = (m) => {
    scanLagi();
    setTorch(false);
    setModeState(m);
  };

  const pindaiLagi = () => {
    setHasil(null);
    setTerpilih(null);
    scanLagi();
  };

  return {
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
    pilih: setTerpilih,
    identifikasi,
    onBarcodeScanned,
    cariKode,
    scanLagi,
    pindaiLagi,
  };
}