
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-hot-toast";
import { authorize, unauthorize } from "../features/auth/auth.slice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
});

export const baseQueryWithoutErrorHandling = async ( args: any, api: any, extraOptions: any ) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.data) {
    if (args.method !== "GET" && typeof args !== "string")
      console.log("API success:", args.typePrefix);
  } else if (result.error) {
    if (result.error.status === 401) {
      api.dispatch(unauthorize());
    } else if (result.error.status === 400) {
      console.error("API validation error:", (result.error.data as any).error);
    } else if (result.error.data) {
      console.error("API error:", result.error.data);
    }
  }
  return result;
};

export const baseQueryWithErrorHandling = async ( args: any, api: any, extraOptions: any ) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.data) {
    if (args.method !== "GET" && typeof args !== "string")
      console.log("API success:", args.typePrefix);
      toast("Success!", 
        { 
          icon: "✔️",
          style: {
            borderRadius: '2px',
            background: '#3CCF4E',
            color: '#f7f7f7',
          },
        }
      )
  } else if (result.error) {
    if (result.error.status === 401) {
      api.dispatch(unauthorize());
      toast("Unauthorized!", 
        {
          icon: "⛔",
          style: {
            borderRadius: '2px',
            background: '#EB1D36',
            color: '#f7f7f7',
          },
        }
      )
    } else if (result.error.status === 400) {
      console.error("API validation error:", (result.error.data as any).error);
      toast((result.error.data as any).error,
        {
          icon: "🔴",
          style: {
            borderRadius: '2px',
            background: '#EB1D36',
            color: '#f7f7f7',
          },
        }
      )
    } else if (result.error.data) {
      console.error("API error:", result.error.data);
      toast((result.error.data as any).message,
        {
          icon: "🔴",
          style: {
            borderRadius: '2px',
            background: '#EB1D36',
            color: '#f7f7f7',
          },
        }
      )
    }
  }
  
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithErrorHandling,
  reducerPath: "api",
  endpoints: (builder) => ({}),
});
