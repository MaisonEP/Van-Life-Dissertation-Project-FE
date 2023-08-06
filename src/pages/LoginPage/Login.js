import {
  TextInput,
  IconButton,
  Button,
  Stack,
} from "@react-native-material/core";

import React, { useContext, useState } from "react";
import { Surface } from "react-native-paper";
import LoginContext from "../../../LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Text from "@react-native-material/core";
export default function Login({ navigation }) {
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const myGlobalValues = useContext(LoginContext);

  //to retrieve data: pass the response of your fetch cal through a function then return response.json. This retrieves the response of the api call then pass the data through the the function to retrieve it.
  //fetch function allows the use of a url/api end point as a parameter to connect to your api client and dbms. it also takes other params like the abject containing method, body and headers.
  //JSON object has a method called stringify which takes the object containing username and password.

  const userCredentials = () => {
    fetch("http://192.168.0.15:8080/accountdetails/verifieduser", {
      method: "POST",
      body: JSON.stringify({ userName: username, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (response) => {
        await AsyncStorage.setItem("loggedIn", response.toString());
        myGlobalValues.setLoggedIn(response);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  };
  return (
    <React.Fragment>
      <Stack fill center spacing={4}>
        <Surface
          elevation={2}
          category="medium"
          style={{ width: "80%", height: "80%" }}
        >
          <TextInput
            placeholder="Email"
            variant="outlined"
            trailing={(props) => <IconButton {...props} />}
            onChangeText={(text) => {
              setuserName(text.trim());
            }}
          />
          <TextInput
            placeholder="Password"
            variant="outlined"
            trailing={(props) => <IconButton {...props} />}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <Stack fill center spacing={1}>
            <Button
              variant="outlined"
              title="Login"
              color="#d4ac2d"
              // the on press attribute takes a function which calls the function for executing the http protocol and posting user credentials to the database
              onPress={() => {
                userCredentials();
              }}
            />

            <Button
              title="Register Here"
              onPress={() => navigation.navigate("Register")}
            ></Button>
          </Stack>
        </Surface>
      </Stack>
    </React.Fragment>
  );
}
