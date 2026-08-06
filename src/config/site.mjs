// Single source of truth untuk URL produksi situs.
// Di-override saat build/deploy via env SITE_URL (lihat .env.example).
// GitHub Pages (project page repo "notes"): https://masrizram.github.io/notes
export const SITE_URL = process.env.SITE_URL ?? 'https://masrizram.github.io/notes';
