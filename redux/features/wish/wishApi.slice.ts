import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithoutErrorHandling } from "../../api/api.slice";

export const wishApi = createApi({
    reducerPath: "wishApi",
    baseQuery: baseQueryWithoutErrorHandling,
    tagTypes: ["Wish"],
    endpoints: (builder) => ({
        getWish: builder.query<Wish.IGetWishResponse, void>({
            query: () => ({
                url: "wish",
                method: "GET",
            }),
            providesTags: ["Wish"],
        }),
        deleteWish: builder.mutation<Wish.IDeleteWishResponse, string>({
            query: (id) => ({
                url: `wish/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Wish"],
        }),
        addWish: builder.mutation<Wish.IGetWishResponse, FormData>({
            query: (wish) => ({
                url: "wish",
                method: "POST",
                body: wish,
            }),
            invalidatesTags: ["Wish"],
        }),
    }),
});

export const { useGetWishQuery, useDeleteWishMutation, useAddWishMutation } = wishApi;