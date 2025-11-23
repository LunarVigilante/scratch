/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg-color)',
        'editor-bg': 'var(--editor-bg)',
        fg: 'var(--fg-color)',
        primary: 'var(--primary-color)',
        border: 'var(--border-color)',
        surface: 'var(--surface-color)',
        'surface-highlight': 'var(--surface-highlight)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
