import React from "react";
import { View, Text, Image } from "react-native";
import styles from './styles';
import logo from '../../assets/logo.png';

const logoHeader = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo}></Image>
        </View>
    )
}

export default logoHeader;