import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";

export default function CampervanSurface({ children, fullWidth }) {
  return (
    <Surface
      elevation={2}
      category="medium"
      style={{
        ...campervanSurfaceStyle.surface,
        width: fullWidth ? "100%" : "80%",
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
