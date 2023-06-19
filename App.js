import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colours from "./src/styles/colours";
import Home from "./src/pages/home/Home";
import Profile from "./src/pages/profile/Profile";
import Search from "./src/pages/search/Search";
import Post from "./src/pages/post/Post";
import Explore from "./src/pages/Explore/Explore";
import { NavigationContainer } from "@react-navigation/native";
import AppNavBar from "./src/components/AppNavBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfiles from "./src/pages/UserProfiles/UserProfiles";
import { HeaderStyleInterpolators } from "@react-navigation/stack";
import Comments from "./src/pages/Comments/Comments";

const image = {
  uri: "https://cdn.pixabay.com/photo/2020/01/22/15/50/illustration-4785614_1280.png",
};
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const headerStyle = HeaderStyleInterpolators;
const Test = () => {
  return (
    <View>
      <Text> Testingggggggggggggggggggggggg</Text>
    </View>
  );
};
const ScreenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ cardStyle: appStyle.appBackground }}
    >
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen
        name="UserProfiles"
        component={UserProfiles}
        options={{ headerTintColor: "black" }}
      ></Stack.Screen>
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ headerTintColor: "black" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
export default function App() {
  const [value, setValue] = useState(0);

  return (
    <NavigationContainer>
      <ImageBackground source={image} resizeMode="cover" style={appStyle.image}>
        <Tabs.Navigator tabBar={(props) => <AppNavBar {...props}></AppNavBar>}>
          <Tabs.Screen
            name="HomeWrapper"
            component={ScreenNavigator}
            options={{ header: () => null }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "My Profile",
              HeaderStyleInterpolators: headerStyle.forUIKit,
            }}
          ></Tabs.Screen>
          <Tabs.Screen name="Explore" component={Explore}></Tabs.Screen>
          <Tabs.Screen name="Search" component={Search}></Tabs.Screen>
          <Tabs.Screen name="Post" component={Post}></Tabs.Screen>
        </Tabs.Navigator>
      </ImageBackground>
    </NavigationContainer>
  );
}

const appStyle = StyleSheet.create({
  appBackground: {
    backgroundColor: colours.jet,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
