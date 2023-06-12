import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
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

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Test = () => {
  return (
    <View>
      <Text> Testingggggggggggggggggggggggg</Text>
    </View>
  );
};
const ScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ header: () => null }}
      ></Stack.Screen>
      <Stack.Screen
        name="UserProfiles"
        component={UserProfiles}
        options={{ header: () => null }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
export default function App() {
  const [value, setValue] = useState(0);

  return (
    <NavigationContainer>
      <Tabs.Navigator tabBar={(props) => <AppNavBar {...props}></AppNavBar>}>
        <Tabs.Screen
          name="HomeWrapper"
          component={ScreenNavigator}
        ></Tabs.Screen>
        <Tabs.Screen name="Profile" component={Profile}></Tabs.Screen>
        <Tabs.Screen name="Explore" component={Explore}></Tabs.Screen>
        <Tabs.Screen name="Search" component={Search}></Tabs.Screen>
        <Tabs.Screen name="Post" component={Post}></Tabs.Screen>
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
