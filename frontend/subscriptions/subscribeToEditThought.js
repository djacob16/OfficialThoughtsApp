import * as subscriptions from '../src/graphql/subscriptions';
import { generateClient } from "aws-amplify/api";
import { getActiveThoughts } from '../slices/getActiveThoughts';
import { getInactiveThoughts } from '../slices/getInactiveThoughts';

const client = generateClient();

const onEditThought = async (dispatch) => {
    dispatch(getActiveThoughts());
    dispatch(getInactiveThoughts());


    const thoughtsSubscription = client.graphql({
        query: subscriptions.onUpdateThought,
    }).subscribe({
        next: async () => {
            await dispatch(getActiveThoughts());
            await dispatch(getInactiveThoughts());
            console.log("edit thought subscription hit")
        },
        error: (error) => console.warn(error)
    });

    return () => {
        thoughtsSubscription.unsubscribe();
    };
};

export default onEditThought