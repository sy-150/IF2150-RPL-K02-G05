// Kolom pencarian EcoTrack: kotak putih membulat, ikon kaca pembesar di kiri,
// dan tombol silang di kanan (muncul kalau sudah ada teks) untuk mengosongkan kolom.
// Dipakai di header Daur Ulang (I03) dan Jadwal (I07).
//
// Props:
//   placeholder   teks petunjuk, misalnya "Cari Material Sampah" atau "Cari Kecamatan/Kelurahan".
//   value         teks yang tampil (opsional). Kalau diisi, halaman yang menyimpan state-nya.
//   onChangeText  dipanggil setiap teks berubah, menerima teks terbaru.
//   onSubmit      dipanggil saat tombol cari/enter di keyboard ditekan, menerima teks.
//   onClear       (opsional) dipanggil setelah tombol silang ditekan, misalnya untuk
//                 menampilkan lagi semua data. onChangeText('') juga tetap dipanggil.
//   style         style tambahan untuk kotaknya.
//
// Contoh (di dalam Header):
//   const [keyword, setKeyword] = useState('');
//   <Header judul="Mulai Daur Ulang" tampilProfil>
//     <SearchBar
//       placeholder="Cari Material Sampah"
//       value={keyword}
//       onChangeText={setKeyword}
//       onSubmit={(teks) => search(teks)}
//     />
//   </Header>

import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { COLOR, TEXT } from '@/ui/theme';

export default function SearchBar({ placeholder = 'Cari', value, onChangeText, onSubmit, onClear, style }) {
  const [teksLokal, setTeksLokal] = useState('');
  const teks = value ?? teksLokal;

  function ubahTeks(teksBaru) {
    if (value === undefined) setTeksLokal(teksBaru);
    onChangeText?.(teksBaru);
  }

  function hapusTeks() {
    ubahTeks('');
    onClear?.();
  }

  return (
    <View style={[styles.kotak, style]}>
      <MaterialIcons name="search" size={20} color={COLOR.forestEmerald} />
      <TextInput
        value={teks}
        onChangeText={ubahTeks}
        onSubmitEditing={() => onSubmit?.(teks)}
        placeholder={placeholder}
        placeholderTextColor={COLOR.forestEmerald}
        returnKeyType="search"
        autoCorrect={false}
        style={styles.input}
        accessibilityLabel={placeholder}
      />

      {teks.length > 0 ? (
        <Pressable
          onPress={hapusTeks}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Hapus pencarian"
        >
          <MaterialIcons name="cancel" size={18} color={COLOR.forestEmerald} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  kotak: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: COLOR.white,
  },
  input: {
    flex: 1,
    height: '100%',
    ...TEXT.descriptiveText,
    color: COLOR.forestEmerald,
    paddingVertical: 0,
  },
});
