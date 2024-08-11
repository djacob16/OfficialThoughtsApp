import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateClient } from "aws-amplify/api";
import { listRepliesWithAuthor } from "../utils/customQueries";

export const getNearbyReplies = createAsyncThunk("data/getNearbyReplies",
    async (comment) => {
        const client = generateClient()
        try {
            const response = await client.graphql({
                query: listRepliesWithAuthor,
                variables: {
                    filter: {
                        commentRepliesId: { eq: comment.id }
                    }
                }
            })
            const repliesList = response.data.listReplies.items;
            const sortedReplies = repliesList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            return sortedReplies;
        } catch (error) {
            console.log("error fetching replies: ", error)
        }
    }
)

const initialState = {
    nearbyReplies: [],
    loading: 'idle',
    error: null
}

const getNearbyRepliesSlice = createSlice({
    name: "getNearbyReplies",
    initialState,
    reducers: {
        resetNearbyReplies: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNearbyReplies.pending, (state) => {
                state.loading = "loading"
            })
            .addCase(getNearbyReplies.fulfilled, (state, action) => {
                state.loading = "succeeded",
                    state.nearbyReplies = action.payload;
            })
            .addCase(getNearbyReplies.rejected, (state, action) => {
                state.loading = "failed",
                    state.error = action.payload;
            })
    }
})

export const gettingNearbyReplies = getNearbyRepliesSlice.actions;
export const { resetNearbyReplies } = getNearbyRepliesSlice.actions;

export default getNearbyRepliesSlice.reducer;