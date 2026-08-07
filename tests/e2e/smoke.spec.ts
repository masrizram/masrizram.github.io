import { test, expect } from '@playwright/test';

// Path RELATIF (tanpa '/' di depan) agar base deployment di baseURL dipertahankan.
const ROUTES = [
    '',
    'about/',
    'services/',
    'portfolio/',
    'testimonials/',
    'blog/',
    'lab/',
    'faq/',
    'contact/',
    'rhcsa/',
    'pentester/',
    'koding/',
    'materi/',
];

test.describe('smoke: semua rute utama merespons 200', () => {
    for (const route of ROUTES) {
        test(`GET /${route} → 200`, async ({ page }) => {
            const res = await page.goto(route);
            expect(res?.status(), `${route} harus 200`).toBe(200);
        });
    }
});
