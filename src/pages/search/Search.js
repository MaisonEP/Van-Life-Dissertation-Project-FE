import { View, Text, ScrollView, RefreshControl } from "react-native";
import Layout from "../../components/Layout";
import {
  ActivityIndicator,
  Avatar,
  Divider,
  Stack,
  TextInput,
} from "@react-native-material/core";
import { useCallback, useEffect, useState } from "react";
import colours from "../../styles/colours";
import CampervanSurface from "../../components/CampervanSurface";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Search({ navigation }) {
  const [user, setUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersSearch, setAllUsersSearch] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const userId = await AsyncStorage.getItem("userId").catch((e) => {
      return e;
    });

    fetch("http://192.168.0.15:8080/accountdetails/allusers", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        if (r) {
          const usersWithoutSelf = r.filter((u) => {
            if (u.userId !== userId) {
              return u;
            }
          });
          setAllUsers(usersWithoutSelf);
          setAllUsersSearch(usersWithoutSelf);
        }
      })
      .catch((error) => {
        console.log("There was an error", error);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUsers();
  }, []);

  return (
    <Layout>
      {loading ? (
        <View
          style={{
            minHeight: 400,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={colours.darkSlateGrey} />
        </View>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              padding: 30,
            }}
          >
            {allUsers?.length > 0 ? (
              <TextInput
                placeholder="Search for users here"
                onChangeText={(text) => {
                  setUser(text);
                }}
                onBlur={() => {
                  const filteredUsers = allUsers.filter((u) => {
                    if (u.username.toLowerCase().includes(user.toLowerCase())) {
                      return u;
                    }
                  });
                  setAllUsersSearch(filteredUsers);
                }}
                style={{ width: "100%" }}
                variant="outlined"
                blurOnSubmit
              />
            ) : (
              <></>
            )}
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <Stack fill center spacing={4}>
                {allUsers.length > 0 ? (
                  allUsersSearch.map((u) => (
                    <CampervanSurface fullWidth={true} key={u.userId}>
                      <Avatar
                        image={
                          u?.image
                            ? {
                                uri: `data:image/jpg;base64,${u.image}`,
                              }
                            : undefined
                        }
                        icon={(props) => <Icon name="account" {...props} />}
                        size={300}
                      />
                      <View style={{ width: "100%", marginTop: 20 }}>
                        <Divider
                          style={{ marginTop: 1 }}
                          leadingInset={3}
                          trailingInset={3}
                        />
                      </View>
                      <Text style={{ fontSize: 25, marginTop: 20 }}>
                        {u.username}
                      </Text>
                      {u?.bio ? (
                        <Text
                          style={{
                            fontSize: 16,
                            marginTop: 20,
                            fontWeight: "300",
                          }}
                        >
                          {u.bio}
                        </Text>
                      ) : (
                        <></>
                      )}
                    </CampervanSurface>
                  ))
                ) : (
                  <CampervanSurface>
                    <Text>There are no users</Text>
                  </CampervanSurface>
                )}
              </Stack>
            </ScrollView>
          </View>
        </>
      )}
    </Layout>
  );
}
