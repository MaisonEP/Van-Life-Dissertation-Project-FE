import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Layout from "../../components/Layout";
import {
  ActivityIndicator,
  Button,
  Stack,
  TextInput,
  Avatar,
} from "@react-native-material/core";
import CampervanSurface from "../../components/CampervanSurface";
import colours from "../../styles/colours";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginContext from "../../../LoginContext";

export default function Profile({ navigation }) {
  const [image, setImage] = useState(null);
  const videoVar = React.useRef(null);
  const [video, setVideo] = React.useState({});
  const [caption, setCaption] = useState("");
  const context = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

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
      console.log(error);
    }
  };

  const saveProfile = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem("userId").catch((e) => {
      return e;
    });

    fetch("http://192.168.0.15:8080/accountdetails/profile", {
      method: "PATCH",
      body: JSON.stringify({
        userId: userId,
        file: image ? image.base64.slice(0, 5000000) : null,
        file2: image ? image.base64.slice(5000000) : null,
        bio: caption,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setUser({ image: image.base64 });
        setImage(undefined);
        context.setRefetchingPosts(true);
      })
      .catch((error) => {
        console.log("There was an error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const callGetUser = async () => {
      const userId = await AsyncStorage.getItem("userId").catch((e) => {
        return e;
      });
      fetch(`http://192.168.0.15:8080/accountdetails/allusers/${userId}`, {
        method: "GET",
      })
        .then((r) => {
          return r.json();
        })
        .then((r) => {
          setUser(r);
        })
        .catch((error) => {
          console.log("There was an error", error);
        });
    };
    callGetUser();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("loggedIn");
    context.setLoggedIn(false);
  };

  return (
    <Layout>
      <Stack fill center spacing={4}>
        <CampervanSurface>
          {!user ? (
            <View
              style={{
                minHeight: 400,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color={colours.darkSlateGrey} />
            </View>
          ) : (
            <>
              <TouchableOpacity
                title="button"
                onPress={chooseMedia}
                style={{ marginBottom: 20, position: "relative" }}
              >
                <Avatar
                  image={
                    image ?? user?.image
                      ? {
                          uri:
                            image?.uri ?? `data:image/jpg;base64,${user.image}`,
                        }
                      : undefined
                  }
                  icon={(props) => <Icon name="account" {...props} />}
                  size={300}
                  style={{
                    borderColor: colours.darkSlateGrey,
                    // borderWidth: 10,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    left: "20%",
                    transform: [{ translateX: -20 }],
                    backgroundColor: colours.darkSlateGrey,
                    width: 40,
                    height: 40,
                    borderRadius: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="pencil"
                    size={30}
                    style={{
                      color: colours.white,
                    }}
                  />
                </View>
              </TouchableOpacity>

              <TextInput
                blurOnSubmit
                placeholder="Bio (Optional)"
                variant="outlined"
                style={{ ...createPost.input, marginBottom: 10 }}
                onChangeText={(text) => {
                  setCaption(text);
                }}
                value={caption || user?.bio}
              />
              {image ? (
                <>
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
              ) : (
                <></>
              )}
              {image || caption ? (
                <Button
                  title={
                    loading ? (
                      <ActivityIndicator
                        size="large"
                        color={colours.darkSlateGrey}
                      />
                    ) : (
                      "Save"
                    )
                  }
                  style={createPost.chooseMediaButton}
                  disabled={(!image && !caption) || loading}
                  color={colours.darkSlateGrey}
                  onPress={() => saveProfile()}
                />
              ) : (
                <></>
              )}
            </>
          )}
          <Button
            title="Log out"
            color={colours.darkSlateGrey}
            onPress={() => {
              logout();
            }}
            style={createPost.input}
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
