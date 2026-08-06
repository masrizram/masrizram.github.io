import { test, expect } from '@playwright/test';

// Path RELATIF (tanpa '/' di depan) agar base deployment di baseURL dipertahankan.
const ROUTES = [
    '',
    'about/',
    'writing/',
    'portfolio/',
    'teaching/',
    'resources/',
    'contact/',
    'rhcsa/',
    'pentester/',
    'koding/',
];

test.describe('smoke: semua rute utama merespons 200', () => {
    for (const route of ROUTES) {
        test(`GET /${route} → 200`, async ({ page }) => {
            const res = await page.goto(route);
            expect(res?.status(), `${route} harus 200`).toBe(200);
        });
    }
});

test('aset kritis termuat (tidak ada 404 pada CSS/JS)', async ({ page }) => {
    const failed: string[] = [];
    page.on('response', (r) => {
        const u = r.url();
        if (r.status() >= 400 && /\.(css|js|woff2?|png|svg|webp)$/i.test(u)) failed.push(`${r.status()} ${u}`);
    });
    await page.goto('');
    await page.waitForLoadState('networkidle');
    expect(failed, `aset gagal dimuat:\n${failed.join('\n')}`).toEqual([]);
});

test('rss.xml tersedia dan berisi item', async ({ request }) => {
    const res = await request.get('rss.xml');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('<rss');
    expect(body).toContain('<item>');
});

test('robots.txt menunjuk sitemap yang benar-benar ada', async ({ request }) => {
    const robots = await request.get('robots.txt');
    expect(robots.status()).toBe(200);
    const text = await robots.text();
    const match = text.match(/Sitemap:\s*(\S+)/);
    expect(match, 'robots.txt harus punya baris Sitemap').not.toBeNull();

    // Ambil path-nya saja agar bisa diuji terhadap server preview lokal.
    const sitemapPath = new URL(match![1]).pathname;
    const sitemap = await request.get(sitemapPath);
    expect(sitemap.status(), `sitemap ${sitemapPath} harus ada (bukan 404)`).toBe(200);
});

test('form kontak merakit mailto lengkap dengan isi pesan (regresi bug B4)', async ({ page }) => {
    await page.goto('contact/');

    await page.fill('#cf-nama', 'Budi Santoso');
    await page.fill('#cf-email', 'budi@contoh.id');
    await page.fill('#cf-pesan', 'Saya ingin bimbingan skripsi sistem pakar.');

    // Script menyinkronkan `action` form secara live dari isi field.
    // Diverifikasi tanpa men-stub API browser (location.assign tidak dapat
    // di-redefine di Chromium — terbukti saat mengembangkan test ini).
    const action = await page.getAttribute('#contact-form', 'action');
    expect(action, 'action harus berupa mailto:').toContain('mailto:');

    const decoded = decodeURIComponent(action ?? '');
    expect(decoded, 'nama harus terbawa').toContain('Budi Santoso');
    expect(decoded, 'isi pesan harus terbawa').toContain('Saya ingin bimbingan skripsi sistem pakar.');
    expect(decoded, 'email pengirim harus terbawa').toContain('budi@contoh.id');
    expect(decoded, 'subject harus terisi').toContain('subject=');
    expect(decoded, 'body harus terisi').toContain('body=');
});

test('setiap halaman utama punya tepat satu <h1>', async ({ page }) => {
    for (const route of ['', 'about/', 'writing/', 'contact/']) {
        await page.goto(route);
        await expect(page.locator('h1'), `/${route} harus punya 1 h1`).toHaveCount(1);
    }
});

test('title tidak mengandung nama situs dua kali', async ({ page }) => {
    for (const route of ['', 'about/', 'contact/']) {
        await page.goto(route);
        const title = await page.title();
        const occurrences = title.split('Nilma, M.Kom.').length - 1;
        expect(occurrences, `title "${title}" duplikat`).toBeLessThanOrEqual(1);
    }
});
