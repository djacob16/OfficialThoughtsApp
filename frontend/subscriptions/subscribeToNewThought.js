import * as subscriptions from '../src/graphql/subscriptions';
import { generateClient } from "aws-amplify/api";
import { getActiveThoughts } from '../slices/getActiveThoughts';
import { useDispatch } from "react-redux";

const client = generateClient();

const onThought = async (dispatch) => {
    await dispatch(getActiveThoughts())
    const thoughts = client.graphql({
        query: subscriptions.onCreateThought,
    })
        .subscribe({
            next: ({ data }) => { dispatch(getActiveThoughts()) },
            error: (error) => console.warn(error)
        });
};

export default onThought