import { useState } from "react";

type cartProduct = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export const OrderSummary = () => {
  // ============================================
  // A. TYPE INFERENCE
  // ============================================
  // TypeScript otomatis menyimpulkan:
  // totalPrice = number

  const [totalPrice, setTotalPrice] = useState(0);

  // TypeScript otomatis menyimpulkan:
  // itemCount = number
  const [itemCount, setItemCount] = useState(1);

  // ============================================
  // B. EXPLICIT GENERIC
  // ============================================

  // Karena initial value adalah array kosong,
  // kita menentukan secara eksplisit isi array-nya.

  const [shoppingCart, setshoppingCart] = useState<cartProduct[]>([]);

  // ============================================
  // C. FUNCTIONAL UPDATE
  // ============================================

  const handleAddItem = () => {
    setItemCount((prevCount) => prevCount + 1);
  };

  const handleAddProduct = () => {
    const product: cartProduct = {
      id: "1",
      name: "Budi",
      price: 15000,
      qty: 1,
    };

    setshoppingCart((prevCart) => [...prevCart, product]);

    setTotalPrice((prevTotal) => prevTotal + product.price);
  };

  return (
    <>
      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {/* Item Count */}
        <div className="mb-4">
          <p>
            Jumlah Item : <strong>{itemCount}</strong>
          </p>

          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-3 py-2"
          >
            Tambah Item
          </button>
        </div>

        {/* Shopping Cart */}
        <div className="mb-4">
          <h3 className="font-semibold">Shopping Cart</h3>

          {shoppingCart.map((product) => (
            <div key={product.id}>
              <p>{product.name}</p>
              <p>Rp {product.price.toLocaleString("id-ID")}</p>
            </div>
          ))}
          <button onClick={handleAddProduct} className="bg-blue-500">
            Tambah Product
          </button>

          {/* Total */}
          <div>
            <p>
              Total Harga:{" "}
              <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
