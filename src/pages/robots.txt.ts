import type { APIRoute } from 'astro';
import { SITE_ORIGIN, BASE } from '@/config/site.mjs';

// Sitemap selalu berada di <origin><base>/sitemap-index.xml.
// Diturunkan dari SITE_URL agar tidak pernah menunjuk path yang 404.
const basePath = BASE === '/' ? '' : BASE;
const sitemapUrl = `${SITE_ORIGIN}${basePath}/sitemap-index.xml`;

export const GET: APIRoute = () => {
    const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;
    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
};
