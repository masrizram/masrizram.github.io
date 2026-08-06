import { describe, it, expect } from 'vitest';
import { withBase } from '@/lib/utils';

// BASE_URL default di lingkungan test Vitest adalah '/'.
describe('withBase', () => {
    it('mengembalikan base untuk root path', () => {
        expect(withBase('/')).toBe('/');
    });

    it('mempertahankan path internal', () => {
        expect(withBase('/about/')).toBe('/about/');
    });

    it('tidak menyentuh anchor', () => {
        expect(withBase('#main')).toBe('#main');
    });

    it('tidak menyentuh URL eksternal & skema lain', () => {
        expect(withBase('https://github.com/masrizram')).toBe('https://github.com/masrizram');
        expect(withBase('mailto:a@b.com')).toBe('mailto:a@b.com');
    });

    it('menormalkan path tanpa slash awal', () => {
        expect(withBase('about')).toBe('/about');
    });

    it('idempoten: tidak menghasilkan slash ganda', () => {
        expect(withBase('/x')).not.toContain('//');
    });
});
