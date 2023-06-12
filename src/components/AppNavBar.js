import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colours from "../styles/colours";
import { StyleSheet, Text, View } from "react-native";

const AppNavBar = ({ navigation }) => {
  return (
    <AppBar
      leadingContainerStyle={styles.leadingContainer}
      variant="bottom"
      leading={(props) => {
        return (
          <View style={styles.iconsContainer}>
            <IconButton
              onPress={() => navigation.navigate("Home")}
              icon={(props) => (
                <Icon name="home-variant" size={props.size} color={"#FFFFFF"} />
              )}
            />
            <IconButton
              onPress={() => navigation.navigate("Post")}
              icon={(props) => (
                <Icon
                  name="plus-circle-outline"
                  size={props.size}
                  color={"#FFFFFF"}
                />
              )}
            />
            <IconButton
              onPress={() => navigation.navigate("Explore")}
              icon={(props) => (
                <Icon name="map-marker" size={props.size} color={"#FFFFFF"} />
              )}
            />
            <IconButton
              onPress={() => navigation.navigate("Search")}
              icon={(props) => (
                <Icon name="magnify" size={props.size} color={"#FFFFFF"} />
              )}
            />
            <IconButton
              onPress={() => navigation.navigate("Profile")}
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.verdigris,
  },
  appBar: {
    width: "100%",

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
export default AppNavBar;
