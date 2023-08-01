import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://contact-app.mmsdev.site/api/v1`,
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: (token) => ({
        url: "/contact",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    createContacts: builder.mutation({
      query: ({ token, contact }) => ({
        url: "/contact",
        method: "POST",
        body: contact,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContacts : builder.mutation({
      query : ({id,token})=> ({
        url : `/contact/${id}`,
        method : "DELETE",
        headers : {authorization : `Bearer ${token}`}
      }),
      invalidatesTags : ['contact'],
    }),
    singleContact : builder.query({
        query : ({id,token}) => ({
          url : `/contact/${id}`,
          headers:{authorization : `Bearer ${token}`}
        }),
        providesTags: ["contact"],
    })
  }),
});

export const { useGetContactsQuery, useCreateContactsMutation , useDeleteContactsMutation , useSingleContactQuery} = contactApi;
