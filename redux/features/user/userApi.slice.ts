import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling, baseQueryWithoutErrorHandling } from "../../api/api.slice";
import { populateUser } from "./user.slice";

export const userApi = createApi({
    baseQuery: baseQueryWithoutErrorHandling,
    reducerPath: "userApi",
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUserByEmail: builder.query({
            query: (email: string) => ({
                url: `/user/${email}`,
                method: "GET",
            }),
            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
                const { data } = await cacheDataLoaded;
                if (data)   {
                    dispatch(populateUser(data.user));
                }
            },
            providesTags: ["User"],
        }),
        getUserDetails: builder.query<any, void>({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
            providesTags: ["User"],
            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
                const { data } = await cacheDataLoaded;
                if (data)   {
                    dispatch(populateUser(data.user));
                }
            }
        }),
        getUserIncome: builder.query<Income.IGetIncomeResponse, void>({
            query: () => ({
                url: "/income",
                method: "GET",
            }),
        }),
        updateUserBalance: builder.mutation<Income.IGetIncomeResponse, User.IUser>({
            query: (body) => ({
                url: "/user/additional",
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["User"],
        }),
        updateUserImage: builder.mutation<User.IUpdateUserResponse, FormData>({
            query: (body) => ({
                url: "/user/profile_image",
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["User"],
        }),
        updateUserName: builder.mutation<User.IUpdateUserResponse, User.IUser>({
            query: (body) => ({
                url: "/user/info",
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["User"],
        }),
        changePassword: builder.mutation<User.IUpdateUserResponse, User.IChangePasswordBody>({
            query: (body) => ({
                url: "/auth/newPassword",
                method: "PUT",
                body: body,
            }),
        }),
    }),
});

export const { useGetUserByEmailQuery, useGetUserDetailsQuery, useGetUserIncomeQuery, useUpdateUserBalanceMutation, useUpdateUserImageMutation, useUpdateUserNameMutation, useChangePasswordMutation } = userApi;

