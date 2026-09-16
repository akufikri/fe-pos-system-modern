import { useState, useEffect } from "react";

// <T> = slot kosong, diisi tipe data ASLI saat Hook ini dipakai
export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((responseData: T) => {
        setData(responseData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data:", err);
        setIsLoading(false);
      });
  }, [url]);

  return { data, isLoading };
};
