import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";

export default function CampervanSurface({ children }) {
  return (
    <Surface
      elevation={2}
      category="medium"
      style={campervanSurfaceStyle.surface}
    >
      <View style={campervanSurfaceStyle.inputContainer}>{children}</View>
    </Surface>
  );
}

const campervanSurfaceStyle = StyleSheet.create({
  surface: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "30%",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    padding: 30,
  },
});
