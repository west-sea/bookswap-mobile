import PageHeader from "../../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Modal,
} from "react-native";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { showError, showSuccess } from "../../../components/Toaster";
import OptionsModal from "../../../components/book/Modal";
import SwapSvg from "../../../assets/svg/swap.svg";
import { api } from "../../../store/api";
import { getErrorMessage, handleApiError } from "../../../store/utils";
import Loading from "../../../components/Loading";
import { capitalize } from "../../../components/book/BookItem";

export default function Tab() {
  const mockBooks = [
    {
      title: "Me Before You",
      author: "JoJo Moyes",
      genre: "Novel",
      createdAt: "2024-05-03T12:42:18.179Z",
      bookId: "6634dbaaaf67fac193ebb5f8",
      cover: "028e43d0783530373609309002fa405e.png",
    },
    {
      title: "Me Before You",
      author: "JoJo Moyes",
      genre: "Novel",
      createdAt: "2024-05-04T08:39:19.470Z",
      bookId: "6635f437364f4c9412fa263f",
      cover: "028e43d0783530373609309002fa405e.png",
    },
  ];

  const params = useLocalSearchParams();
  const requestedUser = {
    userId: params.userId,
    nickname: params.nickname,
    avatar: params.avatar,
  };
  const offeredBook = {
    title: params.offeredBookTitle,
    cover: params.offeredBookCover,
  };
  const {
    data: bookshelfData,
    error: bookshelfError,
    isLoading: bookshelfLoading,
  } = api.useGetUserBookshelfQuery(params.userId);
  const {
    data: meData,
    error: meError,
    isLoading: meLoading,
  } = api.useGetMeQuery();
  const [acceptRequest, { error: acceptError, isLoading: acceptLoading }] =
    api.useAcceptRequestMutation();
  const { i18n } = useTranslation();

  const [offeredUser, setOfferedUser] = useState(null);
  const [books, setBooks] = useState([]);

  // Error handler
  useEffect(() => {
    const error = meError || bookshelfError || acceptError;
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [meError, bookshelfError, acceptError]);

  // Initial data loader
  useEffect(() => {
    if (!meData || !meData.success) return;
    if (!bookshelfData || !bookshelfData.success) return;
    const me = {
      userId: meData.data.userId,
      nickname: meData.data.nickname,
      avatar: meData.data.avatar,
    };
    setOfferedUser(me);
    setBooks(bookshelfData.data.books);
  }, [meData, bookshelfData]);

  const handleConfirmation = async (bookId) => {
    const body = { exchangeId: params.exchangeId, bookId };
    try {
      // Data submission
      const { data } = await acceptRequest(body);
      if (!data || !data.success) throw new Error();
      console.log(data);
      showSuccess(
        i18n.t("userBookshelf.success", { user: requestedUser.nickname })
      );
      router.replace("bookshelf");
    } catch (error) {
      showError(getErrorMessage(error.code, i18n));
    }
    // TODO: send request to api
  };

  if (!offeredUser || meLoading || bookshelfLoading || acceptLoading)
    return <Loading />;

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <PageHeader
        title={i18n.t("userBookshelf.title", { user: requestedUser.nickname })}
      />
      <View
        style={{
          paddingVertical: 8,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            backgroundColor: "#F2F3F7",
            color: "#6E7A9F",
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
          }}
        >
          {i18n.t("userBookshelf.select")}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}
        data={books}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => (
          <UserBookItem
            offeredUser={offeredUser}
            offeredBook={offeredBook}
            user={requestedUser}
            book={item}
            onConfirm={() => handleConfirmation(item.bookId)}
          />
        )}
      />
    </View>
  );
}

function UserBookItem({ book, onConfirm, offeredBook, offeredUser, user }) {
  const i18n = useTranslation();

  const [isModalShown, setIsModalShown] = useState(false);

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
        style={{ width: 75, height: 100, borderRadius: 4 }}
      />
      {/* Book info */}
      <View style={{ gap: 4, justifyContent: "space-around" }}>
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
        <View>
          <ActionButton
            label={i18n.t("userBookshelf.selectBook")}
            bgColor={"#DEE1EB"}
            textColor={"black"}
            onPress={() => setIsModalShown(true)}
          />
        </View>
      </View>
      <OptionsModal
        bgColor={"#F2F3F7"}
        header={i18n.t("userBookshelf.confirmation")}
        isVisible={isModalShown}
        onClose={() => setIsModalShown(false)}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 16,
              justifyContent: "center",
              gap: 24,
            }}
          >
            <View style={{ alignItems: "center", gap: 24 }}>
              <View>
                <Image
                  src={getAvatarUrl(offeredBook.cover)}
                  style={{
                    width: 75,
                    height: 100,
                    borderRadius: 4,
                  }}
                />
                <Image
                  src={getAvatarUrl(offeredUser.avatar)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 500,
                    position: "absolute",
                    bottom: -20,
                    right: -20,
                  }}
                />
              </View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {offeredBook.title}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <SwapSvg />
              <View style={{ height: 20 }}></View>
            </View>
            <View style={{ alignItems: "center", gap: 24 }}>
              <View>
                <Image
                  src={getAvatarUrl(book.cover)}
                  style={{
                    width: 75,
                    height: 100,
                    borderRadius: 4,
                  }}
                />
                <Image
                  src={getAvatarUrl(user.avatar)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 500,
                    position: "absolute",
                    bottom: -20,
                    left: -20,
                  }}
                />
              </View>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {book.title}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 16,
              justifyContent: "center",
              gap: 16,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsModalShown(false);
                onConfirm();
              }}
              style={{
                backgroundColor: "#40B250",
                paddingVertical: 8,
                paddingHorizontal: 32,
                borderRadius: 500,
              }}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
                {i18n.t("userBookshelf.confirm")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalShown(false)}
              style={{
                backgroundColor: "#DEE1EB",
                paddingVertical: 8,
                paddingHorizontal: 32,
                borderRadius: 500,
              }}
            >
              <Text style={{ color: "black", fontSize: 18, fontWeight: "500" }}>
                {i18n.t("userBookshelf.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
