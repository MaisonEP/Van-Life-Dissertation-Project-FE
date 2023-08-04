import { View, Text } from "react-native";

export default function Home({ navigation }) {
  console.log(navigation);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>home!</Text>
    </View>
  );
}
