import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, RefreshControl } from "react-native";
import { signOut } from "aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";
import LogoHeader from "../../components/LogoHeader";
import NearYou from "../../components/NearYou";
import YourThoughts from "../../components/YourThoughts/"
import styles from "./styles";
import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import NewThought from "../../components/NewThought";

const Home = () => {
    const navigation = useNavigation();

    // navigator
    const [title, setTitle] = useState("Your Thoughts");
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const [titleId, setTitleId] = useState("1");

    // user
    const [name, setName] = useState("");
    const [userId, setUserId] = useState("");


    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Signin");
    }

    const homeScreens = [
        {
            id: "1",
            title: "Near You"
        },
        {
            id: "2",
            title: "Your Thoughts"
        }
    ]

    const titleIdFunc = (id, title) => {
        setTitleId(id);
        setTitle(title);
        Animated.spring(highlightPosition, {
            toValue: id === "1" ? 0 : 1,
            useNativeDriver: true
        }).start();
    };

    const highlightStyle = {
        transform: [
            {
                translateX: highlightPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 179]
                })
            }
        ]
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await getCurrentUser();
                const attributes = await fetchUserAttributes();
                console.log("userInfo: ", user);
                setUserId(user?.userId);
                console.log("userAttributes: ", attributes);
                setName(attributes.name);
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [])

    return (
        <View style={styles.bigContainer}>
            <LogoHeader />
            <View style={styles.container}>
                <View style={styles.navigator}>
                    <Animated.View style={[styles.highlight, highlightStyle]} />
                    {homeScreens.map((data, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => titleIdFunc(data.id, data.title)}
                            style={styles.navigatorText}
                        >
                            <Text style={{ color: data.id == titleId ? "black" : "white" }}>
                                {data.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <NewThought name={name} userdId={userId} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {title === "Your Thoughts" && <YourThoughts name={name} userId={userId} />}
                    {title === "Near You" && <NearYou name={name} userId={userId} />}
                </ScrollView>
                <TouchableOpacity onPress={handleSignOut}>
                    <Text>Go back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home;