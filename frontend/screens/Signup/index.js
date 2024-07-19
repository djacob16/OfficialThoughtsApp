import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles"

Amplify.configure(config)

const Signup = () => {


    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.buttonText}>Continue with Google</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signup;