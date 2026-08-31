import { useState } from "react";

export const CounterComponent = () => {
  const [itemQuantity, setItemQuantity] = useState(1);

  return (
    <>
      <div>
        <p>Jumlah : {itemQuantity}</p>
        <button
          onClick={() => setItemQuantity(itemQuantity + 1)}
          className="bg-green-500 text-black p-2 rounded-lg text-sm"
        >
          Tambah
        </button>
      </div>
    </>
  );
};
