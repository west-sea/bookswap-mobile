import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getAvatarUrl } from "../users/Avatar";
import { showError, showInfo } from "../Toaster";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import GenreSelector from "../input/GenreSelector";
import OptionsModal from "./Modal";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { api } from "../../store/api";
import { router } from "expo-router";
import { getErrorMessage, handleApiError } from "../../store/utils";

export default function BookForm({
  states: { cover, title, author, genre, visibility, exceptions },
  setStates: {
    setCover,
    setTitle,
    setAuthor,
    setGenre,
    setVisibility,
    setExceptions,
  },
}) {
  const { i18n } = useTranslation();

  return (
    <View style={{ gap: 24, paddingHorizontal: 32, paddingVertical: 16 }}>
      <CoverField onChange={setCover} cover={cover} />
      <TextField
        label={i18n.t("upload.fields.title")}
        onChange={setTitle}
        value={title}
      />
      <TextField
        label={i18n.t("upload.fields.author")}
        onChange={setAuthor}
        value={author}
      />
      <GenreField selectedGenre={genre} setSelectedGenre={setGenre} />
      <VisibilityField visibility={visibility} onChange={setVisibility} />
      <ExceptionsField
        visibility={visibility}
        exceptions={exceptions}
        setExceptions={setExceptions}
      />
    </View>
  );
}

function CoverField({ cover, onChange }) {
  const { i18n } = useTranslation();

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.2,
      aspect: [3, 4],
    });
    if (!result.canceled) {
      onChange(result.assets[0].uri);
    } else {
      showInfo(i18n.t("upload.invalid.coverCancel"));
      return;
    }
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, flexBasis: "30%" }}>
        {i18n.t("upload.fields.cover")}
      </Text>
      <View>
        <View>
          {cover ? (
            <Image
              src={cover.startsWith("file://") ? cover : getAvatarUrl(cover)}
              style={{
                width: 120,
                height: 160,
              }}
            />
          ) : (
            <View
              style={{ width: 120, height: 160, backgroundColor: "#F2F3F7" }}
            ></View>
          )}
          <TouchableOpacity
            onPress={handleImageUpload}
            style={{
              backgroundColor: "#40B250",
              padding: 8,
              borderRadius: 500,
              borderWidth: 5,
              borderColor: "white",
              position: "absolute",
              bottom: -12,
              right: -12,
            }}
          >
            <Ionicons name="camera" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function TextField({ label, onChange, ...props }) {
  const { i18n } = useTranslation();

  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, flexBasis: "30%" }}>
        {label}
      </Text>
      <TextInput
        style={{
          flexGrow: 1,
          borderWidth: 1,
          fontSize: 16,
          borderColor: "#DEE1EB",
          borderRadius: 500,
          paddingHorizontal: 12,
          maxWidth: "80%",
        }}
        onChangeText={onChange}
        {...props}
      />
    </View>
  );
}

function GenreField({ selectedGenre, setSelectedGenre }) {
  const { i18n } = useTranslation();

  return (
    <View style={{ flexDirection: "column", gap: 8 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {i18n.t("upload.fields.genre")}
      </Text>
      <GenreSelector
        selectedGenres={[selectedGenre]}
        toggleGenreSelection={setSelectedGenre}
      />
    </View>
  );
}

function VisibilityField({ visibility, onChange }) {
  const { i18n } = useTranslation();
  const isPrivate = visibility === "private";

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {i18n.t("upload.fields.visibility")}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: !isPrivate ? "#6E7A9F" : "#DEE1EB",
            borderRadius: 500,
            paddingVertical: 8,
            paddingHorizontal: 16,
            flexDirection: "row",
          }}
          onPress={() => onChange("public")}
        >
          <Text style={{ color: !isPrivate ? "white" : "black", fontSize: 16 }}>
            {i18n.t("upload.fields.visibilityOptions.public")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: isPrivate ? "#6E7A9F" : "#DEE1EB",
            borderRadius: 500,
            paddingVertical: 8,
            paddingHorizontal: 16,
            flexDirection: "row",
          }}
          onPress={() => onChange("private")}
        >
          <Text style={{ color: isPrivate ? "white" : "black", fontSize: 16 }}>
            {i18n.t("upload.fields.visibilityOptions.private")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ExceptionsField({ visibility, exceptions, setExceptions }) {
  const { i18n } = useTranslation();

  const [isModalShown, setIsModalShown] = useState(false);

  const addExceptions = (users) => {
    setIsModalShown(false);
    let newUsers = [];
    for (let user of users) {
      if (exceptions.some((item) => item.userId === user.userId)) continue;
      else newUsers.push(user);
    }
    setExceptions([...exceptions, ...newUsers]);
  };

  const removeException = (userId) => {
    setExceptions(exceptions.filter((item) => item.userId !== userId));
  };

  return (
    <View style={{ gap: 8 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {i18n.t(`upload.fields.exceptions.${visibility}`)}
        </Text>
        <TouchableOpacity
          onPress={() => setIsModalShown(true)}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 6,
            flexDirection: "row",
            gap: 4,
            backgroundColor: "#40B250",
            borderRadius: 500,
          }}
        >
          <Ionicons name="person-add" size={16} color="white" />
        </TouchableOpacity>
        <OptionsModal
          isVisible={isModalShown}
          onClose={() => setIsModalShown(false)}
          header={i18n.t(`upload.fields.exception.choose`)}
          bgColor={"#F2F3F7"}
        >
          <UserSelector onSelect={addExceptions} />
        </OptionsModal>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          gap: 4,
        }}
        data={exceptions}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => (
          <ExceptionUser user={item} onRemove={removeException} />
        )}
      />
    </View>
  );
}

