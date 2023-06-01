import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colours from "./src/styles/colours";
import Home from "./src/pages/Home";
// import icon from "./assets/icon.png";

export default function App() {
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <Home></Home>
      <AppBar
        leadingContainerStyle={styles.leadingContainer}
        variant="bottom"
        leading={(props) => {
          return (
            <View style={styles.iconsContainer}>
              <IconButton
                icon={(props) => (
                  <Icon
                    name="home-variant"
                    size={props.size}
                    color={"#FFFFFF"}
                  />
                )}
              />
              <IconButton
                icon={(props) => (
                  <Icon
                    name="plus-circle-outline"
                    size={props.size}
                    color={"#FFFFFF"}
                  />
                )}
              />
              <IconButton
                icon={(props) => (
                  <Icon name="store" size={props.size} color={"#FFFFFF"} />
                )}
              />
              <IconButton
                icon={(props) => (
                  <Icon name="magnify" size={props.size} color={"#FFFFFF"} />
                )}
              />
              <IconButton
                icon={(props) => (
                  <Icon
                    name="account-circle"
                    size={props.size}
                    color={"#FFFFFF"}
                  />
                )}
              />
            </View>
          );
        }}
        style={styles.appBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colours.verdigris,
  },
  appBar: {
    position: "absolute",
    bottom: 0,
    start: 0,
    end: 0,
    padding: 10,
    backgroundColor: colours.jet,
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leadingContainer: {
    width: "100%",
  },
});