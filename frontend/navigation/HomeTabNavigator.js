import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import homeIcon from "../assets/homeIcon.png";
import homeFocused from "../assets/home-focused.png"
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import profileIcon from "../assets/profileIcon.png"
import profileIconFocused from "../assets/profileIcon-focused.png"
import { Colors } from "../constants/colors";

const Tab = createBottomTabNavigator()

const HomeTabNavigator = () => {
    const route = useRoute()
    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: Colors.backgroundColor, paddingVertical: 15 } }}>
            <Tab.Screen name={"Home"} component={Home} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? homeFocused : homeIcon} style={{ width: 28, height: 26 }} />)
            }} />
            <Tab.Screen name={"Profile"} component={Profile} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? profileIconFocused : profileIcon} style={{ width: 28, height: 30 }} />)
            }} />
        </Tab.Navigator>
    )
}

export default HomeTabNavigator;