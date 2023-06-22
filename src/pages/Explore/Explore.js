import { View, Text, Button, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import colours from "../../styles/colours";
// import { TextInput } from "@react-native-material/core";

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Please grant location permission");
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        console.log("Location");
        console.log(currentLocation);
      } catch (error) {
        console.log("This is the error" + error);
      }
    };
    getPermissions();
  }, []);

  const geocode = async () => {
    try {
      const geocodedLocation = await Location.geocodeAsync(address);
      console.log(geocodedLocation);
    } catch (error) {
      console.log("My seccond error" + error);
    }
  };
  return (
    <View style={mapStyle.mapContainer}>
      <MapView style={mapStyle.map}>
        <View>
          <TextInput
            // variant="standard"
            placeholder="Enter Location"
            placeholderTextColor={colours.black}
            color={colours.darkSlateGrey}
            value={address}
            onChangeText={setAddress}
            onSubmitEditing={() => {
              geocode();
            }}
            style={mapStyle.mapSearch}
          ></TextInput>
        </View>

        <Marker coordinate={location} title="My location" />
      </MapView>

      <StatusBar style="auto" />
    </View>
  );
}

const mapStyle = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapSearch: {
    position: "relative",
    margin: 15,
    backgroundColor: colours.white,
    borderRadius: 10,
    paddingLeft: 5,
    height: 40,
    fontSize: 20,
    shadowColor: colours.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
  },
});
