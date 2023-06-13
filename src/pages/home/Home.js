import { TextInput, Surface, Stack, Avatar } from "@react-native-material/core";
import { StyleSheet } from "react-native";
import FeedCard from "../../components/FeedCard";
import { ScrollView, View, ImageBackground } from "react-native";

export default function Home({ navigation }) {
  const postContent = [
    { publisherName: "Erl", publisherLocation: "Cardiff" },
    { publisherName: "Ev", publisherLocation: "The Jungle" },
    { publisherName: "Ev", publisherLocation: "The Jungle" },
  ];

  const image = {
    uri: "https://cdn.pixabay.com/photo/2020/01/22/15/50/illustration-4785614_1280.png",
  };

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
          {postContent.map((userInfo, i) => {
            return (
              <View style={postContainer.mainContainer} key={i}>
                <FeedCard
                  publisherName={userInfo.publisherName}
                  publisherLocation={userInfo.publisherLocation}
                  navigation={navigation}
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
