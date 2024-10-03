import { useState, useEffect } from 'react';
import { Keyboard, Platform, Animated } from 'react-native';


export const useKeyboardHeight = () => {
    const [keyboardHeight] = useState(new Animated.Value(0));

    useEffect(() => {
        const showListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
            (e) => {
                Animated.timing(keyboardHeight, {
                    toValue: e.endCoordinates.height,
                    duration: 300, // Animation duration for smoother transition
                    useNativeDriver: false,
                }).start();
            }
        );
        const hideListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
            () => {
                Animated.timing(keyboardHeight, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
        );

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, [keyboardHeight]);

    return keyboardHeight;
};