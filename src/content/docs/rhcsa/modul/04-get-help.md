---
title: Modul 04 — Mencari Bantuan di RHEL (Get Help in Red Hat Enterprise Linux)
---

> 📺 Referensi video: [UC_V5af1Ah0](https://www.youtube.com/watch?v=UC_V5af1Ah0&list=PLZkuninm20jDUT_jArQrkfCImbbi2jWns)

## 1. `man` (Manual Pages)

Sumber bantuan utama di Linux.

```bash
man ls                 # buka halaman manual ls
man 5 passwd           # section 5 = format file (bukan perintah)
man -k password        # cari topik terkait (apa-apa?)
```

**Struktur section man:**

1. Perintah pengguna | 2. Panggilan sistem | 3. Pustaka | 4. Berkas device
2. Format berkas & konvensi | 8. Perintah admin

Navigasi di `man`: `Space` (bawah), `b` (atas), `/kata` (cari), `q` (keluar).

## 2. `--help` (Bantuan Singkat Perintah)

```bash
ls --help
grep --help
```

Lebih cepat dari `man` untuk opsi cepat.

## 3. `info` & `pinfo`

Dokumentasi hipertekstual (Project GNU).

```bash
info coreutils
pinfo ls
```

## 4. Dokumentasi di `/usr/share/doc`

```bash
ls /usr/share/doc/ | head
# Contoh berkas README, examples, changelog per paket
```

## 5. `whatis` & `apropos`

```bash
whatis passwd        # satu baris deskripsi
apropos password     # cari semua halaman berisi "password"
```

## 6. Help BASH Internal

```bash
help cd
help echo
type ls              # apakah perintah, alias, atau fungsi?
```

## 7. Red Hat Customer Portal & Documentation

- https://access.redhat.com/documentation — dokumentasi resmi RHEL.
- `cockpit` juga menyediakan panel bantuan.

## 8. Jebakan Umum (EX200)

:::danger[Jebakan]

- `apropos`/`whatis` mengembalikan "nothing appropriate" karena basis data
  belum dibangun → jalankan `sudo mandb`.
- Mencari opsi perintah bawaan shell (`cd`, `export`) lewat `man` padahal
  itu builtin → gunakan `help cd` atau `man bash`.
- Membaca man section yang salah: `man passwd` (1, perintah) berbeda dengan
  `man 5 passwd` (format berkas).
- Melewatkan contoh konfigurasi siap pakai di `/usr/share/doc/<paket>` yang
  sering menjadi jalan pintas jawaban ujian.
- Terlalu lama membaca dokumentasi saat waktu ujian menipis; gunakan `/`
  untuk mencari di dalam man page, bukan membaca dari awal.
- Berharap ada akses internet saat ujian — **tidak ada**; hanya dokumentasi
  lokal (man, info, `/usr/share/doc`) yang tersedia.
  :::

## 9. Koneksi ke EX200

:::tip[EX200]
Objektif resmi menyebut **"Locate, read, and use system documentation
including man, info, and files in /usr/share/doc"**. Tidak ada soal yang
berbunyi "bacalah man page", tetapi ujian sengaja memuat tugas dengan opsi
yang jarang dihafal — kemampuan menemukan jawabannya di dokumentasi offline
adalah pembeda antara lulus dan kehabisan waktu. Latih pola
`man -k <kata>` → `man <section> <topik>` → cari dengan `/opsi`.
:::

## Kuis

1. Perintah mencari halaman manual berdasarkan kata kunci?
    - a. `man -k` b. `whatis` c. `info` d. `help`
2. `man 5 passwd` membahas?
    - a. perintah `passwd` b. format file `/etc/passwd` c. password d. grup
3. Bantuan untuk perintah internal bash (mis. `cd`)?
    - a. `man cd` b. `cd --help` c. `help cd` d. `info cd`

:::note[Kunci Jawaban Kuis]

1. **a** (`man -k` = `apropos`).
2. **b** (section 5 = format berkas).
3. **c** (`help` khusus builtin bash; `man cd` tidak ada karena cd builtin).
   :::

## Latihan

1. Buka `man hier` untuk memahami struktur direktori, lalu tutup dengan `q`.
2. Bandingkan `whatis date` dan `date --help`.
3. Cari semua halaman yang membahas "network": `apropos network`.

## Kunci Jawaban (klik untuk lihat)

:::note[Kunci Jawaban Latihan]

1. `man hier` → section 7, menjelaskan `/`, `/usr`, `/var`, dst.
   `q` keluar.
2. `whatis date` → 1 baris ("date - print or set the system date and time");
   `date --help` → daftar opsi lengkap (`-d`, `-u`, `+FORMAT`).
3. `apropos network` → mis. `ip(8)`, `nmcli(1)`, `ss(8)` (dokumentasi
   terkait subnet/interface).
   :::
