// =============================================================================
// PerformanceOptimizationDemo.tsx
// Contoh SEDERHANA: useMemo + useCallback + React.memo dalam 1 komponen.
// Cara tes: buka Console browser, lalu:
// 1. Ketik di kolom search → wajar muncul log "Filter dihitung ulang"
// 2. Klik "Ganti Tema" → log "Filter dihitung ulang" TIDAK muncul lagi,
//    dan log "ProductRow digambar" JUGA tidak muncul lagi.
//    Itu artinya useMemo, useCallback, dan React.memo berhasil bekerja.
// =============================================================================

import React, { useState, useMemo, useCallback } from "react";

interface Item {
  id: number;
  title: string;
  price: number;
}

const products: Item[] = [
  { id: 1, title: "Kopi kapal api", price: 3000 },
  { id: 2, title: "Kopi kapucino", price: 2500 },
  { id: 3, title: "Kopi luwak white cofee", price: 1500 },
];

const ProductRow = React.memo(
  ({ item, onSelect }: { item: Item; onSelect: (title: string) => void }) => {
    console.log(`ProductRow "${item.title}" digambar`); // muncul tiap kali komponen ini benar-benar render
    return (
      <>
        <div></div>
      </>
    );
  }
);

ProductRow.displayName = "ProductRow";

export default PerformanceOptimizationDemo() {
    
}