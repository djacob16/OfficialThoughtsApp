import { launchImageLibrary, ImageLibraryOptions } from "react-native-image-picker";
import { uploadData } from 'aws-amplify/storage';
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { updateUser } from "../src/graphql/mutations";

export const pickImage = async () => {
    const bucket = "thoughtsapp8fd738644ed04b61a716a9444c7fe4fb83473-staging";

    const fetchImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const options = {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000
    };

    const uploadFileToS3 = async (blob, key) => {
        try {
            const result = await uploadData({
                key: key,
                data: blob,
                options: {
                    accessLevel: undefined
                }
            }).result;
            //console.log('Succeeded: ', result);
            return result.key;
        } catch (error) {
            //console.log('Error : ', error);
        }
        return '';
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
            const key = `profilePictures/${Date.now()}-${imageData.name}`;
            const uploadedKey = await uploadFileToS3(imageData, key);
            const { userId } = await getCurrentUser();
            const s3URL = `https://${bucket}.s3.us-east-2.amazonaws.com/public/${uploadedKey}`
            const client = generateClient();
            try {
                const response = await client.graphql({
                    query: updateUser,
                    variables: {
                        input: {
                            id: userId,
                            photo: s3URL
                        }
                    }
                })
                console.log("new user:", response)
            } catch (err) {
                console.log(err);
            }
            console.log("result: ", result)
            console.log(s3URL)
            return s3URL;
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
};