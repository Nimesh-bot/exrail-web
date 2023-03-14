import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/api.slice";

import authReducer from "./features/auth/auth.slice";
import { authApi } from "./features/auth/authApi.slice";
import { expensesApiWithoutErrorHandling } from "./features/expenses/expensesApi.slice";
import { incomeApi } from "./features/income/incomeApi.slice";

import userReducer from "./features/user/user.slice";
import { userApi } from "./features/user/userApi.slice";
import { wishApi } from "./features/wish/wishApi.slice";

const rootReducer = combineReducers({ 
    auth: authReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [expensesApiWithoutErrorHandling.reducerPath]: expensesApiWithoutErrorHandling.reducer,
    [incomeApi.reducerPath]: incomeApi.reducer,
    [wishApi.reducerPath]: wishApi.reducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: [
        apiSlice.reducerPath,
        authApi.reducerPath,
        userApi.reducerPath,
        expensesApiWithoutErrorHandling.reducerPath,
        incomeApi.reducerPath,
        wishApi.reducerPath,
    ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware:  (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 128,
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
      },
      immutableCheck: { warnAfter: 128 },
    })
    .concat(apiSlice.middleware)
    .concat(authApi.middleware)
    .concat(userApi.middleware)
    .concat(expensesApiWithoutErrorHandling.middleware)
    .concat(incomeApi.middleware)
    .concat(wishApi.middleware),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);