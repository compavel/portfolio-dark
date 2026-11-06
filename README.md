# Portofolio — Tegar Raditya Permana Putra

Website portofolio statis untuk **IT Support & Web Developer**. Dibangun tanpa framework dan tanpa build step: satu file HTML, satu file CSS, satu file JavaScript.

Live: <https://portonoiree.netlify.app>

---

## Kenapa desainnya seperti ini

Portofolio ini memakai gaya **neo-brutalist**: border tebal, bayangan keras, tipografi besar, dan satu warna aksen yang agresif. Alasannya bukan sekadar gaya:

- Mayoritas portofolio developer terlihat sama — gelap, gradient ungu-biru, kartu membulat. Gaya brutalist membuat halaman ini langsung dikenali.
- Strukturnya sengaja dibuat sederhana: recruiter bisa menemukan nama, peran, CV, dan empat proyek dalam beberapa detik.
- Semua dekorasi tetap berfungsi: angka IPK dan jumlah test adalah bukti nyata, bukan angka karangan.

---

## Fitur

**Konten**
- Hero dengan status ketersediaan kerja dan tombol unduh CV.
- Statistik singkat: IPK, jumlah automated test, jumlah proyek, fokus teknologi.
- Tentang: ringkasan pengalaman + riwayat kerja dan pendidikan.
- Proyek: satu proyek utama (IT Ticketing System) dan tiga proyek pendukung, semuanya tertaut ke demo atau repo.
- Kontak: email (klik untuk salin), WhatsApp, dan GitHub.

**Interaksi & animasi**
- Marquee skill berjalan, berhenti saat di-hover.
- Headline masuk berurutan saat halaman dibuka.
- Section muncul saat masuk viewport (`IntersectionObserver`).
- Angka statistik menghitung naik saat terlihat.
- Kartu proyek sedikit miring mengikuti posisi kursor (hanya perangkat dengan pointer presisi).
- Progress bar scroll di bawah navbar dan penanda nav aktif.
- Tombol salin email dengan notifikasi toast.
- Menu mobile dengan tombol burger (buka/tutup, tutup otomatis saat link diklik).

**Aksesibilitas**
- Semua animasi dimatikan otomatis saat pengguna mengaktifkan `prefers-reduced-motion`.
- Ada tautan "Langsung ke konten" untuk pengguna keyboard.
- `:focus-visible` diberi outline yang jelas.
- Tombol burger memakai `aria-expanded` dan `aria-controls`; toast memakai `aria-live`.
- Kontras teks dijaga di atas ambang WCAG untuk ukuran teksnya.

**Performa**
- Tanpa framework, tanpa library animasi. Total CSS + JS di bawah 30 KB (belum termasuk font).
- Screenshot proyek dikompres ulang (`*-card.jpg`) dan dimuat dengan `loading="lazy"`.
- Font dimuat dari Google Fonts dengan `preconnect` dan hanya memakai dua keluarga.

---

## Tech stack

| Bagian | Teknologi |
|---|---|
| Markup | HTML5 semantik |
| Styling | CSS3 (custom properties, grid, `clamp()`, `aspect-ratio`) |
| Interaksi | Vanilla JavaScript (ES5-safe, tanpa dependency) |
| Font | Space Grotesk, JetBrains Mono |
| Hosting | Netlify (auto-deploy dari GitHub) |

---

## Struktur file

```
.
├── index.html                  # seluruh konten halaman
├── styles.css                  # token warna, layout, animasi, responsive
├── script.js                   # reveal, counter, tilt, salin email, menu mobile
├── assets/
│   ├── profile.jpg             # foto potret (4:5, sudah dikompres)
│   ├── CV_Tegar_Raditya_Permana_Putra.pdf
│   └── Tegar_Raditya_CV.pdf
└── img/projects/               # screenshot proyek
    ├── ticketing-card.jpg
    ├── screentime-card.jpg
    ├── komore-card.jpg
    ├── aqw-home.jpg
    └── ... (screenshot tambahan)
```

---

## Menjalankan secara lokal

Cukup buka `index.html` di browser. Kalau perlu server lokal (disarankan agar path dan font berperilaku sama seperti produksi):

```bash
# pakai PHP
php -S 127.0.0.1:8000

# atau pakai Python
python -m http.server 8000
```

Lalu buka <http://127.0.0.1:8000>.

---

## Kustomisasi

**Ganti foto** — timpa `assets/profile.jpg`. Rasio yang dipakai 4:5 (misal 720×900). Foto ditampilkan grayscale dan berubah warna saat kursor mendekat; kalau tidak ingin efek itu, hapus `filter: grayscale(1)` pada `.photo img` di `styles.css`.

**Ganti CV** — timpa file di `assets/` dan sesuaikan `href` pada tombol "Unduh CV" di `index.html`.

**Tambah proyek** — duplikasi satu blok `<a class="card">` di dalam `.proj-grid`. Tambahkan `data-tilt` kalau ingin efek miring.

**Ubah warna** — semua warna ada di `:root` pada `styles.css` (`--paper`, `--ink`, `--orange`, `--lime`).

---

## Deploy

Repo ini terhubung ke Netlify. Setiap push ke `master` otomatis deploy. Untuk hosting lain, seluruh isi folder ini bisa diunggah apa adanya (tidak ada proses build).

---

## Catatan teknis

- **Kenapa tidak pakai Tailwind di sini?** Halaman ini hanya satu halaman dengan gaya yang sangat spesifik. CSS biasa lebih ringan (tanpa CDN atau build step) dan lebih mudah dibaca orang yang membuka source code. Tailwind tetap dipakai di proyek Laravel lain.
- **Kenapa animasi ditulis manual?** Kebutuhannya kecil dan terbatas, jadi `IntersectionObserver` + CSS transition sudah cukup. Menambah library animasi hanya akan menambah beban tanpa manfaat.
- **Pengaman konten:** fungsi `sweep()` di `script.js` menampilkan elemen yang sudah masuk viewport kalau `IntersectionObserver` gagal, sehingga konten tidak pernah tertinggal dalam keadaan transparan.

---

## Author

**Tegar Raditya Permana Putra**
IT Support & Web Developer — Purwokerto, Jawa Tengah
Email: radityategar1518@gmail.com
GitHub: <https://github.com/compavel>
