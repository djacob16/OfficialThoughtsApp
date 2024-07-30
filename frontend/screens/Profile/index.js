import styles from "./styles";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import background from "../../assets/profileBackground.png"
import { useSelector } from "react-redux";
import verifiedIcon from "../../assets/verifiedIcon.png"
import mappinGreen from "../../assets/mappinGreen.png"

const Profile = () => {
    const { user } = useSelector((state) => state.userSlice);
    const { entities: active } = useSelector((state) => state.getActiveThoughtsSlice);
    const { entities: inactive } = useSelector((state) => state.getInactiveThoughtsSlice);
    console.log(inactive)

    return (
        <View style={styles.backgroundContainer}>
            <Image source={background} style={styles.backgroundImage} />
            <ScrollView style={styles.container}>
                <Text style={styles.name}>{user.name}</Text>
                <View style={styles.verifiedContainer}>
                    <Image source={verifiedIcon} />
                    <Text style={styles.verified}>Verified User</Text>
                </View>
                <Text style={styles.description}>Just your average thought reader</Text>
                <View style={styles.profileData}>
                    <TouchableOpacity style={styles.data}>
                        <Text style={styles.number}>{active?.sortedThoughts.length + inactive?.sortedThoughts.length}</Text>
                        <Text style={styles.title}>Thoughts</Text>
                    </TouchableOpacity>
                    <View style={styles.data}>
                        <Text style={styles.number}>2000</Text>
                        <Text style={styles.title}>Reactions</Text>
                    </View>
                    <TouchableOpacity style={styles.dataLast}>
                        <View style={styles.parkedContainer}>
                            <Image source={mappinGreen} style={{ width: 18, height: 18 }} />
                            <Text style={styles.number}>{active.activeParked + inactive.inactiveParked}</Text>
                        </View>
                        <Text style={styles.titleParked}>Parked</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.latestThoughtContainer}>
                    <View style={styles.titleTimeContainer}>
                        <Text style={styles.latestThought}>Latest Thought</Text>
                        <Text style={styles.time}>1:32pm</Text>
                    </View>
                    <Text style={styles.thought}>Why is it 1000 degress</Text>
                </View>
            </ScrollView>
        </View>

    )
}

export default Profile