import { useState, disp, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { AppBar, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import colours from "./src/styles/colours";
import Home from "./src/pages/home/Home";
import Profile from "./src/pages/profile/Profile";
import Search from "./src/pages/search/Search";
import Post from "./src/pages/post/Post";
import Explore from "./src/pages/Explore/Explore";
import Register from "./src/pages/Register/Register";
import { NavigationContainer } from "@react-navigation/native";
import AppNavBar from "./src/components/AppNavBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import UserProfiles from "./src/pages/UserProfiles/UserProfiles";
import { HeaderStyleInterpolators } from "@react-navigation/stack";
import Comments from "./src/pages/Comments/Comments";
import Login from "./src/pages/LoginPage/Login";
import LoginContext from "./LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = {
  uri: "https://cdn.pixabay.com/photo/2020/01/22/15/50/illustration-4785614_1280.png",
};
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const headerStyle = HeaderStyleInterpolators;
const Password = 1;
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  const initialContext = {
    isLoggedIn: loggedIn,
    setLoggedIn: setLoggedIn,
  };

  useEffect(() => {
    const value = async () => {
      const response = await AsyncStorage.getItem("loggedIn");

      setLoggedIn(response === "true" ? true : false);
      setAppLoading(false);
    };
    value();
  }, []);

  return appLoading ? (
    <View style={[appStyle.container, appStyle.horizontal]}>
      <ActivityIndicator size="large" color={colours.darkSlateGrey} />
    </View>
  ) : (
    <LoginContext.Provider value={initialContext}>
      <NavigationContainer>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={appStyle.image}
        >
          {/* to add if statements to HTML, instead of if(){} else{}, the syntax is {condition?():()} for example {var > 1?(code if condition is met):(semi colon represents else then these brackets hold other action)} */}
          {/* HTML comments like this one are created between html tags. press control + forward slash */}
          {loggedIn ? (
            <Tabs.Navigator
              tabBar={(props) => <AppNavBar {...props}></AppNavBar>}
            >
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
          ) : (
            // because of curly braces creating a javascript contained area, the comment behaviour is java like
            //to containe more than 1 tag within the if statement, it requires the empty tag (fragment) to contain all elemts of code, e.g. <></>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{ cardStyle: appStyle.appBackground }}
            >
              <Stack.Screen name="Login" component={Login}></Stack.Screen>
              <Stack.Screen name="Register" component={Register}></Stack.Screen>
            </Stack.Navigator>
          )}
        </ImageBackground>
      </NavigationContainer>
    </LoginContext.Provider>
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
