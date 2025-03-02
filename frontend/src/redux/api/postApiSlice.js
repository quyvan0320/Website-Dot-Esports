import { getLatestPost } from "../../../../backend/controllers/postController";
import { POST_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: POST_URL,
        method: "POST",
        body: data,
      }),
    }),
    getAllPosts: builder.query({
      query: () => ({
        url: POST_URL,
      }),
    }),
    getPostBySlug: builder.query({
      query: (slug) => ({
        url: `${POST_URL}/${slug}`,
      }),
    }),
    updatePost: builder.mutation({
      query: ({ postId, updatedPost }) => ({
        url: `${POST_URL}/${postId}`,
        method: "PUT",
        body: updatedPost,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    getLatestPost: builder.query({
      query: () => ({
        url: `${POST_URL}/latest-post`,
      }),
    }),
    getFeaturedPost: builder.query({
      query: () => ({
        url: `${POST_URL}/featured-post`,
      }),
    }),
    getPostsPagination: builder.query({
      query: ({ page = 1, limit = 6 }) => ({
        url: `${POST_URL}/panigation-post?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getPostsPaginationByUser: builder.query({
      query: ({ page = 1, limit = 8, userId }) => ({
        url: `${POST_URL}/panigation-post-user?page=${page}&limit=${limit}&userId=${userId}`,
        method: "GET",
      }),
    }),
    getPostsByCategory: builder.query({
      query: (categorySlug) => `${POST_URL}/category/${categorySlug}`,
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetFeaturedPostQuery,
  useGetAllPostsQuery,
  useGetPostBySlugQuery,
  useUpdatePostMutation,
  useUploadImageMutation,
  useGetPostsPaginationQuery,
  useGetLatestPostQuery,
  useGetPostsByCategoryQuery,
  useGetPostsPaginationByUserQuery,
} = postApiSlice;
