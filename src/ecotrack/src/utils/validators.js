export const validateEmail = (email) => {
  if (!email || email.trim() === '') return 'Email wajib diisi';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Format email tidak valid';
  return null;
};

export const validateNIK = (nik) => {
  if (!nik || nik.trim() === '') return 'NIK wajib diisi';
  if (!/^\d{16}$/.test(nik)) return 'NIK harus terdiri dari 16 digit angka';
  return null;
};

export const validatePhoneNumber = (phone) => {
  if (!phone || phone.trim() === '') return 'Nomor telepon wajib diisi';
  if (!/^(08|628|\+628)\d{8,11}$/.test(phone)) return 'Format nomor telepon tidak valid';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Kata sandi wajib diisi';
  if (password.length < 6) return 'Kata sandi minimal 6 karakter';
  return null;
};

export const validatePasswordConfirmation = (password, confirmation) => {
  if (!confirmation) return 'Konfirmasi kata sandi wajib diisi';
  if (password !== confirmation) return 'Konfirmasi kata sandi tidak sama';
  return null;
};