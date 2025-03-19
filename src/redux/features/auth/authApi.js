import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseUrl";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      refetchOnMount: true,
      invalidatesTags: ["Users"],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      refetchOnMount: true,
      invalidatesTags: ["Users"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      refetchOnMount: true,
      invalidatesTags: ["Users"],
    }),
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      refetchOnMount: true,
      invalidatesTags: ["Users"],
    }),
    deletedUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      refetchOnMount: true,
      invalidatesTags: ["Users"],
    }),
    editProfile: builder.mutation({
      query: (profileData) => ({
        url: "/edit-profile",
        method: "PATCH",
        body: profileData,
      }),
      // refetchOnMount: true,
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useDeletedUserMutation,
  useUpdateUserRoleMutation,
  useEditProfileMutation,
} = authApi;
export default authApi;
