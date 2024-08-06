import * as subscriptions from '../src/graphql/subscriptions';
import { generateClient } from "aws-amplify/api";
import { getOneUser } from '../slices/getOneUser';

const client = generateClient();

const onUpdateUser = async (dispatch) => {
    dispatch(getOneUser());

    const usersSubscription = client.graphql({
        query: subscriptions.onUpdateUser,
    }).subscribe({
        next: async () => {
            await dispatch(getOneUser());
        },
        error: (error) => console.warn(error)
    });

    return () => {
        usersSubscription.unsubscribe();
    };
};

export default onUpdateUser