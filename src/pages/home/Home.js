import {
  TextInput,
  Surface,
  Stack,
  Avatar,
  ActivityIndicator,
  Snackbar,
  Button,
} from "@react-native-material/core";
import { RefreshControl, StyleSheet, Text } from "react-native";
import FeedCard from "../../components/FeedCard";
import { ScrollView, View, ImageBackground } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import LoginContext from "../../../LoginContext";
import colours from "../../styles/colours";
import CampervanSurface from "../../components/CampervanSurface";
import { backEndEndpoint } from "../../assets/endpoint";

export default function Home({ navigation }) {
  const [allPosts, setAllPosts] = useState();
  const context = useContext(LoginContext);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const image = {
    uri: "https://cdn.pixabay.com/photo/2020/01/22/15/50/illustration-4785614_1280.png",
  };
  const fetchPosts = () => {
    fetch(backEndEndpoint.uri + "/posts")
      .then((response) => {
        return response.json();
      })
      .then((r) => {
        setAllPosts(r);
      })
      .catch((error) => {
        console.log("There was an error", error);
        setError("Failed to retrieve posts. Please try again");
      })
      .finally(() => {
        context.setRefetchingPosts(false);
      });
  };

  useEffect(() => {
    if (context.refetchingPosts) {
      fetchPosts();
    }
  }, [context?.refetchingPosts]);

  useEffect(() => {
    context.setRefetchingPosts(true);
  }, []);

  const onRefresh = useCallback(() => {
    context.setRefetchingPosts(true);
  }, []);

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={postContainer.image}
    >
      <>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={context?.refetchingPosts}
              onRefresh={onRefresh}
            />
          }
        >
          <Stack style={{ margin: 16 }} items="center" spacing={4}>
            {allPosts?.length > 0 ? (
              [...allPosts].reverse().map((postInfo, i) => {
                return (
                  <View style={postContainer.mainContainer} key={i}>
                    <FeedCard
                      publisherName={postInfo.user.username}
                      postTitle={postInfo.title}
                      postContent={postInfo.content}
                      navigation={navigation}
                      isLocation={postInfo.location}
                      location={{
                        latitude: postInfo.latitude,
                        longitude: postInfo.longitude,
                      }}
                      image={postInfo?.image}
                      profileImage={postInfo.user?.image}
                      postId={postInfo.postId}
                    ></FeedCard>
                  </View>
                );
              })
            ) : (
              <CampervanSurface>
                <Text>You have no posts</Text>
              </CampervanSurface>
            )}
          </Stack>
        </ScrollView>
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
    </ImageBackground>
  );
}
const postContainer = StyleSheet.create({
  mainContainer: {
    display: "flex",
    width: "100%",
    paddingBottom: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
