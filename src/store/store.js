import { configureStore } from "@reduxjs/toolkit";
import openAiReducer from "./actions/openAiSlice";
import authReducer from "./actions/authSlice";
import fetchGenArchReducer from "./actions/genArchSlice";


const store = configureStore({
    reducer: {
        openAi: openAiReducer,
        auth: authReducer,
        fetchGenArch: fetchGenArchReducer
    }
})

export default store;

