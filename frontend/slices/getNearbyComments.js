import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listComments } from '../src/graphql/queries';
import { listCommentsWithAuthor } from "../utils/customQueries";

export const getNearbyComments = createAsyncThunk("data/getNearbyThoughts",
    async (thought) => {
        const client = generateClient();
        const { userId } = await getCurrentUser();
        console.log(thought.id)
        try {
            const response = await client.graphql({
                query: listCommentsWithAuthor,
                variables: {
                    filter: {
                        thoughtCommentsId: { eq: thought.id }
                    }
                }
            })
            console.log("Nearby Comments: ", response.data.listComments.items);
            const commentsList = response.data.listComments.items;
            const sortedComments = commentsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            return sortedComments;
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState = {
    nearbyComments: [],
    loading: "idle",
    error: null
}

const getNearbyCommentsSlice = createSlice({
    name: "getNearbyComments",
    initialState,
    reducers: {
        resetNearbyComments: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNearbyComments.pending, (state) => {
                state.loading = "loading"
            })
            .addCase(getNearbyComments.fulfilled, (state, action) => {
                state.loading = "succeeded",
                    state.nearbyComments = action.payload;
            })
            .addCase(getNearbyComments.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
            })
    }
})

export const gettingNearbyComments = getNearbyCommentsSlice.actions;
export const { resetNearbyComments } = getNearbyCommentsSlice.actions;

export default getNearbyCommentsSlice.reducer;
