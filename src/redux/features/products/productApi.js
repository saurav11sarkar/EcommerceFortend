import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseUrl";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        category,
        color,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const queryParams = new URLSearchParams();

        if (category) queryParams.append("category", category);
        if (color) queryParams.append("color", color);
        if (minPrice) queryParams.append("minPrice", String(minPrice));
        if (maxPrice) queryParams.append("maxPrice", String(maxPrice));
        queryParams.append("page", String(page));
        queryParams.append("limit", String(limit));

        return `/?${queryParams.toString()}`;
      },
      providesTags: ["Products"],
    }),
    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    addProductRoutes: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",
        method: "POST",
        body: newProduct,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    fetchReletedProducts: builder.query({
      query: (id) => `/related/${id}`,
    }),
    updateproduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    deletedProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductRoutesMutation,
  useFetchReletedProductsQuery,
  useUpdateproductMutation,
  useDeletedProductMutation,
} = productApi;
export default productApi;
