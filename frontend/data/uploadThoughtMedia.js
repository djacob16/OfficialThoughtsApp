import { launchImageLibrary } from "react-native-image-picker";

export const uploadThoughtMedia = async (title) => {
    const options = {
        mediaType: title === "New thought" ? "mixed" : "photo",
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
        const asset = result.assets[0];

        // Check if the selected media meets the criteria
        if (asset.width > options.maxWidth || asset.height > options.maxHeight) {
            console.log("Selected media exceeds size limits.");
            return { error: "Selected media exceeds size limits." };
        }

        try {
            const mediaPath = asset.uri;
            const mediaExt = mediaPath.split(".").pop();
            let mediaFile = await fetchMedia(mediaPath);
            const mediaData = new File([mediaFile], `media.${mediaExt}`);

            const key = title === "New thought"
                ? `thoughtmedia/${Date.now()}-${mediaData.name}`
                : `profilePictures/${Date.now()}-${mediaData.name}`;

            return { mediaData, key, mediaPath };
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return null;
};
