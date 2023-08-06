import {
  View,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  AppState,
} from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import colours from "../../styles/colours";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ListItem } from "@react-native-material/core";

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [showCategories, setShowCategories] = useState(false);
  const categoriesRef = useRef();

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  const hanldeScreenClick = () => {
    setShowCategories(false);
  };

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
    <>
      <TouchableOpacity
        style={mapStyle.mapContainer}
        onPress={hanldeScreenClick}
        activeOpacity={1}
      >
        <View
          style={{
            ...mapStyle.actionsContainer,
            width: Dimensions.get("window").width - 45,
          }}
        >
          <TextInput
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
          <TouchableOpacity
            style={mapStyle.plusButton}
            onPress={() => {
              setShowCategories(true);
            }}
          >
            <Icon name="map-marker-plus-outline" color={"#FFFFFF"} size={30} />
          </TouchableOpacity>
        </View>

        <MapView style={mapStyle.map}>
          <Marker coordinate={location} title="My location" />
        </MapView>

        <StatusBar style="auto" />
      </TouchableOpacity>
      <View
        ref={categoriesRef}
        style={{
          ...mapStyle.categories,
          height: showCategories ? Dimensions.get("window").height / 2 : 0,
        }}
      >
        <ListItem title="Campervan site" />
        <ListItem title="Landscape visit" />
        <ListItem title="Another" />
      </View>
    </>
  );
}

const mapStyle = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapSearch: {
    position: "relative",
    backgroundColor: colours.white,
    borderRadius: 10,
    paddingLeft: 5,
    height: 50,
    fontSize: 20,
    shadowColor: colours.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    flexShrink: 2,
    width: "100%",
  },
  actionsContainer: {
    margin: 15,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  plusButton: {
    width: 50,
    height: "100%",
    marginLeft: 15,
    borderRadius: 10,
    backgroundColor: colours.darkSlateGrey,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  categories: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    overflow: "scroll",
    zIndex: 2,
    backgroundColor: colours.white,
  },
});
