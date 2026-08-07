import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';
import { unified } from '@astrojs/markdown-remark';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL, BASE } from './src/config/site.mjs';
import { sidebar } from './src/config/sidebar.mjs';

// ── Deployment path ──────────────────────────────────────────────────────────
// BASE diturunkan otomatis dari SITE_URL (src/config/site.mjs). Ubah SITE_URL saja.

// Prefix link absolut internal dengan base deployment agar konten docs & markdown
// ter-resolve benar. Guard !u.startsWith(base) mencegah double-prefix.
function remarkBaseLinks(base = '/') {
    const prefix = (url) =>
        url.startsWith('/') && !url.startsWith(base) && !url.startsWith('//') ? base.replace(/\/$/, '') + url : url;
    function walk(node) {
        if (!node || typeof node !== 'object') return;
        const n = node;
        if ((n.type === 'link' || n.type === 'definition') && typeof n.url === 'string') {
            n.url = prefix(n.url);
        }
        if (Array.isArray(n.children)) n.children.forEach(walk);
    }
    return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
    // URL produksi situs (sumber tunggal di src/config/site.mjs, bisa di-override env SITE_URL).
    // Diperlukan untuk canonical, OG tags, & sitemap.
    site: SITE_URL,

    // Prefix path deployment. '/' = root (domain.com/). Lihat BASE di atas.
    base: BASE,

    integrations: [
        starlight({
            title: 'Docs',
            // Konten berbahasa Indonesia → <html lang="id"> (WCAG 3.1.1).
            defaultLocale: 'root',
            locales: {
                root: { label: 'Bahasa Indonesia', lang: 'id' },
            },
            // Injeksi Tailwind + token shadcn ke seluruh dokumen Starlight.
            customCss: ['./src/styles/global.css'],
            // SATUKAN header: pakai nav utama yang sama dengan site (Home/About/.../Contact)
            components: {
                Header: './src/components/Header.astro',
                SiteTitle: './src/components/SiteTitle.astro',
                MobileMenuFooter: './src/components/MobileMenuFooter.astro',
                ThemeProvider: './src/components/ThemeProvider.astro',
                Footer: './src/components/Footer.astro',
            },
            // Struktur navigasi samping: 3 section utama (diekstrak ke src/config/sidebar.mjs).
            sidebar,
        }),
        mdx(),
        react(),
        sitemap({
            // Jangan masukkan halaman 404 / non-HTML ke sitemap.
            filter: (page) => !page.pathname || !page.pathname.startsWith('/404'),
        }),
        prefetch({
            // Prefetch halaman saat link terlihat / di-hover → navigasi instan.
            prefetchAll: true,
            defaultStrategy: 'viewport',
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
    },

    // Dev Toolbar disuntikkan Astro ke halaman dan menyumbang <h1> di dalam
    // shadow DOM-nya (ASTRO-DEV-TOOLBAR-*). Playwright menembus shadow DOM,
    // sehingga assertion "tepat satu <h1>" melihat 5 elemen dan gagal —
    // padahal light DOM hanya punya 1. Matikan agar artefak yang diuji sama
    // dengan yang di-deploy.
    devToolbar: {
        enabled: false,
    },

    // Prefix link internal di markdown (.md docs + writing/portfolio/teaching).
    // Pendekatan modern Astro 7: `processor: unified({ remarkPlugins })`.
    markdown: {
        processor: unified({ remarkPlugins: [remarkBaseLinks(BASE)] }),
    },
});
