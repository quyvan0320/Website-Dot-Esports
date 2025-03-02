import { TOPIC_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const topicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTopic: builder.mutation({
      query: (data) => ({
        url: TOPIC_URL,
        method: "POST",
        body: data,
      }),
    }),
    getAllTopics: builder.query({
      query: () => ({
        url: TOPIC_URL,
      }),
    }),
    getOneTopic: builder.query({
      query: (id) => ({
        url: `${TOPIC_URL}/${id}`,
      }),
    }),
    updateTopic: builder.mutation({
      query: ({ topicId, updatedTopic }) => ({
        url: `${TOPIC_URL}/${topicId}`,
        method: "PUT",
        body: updatedTopic,
      }),
    }),
    deleteTopic: builder.mutation({
      query: (id) => ({
        url: `${TOPIC_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useGetAllTopicsQuery,
  useGetOneTopicQuery,
  useUpdateTopicMutation,
} = topicApiSlice;
