import { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles"
import { useRoute } from "@react-navigation/native";
import SignupHeader from "../../components/SignupHeader";
import manAndLock from "../../assets/verfityArt.png";
import NextButton from "../../components/NextButton";

const PreVerify = () => {
    const route = useRoute()

    const { email: email, password: password, name: name } = route.params;

    return (
        <View style={styles.container}>
            <SignupHeader title={""} />
            <Text style={styles.title}>Let's verify your identity</Text>
            <Image source={manAndLock} style={styles.art} />
            <Text style={styles.subTitle}>We need to verify your identity in order to keep your account secure</Text>
            <NextButton title="Verify" name={name} email={email} password={password} />
        </View>
    )
}

export default PreVerify;