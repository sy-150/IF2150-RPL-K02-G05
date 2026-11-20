/**
 * KNF05-TC04: akurasi kategori sampah hasil pemindaian computer vision (target ≥ 90%).
 *
 * Foto dikirim ke layanan pemindai ASLI (Cloudflare Worker) lewat sampahModel.kirimFoto(), fungsi yang
 * sama dengan yang dipanggil PemindaiController.identifikasi(). Model computer vision tidak di-mock.
 *
 * Data uji:
 *   1. Foto material aplikasi: src/ecotrack/assets/images/informasi-sampah/material/<idSampah>.png
 *      (10 foto, label = nama file).
 *   2. Opsional, foto tambahan: src/tests/data/knf05-foto/<idSampah>/*.jpg (label = nama folder).
 * Foto dihitung BENAR jika deteksi pertama yang dikembalikan layanan memiliki idSampah sama dengan
 * labelnya. Foto tanpa deteksi dihitung SALAH.
 *
 * Cara menjalankan (dari src/ecotrack):
 *   EXPO_PUBLIC_PEMINDAI_URL=<url worker> npx jest KNF05ComputerVision --verbose
 * Tanpa URL, test ini dilewati (skip).
 */

const fs = require('fs');
const path = require('path');

const TARGET = 0.9;
const FOLDER_MATERIAL = path.join(__dirname, '..', 'ecotrack', 'assets', 'images', 'informasi-sampah', 'material');
const FOLDER = path.join(__dirname, 'data', 'knf05-foto');
const ID_SAMPAH = require('../firebase/data/informasiSampah.json').map((s) => s.idSampah);
const EKSTENSI = ['.jpg', '.jpeg', '.png'];

jest.mock('@/database/firebase', () => ({ __esModule: true, auth: { currentUser: null } }));

function fetchNode(url, opsi = {}) {
  const modul = url.startsWith('https') ? require('https') : require('http');
  return new Promise((selesai, gagal) => {
    const req = modul.request(url, { method: opsi.method ?? 'GET', headers: opsi.headers }, (res) => {
      const potongan = [];
      res.on('data', (p) => potongan.push(p));
      res.on('end', () =>
        selesai(new Response(Buffer.concat(potongan).toString('utf8'), { status: res.statusCode, headers: res.headers }))
      );
    });
    req.on('error', gagal);
    if (opsi.body) req.write(opsi.body);
    req.end();
  });
}

const adalahFoto = (f) => EKSTENSI.includes(path.extname(f).toLowerCase());

function bacaDataUji() {
  const material = fs
    .readdirSync(FOLDER_MATERIAL)
    .filter((f) => adalahFoto(f) && ID_SAMPAH.includes(path.parse(f).name))
    .map((f) => ({ label: path.parse(f).name, file: path.join(FOLDER_MATERIAL, f) }));
  if (!fs.existsSync(FOLDER)) return material;
  const tambahan = fs
    .readdirSync(FOLDER, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .flatMap((d) =>
      fs
        .readdirSync(path.join(FOLDER, d.name))
        .filter(adalahFoto)
        .map((f) => ({ label: d.name, file: path.join(FOLDER, d.name, f) }))
    );
  return [...material, ...tambahan];
}

const dataUji = bacaDataUji();
const siap = Boolean(process.env.EXPO_PUBLIC_PEMINDAI_URL) && dataUji.length > 0;
const describeSiap = siap ? describe : describe.skip;

describeSiap('KNF05 akurasi computer vision', () => {
  it('KNF05-TC04 kategori sampah hasil computer vision sesuai label foto', async () => {
    Object.defineProperty(globalThis, 'fetch', { value: fetchNode, configurable: true, writable: true });
    const { kirimFoto } = require('@/model/sampahModel');

    const salah = [];
    for (const { label, file } of dataUji) {
      try {
        const hasil = await kirimFoto(fs.readFileSync(file).toString('base64'));
        const terdeteksi = hasil.deteksi?.[0]?.idSampah ?? '(tidak ada deteksi)';
        if (terdeteksi !== label) salah.push(`${path.basename(path.dirname(file)) + '/' + path.basename(file)} → ${terdeteksi}`);
      } catch (e) {
        salah.push(`${path.basename(path.dirname(file)) + '/' + path.basename(file)} → error: ${e.message}`);
      }
    }

    const benar = dataUji.length - salah.length;
    const akurasi = benar / dataUji.length;
    console.log(
      `Computer vision: ${benar}/${dataUji.length} benar (akurasi ${(akurasi * 100).toFixed(2)}%)` +
        (salah.length ? `\nSalah:\n  ${salah.join('\n  ')}` : '')
    );
    expect(akurasi).toBeGreaterThanOrEqual(TARGET);
  }, 300000);
});
