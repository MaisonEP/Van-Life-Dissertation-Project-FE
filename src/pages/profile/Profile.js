import { View, Text } from "react-native";
import Layout from "../../components/Layout";

export default function Profile({ navigation }) {
  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>profile!</Text>
      </View>
    </Layout>
  );
}
