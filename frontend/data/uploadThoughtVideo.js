import { launchImageLibrary } from 'react-native-image-picker';

const uploadThoughtVideo = async () => {
    const options = {
        mediaType: 'video',
    };

    const result = await launchImageLibrary(options);
    if (!result.didCancel && result.assets && result.assets[0].uri) {
        try {
            const videoPath = result.assets[0].uri;
        } catch (error) {
            console.log(error)
        }
    }
}

export default uploadThoughtVideo;