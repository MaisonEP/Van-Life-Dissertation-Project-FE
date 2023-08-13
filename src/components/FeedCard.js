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
import CampervanSurface from "./CampervanSurface";

const FeedCard = ({
  publisherName,
  postTitle,
  postContent,
  navigation,
  isLocation,
  location,
  image,
  profileImage,
  postId,
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
      <CampervanSurface
        category="medium"
        fullWidth={true}
        backgroundColor={isLocation ? colours.pistachio : colours.white}
      >
        <View
          style={{ ...postStyle.contentLayout }}
          testID="here???????????????????????????????"
        >
          <View style={postStyle.displayPicture}>
            <TouchableOpacity
              title="button"
              onPress={profileNavigate}
              activeOpacity={!isLocation ? 1 : undefined}
            >
              <Avatar
                image={
                  profileImage
                    ? { uri: `data:image/jpg;base64,${profileImage}` }
                    : undefined
                }
                icon={(props) => <Icon name="account" {...props} />}
              />
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
                {image && (
                  <Image
                    source={{ uri: `data:image/jpg;base64,${image}` }}
                    style={{
                      width: Dimensions.get("window").width / 1.5,
                      height: Dimensions.get("window").width / 1.5,
                      marginBottom: 20,
                    }}
                  />
                )}
                <Text>{postContent}</Text>
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
                  onPress={() => {
                    context.setCurrentPost(postId);
                    navigation.navigate("Comments");
                  }}
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
      </CampervanSurface>
    </TouchableOpacity>
  );
};

const postStyle = StyleSheet.create({
  container: {
    backgroundColor: colours.white,
    width: "100%",
    display: "flex",
    overflow: "scroll",
    // height: "100%",
  },
  contentLayout: {
    flexDirection: "row",
    flexGrow: 1,
  },
  contentBody: {
    flexGrow: 1,
    width: "100%",
  },
  displayPicture: { paddingRight: 20 },
  usernameAndContent: {
    flexShrink: 1,
    width: "100%",
    // height: "100%",
  },
  UsernameContainer: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  contentTitle: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  contentText: {
    width: "100%",
    // height: "100%",
  },
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
