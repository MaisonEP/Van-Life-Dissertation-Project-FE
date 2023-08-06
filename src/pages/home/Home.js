import { TextInput, Surface, Stack, Avatar } from "@react-native-material/core";
import { StyleSheet } from "react-native";
import FeedCard from "../../components/FeedCard";
import { ScrollView, View, ImageBackground } from "react-native";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../../../LoginContext";

export default function Home({ navigation }) {
  const [allPosts, setAllPosts] = useState();
  const context = useContext(LoginContext);

  const postContent = [
    { publisherName: "Erl", publisherLocation: "Cardiff" },
    { publisherName: "Ev", publisherLocation: "The Jungle" },
    { publisherName: "Ev", publisherLocation: "The Jungle" },
  ];

  const image = {
    uri: "https://cdn.pixabay.com/photo/2020/01/22/15/50/illustration-4785614_1280.png",
  };

  useEffect(() => {
    if (context.refetchingPosts) {
      fetch("http://192.168.0.15:8080/posts")
        .then((response) => {
          return response.json();
        })
        .then((r) => {
          setAllPosts(r);
        })
        .catch((error) => {
          console.log("There was an error", error);
        })
        .finally(() => {
          context.setRefetchingPosts(false);
        });
    }
  }, [context?.refetchingPosts]);

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={postContainer.image}
    >
      <ScrollView>
        <Stack
          style={{ margin: 16 }}
          items="center"
          spacing={4}
          testID="HIIIIIIIIIIIIIIIIIIIIIIIIIIIII"
        >
          {allPosts?.reverse().map((postInfo, i) => {
            return (
              <View style={postContainer.mainContainer} key={i}>
                <FeedCard
                  publisherName={postInfo.user.username}
                  postTitle={postInfo.title}
                  postContent={postInfo.content}
                  navigation={navigation}
                  isLocation={postInfo.location}
                ></FeedCard>
              </View>
            );
          })}
        </Stack>
      </ScrollView>
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
