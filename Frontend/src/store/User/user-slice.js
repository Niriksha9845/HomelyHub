import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",

    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        errors: null,
        success: false
    },

    reducers: {

        getSignupRequest: (state) => {
            state.loading = true;
        },

        getSignupDetails: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticated = true;
        },

        getLoginRequest: (state) => {
            state.loading = true;
        },

        getLoginDetails: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticated = true;
        },

        getError: (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        },

        getCurrentRequest: (state) => {
            state.loading = true;
        },

        getUpdateUserRequest: (state) => {
            state.loading = true;
        },

        getCurrentUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.isAuthenticated = true;
        },

        getLogout: (state) => {
            state.user = null;
            state.loading = false;
            state.isAuthenticated = false;
        },

        getLogoutRequest: (state) => {
            state.loading = true;
        },

        getPasswordRequest: (state) => {
            state.loading = true;
        },

        getPasswordSuccess: (state, action) => {
            state.success = action.payload;
            state.loading = false;
        },

        clearErrors: (state) => {
            state.errors = null;
        }
    }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;