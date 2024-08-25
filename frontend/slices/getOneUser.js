import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { getUser } from "../src/graphql/queries";

export const getOneUser = createAsyncThunk(
    "data/user", async () => {
        try {
            const client = generateClient();
            const { userId } = await getCurrentUser();
            const user = (await client.graphql({
                query: getUser,
                variables: {
                    id: userId
                },
                // authMode: 'iam'
            })).data.getUser
            return user
        } catch (error) {
            console.log("coming from getOneUser: ", error);
            return rejectWithValue(error.message);
        }
    }
)

const initialState = {
    user: undefined,
    loading: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOneUser.pending, (state) => {
                state.loading = "loading";
            })
            .addCase(getOneUser.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.user = action.payload;
            })
            .addCase(getOneUser.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload;
            });
    }
})

export const gettingUser = userSlice.actions;
export const { resetUser } = userSlice.actions;

export default userSlice.reducer;

