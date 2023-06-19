import { View, Text, TextInput, StyleSheet, Button, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function Post({}) {
  const [image, setImage] = useState(null);
  const chooseImage = async () => {
    try {
      const outcome = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(outcome);

      if (!outcome.canceled) {
        setImage(outcome.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Button
        onPress={chooseImage}
        title="Choose Image"
        style={createPost.chooseImageButton}
      ></Button>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
const createPost = StyleSheet.create({
  textInput: {
    borderWidth: 1,
  },
  chooseImageButton: {
    width: 10,
  },
});
