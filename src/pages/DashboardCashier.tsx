import { OrderSummary } from "../Components/OrderSummary";

export const DashboardCashier = () => {
  return (
    <>
      <div>
        <OrderSummary productName="Coffee Latte" totalItem={300} />
      </div>
    </>
  );
};
