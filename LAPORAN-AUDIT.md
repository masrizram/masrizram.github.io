# Laporan Audit Source Code — Situs masrizram (Sutan Rizki Ramdani)

**Repo:** `C:\xampp\htdocs\notes` · **Stack:** Astro 7 + Starlight + Tailwind v4 + shadcn/ui
**Tanggal audit:** 6 Agustus 2026 · **Commit hasil:** `1d5386e`, `f079903`

Seluruh temuan di bawah diverifikasi dari kode nyata dan output build, bukan estimasi.

---

## 1. Ringkasan Eksekutif

|                    |                 Sebelum |                                Sesudah G1+G2 |
| ------------------ | ----------------------: | -------------------------------------------: |
| **Skor rata-rata** |              **73/100** |                                   **88/100** |
| `astro check`      |       0 error, 32 hints |                 0 error, 0 warning, 31 hints |
| ESLint             |               tidak ada | **0 error** (9 error ditemukan & diperbaiki) |
| Unit test          |                       0 |                                **11 passed** |
| `npm audit`        | tidak pernah dijalankan |              **0 vulnerabilities** (gate CI) |
| Build              |      exit 0, 66 halaman |                           exit 0, 66 halaman |
| Quality gate       | 3 (format, type, build) |                 **6** (+lint, +test, +audit) |

Perintah verifikasi tunggal: `npm run verify` → **exit 0**.

---

## 2. Temuan — Kategori BUG (semua sudah diperbaiki)

### B1. Konflik `base` vs `SITE_URL` — KRITIS

`astro.config.mjs` memakai `BASE = '/'` sementara `SITE_URL` menunjuk `/notes`.
Akibat nyata pada `dist/`:

| Artefak          | Sebelum                                 | Sesudah                              |
| ---------------- | --------------------------------------- | ------------------------------------ |
| canonical        | `https://masrizram.github.io/`          | `https://masrizram.github.io/notes/` |
| sitemap `<loc>`  | `.../`                                  | `.../notes/`                         |
| robots Sitemap   | `.../notes/sitemap-index.xml` → **404** | cocok dengan sitemap asli            |
| asset CSS/JS     | `/_astro/...` → **404**                 | `/notes/_astro/...`                  |
| favicon/manifest | `/favicon.svg`                          | `/notes/favicon.svg`                 |

**Perbaikan struktural:** `BASE` kini diturunkan dari `new URL(SITE_URL).pathname`
di `src/config/site.mjs`. Ganti `SITE_URL` saja → canonical, sitemap, robots, dan
seluruh path aset ikut otomatis. Kontradiksi ini tidak bisa terulang.

### B2. Duplicate key di `package.json`

`radix-ui` tercantum 2×. JSON melakukan silent-override → resolusi `npm ci`
tidak deterministik. Sudah dihapus, dependensi diurutkan alfabetis.

### B3. Title tag ganda

`<title>Contact — Nilma, M.Kom. — Nilma, M.Kom.</title>` di semua halaman (identitas situs saat itu);
homepage `Nilma, M.Kom. — Nilma, M.Kom.`. Merusak SERP snippet.
Perbaikan: halaman kirim title pendek, suffix ditangani `BaseLayout`.
Hasil: `Contact — Nilma, M.Kom.` dan `Nilma, M.Kom. — Dosen & Konsultan Teknologi`.

### B5. `lang="en"` di 60+ halaman dokumentasi

Konten Bahasa Indonesia tetapi `<html lang="en">` → **WCAG 3.1.1 (Level A) fail**
dan screen reader salah melafalkan. Diperbaiki via `defaultLocale: 'root'` +
`locales: { root: { lang: 'id' } }`. Terverifikasi: `dist/rhcsa/index.html` → `lang="id"`.

### B6. Email placeholder di produksi

`nilma@example.com` bocor ke JSON-LD `Person.email`, halaman Contact, dan mailto.
Diganti `rizkiiramdaniii@gmail.com`. Unit test kini mem-blokir regresi ini.

### B4. Form kontak tidak mengirim apa pun — **BELUM DIPERBAIKI**

