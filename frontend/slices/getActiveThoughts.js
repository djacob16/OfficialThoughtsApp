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
        return thoughtsList
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.message);
    }
})

const initialState = {
    activeThoughts: [],
    loading: "idle",
    error: null
}

const getActiveThoughtsSlice = createSlice({
    name: "getActiveThoughts",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getActiveThoughts.pending, (state) => {
                state.loading = "loading"
            })
            .addCase(getActiveThoughts.fulfilled, (state, action) => {
                state.loading = "succeeded",
                    state.activeThoughts = action.payload
            })
            .addCase(getActiveThoughts.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
            });
    }
})

export const gettingActiveThoughts = getActiveThoughtsSlice.actions;
export const { reset } = getActiveThoughtsSlice.actions;

export default getActiveThoughtsSlice.reducer;