const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Initialize DB
function getDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initial = {
      jadwal: [
        { id: 1, hari: "Sabtu", jam: "18:00", nama: "Kebaktian Muda-Mudi", lokasi: "Gedung Utama" },
        { id: 2, hari: "Sabtu", jam: "19:30", nama: "Persekutuan Remaja", lokasi: "Ruang Serba Guna" },
        { id: 3, hari: "Sabtu", jam: "09:00", nama: "Sekolah Sabat", lokasi: "Gedung Utama" },
        { id: 4, hari: "Sabtu", jam: "11:00", nama: "Kebaktian Umum", lokasi: "Gedung Utama" },
        { id: 5, hari: "Rabu", jam: "19:00", nama: "Kebaktian Tengah Minggu", lokasi: "Gedung Utama" }
      ],
      foto_kegiatan: [
        { id: 1, judul: "Kebaktian Natal 2024", url: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800", tanggal: "2024-12-25", kategori: "Kebaktian" },
        { id: 2, judul: "Pemuda Outreach", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800", tanggal: "2024-11-10", kategori: "Pemuda" },
        { id: 3, judul: "Sekolah Sabat Spesial", url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800", tanggal: "2024-10-05", kategori: "Sekolah Sabat" },
        { id: 4, judul: "Ibadah Padang 2024", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", tanggal: "2024-09-15", kategori: "Kegiatan" },
        { id: 5, judul: "Pembaptisan Jemaat", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800", tanggal: "2024-08-20", kategori: "Baptisan" },
        { id: 6, judul: "Pelayanan Sosial", url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800", tanggal: "2024-07-12", kategori: "Sosial" }
      ],
      acara: [
        { id: 1, judul: "Kebaktian Sabat Spesial", tanggal: "2026-05-16", jam: "09:00", lokasi: "Gedung Utama", deskripsi: "Ibadah Sabat bersama seluruh jemaat dan tamu dengan pelayanan firman dan pujian.", gambar: "https://news.unai.edu/wp-content/uploads/2023/08/IMG_9074-Enhanced-NR-scaled-1.jpg" },
        { id: 2, judul: "Persekutuan Pemuda", tanggal: "2026-05-23", jam: "18:00", lokasi: "Ruang Serba Guna", deskripsi: "Kegiatan pemuda untuk bertumbuh bersama dalam firman, persahabatan, dan pelayanan.", gambar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200" },
        { id: 3, judul: "Pelayanan Masyarakat", tanggal: "2026-05-31", jam: "08:00", lokasi: "Area Tanjung Barat", deskripsi: "Pelayanan sosial untuk menjadi berkat bagi masyarakat sekitar gereja.", gambar: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200" }
      ],
      artikel: [
        { id: 1, judul: "Renungan Pagi: Kekuatan Doa", konten: "Doa adalah nafas jiwa. Setiap hari kita dipanggil untuk hadir di hadapan Tuhan dengan hati yang terbuka...", kategori: "Renungan Pagi", penulis: "Pdt. Yohanes Sirait", tanggal: "2025-05-01", gambar: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800" },
        { id: 2, judul: "Roh Nubuat: Kesehatan Sejati", konten: "Ellen G. White dalam tulisannya mengajarkan bahwa tubuh adalah bait Roh Kudus. Menjaga kesehatan adalah ibadah...", kategori: "Roh Nubuat", penulis: "Ev. Martha Situmorang", tanggal: "2025-04-28", gambar: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800" },
        { id: 3, judul: "Pelajaran Sekolah Sabat: Hidup Berdasarkan Iman", konten: "Kuartal ini kita mempelajari bagaimana iman yang hidup mengubah cara kita berjalan bersama Tuhan setiap hari...", kategori: "Sekolah Sabat", penulis: "Tim SS GMAHK", tanggal: "2025-04-25", gambar: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800" }
      ],
      buletin: [
        { id: 1, judul: "Buletin Sabat 3 Mei 2025", file: "#", tanggal: "2025-05-03" },
        { id: 2, judul: "Buletin Sabat 26 April 2025", file: "#", tanggal: "2025-04-26" }
      ],
      pembangunan: [
        { id: 1, judul: "Renovasi Gedung Utama", target: 500000000, terkumpul: 320000000, deskripsi: "Renovasi total gedung kebaktian utama untuk kenyamanan ibadah", gambar: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800" }
      ],
      kontak: {
        alamat: "Jl. Tanjung Barat Raya No. 10, Jakarta Selatan",
        telepon: "+62 812-3456-7890",
        email: "gmahk.tanjungbarat@gmail.com",
        instagram: "gmahk_tanjungbarat",
        youtube: "GMahk Tanjung Barat",
        facebook: "GMAHK Tanjung Barat"
      },
      doa_requests: []
    };
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
  }
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  if (!db.acara) {
    db.acara = [
      { id: 1, judul: "Kebaktian Sabat Spesial", tanggal: "2026-05-16", jam: "09:00", lokasi: "Gedung Utama", deskripsi: "Ibadah Sabat bersama seluruh jemaat dan tamu dengan pelayanan firman dan pujian.", gambar: "https://news.unai.edu/wp-content/uploads/2023/08/IMG_9074-Enhanced-NR-scaled-1.jpg" },
      { id: 2, judul: "Persekutuan Pemuda", tanggal: "2026-05-23", jam: "18:00", lokasi: "Ruang Serba Guna", deskripsi: "Kegiatan pemuda untuk bertumbuh bersama dalam firman, persahabatan, dan pelayanan.", gambar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200" },
      { id: 3, judul: "Pelayanan Masyarakat", tanggal: "2026-05-31", jam: "08:00", lokasi: "Area Tanjung Barat", deskripsi: "Pelayanan sosial untuk menjadi berkat bagi masyarakat sekitar gereja.", gambar: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200" }
    ];
    saveDB(db);
  }
  return db;
}

function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// AUTH middleware (simple token)
const ADMIN_TOKEN = 'gmahk-admin-2025';
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (token !== `Bearer ${ADMIN_TOKEN}`) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// PUBLIC ROUTES
app.get('/api/jadwal', (req, res) => res.json(getDB().jadwal));
app.get('/api/foto', (req, res) => res.json(getDB().foto_kegiatan));
app.get('/api/acara', (req, res) => res.json(getDB().acara));
app.get('/api/artikel', (req, res) => {
  const { kategori } = req.query;
  const db = getDB();
  const data = kategori ? db.artikel.filter(a => a.kategori === kategori) : db.artikel;
  res.json(data);
});
app.get('/api/artikel/:id', (req, res) => {
  const db = getDB();
  const a = db.artikel.find(x => x.id == req.params.id);
  if (!a) return res.status(404).json({ error: 'Not found' });
  res.json(a);
});
app.get('/api/buletin', (req, res) => res.json(getDB().buletin));
app.get('/api/pembangunan', (req, res) => res.json(getDB().pembangunan));
app.get('/api/kontak', (req, res) => res.json(getDB().kontak));
app.post('/api/doa', (req, res) => {
  const db = getDB();
  const { nama, email, pesan } = req.body;
  if (!nama || !pesan) return res.status(400).json({ error: 'Nama dan pesan wajib diisi' });
  db.doa_requests.push({ id: Date.now(), nama, email, pesan, tanggal: new Date().toISOString() });
  saveDB(db);
  res.json({ success: true, message: 'Permintaan doa telah diterima. Kami akan mendoakan Anda!' });
});

// CMS ROUTES (protected)
// Jadwal
app.post('/api/cms/jadwal', auth, (req, res) => {
  const db = getDB();
  const item = { ...req.body, id: Date.now() };
  db.jadwal.push(item);
  saveDB(db);
  res.json(item);
});
app.put('/api/cms/jadwal/:id', auth, (req, res) => {
  const db = getDB();
  const idx = db.jadwal.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.jadwal[idx] = { ...db.jadwal[idx], ...req.body };
  saveDB(db);
  res.json(db.jadwal[idx]);
});
app.delete('/api/cms/jadwal/:id', auth, (req, res) => {
  const db = getDB();
  db.jadwal = db.jadwal.filter(x => x.id != req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// Foto
app.post('/api/cms/foto', auth, (req, res) => {
  const db = getDB();
  const item = { ...req.body, id: Date.now() };
  db.foto_kegiatan.push(item);
  saveDB(db);
  res.json(item);
});
app.put('/api/cms/foto/:id', auth, (req, res) => {
  const db = getDB();
  const idx = db.foto_kegiatan.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.foto_kegiatan[idx] = { ...db.foto_kegiatan[idx], ...req.body };
  saveDB(db);
  res.json(db.foto_kegiatan[idx]);
});
app.delete('/api/cms/foto/:id', auth, (req, res) => {
  const db = getDB();
  db.foto_kegiatan = db.foto_kegiatan.filter(x => x.id != req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// Acara
app.post('/api/cms/acara', auth, (req, res) => {
  const db = getDB();
  const item = { ...req.body, id: Date.now() };
  db.acara.push(item);
  saveDB(db);
  res.json(item);
});
app.put('/api/cms/acara/:id', auth, (req, res) => {
  const db = getDB();
  const idx = db.acara.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.acara[idx] = { ...db.acara[idx], ...req.body };
  saveDB(db);
  res.json(db.acara[idx]);
});
app.delete('/api/cms/acara/:id', auth, (req, res) => {
  const db = getDB();
  db.acara = db.acara.filter(x => x.id != req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// Artikel
app.post('/api/cms/artikel', auth, (req, res) => {
  const db = getDB();
  const item = { ...req.body, id: Date.now(), tanggal: new Date().toISOString().split('T')[0] };
  db.artikel.push(item);
  saveDB(db);
  res.json(item);
});
app.put('/api/cms/artikel/:id', auth, (req, res) => {
  const db = getDB();
  const idx = db.artikel.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.artikel[idx] = { ...db.artikel[idx], ...req.body };
  saveDB(db);
  res.json(db.artikel[idx]);
});
app.delete('/api/cms/artikel/:id', auth, (req, res) => {
  const db = getDB();
  db.artikel = db.artikel.filter(x => x.id != req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// Buletin
app.post('/api/cms/buletin', auth, (req, res) => {
  const db = getDB();
  const item = { ...req.body, id: Date.now(), tanggal: new Date().toISOString().split('T')[0] };
  db.buletin.push(item);
  saveDB(db);
  res.json(item);
});
app.delete('/api/cms/buletin/:id', auth, (req, res) => {
  const db = getDB();
  db.buletin = db.buletin.filter(x => x.id != req.params.id);
  saveDB(db);
  res.json({ success: true });
});

// Pembangunan
app.put('/api/cms/pembangunan/:id', auth, (req, res) => {
  const db = getDB();
  const idx = db.pembangunan.findIndex(x => x.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.pembangunan[idx] = { ...db.pembangunan[idx], ...req.body };
  saveDB(db);
  res.json(db.pembangunan[idx]);
});

// Kontak
app.put('/api/cms/kontak', auth, (req, res) => {
  const db = getDB();
  db.kontak = { ...db.kontak, ...req.body };
  saveDB(db);
  res.json(db.kontak);
});

// Doa requests (CMS read)
app.get('/api/cms/doa', auth, (req, res) => res.json(getDB().doa_requests));

const PORT = 3001;
app.listen(PORT, () => console.log(`GMAHK API running on port ${PORT}`));
