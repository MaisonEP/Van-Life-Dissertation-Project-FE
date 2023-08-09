import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { backgroundImage } from "../assets/backgroundImage";

export default function Layout({ children }) {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={layoutStyles.image}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        {children}
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const layoutStyles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