function ExceptionUser({ user, onRemove }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#DEE1EB",
        borderRadius: 500,
        gap: 4,
      }}
    >
      <Text style={{ fontSize: 16 }}>{user.nickname}</Text>
      <TouchableOpacity onPress={() => onRemove(user.userId)}>
        <Ionicons name="close-circle" size={16} color="#6E7A9F" />
      </TouchableOpacity>
    </View>
  );
}

function UserSelector({ onSelect }) {
  const { i18n } = useTranslation();
  const [text, setText] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUsers, { isLoading, error }] = api.useSearchUsersMutation();

  useEffect(() => {
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [error]);

  const onSearch = async () => {
    if (text.length < 3) return;
    // TODO: fetch users from api
    try {
      const { data } = await searchUsers(text);
      if (!data || !data.success) {
        showError(i18n.t("errors.UNKNOWN_ERROR"));
      } else {
        setUsers(data.data.users);
      }
    } catch (error) {
      showError(getErrorMessage(error.code, i18n));
    }
  };

  const selectUser = (user) => {
    if (selectedUsers.some((item) => item.userId === user.userId)) return;
    setSelectedUsers([...selectedUsers, user]);
  };

  const removeUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((item) => item.userId !== userId));
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => onSelect(selectedUsers)}
          style={{
            backgroundColor: selectedUsers.length > 0 ? "#40B250" : "#AFEEB8",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 500,
          }}
          disabled={selectedUsers.length < 1}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            {i18n.t("upload.fields.exception.addSelected")}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          flexDirection: "row",
          gap: 4,
        }}
        data={selectedUsers}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => (
          <ExceptionUser user={item} onRemove={removeUser} />
        )}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
              flexGrow: 1,
            }}
          >
            {i18n.t("upload.fields.exception.empty")}
          </Text>
        }
      />
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          paddingHorizontal: 24,
          paddingVertical: 12,
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#DEE1EB",
            borderRadius: 500,
            paddingHorizontal: 12,
            fontSize: 16,
            flexGrow: 1,
          }}
          onChangeText={setText}
          onSubmitEditing={onSearch}
        />
        <TouchableOpacity
          onPress={onSearch}
          style={{
            padding: 8,
            backgroundColor: isLoading ? "#AFEEB8" : "#40B250",
            borderRadius: 500,
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Ionicons name="search" size={18} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ height: 300 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 12,
            gap: 8,
          }}
          data={users}
          keyExtractor={(_, i) => i}
          renderItem={({ item }) => (
            <View
              style={{ flexDirection: "row", alignContent: "center", gap: 16 }}
            >
              <Image
                src={getAvatarUrl(item.avatar)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 500,
                }}
              />
              <View
                style={{
                  flexGrow: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "500", fontSize: 16 }}>
                  {item.nickname}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => selectUser(item)}
                style={{
                  backgroundColor: "#DEE1EB",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 500,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                  }}
                >
                  {i18n.t("upload.fields.exception.select")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "500" }}
            >
              {i18n.t("upload.fields.exception.emptySearch")}
            </Text>
          }
        />
      </View>
    </View>
  );
}
