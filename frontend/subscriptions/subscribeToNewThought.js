import * as subscriptions from '../src/graphql/subscriptions';
import { generateClient } from "aws-amplify/api";
import { getActiveThoughts } from '../slices/getActiveThoughts';
import { getInactiveThoughts } from '../slices/getInactiveThoughts';
import { getOneUser } from '../slices/getOneUser';

const client = generateClient();

const onThought = async (dispatch) => {
    dispatch(getActiveThoughts());
    dispatch(getInactiveThoughts());
    dispatch(getOneUser());

    const thoughtsSubscription = client.graphql({
        query: subscriptions.onCreateThought,
    }).subscribe({
        next: async () => {
            await dispatch(getActiveThoughts());
            await dispatch(getInactiveThoughts());
            await dispatch(getOneUser());
            console.log("new thought subscription hit")
        },
        error: (error) => console.warn(error)
    });

    return () => {
        thoughtsSubscription.unsubscribe();
    };
};

export default onThought