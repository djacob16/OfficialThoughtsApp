import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/getOneUser';
import getActiveThoughtsSlice from '../slices/getActiveThoughts';

export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        getActiveThoughtsSlice: getActiveThoughtsSlice
    },
});
