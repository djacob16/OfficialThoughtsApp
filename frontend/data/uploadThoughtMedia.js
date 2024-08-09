import { launchImageLibrary } from "react-native-image-picker";

export const uploadThoughtMedia = async () => {
    const options = {
        mediaType: "mixed",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
    };

    // Fetch the media from the uri
    const fetchMedia = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const result = await launchImageLibrary(options);
    if (!result.didCancel && result.assets && result.assets[0].uri) {
        try {
            const mediaPath = result.assets[0].uri;
            const mediaExt = mediaPath.split(".").pop();
            let mediaFile = await fetchMedia(mediaPath);
            const mediaData = new File([mediaFile], `media.${mediaExt}`);
            // Key is arbitrary but should be unique
            const key = `thoughtmedia/${Date.now()}-${mediaData.name}`;
            return { mediaData, key, mediaPath }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
}
