import { View, Text, Image, TouchableOpacity } from "react-native";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { useSession } from "../../../contexts/auth.ctx";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export default function Tab() {
  const [me, setMe] = useState({
    userId: "66309f8691d019ed240c646f",
    nickname: "Rainbow",
    email: "rainbow@gmail.com",
    preferredGenres: ["novel", "science"],
    avatar: "Profile1.png",
  });
  const { i18n } = useTranslation();
  const { signOut } = useSession();

  const handleLogout = () => {
    // Implement log out
    Toast.show({
      type: "success",
      text1: "Logged Out",
      text2: "You have been logged out successfully.",
      position: "bottom",
      onPress: () => {
        Toast.hide();
      },
    });
    signOut();
    // router.replace("/auth");
  };

  const handleAction = (path) => {
    router.push({
      pathname: path,
    });
  };

  const switchLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("kr");
    } else {
      i18n.changeLanguage("en");
    }
  };

  return (
    <View style={{ padding: 20, gap: 16, flex: 1 }}>
      {/* Profile info */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          {/* Avatar */}
          <Image
            src={getAvatarUrl(me.avatar)}
            style={{
              width: 75,
              height: 75,
              borderRadius: 50,
            }}
          />
          {/* Name */}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            {me.nickname}
          </Text>
        </View>
        {/* Edit button */}
        <View style={{ flexDirection: "row", gap: 4 }}>
          <TouchableOpacity
            onPress={() => handleAction("profile/edit")}
            style={{
              backgroundColor: "#DEE1EB",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 40,
            }}
          >
            <Text style={{ fontSize: 16 }}>{i18n.t("profile.edit")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: "#FF4438",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 40,
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>
              {i18n.t("profile.logout")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Actions */}
      <View style={{ gap: 8 }}>
        <ActionButton
          icon={<FontAwesome5 name="history" size={24} color="black" />}
          label={i18n.t("profile.myExchanges")}
          badge={3}
          onPress={() => handleAction("profile/my-exchanges")}
        />
        <ActionButton
          icon={<FontAwesome5 name="book" size={24} color="black" />}
          label={i18n.t("profile.preferredGenres")}
          badge={2}
          onPress={() => handleAction("profile/edit-genres")}
        />
        <ActionButton
          icon={<Ionicons name="language" size={24} color="black" />}
          label={i18n.t("profile.language")}
          badge={i18n.language === "en" ? "English" : "한국인"}
          onPress={switchLanguage}
        />
        {/* Support */}
        <ActionButton
          icon={<Ionicons name="information-circle" size={24} color="black" />}
          label={i18n.t("profile.about")}
          onPress={() => handleAction("profile/about")}
        />
      </View>
    </View>
  );
}

function ActionButton({ icon, label, badge, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 50,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexBasis: "10%",
          }}
        >
          {icon}
        </View>
        <Text>{label}</Text>
      </View>
      {badge && <Text style={{ fontWeight: "bold" }}>{badge}</Text>}
    </TouchableOpacity>
  );
}