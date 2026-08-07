---
title: Modul 01 — Memulai dengan RHEL (Get Started with Red Hat Enterprise Linux)
---

> 📺 Referensi video: [i4oSjt2nYhk](https://www.youtube.com/watch?v=i4oSjt2nYhk&list=PLZkuninm20jDUT_jArQrkfCImbbi2jWns)

## 1. Cara Mengakses RHEL

Ada beberapa cara masuk ke sistem RHEL:

1. **Physical / Virtual console** — langsung di server (tty).
2. **SSH** — jarak jauh via terminal (`ssh user@host`).
3. **Web Console (Cockpit)** — antarmuka web `https://<host>:9090`.

## 2. Red Hat Web Console (Cockpit)

Cockpit memudahkan administrasi lewat browser:

```bash
# Cek status layanan cockpit
systemctl status cockpit.socket

# Jika belum aktif, nyalakan dan buka firewall
systemctl enable --now cockpit.socket
firewall-cmd --add-service=cockpit --permanent
firewall-cmd --reload
```

Buka `https://alamat-server:9090` di browser. Login pakai user lokal.

## 3. Terminal & Shell

- **Shell** adalah penerjemah perintah; default di RHEL adalah **BASH**.
- **Prompt** umumnya: `[user@host ~]$` (biasa) atau `#` (root).
- Tilde `~` = direktori home pengguna.

```bash
# Siapa saya?
whoami

# Di mana saya sekarang?
pwd

# Hostname
hostname
```

## 4. Virtual Console (TTY)

Tekan `Ctrl + Alt + F2` sampai `F6` untuk berpindah antar konsol teks.
`Ctrl + Alt + F1` (atau `F2` di beberapa setup) kembali ke grafis.

## 5. Menjalankan Perintah Dasar

```bash
date          # tanggal & waktu
cal           # kalender
uptime        # sudah hidup berapa lama + beban
echo "hai"    # cetak teks
clear         # bersihkan layar (juga Ctrl+L)
```

## 6. Struktur Prompt BASH (Untuk Dipahami)

```
[user@host direktori] $
 ^     ^   ^            ^-- tanda: $ = user biasa, # = root
 |     |   +-- direktori kerja
 |     +------ hostname
 +-------- username
```

## 7. Jebakan Umum (EX200)

:::danger[Jebakan]

- Mengira Cockpit tersedia otomatis → paket `cockpit` perlu dipasang dan
  disosialisasikan lewat `systemctl enable --now cockpit.socket` serta port
  9090 dibuka di `firewalld`.
- Bekerja sebagai `root` terus-menerus lalu berkas milik user berubah
  kepemilikan; biasakan `sudo` dari akun biasa.
- Bingung `su` vs `su -`: tanpa tanda `-`, environment dan `PATH` lama tetap
  dipakai sehingga perintah administratif "tidak ditemukan".
- Mengerjakan soal hanya di sesi GUI dan lupa bahwa penilaian dilakukan
  setelah **reboot** — perubahan yang hanya di memori akan hilang.
- Salah TTY: `Ctrl+Alt+F2..F6` untuk konsol virtual; peserta sering panik
  mengira sistem hang padahal hanya berpindah konsol.
- Menutup terminal saat proses panjang berjalan di foreground → proses mati.
  :::

## 8. Koneksi ke EX200

:::tip[EX200]
Modul ini menopang objektif **"Understand and use essential tools"**:
mengakses prompt shell, menjalankan perintah dengan sintaks yang benar, serta
masuk ke sistem lokal maupun jarak jauh. Di ujian Anda tidak akan ditanya
"apa itu Cockpit", melainkan langsung diminta bekerja di shell: login sebagai
user tertentu, naik hak dengan `sudo`, lalu menjalankan tugas administratif.
Kuasai perpindahan konsol virtual dan penggunaan `su -` agar tidak kehilangan
waktu saat sesi grafis bermasalah.
:::

## Kuis

1. Perintah melihat direktori kerja sekarang?
    - a. pwd b. ls c. cd d. whoami
2. Untuk masuk sebagai root dari user biasa?
    - a. su - b. sudo su c. login root d. ketiganya benar
3. Shell default di RHEL?
    - a. bash b. sh c. zsh d. fish

:::note[Kunci Jawaban Kuis]

1. **a**
2. **d**
3. **a**
   :::

## Latihan

1. Akses Cockpit (atau jalankan `systemctl status cockpit.socket`).
2. Jalankan `whoami`, `pwd`, `hostname`, `date` dan amati outputnya.
3. Tekan `Ctrl+L` untuk membersihkan layar — apa bedanya dengan `clear`?

## Kunci Jawaban (klik untuk lihat)

:::note[Kunci Jawaban Latihan]

1. Cockpit dijalankan lewat `systemctl status cockpit.socket` (atau buka
   `https://<host>:9090` di browser, login pakai user lokal).
2. `whoami` → nama user aktif; `pwd` → direktori home (mis. `/home/user`);
   `hostname` → nama host; `date` → tanggal & waktu sistem.
3. `Ctrl+L` dan perintah `clear` sama-sama membersihkan layar — `Ctrl+L`
   bekerja langsung di shell interaktif (tanpa mengetik perintah),
   sedangkan `clear` adalah perintah eksternal.
   :::
