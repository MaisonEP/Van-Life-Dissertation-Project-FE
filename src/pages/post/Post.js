import { View, StyleSheet, Image, Text } from "react-native";
import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Layout from "../../components/Layout";
import { Button, Stack, TextInput } from "@react-native-material/core";
import CampervanSurface from "../../components/CampervanSurface";
import colours from "../../styles/colours";
// import Video from "react-native-video";
// import { ResizeMode, video } from "expo-av";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginContext from "../../../LoginContext";
import { decode, encode } from "base-64";

export default function Post({ navigation }) {
  const [image, setImage] = useState(null);
  const videoVar = React.useRef(null);
  const [video, setVideo] = React.useState({});
  const [caption, setCaption] = useState("");
  const context = useContext(LoginContext);

  const chooseMedia = async () => {
    try {
      const media = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!media.canceled) {
        if (media.assets[0].type === "image") {
          setImage(media.assets[0]);
        } else {
          setVideo(media.assets[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createMediaPost = async () => {
    const userId = await AsyncStorage.getItem("userId").catch((e) => {
      return e;
    });

    fetch("http://192.168.0.15:8080/posts/create", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        title: "selectedCategory",
        content: "con tent",
        isLocation: false,
        longitude: null,
        latitude: null,
        file: JSON.stringify({ base64: image.base64 }),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        context.setRefetchingPosts(true);
        // navigation.navigate("HomeWrapper");
        console.log("---");
        console.log("navigate");
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  };

  return (
    <Layout>
      <Stack fill center spacing={4}>
        <CampervanSurface>
          <Button
            onPress={chooseMedia}
            title="Choose Image"
            style={createPost.chooseMediaButton}
            color={colours.darkSlateGrey}
          ></Button>
          {image && (
            <>
              <Image
                source={{ uri: image.uri }}
                style={{ width: 200, height: 200, marginBottom: 20 }}
              />
              <Button
                title="Remove image"
                style={createPost.chooseMediaButton}
                color={colours.grassGreen}
                trailing={() => <Icon name="close-box-outline" size={20} />}
                onPress={() => {
                  setImage(undefined);
                }}
              />
            </>
          )}

          <TextInput
            blurOnSubmit
            placeholder="Caption (Optional)"
            variant="outlined"
            style={{ ...createPost.input, marginBottom: 10 }}
            onChangeText={(text) => {
              setCaption(text);
            }}
          />
          <Button
            title="Post"
            style={createPost.chooseMediaButton}
            disabled={!image}
            color={colours.darkSlateGrey}
            onPress={() => createMediaPost()}
          />
        </CampervanSurface>
      </Stack>
    </Layout>
  );
}
const createPost = StyleSheet.create({
  textInput: {
    borderWidth: 1,
  },
  input: {
    width: "100%",
  },
  chooseMediaButton: {
    width: "100%",
    marginBottom: 20,
  },
  videoStyle: { position: "absolute" },
});
