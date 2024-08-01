import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import heart from '../../assets/heartIcon.png';
import * as Location from 'expo-location';
import styles from "./styles";
import getLocation from "../../data/getLocation";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../data/formatDate";
import heartIcon from "../../assets/heart.png";
import commentIcon from "../../assets/message.png";
import shareIcon from "../../assets/shareIcon.png";
import threeDots from "../../assets/threeDots.png"
import parkedIcon from "../../assets/mappinParked.png"
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import geohash from "ngeohash"
import { likeThought, checkLiked } from "../../data/likeThought";
import heartFillIcon from "../../assets/heart.fill.png";
import NearbyThought from "../../components/NearbyThought";

const NearYou = ({ hash }) => {
    const dispatch = useDispatch();
    const { nearbyThoughts, loading } = useSelector((state) => state.getNearbyThoughtsSlice);
    const [likedThoughts, setLikedThoughts] = useState([]);
    console.log("loading nearby thoughts: ", loading);

    // loads nearby thoughts
    useEffect(() => {
        if (hash) {
            dispatch(getNearbyThoughts(hash));
        }
    }, [hash]);

    useEffect(() => {
        const populateLikedThoughts = async () => {
            const likedThoughtsArray = [];
            for (const thought of nearbyThoughts) {
                const isLiked = await checkLiked(thought);
                if (isLiked) {
                    likedThoughtsArray.push({ [thought.id]: thought.likes - 1 });
                }
            }
            setLikedThoughts(likedThoughtsArray);
        };

        if (nearbyThoughts.length > 0) {
            populateLikedThoughts();
        }
    }, [nearbyThoughts]);


    const handleLike = (thought) => {
        setLikedThoughts((prevLikedThoughts) => {
            const existingThought = prevLikedThoughts.find(item => Object.keys(item)[0] === thought.id);

            if (existingThought) {
                likeThought(thought, false)
                return prevLikedThoughts.filter(item => Object.keys(item)[0] !== thought.id);


            } else {
                likeThought(thought, true);
                return [...prevLikedThoughts, { [thought.id]: thought.likes }];
            }
        });
    }

    return (
        <View>
            {loading === "succeeded" && nearbyThoughts?.map((thought, index) => (
                <NearbyThought key={index} thought={thought} />
            ))}
        </View>

    );
};

export default NearYou;
