// Lighthouse CI config — budget Core Web Vitals & best-practices.
// Dijalankan oleh job `lighthouse` di ci.yml (lhci autorun).
module.exports = {
    ci: {
        collect: {
            // Uji halaman langsung dari artifact `dist` via static server lokal.
            staticDistDir: './dist',
            url: ['/', '/about/', '/services/', '/portfolio/', '/blog/', '/lab/', '/faq/', '/contact/', '/rhcsa/'],
            numberOfRuns: 3,
        },
        assert: {
            assertions: {
                // Core Web Vitals (lab proxies)
                'categories:performance': ['warn', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 1 }],
                'categories:best-practices': ['error', { minScore: 1 }],
                'categories:seo': ['error', { minScore: 1 }],
                'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
                'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
                'total-blocking-time': ['warn', { maxNumericValue: 200 }],
                // Security / best-practices
                'no-vulnerable-libraries': 'error',
                'is-csp-valid': 'warn',
                'uses-https': 'off', // GH Pages memang HTTPS, tapi staticDist lokal http
            },
        },
        upload: {
            target: 'temporary',
        },
    },
};
