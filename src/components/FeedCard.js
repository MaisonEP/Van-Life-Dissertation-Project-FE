import { Surface, Avatar, IconButton } from "@react-native-material/core";
import colours from "../styles/colours";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";

const FeedCard = ({ publisherName, publisherLocation }) => {
  const viewHeight = Dimensions.get("window").height / 3;
  const [likesColour, setLikesColour] = useState(colours.black);
  return (
    <Surface
      elevation={6}
      category="medium"
      style={{
        ...postStyle.container,
        height: viewHeight,
      }}
    >
      <View
        style={postStyle.contentLayout}
        testID="here???????????????????????????????"
      >
        <View style={postStyle.displayPicture}>
          <Avatar icon={(props) => <Icon name="account" {...props} />} />
        </View>
        <View style={postStyle.usernameAndContent}>
          <View style={postStyle.UsernameContainer}>
            <Text>
              {publisherName},{publisherLocation}
            </Text>
          </View>
          <View style={postStyle.contentBody}>
            <View style={postStyle.contentTitle}>
              <Text>Title</Text>
            </View>
            <View style={postStyle.contentText}>
              <Text>Content</Text>
            </View>
            <View style={postStyle.interactionLayout}>
              <View style={postStyle.likesLayout}>
                <Text>Likes </Text>
                <IconButton
                  onPress={() => {
                    if (likesColour === colours.black) {
                      setLikesColour(colours.yellowGreen);
                    } else {
                      setLikesColour(colours.black);
                    }
                  }}
                  icon={(props) => (
                    <Icon name="heart" size={props.size} color={likesColour} />
                  )}
                />
              </View>
              <View style={postStyle.commentLayout}>
                <Text>Comments </Text>
                <IconButton
                  onPress={() => navigation.navigate("comment")}
                  icon={(props) => (
                    <Icon
                      name="comment"
                      size={props.size}
                      color={colours.black}
                    />
                  )}
                />
              </View>
              <View style={postStyle.shareLayout}>
                <Text>Share</Text>
                <IconButton
                  onPress={() => navigation.navigate("share")}
                  icon={(props) => (
                    <Icon
                      name="share"
                      size={props.size}
                      color={colours.black}
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Surface>
  );
};

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
    flexGrow: 1,
    // height: "100%",
  },
  displayPicture: { paddingRight: 20 },
  usernameAndContent: {
    // backgroundColor: colours.jet,
    flexGrow: 1,
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
  interactionLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  likesLayout: {
    display: "flex",
    alignItems: "center",
    // flexDirection: "row",
  },
  commentLayout: {
    display: "flex",
    alignItems: "center",
    // flexDirection: "row",
  },
  shareLayout: {
    display: "flex",
    // flexDirection: "row",
    alignItems: "center",
  },
});

export default FeedCard;
