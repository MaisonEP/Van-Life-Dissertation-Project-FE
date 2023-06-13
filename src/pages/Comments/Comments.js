import { View, Text, StyleSheet, ImageBackground } from "react-native";

export default function UserProfiles({ navigation }) {
  const image = {
    uri: "https://cdn.pixabay.com/photo/2020/01/22/15/50/illustration-4785614_1280.png",
  };

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={commentSectionContainer.image}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Comment section Page!</Text>
      </View>
    </ImageBackground>
  );
}

const commentSectionContainer = StyleSheet.create({
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
