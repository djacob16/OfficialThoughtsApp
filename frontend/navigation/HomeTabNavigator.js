import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import homeIcon from "../assets/homeIcon.png";
import homeFocused from "../assets/home-focused.png"
import Home from "../screens/Home";
import Account from "../screens/Account";
import profileIcon from "../assets/profileIcon.png"
import profileIconFocused from "../assets/profileIcon-focused.png"
import { Colors } from "../constants/colors";
import Search from "../screens/Search";
import searchIcon from "../assets/search.png"
import searchIconFocused from "../assets/searchFocused.png"
import activityIcon from "../assets/activityIcon.png"

const Tab = createBottomTabNavigator()

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: Colors.backgroundColor, paddingVertical: 15 } }}>
            <Tab.Screen name={"Home"} component={Home} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? homeFocused : homeIcon} style={{ width: 28, height: 26 }} />)
            }} />
            <Tab.Screen name={"Search"} component={Search} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? searchIconFocused : searchIcon} style={{ width: 48, height: 48 }} />)
            }} />
            {/* <Tab.Screen name={"Activity"} component={Search} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? activityIcon : activityIcon} style={{ width: 48, height: 48 }} />)
            }} /> */}
            <Tab.Screen name={"Account"} component={Account} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? profileIconFocused : profileIcon} style={{ width: 28, height: 30 }} />)
            }} />
        </Tab.Navigator>
    )
}

export default HomeTabNavigator;