import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Ganti dengan URL situs Anda saat deploy (diperlukan untuk sitemap).
  site: 'https://example.com',

  integrations: [starlight({
    title: 'Nilma — Dokumentasi',
    // Injeksi Tailwind + token shadcn ke seluruh dokumen Starlight.
    customCss: ['./src/styles/global.css'],
    // Ganti dengan tautan sosial Anda
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/masrizram' },
    ],
    // Struktur navigasi samping. Tambah/ubah sesuai kebutuhan.
    sidebar: [
      {
        label: 'Mulai',
        items: [
          { label: 'Contoh Halaman', link: '/guides/contoh/' },
        ],
      },
    ],
  }), mdx(), react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});