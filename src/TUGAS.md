# Tugas React.js + TypeScript

> **Level:** Junior / Pemula  
> **Konteks:** Project POS System (Kasir)  
> **Total:** 3 Tugas — 2 Tanya Jawab, 1 Praktek

---

## Tugas 1 — Tanya Jawab

**judul:** Props & JSX dalam React

**deskripsi:** Jawab 10 soal pilihan ganda (A/B/C/D) tentang konsep dasar Props dan JSX di React. Topik yang diuji: fungsi kurung kurawal `{}` di JSX, pengertian props, sifat read-only props, cara deklarasi tipe props dengan TypeScript, `children` prop, dan arah aliran data (unidirectional data flow). Konteks soal mengacu pada komponen kasir seperti `ProductCard` dan `InoviceBadge` yang sudah ada di project ini.

---

## Tugas 2 — Tanya Jawab

**judul:** State & Conditional Rendering dalam React

**deskripsi:** Jawab 10 soal pilihan ganda (A/B/C/D) tentang konsep `useState` dan teknik menampilkan UI secara kondisional. Topik yang diuji: perbedaan variabel biasa vs state, cara kerja re-render, functional update (`prev => prev + 1`), atribut `key` pada `.map()`, serta kapan pakai ternary `? :` vs short-circuit `&&` vs early return. Konteks soal mengacu pada komponen `OrderSummary` (cart) dan `InoviceBadge` (LUNAS/PENDING) di project ini.

---

## Tugas 3 — Praktek

**judul:** Lengkapi `CounterComponent.tsx`

**deskripsi:** Modifikasi file `src/Components/CounterComponent.tsx` yang sudah ada. Komponen saat ini hanya punya tombol tambah (`+`). Tugasmu: tambahkan props TypeScript (`label`, `min`, `max`), tampilkan label di atas counter, tambahkan tombol kurang (`−`) di sebelah kiri angka, dan buat tombol disabled saat menyentuh batas min/max. Render komponen di `App.tsx` dengan props `label="Jumlah Kopi" min={0} max={10}`. Jalankan `pnpm dev` dan verifikasi di browser.

**Konsep yang dilatih:** Props + TypeScript typing, optional props dengan default value, useState, onClick event handler, conditional rendering via atribut `disabled`.

**Kriteria selesai:**
- [ ] Props `label`, `min`, `max` dideklarasikan dengan TypeScript
- [ ] Label tampil di atas counter
- [ ] Tombol `−` berfungsi mengurangi quantity
- [ ] Tombol `+` tetap berfungsi menambah quantity
- [ ] Tombol `−` disabled saat quantity = min
- [ ] Tombol `+` disabled saat quantity = max
- [ ] Tidak ada TypeScript error
- [ ] Komponen tampil di browser