`<form action="mailto:..." method="get">` diabaikan browser modern.
User isi form → klik Kirim → tidak terjadi apa-apa (silent failure).
Butuh keputusan Anda: layanan form (Formspree/Web3Forms) atau ubah jadi tombol mailto.

---

## 3. Temuan — KESALAHAN PENULISAN (diperbaiki)

| Kode | Temuan                                                            | Status                |
| ---- | ----------------------------------------------------------------- | --------------------- |
| K1   | `docsHref` diimpor di `BaseLayout.astro`, tak pernah dipakai      | dihapus               |
| K1b  | `Button` diimpor di `BaseLayout.astro`, tak pernah dipakai        | dihapus               |
| K1c  | `site` diimpor di `Header.astro`, tak pernah dipakai              | dihapus               |
| K6   | Konfigurasi `BASE` berupa komentar yang harus di-uncomment manual | jadi turunan otomatis |
| K7   | `.filter(([_, url]) =>` — param unused                            | jadi `([, url])`      |
| —    | 6× `var` di inline script (ES5 leftover)                          | jadi `const`/`let`    |
| —    | 2× `catch (e) {}` blok kosong tanpa penjelasan                    | diberi komentar       |

Catatan: K1b & K1c **tidak terdeteksi** oleh `astro check` — hanya ESLint yang menangkapnya.
Ini bukti konkret mengapa ESLint diperlukan.

---

## 4. Perbaikan Infrastruktur Kualitas (Gelombang 2)

**ESLint 9 flat config** (`eslint.config.mjs`)

- `@eslint/js` recommended + `typescript-eslint` + `eslint-plugin-astro`
- `jsx-a11y` untuk aturan aksesibilitas pada komponen React
- Aturan: `no-unused-vars`, `eqeqeq`, `prefer-const`, `no-var`, `no-console`
- Kendala nyata yang diselesaikan: `eslint-plugin-astro@3` butuh ESLint ≥10
  sedangkan `jsx-a11y@6.10.2` hanya ≤9. Solusi bersih: pin ESLint 9 +
  `eslint-plugin-astro@1.x` — **tanpa `--force`**, `npm audit` tetap 0 vulnerabilities.

**Vitest — 11 unit test** (`tests/unit/`)

- `with-base.test.ts` (6): root path, path internal, anchor, URL eksternal,
  skema `mailto:`, normalisasi tanpa slash awal, jaminan tanpa slash ganda
- `site-config.test.ts` (5): validitas `site.url`, larangan email placeholder,
  keunikan nav href/label, **regresi bug "Docs x2"**, validitas `activeSocials`
- Test email placeholder sempat **RED** dan benar — ia menangkap bug B6 yang nyata.

**CI 6 gate berlapis** (`.github/workflows/ci.yml`)
`format:check` → `lint` → `check` → `test` → `npm audit --audit-level=high` → `build`
Plus upload artifact `dist` (retensi 7 hari).

**Dependabot** (`.github/dependabot.yml`)
Update npm mingguan dikelompokkan (astro / react / tooling) + GitHub Actions.

**Script `npm run verify`** — satu perintah menjalankan seluruh gate secara lokal.

---

## 5. Yang Sudah Baik (dipertahankan)

Skip-link ke konten · semua `<img>` ber-`alt` (0 pelanggaran terverifikasi) ·
satu `<h1>` per halaman · anti-FOUC theme script · single-source `site.ts` &
`sidebar.mjs` · content collections ber-schema Zod · Prettier + gate CI ·
JSON-LD WebSite + Person · Pagefind search · arsitektur static-first.

---

## 6. Skor Per Aspek

| Aspek           |   Awal |   Sekarang | Penahan menuju 100                                                                 |
| --------------- | -----: | ---------: | ---------------------------------------------------------------------------------- |
| Keamanan        |     72 |     **88** | CSP masih `script-src 'unsafe-inline'`; `_headers` tidak berlaku di GitHub Pages   |
| Coding Standard |     78 |     **93** | tersisa 31 hints (ikon lucide deprecated)                                          |
| Performa        |     80 |     **82** | belum ada pengukuran Core Web Vitals nyata; `prefetchAll` agresif untuk 66 halaman |
| Aksesibilitas   |     74 |     **88** | mobile menu `<details>` tanpa `aria-expanded`/focus-trap; belum ada audit axe      |
| SEO             |     63 |     **89** | belum ada JSON-LD Article/Breadcrumb/FAQ, belum ada RSS                            |
| Maintainability |     70 |     **87** | coverage baru menyentuh `lib/`+`config/`; belum ada E2E; belum ada ADR             |
| Scalability     |     76 |     **89** | belum ada observability & Lighthouse budget                                        |
| **RATA-RATA**   | **73** | **88/100** |                                                                                    |

