import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./Slices/searchSlice";
import authReducer from './Slices/authSlice';
import { apiSlice } from "./Slices/apiSlice";
import adminAuthSlice from "./Slices/adminAuthSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        adminAuth:adminAuthSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        search: searchSlice,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;