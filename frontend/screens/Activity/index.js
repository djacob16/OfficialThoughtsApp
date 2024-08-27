import React, { useState, useEffect, useRef } from "react";
import { Text, View, Image, TouchableOpacity, Animated, Dimensions, ScrollView } from "react-native";
import styles from "./styles";
import getActivity from "../../data/getActivity";
import { useSelector } from "react-redux";
import LogoHeader from "../../components/LogoHeader";
import { getLikesForThought, getCommentsForThought } from "../../data/getActivity";
import LikeItem from "../../components/LikeItem";

const Activity = () => {
    // navigator
    const windowWidth = Dimensions.get('window').width;
    const [title, setTitle] = useState("Notifications");
    const [titleId, setTitleId] = useState("1");
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const borderColorAnim = useRef(new Animated.Value(0)).current;

    // activity
    const [allActivity, setAllActivity] = useState([]);
    const [todayActivity, setTodayActivity] = useState([]);
    const [yesterdayActivity, setYesterdayActivity] = useState([]);
    const [lastWeekActivity, setLastWeekActivity] = useState([]);


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
    const { inactiveThoughts } = useSelector((state) => state.getInactiveThoughtsSlice);

    // load data
    useEffect(() => {
        const combinedThoughts = [...activeThoughts, ...inactiveThoughts];

        const fetchAllActivity = async () => {
            const activityLikes = await Promise.all(
                combinedThoughts.map(async (thought) => {
                    const likes = await getLikesForThought(thought.id);
                    return likes
                })
            );

            const activityComments = await Promise.all(
                combinedThoughts.map(async (thought) => {
                    const comments = await getCommentsForThought(thought.id)
                    return comments
                })
            )

            const combinedActivity = [...activityLikes.flat(), ...activityComments.flat()];
            const sortedActivity = combinedActivity.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

            const now = new Date();
            const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const yesterdayStart = new Date(todayStart);
            yesterdayStart.setDate(yesterdayStart.getDate() - 1);
            const lastWeekStart = new Date(todayStart);
            lastWeekStart.setDate(lastWeekStart.getDate() - 7);

            const todayTime = todayStart.getTime();
            const yesterdayTime = yesterdayStart.getTime();
            const lastWeekTime = lastWeekStart.getTime();

            const groupedActivity = {
                today: [],
                yesterday: [],
                lastWeek: []
            };

            for (const activity of sortedActivity) {
                const activityTime = new Date(activity.createdAt).getTime();

                if (activityTime >= todayTime) {
                    groupedActivity.today.push(activity);
                } else if (activityTime >= yesterdayTime) {
                    groupedActivity.yesterday.push(activity);
                } else if (activityTime >= lastWeekTime) {
                    groupedActivity.lastWeek.push(activity);
                } else {
                    break; // Activities are sorted, so we can stop once we're past last week
                }
            }

            setTodayActivity(groupedActivity.today);
            setYesterdayActivity(groupedActivity.yesterday);
            setLastWeekActivity(groupedActivity.lastWeek);
        }
        fetchAllActivity()
    }, [activeThoughts, inactiveThoughts])

    return (
        <View style={styles.container}>
            {/* <LogoHeader /> */}
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
                <ScrollView style={{ paddingTop: 20 }}>
                    <Text style={styles.timeHeader}>Today</Text>
                    {todayActivity.map((item, index) => {
                        if (item.__typename === "ThoughtLike") {
                            return (
                                <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                    <LikeItem item={item} />
                                </View>
                            )
                        } if (item.__typename === "Comment") {
                            return <Text key={index}>Comments</Text>;
                        } if (item.__typename === "Reply") {
                            return <Text key={index}>Replies</Text>;
                        }
                    })}
                    <Text style={styles.timeHeader}>Yesterday</Text>
                    {yesterdayActivity.map((item, index) => {
                        if (item.__typename === "ThoughtLike") {
                            return (
                                <LikeItem item={item} key={index} />
                            )
                        } if (item.__typename === "Comment") {
                            return <Text key={index}>Comments</Text>;
                        } if (item.__typename === "Reply") {
                            return <Text key={index}>Replies</Text>;
                        }
                    })}
                    <Text style={styles.timeHeader}>This last week</Text>
                    {lastWeekActivity.map((item, index) => {
                        if (item.__typename === "ThoughtLike") {
                            return (
                                <LikeItem item={item} key={index} />
                            )
                        } if (item.__typename === "Comment") {
                            return <Text key={index}>Comments</Text>;
                        } if (item.__typename === "Reply") {
                            return <Text key={index}>Replies</Text>;
                        }
                    })}
                </ScrollView>
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