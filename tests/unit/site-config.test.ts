import { describe, it, expect } from 'vitest';
import { activeSocials, nav, site } from '@/lib/site';

describe('site config', () => {
    it('site.url adalah URL absolut yang valid', () => {
        expect(() => new URL(site.url)).not.toThrow();
        expect(site.url).toMatch(/^https?:\/\//);
    });

    it('tidak memakai email placeholder example.com', () => {
        expect(site.email).not.toContain('example.com');
    });

    it('setiap item nav punya href dan label unik', () => {
        const hrefs = nav.map((n) => n.href);
        const labels = nav.map((n) => n.label);
        expect(new Set(hrefs).size).toBe(hrefs.length);
        expect(new Set(labels).size).toBe(labels.length);
        for (const item of nav) {
            expect(item.href.startsWith('/')).toBe(true);
            expect(item.label.length).toBeGreaterThan(0);
        }
    });

    it('nav bebas dari label Docs duplikat (regresi bug "Docs x2")', () => {
        expect(nav.filter((n) => n.label === 'Docs')).toHaveLength(1);
    });

    it('activeSocials hanya berisi URL http(s), bukan placeholder "#" atau mailto', () => {
        for (const s of activeSocials) {
            expect(s.url).toMatch(/^https?:\/\//);
            expect(s.url).not.toBe('#');
            expect(s.label.length).toBeGreaterThan(0);
        }
    });
});
