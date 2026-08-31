type ProductCardProps = {
  title: string;
  price: number;
  isVisible: boolean;
  discountLabel?: string; // 👈 Tanda tanya artinya opsional (boleh tidak diisi)
};

export const ProductCard = ({
  title,
  price,
  isVisible,
  discountLabel = "No Promo", // iF di isi -> Value yand isi contoh : ADA PROMO
}: ProductCardProps) => {
  return (
    <>
      <div>
        <h3>{title}</h3>
        <p>Harga : {price}</p>
        <span>{isVisible ? "Ready" : "Sold Out"}</span>
        <span>{discountLabel}</span>
      </div>
    </>
  );
};