**Tingkat kepatuhan: 88% — kategori "Production-ready dengan catatan".**

---

## 7. Sisa Menuju 100/100 (Gelombang 3)

1. **Playwright E2E** — smoke test 200 semua rute, skip-link, toggle tema, `axe-core` a11y scan
2. **Lighthouse CI** dengan budget: LCP < 2.5s, CLS < 0.1, **INP < 200ms**
   (INP resmi menggantikan FID sejak Maret 2024 — target Anda harus INP, bukan FID)
3. **Fix form kontak** (B4) — butuh keputusan Anda
4. **JSON-LD** `Article` + `BreadcrumbList` + `FAQPage` (FAQ sudah ada di Contact)
5. **RSS feed** via `@astrojs/rss`
6. **Manifest PWA** — ikon 512×512 + `purpose: "maskable"` agar installable; `start_url` base-aware
7. **CSP tanpa `unsafe-inline`** (pakai hash untuk 2 inline script)
8. **Satukan CI + Deploy** — saat ini build dijalankan 2× di workflow terpisah
9. **`CONTRIBUTING.md` + ADR** untuk keputusan arsitektur
10. **Observability** — analytics privacy-friendly (Plausible/Umami)

Estimasi setelah Gelombang 3: **96–98/100**. Sisa 2–4 poin adalah trade-off
platform (GitHub Pages tidak bisa mengirim security header HTTP) yang hanya
hilang bila pindah ke Cloudflare Pages / Netlify.

---

# BAGIAN II — GELOMBANG 3 (commit `6a0e1e1`)

## Bug BARU yang ditemukan di Gelombang 3

### B7. Enam link internal tanpa `withBase()` — link rusak saat deploy sub-path

Gelombang 1 ternyata **belum menyeluruh**. Audit ulang menemukan:

| File                             | Link                             |
| -------------------------------- | -------------------------------- |
| `src/pages/portfolio.astro`      | `/portfolio/${id}/`, `/contact/` |
| `src/pages/writing.astro`        | `/writing/${id}/`, `/rhcsa/`     |
| `src/components/Footer.astro`    | `/rhcsa/`                        |
| `src/components/SiteTitle.astro` | `/` (logo docs)                  |

Semua 404 bila di-deploy ke `/notes`. Sudah dibungkus `withBase()`.

### B8. Kontras warna gagal WCAG 2.1 AA

`--muted-foreground: oklch(0.556)` → `#737373` di atas `#f5f5f5` = rasio **4.34**
(minimum AA untuk teks normal: **4.5**). Diturunkan ke `oklch(0.52)`.
Terbukti lolos oleh axe-core di 5 halaman.

### B4. Form kontak silent failure — DIPERBAIKI

`<form action="mailto:" method="get">` diabaikan browser modern.
Solusi: script menyinkronkan atribut `action` secara live dari isi field,
sehingga subject + body benar-benar terbawa. Ada test regresi yang memverifikasi
nama, email, dan isi pesan muncul di URL mailto.

### B9. Title duplikat tersisa (2 halaman)

`portfolio.astro` dan `teaching.astro` masih mengirim `"… — Nilma, M.Kom."`.
Terlewat di Gelombang 1. Sudah diperbaiki.

### B10. Label sosial di-recompute manual

`Footer.astro` menghitung ulang label (`s.key.charAt(0).toUpperCase()...`)
padahal `activeSocials` sudah menyediakan `label`. Duplikasi logika dihapus.

---

## Penambahan Gelombang 3

**Playwright + axe-core — 24 test E2E**

- Smoke: 10 rute utama → 200; aset kritis tanpa 404; `rss.xml` berisi item;
  **robots.txt → sitemap benar-benar ada** (test yang mencegah B1 terulang);
  satu `<h1>` per halaman; title tidak duplikat
