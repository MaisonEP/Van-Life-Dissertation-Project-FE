import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colours from "./src/styles/colours";
import Home from "./src/pages/Home";
import Profile from "./src/pages/Profile";
import Market from "./src/pages/Market";
import Search from "./src/pages/Search";
import Post from "./src/pages/Post";
import { NavigationContainer } from "@react-navigation/native";
import AppNavBar from "./src/components/AppNavBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  const [value, setValue] = useState(0);

  return (
    <NavigationContainer>
      <Tabs.Navigator tabBar={(props) => <AppNavBar {...props}></AppNavBar>}>
        <Tabs.Screen name="Home" component={Home}></Tabs.Screen>
        <Tabs.Screen name="Profile" component={Profile}></Tabs.Screen>
        <Tabs.Screen name="Market" component={Market}></Tabs.Screen>
        <Tabs.Screen name="Search" component={Search}></Tabs.Screen>
        <Tabs.Screen name="Post" component={Post}></Tabs.Screen>
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
