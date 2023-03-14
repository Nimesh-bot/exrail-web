import { createApi, EndpointDefinitions } from '@reduxjs/toolkit/query/react'
import { baseQueryWithErrorHandling } from '../../api/api.slice'
import { populateUser } from '../user/user.slice'
import { authorize } from './auth.slice'

// type LoginData = {
//     email: string,
//     password: string
// }
// type RegisterData = {
//     fullname: string,
//     email: string,
//     password: string
// }

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body
            })
        }),
        login: builder.mutation({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
            async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
                const { data } = await cacheDataLoaded
                if (data) {
                    dispatch(authorize({ ...data, user: undefined }));
                    dispatch(populateUser(data.user));
                }
            }
        }),
        resetPassword: builder.mutation({
            query: (body) => ({
                url: 'auth/passwordReset',
                method: 'POST',
                body
            }),
        }),
        verifyResetPassword: builder.mutation({
            query: (body) => ({
                url: 'auth/verify/reset',
                method: 'POST',
                body
            }),
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: 'auth/newPassword',
                method: 'PUT',
                body
            }),
        }),
    })
})

export const { useLoginMutation, useRegisterMutation, useResetPasswordMutation, useVerifyResetPasswordMutation, useChangePasswordMutation } = authApi;