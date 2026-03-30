import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leaves: [],
    isLoading: false,
    error: null,
};

const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {
        leaveStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },

        leaveSuccess: (state, action) => {
            state.isLoading = false;
            state.leaves.push(action.payload);
        },

        getLeavesSuccess: (state, action) => {
            state.isLoading = false;
            state.leaves = action.payload;
        },

        leaveFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    leaveStart,
    leaveSuccess,
    getLeavesSuccess,
    leaveFailure,
} = leaveSlice.actions;

export default leaveSlice.reducer;