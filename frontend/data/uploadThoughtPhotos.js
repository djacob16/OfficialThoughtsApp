import { launchImageLibrary } from "react-native-image-picker";

const uploadThoughtPhotos = async () => {
    const options = {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
    };

    // Fetch the image from the uri
    const fetchImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const result = await launchImageLibrary(options);
    if (!result.didCancel && result.assets && result.assets[0].uri) {
        try {
            // Upload the file to S3 and retrieve the URL
            const imagePath = result.assets[0].uri;
            const imageExt = imagePath.split(".").pop();
            let picture = await fetchImage(imagePath);
            const imageData = new File([picture], `photo.${imageExt}`);
            // Key is abritrary, but should be unique
            const key = `thoughtphotos/${Date.now()}-${imageData.name}`;
            return { imageData, key, imagePath }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
}

export default uploadThoughtPhotos;