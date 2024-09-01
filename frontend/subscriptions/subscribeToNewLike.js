import { generateClient } from "aws-amplify/api";
import { useDispatch } from "react-redux";
import { getNotifications } from "../slices/getNotifications";
import * as subscroptions from "../src/graphql/subscriptions"
import { onCreateThoughtLikeForAuthor } from "../utils/customSubscriptions";
import { getCurrentUser } from "@aws-amplify/auth";

const client = generateClient()

const onCreateThoughtLike = async (dispatch) => {
    const { userId } = await getCurrentUser()
    const thoughtLikeSubscription = client.graphql({
        query: onCreateThoughtLikeForAuthor,
        variables: {
            authorID: userId
        }
    }).subscribe({
        next: async (payload) => {
            const newLike = payload.data.onCreateThoughtLike;
            await dispatch(getNotifications())
            console.log("subscription worked and notifications were dispatched")
        },
        error: (error) => console.warn('Error in onCreateThoughtLike subscription:', error)
    });

    return () => {
        thoughtLikeSubscription.unsubscribe();
    };
}

export default onCreateThoughtLike
