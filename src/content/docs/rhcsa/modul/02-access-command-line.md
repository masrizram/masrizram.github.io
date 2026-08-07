---
title: Modul 02 — Mengakses Baris Perintah (Access the Command Line)
---

> 📺 Referensi video: [aYTFiUhNN7E](https://www.youtube.com/watch?v=aYTFiUhNN7E&list=PLZkuninm20jDUT_jArQrkfCImbbi2jWns)

## 1. Anatomi Perintah Shell

```
perintah   opsi           argumen
  │         │               │
 ls      -l -h         /var/log
```

- **Opsi pendek**: `-l -a` bisa digabung `-la`.
- **Opsi panjang**: `--help`, `--size`.
- **Argumen**: target (berkas/direktori).

## 2. Perintah Navigasi & Informasi

```bash
pwd              # print working directory
ls               # list isi direktori
ls -l            # format panjang (izin, pemilik, ukuran, waktu)
ls -a            # tampilkan berkas tersembunyi (diawali .)
ls -lh           # ukuran manusiawi (K, M, G)
cd /etc          # pindah direktori
cd ~             # ke home
cd ..            # ke atas satu level
cd -             # ke direktori sebelumnya
```

## 3. Sejarah Perintah (History)

```bash
history                 # lihat riwayat
!123                    # jalankan perintah nomor 123
!!                      # ulang perintah terakhir
!sudo                   # jalankan perintah terakhir diawali sudo
Ctrl + R                # cari interaktif di history
```

## 4. Menyelesaikan & Membatalkan Perintah

| Tombol     | Fungsi                               |
| ---------- | ------------------------------------ |
| `Tab`      | _auto-complete_ nama berkas/perintah |
| `Ctrl + C` | batalkan perintah yang berjalan      |
| `Ctrl + D` | tutup shell / kirim EOF              |
| `Ctrl + L` | bersihkan layar                      |
| `Ctrl + A` | ke awal baris                        |
| `Ctrl + E` | ke akhir baris                       |
| `Ctrl + U` | hapus dari awal hingga kursor        |
| `Ctrl + K` | hapus dari kursor hingga akhir       |

## 5. Variabel Lingkungan (Environment)

```bash
echo $HOME          # direktori home
echo $USER          # user aktif
echo $PATH          # daftar direktori pencarian perintah
export NAMA=nilai   # buat/ubah variabel
env                 # lihat semua variabel lingkungan
```

## 6. Escape & Quoting

```bash
echo "harga: \$5"     # tanda kutip ganda: variabel diekspansi, $ dilindungi dgn backslash
echo 'harga: $5'      # tanda kutip tunggal: SEMUA literal
echo hai\ dunia       # backslash menghubungkan spasi
```

## 7. Jebakan Umum (EX200)

:::danger[Jebakan]

- Salah kutip: tanda petik ganda `"` tetap mengekspansi `$VAR`, petik tunggal
  `'` tidak. Banyak jawaban gagal karena variabel ikut terekspansi.
- Menempatkan spasi di sekitar `=` saat memberi nilai variabel
  (`NAMA = nilai`) → shell menganggap `NAMA` sebagai perintah.
- Mengubah variabel tanpa `export` sehingga tidak diwariskan ke proses anak.
- Mengandalkan `history` untuk mengulang perintah lalu salah nomor event
  (`!123`) dan mengeksekusi perintah destruktif.
- Lupa `Tab` completion dan salah ketik path panjang — sumber kesalahan
  paling sering saat mengejar waktu.
- Menghentikan proses dengan `Ctrl+Z` (suspend) padahal maksudnya
  menghentikan (`Ctrl+C`), lalu job tertinggal di latar belakang.
  :::

## 8. Koneksi ke EX200

:::tip[EX200]
Ini inti objektif **"Understand and use essential tools"**: menggunakan
prompt shell, input/output redirection, ekspansi, dan variabel lingkungan.
Tidak ada soal khusus "tulis anatomi perintah", tetapi setiap soal lain di
EX200 dikerjakan melalui keterampilan di modul ini. Efisiensi mengetik —
completion, `history`, quoting yang benar — langsung menentukan apakah Anda
selesai dalam batas waktu ujian.
:::

## Kuis

1. Untuk menjalankan perintah sebagai admin?
    - a. sudo cmd b. su cmd c. admin cmd d. root cmd
2. `ls -l` menampilkan?
    - a. detail izin/owner b. hanya nama c. ukuran saja d. waktu saja
3. Virtual console diakses dengan?
    - a. Ctrl+Alt+F2 b. Alt+Tab c. Ctrl+C d. Win+L

:::note[Kunci Jawaban Kuis]

1. **a**
2. **a**
3. **a**
   :::

## Latihan

1. Gunakan `history` lalu jalankan kembali perintah nomor tertentu dengan `!nomor`.
2. Di `/etc`, jalankan `ls -la` dan jelaskan kolom pertama (izin).
3. Buat variabel `export LATIHAN=RH124` lalu `echo $LATIHAN`.

## Kunci Jawaban (klik untuk lihat)

:::note[Kunci Jawaban Latihan]

1. `history` menampilkan daftar perintah bernomor; `!nomor` (mis. `!123`)
   menjalankan ulang baris ke-123 dari riwayat.
2. `ls -la` kolom pertama = izin (mis. `-rw-r--r--`); opsi `-a` menampilkan
   berkas tersembunyi (diawali titik), `-l` format panjang.
3. `export LATIHAN=RH124` membuat variabel lingkungan; `echo $LATIHAN`
   menampilkan nilainya → `RH124`.
   :::
