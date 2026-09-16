import { useState } from "react";
import {
  useGetProductCategoriesQuery,
  useGetDetailProductCategoriesQuery,
} from "@/store/categoriesApi";

interface Category {
  slug: string;
  name: string;
  url: string;
}

export default function CategoriesPages() {
  const { data, isLoading, error } = useGetProductCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetDetailProductCategoriesQuery(selectedCategory?.slug ?? "", {
    skip: !selectedCategory,
  });

  const closeModal = () => {
    setSelectedCategory(null);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Gagal mengambil data kategori.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Product Collection
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore Categories
          </h1>

          <p className="mt-3 text-gray-500">
            Temukan produk berdasarkan kategori yang kamu inginkan.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((category) => (
            <div
              key={category.slug}
              className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 7.8 7.5 4.4 7.5-4.4M12 12.2V21"
                    />
                  </svg>
                </div>

                <h2 className="mt-5 text-lg font-semibold capitalize text-gray-900 group-hover:text-blue-600">
                  {category.name}
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Jelajahi koleksi produk {category.name.toLowerCase()}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCategory(category)}
                className="mt-6 inline-flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Lihat produk
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14m-7-7 7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Product Collection
                </p>

                <h2
                  id="modal-title"
                  className="mt-1 text-xl font-bold capitalize text-gray-900"
                >
                  {selectedCategory.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup modal"
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-6">
              {isProductsLoading && (
                <div className="flex min-h-48 items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                    <p className="text-sm text-gray-500">Loading products...</p>
                  </div>
                </div>
              )}

              {isProductsError && (
                <div className="rounded-xl bg-red-50 p-6 text-center">
                  <p className="font-medium text-red-700">
                    Gagal mengambil data produk.
                  </p>
                  <p className="mt-1 text-sm text-red-600">
                    Silakan tutup modal dan coba lagi.
                  </p>
                </div>
              )}

              {!isProductsLoading &&
                !isProductsError &&
                productsData?.products.length === 0 && (
                  <p className="py-12 text-center text-gray-500">
                    Tidak ada produk dalam kategori ini.
                  </p>
                )}

              {!isProductsLoading &&
                !isProductsError &&
                productsData?.products && (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {productsData.products.map((product) => (
                      <div
                        key={product.id}
                        className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:border-blue-200 hover:shadow-md"
                      >
                        <div className="flex h-44 items-center justify-center bg-gray-50 p-4">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="line-clamp-2 min-h-12 font-semibold text-gray-900">
                            {product.title}
                          </h3>

                          <p className="mt-2 text-sm text-gray-500">
                            {product.brand ?? "Product"}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-lg font-bold text-blue-600">
                              ${product.price}
                            </p>

                            <span className="text-sm text-amber-500">
                              ★ {product.rating}
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-gray-500">
                            Stok: {product.stock}
                          </p>

                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
