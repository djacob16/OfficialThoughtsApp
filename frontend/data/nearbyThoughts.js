import { listThoughts } from "../src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import geohash from "ngeohash";

const getNearbyThoughts = async (latitude, longitude, radius) => {
    const hash = geohash.encode(latitude, longitude, radius)
    const client = generateClient();
    try {
        const response = await client.graphql({
            query: listThoughts,
            variables: {
                filter: {
                    geohash: { beginsWith: hash }
                }
            }
        });
        const thoughtsList = response.data.listThoughts.items;
        console.log("thoughtsList: ", thoughtsList)
        return thoughtsList;
    } catch (error) {
        console.log(error);
        throw error; // or handle the error as needed
    }
}

export default getNearbyThoughts;