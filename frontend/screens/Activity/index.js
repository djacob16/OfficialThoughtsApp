import React, { useState, useEffect, useRef } from "react";
import { Text, View, Image, TouchableOpacity, Animated, Dimensions } from "react-native";
import styles from "./styles";
import getActivity from "../../data/getActivity";
import { useSelector } from "react-redux";

const Activity = () => {
    const windowWidth = Dimensions.get('window').width;
    const [title, setTitle] = useState("Notifications");
    const [titleId, setTitleId] = useState("1");
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const borderColorAnim = useRef(new Animated.Value(0)).current;

    // Navigator and animations
    const titleIdFunc = (id, title) => {
        setTitleId(id);
        setTitle(title);
        Animated.spring(highlightPosition, {
            toValue: id === "1" ? 0 : id === "2" ? 1 : 2,
            useNativeDriver: true
        }).start();
    };
    const highlightStyle = {
        transform: [
            {
                translateX: highlightPosition.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [
                        windowWidth * 0.02,
                        windowWidth * 0.35,
                        windowWidth * 0.68
                    ]
                })
            }
        ]
    };
    const activityCategories = [
        {
            id: "1",
            title: "Notifications"
        },
        {
            id: "2",
            title: "Your replies"
        },
        {
            id: "3",
            title: "Requests"
        }
    ];

    const { activeThoughts } = useSelector((state) => state.getActiveThoughtsSlice);

    useEffect(() => {
        const allActivity = async () => {
            try {
                const activityPromises = activeThoughts.map(async (activeThought) => {
                    const data = await getActivity(activeThought.thoughtID);
                    console.log(`all activity::`, data);
                    return { data };
                });

                const allActivityData = await Promise.all(activityPromises);
                console.log("All activity data:", allActivityData[0].data.items[0].userId);

                // You can do something with allActivityData here if needed
            } catch (error) {
                console.error("Error fetching activity:", error);
            }
        };

        allActivity();
    }, [activeThoughts]); // Add activeThoughts as a dependency if it's not constant



    return (
        <View style={styles.container}>
            <View style={styles.navigator}>
                <Animated.View style={[styles.highlight, highlightStyle]} />
                {activityCategories.map((data, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => titleIdFunc(data.id, data.title)}
                        style={styles.navigatorText}
                    >
                        <Text style={{ color: data.id === titleId ? "white" : "gray", fontSize: 15 }}>
                            {data.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            {title == "Notifications" &&
                <View>
                    <Text>Notifs here</Text>
                </View>
            }
            {title == "Your replies" &&
                <View>
                    <Text>Replies here</Text>
                </View>
            }
            {title == "Requests" &&
                <View>
                    <Text>Requests here</Text>
                </View>
            }
        </View>
    )
}

export default Activity