import {
  TextInput,
  IconButton,
  Button,
  Stack,
  ActivityIndicator,
} from "@react-native-material/core";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import colours from "../../styles/colours";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState, useContext } from "react";
import { Surface } from "react-native-paper";
import LoginContext from "../../../LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import Layout from "../../components/Layout";
import CampervanSurface from "../../components/CampervanSurface";

export default function Register({}) {
  const [username, setuserName] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmedPasswordVisibility, setConfirmedasswordVisibility] =
    useState(true);

  const passwordView = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  const confirmedPasswordView = () => {
    setConfirmedasswordVisibility(!confirmedPasswordVisibility);
  };

  const isSubmitButtonDisabled =
    username === "" ||
    email === "" ||
    password === "" ||
    confirmedPassword === "" ||
    password !== confirmedPassword ||
    loading;

  const image = {
    uri: "https://cdn.pixabay.com/photo/2020/01/22/15/50/illustration-4785614_1280.png",
  };
  const myGlobalValues = useContext(LoginContext);

  //to retrieve data: pass the response of your fetch cal through a function then return response.json. This retrieves the response of the api call then pass the data through the the function to retrieve it.
  //fetch function allows the use of a url/api end point as a parameter to connect to your api client and dbms. it also takes other params like the abject containing method, body and headers.
  //JSON object has a method called stringify which takes the object containing username and password.

  const userCredentials = () => {
    setLoading(true);
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
      })
      .catch((error) => {
        console.log(
          "There was an error posting user credentials to the database",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Layout>
        <Stack fill center spacing={4} style={loginSurface.stack}>
          <CampervanSurface>
            <View style={{ width: "100%", paddingBottom: 30 }}>
              <TextInput
                style={{
                  ...loginSurface.topfields,
                }}
                inputStyle={emailError !== "" ? loginSurface.errorField : {}}
                placeholder="Email"
                variant="outlined"
                onChangeText={(text) => {
                  setEmail(text);
                }}
                onBlur={(e) => {
                  const text = e.nativeEvent.text;
                  if (text === "") {
                    setEmailError("The email is required");
                  } else {
                    setEmailError("");
                  }
                }}
                helperText={emailError !== "" ? emailError : undefined}
              />
              <TextInput
                style={loginSurface.topfields}
                inputStyle={usernameError !== "" ? loginSurface.errorField : {}}
                placeholder="Username"
                variant="outlined"
                onChangeText={(text) => {
                  setuserName(text);
                }}
                onBlur={(e) => {
                  const text = e.nativeEvent.text;
                  if (text === "") {
                    setUsernameError("The username is required");
                  } else {
                    setUsernameError("");
                  }
                }}
                helperText={usernameError !== "" ? usernameError : undefined}
              />

              <TextInput
                textContentType="oneTimeCode"
                secureTextEntry={passwordVisibility}
                inputStyle={passwordError !== "" ? loginSurface.errorField : {}}
                style={loginSurface.topfields}
                placeholder="Password"
                variant="outlined"
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
                onBlur={(e) => {
                  const text = e.nativeEvent.text;
                  if (text === "") {
                    setPasswordError("The password is required");
                  } else {
                    setPasswordError("");
                  }
                }}
                helperText={passwordError !== "" ? passwordError : undefined}
              />

              <TextInput
                textContentType="oneTimeCode"
                secureTextEntry={confirmedPasswordVisibility}
                inputStyle={
                  confirmedPasswordError !== "" ? loginSurface.errorField : {}
                }
                style={loginSurface.passwordfield}
                placeholder="Confirm Password"
                variant="outlined"
                trailing={(props) => (
                  <TouchableOpacity onPress={confirmedPasswordView}>
                    {!confirmedPasswordVisibility ? (
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
                  setConfirmedPassword(text);
                }}
                onBlur={(e) => {
                  const text = e.nativeEvent.text;
                  if (text === "") {
                    setConfirmedPasswordError(
                      "The confirm password is required"
                    );
                  } else {
                    setConfirmedPasswordError("");
                  }
                }}
                helperText={
                  confirmedPasswordError !== ""
                    ? confirmedPasswordError
                    : undefined
                }
              />
              {confirmedPassword !== password &&
                confirmedPassword !== "" &&
                password !== "" && (
                  <Text style={{ marginTop: 10, color: colours.red }}>
                    Your passwords don't match
                  </Text>
                )}
            </View>
            <View style={{ width: "100%" }}>
              <Button
                disabled={isSubmitButtonDisabled}
                title={
                  loading ? (
                    <View style={{ width: "100%" }}>
                      <ActivityIndicator
                        size="large"
                        color={colours.darkSlateGrey}
                      />
                    </View>
                  ) : (
                    "Register"
                  )
                }
                color={colours.mountainBlue}
                tintColor={colours.white}
                // the on press attribute takes a function which calls the function for executing the http protocol and posting user credentials to the database
                onPress={() => userCredentials()}
                style={{ width: "100%" }}
              />
            </View>
          </CampervanSurface>
        </Stack>
      </Layout>
    </React.Fragment>
  );
}

const loginSurface = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "red",
    justifyContent: "space-between",
  },
  surface: {
    height: "50%",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "30%",
  },
  topfields: {
    width: "100%",
    paddingBottom: "3%",
  },
  errorField: {
    borderWidth: 2,
    borderColor: colours.red,
  },
  passwordfield: {
    width: "100%",
  },
  inputContainer: {
    alignItems: "center",
    paddingTop: "15%",
  },
});
