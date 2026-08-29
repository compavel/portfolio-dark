# Dark Luxury Portfolio Website Template

Template website portofolio modern bertema *dark minimalist* yang dirancang khusus untuk Web Developer / Software Engineer, disesuaikan dengan template desain modern (Hero, About, Skills terpisah jujur, Showcase Projects, dan Contact).

## 🚀 Fitur Utama

1. **Floating Pill Header**: Menu navigasi modern dengan backdrop blur, indikator aktif otomatis saat scroll, dan menu mobile responsif.
2. **Hero Section**: Badge ketersediaan kerja (*Open to Work* dengan indikator hijau berdenyut), headline tegas, tombol Download CV, serta tautan ke LinkedIn & GitHub.
3. **About Me**: Ringkasan 2–3 kalimat esensial, 3 pilar pendekatan (*My Approach*), dan counter pencapaian.
4. **Categorized Skills**:
   - **Core & Proficient**: Skill yang dikuasai dengan baik (HTML, CSS, Tailwind, JS, Laravel, PHP, MySQL).
   - **Familiar & Explored**: Skill yang pernah dipelajari/dicoba (React.js, Node.js, REST API, Docker, Python).
   - **Tools & Workflow**: Alat kerja sehari-hari (Git, GitHub, VS Code, Postman, Figma, Vercel).
5. **Featured Projects**: 4 kartu proyek komprehensif lengkap dengan deskripsi ("apa & untuk siapa"), tech stack pills, serta tombol Live Demo & GitHub.
6. **Contact Section ("Let's Talk")**: Email dengan fitur **Copy to Clipboard** 1-klik, link profil sosial, dan formulir kirim pesan cepat.

---

## 🛠️ Cara Menjalankan & Menguji Secara Lokal

Cukup buka file `index.html` langsung di browser favorit kamu (Google Chrome, Edge, Firefox, Brave):
- Dobel klik file `index.html` di File Explorer, atau
- Gunakan ekstensi *Live Server* di VS Code.

---

## ✏️ Panduan Kustomisasi (Mudah Diedit)

Semua konten utama berada di file [`index.html`](index.html):

1. **Mengganti Nama & Headline**:
   - Cari teks `Radit Pratama` dan ganti dengan nama lengkap kamu.
   - Ganti inisial logo `RP` dengan inisial nama kamu.
2. **Mengganti Foto Profil**:
   - Pada bagian `<!-- Hero Visual/Portrait (Right) -->`, kamu bisa mengganti blok placeholder dengan tag gambar:
     ```html
     <img src="assets/foto-kamu.jpg" alt="Foto Profil" class="w-full h-full object-cover rounded-2xl">
     ```
3. **Menambahkan File CV / Resume**:
   - Buat folder `assets/` dan letakkan file PDF CV kamu dengan nama `Radit_Pratama_CV.pdf` (atau sesuaikan link di tag `<a href="assets/nama_cv.pdf">`).
4. **Mengubah Link Sosial & Email**:
   - Ganti `https://linkedin.com/in/...` dan `https://github.com/...` dengan URL akun aslimu.
   - Ganti `radit.developer@example.com` di bagian email dan di file [`script.js`](script.js).
5. **Mengubah Proyek**:
   - Sesuaikan judul, deskripsi, badge teknologi, dan URL demo/repo di setiap kartu proyek pada section `#projects`.

---

## 🌐 Cara Publikasi / Deploy Gratis

Website ini berbasis HTML, CSS, dan JS statis sehingga dapat di-host secara gratis 100%:
- **Vercel**: Cukup drag-and-drop folder ini ke [vercel.com](https://vercel.com) atau hubungkan repository GitHub.
- **GitHub Pages**: Push ke repository GitHub kamu lalu aktifkan GitHub Pages di menu Settings > Pages.
- **Netlify**: Drag-and-drop folder ke [app.netlify.com/drop](https://app.netlify.com/drop).
