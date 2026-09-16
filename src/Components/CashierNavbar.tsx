import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { incrementCart } from "@/store/cartSlice";

export const CashierNavbar = () => {
  const dispatch = useAppDispatch();

  const totalItems = useAppSelector((state) => state.cart.totalItems);

  return (
    <>
      <nav>
        <span>Keranjang : {totalItems} Item</span>
        <button onClick={() => dispatch(incrementCart())}>+ Scan</button>
      </nav>
    </>
  );
};
