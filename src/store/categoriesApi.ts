import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const categoriesSlices = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getProductCategories: builder.query<Categories[], void>({
      query: () => "products/categories",
    }),

    getDetailProductCategories: builder.query<ProductsResponse, string>({
      query: (category) => `products/category/${encodeURIComponent(category)}`,
    }),
  }),
});

export const {
  useGetProductCategoriesQuery,
  useGetDetailProductCategoriesQuery,
} = categoriesSlices;
