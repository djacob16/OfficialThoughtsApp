import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import styles from './styles';

const DancingBars = () => {
    const animationValues = useRef([
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
    ]).current;

    useEffect(() => {
        const animateBars = () => {
            animationValues.forEach((animatedValue, index) => {
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(animatedValue, {
                            toValue: 1,
                            duration: 300,
                            delay: index * 150, // Add a delay for each bar
                            useNativeDriver: true,
                        }),
                        Animated.timing(animatedValue, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true,
                        }),
                    ])
                ).start();
            });
        };

        animateBars();
    }, [animationValues]);

    const barStyle = (animatedValue) => ({
        transform: [
            {
                scaleY: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2.5], // Adjust the scale here
                }),
            },
        ],
    });

    return (
        <View style={styles.container}>
            {animationValues.map((animatedValue, index) => (
                <Animated.View
                    key={index}
                    style={[styles.bar, barStyle(animatedValue)]}
                />
            ))}
        </View>
    );
};


export default DancingBars;
