const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// 1. PINDAHKAN KE SINI (Paling atas setelah const app)
// Ini agar Express langsung memberikan file .css atau .jpg jika diminta browser
app.use(express.static(path.join(__dirname, '.')));

// 2. Baru kemudian middleware lainnya
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// 3. Path ke Database
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Initialize DB (Tetap aman di Vercel meskipun Read-Only)
function getDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      return {
        jadwal: [], foto_kegiatan: [], acara: [], artikel: [], 
        buletin: [], pembangunan: [], kontak: {}, doa_requests: [] 
      };
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (err) {
    return { jadwal: [], acara: [], artikel: [], kontak: {} };
  }
}

function saveDB(data) {
  try {
    if (!process.env.VERCEL) {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error("Gagal menyimpan DB:", err);
  }
}

// AUTH middleware
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'gmahk-admin-2025';
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (token !== `Bearer ${ADMIN_TOKEN}`) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

// ==========================================
// FRONT-END ROUTES (WAJIB ADA UNTUK VERCEL)
// ==========================================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/cms', (req, res) => {
  res.sendFile(path.join(__dirname, 'cms.html'));
});

app.get('/kegiatan-pemuda', (req, res) => {
    res.sendFile(path.join(__dirname, 'kegiatan-pemuda.html'));
});

app.get('/renungan-pagi', (req, res) => {
    res.sendFile(path.join(__dirname, 'renungan-pagi.html'));
});

// ==========================================
// API ROUTES
// ==========================================

app.get('/api/jadwal', (req, res) => res.json(getDB().jadwal));
app.get('/api/foto', (req, res) => res.json(getDB().foto_kegiatan));
app.get('/api/acara', (req, res) => res.json(getDB().acara));
app.get('/api/kontak', (req, res) => res.json(getDB().kontak));

app.get('/api/artikel', (req, res) => {
  const { kategori } = req.query;
  const db = getDB();
  const data = kategori ? db.artikel.filter(a => a.kategori === kategori) : db.artikel;
  res.json(data);
});

// CMS POST (Contoh)
app.post('/api/cms/jadwal', auth, (req, res) => {
  const db = getDB();
  const item = { ...req.body, id: Date.now() };
  db.jadwal.push(item);
  saveDB(db);
  res.json(item);
});

// ==========================================
// SERVERLESS EXPORT (KUNCI UTAMA VERCEL)
// ==========================================

// Ini membuat Vercel bisa mengenali aplikasi Express kamu
module.exports = app;

// Jalankan server jika dijalankan secara lokal (bukan di Vercel)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}