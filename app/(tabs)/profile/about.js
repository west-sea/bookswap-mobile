import { View, Text, Image, TouchableOpacity } from "react-native";
import AdaptiveIcon from "../../../assets/adaptive-icon.png";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Tab() {
  const { i18n } = useTranslation();

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 16,
        }}
      >
        <TouchableOpacity
          onPress={router.back}
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 12,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}
          >
            BookSwap
          </Text>
        </View>
        <View style={{ height: 24, width: 24, paddingRight: 12 }}></View>
      </View>
      {/* BookSwap Introduction */}
      <View
        style={{
          gap: 16,
          alignItems: "center",
          paddingHorizontal: 32,
          paddingVertical: 16,
        }}
      >
        {/* Logo */}
        <Image
          source={AdaptiveIcon}
          style={{ width: 250, height: 250, alignSelf: "center" }}
        />
        {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Logo />
          <Title />
        </View> */}
        {/* Title */}
        <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}>
          {i18n.t("about.title")}
        </Text>
        {/* Description */}
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          {i18n.t("about.description")}
        </Text>
      </View>
      {/* Team */}
      <View
        style={{
          paddingVertical: 16,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Title */}
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {i18n.t("about.team")}
        </Text>
        {/* Members */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          {["Alisher Ortiqov", "서해린", "정세준", "함창수"].map((name, i) => (
            <Text
              key={i}
              style={{
                padding: 8,
                paddingHorizontal: 12,
                backgroundColor: "#AFEEB8",
                borderRadius: 40,
              }}
            >
              {name}
            </Text>
          ))}
        </View>
      </View>
      {/* Contact */}
      <View
        style={{
          paddingVertical: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Tel. 010-4398-3786</Text>
        <Text>Email. bookswap@kaist.ac.kr</Text>
      </View>
    </View>
  );
}
