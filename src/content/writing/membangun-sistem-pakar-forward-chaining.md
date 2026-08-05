---
title: "Membangun Sistem Pakar dengan Forward Chaining"
description: "Konsep dasar rule-based expert system dan implementasi Forward Chaining untuk skripsi mahasiswa."
date: 2026-07-09
tags: ["Sistem Pakar", "Skripsi", "AI"]
---

Forward Chaining adalah strategi inferensi *data-driven* yang cocok untuk sistem pakar
diagnosis. Aturan (rules) dievaluasi dari fakta yang diketahui ke kesimpulan.

## Kenapa Forward Chaining?

- Cocok untuk skripsi karena alurnya mudah dijelaskan ke penguji.
- Implementasi di PHP/MySQL relatif sederhana (tabel `rules`, `facts`, `temp_facts`).
- Mudah divalidasi: masukkan gejala → dapat diagnosis.

## Struktur Minimal

```
facts       -> gejala yang diinput user
rules       -> IF <kondisi> THEN <kesimpulan>
temp_facts  -> hasil evaluasi sementara
```

> Tips: batasi jumlah aturan agar tidak *branch* tak terhingga. Uji dengan 3 kasus nyata.

Kembali ke [beranda portofolio](/).
