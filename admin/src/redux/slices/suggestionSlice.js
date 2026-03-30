import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    suggestions: [],
    isLoading: false,
    error: null
};

const suggestionsSlice = createSlice({
    name: "suggestions",
    initialState,
    reducers: {

        suggestionStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },

        suggestionSuccess: (state, action) => {
            state.isLoading = false;
            state.suggestions.push(action.payload);
        },

        getSuggestionsSuccess: (state, action) => {
            state.isLoading = false;
            state.suggestions = action.payload;
        },

        suggestionFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        clearSuggestions: (state) => {
            state.suggestions = [];
        }
    }
});

export const {
    suggestionStart,
    suggestionSuccess,
    getSuggestionsSuccess,
    suggestionFailure,
    clearSuggestions
} = suggestionsSlice.actions;

export default suggestionsSlice.reducer;