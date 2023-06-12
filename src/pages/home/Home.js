import { TextInput, Surface, Stack, Avatar } from "@react-native-material/core";

import FeedCard from "../../components/FeedCard";
import { ScrollView } from "react-native";

export default function Home({ navigation }) {
  const postContent = [
    { publisherName: "Erl", publisherLocation: "Cardiff" },
    { publisherName: "Ev", publisherLocation: "The Jungle" },
    { publisherName: "Ev", publisherLocation: "The Jungle" },
  ];

  return (
    <ScrollView>
      <Stack style={{ margin: 16 }} items="center" spacing={4}>
        {postContent.map((userInfo, i) => {
          return (
            <FeedCard
              key={i}
              publisherName={userInfo.publisherName}
              publisherLocation={userInfo.publisherLocation}
              navigation={navigation}
            ></FeedCard>
          );
        })}
      </Stack>
    </ScrollView>
  );
}
