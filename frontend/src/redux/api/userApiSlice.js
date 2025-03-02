import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/update-profile`,
        method: "PUT",
        body: data,
      }),
    }),
    fetchAllUser: builder.query({
      query: () => ({
        url: `${USER_URL}`,
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `${USER_URL}/update-role/${id}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["User"], // Cập nhật lại dữ liệu user sau khi sửa
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useFetchAllUserQuery,
  useUpdateUserRoleMutation,
  useDeleteUserByIdMutation,
} = userApiSlice;
