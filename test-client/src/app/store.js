import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import roomSlice from "./features/room/roomSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        room:roomSlice
    },
    devTools:process.env.NODE_ENV !== 'production'
})


export default store;