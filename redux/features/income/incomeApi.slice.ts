import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithoutErrorHandling } from "../../api/api.slice";

export const incomeApi = createApi({
    reducerPath: "incomeApi",
    baseQuery: baseQueryWithoutErrorHandling,
    tagTypes: ["Income"],
    endpoints: (builder) => ({
        getIncome: builder.query<Income.IGetIncomeResponse, void>({
            query: () => ({
                url: "income",
                method: "GET",
            }),
            providesTags: ["Income"],
        }),
        updateIncome: builder.mutation<Income.IGetIncomeResponse, Income.IIncome>({
            query: (body) => ({
                url: "income",
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["Income"],
        }),
        postIncome: builder.mutation<Income.IGetIncomeResponse, Income.IIncome>({
            query: (body) => ({
                url: "user/income",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Income"],
        }),
    }),
})

export const { useGetIncomeQuery, useUpdateIncomeMutation, usePostIncomeMutation } = incomeApi;