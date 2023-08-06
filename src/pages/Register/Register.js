import {
  TextInput,
  IconButton,
  Button,
  Stack,
} from "@react-native-material/core";
import { ImageBackground, StyleSheet, View } from "react-native";
import colours from "../../styles/colours";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState, useContext } from "react";
import { Surface } from "react-native-paper";
import LoginContext from "../../../LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

export default function Register({}) {
  const [username, setuserName] = useState("anil");
  const [password, setPassword] = useState("password");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const passwordView = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const image = {
    uri: "https://cdn.pixabay.com/photo/2020/01/22/15/50/illustration-4785614_1280.png",
  };
  const myGlobalValues = useContext(LoginContext);

  //to retrieve data: pass the response of your fetch cal through a function then return response.json. This retrieves the response of the api call then pass the data through the the function to retrieve it.
  //fetch function allows the use of a url/api end point as a parameter to connect to your api client and dbms. it also takes other params like the abject containing method, body and headers.
  //JSON object has a method called stringify which takes the object containing username and password.

  const userCredentials = () => {
    fetch("http://192.168.0.15:8080/accountdetails/register", {
      method: "POST",
      body: JSON.stringify({ userName: username, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        if (response.status === 200) {
          await AsyncStorage.setItem("loggedIn", response.toString());
          myGlobalValues.setLoggedIn(response);
        }
        console.log(response.status === 200);
      })
      .catch((error) => {
        console.log(
          "There was an error posting user credentials to the database",
          error
        );
      });
  };
  return (
    <React.Fragment>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={loginSurface.image}
      >
        <Stack fill center spacing={4} style={loginSurface.stack}>
          <Surface elevation={2} category="medium" style={loginSurface.surface}>
            <View style={loginSurface.inputContainer}>
              <TextInput
                style={loginSurface.usernamefields}
                placeholder="Username"
                variant="outlined"
                trailing={(props) => <IconButton {...props} />}
                onChangeText={(text) => {
                  setuserName(text);
                }}
              />

              <TextInput
                secureTextEntry={passwordVisibility}
                style={loginSurface.passwordfield}
                placeholder="Password"
                variant="outlined"
                trailing={(props) => <IconButton {...props} />}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              <TouchableOpacity onPress={passwordView}>
                {!passwordVisibility ? (
                  <Entypo name="eye" size={35} color={colours.black} />
                ) : (
                  <Entypo
                    name="eye-with-line"
                    size={35}
                    color={colours.black}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Stack fill center spacing={1}>
              <Button
                variant="outlined"
                title="Register"
                color="#d4ac2d"
                // the on press attribute takes a function which calls the function for executing the http protocol and posting user credentials to the database
                onPress={() => userCredentials()}
              />
            </Stack>
          </Surface>
        </Stack>
      </ImageBackground>
    </React.Fragment>
  );
}

const loginSurface = StyleSheet.create({
  // stack: { opacity: 0.9 },
  surface: {
    height: "50%",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "30%",
  },
  usernamefields: {
    width: "90%",
  },
  passwordfield: {
    paddingTop: "3%",
    width: "90%",
  },
  inputContainer: {
    alignItems: "center",
    paddingTop: "15%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
