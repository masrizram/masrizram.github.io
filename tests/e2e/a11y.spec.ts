import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Path RELATIF agar base deployment di baseURL dipertahankan.
const PAGES = ['', 'about/', 'writing/', 'contact/', 'rhcsa/'];

test.describe('aksesibilitas WCAG 2.1 A/AA (axe-core)', () => {
    for (const route of PAGES) {
        test(`/${route} bebas pelanggaran serius`, async ({ page }) => {
            await page.goto(route);
            // Tunggu animasi scroll-reveal (transisi opacity 0.6s) benar-benar
            // selesai. Tanpa ini axe mengukur warna di TENGAH fade dan melaporkan
            // pelanggaran kontras semu yang berubah-ubah tiap run (mis. #bbbbbb
            // padahal warna final #0a0a0a). Terbukti saat mengembangkan test ini.
            // Elemen di luar viewport tidak pernah di-reveal, jadi cukup tunggu
            // yang terlihat saja; halaman tanpa `.reveal` lolos seketika.
            await page
                .waitForFunction(
                    () =>
                        Array.from(document.querySelectorAll('.reveal'))
                            .filter((el) => {
                                const r = el.getBoundingClientRect();
                                return r.top < window.innerHeight && r.bottom > 0;
                            })
                            .every((el) => getComputedStyle(el).opacity === '1'),
                    undefined,
                    { timeout: 5000 },
                )
                .catch(() => {
                    /* tanpa elemen reveal yang terlihat — lanjut saja */
                });
            const results = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .analyze();

            const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
            const report = serious
                .map((v) => `[${v.impact}] ${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target).join('\n  ')}`)
                .join('\n\n');

            expect(serious, `Pelanggaran a11y di /${route}:\n${report}`).toEqual([]);
        });
    }
});

test('skip-link muncul saat fokus keyboard dan mengarah ke konten', async ({ page }) => {
    await page.goto('');
    await page.keyboard.press('Tab');
    const skip = page.locator('a[href="#main"]');
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await expect(page.locator('#main')).toHaveCount(1);
});

test('toggle tema mengubah kelas dark dan persisten', async ({ page }) => {
    await page.goto('');
    const html = page.locator('html');
    const before = await html.getAttribute('class');
    await page.locator('#theme-toggle').click();
    const after = await html.getAttribute('class');
    expect(after, 'kelas html harus berubah setelah toggle').not.toBe(before);

    await page.reload();
    const afterReload = await html.getAttribute('class');
    expect(afterReload, 'tema harus persisten setelah reload').toBe(after);
});

test('halaman utama punya satu <main> dan landmark navigasi', async ({ page }) => {
    await page.goto('');
    await expect(page.locator('main')).toHaveCount(1);
    expect(await page.locator('nav').count()).toBeGreaterThan(0);
});
