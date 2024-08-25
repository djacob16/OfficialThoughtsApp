import React, { useEffect, useRef } from 'react';
import { Animated, View, Easing } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { Colors } from '../constants/colors';

const CircularProgress = ({ size, strokeWidth, duration, isPlaying }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, 0],
    });

    useEffect(() => {
        if (isPlaying) {
            animation = Animated.timing(animatedValue, {
                toValue: 1,
                duration: duration,
                useNativeDriver: false, // Use false for SVG animations
                easing: Easing.linear,
            });
            animation.start();
        } else {
            animation?.stop(); // Stop the animation if not playing
        }

        return () => {
            animation?.stop(); // Cleanup on unmount or when stopping
        };
    }, [isPlaying, animatedValue, duration]);



    return (
        <View style={{ width: size, height: size }}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <Circle
                    stroke={Colors.lightGray}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    {...{ strokeWidth }}
                />
                <AnimatedCircle
                    stroke={Colors.whiteFont}
                    fill="transparent"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    {...{ strokeWidth }}
                />
                {isPlaying && (
                    <Rect
                        x={size / 2 - 2.5}
                        y={size / 2 - 2.5}
                        width={5}
                        height={5}
                        fill={Colors.whiteFont}
                    />
                )}
            </Svg>
        </View>
    );
};

export default CircularProgress;
