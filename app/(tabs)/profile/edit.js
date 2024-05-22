import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import PageHeader from "../../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import { showError, showInfo } from "../../../components/Toaster";

export default function Tab() {
  const { i18n } = useTranslation();

  const [profile, setProfile] = useState({
    userId: "66309f8691d019ed240c646f",
    nickname: "Rainbow",
    email: "rainbow@gmail.com",
    preferredGenres: ["novel", "science"],
    avatar: "Profile1.png",
  });
  const [text, setText] = useState(profile.nickname);
  const [newAvatar, setNewAvatar] = useState(null);

  const handleSave = () => {
    if (!text || text.length < 3) {
      showError(i18n.t("editProfile.nickname-invalid"));
      return;
    }
    const data = new FormData();
    data.append("nickname", text);
    let avatarImage = {};
    if (typeof newAvatar === "string") {
      const filename = newAvatar.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      avatarImage = {
        uri: newAvatar,
        name: filename,
        type,
      };
      data.append("avatar", avatarImage);
    }
    console.log(data);
    router.back();
  };

  const handleImageUpload = async () => {
    console.log("Upload image");
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.2,
      aspect: [1, 1],
    });
    if (!result.canceled) {
      setNewAvatar(result.assets[0].uri);
    } else {
      showInfo(i18n.t("boarding.avatarUploadCancel"));
      return;
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <PageHeader
        title={i18n.t("editProfile.title")}
        actionButton={
          <TouchableOpacity
            onPress={handleSave}
            style={{
              paddingRight: 16,
              paddingVertical: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#40B250",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {i18n.t("editProfile.save")}
            </Text>
          </TouchableOpacity>
        }
      />
      <View style={{ padding: 40, gap: 32 }}>
        {/* Profile image */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 16,
          }}
        >
          <View>
            <Image
              src={newAvatar ? newAvatar : getAvatarUrl(profile.avatar)}
              style={{
                width: 150,
                height: 150,
                borderRadius: 500,
              }}
            />
            <TouchableOpacity
              onPress={handleImageUpload}
              style={{
                backgroundColor: "#40B250",
                padding: 8,
                borderRadius: 500,
                borderWidth: 5,
                borderColor: "white",
                position: "absolute",
                top: 100,
                left: 100,
              }}
            >
              <Ionicons name="camera" color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Nickname */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text
            style={{
              flexBasis: "30%",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {i18n.t("editProfile.nickname")}
          </Text>
          <TextInput
            defaultValue={text}
            placeholder={i18n.t("editProfile.nickname-placeholder")}
            style={{
              fontSize: 16,
              borderWidth: 1,
              borderRadius: 20,
              borderColor: "#DEE1EB",
              paddingHorizontal: 12,
              flexGrow: 1,
              maxWidth: "",
            }}
            clearButtonMode="while-editing"
            inputMode="text"
            onChangeText={setText}
          />
        </View>
        {/* Email */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text
            style={{
              flexBasis: "30%",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {i18n.t("editProfile.email")}
          </Text>
          <TextInput
            editable={false}
            defaultValue={profile.email}
            style={{
              fontSize: 16,
              borderWidth: 1,
              borderRadius: 20,
              borderColor: "#DEE1EB",
              paddingHorizontal: 12,
              flexGrow: 1,
              maxWidth: "",
            }}
            inputMode="none"
          />
        </View>
      </View>
    </View>
  );
}
