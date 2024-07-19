import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import homeIcon from "../assets/homeIcon.png";
import homeFocused from "../assets/home-focused.png"
import Home from "../screens/Home";

const Tab = createBottomTabNavigator()

const HomeTabNavigator = () => {
    const route = useRoute()
    return (
        <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: "#211F1F", paddingVertical: 15 } }}>
            <Tab.Screen name={"Home"} component={Home} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, size }) => (<Image source={focused ? homeFocused : homeIcon} style={{ width: 28, height: 26 }} />)
            }} />
        </Tab.Navigator>
    )
}

export default HomeTabNavigator;