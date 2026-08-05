// Shared theme logic — single source untuk site utama & docs (Starlight).
// Mencegah duplikasi & flicker: initial apply idempoten, toggle di-bind sekali.
export function setupTheme(): void {
  const root = document.documentElement;

  function apply(theme: 'dark' | 'light'): void {
    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
  }

  // Initial apply (idempoten — aman dipanggil dari beberapa script).
  let saved: string | null = null;
  try {
    saved = localStorage.getItem('theme');
  } catch {
    /* localStorage mungkin tidak tersedia (private mode) */
  }
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    apply('dark');
  } else {
    apply('light');
  }

  // Bind toggle sekali saja (guard via dataset.bound).
  const btn = document.getElementById('theme-toggle');
  if (btn && !btn.dataset.bound) {
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const nowDark = root.classList.toggle('dark');
      const next = nowDark ? 'dark' : 'light';
      apply(next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* abaikan */
      }
    });
  }

  // Puaskan Starlight ThemeProvider agar tidak menimpa theme kita.
  (window as unknown as { StarlightThemeProvider?: unknown }).StarlightThemeProvider = {
    updatePickers() {},
  };
}

setupTheme();
