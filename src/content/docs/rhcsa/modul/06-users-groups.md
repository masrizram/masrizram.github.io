---
title: Modul 06 — Mengelola User & Group Lokal (Manage Local Users and Groups)
---

> 📺 Referensi video: [yg1IdxH38OA](https://www.youtube.com/watch?v=yg1IdxH38OA&list=PLZkuninm20jDUT_jArQrkfCImbbi2jWns)

## 1. Konsep User & Group

- Setiap user punya **UID** (User ID) unik.
- Setiap group punya **GID** (Group ID).
- User punya _primary group_ dan bisa masuk ke banyak _supplementary group_.

## 2. Berkas Penting

| Berkas         | Isi                                         |
| -------------- | ------------------------------------------- |
| `/etc/passwd`  | akun user (UID, GID, home, shell)           |
| `/etc/shadow`  | kata sandi (hash, kedaluwarsa) — hanya root |
| `/etc/group`   | definisi group                              |
| `/etc/gshadow` | sandi group                                 |

Format `/etc/passwd`:

```
nama:password(x)GIDhome:shell
```

## 3. Membuat & Mengelola User

```bash
sudo useradd budi                 # buat user
sudo useradd -m -s /bin/bash budi # pastikan home & shell
sudo passwd budi                  # set kata sandi
sudo usermod -aG wheel budi       # tambahkan ke group wheel (sudo)
sudo usermod -c "Budi Santoso" budi   # ubah deskripsi
sudo usermod -s /sbin/nologin budi    # cegah login interaktif
sudo userdel -r budi              # hapus user + home
```

## 4. Mengelola Group

```bash
sudo groupadd devops
sudo groupmod -n dev devops       # ganti nama group
sudo gpasswd -a budi dev          # tambah anggota
sudo gpasswd -d budi dev          # hapus anggota
sudo groupdel dev                 # hapus group
```

## 5. Mengatur Kedaluwarsa Sandi

```bash
sudo chage -l budi               # lihat kebijakan sandi
sudo chage -E 2026-12-31 budi    # masa berlaku sampai tanggal
sudo chage -m 7 -M 90 budi       # min 7 hari, max 90 hari
```

## 6. `id` & `who`

```bash
id budi                  # UID, GID, group dari budi
id                       # identitas saya
who                      # siapa yang sedang login
```

## 7. `sudo` (Menjalankan Sebagai Root)

```bash
sudo -l                  # perintah apa yang boleh saya jalankan
sudo command             # jalankan sebagai root
sudo -i                  # shell root interaktif
```

Konfigurasi di `/etc/sudoers` — **selalu** pakai `visudo` (aman dari corrupt):

```bash
visudo
```

## 8. Jebakan Umum (EX200)

:::danger[Jebakan]

- Membuat user dengan `useradd` lalu lupa menetapkan sandi (`passwd user`)
  → akun terkunci dan soal dianggap gagal.
- Tertukar `-g` (grup primer) dengan `-G` (grup tambahan) pada `usermod`.
- Menggunakan `usermod -G` tanpa `-a` → seluruh keanggotaan grup tambahan
  yang lama **terhapus**.
- Membuat akun sistem tanpa `-r`/`-s /sbin/nologin` padahal soal meminta
  akun tanpa login interaktif.
- Salah menafsirkan kebijakan sandi: `chage -M` (maksimum hari), `-m`
  (minimum), `-W` (peringatan), `-E` (tanggal kedaluwarsa akun).
- Menambahkan aturan `sudo` langsung di `/etc/sudoers` tanpa `visudo` →
  sintaks salah dapat mengunci akses administratif; gunakan berkas di
  `/etc/sudoers.d/`.
  :::

## 9. Koneksi ke EX200

:::tip[EX200]
Ini objektif **"Create, delete, and modify local user accounts"**,
**"Change passwords and adjust password aging"**, **"Create, delete, and
modify local groups and group memberships"**, serta **"Configure superuser
access"**. Bentuk soal tipikal: "Buat user `natasha` dengan UID 3000,
anggota grup sekunder `adminuser`, sandi `redhat`, dan wajib ganti sandi
tiap 30 hari" atau "Anggota grup `adminuser` boleh menjalankan semua
perintah sebagai root tanpa sandi". Kuncinya: `useradd -u -G`, `passwd`,
`chage -M 30`, dan berkas di `/etc/sudoers.d/` dengan `NOPASSWD: ALL`.
:::

## Kuis

1. Perintah membuat user baru?
    - a. useradd b. adduser c. mkuser d. newuser
2. File daftar user?
    - a. /etc/passwd b. /etc/shadow c. /etc/group d. /etc/users
3. Menambah user ke grup tambahan?
    - a. usermod -aG grp user b. gpasswd -a c. useradd -G d. keduanya a & b

:::note[Kunci Jawaban Kuis]

1. **a**
2. **a**
3. **d**
   :::

## Latihan

1. Buat user `siswa` dengan home & shell bash, lalu set sandi.
2. Tambahkan `siswa` ke group `wheel` agar bisa `sudo`.
3. Verifikasi: `id siswa` dan `sudo -l -U siswa`.

## Kunci Jawaban (klik untuk lihat)

:::note[Kunci Jawaban Latihan]

1. `useradd` + `/etc/passwd` baris baru.
2. `/etc/passwd` sumber user (shadow untuk hash).
3. `usermod -aG` (a=append) atau `gpasswd -a`.
   :::
