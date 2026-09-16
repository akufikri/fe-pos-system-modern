import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");

  // 1. Named Function handler untuk mendeteksi ketikan email kasir
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Typescript sah membaca .target.value karena tipe data input sudah di lock / kunci
    setEmail(event.target.value);
  };

  // 3. Named Function Handler untuk menangani request ke form login
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Mencegah browser refresh page total agar status aplikasi SPA tidak hilang
    event.preventDefault();

    try {
      const response = {
        token: "abcd12345678",
      };

      // simpan ke localstorage
      localStorage.setItem("cashier_token", response.token);
      alert("Selamat anda bisa login");

      window.location.href = "/stock";
    } catch (error) {
      alert("Login gagal, tolong cek lagi form nya...");
      console.log("Login gagal:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <form
          onSubmit={handleFormSubmit}
          className="p-4 border border-gray-300 shadow-sm rounded-lg bg-white w-72"
        >
          <h2 className="text-lg font-medium text-center">Masuk Sistem POS</h2>
          <div className="flex flex-col space-y-2 mt-5">
            <label htmlFor="email" className="font-medium text-sm">
              Email Kasir
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange} // Menghubungkan ke named handler function yang ada di atas
              placeholder="Masukan email anda"
              required
              className="border border-gray-200 p-2 rounded-lg text-sm placeholder:text-sm"
            />
            <button
              type="button"
              onClick={(event) => {
                // 2. Inline handler: tipe data 'event' otomatis tertebak oleh React
                event.preventDefault();
                setEmail(""); // Logika singkat : reset isi kolom email menjadi kosong
              }}
              className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-400 text-sm font-medium"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-green-500 p-2 rounded-lg text-black hover:bg-green-400 text-sm font-medium"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
