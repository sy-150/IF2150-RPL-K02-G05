
const dummyInformasiSampah = [
  {
    idSampah: "plastik",
    nama: "Plastik",
    ringkasan: "Botol plastik, wadah plastik, kantung plastik.",
    gambar: require("../../assets/images/informasi-sampah/plastik.png"),
    contoh: ["Botol minuman", "Wadah makanan", "Kantong plastik"],
    caraDaurUlang: [
      "Pisahkan sampah plastik dari jenis sampah lainnya.",
      "Bersihkan sisa makanan atau minuman.",
      "Keringkan sebelum dikumpulkan.",
      "Setorkan ke tempat pengumpulan atau fasilitas daur ulang."
    ],
    barcode: [],
    labelModel: []
  },
  {
    idSampah: "kaca",
    nama: "Kaca",
    ringkasan: "Botol kaca, gelas kaca, gelas kaca",
    gambar: require("../../assets/images/informasi-sampah/kaca.png"),
    contoh: ["Botol kaca", "Gelas kaca", "Toples"],
    caraDaurUlang: [
      "Pisahkan kaca dari sampah lainnya.",
      "Bersihkan sisa isi atau kotoran.",
      "Tangani pecahan kaca dengan hati-hati.",
      "Setorkan ke fasilitas daur ulang kaca."
    ],
    barcode: [],
    labelModel: []
  },
  {
    idSampah: "aluminium",
    nama: "Aluminium",
    ringkasan: "Perkakas dapur, kaleng minuman, kabel/kawat aluminium",
    gambar: require("../../assets/images/informasi-sampah/aluminium.png"),
    contoh: ["Kaleng minuman", "Kaleng makanan", "Aluminium foil"],
    caraDaurUlang: [
      "Pisahkan aluminium dari sampah lainnya.",
      "Kosongkan dan bersihkan wadah.",
      "Keringkan sebelum dikumpulkan.",
      "Setorkan ke tempat daur ulang logam."
    ],
    barcode: [],
    labelModel: []
  },
  {
    idSampah: "stainless-steel",
    nama: "Stainless Steel",
    ringkasan: "Perkakas dapur, sisa konstruksi, komponen elektronik",
    gambar: require("../../assets/images/informasi-sampah/steel.png"),
    contoh: ["Sendok", "Panci", "Peralatan dapur"],
    caraDaurUlang: [
      "Pisahkan barang stainless steel.",
      "Lepaskan komponen nonlogam jika memungkinkan.",
      "Bersihkan dari kotoran.",
      "Setorkan ke fasilitas daur ulang logam."
    ],
    barcode: [],
    labelModel: []
  },
  {
    idSampah: "silikon",
    nama: "Silikon",
    ringkasan: "Spatula, wadah silikon, casing HP, dot bayi",
    gambar: require("../../assets/images/informasi-sampah/silikon.png"),
    contoh: ["Cetakan kue", "Spatula", "Alas silikon"],
    caraDaurUlang: [
      "Pisahkan silikon dari sampah lainnya.",
      "Bersihkan dari sisa makanan atau kotoran.",
      "Periksa fasilitas yang menerima limbah silikon.",
      "Setorkan ke pengolah khusus jika tersedia."
    ],
    barcode: [],
    labelModel: []
  },
  {
    idSampah: "keramik",
    nama: "Keramik",
    ringkasan: "Piring, mangkuk, aksesoris keramik, ubi/keramik lantai",
    gambar: require("../../assets/images/informasi-sampah/keramik.png"),
    contoh: ["Piring", "Mangkuk", "Ubin", "Pot"],
    caraDaurUlang: [
      "Pisahkan keramik dari sampah lainnya.",
      "Tangani pecahan dengan hati-hati.",
      "Pisahkan material campuran jika memungkinkan.",
      "Cari fasilitas pengolahan limbah keramik."
    ],
    barcode: [],
    labelModel: []
  }
];

export default dummyInformasiSampah;
