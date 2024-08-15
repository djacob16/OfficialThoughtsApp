import { StatusBar } from 'expo-status-bar';
import { View } from "react-native";
import Router from './navigation/Router';
import Toast from 'react-native-toast-message';
import { Amplify } from 'aws-amplify';
import { config } from "../frontend/src/amplifyconfiguration.json"
Amplify.configure(config);
import { Provider } from 'react-redux';
import { store } from './store/store'

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" />
        <Router />
        <Toast />
      </Provider>
    </>
  );
}
