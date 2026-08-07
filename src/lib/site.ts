// Konfigurasi situs terpusat — ubah di sini, konsisten di semua halaman.
import { SITE_URL } from '@/config/site.mjs';

export const site = {
    /** Nama lengkap — single source of truth untuk wordmark & semua schema. */
    fullName: 'Sutan Rizki Ramdani',
    /** Alias ke fullName (hindari duplikat literal). */
    name: 'Sutan Rizki Ramdani',
    /** Nama pendek untuk logo/wordmark & short_name PWA. */
    shortName: 'masrizram',
    role: 'Full-Stack Developer & Security Researcher',
    url: SITE_URL,
    description:
        'Sutan Rizki Ramdani — Full-Stack Developer & Security Researcher. I build and break apps. Privacy advocate. Portofolio, riset keamanan, dan dokumentasi teknis.',
    tagline: 'I build and break apps.',
    location: 'Indonesia',
    org: 'xaisyndicatelab',
    email: 'rizkiiramdaniii@gmail.com',
    socials: {
        github: 'https://github.com/masrizram',
        website: 'https://xaisyndicate.net/',
        linkedin: '#',
        twitter: '#',
        email: 'mailto:rizkiiramdaniii@gmail.com',
    },
};

export const docsHref = '/rhcsa/';

type NavItem = { href: string; label: string; match?: string[] };

// Urutan 10 menu utama sesuai struktur navigasi situs personal.
export const nav: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/about/', label: 'About' },
    { href: '/services/', label: 'Services' },
    { href: '/portfolio/', label: 'Portfolio' },
    { href: '/testimonials/', label: 'Testimonials' },
    { href: '/blog/', label: 'Blog' },
    { href: '/lab/', label: 'Lab' },
    { href: '/faq/', label: 'FAQ' },
    { href: '/contact/', label: 'Contact' },
    { href: docsHref, label: 'Docs', match: ['/rhcsa/', '/pentester/', '/koding/'] },
];

// Social yang punya URL valid (bukan '#') — untuk render kondisional di footer/nav.
// Label ditampilkan rapi (kapitalisasi proper) di footer.
const SOCIAL_LABELS: Record<string, string> = {
    github: 'GitHub',
    website: 'xaisyndicate.net',
    linkedin: 'LinkedIn',
    twitter: 'X',
    email: 'Email',
};

export const activeSocials = Object.entries(site.socials)
    .filter(([, url]) => url && url !== '#' && !url.startsWith('mailto:'))
    .map(([key, url]) => ({ key, label: SOCIAL_LABELS[key] ?? key, url: url as string }));
