---
title: Jalur Sertifikasi Red Hat (RHCSA → RHCE → RHCA)
description: Evaluasi menyeluruh jalur Red Hat — kesiapan, skill, dan roadmap dari dasar Linux hingga Red Hat Certified Architect.
---

# Jalur Sertifikasi Red Hat

Evaluasi menyeluruh jalur sertifikasi **Red Hat** dari tahap dasar hingga puncak.
Tujuannya menilai kesiapan, skill, dan progres, serta menyusun roadmap jelas
menuju **RHCA** (Red Hat Certified Architect).

> Catatan (per 2024–2025): EX200 (RHCSA) berbasis **RHEL 9/10**, durasi 3 jam,
> passing 210/300 poin (70%) — ujian praktis (performance-based), bukan
> pilihan ganda. EX294 (RHCE) fokus Ansible, 4 jam. RHCA = RHCE + 5 sertifikat
> spesialisasi. Selalu cek redhat.com/training untuk perubahan terkini.

## 🗺️ Roadmap Singkat

```
Dasar Linux ──▶ RHCSA (EX200) ──▶ RHCE (EX294) ──▶ RHCA (Architect)
 Shell, fs,        RHEL sysadmin     Ansible automation  +5 spesialisasi
 user/group        (3h, 70%)         (4h, 70%)           (OpenShift/Ceph/IdM/...)
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

**Skor progres: 100%** saat lancar operasi harian tanpa GUI.

---

## 2. RHCSA — Red Hat Certified System Administrator (EX200)

**Fokus:** administrasi sistem, storage, proses, service, firewall, SELinux.

### Kekuatan yang Dibutuhkan

- `systemd` (start/enable/mask, `journalctl`, unit file).
- Storage: partisi, LVM, VDO, Stratis, NFS/SMB mount.
- Jaringan: `nmcli`, bond/team, firewall (`firewalld`), port forwarding.
- **SELinux**: enforcing, boolean, label file (`semanage fcontext`, `restorecon`).
- Manajemen paket DNF, kickstart dasar, container (Podman) dasar.
- Akses jarak jauh: SSH key, `cockpit`.

### Kelemahan Umum (Audit)

- Menonaktifkan SELinux (`setenforce 0`) alih-alih memperbaiki label.
- Gagal `fstab` → sistem tidak boot (tidak tahu recovery mode).
- Tidak bisa debug `firewalld` / port tidak listen.

### Rekomendasi → RHCE

1. Kuasai **Shell scripting** (Bash) untuk otomasi repetitif.
2. Pahami **Ansible** dasar (inventory, playbook, module `yum`/`service`/`copy`).
3. Latih 3 jam penuh tanpa dokumentasi (simulasi ujian).

**Skor progres: 100%** saat lulus EX200 (210/300 poin).

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

1. Pilih **jalur spesialisasi** (container/OpenShift, storage, atau identity).
2. Dalami `podman` + `kubernetes` (OpenShift EX280/EX288).
3. Bangun lab multi-node (Vagrant/Libvirt) untuk Ansible scale.

**Skor progres: 100%** saat lulus EX294.

---

## 4. RHCA — Red Hat Certified Architect

**Fokus:** desain arsitektur enterprise, cloud, container, high availability.

### Kekuatan yang Dibutuhkan

- **RHCE aktif** + 5 sertifikat spesialisasi (pilih dari track):
    - Containers/OpenShift: EX280 (OpenShift Admin), EX288 (OpenShift Dev)
    - Storage: EX236 (Ceph), EX318 (Gluster)
    - Identity: EX342 (Red Hat IdM)
    - Cloud: EX210 (OpenStack), EX240 (OpenShift on OpenStack)
- Desain solusi high-availability & disaster recovery.
- Integrasi multi-produk Red Hat (Satellite, Ansible Automation Platform).

### Kelemahan Umum (Audit)

- Terpaku satu domain (mis. cuma container) → tak flexible.
- Tidak mengikuti roadmap spesialisasi yang koheren.
- RHCE kedaluwarsa → harus perpanjang sebelum RHCA sah.

### Rekomendasi (Puncak)

1. Susun **rencana 5 sertifikat** yang saling memperkuat (mis. OpenShift + Ceph + IdM + OpenStack + DO080).
2. Dokumentasikan arsitektur reference (draw.io / markdown).
3. Jaga RHCE tetap current (recert tiap 3 tahun).

**Skor progres: 100%** saat mengumpulkan RHCE + 5 spesialisasi.

---

## 📊 Ringkasan Progres per Tahap

| Tahap           | Fokus                | Prereq        | Skor Lulus           |
| --------------- | -------------------- | ------------- | -------------------- |
| **Dasar Linux** | CLI, fs, user        | —             | lancar CLI tanpa GUI |
| **RHCSA**       | Sysadmin RHEL        | Dasar Linux   | EX200 210/300        |
| **RHCE**        | Ansible automation   | RHCSA         | EX294 210/300        |
| **RHCA**        | Architect enterprise | RHCE + 5 spes | 5 spesialisasi       |

## 🚀 Roadmap Praktis

1. **Dasar** → kuasai CLI (1–2 bulan).
2. **RHCSA** (EX200) → lab harian + simulasi 3h (2–3 bulan).
3. **RHCE** (EX294) → Ansible project nyata (2–3 bulan).
4. **RHCA** → 5 spesialisasi bertahap (6–12 bulan).

> Waktu realistis (belajar sambil kerja): ~1.5–2.5 tahun untuk jalur lengkap
> Dasar → RHCA.

## ⚠️ Etika & Legalitas

Gunakan lab berizin (VirtualBox/KVM, RHEL Developer Subscription gratis).
Jangan uji sistem produksi tanpa otorisasi.
