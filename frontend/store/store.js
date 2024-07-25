import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/getOneUser';

export const store = configureStore({
    reducer: {
        userSlice: userSlice
    },
});
