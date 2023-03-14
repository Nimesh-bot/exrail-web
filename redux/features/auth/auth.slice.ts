import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../../@types/auth/authState";

const initialState: AuthState = {
  isLoggedIn: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authorize: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = true;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
    },
    unauthorize: (state) => {
      state.isLoggedIn = false;
      state.access = undefined;
      state.refresh = undefined;
    },
  },
});

export const { authorize, unauthorize } = AuthSlice.actions;

const AuthReducer = AuthSlice.reducer;
export default AuthReducer;
