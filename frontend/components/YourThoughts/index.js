import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button } from 'react-native';
import styles from "./styles";
import heart from '../../assets/heartIcon.png';
import arrowDown from '../../assets/arrowDown.png';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';
import { generateClient } from 'aws-amplify/api';
import { listThoughts } from '../../src/graphql/queries';
import { getCurrentUser } from '@aws-amplify/auth';


const YourThoughts = () => {
    const client = generateClient();
    const [activeThoughts, setActiveThoughts] = useState();
    const [inactiveThoughts, setInactiveThoughts] = useState();


    const getActiveThoughtsByUserId = async () => {
        const { userId } = await getCurrentUser();
        try {
            const response = await client.graphql({
                query: listThoughts,
                variables: {
                    filter: {
                        authorID: { eq: userId },
                        and: {
                            active: { eq: true }
                        }
                    }
                }
            });
            const thoughtsList = response.data.listThoughts.items;
            setActiveThoughts(thoughtsList)
            console.log("jordan's query: ", thoughtsList)
        } catch (error) {
            console.log(error)
        }
    }

    const getInactiveThoughtsByUserId = async () => {
        const { userId } = await getCurrentUser();
        try {
            const response = await client.graphql({
                query: listThoughts,
                variables: {
                    filter: {
                        authorID: { eq: userId },
                        and: {
                            active: { eq: false }
                        }
                    }
                }
            });

            const thoughtsList = response.data.listThoughts.items;
            setInactiveThoughts(thoughtsList)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getActiveThoughtsByUserId();
        getInactiveThoughtsByUserId();
    }, [])

    return (
        <View>
        </View>
    );
}

export default YourThoughts;
