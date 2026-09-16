import { useEffect, useRef, useState } from "react";

export const BarcodeScannerStation = () => {
  // 1. Siapkan state untuk menampung hasil scan yang tampil di layar
  const [scannedCode, setScannedCode] = useState<string>("Belum ada item");

  // 2. Siapkan useRef untuk memegang remote control fisik kolom input
  const inputRef = useRef<HTMLInputElement>(null);

  // 3. Gunakan useEffect dengan array kosong [] untuk memicu aksi tepat saat aplikasi terbuka
  useEffect(() => {
    // Paksa kursor langsung melompat dan berkedip di dalam input HTML
    inputRef.current?.focus();
  });

  return (
    <>
      <div className="p-6 max-w-sm mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-md space-y-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase">
          Stasiun Scan Barcode
        </h3>
        {/* Input yang dikendalikan langsung oleh inputRef */}
        <input
          ref={inputRef}
          type="text"
          placeholder="[Otomatis Fokus] Scan disini...."
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setScannedCode(e.target.value)}
        />
        <div className="p-3 bg-gray-50 rounded-lg text-xs font-mono">
          <p>
            Kandungan Barcode:
            <span className="text-blue-600 font-bold">{scannedCode}</span>
          </p>
        </div>
      </div>
    </>
  );
};
