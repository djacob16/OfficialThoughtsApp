import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabNavigator from "./HomeTabNavigator";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import Verify from "../screens/Verify";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import { useDispatch } from "react-redux";
import { getOneUser } from "../slices/getOneUser";
import onThought from "../subscriptions/subscribeToNewThought";
import onEditThought from "../subscriptions/subscribeToEditThought";
import EditThought from "../components/EditThought";
import onRemoveThought from "../subscriptions/subscribeToDeleteThought";
const Stack = createNativeStackNavigator();

const Router = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        onThought(dispatch)
        onEditThought(dispatch)
        onRemoveThought(dispatch)

        dispatch(getOneUser())
    }, [dispatch])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Signin"} component={Signin} options={{ headerShown: false }} />
                <Stack.Screen name={"Signup"} component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name={"Verify"} component={Verify} options={{ headerShown: false }} />
                <Stack.Screen name={"ForgotPassword"} component={ForgotPassword} options={{ headerShown: false }} />
                <Stack.Screen name={"ResetPassword"} component={ResetPassword} options={{ headerShown: false }} />
                <Stack.Screen name={"Main"} component={HomeTabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name={"EditThought"} component={EditThought} options={{ presentation: 'modal', headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router;
