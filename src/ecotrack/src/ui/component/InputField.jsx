// Kolom input EcoTrack: label di atas, kotak putih bergaris hijau membulat.
// Dipakai di Login, Sign Up, Edit Profil, dan Ubah Kata Sandi.
//
// Props:
//   label         teks di atas kolom, misalnya "Email".
//   value         isi kolom (disimpan di state halaman).
//   onChangeText  dipanggil setiap teks berubah, menerima teks terbaru.
//   placeholder   teks petunjuk, misalnya "Masukkan Email".
//   error         (opsional) pesan error. Kalau diisi: garis merah, teks merah,
//                 dan ikon (!) + pesan merah di bawah kolom (I26, I27).
//                 Kosongkan ('' / null) untuk menghapus error.
//   sandi         true = isi kolom disembunyikan (kata sandi).
//   keyboardType  'default' | 'email-address' | 'numeric' | 'phone-pad'.
//                 Untuk 'email-address', huruf pertama otomatis tidak dikapitalkan.
//   terkunci      true = latar abu-abu + ikon gembok, tidak bisa diedit (Wilayah Tugas di I16).
//   style         style tambahan untuk pembungkus (label + kolom + pesan).
//   ...lainnya    prop TextInput lain diteruskan, misalnya maxLength={16} untuk NIK.
//
// Contoh:
//   <InputField label="Email" placeholder="Masukkan Email" value={email}
//     onChangeText={setEmail} keyboardType="email-address" error={errorEmail} />
//   <InputField label="Kata Sandi" placeholder="Masukkan kata sandi" value={password}
//     onChangeText={setPassword} sandi error="Kata sandi wajib diisi" />
//   <InputField label="NIK" placeholder="Masukkan NIK" value={nik}
//     onChangeText={setNik} keyboardType="numeric" maxLength={16} />
//   <InputField label="Wilayah Tugas" value="Lebak Siliwangi" terkunci />

import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLOR, TEXT } from '@/ui/theme';

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  sandi = false,
  keyboardType = 'default',
  terkunci = false,
  style,
  ...lainnya
}) {
  const adaError = Boolean(error) && !terkunci;
  const warnaTeks = adaError ? COLOR.redBright : COLOR.forestEmerald;

  return (
    <View style={[styles.pembungkus, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.kotak,
          adaError && styles.kotakError,
          terkunci && styles.kotakTerkunci,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={warnaTeks}
          secureTextEntry={sandi}
          keyboardType={keyboardType}
          autoCapitalize={keyboardType === 'email-address' || sandi ? 'none' : 'sentences'}
          autoCorrect={false}
          editable={!terkunci}
          style={[styles.input, { color: terkunci ? COLOR.oceanGreen : warnaTeks }]}
          accessibilityLabel={label ?? placeholder}
          accessibilityState={{ disabled: terkunci }}
          accessibilityHint={adaError ? error : undefined}
          {...lainnya}
        />
        {terkunci ? <MaterialIcons name="lock" size={16} color={COLOR.oceanGreen} /> : null}
      </View>

      {adaError ? (
        <View style={styles.barisError} accessibilityLiveRegion="polite">
          <MaterialIcons name="error-outline" size={14} color={COLOR.redBright} />
          <Text style={styles.pesanError}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pembungkus: {
    gap: 6,
  },
  label: {
    ...TEXT.descriptiveText,
    color: COLOR.black,
  },
  kotak: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLOR.forestEmerald,
    backgroundColor: COLOR.white,
  },
  kotakError: {
    borderColor: COLOR.redBright,
  },
  kotakTerkunci: {
    borderColor: COLOR.secondaryWhite,
    backgroundColor: COLOR.secondaryWhite,
  },
  input: {
    flex: 1,
    height: '100%',
    ...TEXT.descriptiveText,
    paddingVertical: 0,
  },
  barisError: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pesanError: {
    flex: 1,
    ...TEXT.descriptiveText,
    color: COLOR.redBright,
  },
});
