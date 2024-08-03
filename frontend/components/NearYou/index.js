import React, { useState, useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getNearbyThoughts } from "../../slices/getNearbyThoughts";
import NearbyThought from "../../components/NearbyThought";
import { Colors } from "../../constants/colors";

const NearYou = ({ hash }) => {
    const dispatch = useDispatch();
    const { nearbyThoughts, loading } = useSelector((state) => state.getNearbyThoughtsSlice);

    // loads nearby thoughts
    useEffect(() => {
        if (hash) {
            dispatch(getNearbyThoughts(hash));
        }
    }, [hash]);

    return (
        <View style={{ flex: 1 }}>
            {loading === "succeeded" && nearbyThoughts?.map((thought, index) => (
                <View key={index} style={{
                    borderBottomWidth: .5,
                    borderBottomColor: Colors.lightGray,
                    marginBottom: 12
                }}>
                    <NearbyThought thought={thought} />
                </View>
            ))}
        </View>
    );
};

export default NearYou;
