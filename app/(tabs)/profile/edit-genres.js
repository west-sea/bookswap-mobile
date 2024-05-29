import { View, Text, TouchableOpacity } from "react-native";
import PageHeader from "../../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import FormData from "form-data";
import { showInfo } from "../../../components/Toaster";
import GenreSelector from "../../../components/input/GenreSelector";
import { api } from "../../../store/api";
import Loading from "../../../components/Loading";
import { handleApiError } from "../../../store/utils";

export default function Tab() {
  const { data, error: meError } = api.useGetMeQuery();
  const [editProfile, { error: editError, isLoading: isEditLoading }] =
    api.useEditProfileMutation();
  const [isLoading, setIsLoading] = useState(true);
  const { i18n } = useTranslation();

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const error = meError || editError;
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [meError, editError]);

  useEffect(() => {
    if (!data || !data.success) return;
    const user = data.data;
    setGenres(user.preferredGenres);
    setIsLoading(false);
  }, [data]);

  const handleSave = async () => {
    if (!genres || genres.length === 0) {
      showInfo(i18n.t("editGenres.no-genres"));
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("preferredGenres", genres.join(","));
      console.log(genres.join(","));

      // Data submission
      const { data } = await editProfile(formData);
      if (!data || !data.success) throw new Error();
      router.back();
    } catch (error) {
      showError(getErrorMessage(error.code, i18n));
    }
    setIsLoading(false);
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

  if (isLoading || isEditLoading) return <Loading />;

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
