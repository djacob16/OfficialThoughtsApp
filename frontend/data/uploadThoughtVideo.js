import { launchImageLibrary } from "react-native-image-picker";

const uploadThoughtVideo = async () => {
    const options = {
        mediaType: "video",
        includeBase64: false,
        videoQuality: "high",
    };

    const fetchVideo = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const result = await launchImageLibrary(options);
    if (!result.didCancel && result.assets && result.assets[0].uri) {
        try {
            const videoPath = result.assets[0].uri;
            const videoExt = videoPath.split(".").pop();
            let video = await fetchVideo(videoPath);
            const videoData = new File([video], `video.${videoExt}`);
            const key = `thoughtvideos/${Date.now()}-${videoData.name}`;
            return { videoData, key, videoPath };
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    }
}

export default uploadThoughtVideo;