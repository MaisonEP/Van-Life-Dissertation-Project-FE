import { View, Text, Dimensions } from "react-native";
import { Surface, Stack } from "@react-native-material/core";

export default function Home({ navigation }) {
  const viewHeight = Dimensions.get("window").height / 3;
  return (
    <Stack style={{ margin: 16 }} items="center" spacing={4}>
      <Surface
        elevation={6}
        category="medium"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: viewHeight,
        }}
      >
        <Text>6</Text>
      </Surface>
      ;
    </Stack>
  );
}
