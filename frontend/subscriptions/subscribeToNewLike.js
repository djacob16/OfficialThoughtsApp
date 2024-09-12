import { generateClient } from "aws-amplify/api";
import { useDispatch } from "react-redux";
import { getNotifications } from "../slices/getNotifications";
import * as subscriptions from "../src/graphql/subscriptions"; // Ensure you're importing the correct subscription query
import { getCurrentUser } from "@aws-amplify/auth"; // Handles authentication and gets the current user's details

const client = generateClient();

const onCreateThoughtLike = async (dispatch) => {
    try {
        const { userId } = await getCurrentUser();
        const thoughtLikeSubscription = client.graphql({
            query: subscriptions.onCreateThoughtLike,
        }).subscribe({
            next: async () => {
                await dispatch(getNotifications());
            },
            error: (error) => {
                console.warn("Error in onCreateThoughtLike subscription:", error);
            }
        });

        // Return a cleanup function to unsubscribe
        return () => {
            thoughtLikeSubscription.unsubscribe();
        };
    } catch (error) {
        console.error("Error setting up the subscription:", error);
    }
};

export default onCreateThoughtLike;
