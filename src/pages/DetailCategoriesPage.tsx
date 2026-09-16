import { useGetDetailProductCategories } from "@/hooks/useCategories";
import { useParams } from "react-router-dom";

export default function DetailCategoriesPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useGetDetailProductCategories(slug ?? "");

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          <p className="text-sm font-medium text-gray-500">Loading produk...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <span className="text-2xl">!</span>
          </div>

          <h2 className="mt-4 text-lg font-bold text-gray-900">
            Gagal memuat produk
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Terjadi kesalahan saat mengambil data produk.
          </p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <p className="text-gray-500">Data produk tidak ditemukan.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Product Collection
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Beauty Products
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Temukan berbagai produk kecantikan untuk melengkapi kebutuhanmu.
          </p>

          <div className="mt-6 inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            <span className="font-semibold text-gray-900">
              {data.products.length}
            </span>
            <span className="ml-1">produk tersedia</span>
          </div>
        </div>

        {/* Product Grid */}
        {data.products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-50 p-6">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
                    Beauty
                  </span>
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <h2 className="min-h-12 text-base font-semibold leading-6 text-gray-900 transition-colors group-hover:text-blue-600">
                    {product.title}
                  </h2>

                  {product.brand && (
                    <p className="mt-1 text-sm text-gray-500">
                      {product.brand}
                    </p>
                  )}

                  {/* Price and Rating */}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <p className="text-xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>

                    <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-medium text-amber-600">
                      <span>★</span>
                      {product.rating}
                    </span>
                  </div>

                  {/* Stock */}
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-sm text-gray-500">Stok produk</span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.stock > 0
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} tersedia`
                        : "Stok habis"}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Produk belum tersedia
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Belum ada produk dalam kategori Beauty.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
