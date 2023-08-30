import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Layout from "../../components/Layout";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../../../LoginContext";
import CampervanSurface from "../../components/CampervanSurface";
import {
  ActivityIndicator,
  Button,
  Divider,
  Snackbar,
  TextInput,
} from "@react-native-material/core";
import colours from "../../styles/colours";
import { format } from "date-fns";
import { backEndEndpoint } from "../../assets/endpoint";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProfiles({ navigation }) {
  const context = useContext(LoginContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [creatingComment, setCreatingComment] = useState(false);
  const [error, setError] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  });

  const fetchComments = () => {
    setRefreshing(true);
    fetch(backEndEndpoint.uri + `/posts/comment/${context.currentPost}`)
      .then((response) => {
        return response.json();
      })
      .then((allComments) => {
        setComments(allComments);
      })
      .catch(() => {
        console.log("error");
        setError("There was a problem getting the comments. Please try again");
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [context.currentPost]);

  const createComment = async () => {
    setCreatingComment(true);
    const userId = await AsyncStorage.getItem("userId").catch((e) => {
      return e;
    });
    fetch(backEndEndpoint.uri + "/posts/comment", {
      method: "POST",
      body: JSON.stringify({
        comment: text,
        postId: context.currentPost,
        userId: userId,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        fetchComments();
        setText(undefined);
      })
      .catch(() => {
        console.log("there was an error");
        setError("There was a problem creating the comment. Please try again");
      })
      .finally(() => {
        setCreatingComment(false);
      });
  };

  return (
    <Layout>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        scrollEnabled={false}
        contentContainerStyle={{
          height: Dimensions.get("screen").height,
          flexShrink: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 20,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                fetchComments();
              }}
            />
          }
        >
          <>
            {comments.length > 0 ? (
              [...comments].reverse().map((comment) => {
                return (
                  <CampervanSurface key={comment.commentId}>
                    <Text style={{ fontWeight: "500", fontSize: 16 }}>
                      {comment.username}
                    </Text>
                    <Text style={{ fontWeight: "300", marginTop: 10 }}>
                      {format(new Date(comment.timeDate), "dd-MM-yyyy HH:mm")}
                    </Text>
                    <Divider
                      style={{
                        width: "100%",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    />
                    <Text>{comment.comment}</Text>
                  </CampervanSurface>
                );
              })
            ) : (
              <></>
            )}
          </>
        </ScrollView>
        <View style={{ padding: 30, width: "100%" }}>
          <TextInput
            placeholder="Add comment"
            style={commentSectionContainer.container}
            variant="outlined"
            onChangeText={(inputText) => setText(inputText)}
            value={text}
            blurOnSubmit
          />

          <Button
            title={
              creatingComment ? (
                <View style={{ width: "100%" }}>
                  <ActivityIndicator
                    size="large"
                    color={colours.darkSlateGrey}
                  />
                </View>
              ) : (
                "Comment"
              )
            }
            style={{ ...commentSectionContainer.container, marginTop: 20 }}
            color={colours.grassGreen}
            onPress={() => createComment()}
            disabled={!text || creatingComment}
          />
        </View>
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
      </ScrollView>
    </Layout>
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
  container: { width: "100%" },
});
