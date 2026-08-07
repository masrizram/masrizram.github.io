---
title: Jalur Sertifikasi Red Hat (RHCSA → RHCE → RHCA)
description: Evaluasi menyeluruh jalur Red Hat — kesiapan, skill, dan roadmap dari dasar Linux hingga Red Hat Certified Architect.
lastVerified: 2026-08-06
---

# Jalur Sertifikasi Red Hat

Evaluasi menyeluruh jalur sertifikasi **Red Hat** dari tahap dasar hingga puncak.
Tujuannya menilai kesiapan, skill, dan progres, serta menyusun roadmap jelas
menuju **RHCA** (Red Hat Certified Architect).

:::note[Diverifikasi 6 Agustus 2026]
EX200 (RHCSA) berbasis **RHEL 10**, durasi **3 jam**, _performance-based_ (bukan
pilihan ganda). **Red Hat tidak mempublikasikan angka lulus pasti**; secara
historis sekitar ~210/300. EX294 (RHCE) fokus Ansible, 4 jam.

Sejak reorganisasi **Mei 2026**, **RHCA bersifat per-track**: bukan lagi
"RHCE + 5 spesialisasi bebas", melainkan **1 exam Admin + 1 exam Engineer +
3 exam Specialist di dalam track yang sama**. Ada 5 track: Enterprise Linux,
Ansible, OpenShift, Cloud-native Applications, dan AI. Selalu cek
[redhat.com/training](https://www.redhat.com/en/services/certifications) untuk
perubahan terkini.
:::

## 🗺️ Roadmap Singkat

```
Dasar Linux ──▶ RHCSA (EX200) ──▶ RHCE (EX294) ──▶ RHCA (Architect, per-track)
 Shell, fs,        RHEL sysadmin     Ansible automation  1 Admin + 1 Engineer
 user/group        (3 jam)           (4 jam)             + 3 Specialist (1 track)
```

---

## 1. Dasar Linux & Sistem Operasi

**Fokus:** command line, file system, user/group management.

### Kekuatan yang Dibutuhkan

- Navigasi shell, piping, redirection, `grep`/`sed`/`awk` dasar.
- Pemahaman hierarki file system Linux & path absolut/relatif.
- Manajemen user/grup (`useradd`, `passwd`, `/etc/passwd`, `sudo`).
- Editor `vim` tingkat dasar.

### Kelemahan Umum (Audit)

- Takut terminal; bergantung GUI.
- Tidak paham permission (ugo/rwx, `chmod`/`chown`).
- Tidak hafal `man`/`--help` → lambat saat troubleshooting.

### Rekomendasi → RHCSA

1. Latih 30 hari tantangan CLI (OverTheWire Bandit).
2. Kuasai `vim`, `less`, `find`, `journalctl`.
3. Pahami partisi & mount (`lsblk`, `/etc/fstab`, LVM dasar).

**Kriteria siap lanjut (terukur):** 3 dari 3 terpenuhi — (1) menyelesaikan 10
tugas CLI harian tanpa GUI dan tanpa membuka catatan, (2) menjelaskan arti tiap
kolom `ls -l` dan mengubah permission ke target yang diminta dalam < 60 detik,
(3) menemukan opsi perintah yang belum dikenal lewat `man`/`--help` dalam
< 2 menit.

---

## 2. RHCSA — Red Hat Certified System Administrator (EX200)

**Fokus:** administrasi sistem, storage, proses, service, firewall, SELinux.

### Kekuatan yang Dibutuhkan

- `systemd` (start/enable/mask, `journalctl`, unit file).
- Storage: partisi GPT, LVM (PV/VG/LV, extend), swap, mount NFS, autofs.
- File system: XFS, ext4, VFAT; mount permanen via UUID/label.
- Jaringan: `nmcli` (IPv4 **dan IPv6**), `nmstate` (deklaratif, RHEL 10),
  firewall (`firewall-cmd`/`firewalld`), resolusi hostname.
- **SELinux**: enforcing, boolean, label file (`semanage fcontext`, `restorecon`).
- Manajemen paket **DNF + Flatpak** (Flatpak = objektif resmi RHEL 10).
- Shell scripting dasar (if/test, for, `$1`, output command).
- Penjadwalan: `at`, `cron`, **systemd timer**; waktu via `chronyc`.
- Boot: target, bootloader `grub2`, interupsi boot (`rd.break`), profil `tuned`.
- Akses jarak jauh: SSH key, transfer file aman (`scp`/`rsync`), `cockpit`.

:::caution[Di luar objektif EX200 RHEL 10 — jangan salah alokasi waktu]
**Podman/container**, **Stratis**, **VDO**, **disk quota**, **kickstart**, dan
**bonding/teaming** **bukan** objektif resmi EX200 RHEL 10. Teaming bahkan
sudah _deprecated_ sejak RHEL 9. Semua tetap tersedia di repo ini sebagai
**materi perluasan** (Modul 13 & 15) karena berguna di lapangan dan masih muncul
di lingkungan RHEL 9 — tapi jangan dijadikan prioritas belajar ujian.
:::

### Kelemahan Umum (Audit)

- Menonaktifkan SELinux (`setenforce 0`) alih-alih memperbaiki label.
- Gagal `fstab` → sistem tidak boot (tidak tahu recovery mode).
- Tidak bisa debug `firewalld` / port tidak listen.

### Rekomendasi → RHCE

1. Kuasai **Shell scripting** (Bash) untuk otomasi repetitif.
2. Pahami **Ansible** dasar (inventory, playbook, module `yum`/`service`/`copy`).
3. Latih 3 jam penuh tanpa dokumentasi (simulasi ujian).

**Kriteria siap lanjut (terukur):** menyelesaikan [Simulasi Ujian 180 menit](/rhcsa/referensi/simulasi-ujian/)
dengan **seluruh tugas** selesai dan terverifikasi **setelah reboot**, dikerjakan
tanpa catatan, 2 kali berturut-turut. Tanda resmi: **lulus EX200**.

---

## 3. RHCE — Red Hat Certified Engineer (EX294)

**Fokus:** automation dengan Ansible, advanced networking, security.

### Kekuatan yang Dibutuhkan

- Menulis **playbook Ansible** idempoten (roles, vars, handlers, loops).
- Manajemen konfigurasi: `ansible-navigator`, `ansible-playbook`.
- Modul umum: `dnf`, `service`, `copy`, `template`, `lineinfile`, `user`.
- Integrasi dengan `Vault` (enkripsi secret), `facts`, `register`.
- Automation jaringan/storage via Ansible.

### Kelemahan Umum (Audit)

- Playbook tidak idempoten → error saat dijalankan 2×.
- Menjalankan command ad-hoc alih-alih deklaratif.
- Tidak paham `become` / privilege escalation.

### Rekomendasi → RHCA

1. Pilih **satu track RHCA** (Enterprise Linux, Ansible, OpenShift, Cloud-native, atau AI).
2. Dalami produk inti track tersebut (mis. OpenShift: EX280 → EX288).
3. Bangun lab multi-node (Vagrant/Libvirt) untuk Ansible scale.

**Kriteria siap lanjut (terukur):** menulis playbook multi-role yang idempoten
(jalan 2× → `changed=0`), lulus [Simulasi Ansible](/rhcsa/modul/23-rhce-ex294-ansible/),
dan resmi **lulus EX294**.

---

## 4. RHCA — Red Hat Certified Architect

**Fokus:** desain arsitektur enterprise, cloud, container, high availability.

### Kekuatan yang Dibutuhkan

- **Satu track dipilih**, lalu lengkapi **1 Admin + 1 Engineer + 3 Specialist**
  di track yang sama (skema per-track, berlaku sejak Mei 2026):
    - **Enterprise Linux**: RHCSA (EX200) → RHCE (EX294) → mis. EX358 (Services
      Management & Automation), EX362 (Identity Management), EX342 (Linux
      Performance Tuning).
    - **Ansible**: RHCE (EX294) → EX374 (Developing Automation with AAP),
      EX467 (Managing AAP).
    - **OpenShift**: EX280 (OpenShift Administration) → EX288 (OpenShift
      Application Development) → EX380 (OpenShift Automation & Integration),
      EX316 (Virtualization), EX260 (Ceph Cloud Storage).
    - **Cloud-native Applications** dan **AI**: track terbaru, cek katalog resmi
      untuk daftar exam yang aktif.
- Desain solusi high-availability & disaster recovery.
- Integrasi multi-produk Red Hat (Satellite, Ansible Automation Platform).

:::caution[Kode exam berubah — verifikasi sebelum mendaftar]
Kode exam Red Hat sering diganti atau dipensiunkan. Contoh: **EX318
(Virtualization) sudah pensiun** (digantikan EX316), jalur Ceph kini **EX260**
(bukan EX236), **EX342 = Linux Performance Tuning** (bukan IdM — IdM adalah
**EX362**), dan **EX240 = API Management**. Selalu konfirmasi kode + nama exam
di [katalog resmi Red Hat](https://www.redhat.com/en/services/certifications)
sebelum membayar.
:::

### Kelemahan Umum (Audit)

- Terpaku satu domain (mis. cuma container) → tak flexible.
- Tidak mengikuti roadmap spesialisasi yang koheren.
- RHCE kedaluwarsa → harus perpanjang sebelum RHCA sah.

### Rekomendasi (Puncak)

1. **Pilih satu track lebih dulu**, lalu susun kombinasi **1 Admin + 1 Engineer + 3 Specialist**
   di track itu (mis. Enterprise Linux: EX200 → EX294 → EX358 + EX362 + EX342).
2. Verifikasi kode & nama exam di katalog resmi sebelum mendaftar — kode berubah.
3. Dokumentasikan arsitektur reference (draw.io / markdown).
4. Jaga sertifikat tetap _current_ (renewal: retake, level up, atau advance).

**Kriteria tercapai (terukur):** transkrip Red Hat menunjukkan 5 sertifikat aktif
dalam **satu track** dengan komposisi 1 Admin + 1 Engineer + 3 Specialist.

---

## 📊 Ringkasan Progres per Tahap

| Tahap           | Fokus               | Prereq      | Tanda Tuntas                           |
| --------------- | ------------------- | ----------- | -------------------------------------- |
| **Dasar Linux** | CLI, fs, user       | —           | 10 tugas CLI tanpa GUI & tanpa catatan |
| **RHCSA**       | Sysadmin RHEL 10    | Dasar Linux | Lulus EX200 (3 jam, performance-based) |
| **RHCE**        | Ansible automation  | RHCSA       | Lulus EX294 (4 jam)                    |
| **RHCA**        | Architect per-track | 1 track     | 1 Admin + 1 Engineer + 3 Specialist    |

> Red Hat **tidak mempublikasikan** angka lulus pasti untuk EX200/EX294;
> historis sekitar ~210/300. Kejar **semua** tugas, bukan sekadar 70%.

## 🚀 Roadmap Praktis

1. **Dasar** → kuasai CLI (1–2 bulan).
2. **RHCSA** (EX200) → lab harian + simulasi 180 menit (2–3 bulan).
3. **RHCE** (EX294) → Ansible project nyata (2–3 bulan).
4. **RHCA** → 3 Specialist dalam track terpilih, bertahap (6–12 bulan).

> Waktu realistis (belajar sambil kerja): ~1.5–2.5 tahun untuk jalur lengkap
> Dasar → RHCA.

## ⚠️ Etika & Legalitas

Gunakan lab berizin (VirtualBox/KVM, RHEL Developer Subscription gratis).
Jangan uji sistem produksi tanpa otorisasi.

---

:::note[Merek dagang & afiliasi]
Red Hat, RHEL, RHCSA, RHCE, RHCA, dan seluruh kode exam `EX###` adalah merek
dagang terdaftar milik Red Hat, Inc. Materi ini disusun secara **independen**
untuk keperluan pendidikan dan **tidak berafiliasi dengan, tidak disponsori,
maupun tidak didukung oleh Red Hat, Inc.** Rujukan resmi:
[redhat.com/certifications](https://www.redhat.com/en/services/certifications).

**Terakhir diverifikasi terhadap katalog sertifikasi Red Hat: 6 Agustus 2026.**
:::