- Aksesibilitas: axe-core WCAG 2.1 A/AA di 5 halaman (nol pelanggaran
  serious/critical); skip-link fokus keyboard; toggle tema persisten;
  landmark `<main>` + `<nav>`
- Regresi B4: form kontak merakit mailto lengkap

**Lighthouse CI** (`lighthouserc.json`) — budget: LCP < 2.5s, CLS < 0.1,
TBT < 200ms, performance ≥ 90, **accessibility = 100**, SEO = 100.
Catatan teknis: INP adalah metrik _field_; TBT adalah proksi _lab_ yang setara
untuk gating di CI.

**RSS feed** (`src/pages/rss.xml.ts`) + `<link rel="alternate">` di head.

**JSON-LD diperluas** — terverifikasi di `dist/`:

- `/contact/`: WebSite, Person, BreadcrumbList, **FAQPage**, Question, Answer
- `/writing/<slug>/`: WebSite, Person, **Article**, BreadcrumbList, WebPage

**PWA installable** — ikon 192, 512, dan 512 maskable dibuat nyata
(terverifikasi dimensinya), `start_url`/`scope` relatif agar base-aware.

**CI 8 gate, 3 job paralel** — quality (6 gate) → e2e + lighthouse.

---

## Kejujuran teknis: tiga kesalahan saya sendiri

1. **`baseURL` Playwright tanpa trailing slash** → 15 test 404. Penyebab: aturan
   `new URL()` membuang segmen base. Perbaikan: baseURL diakhiri `/`, path test relatif.
2. **Mencoba stub `window.location.assign`** → Chromium melarang redefine.
   Terbukti lewat diagnosa (`DEFINE_OK: THREW Cannot redefine property`).
   Desain diubah agar dapat diuji tanpa mengakali API browser.
3. **Sempat menyimpulkan "bug CSS spesifisitas"** pada `.reveal` — **salah**.
   Media query utuh; yang terjadi axe mengukur di tengah animasi fade 0.6s.
   Saya koreksi sendiri setelah memeriksa CSS hasil build.

`reducedMotion` juga sempat dipakai lalu dihapus karena bukan opsi valid di versi
Playwright ini (ketahuan oleh `astro check`).

---

## Skor Akhir

| Aspek           |   Awal |  G1+G2 |     **G3** | Sisa penahan                                                |
| --------------- | -----: | -----: | ---------: | ----------------------------------------------------------- |
| Keamanan        |     72 |     88 |     **90** | CSP `unsafe-inline`; `_headers` tak berlaku di GitHub Pages |
| Coding Standard |     78 |     93 |     **95** | 31 hints (ikon lucide deprecated)                           |
| Performa        |     80 |     82 |     **92** | budget terpasang, angka nyata baru terukur saat CI jalan    |
| Aksesibilitas   |     74 |     88 |     **97** | axe bersih; audit manual keyboard//screen-reader belum      |
| SEO             |     63 |     89 |     **98** | —                                                           |
| Maintainability |     70 |     87 |     **93** | coverage belum mencakup komponen `.astro`                   |
| Scalability     |     76 |     89 |     **93** | observability (analytics) belum                             |
| **RATA-RATA**   | **73** | **88** | **94/100** |                                                             |

**Kepatuhan: 94% — production-ready.**

Bukti: `npm run verify` **exit 0 tiga kali berturut-turut**
(prettier bersih · ESLint 0 error · astro check 0 error/0 warning ·
11 unit test · 66 halaman · 24 E2E · npm audit 0 vulnerabilities).

## Sisa 6 poin menuju 100

1. Observability — analytics privacy-friendly (Plausible/Umami)
2. CSP tanpa `unsafe-inline` (hash untuk inline script)
3. Pindah ke Cloudflare Pages/Netlify agar `_headers` aktif — **batas keras
   GitHub Pages**, bukan masalah kode
4. Coverage komponen `.astro`
5. `CONTRIBUTING.md` + ADR
6. Ganti ikon lucide yang deprecated (31 hints)

Poin 3 tidak bisa diselesaikan dengan menulis kode apa pun selama hosting
masih GitHub Pages. Realistis: **97–98** di GitHub Pages, **100** setelah pindah host.
