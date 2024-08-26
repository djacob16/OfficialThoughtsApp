import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import fetch from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_THOUGHTSAPP_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const { Sha256 } = crypto;

const SPOTIFY_CLIENT_ID = "71e9447c39c94c559d7949f70136da52";
const SPOTIFY_CLIENT_SECRET = "661dd876b4d5407baaa924fc984531e7";
const REDIRECT_URI = 'thoughtsapp://callback';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
    console.log("EVENT:", JSON.stringify(event, null, 2));

    if (!event.code && !event.refreshToken) {
        console.error("Missing 'code' or 'refreshToken' in event");
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Missing 'code' or 'refreshToken' in event"
            })
        };
    }

    const { code, refreshToken } = event;

    console.log("Extracted code:", code);
    console.log("Extracted token:", refreshToken);

    // Spotify token endpoint
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';

    try {
        const body = new URLSearchParams({
            client_id: SPOTIFY_CLIENT_ID,
            client_secret: SPOTIFY_CLIENT_SECRET,
        });

        if (refreshToken) {
            body.append('grant_type', 'refresh_token');
            body.append('refresh_token', refreshToken);
        } else {
            body.append('grant_type', 'authorization_code');
            body.append('code', code);
            body.append('redirect_uri', REDIRECT_URI);
        }

        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Spotify Error:", data.error_description || 'Failed to exchange token');
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: data.error_description || 'Failed to exchange token'
                })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                accessToken: data.access_token,
                refreshToken: data.refresh_token || refreshToken,
                expiresIn: data.expires_in,
            })
        };
    } catch (error) {
        console.error("Exception Error:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            })
        };
    }
};
