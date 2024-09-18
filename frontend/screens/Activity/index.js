import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, View, Image, TouchableOpacity, Animated, Dimensions, ScrollView, RefreshControl } from "react-native";
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
import { getUsersReplies } from "../../data/getActivity";
import onCreateThoughtLike from "../../subscriptions/subscribeToNewLike";
import { getUserReplies } from "../../slices/getUserReplies";
import ReplyItem from "../../components/ReplyItem";
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { useNavigation } from "@react-navigation/native";

const Activity = () => {
    // navigator
    const windowWidth = Dimensions.get('window').width;
    const [title, setTitle] = useState("Notifications");
    const [titleId, setTitleId] = useState("1");
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const borderColorAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()
    // activity
    const [allActivity, setAllActivity] = useState([]);
    const [todayActivity, setTodayActivity] = useState([]);
    const [yesterdayActivity, setYesterdayActivity] = useState([]);
    const [lastWeekActivity, setLastWeekActivity] = useState([]);
    // dispatch
    const dispatch = useDispatch()
    const { notifications, loading: loadingNotifs } = useSelector((state) => state.getNotificationsSlice);
    const { userReplies, loading: loadingReplies } = useSelector((state) => state.getUserRepliesSlice)
    const [newNotifs, setNewNotifs] = useState([])
    const [oldNotifs, setOldNotifs] = useState([])
    const [replies, setReplies] = useState([])
    // timestamps
    const TODAY = new Date().toISOString().split('T')[0];
    const YESTERDAY = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
    const ONE_WEEK_AGO = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0];
    const isToday = (dateString) => dateString.startsWith(TODAY);
    const isYesterday = (dateString) => dateString.startsWith(YESTERDAY);
    const isLastWeek = (dateString) => {
        return dateString >= ONE_WEEK_AGO && dateString < YESTERDAY;
    };
    //refresh
    const [refreshing, setRefreshing] = useState(false);

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
                dispatch(getUserReplies())
            } catch (error) {
                console.error("Error fetching thoughts or notifications:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        // onCreateThoughtLike(dispatch)
        console.log("Notifications from Redux:", notifications);
        console.log("Loading state:", loadingReplies);
    }, [notifications, loadingReplies]);



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

        const updateReplies = async () => {
            let storedReplies = await AsyncStorage.getItem("storedReplies");
            console.log("Stored replies: ", storedReplies);

            if (storedReplies) {
                storedReplies = JSON.parse(storedReplies); // Ensure it's parsed
                setReplies([...userReplies, ...storedReplies]); // Merge replies properly
                const updatedReplies = [...userReplies, ...storedReplies];
                await AsyncStorage.setItem("storedReplies", JSON.stringify(updatedReplies))
            } else {
                await AsyncStorage.setItem("storedReplies", JSON.stringify(userReplies)); // Save new replies
                setReplies(userReplies);
            }
        };

        // updateReplies()
        updateNotifications()
    }, [notifications, userReplies])

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
        console.log("Loading state:", loadingNotifs);
    }, [notifications, loadingNotifs]);

    const onRefresh = useCallback(async (slice) => {
        if (slice == "notifications") {
            dispatch(getNotifications());
        } else {
            dispatch(getUserReplies())
        }
    }, []);

    const openThoughtForum = (item) => {
        let thoughtId
        if (item.__typename == "Comment") {
            thoughtId = item?.thought?.id
            navigation.navigate("ThoughtForum", { id: thoughtId })
        } else {
            thoughtId = item?.comment?.thought?.id
            navigation.navigate("ThoughtForum", { id: thoughtId })
        }
    }

    const renderRepliesSection = (header, filterFunc) => {
        const filteredReplies = replies.filter(filterFunc);
        if (loadingReplies === "succeeded" && filteredReplies.length > 0) {
            return (
                <>
                    <Text style={styles.timeHeader}>{header}</Text>
                    {filteredReplies.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={{ flexDirection: "column", gap: 25 }}
                            onPress={() => openThoughtForum(item)}
                        >
                            <ReplyItem item={item} />
                        </TouchableOpacity>
                    ))}
                </>
            );
        }
        return null;
    };


    return (
        <View style={styles.container}>
            {/* <LogoHeader /> */}
            {/* <View style={styles.navigator}>
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
            </View> */}
            <Text style={{ color: "white", paddingHorizontal: 16, fontSize: 24, fontWeight: "600", paddingBottom: 10, marginTop: -10 }}>Notifications</Text>
            <View>
                {title == "Notifications" &&
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => onRefresh("notifications")}
                                tintColor="#ffffff"
                                colors={["#1E1E1E"]}
                            />
                        }>
                        {loadingNotifs === "loading" && (
                            Array.from({ length: 6 }).map((_, index) => (
                                <View key={index} style={styles.contentLoaderContainer}>
                                    <ContentLoader
                                        height={75}
                                        speed={1}
                                        backgroundColor={'#333'}
                                        foregroundColor={'#211F1F'}
                                        viewBox="0 0 380 70"
                                    >
                                        <Circle cx="30" cy="30" r="30" />
                                        <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                                        <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                                    </ContentLoader>
                                </View>
                            ))
                        )}
                        {loadingNotifs === "failed" && <Text style={styles.errorText}>Failed to load replies, try again</Text>}
                        {(newNotifs.filter((notif) => isToday(notif.createdAt)).length > 0 || oldNotifs.filter((notif) => isToday(notif.createdAt)).length > 0) && loadingNotifs === "succeeded" && <Text style={styles.timeHeader}>Today</Text>}
                        {loadingNotifs === "succeeded" && newNotifs.filter((notif) => isToday(notif.createdAt)).map((item, index) => {
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
                        {loadingNotifs === "succeeded" && oldNotifs.filter((notif) => isToday(notif.createdAt)).map((item, index) => {
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


                        {(newNotifs.filter((notif) => isYesterday(notif.createdAt)).length > 0 || oldNotifs.filter((notif) => isYesterday(notif.createdAt)).length > 0) && loadingNotifs === "succeeded" && <Text style={styles.timeHeader}>Yesterday</Text>}
                        {loadingNotifs === "succeeded" && newNotifs.filter((notif) => isYesterday(notif.createdAt)).map((item, index) => {
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
                        {loadingNotifs === "succeeded" && oldNotifs.filter((notif) => isYesterday(notif.createdAt)).map((item, index) => {
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


                        {(newNotifs.filter((notif) => isLastWeek(notif.createdAt)).length > 0 || oldNotifs.filter((notif) => isLastWeek(notif.createdAt)).length > 0) && loadingNotifs === "succeeded" && <Text style={styles.timeHeader}>This last week</Text>}
                        {loadingNotifs === "succeeded" && newNotifs.filter((notif) => isLastWeek(notif.createdAt)).map((item, index) => {
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
                        {loadingNotifs === "succeeded" && oldNotifs.filter((notif) => isLastWeek(notif.createdAt)).map((item, index) => {
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

            {
                title == "Your replies" &&
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => onRefresh("replies")}
                            tintColor="#ffffff"
                            colors={["#1E1E1E"]}
                        />
                    }
                >
                    {loadingReplies === "loading" && (
                        Array.from({ length: 6 }).map((_, index) => (
                            <View key={index} style={styles.contentLoaderContainer}>
                                <ContentLoader
                                    height={75}
                                    speed={1}
                                    backgroundColor={'#333'}
                                    foregroundColor={'#211F1F'}
                                    viewBox="0 0 380 70"
                                >
                                    <Circle cx="30" cy="30" r="30" />
                                    <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                                    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                                </ContentLoader>
                            </View>
                        ))
                    )}
                    {loadingReplies === "failed" && <Text style={styles.errorText}>Failed to load replies, try again</Text>}

                    {renderRepliesSection("Today", (reply) => isToday(reply.createdAt))}
                    {renderRepliesSection("Yesterday", (reply) => isYesterday(reply.createdAt))}
                    {renderRepliesSection("Last 7 days", (reply) => isLastWeek(reply.createdAt))}

                    {loadingReplies === "succeeded" && replies.length === 0 && (
                        <Text style={styles.noRepliesText}>No replies yet! Reply to thoughts near you to see your replies listed here</Text>
                    )}
                    <View style={{ height: 100 }}></View>
                </ScrollView>
            }
            {
                title == "Requests" &&
                <View>
                    <Text>Requests here</Text>
                </View>
            }
        </View >
    )
}

export default Activity