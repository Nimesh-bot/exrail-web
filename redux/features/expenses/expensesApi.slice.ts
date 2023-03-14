import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithoutErrorHandling } from "../../api/api.slice";

export const expensesApiWithoutErrorHandling = createApi({
    reducerPath: "expensesApi",
    baseQuery: baseQueryWithoutErrorHandling,
    tagTypes: ["Expenses"],
    endpoints: (builder) => ({
        getExpenses: builder.query<Expenses.IGetExpensesResponse, void>({
            query: () => ({
                url: "expenses/defexpense",
                method: "GET",
            }),
            providesTags: ["Expenses"],
        }),
        getAllExpenses: builder.query<Expenses.IGetAllExpensesResponse, void>({
            query: () => ({
                url: "expenses",
                method: "GET",
            }),
            providesTags: ["Expenses"],
        }),
        updateExpense: builder.mutation<Expenses.IGetExpensesResponse, { id: string, body: Expenses.IExpenses }>({
            query: ({ id, body }) => ({
              url: `expenses/${id}`,
              method: 'PUT',
              body: body,
            }),
            invalidatesTags: ["Expenses"],
        }),
        updateEstimatedExpense: builder.mutation<Expenses.IGetExpensesResponse, { id: string, body: Expenses.IExpenses }>({
            query: ({ id, body }) => ({
                url: `expenses/estimated/${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ["Expenses"],
        }),
        postExpense: builder.mutation<Expenses.IGetExpensesResponse, Expenses.IExpenses>({
            query: (body) => ({
                url: `expenses`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ["Expenses"],
        }),
    }),
})

export const { useGetExpensesQuery, useGetAllExpensesQuery, useUpdateExpenseMutation, useUpdateEstimatedExpenseMutation, usePostExpenseMutation } = expensesApiWithoutErrorHandling;

