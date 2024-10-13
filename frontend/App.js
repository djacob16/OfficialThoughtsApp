import React, { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Dimensions, Text } from "react-native";
import Router from './navigation/Router';
import Toast from 'react-native-toast-message';
import { Amplify } from 'aws-amplify';
import config from './src/amplifyconfiguration.json';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Audio } from 'expo-av';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from "./constants/colors";

Amplify.configure(config);

export default function App() {

  useEffect(() => {
    const setupAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });
    };

    setupAudio();
  }, []);

  const { height, width } = Dimensions.get('window');

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <StatusBar style="light" />
        <Router />
        <Toast />
      </Provider>
      {/* <View style={[styles.loadingContainer, { top: height / 2 - 25, left: width / 2 - 50 }]}>
        <ActivityIndicator size={"medium"} />
      </View> */}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  loadingContainer: {
    backgroundColor: Colors.lightGray,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    position: "absolute"
  }
});
