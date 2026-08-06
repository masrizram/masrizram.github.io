import { defineConfig, devices } from '@playwright/test';
import { BASE } from './src/config/site.mjs';

// E2E dijalankan terhadap build produksi (astro preview), bukan dev server,
// agar yang diuji adalah artefak yang benar-benar di-deploy.
const PORT = 4321;
// Situs di-serve di bawah base deployment (mis. /notes), jadi baseURL harus ikut.
// PENTING: baseURL WAJIB diakhiri '/'. Resolusi URL mengikuti aturan `new URL()`:
// tanpa trailing slash, `page.goto('/about/')` membuang segmen base ('/notes')
// dan menghasilkan 404. Test path karenanya ditulis RELATIF (tanpa '/' di depan).
const basePath = BASE === '/' ? '' : BASE;
const baseURL = `http://localhost:${PORT}${basePath}/`;

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? [['github'], ['list']] : [['list']],
    use: {
        baseURL,
        trace: 'on-first-retry',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: {
        command: `npm run preview -- --port ${PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
