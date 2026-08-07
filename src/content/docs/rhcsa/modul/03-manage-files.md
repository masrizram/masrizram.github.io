---
title: Modul 03 — Mengelola Berkas dari Baris Perintah (Manage Files from the Command Line)
---

> 📺 Referensi video: [__5fjNolVtU](https://www.youtube.com/watch?v=__5fjNolVtU&list=PLZkuninm20jDUT_jArQrkfCImbbi2jWns)

## 1. Hirarki Sistem Berkas (FHS)

RHEL menggunakan _Filesystem Hierarchy Standard_:

| Direktori           | Isi                                  |
| ------------------- | ------------------------------------ |
| `/`                 | akar (root)                          |
| `/home`             | direktori home pengguna              |
| `/root`             | home untuk user root                 |
| `/etc`              | konfigurasi sistem                   |
| `/var`              | data yang berubah (log, mail, cache) |
| `/tmp`              | berkas sementara                     |
| `/usr`              | program & pustaka                    |
| `/bin`,`/usr/bin`   | perintah pengguna                    |
| `/sbin`,`/usr/sbin` | perintah admin                       |

## 2. Membuat & Menyalin Berkas/Direktori

```bash
touch file.txt            # buat berkas kosong
mkdir proyek              # buat direktori
mkdir -p a/b/c            # buat nested sekaligus
cp file.txt salinan.txt   # salin berkas
cp -r proyek proyek2      # salin direktori rekursif
cp -v file.txt /tmp/      # salin + verbose
```

## 3. Memindah & Menghapus

```bash
mv a.txt b.txt            # ganti nama
mv b.txt /tmp/            # pindah
rm file.txt               # hapus berkas
rm -r proyek             # hapus direktori (rekursif)
rm -i file.txt            # konfirmasi dulu
rm -rf /tmp/proyek       # paksa rekursif (HATI-HATI!)
```

> ⚠️ `rm -rf` tidak bisa dibatalkan. Tidak ada "Recycle Bin" di CLI.

## 4. Wildcard / Globbing

```bash
ls *.txt          # semua berkas berakhiran .txt
ls file?          # satu karakter apa pun (file1, fileA)
ls [abc]*         # diawali a, b, atau c
ls {a,b}.conf     # a.conf dan b.conf
```

## 5. Menghubungkan Perintah (Pipe)

```bash
ls -l /etc | less            # tampilkan per halaman
cat /etc/passwd | wc -l      # hitung baris
ps aux | grep httpd          # saring proses
```

## 6. Path Absolut vs Relatif

- **Absolut**: dimulai dari `/`, contoh `/etc/hosts`.
- **Relatif**: dari posisi sekarang, contoh `../data/file`.

## 7. Mencari Berkas dengan `find` (Wajib EX200)

```bash
find / -name "passwd"              # cari berdasar nama
find /etc -name "*.conf"           # wildcard
find /home -user operator          # milik user tertentu
find / -perm 4000                  # berkas setuid
find / -mtime -1                   # dimodifikasi < 1 hari lalu
find /tmp -size +10M               # lebih besar 10 MB
find . -type f -exec rm {} \;      # eksekusi per hasil
```

| Opsi               | Arti                          |
| ------------------ | ----------------------------- |
| `-name`            | cocok nama (case-sensitive)   |
| `-iname`           | cocok nama (case-insensitive) |
| `-user` / `-group` | pemilik                       |
| `-perm`            | izin (mis. `4000` setuid)     |
| `-mtime -N` / `+N` | modifikasi < N / > N hari     |
| `-size +N` / `-N`  | ukuran lebih / kurang         |
| `-type f` / `d`    | berkas / direktori            |
| `-exec cmd {} \;`  | jalankan per hasil            |

## 8. Arkip & Kompresi (tar / gzip / star) — Wajib EX200

```bash
# Membuat arsip
tar -czf backup.tar.gz /etc           # gzip (paling umum)
tar -cjf backup.tar.bz2 /etc          # bzip2
tar -czf etc-$(date +%F).tar.gz /etc # nama dinamis

# Mengekstrak
tar -xzf backup.tar.gz               # ke direktori saat ini
tar -xzf backup.tar.gz -C /tmp/restore   # ke tujuan tertentu

# Melihat isi tanpa ekstrak
tar -tzf backup.tar.gz

# star (RHEL, mirip tar, untuk arsip besar/extended)
star -czf backup.star /etc
```

> 💡 Di RHEL, `tar` sudah cukup untuk ujian. `star` ada sebagai alternatif
> (package `star`) — kenali perintahnya, tapi `tar` prioritas utama.

## 9. Jebakan Umum (EX200)

:::danger[Jebakan]

- `cp` tanpa `-a`/`-p` menghapus kepemilikan, timestamp, dan konteks SELinux
  → soal yang menuntut atribut asli akan gagal.
- `cp -r` untuk direktori sering tertukar dengan `cp` biasa → "omitting
  directory".
- Wildcard tidak dikutip pada `find -name` (`find / -name *.conf`) → shell
  mengekspansi lebih dulu dan hasilnya salah; gunakan `-name '*.conf'`.
- Membuat arsip dengan path absolut (`tar -cf … /etc`) lalu mengekstrak
  menimpa sistem; gunakan path relatif atau `-C`.
- Salah opsi kompresi: `.tar.gz` butuh `-z`, `.tar.bz2` butuh `-j`,
  `.tar.xz` butuh `-J`.
- Salah arah symlink atau membuat hard link lintas filesystem (tidak bisa).
  :::

## 10. Koneksi ke EX200

:::tip[EX200]
Modul ini memenuhi objektif **"Create, delete, copy, and move files and
directories"**, **"Create hard and soft links"**, serta
**"Archive, compress, unpack, and uncompress files using tar, star, gzip,
and bzip2"** — semuanya masuk kelompok _essential tools_. Bentuk soal
tipikal: "Arsipkan `/etc/…` ke `/root/backup.tar.gz` mempertahankan izin"
atau "Temukan semua berkas milik user X berukuran >5M dan salin ke
`/opt/…`". Kunci jawaban hampir selalu kombinasi `find … -exec`/`xargs`
dengan `cp -a` dan `tar` beropsi kompresi yang tepat.
:::

## Kuis

1. Perintah membuat direktori bertingkat sekaligus?
    - a. `mkdir a/b/c` b. `mkdir -p a/b/c` c. `touch -p` d. `cp -r`
2. Menghapus direktori beserta isi tanpa konfirmasi?
    - a. `rm dir` b. `rm -r dir` c. `rm -rf dir` d. `rmdir dir`
3. `ls *.txt` artinya?
    - a. semua berkas b. berkas berakhiran .txt c. berkas diawali txt d. direktori

:::note[Kunci Jawaban Kuis]

1. **b** (`-p` = parents, buat nested).
2. **c** (`-rf` = recursive + force, tanpa konfirmasi — hati-hati).
3. **b** (wildcard `*` = apa pun di akhiran).
   :::

## Latihan

1. Buat struktur: `mkdir -p latihan/modul03` lalu `touch latihan/modul03/coba.txt`.
2. Salin ke `/tmp`: `cp -r latihan /tmp/latihan`.
3. Gunakan wildcard: buat 3 berkas `x1 x2 x3`, lalu `ls x?` untuk membuktikan.

## Kunci Jawaban (klik untuk lihat)

:::note[Kunci Jawaban Latihan]

1. `mkdir -p latihan/modul03` membuat nested; `touch` membuat berkas kosong.
2. `cp -r` penting (direktori butuh `-r`), hasil di `/tmp/latihan/`.
3. `x?` cocok `x1 x2 x3` (1 karakter sesudah x). `ls x*` juga cocok.
   :::
