import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../slices/getOneUser';
import getActiveThoughtsSlice from '../slices/getActiveThoughts';
import getInactiveThoughtsSlice from '../slices/getInactiveThoughts';
import getNearbyThoughtsSlice from '../slices/getNearbyThoughts';
import getNearbyCommentsSlice from '../slices/getNearbyComments';

export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        getActiveThoughtsSlice: getActiveThoughtsSlice,
        getInactiveThoughtsSlice: getInactiveThoughtsSlice,
        getNearbyThoughtsSlice: getNearbyThoughtsSlice,
        getNearbyCommentsSlice: getNearbyCommentsSlice
    },
});
