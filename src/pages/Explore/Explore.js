import {
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  LayoutAnimation,
  ActivityIndicator,
  Text,
  Image,
  Keyboard,
} from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef, useContext } from "react";
import * as Location from "expo-location";
import colours from "../../styles/colours";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ListItem, Divider } from "@react-native-material/core";
import { Button } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginContext from "../../../LoginContext";
import { API_KEY_GOOGLE } from "../../config/config";
import redPin from "../../assets/images/red-pin.png";
import bluePin from "../../assets/images/blue-pin.png";

export default function App() {
  const [location, setLocation] = useState();
  const [searchlocation, setSearchLocation] = useState();

  const [address, setAddress] = useState();
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(LoginContext);
  const destinationLocation = context.postLocation;
  const dimensions = Dimensions.get("window");
  const width = dimensions.width;
  const height = dimensions.height;
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
      setSearchLocation({
        latitude: geocodedLocation[0].latitude,
        longitude: geocodedLocation[0].longitude,
      });
    } catch (error) {
      console.log("My seccond error" + error);
    }
  };

  const createPostWithLocation = async () => {
    const userId = await AsyncStorage.getItem("userId").catch((e) => {
      return e;
    });

    const areaToFind = searchlocation ?? location;
    const area = await Location.reverseGeocodeAsync(areaToFind).catch((e) => {
      return e;
    });
    console.log("hi");
    fetch("http://192.168.0.15:8080/posts/create", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        title: selectedCategory,
        content: `Location: ${area[0].street},  ${area[0].city},  ${area[0].country}`,
        isLocation: true,
        longitude: areaToFind.longitude,
        latitude: areaToFind.latitude,
        file: null,
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
            width: width - 45,
          }}
        >
          <View
            style={{
              width: width - 90,
            }}
          >
            <TextInput
              placeholder="Enter Location"
              placeholderTextColor={colours.black}
              color={colours.darkSlateGrey}
              value={address}
              onChangeText={(text) => {
                setAddress(text);
              }}
              onSubmitEditing={() => {
                geocode();
              }}
              style={mapStyle.mapSearch}
            ></TextInput>
            <Icon
              name="check"
              size={30}
              style={{ position: "absolute", right: 10, top: 10 }}
              onPress={() => {
                Keyboard.dismiss();
                geocode();
              }}
            ></Icon>
          </View>
          <TouchableOpacity
            style={mapStyle.plusButton}
            onPress={() => {
              setShowCategories(true);
            }}
          >
            <Icon name="map-marker-plus-outline" color={"#FFFFFF"} size={30} />
          </TouchableOpacity>
        </View>
        <MapView
          style={mapStyle.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00922 * (width / height), //initial zoom in
          }}
          region={
            destinationLocation
              ? {
                  latitude:
                    (location.latitude + destinationLocation.latitude) / 2,
                  longitude:
                    (location.longitude + destinationLocation.longitude) / 2,
                  latitudeDelta: Math.abs(
                    destinationLocation.latitude - location.latitude
                  ),
                  longitudeDelta:
                    Math.abs(
                      destinationLocation.longitude - location.longitude
                    ) * 2,
                }
              : searchlocation
              ? {
                  ...searchlocation,
                  latitudeDelta: 0.00922,
                  longitudeDelta: 0.00922 * (width / height), //initial zoom in
                }
              : {
                  ...location,
                  latitudeDelta: 0.00922,
                  longitudeDelta: 0.00922 * (width / height), //initial zoom in
                }
          }
        >
          <Marker coordinate={location} title="My location">
            <Image
              source={redPin}
              style={{
                height: 30,
                width: 30,
                transform: [{ translateY: -15 }],
                zIndex: 5,
              }}
            />
          </Marker>
          {destinationLocation ?? searchlocation ? (
            <Marker
              coordinate={destinationLocation ?? searchlocation}
              title="Destination"
            >
              <Image
                source={bluePin}
                style={{
                  height: 30,
                  width: 30,
                  transform: [{ translateY: -15 }],
                }}
              />
            </Marker>
          ) : (
            <></>
          )}

          {destinationLocation ? (
            <MapViewDirections
              origin={location}
              destination={destinationLocation}
              strokeWidth={5}
              strokeColor={colours.purple}
              apikey={API_KEY_GOOGLE}
            />
          ) : (
            <></>
          )}
        </MapView>
        {destinationLocation ? (
          <Button
            onPress={() => {
              setSearchLocation(searchlocation);
              context.setPostLocation(undefined);
            }}
            style={mapStyle.exitDestination}
            title="Exit"
            color={colours.darkSlateGrey}
            trailing={(props) => <Icon name="close-box-outline" {...props} />}
          ></Button>
        ) : (
          <></>
        )}
        {searchlocation && !destinationLocation ? (
          <>
            <Button
              onPress={() => {
                context.setPostLocation(searchlocation);
                setSearchLocation(undefined);
              }}
              style={mapStyle.exitDestination}
              title="Go"
              color={colours.darkSlateGrey}
              trailing={(props) => (
                <Icon name="van-utility" {...props} size={25} />
              )}
            ></Button>
            <Button
              onPress={() => {
                setAddress(undefined);
                setSearchLocation(undefined);
              }}
              style={mapStyle.exitSearch}
              title="Exit"
              color={colours.darkSlateGrey}
              trailing={(props) => (
                <Icon name="close-box-outline" {...props} size={25} />
              )}
            ></Button>
          </>
        ) : (
          <></>
        )}

        <StatusBar style="auto" />
      </TouchableOpacity>
      <View
        ref={categoriesRef}
        style={{
          ...mapStyle.categories,
          height: showCategories ? "auto" : 0,
          paddingBottom: showCategories ? 20 : 0,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            padding: 10,
            backgroundColor: colours.darkSlateGrey,
            color: colours.white,
          }}
        >
          Create a post with your location
        </Text>
        <TouchableOpacity
          style={{
            ...mapStyle.listItem,
            backgroundColor:
              selectedCategory === typesOfCategrories.campsite
                ? colours.grassGreen
                : colours.white,
          }}
          onPress={() => setSelectedCategory(typesOfCategrories.campsite)}
        >
          <Text
            style={{
              ...mapStyle.listItemText,
            }}
          >
            Campsite
          </Text>
        </TouchableOpacity>
        <Divider style={{ marginLeft: 15, marginRight: 15 }} />
        <TouchableOpacity
          style={{
            ...mapStyle.listItem,
            backgroundColor:
              selectedCategory === typesOfCategrories.landscape
                ? colours.grassGreen
                : colours.white,
            color: colours.white,
          }}
          onPress={() => setSelectedCategory(typesOfCategrories.landscape)}
        >
          <Text
            style={{
              ...mapStyle.listItemText,
            }}
          >
            Landscape
          </Text>
        </TouchableOpacity>
        <Divider style={{ marginLeft: 15, marginRight: 15 }} />
        <TouchableOpacity
          style={{
            ...mapStyle.listItem,
            backgroundColor:
              selectedCategory === typesOfCategrories.other
                ? colours.grassGreen
                : colours.white,
            color: colours.white,
          }}
          onPress={() => setSelectedCategory(typesOfCategrories.other)}
        >
          <Text
            style={{
              ...mapStyle.listItemText,
            }}
          >
            Other
          </Text>
        </TouchableOpacity>
        <Button
          title="Post"
          onPress={createPostWithLocation}
          disabled={selectedCategory === ""}
          style={{ width: width / 2, alignSelf: "center", marginTop: 10 }}
          color={colours.mountainBlue}
        />
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
    paddingRight: 50,
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
  exitDestination: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  exitSearch: {
    position: "absolute",
    bottom: 30,
    left: 30,
  },
});
