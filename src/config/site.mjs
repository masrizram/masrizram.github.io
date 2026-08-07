// Single source of truth untuk URL produksi situs.
// Di-override saat build/deploy via env SITE_URL (lihat .env.example).
//
// SITE_URL adalah SATU-SATUNYA hal yang perlu diubah saat pindah hosting:
//   https://masrizram.github.io/website → base '/website'  (GH Pages PROJECT page: repo website — deploy saat ini)
//   https://masrizram.github.io         → base '/'        (GH Pages USER page: repo masrizram.github.io — ROOT, butuh repo itu dibuat)
//   https://nilma.my.id                 → base '/'        (custom domain, ROOT)
//   https://xaisyndicate.net            → base '/'        (custom domain, ROOT)
//
// BASE diturunkan otomatis dari pathname SITE_URL agar tidak pernah
// kontradiktif dengan canonical / sitemap / robots.
// Deploy saat ini: repo `masrizram/website` (project page) → live di /website/.
export const SITE_URL = process.env.SITE_URL ?? 'https://masrizram.github.io/website';

/** Origin saja (tanpa path), untuk canonical & absolute URL. */
export const SITE_ORIGIN = new URL(SITE_URL).origin;

/** Path deployment, selalu diawali '/' dan tanpa trailing slash ganda. */
export const BASE = (() => {
    const p = new URL(SITE_URL).pathname.replace(/\/+$/, '');
    return p === '' ? '/' : p;
})();
