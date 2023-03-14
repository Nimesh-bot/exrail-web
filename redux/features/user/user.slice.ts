import { createSlice, PayloadAction } from "@reduxjs/toolkit/dist";
import { UserInfoType } from "../../../@types/slice/user";
import { RootState } from "../../store";

const initialState = {
    image: {
        img_url: "",
        img_id: "",
    },
    name: "",
    email: "",
    balance: 0,
    disciplineLevel: 5,
    role: "user",
    isVerified: false,
    _id: "",
    createdAt: "",
    updatedAt: "",
    __v: 0
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        populateUser: (state, action: PayloadAction<UserInfoType>) => {
            return action.payload;
        },
        updateUser: (state, action: PayloadAction<UserInfoType>) => {
            return { ...state, ...action.payload };
        },
    }
})

export const { populateUser, updateUser } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user;

const UserReducer = userSlice.reducer;
export default UserReducer;