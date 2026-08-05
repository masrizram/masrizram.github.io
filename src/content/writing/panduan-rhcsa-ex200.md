---
title: "Panduan Lengkap Persiapan RHCSA/EX200"
description: "Roadmap praktik EX200: user & group, storage, network, sampai container dengan Podman."
date: 2026-06-20
tags: ["RHCSA", "EX200", "Linux", "Sertifikasi"]
---

RHCSA (EX200) menitikberatkan pada kemampuan **praktik**, bukan hafalan teori. Berikut peta jalan
yang saya pakai membimbing mahasiswa.

## Topik Wajib

1. **User & Group** — `useradd`, `usermod`, `passwd`, quota.
2. **Storage** — partisi, LVM, mount `fstab`, NFS.
3. **Networking** — `nmcli`, konfigurasi IP statis, hostname.
4. **Services & Containers** — `systemctl`, Podman, `journalctl`.

## Latihan Harian

```
# buat user + set password
sudo useradd -m siswa
echo "siswa:rahasia" | sudo chpasswd
```

> Tips: kerjakan soal **tanpa melihat catatan** di akhir minggu ke-3.

Lihat juga materi di [dokumentasi](/rhcsa/).
