import React from "react";

type ProductStatus = "Active" | "Inactive";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  status: ProductStatus;
  description: string;
  image: string;
  variants: {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
  }[];
}

const product: Product = {
  id: "PRD-001",
  sku: "COF-001",
  name: "Iced Americano",
  category: "Coffee",
  price: 28000,
  cost: 12000,
  stock: 45,
  minStock: 10,
  status: "Active",
  description:
    "Espresso with chilled water and ice. A refreshing coffee with a bold and clean taste.",
  image:
    "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
  variants: [
    {
      id: "VAR-001",
      name: "Regular",
      sku: "COF-001-R",
      price: 28000,
      stock: 25,
    },
    {
      id: "VAR-002",
      name: "Large",
      sku: "COF-001-L",
      price: 35000,
      stock: 20,
    },
  ],
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function ProductDetail() {
  const profit = product.price - product.cost;
  const margin = ((profit / product.price) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900">
              ←
            </button>

            <div>
              <h1 className="text-lg font-semibold text-slate-900">
                Product Detail
              </h1>
              <p className="text-sm text-slate-500">
                Manage product information
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Delete
            </button>

            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Edit Product
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <span>Products</span>
          <span>/</span>
          <span className="text-slate-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Product overview */}
            <section className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="font-semibold text-slate-900">
                  Product Information
                </h2>
              </div>

              <div className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                  {/* Product image */}
                  <div className="h-48 w-48 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex-1">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-slate-900">
                          {product.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          SKU: {product.sku}
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        {product.status}
                      </span>
                    </div>

                    <p className="mb-5 text-sm leading-6 text-slate-600">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-slate-500">Category</p>
                        <p className="mt-1 text-sm font-medium text-slate-900">
                          {product.category}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Price</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {formatCurrency(product.price)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">Cost</p>
                        <p className="mt-1 text-sm font-medium text-slate-900">
                          {formatCurrency(product.cost)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="font-semibold text-slate-900">
                  Pricing & Margin
                </h2>
              </div>

              <div className="grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="p-6">
                  <p className="text-sm text-slate-500">Selling Price</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {formatCurrency(product.price)}
                  </p>
                </div>

                <div className="p-6">
                  <p className="text-sm text-slate-500">Cost Price</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    {formatCurrency(product.cost)}
                  </p>
                </div>

                <div className="p-6">
                  <p className="text-sm text-slate-500">Profit Margin</p>
                  <p className="mt-2 text-xl font-semibold text-emerald-600">
                    {margin}%
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatCurrency(profit)} profit / item
                  </p>
                </div>
              </div>
            </section>

            {/* Variants */}
            <section className="rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <div>
                  <h2 className="font-semibold text-slate-900">Variants</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Product size and pricing variants
                  </p>
                </div>

                <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  + Add Variant
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-3 font-medium">Variant</th>
                      <th className="px-6 py-3 font-medium">SKU</th>
                      <th className="px-6 py-3 font-medium">Price</th>
                      <th className="px-6 py-3 font-medium">Stock</th>
                      <th className="px-6 py-3" />
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {product.variants.map((variant) => (
                      <tr key={variant.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-900">
                            {variant.name}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500">
                          {variant.sku}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                          {formatCurrency(variant.price)}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={
                              variant.stock <= product.minStock
                                ? "text-sm font-medium text-red-600"
                                : "text-sm text-slate-700"
                            }
                          >
                            {variant.stock}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-6">
            {/* Stock */}
            <section className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="font-semibold text-slate-900">Inventory</h2>
              </div>

              <div className="p-6">
                <div className="mb-5">
                  <p className="text-sm text-slate-500">Current Stock</p>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-4xl font-bold text-slate-900">
                      {product.stock}
                    </span>

                    <span className="mb-1 text-sm text-slate-500">units</span>
                  </div>
                </div>

                {/* Stock progress */}
                <div className="mb-5">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-500">Stock level</span>
                    <span className="font-medium text-slate-700">
                      {product.stock} / 100
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${Math.min(product.stock, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-amber-50 p-3">
                  <p className="text-xs font-medium text-amber-800">
                    Minimum stock
                  </p>

                  <p className="mt-1 text-sm text-amber-700">
                    {product.minStock} units
                  </p>
                </div>

                <button className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
                  Adjust Stock
                </button>
              </div>
            </section>

            {/* Product settings */}
            <section className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="font-semibold text-slate-900">
                  Product Settings
                </h2>
              </div>

              <div className="divide-y divide-slate-200">
                <div className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Available for Sale
                    </p>
                    <p className="text-xs text-slate-500">
                      Show product on POS
                    </p>
                  </div>

                  <div className="relative h-6 w-11 rounded-full bg-indigo-600">
                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Track Inventory
                    </p>
                    <p className="text-xs text-slate-500">
                      Automatically update stock
                    </p>
                  </div>

                  <div className="relative h-6 w-11 rounded-full bg-indigo-600">
                    <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Taxable
                    </p>
                    <p className="text-xs text-slate-500">Apply product tax</p>
                  </div>

                  <div className="relative h-6 w-11 rounded-full bg-slate-200">
                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>
              </div>
            </section>

            {/* Metadata */}
            <section className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="font-semibold text-slate-900">
                  Product Metadata
                </h2>
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <p className="text-xs text-slate-500">Product ID</p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {product.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Created</p>
                  <p className="mt-1 text-sm text-slate-700">
                    September 9, 2026
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Last Updated</p>
                  <p className="mt-1 text-sm text-slate-700">
                    September 9, 2026
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
