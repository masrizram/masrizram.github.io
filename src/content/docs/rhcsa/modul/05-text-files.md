---
title: Modul 05 — Membuat, Melihat, & Menyunting Berkas Teks (Create, View, and Edit Text Files)
---

> 📺 Referensi video: [-gARZ98HUL4](https://www.youtube.com/watch?v=-gARZ98HUL4&list=PLZkuninm20jDUT_jArQrkfCImbbi2jWns)

## 1. Melihat Isi Berkas

```bash
cat file.txt              # tampilkan seluruh isi
less file.txt             # tampilkan per halaman (aman untuk berkas besar)
head -n 20 file.txt       # 20 baris pertama
tail -n 20 file.txt       # 20 baris terakhir
tail -f /var/log/messages # ikuti (follow) penambahan baru (Ctrl+C)
```

## 2. Editor `vim` (Wajib di RHCSA)

`vim` hampir pasti ada di ujian EX200. Kuasai minimal mode dasar.

**Tiga mode utama:**

- **Normal** (tekan `Esc`) — navigasi & perintah.
- **Insert** (tekan `i`) — mengetik.
- **Command-line** (tekan `:` dari normal) — simpan/keluar.

```bash
vim file.txt
```

| Tombol (mode Normal) | Fungsi                            |
| -------------------- | --------------------------------- |
| `i`                  | mulai mengetik (insert) di kursor |
| `a`                  | insert setelah kursor             |
| `o`                  | baris baru di bawah               |
| `Esc`                | kembali ke Normal                 |
| `:w`                 | simpan                            |
| `:q`                 | keluar                            |
| `:wq` / `ZZ`         | simpan & keluar                   |
| `:q!`                | keluar tanpa simpan               |
| `dd`                 | hapus 1 baris                     |
| `yy`                 | salin 1 baris                     |
| `p`                  | tempel di bawah                   |
| `/kata`              | cari kata                         |

## 3. Redireksi & Here-Document

```bash
echo "halo" > file.txt        # timpa (overwrite)
echo "tambah" >> file.txt     # tambah (append)
cat < file.txt                # input dari berkas

# Here-document: tulis banyak baris sekaligus
cat > config.txt <<'EOF'
baris satu
baris dua
EOF
```

## 4. Filter & Transformasi Teks

```bash
grep "error" log.txt          # saring baris berisi "error"
grep -i "error" log.txt       # tidak peduli kapital
grep -v "info" log.txt        # kecuali yang berisi "info"
sort data.txt                 # urutkan
uniq data.txt                 # hilangkan duplikat berurutan
wc -l data.txt                # hitung baris
cut -d: -f1 /etc/passwd       # ambil kolom 1, pemisah ":"
tr 'a-z' 'A-Z' < file.txt     # ubah ke kapital
```

## 5. `sed` & `awk` (Dasar)

```bash
sed 's/lama/baru/g' file.txt          # ganti semua "lama" jadi "baru"
sed -i 's/lama/baru/g' file.txt       # ubah di tempat (in-place)
awk -F: '{print $1}' /etc/passwd      # cetak kolom 1
```

## 6. Jebakan Umum (EX200)

:::danger[Jebakan]

- Keluar dari `vim` tanpa menyimpan (`:q!`) padahal pekerjaan sudah banyak,
  atau sebaliknya terjebak di mode insert dan mengetik `:wq` ke dalam berkas.
- Menggunakan `>` saat maksudnya `>>` → isi berkas konfigurasi terhapus.
- Mengedit berkas sistem lewat redireksi `sudo echo … > /etc/…` → redireksi
  dijalankan oleh shell user, bukan root (Permission denied); gunakan
  `sudo tee` atau `sudo vim`.
- Menyalin berkas konfigurasi dengan editor yang mengubah konteks SELinux →
  layanan gagal; jalankan `restorecon -v` bila perlu.
- `sed` tanpa `-i` hanya menampilkan hasil ke layar, berkas tidak berubah;
  dengan `-i` tanpa cadangan, kesalahan sulit dibatalkan (`-i.bak`).
- Lupa mengutip pola `grep` yang mengandung spasi atau karakter khusus.
  :::

## 7. Koneksi ke EX200

:::tip[EX200]
Modul ini mendukung objektif **"Use grep and regular expressions to analyze
text"**, **"Create and edit text files"**, dan **"Use input-output
redirection (>, >>, |, 2>)"**. Di ujian, hampir setiap tugas berakhir pada
menyunting berkas konfigurasi (`/etc/fstab`, `/etc/ssh/sshd_config`,
unit systemd) — kecepatan dan ketepatan di `vim` adalah keterampilan
penopang utama, sementara `grep`/`sed` dipakai untuk memverifikasi hasil
kerja Anda sendiri sebelum reboot.
:::

## Kuis

1. Editor default RHEL untuk teks?
    - a. vi/vim b. nano c. emacs d. gedit
2. Di vim, mode untuk mengetik teks?
    - a. Insert (i) b. Normal c. Command d. Visual
3. Perintah cari teks dalam file?
    - a. grep b. find c. cat d. less

:::note[Kunci Jawaban Kuis]

1. **a**
2. **a**
3. **a**
   :::

## Latihan

1. Buat berkas dengan here-document berisi 3 baris, lalu `cat` untuk verifikasi.
2. Di `vim`, ketik 5 baris, simpan dengan `:wq`, lalu buka lagi dan hapus 1 baris (`dd`).
3. Hitung jumlah user di sistem: `wc -l /etc/passwd`.

## Kunci Jawaban (klik untuk lihat)

:::note[Kunci Jawaban Latihan]

1. vim standar; `i` masuk insert.
2. Normal mode untuk navigasi/perintah.
3. `grep` filter baris cocok.
   :::
