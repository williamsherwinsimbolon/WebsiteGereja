# GMAHK Tanjung Barat — Website + CMS

## Struktur Proyek

```
gmahk-tanjungbarat/
├── backend/
│   ├── server.js          # REST API (Express.js)
│   ├── package.json
│   └── data/
│       └── db.json        # Database (auto-generated)
├── frontend/
│   └── index.html         # Homepage Website
└── cms/
    └── cms.html           # Panel Admin CMS
```

---

## Cara Menjalankan

### 1. Install Backend
```bash
cd backend
npm install
node server.js
# API berjalan di: http://localhost:3001
```

### 2. Buka Frontend
- Buka file `frontend/index.html` di browser
- Atau gunakan Live Server di VS Code

### 3. Buka CMS Admin
- Buka file `cms/cms.html` di browser
- **Login:** username `admin`, password `gmahk2025`

---

## Fitur

### Website (frontend/index.html)
- ✅ Hero / Banner Gereja
- ✅ Jadwal Kebaktian (dari API)
- ✅ Galeri Foto Kegiatan (dari API)
- ✅ Buletin Kebaktian (dari API)
- ✅ Artikel: Renungan Pagi, Roh Nubuat, Sekolah Sabat (dari API)
- ✅ Program Pembangunan + Progress Bar (dari API)
- ✅ Google Maps embed
- ✅ Footer: Sosial Media, Telepon, Alamat
- ✅ Form Permohonan Doa (kirim ke API)
- ✅ Navbar lengkap dengan dropdown

### CMS (cms/cms.html)
- ✅ Login admin (user: admin / pass: gmahk2025)
- ✅ Dashboard ringkasan
- ✅ CRUD Jadwal Kebaktian
- ✅ CRUD Foto Kegiatan
- ✅ CRUD Buletin
- ✅ CRUD Artikel (Renungan/Roh Nubuat/SS)
- ✅ Edit Program Pembangunan & dana
- ✅ Edit Info Kontak & Sosial Media
- ✅ Lihat Permohonan Doa Jemaat

### Backend (backend/server.js)
- ✅ REST API dengan Express.js
- ✅ Database JSON file (db.json)
- ✅ Autentikasi Bearer Token untuk CMS
- ✅ CORS enabled
- ✅ Semua endpoint CRUD

---

## API Endpoints

### Public
- GET  /api/jadwal
- GET  /api/foto
- GET  /api/artikel?kategori=Renungan%20Pagi
- GET  /api/buletin
- GET  /api/pembangunan
- GET  /api/kontak
- POST /api/doa

### CMS (butuh header: Authorization: Bearer gmahk-admin-2025)
- POST/PUT/DELETE /api/cms/jadwal/:id
- POST/PUT/DELETE /api/cms/foto/:id
- POST/DELETE     /api/cms/buletin/:id
- POST/PUT/DELETE /api/cms/artikel/:id
- PUT             /api/cms/pembangunan/:id
- PUT             /api/cms/kontak
- GET             /api/cms/doa

---

## Deploy (Saran)

- **Backend**: Railway, Render, atau VPS + PM2
- **Frontend + CMS**: Netlify, Vercel, atau Nginx (static hosting)
- **Database**: Bisa diupgrade ke MongoDB atau MySQL

---

## Keamanan (Untuk Produksi)
Sebelum deploy ke production:
1. Ganti `ADMIN_TOKEN` di server.js dengan token yang lebih kuat
2. Tambahkan HTTPS
3. Ganti JSON file database dengan PostgreSQL/MySQL
4. Tambahkan rate limiting
5. Ganti password CMS yang lebih kuat
