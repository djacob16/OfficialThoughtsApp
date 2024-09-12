import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listThoughtLikesWithUser } from "../utils/customQueries";
import { generateClient } from "aws-amplify/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCommentsForThought, getLikesForThought, getUsersReplies } from "../data/getActivity";

export const getNotifications = createAsyncThunk(
    "data/notifications", async (_, { getState, rejectWithValue }) => {
        try {
            const { activeThoughts } = getState().getActiveThoughtsSlice;
            const { inactiveThoughts } = getState().getInactiveThoughtsSlice;
            const combinedThoughts = [...activeThoughts, ...inactiveThoughts];
            console.log('Combined thoughts: ', combinedThoughts)

            const activityLikes = await Promise.all(
                combinedThoughts.map(async (thought) => {
                    const likes = await getLikesForThought(thought.id);
                    return likes;
                })
            )

            const activityComments = await Promise.all(
                combinedThoughts.map(async (thought) => {
                    const comments = await getCommentsForThought(thought.id);
                    return comments;
                })
            )

            const combinedActivity = [...activityLikes, ...activityComments].flat();
            const sortedActivity = combinedActivity.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            await AsyncStorage.setItem("lastUpdated", Date.now().toString());
            return sortedActivity

        } catch (error) {
            console.log("error getting activity: ", error)
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    notifications: [],
    loading: "idle",
    error: null
}


const getNotificationsSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        resetNotifications: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = "loading";
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.notifications = action.payload;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
            });
    }
})

export const gettingNotificationSlice = getNotificationsSlice.actions
export const { resetNotifications } = getNotificationsSlice.actions;

export default getNotificationsSlice.reducer;