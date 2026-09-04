import React from "react";

interface ProductItem {
  id: number;
  title: string;
  price: number;
  stock: number;
}

interface ProductDashboardProps {
  isLoading: boolean;
  products: ProductItem[];
}

export const ProductDashboard = ({
  isLoading,
  products,
}: ProductDashboardProps) => {
  if (isLoading) {
    return <div>Sedang menyinkronkan data produk....</div>;
  }

  return (
    <>
      <div>
        <h2>Daftar inventaris produk</h2>
        {products.length}
      </div>
    </>
  );
};
