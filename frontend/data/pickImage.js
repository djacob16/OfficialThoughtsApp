import { launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";
import { uploadData } from 'aws-amplify/storage';

const pickImage = async () => {
    const image = await launchImageLibrary({
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000
    });
    if (!image.didCancel && image.assets && image.assets[0].uri) {
        const response = await fetch(image.assets[0].uri);
        const blob = await response.blob();
        const fileName = image.assets[0].uri.split('/').pop();
        const imageResponse = { fileName, uri: image.assets[0].uri };
        return imageResponse;
    }
}

export default pickImage;
