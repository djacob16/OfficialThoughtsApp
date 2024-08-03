import * as subscriptions from '../src/graphql/subscriptions';
import { generateClient } from "aws-amplify/api";
import { getActiveThoughts } from '../slices/getActiveThoughts';
import { getInactiveThoughts } from '../slices/getInactiveThoughts';
import { getNearbyThoughts } from '../slices/getNearbyThoughts';

const client = generateClient();

const onEditThought = async (dispatch) => {
    dispatch(getActiveThoughts());
    dispatch(getInactiveThoughts());
    dispatch(getNearbyThoughts("dnupf6hmr"));


    const thoughtsSubscription = client.graphql({
        query: subscriptions.onUpdateThought,
    }).subscribe({
        next: async () => {
            await dispatch(getActiveThoughts());
            await dispatch(getInactiveThoughts());
            await dispatch(getNearbyThoughts("dnupf6hmr"));
            console.log("edit thought subscription hit")
        },
        error: (error) => console.warn(error)
    });

    return () => {
        thoughtsSubscription.unsubscribe();
    };
};

export default onEditThought