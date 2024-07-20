import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { signOut } from "aws-amplify/auth";
import { useNavigation } from "@react-navigation/native";
import Video from 'react-native-video';
import bgVid from "../../assets/bgVid.mp4"
import LogoHeader from "../../components/LogoHeader";


const Home = () => {
    const navigation = useNavigation();

    const handleSignOut = async () => {
        await signOut();
        navigation.navigate("Signin");
    }

    return (
        <>
            <View style={styles.overLay}></View>
            <Video
                source={bgVid}
                style={styles.video}
                muted={true}
                repeat={true}
                resizeMode={'cover'}
                rate={0.5}
                ignoreSilentSwitch={'obey'}
                onError={(error) => console.log(error)}
            />
            <View style={{ position: "absolute", top: "10%", right: "20%" }}>
                <TouchableOpacity onPress={handleSignOut}>
                    <LogoHeader />
                </TouchableOpacity>
            </View>
        </>


    )
}

export default Home;