import { Octicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { getAvatarUrl } from "../users/Avatar";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import OptionsModal from "./Modal";
import { capitalize } from "./BookItem";
import { api } from "../../store/api";
import { showError } from "../Toaster";
import { handleApiError } from "../../store/utils";
import Loading from "../Loading";

export default function Bookshelf({ books }) {
  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingVertical: 12,
        gap: 16,
      }}
      ListEmptyComponent={EmptyBookshelf}
      data={books}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <MyBookItem book={item} />}
    />
  );
}

function MyBookItem({ book }) {
  const [deleteBook, { isLoading, error }] = api.useDeleteBookMutation();
  const i18n = useTranslation();

  const isPrivate = book.visibility === "PRIVATE";
  const isExceptionalPrivate = book.visibility === "EXCEPTIONAL_PRIVATE";
  const isPublic = book.visibility === "PUBLIC";
  const isExceptionalPublic = book.visibility === "EXCEPTIONAL_PUBLIC";

  const [isModalShown, setIsModalShown] = useState(false);

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

  const handleSeeRequests = () => {
    setIsModalShown(false);
    router.push({
      pathname: "bookshelf/requests",
      params: {
        bookId: book.bookId,
      },
    });
  };

  const handleEdit = () => {
    setIsModalShown(false);
    router.push({
      pathname: "bookshelf/edit",
      params: {
        bookId: book.bookId,
      },
    });
  };

  const handleDelete = async () => {
    const { data } = await deleteBook(book.bookId);
    setIsModalShown(false);
    if (!data || !data.success) {
      showError(i18n.t("bookshelf.delete-error"));
      return;
    }
  };

  if (isLoading) return <Loading />;

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 16,
        padding: 4,
      }}
    >
      {/* Cover image */}
      <Image
        src={getAvatarUrl(book.cover)}
        style={{ width: 75, height: 100 }}
      />
      {/* Book info */}
      <View style={{ gap: 4, justifyContent: "space-around", flexGrow: 1 }}>
        {/* Title */}
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>{book.title}</Text>
        {/* Author */}
        <Text style={{ fontSize: 14 }}>{book.author}</Text>
        {/* Descriptors */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Date posted to the system */}
          <Text style={{ color: "#6E7A9F" }}>
            {dayjs(book.createdAt).format("MM/DD")}
          </Text>
          <Entypo name="dot-single" size={12} color="#6E7A9F" />
          {/* Genre */}
          <Text style={{ color: "#6E7A9F" }}>{capitalize(book.genre)}</Text>
        </View>
        {/* Status */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          {(isPrivate || isExceptionalPrivate) && (
            <ActionButton
              label={i18n.t("bookshelf.private")}
              icon={<Entypo name="lock" size={14} color="white" />}
              bgColor={"#6E7A9F"}
              textColor={"white"}
              disabled={true}
            />
          )}
          {(isPublic || isExceptionalPublic) && (
            <ActionButton
              label={i18n.t("bookshelf.public")}
              icon={<Ionicons name="lock-open" size={14} color="white" />}
              bgColor={"#6E7A9F"}
              textColor={"white"}
              disabled={true}
            />
          )}
          {isExceptionalPrivate && (
            <Text style={{ color: "#6E7A9F" }}>
              {i18n.t("bookshelf.shownTo", {
                count: book.exceptions?.length || 0,
              })}
            </Text>
          )}
          {isExceptionalPublic && (
            <Text style={{ color: "#6E7A9F" }}>
              {i18n.t("bookshelf.hiddenFrom", {
                count: book.exceptions?.length || 0,
              })}
            </Text>
          )}
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => setIsModalShown(true)}>
          <Ionicons name="ellipsis-horizontal" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <OptionsModal
        header={i18n.t("bookshelf.options")}
        isVisible={isModalShown}
        onClose={() => setIsModalShown(false)}
      >
        <TouchableOpacity
          onPress={handleSeeRequests}
          style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        >
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            See requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleEdit}
          style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        >
          <Text style={{ fontSize: 18, textAlign: "center" }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        >
          <Text style={{ fontSize: 18, textAlign: "center", color: "red" }}>
            Delete
          </Text>
        </TouchableOpacity>
      </OptionsModal>
    </View>
  );
}

function ActionButton({
  bgColor,
  textColor,
  label,
  icon,
  onPress = () => {},
  disabled = false,
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 40,
        flexDirection: "row",
        gap: 4,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={{ color: textColor }}>{label}</Text>
      {icon && icon}
    </TouchableOpacity>
  );
}

function EmptyBookshelf() {
  const i18n = useTranslation();
  return (
    <View
      style={{
        alignItems: "center",
        gap: 8,
        paddingVertical: 16,
      }}
    >
      <Octicons name="inbox" size={36} color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {i18n.t("bookshelf.empty")}
      </Text>
      <Text style={{ fontSize: 16, color: "#6E7A9F" }}>
        {i18n.t("bookshelf.empty-feedback")}
      </Text>
    </View>
  );
}
