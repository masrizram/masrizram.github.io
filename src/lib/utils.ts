import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Base-aware URL helper.
 * Menambahkan prefix deployment ke path internal agar link & aset tetap benar
 * saat di-hosting di sub-path (mis. GitHub Pages project page /notes).
 * - import.meta.env.BASE_URL = '/' (root) | '/notes/' (project page)
 * - path '/' → kembalikan base; anchor ('#x') & scheme eksternal (http:, mailto:)
 *   dilewati apa adanya.
 */
export function withBase(path: string): string {
    const base = import.meta.env.BASE_URL || '/';
    if (!path || path === '/') return base;
    if (path.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
    return base.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path);
}
