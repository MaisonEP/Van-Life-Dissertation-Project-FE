import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";
import colours from "../styles/colours";

export default function CampervanSurface({
  children,
  fullWidth,
  backgroundColor,
}) {
  return (
    <Surface
      elevation={2}
      category="medium"
      style={{
        ...campervanSurfaceStyle.surface,
        width: fullWidth ? "100%" : "80%",
        backgroundColor: backgroundColor ? backgroundColor : colours.white,
      }}
    >
      <View style={campervanSurfaceStyle.inputContainer}>{children}</View>
    </Surface>
  );
}

const campervanSurfaceStyle = StyleSheet.create({
  surface: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "30%",
    marginBottom: 30,
    marginTop: 30,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    padding: 30,
  },
});
