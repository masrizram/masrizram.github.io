// Single source of truth untuk URL produksi situs.
// Di-override saat build/deploy via env SITE_URL (lihat .env.example).
//
// SITE_URL adalah SATU-SATUNYA hal yang perlu diubah saat pindah hosting:
//   https://nilma.my.id                    → base '/'        (custom domain, ROOT — opsi B)
//   https://xaisyndicate.net               → base '/'        (custom domain, ROOT)
//   https://masrizram.github.io            → base '/'        (GH Pages USER page: repo masrizram.github.io — ROOT)
//   https://masrizram.github.io/website    → base '/website'  (GH Pages PROJECT page: repo website)
//   https://masrizram.github.io/notes      → base '/notes'   (GH Pages project page: repo notes)
//
// BASE diturunkan otomatis dari pathname SITE_URL agar tidak pernah
// kontradiktif dengan canonical / sitemap / robots.
// Untuk ROOT murni dari repo `website`, wajib pakai custom domain (lihat public/CNAME).
export const SITE_URL = process.env.SITE_URL ?? 'https://masrizram.github.io';

/** Origin saja (tanpa path), untuk canonical & absolute URL. */
export const SITE_ORIGIN = new URL(SITE_URL).origin;

/** Path deployment, selalu diawali '/' dan tanpa trailing slash ganda. */
export const BASE = (() => {
    const p = new URL(SITE_URL).pathname.replace(/\/+$/, '');
    return p === '' ? '/' : p;
})();
