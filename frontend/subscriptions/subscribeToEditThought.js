import * as subscriptions from '../src/graphql/subscriptions';
import { generateClient } from "aws-amplify/api";
import { getActiveThoughts } from '../slices/getActiveThoughts';

const client = generateClient();

const onEditThought = async (dispatch) => {
    await dispatch(getActiveThoughts())
    const thoughts = client.graphql({
        query: subscriptions.onUpdateThought,
    })
        .subscribe({
            next: ({ data }) => { dispatch(getActiveThoughts()) },
            error: (error) => console.warn(error)
        });

    return () => {
        thoughtsSubscription.unsubscribe();
    };
};

export default onEditThought