// src/store/recommendedMethodSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recommendedMethod: 'QDSToken', // По умолчанию SMS
};

const recommendedMethodSlice = createSlice({
    name: 'recommendedMethod',
    initialState,
    reducers: {
        setRecommendedMethod: (state, action) => {
            state.recommendedMethod = action.payload;
        },
    },
});

export const { setRecommendedMethod } = recommendedMethodSlice.actions;
export default recommendedMethodSlice.reducer;
