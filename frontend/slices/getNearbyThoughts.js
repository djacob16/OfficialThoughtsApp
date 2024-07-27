import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listNearbyThoughtsWithAuthor } from "../src/graphql/customQueries";
import { generateClient } from "aws-amplify/api";
import geohash from "ngeohash";

export const getNearbyThoughts = createAsyncThunk(
    "data/nearby", async (latitude, longitude, radius) => {
        const client = generateClient();
        const hash = geohash.encode(latitude, longitude, radius)
        try {
            const response = await client.graphql({
                query: listNearbyThoughtsWithAuthor,
                filter: {
                    geohash: { beginsWith: hash }
                }
            })
            console.log("neay by slice response: ", response.data.listThoughts.items)
            return response.data.listThoughts.items;
        } catch (error) {
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    nearbyThoughts: [],
    loading: "idle",
    error: null
}

const getNearbyThoughtsSlice = createSlice({
    name: "getNearbyThoughts",
    initialState,
    reducers: {
        resetNearbyThoughts: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNearbyThoughts.pending, (state) => {
                state.loading = "loading"
            })
            .addCase(getNearbyThoughts.fulfilled, (state, action) => {
                state.loading = "succeeded",
                    state.nearbyThoughts = action.payload
            })
            .addCase(getNearbyThoughts.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
            });
    }
})

export const gettingNearbyThoughts = getNearbyThoughtsSlice.actions;
export const { resetNearbyThoughts } = getNearbyThoughtsSlice.actions;

export default getNearbyThoughtsSlice.reducer;