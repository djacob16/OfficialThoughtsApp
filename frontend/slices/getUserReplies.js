import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "@aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listComments, listReplies } from "../src/graphql/queries";
import { listCommentsWithAuthor, listRepliesWithAuthor } from "../utils/customQueries";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserReplies = createAsyncThunk("data/userReplies", async (_, { rejectWithValue }) => {
    const client = generateClient();
    const { userId } = await getCurrentUser();

    let repliesLastUpdatedTime = await AsyncStorage.getItem("repliesLastUpdatedTime");
    if (repliesLastUpdatedTime) {
        repliesLastUpdatedTime = new Date(Number(repliesLastUpdatedTime)).toISOString();
    } else {
        repliesLastUpdatedTime = new Date(0).toISOString();
    }

    try {
        const commentsResponse = await client.graphql({
            query: listCommentsWithAuthor,
            variables: {
                filter: {
                    createdAt: { gt: repliesLastUpdatedTime },  // Retrieve comments after the last updated time
                    authorID: { eq: userId }
                }
            }
        });
        const comments = commentsResponse.data.listComments.items.filter(comment => comment.thought !== null);

        const repliesResponse = await client.graphql({
            query: listRepliesWithAuthor,
            variables: {
                filter: {
                    createdAt: { gt: repliesLastUpdatedTime },  // Retrieve replies after the last updated time
                    authorID: { eq: userId }
                }
            }
        });
        const replies = repliesResponse.data.listReplies.items.filter(reply => reply.comment !== null);


        const response = [...comments, ...replies];
        const sortedReplies = response.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


        console.log("repliesLastUpdatedTime: ", repliesLastUpdatedTime);
        console.log("USER REPLIES: ", sortedReplies);


        await AsyncStorage.setItem("repliesLastUpdatedTime", Date.now().toString());

        return sortedReplies;
    } catch (error) {
        console.log("Error fetching replies or comments: ", error);
        return rejectWithValue(error);
    }
});


const initialState = {
    userReplies: [],
    loading: "idle",
    error: null
}

const getUserRepliesSlice = createSlice({
    name: "getUserReplies",
    initialState,
    reducers: {
        resetUserReplies: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserReplies.pending, (state) => {
                state.loading = "loading";
            })
            .addCase(getUserReplies.fulfilled, (state, action) => {
                state.loading = "succeeded",
                    state.userReplies = action.payload;
            })
            .addCase(getUserReplies.rejected, (state, action) => {
                state.loading = "failed",
                    state.error = action.payload;
            })
    }
})

export const gettingUserReplies = getUserRepliesSlice.actions;
export const { resetUserReplies } = getUserRepliesSlice.actions;

export default getUserRepliesSlice.reducer;