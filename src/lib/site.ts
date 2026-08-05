// Konfigurasi situs terpusat — ubah di sini, konsisten di semua halaman.
import { SITE_URL } from '@/config/site.mjs';

export const site = {
  name: 'Nilma',
  fullName: 'Nilma, M.Kom.',
  role: 'Dosen & Konsultan Teknologi',
  url: SITE_URL,
  description:
    'Nilma, M.Kom. — Dosen, pembimbing skripsi/TA, dan mentor sertifikasi teknologi. Portofolio, panduan, dan dokumentasi.',
  email: 'nilma@example.com',
  socials: {
    github: 'https://github.com/masrizram',
    linkedin: '#',
    twitter: '#',
    email: 'mailto:nilma@example.com',
  },
};

export const docsHref = '/rhcsa/';

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/writing/', label: 'Writing' },
  { href: '/portfolio/', label: 'Portfolio' },
  { href: '/teaching/', label: 'Teaching' },
  { href: '/resources/', label: 'Resources' },
  { href: '/contact/', label: 'Contact' },
];

// Social yang punya URL valid (bukan '#') — untuk render kondisional di footer/nav.
export const activeSocials = Object.entries(site.socials)
  .filter(([_, url]) => url && url !== '#' && !url.startsWith('mailto:'))
  .map(([key, url]) => ({ key, url: url as string }));
