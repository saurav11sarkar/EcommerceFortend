import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseUrl";

const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Review", id: postId },
      ],
    }),
    getReviewsCount: builder.query({
      query: () => ({
        url: "/total-review",
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    getReviews: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: "Review", id: result[0]?.email }] : [],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewsCountQuery,
  useGetReviewsQuery,
} = reviewApi;

export default reviewApi;
