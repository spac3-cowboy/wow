import { createSlice } from "@reduxjs/toolkit"

const userData = JSON.parse(sessionStorage.getItem('USER_DATA'))

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        user: null,
        redirectURL:'',
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
            if (!payload) {
                state.isAuthenticated = false
            } else {
                state.isAuthenticated = true
            }
            
        },
        setRedirectURL:(state,{payload})=>{
            state.redirectURL = payload;
        }
    }
});

export default authSlice.reducer;

export const { setUser,setRedirectURL } = authSlice.actions;

export const authSelector = (state) => state.auth;