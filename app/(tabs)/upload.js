import { View, Text, TouchableOpacity } from "react-native";
import PageHeader from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import FormData from "form-data";
import { showError } from "../../components/Toaster";
import { router } from "expo-router";
import BookForm from "../../components/book/BookForm";

export default function Tab() {
  const { i18n } = useTranslation();

  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [exceptions, setExceptions] = useState([]);

  const handleCreate = () => {
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
      JSON.stringify(exceptions.map((item) => item.userId))
    );
    console.log(data);
    // TODO: upload cover and data to server
    console.log("Created");
    router.back();
  };

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
