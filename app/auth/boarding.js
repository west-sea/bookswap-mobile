import { StyleSheet, View, Text } from "react-native";
import Button from "../../components/buttons/Button";
import ImageSelector, {
  defaultAvatars,
} from "../../components/input/ImageSelector";
import GenreSelector from "../../components/input/GenreSelector";
import InputText from "../../components/input/InputText";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { showError } from "../../components/Toaster";
import FormData from "form-data";
import { useSession } from "../../contexts/auth.ctx";
import { useTranslation } from "react-i18next";
import { api } from "../../store/api";
import { handleApiError, getErrorMessage } from "../../store/utils";

export default function BoardingPage() {
  const [board, { error, isLoading }] = api.useBoardMutation();
  const params = useLocalSearchParams();
  const [nickname, setNickname] = useState(
    params?.email.toLowerCase().split("@")[0] || "booklover"
  );
  const [preferredGenres, setPreferredGenres] = useState([]);
  const [avatar, setAvatar] = useState(defaultAvatars[0].id);
  const [customAvatar, setCustomAvatar] = useState(null);
  const [isGenreView, setIsGenreView] = useState(false);
  const { signIn } = useSession();
  const i18n = useTranslation();

  useEffect(() => {
    if (!error) return;
    handleApiError(error, i18n);
  }, [error]);

  const onNicknameChange = (nickname) => {
    setNickname(nickname ? nickname.trim() : "");
  };

  const onGenreSelection = (genre) => {
    if (preferredGenres.includes(genre)) {
      setPreferredGenres((prev) => prev.filter((g) => g !== genre));
    } else {
      setPreferredGenres((prev) => [...prev, genre]);
    }
  };

  const onAvatarChange = (avatar) => {
    setAvatar(avatar);
  };

  const onBoardComplete = async () => {
    try {
      // Data preparation
      const formData = new FormData();
      formData.append("nickname", nickname);
      formData.append("email", params?.email);
      formData.append("userId", params?.userId);
      formData.append("preferredGenres", JSON.stringify(preferredGenres));
      let avatarImage = {};
      if (typeof avatar === "string") {
        const filename = avatar.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        avatarImage = {
          uri: avatar,
          name: filename,
          type,
        };
      } else {
        const defaultAvatar = defaultAvatars.find((item) => item.id === avatar);
        avatarImage = defaultAvatar.filename;
      }
      formData.append("avatar", avatarImage);
      // Data submission
      let { data } = await board(formData);
      if (!data || !data.success) throw new Error();
      data = data.data;
      signIn(data.token, data.user);
      router.push({
        pathname: "/auth/welcome",
        params: {
          name: params?.name,
        },
      });
    } catch (error) {
      if (!error) {
        showError(i18n.t("errors.UNKNOWN_ERROR"));
      } else {
        showError(getErrorMessage(error.code, i18n));
      }
    }
  };

  return (
    <View style={styles.outer}>
      {!isGenreView && (
        <View style={styles.container}>
          {/* Welcome text */}
          <View>
            <Text style={styles.text}>{i18n.t("boarding.welcome")}</Text>
            <Text style={styles.text}>{i18n.t("boarding.query")}</Text>
          </View>
          {/* Profile image selector */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>{i18n.t("boarding.avatar")}</Text>
            <ImageSelector
              selectedImage={avatar}
              onImageSelect={onAvatarChange}
              customAvatar={customAvatar}
              onCustomAvatarChange={setCustomAvatar}
            />
          </View>
          {/* Nickname input */}
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>{i18n.t("boarding.nickname")}</Text>
            <InputText
              defaultValue={nickname}
              onChangeText={onNicknameChange}
            />
          </View>
        </View>
      )}
      {isGenreView && (
        <View style={styles.container}>
          <Text style={styles.text}>{i18n.t("boarding.genre")}</Text>
          {/* Genre selector */}
          <View style={styles.field}>
            <GenreSelector
              selectedGenres={preferredGenres}
              toggleGenreSelection={onGenreSelection}
            />
          </View>
        </View>
      )}
      <View style={styles.button}>
        {isGenreView ? (
          <Button
            label={i18n.t("boarding.complete")}
            onPress={onBoardComplete}
            disabled={preferredGenres.length === 0 || isLoading}
          />
        ) : (
          <Button
            label={i18n.t("boarding.next")}
            onPress={() => setIsGenreView(true)}
            disabled={!nickname}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  text: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 32,
  },
  field: {
    textAlign: "left",
    width: "80%",
    gap: 8,
  },
  fieldLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    marginBottom: 50,
    alignItems: "center",
  },
});
