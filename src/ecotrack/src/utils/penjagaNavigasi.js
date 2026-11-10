// Penjaga pindah tab: halaman yang punya perubahan belum disimpan (misalnya edit jadwal) bisa
// menahan perpindahan tab di NavBar dan menampilkan dialog konfirmasi lebih dulu.
//
// Pindah tab tidak menutup halaman, jadi tidak tertahan oleh usePreventRemove. Karena itu NavBar
// menanyakan penjaga ini sebelum berpindah. Hanya satu penjaga yang aktif dalam satu waktu.
//
// Pemakaian di halaman:
//   useEffect(() => {
//     if (!adaPerubahan) return;
//     return pasangPenjagaPindahTab((lanjutkan) => {
//       tampilkanDialog(lanjutkan); // panggil lanjutkan() kalau pengguna setuju pindah
//       return true;                // true = tahan dulu
//     });
//   }, [adaPerubahan]);

let penjaga = null;

// Mengembalikan fungsi untuk melepas penjaga.
export function pasangPenjagaPindahTab(fungsi) {
  penjaga = fungsi;
  return () => {
    if (penjaga === fungsi) penjaga = null;
  };
}

// Dipanggil NavBar. true = perpindahan ditahan; penjaga yang akan memanggil lanjutkan() nanti.
export function tahanPindahTab(lanjutkan) {
  return penjaga ? penjaga(lanjutkan) === true : false;
}
