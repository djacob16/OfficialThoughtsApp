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
        return thoughtsList
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.message);
    }
})

const getInactiveThoughtsSlice = createSlice({
    name: "getInactiveThoughts",
    initialState: {
        inactiveThoughts: [],
        loading: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInactiveThoughts.pending, (state) => {
                state.loading = "loading"
            })
            .addCase(getInactiveThoughts.fulfilled, (state, action) => {
                state.loading = "succeeded",
                    state.inactiveThoughts = action.payload
            })
            .addCase(getInactiveThoughts.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
            });
    }
})

export const gettingInactiveThoughts = getInactiveThoughtsSlice.actions;

export default getInactiveThoughtsSlice.reducer;