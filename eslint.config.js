import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier' 

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended, // Aturan standar JavaScript (Mendeteksi variabel mati, dll)
      tseslint.configs.recommended, // Aturan khusus TypeScript (Keamanan tipe data strict)
      reactHooks.configs.flat.recommended,  // Memaksa kepatuhan aturan standar React Hooks
      reactRefresh.configs.vite, // Mendukung fitur render instan kilat (Fast Refresh) milik Vite
      eslintConfigPrettier // 👈 2. Taruh di paling bawah untuk mematikan aturan visual ESLint yang bentrok
    ],
    languageOptions: {
      globals: globals.browser,  // Memberi tahu ESLint bahwa kode berjalan di Browser (mengenali objek 'window')
    },
    // 🔥 TAMBAHKAN BLOK RULES DI SINI UNTUK MODIFIKASI ATURAN
    rules: {
      "no-console": "error" // ❌ Menolak keras console.log saat build/linting
    }
  },
])
