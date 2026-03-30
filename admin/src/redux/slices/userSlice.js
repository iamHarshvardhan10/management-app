import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isLoading: false,
    error: null
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },

        getUsersSuccess: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        },

        userFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        clearUsers: (state) => {
            state.users = [];
        }
    }
});

export const {
    userStart,
    getUsersSuccess,
    userFailure,
    clearUsers
} = userSlice.actions;

export default userSlice.reducer;