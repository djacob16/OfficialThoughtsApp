import { exchangeSpotifyCodeForToken } from "../utils/customMutations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateClient } from "aws-amplify/api";

export const makeExchange = async (code) => {
    const client = generateClient();

    try {
        const response = await client.graphql({
            query: exchangeSpotifyCodeForToken,
            variables: { code }
        });

        if (response.data.exchangeSpotifyCodeForToken.error) {
            throw new Error(response.data.exchangeSpotifyCodeForToken.error);
        }

        const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data.exchangeSpotifyCodeForToken;

        await AsyncStorage.setItem('spotifyAccessToken', accessToken);
        await AsyncStorage.setItem('spotifyRefreshToken', newRefreshToken);
        const expirationTime = new Date(Date.now() + expiresIn * 1000 - 5 * 60 * 1000);
        await AsyncStorage.setItem('spotifyTokenExpiry', expirationTime.toISOString());
        console.log('Access token stored successfully');

    } catch (error) {
        console.error('Error exchanging code for token:', error);
    }
};


export const refreshAccessToken = async () => {
    const storedRefreshToken = await AsyncStorage.getItem("spotifyRefreshToken");
    const client = generateClient();

    if (!storedRefreshToken) {
        console.error('Refresh token is missing.');
        return;
    }

    try {
        // custom mutation
        const response = await client.graphql({
            query: exchangeSpotifyCodeForToken,
            variables: {
                refreshToken: storedRefreshToken
            }
        });

        if (response.data.exchangeSpotifyCodeForToken.error) {
            throw new Error(response.data.exchangeSpotifyCodeForToken.error);
        }

        const { accessToken, refreshToken, expiresIn } = response.data.exchangeSpotifyCodeForToken;

        // Store the access token and other details in AsyncStorage
        await AsyncStorage.setItem('spotifyAccessToken', accessToken);
        await AsyncStorage.setItem('spotifyRefreshToken', refreshToken);
        const expirationTime = new Date(Date.now() + expiresIn * 1000 - 5 * 60 * 1000);
        await AsyncStorage.setItem('spotifyTokenExpiry', expirationTime.toISOString());
        console.log('New access token stored successfully');

    } catch (error) {
        console.error('Error exchanging code for token:', error);
    }
}