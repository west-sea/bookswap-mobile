import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function PageHeader({ title }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 12,
      }}
    >
      <TouchableOpacity
        onPress={router.back}
        style={{
          flexBasis: "10%",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 16,
        }}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>{title}</Text>
      <View style={{ flexBasis: "10%" }}></View>
    </View>
  );
}
