import { View, Text, TouchableOpacity } from "react-native";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import FormData from "form-data";
import { showError, showSuccess } from "../../components/Toaster";
import { router } from "expo-router";
import BookForm from "../../components/book/BookForm";
import { api } from "../../store/api";
import { getErrorMessage, handleApiError } from "../../store/utils";
import Loading from "../../components/Loading";

export default function Tab() {
  const [uploadBook, { isLoading: isUploadLoading, error }] =
    api.useUploadBookMutation();
  const [isLoading, setIsLoading] = useState(false);
  const { i18n } = useTranslation();

  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [exceptions, setExceptions] = useState([]);

  // Error handler
  useEffect(() => {
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [error]);

  const handleCreate = async () => {
    // Validation
    if (!cover) {
      showError(i18n.t("upload.invalid.cover"));
      return;
    }
    if (!title || title.length < 3) {
      showError(i18n.t("upload.invalid.title"));
      return;
    }
    if (!author) {
      showError(i18n.t("upload.invalid.author"));
      return;
    }
    if (!genre) {
      showError(i18n.t("upload.invalid.genre"));
      return;
    }
    if (!visibility) {
      showError(i18n.t("upload.invalid.visibility"));
      return;
    }
    setIsLoading(true);
    try {
      // Data preparation
      const data = new FormData();
      const filename = cover.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      const coverImage = {
        uri: cover,
        name: filename,
        type,
      };
      data.append("cover", coverImage);
      data.append("title", title);
      data.append("author", author);
      data.append("genre", genre);
      let visibilityUpdated = visibility.toUpperCase();
      if (exceptions.length > 0) {
        if (visibilityUpdated === "PUBLIC") {
          visibilityUpdated = "EXCEPTIONAL_PUBLIC";
        } else {
          visibilityUpdated = "EXCEPTIONAL_PRIVATE";
        }
      }
      data.append("visibility", visibilityUpdated);
      data.append(
        "exceptions",
        exceptions.map((item) => item.userId).join(",")
      );
      // Data submission
      const { data: apiData } = await uploadBook(data);
      if (!apiData || !apiData.success) throw new Error();
      showSuccess(i18n.t("upload.success"));
      router.back();
      setCover(null);
      setTitle("");
      setAuthor("");
      setGenre(null);
      setVisibility("public");
      setExceptions([]);
    } catch (error) {
      showError(getErrorMessage(error.code, i18n));
    }
    setIsLoading(false);
  };

  if (isLoading || isUploadLoading) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <PageHeader
        title={i18n.t("upload.title")}
        actionButton={
          <TouchableOpacity
            onPress={handleCreate}
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
              {i18n.t("upload.save")}
            </Text>
          </TouchableOpacity>
        }
      />
      <BookForm
        states={{ cover, title, author, genre, visibility, exceptions }}
        setStates={{
          setCover,
          setTitle,
          setAuthor,
          setGenre,
          setVisibility,
          setExceptions,
        }}
      />
    </View>
  );
}
