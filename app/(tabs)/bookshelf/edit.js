import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import PageHeader from "../../../components/PageHeader";
import BookForm from "../../../components/book/BookForm";
import FormData from "form-data";
import { showError } from "../../../components/Toaster";
import { api } from "../../../store/api";
import { getErrorMessage, handleApiError } from "../../../store/utils";
import Loading from "../../../components/Loading";

export default function Tab() {
  const { bookId } = useLocalSearchParams();
  const {
    data,
    isLoading: isBookLoading,
    error: bookError,
  } = api.useGetBookQuery(bookId);
  const [editBook, { isLoading: isEditLoading, error: editError }] =
    api.useEditBookMutation();
  const { i18n } = useTranslation();

  const [defaultBook, setDefaultBook] = useState(null);
  const [cover, setCover] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [exceptions, setExceptions] = useState([]);

  // Error handler
  useEffect(() => {
    const error = bookError || editError;
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [bookError, editError]);

  // Initial data loader
  useEffect(() => {
    if (!data || !data.success) return;
    let { book } = data.data;
    book = {
      ...book,
      cover: book.cover.filename,
    };
    setDefaultBook(book);
    setCover(book.cover);
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    switch (book.visibility) {
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
    setExceptions(book.exceptions);
  }, [data]);

  const handleSave = async () => {
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
    try {
      // Data preparation
      const data = new FormData();
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
      if (exceptions !== defaultBook.exceptions) {
        if (exceptions.length > 0) {
          data.append("exceptions", exceptionsUpdated.join(","));
        } else {
          data.append("exceptions", "empty");
        }
      }
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
      if (data._parts.length === 0) {
        showError(i18n.t("errors.NO_CHANGES"));
        return;
      }
      const { data: apiData } = await editBook({ id: bookId, body: data });
      if (!apiData || !apiData.success) {
        showError(i18n.t("errors.UNKNOWN_ERROR"));
      } else {
        router.back();
      }
    } catch (error) {
      showError(getErrorMessage(error.code, i18n));
    }
  };

  if (isBookLoading || isEditLoading) return <Loading />;

  return (
    <ScrollView>
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
    </ScrollView>
  );
}
