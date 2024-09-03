import React, { useState, useEffect, useRef } from "react";
import { Text, View, Image, TouchableOpacity, Animated, Dimensions, ScrollView } from "react-native";
import styles from "./styles";
import getActivity from "../../data/getActivity";
import { useSelector, useDispatch } from "react-redux";
import LogoHeader from "../../components/LogoHeader";
import { getLikesForThought, getCommentsForThought } from "../../data/getActivity";
import LikeItem from "../../components/LikeItem";
import { getNotifications } from "../../slices/getNotifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommentItem from "../../components/CommentItem";
import { getActiveThoughts } from "../../slices/getActiveThoughts";
import { getInactiveThoughts } from "../../slices/getInactiveThoughts";

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
    // dispatch
    const dispatch = useDispatch()
    const { notifications, loading } = useSelector((state) => state.getNotificationsSlice);
    const [newNotifs, setNewNotifs] = useState([])
    const [oldNotifs, setOldNotifs] = useState([])
    // timestamps
    const TODAY = new Date().toISOString().split('T')[0];
    const YESTERDAY = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
    const ONE_WEEK_AGO = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0];
    const isToday = (dateString) => dateString.startsWith(TODAY);
    const isYesterday = (dateString) => dateString.startsWith(YESTERDAY);
    const isLastWeek = (dateString) => {
        return dateString >= ONE_WEEK_AGO && dateString < YESTERDAY;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Wait for both active and inactive thoughts to be fetched
                await Promise.all([
                    dispatch(getActiveThoughts()).unwrap(),
                    dispatch(getInactiveThoughts()).unwrap(),
                    console.log("done")
                ]);

                // Once both are done, dispatch getNotifications
                dispatch(getNotifications());
            } catch (error) {
                console.error("Error fetching thoughts or notifications:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        console.log("Notifications from Redux:", notifications);
        console.log("Loading state:", loading);
    }, [notifications, loading]);



    // updated 
    useEffect(() => {
        const updateNotifications = async () => {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const sevenDaysAgoISO = sevenDaysAgo.toISOString();

            setNewNotifs(notifications);

            let storedNotifications = await AsyncStorage.getItem("storedNotifications")
            console.log("storedNotifications: ", storedNotifications)
            if (storedNotifications) {
                storedNotifications = JSON.parse(storedNotifications);
                const validNotifications = storedNotifications.filter(
                    notification => notification.createdAt >= sevenDaysAgoISO
                );
                setOldNotifs(storedNotifications)
                const updatedNotifications = [...notifications, ...validNotifications];
                await AsyncStorage.setItem("storedNotifications", JSON.stringify(updatedNotifications))
            } else {
                await AsyncStorage.setItem("storedNotifications", JSON.stringify(notifications))
            }
        }
        updateNotifications()
    }, [notifications])

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
        { id: "1", title: "Notifications" },
        { id: "2", title: "Your replies" },
        { id: "3", title: "Requests" }
    ];

    useEffect(() => {
        console.log("Notifications from Redux:", notifications);
        console.log("Loading state:", loading);
    }, [notifications, loading]);


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
            <View>
                {title == "Notifications" &&
                    <ScrollView>
                        <Text style={styles.timeHeader}>Today</Text>
                        {loading === "succeeded" && newNotifs.filter((notif) => isToday(notif.createdAt)).map((item, index) => {
                            if (item.__typename === "ThoughtLike") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <LikeItem item={item} newNotif={true} />
                                    </View>
                                )
                            } if (item.__typename === "Comment") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <CommentItem item={item} />
                                    </View>
                                )
                            } if (item.__typename === "Reply") {
                                return <Text key={index}>Replies</Text>;
                            }
                        })}
                        {loading === "succeeded" && oldNotifs.filter((notif) => isToday(notif.createdAt)).map((item, index) => {
                            if (item.__typename === "ThoughtLike" && isToday(item.createdAt)) {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <LikeItem item={item} new={false} />
                                    </View>
                                )
                            } if (item.__typename === "Comment") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <CommentItem item={item} />
                                    </View>
                                )
                            } if (item.__typename === "Reply") {
                                return <Text key={index}>Replies</Text>;
                            }
                        })}


                        <Text style={styles.timeHeader}>Yesterday</Text>
                        {loading === "succeeded" && newNotifs.filter((notif) => isYesterday(notif.createdAt)).map((item, index) => {
                            if (item.__typename === "ThoughtLike") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <LikeItem item={item} new={true} />
                                    </View>
                                )
                            } if (item.__typename === "Comment") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <CommentItem item={item} />
                                    </View>
                                )
                            } if (item.__typename === "Reply") {
                                return <Text key={index}>Replies</Text>;
                            }
                        })}
                        {loading === "succeeded" && oldNotifs.filter((notif) => isYesterday(notif.createdAt)).map((item, index) => {
                            if (item.__typename === "ThoughtLike") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <LikeItem item={item} new={false} />
                                    </View>
                                )
                            } if (item.__typename === "Comment") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <CommentItem item={item} />
                                    </View>
                                )
                            } if (item.__typename === "Reply") {
                                return <Text key={index}>Replies</Text>;
                            }
                        })}


                        <Text style={styles.timeHeader}>This last week</Text>
                        {loading === "succeeded" && newNotifs.filter((notif) => isLastWeek(notif.createdAt)).map((item, index) => {
                            if (item.__typename === "ThoughtLike") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <LikeItem item={item} new={false} />
                                    </View>
                                )
                            } if (item.__typename === "Comment") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <CommentItem item={item} />
                                    </View>
                                )
                            } if (item.__typename === "Reply") {
                                return <Text key={index}>Replies</Text>;
                            }
                        })}
                        {loading === "succeeded" && oldNotifs.filter((notif) => isLastWeek(notif.createdAt)).map((item, index) => {
                            if (item.__typename === "ThoughtLike") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <LikeItem item={item} new={false} />
                                    </View>
                                )
                            } if (item.__typename === "Comment") {
                                return (
                                    <View key={index} style={{ flexDirection: "column", gap: 25 }}>
                                        <CommentItem item={item} />
                                    </View>
                                )
                            } if (item.__typename === "Reply") {
                                return <Text key={index}>Replies</Text>;
                            }
                        })}
                        <View style={{ height: 100 }}></View>
                    </ScrollView>
                }
            </View>
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