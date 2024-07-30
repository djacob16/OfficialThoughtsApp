import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listThoughts } from '../src/graphql/queries';

export const getInactiveThoughts = createAsyncThunk("data/getInactiveThoughts", async () => {
    const client = generateClient()
    const { userId } = await getCurrentUser();
    try {
        const response = await client.graphql({
            query: listThoughts,
            variables: {
                filter: {
                    authorID: { eq: userId },
                    and: {
                        active: { eq: false }
                    }
                }
            }
        });
        const thoughtsList = response.data.listThoughts.items;
        const sortedThoughts = thoughtsList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        let inactiveParked = 0;
        for (thought of sortedThoughts) {
            if (thought.parked) {
                inactiveParked = inactiveParked + 1
            }
        }
        const entities = { sortedThoughts, inactiveParked };
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

const getInactiveThoughtsSlice = createSlice({
    name: "getInactiveThoughts",
    initialState,
    reducers: {
        resetInactiveThoughts: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getInactiveThoughts.pending, (state) => {
                state.loading = "loading"
            })
            .addCase(getInactiveThoughts.fulfilled, (state, action) => {
                state.loading = "succeeded",
                    state.entities = action.payload;
            })
            .addCase(getInactiveThoughts.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
            });
    }
})

export const gettingInactiveThoughts = getInactiveThoughtsSlice.actions;
export const { resetInactiveThoughts } = getInactiveThoughtsSlice.actions;

export default getInactiveThoughtsSlice.reducer;