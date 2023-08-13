import {
  TextInput,
  IconButton,
  Button,
  Stack,
  ActivityIndicator,
  Snackbar,
} from "@react-native-material/core";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Surface } from "react-native-paper";
import LoginContext from "../../../LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { backgroundImage } from "../../assets/backgroundImage";
import Layout from "../../components/Layout";
import CampervanSurface from "../../components/CampervanSurface";
import colours from "../../styles/colours";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setuserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const myGlobalValues = useContext(LoginContext);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const passwordView = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  //to retrieve data: pass the response of your fetch cal through a function then return response.json. This retrieves the response of the api call then pass the data through the the function to retrieve it.
  //fetch function allows the use of a url/api end point as a parameter to connect to your api client and dbms. it also takes other params like the abject containing method, body and headers.
  //JSON object has a method called stringify which takes the object containing username and password.

  const userCredentials = () => {
    setLoading(true);
    fetch("http://192.168.0.15:8080/accountdetails/verifieduser", {
      method: "POST",
      body: JSON.stringify({ userName: username, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        await AsyncStorage.setItem("loggedIn", "true");
        await AsyncStorage.setItem("userId", response.userId);
        myGlobalValues.setLoggedIn(true);
      })
      .catch((error) => {
        setError("There was a problem logging in. Please try again");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Dimensions.get("window").height / 10}
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <>
          <Stack fill center spacing={4}>
            <CampervanSurface>
              <TextInput
                blurOnSubmit
                placeholder="Username"
                variant="outlined"
                onChangeText={(text) => {
                  setuserName(text.trim());
                }}
                style={{ ...loginStyle.input, marginBottom: 10 }}
                onBlur={(e) => {
                  const text = e.nativeEvent.text;
                  if (text === "") {
                    setuserNameError("The username is required");
                  } else {
                    setuserNameError("");
                  }
                }}
                helperText={usernameError !== "" ? usernameError : undefined}
                inputStyle={usernameError !== "" ? loginStyle.errorField : {}}
              />
              <TextInput
                placeholder="Password"
                variant="outlined"
                secureTextEntry={passwordVisibility}
                trailing={(props) => (
                  <TouchableOpacity onPress={passwordView}>
                    {!passwordVisibility ? (
                      <Entypo name="eye" size={20} color={colours.black} />
                    ) : (
                      <Entypo
                        name="eye-with-line"
                        size={20}
                        color={colours.black}
                      />
                    )}
                  </TouchableOpacity>
                )}
                onChangeText={(text) => {
                  setPassword(text);
                }}
                style={loginStyle.input}
                onBlur={(e) => {
                  const text = e.nativeEvent.text;
                  if (text === "") {
                    setPasswordError("The password is required");
                  } else {
                    setPasswordError("");
                  }
                }}
                helperText={passwordError !== "" ? passwordError : undefined}
                inputStyle={passwordError !== "" ? loginStyle.errorField : {}}
              />
              <View style={{ paddingBottom: 10, paddingTop: 30 }}>
                <Button
                  disabled={username === "" || password === "" || loading}
                  title={
                    loading ? (
                      <View style={{ width: "100%" }}>
                        <ActivityIndicator
                          size="large"
                          color={colours.darkSlateGrey}
                        />
                      </View>
                    ) : (
                      "Login"
                    )
                  }
                  color={colours.grassGreen}
                  tintColor={colours.white}
                  // the on press attribute takes a function which calls the function for executing the http protocol and posting user credentials to the database
                  onPress={() => {
                    userCredentials();
                  }}
                  titleStyle={loginStyle.buttons}
                />
              </View>

              <Button
                disabled={loading}
                color={colours.mountainBlue}
                tintColor={colours.white}
                title="Register Here"
                onPress={() => navigation.navigate("Register")}
                titleStyle={loginStyle.buttons}
              ></Button>
            </CampervanSurface>
          </Stack>
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
        </>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const loginStyle = StyleSheet.create({
  input: {
    width: "100%",
  },
  buttons: {
    width: "100%",
    textAlign: "center",
    alignContenrt: "center",
  },
  errorField: {
    borderWidth: 2,
    borderColor: colours.red,
  },
});
