import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listThoughts } from '../src/graphql/queries';

export const getActiveThoughts = createAsyncThunk("data/getActiveThoughts", async () => {
    const client = generateClient()
    const { userId } = await getCurrentUser();
    try {
        const response = await client.graphql({
            query: listThoughts,
            variables: {
                filter: {
                    authorID: { eq: userId },
                    and: {
                        active: { eq: true }
                    },
                }
            }
        });
        const thoughtsList = response.data.listThoughts.items;
        const sortedThoughts = thoughtsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        let activeParked = 0;
        for (thought of sortedThoughts) {
            if (thought.parked) {
                activeParked = activeParked + 1;
            }
        }
        const entities = { sortedThoughts, activeParked };
        return entities;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.message);
    }
})

const initialState = {
    entities: [],
    loading: "idle",
    error: null
}

const getActiveThoughtsSlice = createSlice({
    name: "getActiveThoughts",
    initialState,
    reducers: {
        resetActiveThoughts: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getActiveThoughts.pending, (state) => {
                state.loading = "loading"
            })
            .addCase(getActiveThoughts.fulfilled, (state, action) => {
                state.loading = "succeeded",
                    state.entities = action.payload;
            })
            .addCase(getActiveThoughts.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
            });
    }
})

export const gettingActiveThoughts = getActiveThoughtsSlice.actions;
export const { resetActiveThoughts } = getActiveThoughtsSlice.actions;

export default getActiveThoughtsSlice.reducer;