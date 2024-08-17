import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabNavigator from "./HomeTabNavigator";
import Signin from "../screens/Signin";
import CommentForum from "../modals/CommentForum";
import ThoughtForum from "../screens/ThoughtForum"
import Signup from "../screens/Signup";
import Verify from "../screens/Verify";
import Profile from "../screens/Profile";
import AllowLocation from "../screens/AllowLocation";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import { useDispatch } from "react-redux";
import { getOneUser } from "../slices/getOneUser";
import onThought from "../subscriptions/subscribeToNewThought";
import onEditThought from "../subscriptions/subscribeToEditThought";
import EditThought from "../modals/EditThought";
import onRemoveThought from "../subscriptions/subscribeToDeleteThought";
import onUpdateUser from "../subscriptions/subscribeToUser";
import Search from "../screens/Search";


const Stack = createNativeStackNavigator();

const Router = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        onThought(dispatch)
        onEditThought(dispatch)
        onRemoveThought(dispatch)
        onUpdateUser(dispatch)
        dispatch(getOneUser())
    }, [dispatch])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Signin"} component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name={"Signup"} component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name={"Verify"} component={Verify} options={{ headerShown: false }} />
                <Stack.Screen name={"AllowLocation"} component={AllowLocation} options={{ headerShown: false }} />
                <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} options={{ headerShown: false }} />
                <Stack.Screen name={"ResetPassword"} component={ResetPassword} options={{ headerShown: false }} />
                <Stack.Screen name={"Main"} component={HomeTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name={"EditThought"} component={EditThought} options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name={"CommentForum"} component={CommentForum} options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name={"ThoughtForum"} component={ThoughtForum} options={{ headerShown: false }} />
                <Stack.Screen name={"Profile"} component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name={"Search"} component={Search} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router;
