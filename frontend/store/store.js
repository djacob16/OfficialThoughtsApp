import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/getOneUser';
import getActiveThoughtsSlice from '../slices/getActiveThoughts';
import getInactiveThoughtsSlice from '../slices/getInactiveThoughts';

export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        getActiveThoughtsSlice: getActiveThoughtsSlice,
        getInactiveThoughtsSlice: getInactiveThoughtsSlice,
    },
});
