// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import recommendedMethodReducer from './recommendedMethodSlice';
import sidebarReducer from './sidebarSlice';

export const store = configureStore({
    reducer: {
        recommendedMethod: recommendedMethodReducer,
        sidebar: sidebarReducer,
    },
});
