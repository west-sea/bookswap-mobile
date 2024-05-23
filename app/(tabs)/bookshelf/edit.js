import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import PageHeader from "../../../components/PageHeader";
import BookForm from "../../../components/book/BookForm";
import FormData from "form-data";
import { showError } from "../../../components/Toaster";

export default function Tab() {
  const { i18n } = useTranslation();
  const { bookId } = useLocalSearchParams();

  const [defaultBook, setDefaultBook] = useState(null);
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [exceptions, setExceptions] = useState([]);

  useEffect(() => {
    const mockBook = {
      title: "A little Life",
      author: "Yanagihara, Hanya",
      genre: "Novel",
      cover: "028e43d0783530373609309002fa405e.png",
      visibility: "EXCEPTIONAL_PUBLIC",
      exceptions: ["66309f8691d019ed240c646f", "66309f8691d019ed240c646d"],
    };
    setDefaultBook(mockBook);
    setCover(mockBook.cover);
    setTitle(mockBook.title);
    setAuthor(mockBook.author);
    setGenre(mockBook.genre);
    switch (visibility) {
      case "PUBLIC":
        setVisibility("public");
        break;
      case "EXCEPTIONAL_PUBLIC":
        setVisibility("public");
        break;
      case "PRIVATE":
        setVisibility("private");
        break;
      case "EXCEPTIONAL_PRIVATE":
        setVisibility("private");
        break;
    }
    if (mockBook.exceptions && mockBook.exceptions.length > 0) {
      // fetch each user from exception & setExceptions
      const defaultExceptions = [];
      for (let e of mockBook.exceptions) {
        // defaultExceptions.push({
        //     userId: e,
        //     username: "John Doe",
        //     avatar: "https://example.com/avatar.jpg",
        // });
      }
      setExceptions(defaultExceptions);
    }
  }, []);

  const handleSave = () => {
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
    if (cover !== defaultBook.cover) {
      const filename = cover.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      const coverImage = {
        uri: cover,
        name: filename,
        type,
      };
      data.append("cover", coverImage);
    }
    if (title !== defaultBook.title) {
      data.append("title", title);
    }
    if (author !== defaultBook.author) {
      data.append("author", author);
    }
    if (genre !== defaultBook.genre) {
      data.append("genre", genre);
    }
    let visibilityUpdated = visibility.toUpperCase();
    if (exceptions.length > 0) {
      if (visibilityUpdated === "PUBLIC") {
        visibilityUpdated = "EXCEPTIONAL_PUBLIC";
      } else {
        visibilityUpdated = "EXCEPTIONAL_PRIVATE";
      }
    }
    if (visibilityUpdated !== defaultBook.visibility) {
      data.append("visibility", visibilityUpdated);
    }
    const exceptionsUpdated = exceptions.map((item) => item.userId);
    if (exceptionsUpdated !== defaultBook.exceptions) {
      data.append("exceptions", JSON.stringify(exceptionsUpdated));
    }
    console.log(data);
    // TODO: upload cover and data to server
    console.log("Saved");
    router.back();
  };

  return (
    <View>
      <PageHeader
        title={i18n.t("editBook.title")}
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
              {i18n.t("editBook.save")}
            </Text>
          </TouchableOpacity>
        }
      />
      <BookForm
        states={{
          cover,
          title,
          author,
          genre,
          visibility,
          exceptions,
        }}
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
