import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

const CustomSpinner = () => (
    <View style={styles.container}>
        <ActivityIndicator size="auto" color="#ffffff" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CustomSpinner;
