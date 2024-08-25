import * as subscriptions from '../src/graphql/subscriptions';
import { generateClient } from "aws-amplify/api";
import { getActiveThoughts } from '../slices/getActiveThoughts';
import { getInactiveThoughts } from '../slices/getInactiveThoughts';
import { getNearbyThoughts } from '../slices/getNearbyThoughts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = generateClient();

const onRemoveThought = async (dispatch) => {
    dispatch(getActiveThoughts());
    dispatch(getInactiveThoughts());
    const hash = await AsyncStorage.getItem("@hash")
    if (hash) {
        dispatch(getNearbyThoughts(hash));
    }

    const thoughtsSubscription = client.graphql({
        query: subscriptions.onDeleteThought,
    }).subscribe({
        next: async () => {
            await dispatch(getActiveThoughts());
            await dispatch(getInactiveThoughts());
            if (hash) {
                await dispatch(getNearbyThoughts(hash));
            }
        },
        error: (error) => console.warn(error)
    });

    return () => {
        thoughtsSubscription.unsubscribe();
    };
};

export default onRemoveThought