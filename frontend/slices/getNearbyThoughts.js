import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listNearbyThoughtsWithAuthor } from "../src/graphql/customQueries";
import { listThoughts } from "../src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import geohash from "ngeohash";

export const getNearbyThoughts = createAsyncThunk(
    "data/nearby", async (hash) => {
        const client = generateClient();
        try {
            const response = await client.graphql({
                query: listNearbyThoughtsWithAuthor,
                variables: {
                    filter: {
                        geohash: {
                            beginsWith: hash
                        }, and: {
                            active: {
                                eq: true
                            }
                        }
                    }
                }
            });
            return response.data.listThoughts.items;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
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