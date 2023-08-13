import { View, StyleSheet, Image, Text } from "react-native";
import React, { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Layout from "../../components/Layout";
import {
  ActivityIndicator,
  Button,
  Snackbar,
  Stack,
  TextInput,
} from "@react-native-material/core";
import CampervanSurface from "../../components/CampervanSurface";
import colours from "../../styles/colours";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chooseMedia = async () => {
    try {
      const media = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 7],
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
      setError("Something went selecting your image. Please try again");
    }
  };

  const createMediaPost = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem("userId").catch((e) => {
      return e;
    });
    fetch("http://192.168.0.15:8080/posts/create", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        title: "",
        content: caption,
        isLocation: false,
        longitude: null,
        latitude: null,
        file: image.base64.slice(0, 5000000),
        file2: image.base64.slice(5000000),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        context.setRefetchingPosts(true);
        setImage(undefined);
        navigation.navigate("Home");
      })
      .catch((error) => {
        setError("Failed to create post. Please try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <>
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
              title={
                loading ? (
                  <ActivityIndicator
                    size="large"
                    color={colours.darkSlateGrey}
                  />
                ) : (
                  "Post"
                )
              }
              style={createPost.chooseMediaButton}
              disabled={!image || loading}
              color={colours.darkSlateGrey}
              onPress={() => createMediaPost()}
            />
          </CampervanSurface>
        </Stack>
        {error ? (
          <Snackbar
            message={error}
            style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
            action={
              <Button
                variant="text"
                title="Dismiss"
                color={colours.grassGreen}
                compact
                onPress={() => setError("")}
              />
            }
          />
        ) : (
          <></>
        )}
      </>
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
