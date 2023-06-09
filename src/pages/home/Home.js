import { View, Text, Dimensions, StyleSheet } from "react-native";
import { TextInput, Surface, Stack, Avatar } from "@react-native-material/core";
import colours from "../../styles/colours";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function Home({ navigation }) {
  const viewHeight = Dimensions.get("window").height / 3;
  const postContent = [{ publisherName: "Erl", publisherLocation: "Cardiff" }];

  return (
    <Stack style={{ margin: 16 }} items="center" spacing={4}>
      <Surface
        elevation={6}
        category="medium"
        style={{
          ...postStyle.container,
          height: viewHeight,
        }}
        testID="STACK ID"
      >
        <View testID="this is the post div" style={postStyle.contentLayout}>
          <View testID="display piccccccccccc" style={postStyle.displayPicture}>
            <Avatar icon={(props) => <Icon name="account" {...props} />} />
          </View>
          <View
            style={postStyle.usernameAndContent}
            testID="dulicate %%%%%%%%%%%%%%%"
          >
            <View style={postStyle.UsernameContainer}>
              <Text>
                {postContent[0].publisherName},
                {postContent[0].publisherLocation}
              </Text>
            </View>
            <View style={postStyle.contentBody} testID="%%%%%%%%%%%%%%">
              <View style={postStyle.contentTitle}>
                <Text>Title</Text>
              </View>
              <View style={postStyle.contentText}>
                <Text>Content</Text>
              </View>
              <View>
                <Text>Likes, Comments, Share</Text>
              </View>
            </View>
          </View>
        </View>
      </Surface>
    </Stack>
  );
}

const postStyle = StyleSheet.create({
  container: {
    backgroundColor: colours.Celeste + "70",
    // justifyContent: "center",
    width: "100%",
    display: "flex",
    // justifyContent: "flex-start",
  },
  contentLayout: {
    flexDirection: "row",
    height: "100%",
    padding: 10,
  },
  contentBody: {
    // backgroundColor: colours.jet,
    flexGrow: 2,
    // height: "100%",
  },
  displayPicture: { paddingRight: 20 },
  usernameAndContent: {
    // backgroundColor: colours.jet,
    // flexGrow: 1,
  },
  UsernameContainer: {
    // backgroundColor: colours.Celeste,
    paddingBottom: 20,
  },
  contentTitle: {
    paddingBottom: 20,
  },
  contentText: {
    flexGrow: 2,
  },
  contentInteraction: {
    flexGrow: 1,
  },
});
