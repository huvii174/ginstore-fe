import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import localStorageReduce from "./locaStorageStore";

import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        cartReduce: cartReducer,
        authReduce: authReducer,
        localStorageReduce: localStorageReduce,
    },
})
