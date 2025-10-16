import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loggedIn: false,
        user: null,
        error: null
    },
    reducers: {
        setAuth: (state, action) => {
            state.loggedIn = action.payload.loggedIn,
            state.user = action.payload.user || null,
            state.error = null
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        logout: (state, action) => {
            state.loggedIn = false,
            state.user = null,
            state.error = null
        }
    }
})

export const {setAuth, logout, setError} = authSlice.actions;
export default authSlice.reducer;