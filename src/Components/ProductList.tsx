// Dependency Array: 3 Skenario Wajib
// Contoh integrasi utuh 3 skenario Dependency Array useEffect dalam 1 halaman.
// Skenario A (tanpa array) sengaja dibuat AMAN untuk demo — TIDAK memicu fetch
// asli di dalamnya, supaya tidak benar-benar membuat browser macet saat dites.
// Bandingkan perilaku A vs B vs C langsung dari counter & log yang tampil di UI.
// =============================================================================

import { useState, useEffect } from "react";

// -----------------------------------------------------------------------------
// Tipe data produk dari DummyJSON (dipakai Skenario B & C)
// -----------------------------------------------------------------------------

interface Product {
  id: number;
  title: string;
  price: number;
}

// =============================================================================
// SKENARIO A — Tanpa Dependency Array (jalan di SETIAP render)
// =============================================================================
function ScenarioA({ parentRenderCount }: { parentRenderCount: number }) {
  // renderCountRef TIDAK dipakai untuk trigger re-render (bukan useState),
  // supaya kita bisa hitung berapa kali efek ini jalan TANPA menciptakan loop baru.
  const [effectRunCount, setEffectRunCount] = useState(0);

  useEffect(() => {
    // ⚠️ TIDAK ADA array kedua sama sekali → efek ini jalan di SETIAP render,
    // termasuk render yang dipicu oleh state TIDAK TERKAIT sekalipun (mis. tema, search).

    console.log(
      "[Skenario A] sinkronisasi dijalankan tanpa dependency array..."
    );
    externalRunCounter.count += 1;
    setEffectRunCount(externalRunCounter.count); // dipanggil manual, BUKAN dari dalam fetch loop
  });
  return (
    <>
      <div>
        <h3>Skenario A - Tanpa Array {"Infinite Looping!"}</h3>
        <p>
          Render parent {"(App)"} ke- : <b>{parentRenderCount}</b>
        </p>
        <p>
          Effek skenario A sudah jalan : <b>{effectRunCount}</b> kali
        </p>
      </div>
    </>
  );
}

// counter di luar komponen, murni untuk keperluan demo aman (bukan pola produksi)
const externalRunCounter = { count: 0 };

// =============================================================================
// SKENARIO B — Array Kosong [] (jalan SEKALI saat mounting)
// =============================================================================

function ScenarioB() {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchCount, setFetchCount] = useState(0); // untuk membuktikan fetch cuma jalan 1x;

  useEffect(() => {
    console.log("[Skenario B] Mengambil data awal produk (hanya sekali)...");

    fetch("https://dummyjson.com/products?limit=5")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.products ?? []);
        setLoading(false);
        setFetchCount((c) => c + 1); // TIDAK menyebabkan efek ini jalan lagi, karena array []
      });
  }, []); // 👈 kotak kosong = tidak ada yang diawasi, React kunci efek ini hanya 1x

  return (
    <>
      <div>
        <h3>
          ✅ Skenario B — Array Kosong {"[]"}{" "}
          {"UNTUK HANDLE INFINTE LOOPING KETIKA FETCH DATA"}
        </h3>
        <p>
          Fetch awal sudah di panggil: <b>{fetchCount}</b> kali{" "}
          {"(tetap 1, walaupun komponen di re render)"}
        </p>
        {loading ? (
          <p>Memuat produk awal</p>
        ) : (
          <ul>
            {product.map((p) => (
              <li key={p.id}>
                {p.title} - {p.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

// =============================================================================
// SKENARIO C — Dependensi Spesifik [searchQuery] (jalan ULANG saat searchQuery berubah)
// =============================================================================

function ScenarioC() {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState<Product[]>([]);
  const [searchFetchCount, setSearchFetchCount] = useState(0);

  useEffect(() => {
    // efek ini SELALU jalan pertama kali (searchQuery = ""), lalu jalan ULANG
    // hanya kalau nilai searchQuery benar-benar berubah dari render sebelumnya
    if (searchQuery.trim() === "") {
      setResult([]);
      return;
    }
    console.log(`[Skenario C] Mencari produk untuk keyword: "${searchQuery}`);

    // debounce sederhana: tunda 400ms biar tidak fetch di setiap ketikan huruf
    const timeoutId = setTimeout(() => {
      fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setResult(data.products ?? []);
          setSearchFetchCount((c) => c + 1);
        });
    }, 400);

    // CLEANUP: batalkan timeout lama kalau searchQuery berubah lagi sebelum 400ms habis
    // (mencegah request lama yang sudah usang tetap dikirim / race condition)
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-bold text-gray-800">
          🔍 Skenario C
          <span className="ml-2 text-sm font-medium text-gray-500">
            — Dependensi {"[searchQuery]"}
          </span>
        </h3>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Cari Produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
        w-full
        rounded-xl
        border
        border-gray-200
        bg-gray-50
        px-4
        py-3
        text-gray-800
        outline-none
        transition-all
        duration-200
        placeholder:text-gray-400
        focus:border-blue-500
        focus:bg-white
        focus:ring-4
        focus:ring-blue-100
      "
          />
        </div>

        <p className="mb-5 rounded-xl bg-blue-50 px-4 py-3 text-sm text-gray-600">
          Request pencarian sudah terkirim:
          <b className="ml-1 text-blue-600">{searchFetchCount}</b> kali
        </p>

        <ul className="space-y-3">
          {result.map((p) => (
            <li
              key={p.id}
              className="
          flex
          items-center
          justify-between
          rounded-xl
          border
          border-gray-200
          bg-white
          p-4
          text-gray-700
          shadow-sm
          transition-all
          duration-200
          hover:-translate-y-1
          hover:border-blue-300
          hover:shadow-md
        "
            >
              <span className="font-medium text-gray-800">{p.title}</span>

              <span className="rounded-lg bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
                ${p.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default function ProductList() {
  const [renderTrigger, setRenderTrigger] = useState(0);
  //   const [theme, setTheme] = useState<"light" | "dark">("light");
  //   // effect ini HANYA untuk menghitung berapa kali App ini re-render,
  //   // dipakai sebagai pembanding visual terhadap Skenario A
  //   useEffect(() => {
  //     setRenderTrigger((c) => c + 1);
  //   }, [theme]);

  return (
    <>
      <div>
        <h2>Demo Integrasi 3 Skenario useEffect</h2>
        {/* <ScenarioA parentRenderCount={renderTrigger} /> */}
        {/* <ScenarioB /> */}
        <ScenarioC />
      </div>
    </>
  );
}
