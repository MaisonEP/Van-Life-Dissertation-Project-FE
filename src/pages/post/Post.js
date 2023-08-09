import { View, Text, TextInput, StyleSheet, Button, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Layout from "../../components/Layout";
// import Video from "react-native-video";
// import { ResizeMode, video } from "expo-av";

export default function Post({}) {
  const [image, setImage] = useState(null);
  const videoVar = React.useRef(null);
  const [video, setVideo] = React.useState({});
  const chooseMedia = async () => {
    try {
      const media = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(media);

      if (!media.canceled) {
        if (media.assets[0].type === "image") {
          setImage(media.assets[0].uri);
        } else {
          setVideo(media.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <View>
        <Button
          onPress={chooseMedia}
          title="Choose Image"
          style={createPost.chooseMediaButton}
        ></Button>
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        {/* {video && (
        <Video
        ref={videoVar}
        style={createPost.videoStyle}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )} */}
      </View>
    </Layout>
  );
}
const createPost = StyleSheet.create({
  textInput: {
    borderWidth: 1,
  },
  chooseMediaButton: {
    width: 10,
  },
  videoStyle: { position: "absolute" },
});
