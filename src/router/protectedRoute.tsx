import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  // Simulasi pengecak token login kasir di sistem memori browser
  // Flow 1 : user -> login -> simpan token ke localstorage (memori sementara)
  // Flow 2 : system -> chek ke localstorage -> apakah ada ? -> selamat anda bisa masuk ke dashboard

  const isUserAuthenticated = localStorage.getItem("cashier_token") !== null;

  // Jika tidak punya token sah, kunci akses dan lempar ke halaman login
  if (!isUserAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  // Jika sah, izinkan masuk dan cetak halaman anak yang dituju via <Outlet />
  return <Outlet />;
};
