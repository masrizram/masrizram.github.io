import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/config/site.mjs';
import { sidebar } from './src/config/sidebar.mjs';

// https://astro.build/config
export default defineConfig({
  // URL produksi situs (sumber tunggal di src/config/site.mjs, bisa di-override env SITE_URL).
  // Diperlukan untuk canonical, OG tags, & sitemap.
  site: SITE_URL,

  integrations: [starlight({
    title: 'Docs',
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
  }), mdx(), react(), sitemap({
    // Jangan masukkan halaman 404 / non-HTML ke sitemap.
    filter: (page) => !page.pathname || !page.pathname.startsWith('/404'),
  }), prefetch({
    // Prefetch halaman saat link terlihat / di-hover → navigasi instan.
    prefetchAll: true,
    defaultStrategy: 'viewport',
  })],

  vite: {
    plugins: [tailwindcss()],
  },
});