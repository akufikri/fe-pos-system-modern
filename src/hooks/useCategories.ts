import { useFetch } from "@/hooks/useFetch";

interface Categories {
  slug: string;
  name: string;
  url: string;
}
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  stock: number;
  brand?: string;
}
interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = "https://dummyjson.com";

export const useGetProductCategories = () => {
  return useFetch<Categories[]>(`${BASE_URL}/products/categories`);
};

export const useGetDetailProductCategories = (category: string) => {
  return useFetch<ProductsResponse>(
    `${BASE_URL}/products/category/${encodeURIComponent(category)}`
  );
};
