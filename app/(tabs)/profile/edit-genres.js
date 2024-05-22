import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import PageHeader from "../../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import { showInfo } from "../../../components/Toaster";
import GenreSelector from "../../../components/input/GenreSelector";

export default function Tab() {
  const { i18n } = useTranslation();

  const [profile, setProfile] = useState({
    userId: "66309f8691d019ed240c646f",
    nickname: "Rainbow",
    email: "rainbow@gmail.com",
    preferredGenres: ["novel", "science"],
    avatar: "Profile1.png",
  });
  const [genres, setGenres] = useState(profile.preferredGenres);

  const handleSave = () => {
    const data = new FormData();
    data.append("preferredGenres", genres);
    console.log(data);
    router.back();
  };

  const handleGenreSelect = (genre) => {
    setGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <PageHeader
        title={i18n.t("editGenres.title")}
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
        <GenreSelector
          selectedGenres={genres}
          toggleGenreSelection={handleGenreSelect}
        />
      </View>
    </View>
  );
}
