import { StyleSheet, View, Text } from "react-native";
import Button from "../../components/buttons/Button";
import ImageSelector, {
  defaultAvatars,
} from "../../components/input/ImageSelector";
import GenreSelector from "../../components/input/GenreSelector";
import InputText from "../../components/input/InputText";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import api from "../../api";
import { getErrorMessage } from "../../api/error-codes";
import { showError } from "../../components/Toaster";
import FormData from "form-data";
import { useSession } from "../../contexts/auth.ctx";
import { useTranslation } from "react-i18next";

export default function BoardingPage() {
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
    const data = new FormData();
    data.append("nickname", nickname);
    data.append("email", params?.email);
    data.append("userId", params?.userId);
    data.append("preferredGenres", JSON.stringify(preferredGenres));
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
    data.append("avatar", avatarImage);
    const result = await api.auth.board(data);
    // const result = { code: 0 };
    if (!result || result?.code || !result?.token) {
      // IF error, handle error
      const message = getErrorMessage(result.code, i18n);
      showError(message);
      return;
    }
    signIn(result.token);
    router.push({
      pathname: "/auth/welcome",
      params: {
        name: params?.name,
      },
    });
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
            disabled={preferredGenres.length === 0}
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
