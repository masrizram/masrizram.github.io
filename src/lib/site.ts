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

type NavItem = { href: string; label: string; match?: string[] };

export const nav: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/about/', label: 'About' },
    { href: '/writing/', label: 'Writing' },
    { href: '/portfolio/', label: 'Portfolio' },
    { href: '/teaching/', label: 'Teaching' },
    { href: '/resources/', label: 'Resources' },
    { href: '/contact/', label: 'Contact' },
    { href: docsHref, label: 'Docs', match: ['/rhcsa/', '/pentester/', '/koding/'] },
];

// Social yang punya URL valid (bukan '#') — untuk render kondisional di footer/nav.
// Label ditampilkan rapi (kapitalisasi proper) di footer.
const SOCIAL_LABELS: Record<string, string> = {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    twitter: 'X',
    email: 'Email',
};

export const activeSocials = Object.entries(site.socials)
    .filter(([, url]) => url && url !== '#' && !url.startsWith('mailto:'))
    .map(([key, url]) => ({ key, label: SOCIAL_LABELS[key] ?? key, url: url as string }));
