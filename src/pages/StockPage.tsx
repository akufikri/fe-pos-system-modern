import React, { useMemo, useState } from "react";

type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

interface ProductStock {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  unit: string;
  price: number;
  updatedAt: string;
}

const products: ProductStock[] = [
  {
    id: "1",
    sku: "COF-001",
    name: "Iced Americano",
    category: "Coffee",
    stock: 45,
    minStock: 10,
    unit: "Cup",
    price: 28000,
    updatedAt: "5 min ago",
  },
  {
    id: "2",
    sku: "COF-002",
    name: "Cappuccino",
    category: "Coffee",
    stock: 8,
    minStock: 10,
    unit: "Cup",
    price: 32000,
    updatedAt: "12 min ago",
  },
  {
    id: "3",
    sku: "TEA-001",
    name: "Green Tea",
    category: "Tea",
    stock: 23,
    minStock: 10,
    unit: "Cup",
    price: 18000,
    updatedAt: "20 min ago",
  },
  {
    id: "4",
    sku: "FOOD-001",
    name: "Chicken Sandwich",
    category: "Food",
    stock: 3,
    minStock: 8,
    unit: "Pcs",
    price: 35000,
    updatedAt: "30 min ago",
  },
  {
    id: "5",
    sku: "FOOD-002",
    name: "French Fries",
    category: "Food",
    stock: 0,
    minStock: 5,
    unit: "Portion",
    price: 22000,
    updatedAt: "1 hour ago",
  },
  {
    id: "6",
    sku: "DSRT-001",
    name: "Chocolate Cake",
    category: "Dessert",
    stock: 14,
    minStock: 5,
    unit: "Slice",
    price: 25000,
    updatedAt: "2 hours ago",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const getStockStatus = (stock: number, minStock: number): StockStatus => {
  if (stock === 0) return "Out of Stock";
  if (stock <= minStock) return "Low Stock";
  return "In Stock";
};

const statusStyles: Record<StockStatus, string> = {
  "In Stock": "bg-emerald-50 text-emerald-700",
  "Low Stock": "bg-amber-50 text-amber-700",
  "Out of Stock": "bg-red-50 text-red-700",
};

export default function StockPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(products.map((item) => item.category))),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productStatus = getStockStatus(product.stock, product.minStock);

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesStatus = status === "All" || productStatus === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= product.minStock
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Stock</h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor and manage your product inventory
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Export
            </button>

            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              + Stock Adjustment
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Products */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Products
              </p>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                📦
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {totalProducts}
            </p>

            <p className="mt-1 text-xs text-slate-500">Active products</p>
          </div>

          {/* Total Stock */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Total Stock</p>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                ↗
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {totalStock}
            </p>

            <p className="mt-1 text-xs text-slate-500">Units available</p>
          </div>

          {/* Low Stock */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Low Stock</p>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                ⚠
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {lowStockProducts}
            </p>

            <p className="mt-1 text-xs text-amber-600">Need attention</p>
          </div>

          {/* Out of Stock */}
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Out of Stock</p>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                !
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {outOfStockProducts}
            </p>

            <p className="mt-1 text-xs text-red-600">Currently unavailable</p>
          </div>
        </div>

        {/* Alert */}
        {lowStockProducts > 0 || outOfStockProducts > 0 ? (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="mt-0.5 text-amber-600">⚠</div>

            <div>
              <p className="text-sm font-semibold text-amber-900">
                Inventory needs attention
              </p>

              <p className="mt-1 text-sm text-amber-700">
                {lowStockProducts} product(s) are running low and{" "}
                {outOfStockProducts} product(s) are out of stock.
              </p>
            </div>
          </div>
        ) : null}

        {/* Table Card */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {/* Toolbar */}
          <div className="border-b border-slate-200 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search product or SKU..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All Categories" : item}
                    </option>
                  ))}
                </select>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500"
                >
                  <option value="All">All Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Price
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Stock
                  </th>

                  <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Updated
                  </th>

                  <th className="px-6 py-3" />
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredProducts.map((product) => {
                  const productStatus = getStockStatus(
                    product.stock,
                    product.minStock
                  );

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-600">
                            {product.name.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {product.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-700">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-medium text-slate-900">
                          {formatCurrency(product.price)}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4 text-right">
                        <div>
                          <span
                            className={`text-sm font-semibold ${
                              product.stock === 0
                                ? "text-red-600"
                                : product.stock <= product.minStock
                                  ? "text-amber-600"
                                  : "text-slate-900"
                            }`}
                          >
                            {product.stock}
                          </span>

                          <span className="ml-1 text-xs text-slate-400">
                            {product.unit}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                          Min: {product.minStock}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[productStatus]}`}
                        >
                          {productStatus}
                        </span>
                      </td>

                      {/* Updated */}
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {product.updatedAt}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                        >
                          Adjust
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="text-3xl">📦</div>

                      <p className="mt-3 text-sm font-medium text-slate-900">
                        No products found
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-medium text-slate-700">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-slate-700">
                {products.length}
              </span>{" "}
              products
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
              >
                Previous
              </button>

              <button
                type="button"
                className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white"
              >
                1
              </button>

              <button
                type="button"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                2
              </button>

              <button
                type="button"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
