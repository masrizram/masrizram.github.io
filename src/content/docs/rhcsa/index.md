---
title: 📘 Panduan Lengkap RHCSA (RH124 / RH199) — RHEL 9 & 10
---

Selamat datang di panduan langkah-demi-langkah menuju sertifikasi
**Red Hat Certified System Administrator (EX200)**, berbasis kurikulum
**Red Hat System Administration I (RH124 / RH199)**.

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 not-content">
  <div class="rounded-lg border border-border/60 p-4">
    <div class="text-2xl">📦</div>
    <h3>23 Modul Terstruktur</h3>
    <p>Dari shell dasar hingga SELinux, Enterprise Reality, & Runbook Troubleshooting Produksi — disusun sesuai kurikulum resmi & diselaraskan objektif EX200 RHEL 10.</p>
  </div>
  <div class="rounded-lg border border-border/60 p-4">
    <div class="text-2xl">🛠️</div>
    <h3>Latihan Praktik</h3>
    <p>LAB per modul + simulasi EX200 180 menit (setara durasi ujian nyata), bisa dijalankan tanpa disk tambahan.</p>
  </div>
  <div class="rounded-lg border border-border/60 p-4">
    <div class="text-2xl">🛡️</div>
    <h3>Jebakan & Koneksi EX200</h3>
    <p>Tiap modul kunci diberi tahu apa yang sering membatalkan peserta ujian.</p>
  </div>
  <div class="rounded-lg border border-border/60 p-4">
    <div class="text-2xl">⌨️</div>
    <h3>Cheat Sheet & Glosarium</h3>
    <p>Ringkasan perintah + 35+ istilah RHCSA siap dibuka kapan saja.</p>
  </div>
</div>

Mulai belajar: **[🗺️ Pusat Belajar](/rhcsa/pusat-belajar/)** · **[Pengantar →](/rhcsa/modul/00-pengantar-dan-roadmap/)**

Cepat cari materi: tekan `Ctrl`+`K` (atau `⌘`+`K` di Mac)

> **Basis materi:** RHEL 9.3 (berlaku juga untuk RHEL 10.x). Semua perintah diuji
> pada lingkungan RHEL / Rocky Linux / AlmaLinux / Fedora yang setara.

## 🧭 Mulai dari Mana?

1. Buka **[🗺️ Pusat Belajar](/rhcsa/pusat-belajar)** — peta jalan 16 minggu & cara pakai.
2. Ikuti **Modul 0 → 22** di panel navigasi kiri (Modul 21 = Enterprise Reality, Modul 22 = Runbook Troubleshooting Produksi).
3. Kerjakan **[🛠️ Latihan (LAB)](/rhcsa/lab/LAB)** di tiap modul.
4. Gunakan **[⌨️ Cheat Sheet](/rhcsa/referensi/CHEATSHEET)** sebagai referensi cepat.
5. Persiapan ujian: **[🎯 Persiapan EX200](/rhcsa/referensi/EX200-prep)**.

## 🎯 Yang Akan Kamu Kuasai

- Akses & perintah RHEL via shell & web console (Cockpit).
- Kelola berkas, teks (`vim`), user/grup, dan hak akses (incl. ACL).
- Pantau proses, kelola `systemd`, amankan SSH.
- Konfigurasi jaringan, DNF (+ **Flatpak**), dan file system (incl. LVM).
- Siap menghadapi ujian **EX200 (RHCSA)** berbasis **RHEL 10** (Containers/Podman sudah diganti Flatpak di objektif resmi — lihat Modul 15 & 18).

## 📚 Daftar Modul

| #   | Modul                                                                                  |
| --- | -------------------------------------------------------------------------------------- |
| 00  | [Pengantar & Roadmap](/rhcsa/modul/00-pengantar-dan-roadmap)                           |
| 01  | [Get Started with RHEL](/rhcsa/modul/01-get-started-rhel)                              |
| 02  | [Access the Command Line](/rhcsa/modul/02-access-command-line)                         |
| 03  | [Manage Files](/rhcsa/modul/03-manage-files)                                           |
| 04  | [Get Help in RHEL](/rhcsa/modul/04-get-help)                                           |
| 05  | [Text Files (vim)](/rhcsa/modul/05-text-files)                                         |
| 06  | [Users & Groups](/rhcsa/modul/06-users-groups)                                         |
| 07  | [Permissions & ACL](/rhcsa/modul/07-file-permissions)                                  |
| 08  | [Processes](/rhcsa/modul/08-processes)                                                 |
| 09  | [systemd Services](/rhcsa/modul/09-services-daemons)                                   |
| 10  | [SSH & Security](/rhcsa/modul/10-ssh)                                                  |
| 11  | [Networking](/rhcsa/modul/11-networking)                                               |
| 12  | [Software (DNF)](/rhcsa/modul/12-software-dnf)                                         |
| 13  | [File Systems & LVM](/rhcsa/modul/13-filesystems)                                      |
| 14  | [Support & Logs](/rhcsa/modul/14-support)                                              |
| 15  | [Podman & Containers](/rhcsa/modul/15-podman-containers)                               |
| 16  | [SELinux](/rhcsa/modul/16-selinux)                                                     |
| 17  | [Penjadwalan & Time Zone](/rhcsa/modul/17-scheduling)                                  |
| 18  | [EX200 (RHCSA) Prep](/rhcsa/modul/18-ex200-prep)                                       |
| 19  | [Skenario EX200 Terukur](/rhcsa/modul/19-skenario-ex200)                               |
| 20  | [Shell Scripting Dasar](/rhcsa/modul/20-shell-scripting)                               |
| 21  | [System Engineer Enterprise](/rhcsa/modul/21-enterprise-system-engineer)               |
| 22  | [Runbook Troubleshooting Produksi](/rhcsa/modul/22-runbook-troubleshooting-production) |

## 🖥️ Siapkan Lab (Gratis)

```bash
# Opsi container (tanpa install OS):
podman run -it --name lab-rhel rockylinux:9 bash
# Atau VirtualBox + Rocky Linux 9, atau WSL2: wsl --install -d FedoraLinux-42
```

## ⚠️ Catatan Sumber & Status Transkrip

Panduan ini mengikuti kurikulum resmi **RH124** dari playlist referensi.
**Transkrip ke-19 video belum diambil seluruhnya** (YouTube memblokir akses
transkrip dari IP ekstraksi). Materi diperkuat dengan latihan, _Jebakan Umum_,
_Koneksi EX200_, dan kuis di tiap modul. Jika Anda punya transkrip resmi,
kirimkan agar tiap modul bisa diperkaya dengan contoh video.

**Playlist referensi:**
[Playlist RH124 (Ozzoy Bits)](https://www.youtube.com/watch?v=pnHqii1Oq8Y&list=PLZkuninm20jDUT_jArQrkfCImbbi2jWns)
