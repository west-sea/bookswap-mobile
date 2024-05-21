import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HomeHeader() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 16,
        paddingRight: 4,
      }}
    >
      {/* Search icon */}
      <Pressable onPress={() => router.push("(tabs)/home/search")}>
        <Ionicons name="search-outline" size={24} color="black" />
      </Pressable>
      {/* Notifications icon */}
      <Pressable onPress={() => router.push("(tabs)/home/notifications")}>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </Pressable>
    </View>
  );
}
