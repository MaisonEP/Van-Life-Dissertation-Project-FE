import {
  Surface,
  Avatar,
  IconButton,
  Divider,
} from "@react-native-material/core";
import colours from "../styles/colours";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext, useState } from "react";
import LoginContext from "../../LoginContext";

const FeedCard = ({
  publisherName,
  postTitle,
  postContent,
  navigation,
  isLocation,
  location,
  image,
}) => {
  const viewHeight = Dimensions.get("window").height / 3;
  const context = useContext(LoginContext);
  const [likesColour, setLikesColour] = useState(colours.black);
  const profileNavigate = () => {
    navigation.navigate("UserProfiles");
  };
  const commentNavigate = () => {
    navigation.navigate("Comments");
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (isLocation) {
          context.setPostLocation(location);
          navigation.navigate("Explore");
        }
      }}
    >
      <Surface
        elevation={6}
        category="medium"
        style={{
          ...postStyle.container,
          minHeight: viewHeight,
          backgroundColor: isLocation ? colours.pistachio : colours.white,
        }}
      >
        <View
          style={postStyle.contentLayout}
          testID="here???????????????????????????????"
        >
          <View style={postStyle.displayPicture}>
            <TouchableOpacity title="button" onPress={profileNavigate}>
              <Avatar icon={(props) => <Icon name="account" {...props} />} />
            </TouchableOpacity>
          </View>
          <View style={postStyle.usernameAndContent}>
            <View style={postStyle.UsernameContainer}>
              <Text>{publisherName}</Text>
            </View>
            <View style={postStyle.contentBody}>
              <Divider
                style={{ marginTop: 1 }}
                leadingInset={3}
                trailingInset={3}
              />
              <View style={postStyle.contentTitle}>
                <Text>{postTitle}</Text>
              </View>

              <View style={postStyle.contentText}>
                <Text>{postContent}</Text>
                {image && (
                  <Image
                    source={{ uri: `data:image/jpg;base64,${image}` }}
                    style={{ width: 200, height: 200, marginBottom: 20 }}
                  />
                )}
              </View>
            </View>
            <View style={postStyle.interactionLayout}>
              <View style={postStyle.likesLayout}>
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
                <IconButton
                  onPress={() => navigation.navigate("Comments")}
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
      </Surface>
    </TouchableOpacity>
  );
};

const postStyle = StyleSheet.create({
  container: {
    backgroundColor: colours.white,
    width: "100%",
    display: "flex",
    maxHeight: 500,
    overflow: "scroll",
  },
  contentLayout: {
    flexDirection: "row",
    padding: 10,
    flexGrow: 1,
  },
  contentBody: {
    flexGrow: 1,
  },
  displayPicture: { paddingRight: 20 },
  usernameAndContent: {
    flexShrink: 1,
  },
  UsernameContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  contentTitle: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  contentText: {},
  contentInteraction: {},
  interactionLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  likesLayout: {
    alignItems: "center",
    flexDirection: "row",
  },
  commentLayout: {
    alignItems: "center",
    flexDirection: "row",
  },
  shareLayout: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FeedCard;
