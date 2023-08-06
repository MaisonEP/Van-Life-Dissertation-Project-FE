import {
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  ActivityIndicator,
  Text,
} from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef, useContext } from "react";
import * as Location from "expo-location";
import colours from "../../styles/colours";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ListItem, Divider } from "@react-native-material/core";
import { Button } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginContext from "../../../LoginContext";

export default function App() {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(LoginContext);

  const typesOfCategrories = {
    campsite: "Campsite",
    landscape: "Landscape",
    other: "Other",
  };

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
          return;
        }
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        setIsLoading(false);
      } catch (error) {
        console.log("This is the error" + error);
      }
    };
    getPermissions();
  }, []);

  const geocode = async () => {
    try {
      const geocodedLocation = await Location.geocodeAsync(address);
    } catch (error) {
      console.log("My seccond error" + error);
    }
  };

  const createPostWithLocation = async () => {
    const userId = await AsyncStorage.getItem("userId").catch((e) => {
      return e;
    });
    const area = await Location.reverseGeocodeAsync(location).catch((e) => {
      return e;
    });
    fetch("http://192.168.0.15:8080/posts/create", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        title: selectedCategory,
        content: `Location: ${area[0].street},  ${area[0].city},  ${area[0].country}`,
        isLocation: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setShowCategories(false);
        context.setRefetchingPosts(true);
      })
      .catch((error) => {
        console.log("There was an error", error);
      });
  };

  return isLoading ? (
    <View style={[mapStyle.container, mapStyle.horizontal]}>
      <ActivityIndicator size="large" color={colours.darkSlateGrey} />
    </View>
  ) : (
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
        <Button
          title="Post"
          onPress={createPostWithLocation}
          disabled={selectedCategory === ""}
        />

        <TouchableOpacity
          style={{
            ...mapStyle.listItem,
            backgroundColor:
              selectedCategory === typesOfCategrories.campsite
                ? colours.darkSlateGrey
                : colours.white,
          }}
          onPress={() => setSelectedCategory(typesOfCategrories.campsite)}
        >
          <Text style={mapStyle.listItemText}>Campervan site</Text>
        </TouchableOpacity>
        <Divider style={{ marginLeft: 15, marginRight: 15 }} />
        <TouchableOpacity
          style={{
            ...mapStyle.listItem,
            backgroundColor:
              selectedCategory === typesOfCategrories.landscape
                ? colours.darkSlateGrey
                : colours.white,
          }}
          onPress={() => setSelectedCategory(typesOfCategrories.landscape)}
        >
          <Text style={mapStyle.listItemText}>Landscape visit</Text>
        </TouchableOpacity>
        <Divider style={{ marginLeft: 15, marginRight: 15 }} />
        <TouchableOpacity
          style={{
            ...mapStyle.listItem,
            backgroundColor:
              selectedCategory === typesOfCategrories.other
                ? colours.darkSlateGrey
                : colours.white,
          }}
          onPress={() => setSelectedCategory(typesOfCategrories.other)}
        >
          <Text style={mapStyle.listItemText}>Other</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  selectedListItem: {
    backgroundColor: colours.dirtBrown,
  },
  listItem: {
    width: "100%",
    padding: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  listItemText: {
    fontSize: 16,
  },
});
