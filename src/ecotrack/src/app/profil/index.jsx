import React, { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Pressable, Modal } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { TEXT, COLOR } from '@/ui/theme';
import Header from "@/ui/component/Header";
import InputField from "@/ui/component/InputField";
import Button from "@/ui/component/Button";
import { toast } from "@/ui/component/Toast";
import { AkunPetugas } from '@/model/AkunPetugas';
import { AkunPetugasController } from '@/controller/AkunPetugasController';

export default function ProfilPage() {
  const router = useRouter();

  // Mengambil data profil yang sedang login dari memori lokal (Model)
  const profil = AkunPetugas.getProfil();

  // State untuk Edit Profil
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(profil.email);
  const [noTelepon, setNoTelepon] = useState(profil.noTelepon);

  // State untuk Modals
  const [modalLogout, setModalLogout] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

  // State untuk Ubah Kata Sandi
  const [passLama, setPassLama] = useState('');
  const [passBaru, setPassBaru] = useState('');
  const [passKonfirm, setPassKonfirm] = useState('');
  const [errorPass, setErrorPass] = useState({});

  // Handler Edit Profil
  const handleSimpanProfil = async () => {
    if (!email || !noTelepon) {
      toast.gagal("Email dan No. Telepon wajib diisi");
      return;
    }

    const status = await AkunPetugasController.editProfil(email, noTelepon);
    if (status === 'BERHASIL') {
      toast.berhasil("Profil berhasil diperbarui");
      setIsEditing(false);
    } else {
      toast.gagal("Profil gagal diperbarui");
    }
  };

  // Handler Logout
  const handleLogout = async () => {
    await AkunPetugasController.logout();
    setModalLogout(false);
    router.replace('/(auth)/login');
  };

  // Handler Ganti Kata Sandi
  const handleGantiPassword = async () => {
    setErrorPass({});

    if (!passLama || !passBaru || !passKonfirm) {
      setErrorPass({ umum: "Semua kolom sandi wajib diisi" });
      return;
    }
    if (passBaru !== passKonfirm) {
      setErrorPass({ konfirm: "Konfirmasi kata sandi tidak sama" });
      return;
    }

    const status = await AkunPetugasController.changePassword(passLama, passBaru);

    if (status === 'BERHASIL') {
      toast.berhasil("Kata sandi berhasil diperbarui");
      setModalPassword(false);
      setPassLama('');
      setPassBaru('');
      setPassKonfirm('');
    } else if (status === 'KREDENSIAL_LAMA_SALAH') {
      setErrorPass({ lama: "Kata sandi lama salah" });
    } else {
      toast.gagal("Kata sandi gagal diperbarui");
    }
  };

  return (
    <View style={styles.halaman}>
      <Header judul="Profil Petugas" tampilKembali style={styles.header} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* KARTU PROFIL UTAMA (I15 & I16) */}
        <View style={styles.kartuProfil}>
          <View style={styles.avatarWrapper}>
            <MaterialIcons name="account-circle" size={80} color={COLOR.forestEmerald} />
          </View>
          <Text style={styles.namaText}>{profil.username}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Petugas Kebersihan</Text>
          </View>

          {/* Pemisah Mode Edit dan Lihat */}
          {!isEditing ? (
            <View style={styles.infoWrapper}>
              {/* Baris Email */}
              <View style={styles.infoRow}>
                <MaterialIcons name="email" size={20} color={COLOR.forestEmerald} style={styles.infoIcon} />
                <View style={styles.infoTextWrapper}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{profil.email}</Text>
                </View>
              </View>

              {/* Baris No Telepon */}
              <View style={styles.infoRow}>
                <MaterialIcons name="phone" size={20} color={COLOR.forestEmerald} style={styles.infoIcon} />
                <View style={styles.infoTextWrapper}>
                  <Text style={styles.infoLabel}>No. Telepon</Text>
                  <Text style={styles.infoValue}>{profil.noTelepon}</Text>
                </View>
              </View>

              {/* Baris Wilayah Tugas */}
              <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                <MaterialIcons name="location-on" size={20} color={COLOR.forestEmerald} style={styles.infoIcon} />
                <View style={styles.infoTextWrapper}>
                  <Text style={styles.infoLabel}>Wilayah Tugas</Text>
                  <Text style={styles.infoValue}>{profil.wilayahTugas}</Text>
                </View>
              </View>

              <Button label="EDIT PROFIL" icon="edit" onPress={() => setIsEditing(true)} />
            </View>
          ) : (
            <View style={styles.formWrapper}>
              <InputField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
              <InputField label="No. Telepon" value={noTelepon} onChangeText={setNoTelepon} keyboardType="phone-pad" />
              <InputField label="Wilayah Tugas" value={profil.wilayahTugas} terkunci />

              <View style={styles.barisTombol}>
                <Pressable
                  style={[styles.btnSetengah, styles.btnBatal]}
                  onPress={() => {
                    setIsEditing(false);
                    setEmail(profil.email);
                    setNoTelepon(profil.noTelepon);
                  }}
                >
                  <Text style={styles.btnBatalText}>BATAL</Text>
                </Pressable>
                <Pressable
                  style={[styles.btnSetengah, styles.btnSimpan]}
                  onPress={handleSimpanProfil}
                >
                  <Text style={styles.btnSimpanText}>SIMPAN</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>

        {/* MENU TAMBAHAN (Sembunyikan saat sedang mode edit) */}
        {!isEditing && (
          <>
            {/* Tombol Ganti Kata Sandi */}
            <Pressable style={styles.kartuMenu} onPress={() => setModalPassword(true)}>
              <MaterialIcons name="lock" size={20} color={COLOR.forestEmerald} />
              <Text style={styles.kartuMenuText}>Ganti Kata Sandi</Text>
              <MaterialIcons name="chevron-right" size={24} color={COLOR.black} />
            </Pressable>

            {/* Tombol Keluar Akun */}
            <Pressable style={styles.btnKeluar} onPress={() => setModalLogout(true)}>
              <Text style={styles.btnKeluarText}>KELUAR AKUN</Text>
            </Pressable>
          </>
        )}
      </ScrollView>

      {/* POP UP UBAH KATA SANDI (I20) */}
      <Modal visible={modalPassword} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconBox}>
              <MaterialIcons name="lock" size={24} color={COLOR.forestEmerald} />
            </View>
            <Text style={styles.modalTitle}>Ubah Kata Sandi</Text>
            <Text style={styles.modalDesc}>Ganti kata sandi Anda untuk meningkatkan keamanan akun Anda</Text>

            <View style={{ width: '100%', gap: 12, marginBottom: 20 }}>
              {errorPass.umum && <Text style={{ color: COLOR.redBright, fontSize: 12 }}>{errorPass.umum}</Text>}
              <InputField
                label="Kata Sandi Lama"
                placeholder="Masukkan kata sandi lama"
                value={passLama}
                onChangeText={setPassLama}
                sandi
                error={errorPass.lama}
              />
              <InputField
                label="Kata Sandi Baru"
                placeholder="Masukkan kata sandi baru"
                value={passBaru}
                onChangeText={setPassBaru}
                sandi
              />
              <InputField
                label="Konfirmasi Kata Sandi Baru"
                placeholder="Masukkan kata sandi baru"
                value={passKonfirm}
                onChangeText={setPassKonfirm}
                sandi
                error={errorPass.konfirm}
              />
            </View>

            <View style={styles.barisTombol}>
              <Pressable
                style={[styles.btnSetengah, styles.btnBatal]}
                onPress={() => {
                  setModalPassword(false);
                  setPassLama('');
                  setPassBaru('');
                  setPassKonfirm('');
                  setErrorPass({});
                }}
              >
                <Text style={styles.btnBatalText}>BATAL</Text>
              </Pressable>
              <Pressable
                style={[styles.btnSetengah, styles.btnSimpan]}
                onPress={handleGantiPassword}
              >
                <Text style={styles.btnSimpanText}>SIMPAN</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* POP UP KELUAR AKUN (I19) */}
      <Modal visible={modalLogout} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={[styles.modalIconBox, { backgroundColor: '#FDECEC' }]}>
              <MaterialIcons name="logout" size={24} color={COLOR.redBright} />
            </View>
            <Text style={styles.modalTitle}>Keluar Akun</Text>
            <Text style={styles.modalDesc}>Apakah Anda yakin hendak keluar akun ini?</Text>

            <View style={[styles.barisTombol, { flexDirection: 'column', gap: 10 }]}>
              <Pressable
                style={[styles.btnSetengah, { backgroundColor: COLOR.redBright, borderColor: COLOR.redBright, width: '100%' }]}
                onPress={handleLogout}
              >
                <Text style={[styles.btnBatalText, { color: COLOR.white }]}>Keluar</Text>
              </Pressable>
              <Pressable
                style={[styles.btnSetengah, { borderColor: COLOR.redBright, width: '100%' }]}
                onPress={() => setModalLogout(false)}
              >
                <Text style={[styles.btnBatalText, { color: COLOR.redBright }]}>Batal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  halaman: { flex: 1, backgroundColor: COLOR.secondaryWhite },
  header: { paddingBottom: 96, zIndex: 0, elevation: 0 },
  scrollView: { flex: 1, marginTop: -76, zIndex: 10, elevation: 10 },
  scrollContainer: { paddingHorizontal: 24, paddingTop: 4, gap: 16, paddingBottom: 40 },

  // KARTU PROFIL
  kartuProfil: {
    backgroundColor: COLOR.white,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatarWrapper: {
    marginBottom: 8,
  },
  namaText: { ...TEXT.titleMedium, color: COLOR.black, marginBottom: 4 },
  badge: {
    backgroundColor: '#EAEAEA',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: { ...TEXT.descriptiveText, color: COLOR.black },

  // BARIS INFO
  infoWrapper: { width: '100%', gap: 16 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.secondaryWhite,
  },
  infoIcon: { marginRight: 16 },
  infoTextWrapper: { flex: 1 },
  infoLabel: { ...TEXT.descriptiveText, color: COLOR.forestEmerald, fontSize: 12 },
  infoValue: { ...TEXT.bodyText, color: COLOR.black, marginTop: 2 },

  // FORM EDIT & TOMBOL SERAGAM
  formWrapper: { width: '100%', gap: 14 },
  barisTombol: { width: '100%', flexDirection: 'row', gap: 12, marginTop: 8 },
  btnSetengah: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  btnBatal: {
    backgroundColor: COLOR.white,
    borderColor: COLOR.forestEmerald,
  },
  btnBatalText: {
    ...TEXT.descriptiveText,
    color: COLOR.forestEmerald,
    fontWeight: '600',
  },
  btnSimpan: {
    backgroundColor: COLOR.forestEmerald,
    borderColor: COLOR.forestEmerald,
  },
  btnSimpanText: {
    ...TEXT.descriptiveText,
    color: COLOR.white,
    fontWeight: '600',
  },

  // MENU KARTU BAWAH
  kartuMenu: {
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  kartuMenuText: { flex: 1, ...TEXT.bodyText, color: COLOR.black, marginLeft: 12 },

  // TOMBOL KELUAR
  btnKeluar: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR.redBright,
    backgroundColor: COLOR.white,
    marginTop: 20,
  },
  btnKeluarText: { ...TEXT.descriptiveText, color: COLOR.redBright, fontWeight: '600' },

  // MODAL UBAH SANDI & LOGOUT
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLOR.white,
    width: '100%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  modalIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6F4EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: { ...TEXT.titleMedium, color: COLOR.black, marginBottom: 8, textAlign: 'center' },
  modalDesc: { ...TEXT.descriptiveText, color: COLOR.black, textAlign: 'center', marginBottom: 24, paddingHorizontal: 10 },
});