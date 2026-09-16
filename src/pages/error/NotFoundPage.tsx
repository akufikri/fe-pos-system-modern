import { useRouteError, Link } from "react-router-dom";

export const NotFoundPage = () => {
  const error = useRouteError(); // Menangkap detail pesan eror dari sistem
  console.log(error);

  return (
    <>
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold">Error 404 - Halaman Tidak Ada!</h1>
        <p className="text-gray-500 my-2">
          Maaf, menu atau halaman kasir yang anda cari tidak terdaftar
        </p>
        <Link to="/stock" className="text-blue-500 underline">
          Kembali ke Meja Kasir
        </Link>
      </div>
    </>
  );
};
