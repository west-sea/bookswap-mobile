import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import PageHeader from "../../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { Entypo, Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { api } from "../../../store/api";
import Loading from "../../../components/Loading";
import { showError } from "../../../components/Toaster";
import { handleApiError } from "../../../store/utils";

export default function Tab() {
  const params = useLocalSearchParams();
  const { bookId } = params;
  const {
    data: apiData,
    error: apiError,
    isLoading: apiLoading,
  } = api.useGetBookExchangesQuery(bookId);

  const { i18n } = useTranslation();

  const [book, setBook] = useState(null);
  const [requests, setRequests] = useState([]);

  // Error handler
  useEffect(() => {
    const error = apiError;
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [apiError]);

  // Initial data loader
  useEffect(() => {
    if (!apiData || !apiData.success) return;
    setBook(apiData.data.book);
    setRequests(apiData.data.exchanges);
  }, [apiData]);

  if (!book || apiLoading) return <Loading />;

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <PageHeader title={i18n.t("requests.title")} />
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <BookInfo book={book} count={requests.length} />
      </View>
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
          {i18n.t("requests.select")}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}
        data={requests}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => <RequestedUser exchange={item} book={book} />}
      />
    </View>
  );
}

function RequestedUser({ exchange, book }) {
  const date = dayjs().to(dayjs(exchange.createdAt), true);
  const user = exchange.requestedBy;
  const { i18n } = useTranslation();

  const handleSelect = () => {
    router.push({
      pathname: "bookshelf/user",
      params: {
        exchangeId: exchange.exchangeId,
        userId: user.userId,
        nickname: user.nickname,
        avatar: user.avatar,
        offeredBookTitle: book.title,
        offeredBookCover: book.cover,
      },
    });
  };

  return (
    <View style={{ flexDirection: "row", gap: 8, alignContent: "center" }}>
      <Image
        src={getAvatarUrl(user.avatar)}
        style={{ width: 50, height: 50, borderRadius: 500 }}
      />
      <View
        style={{
          flexGrow: 1,
          justifyContent: "space-evenly",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {user.nickname}
        </Text>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 14,
            color: "#6E7A9F",
          }}
        >
          {date}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={handleSelect}
          style={{
            backgroundColor: "#DEE1EB",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 16, fontWeight: "500" }}
          >
            {i18n.t("requests.selectUser")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function BookInfo({ book, count }) {
  const i18n = useTranslation();

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
          <Text style={{ color: "#6E7A9F" }}>{book.genre}</Text>
        </View>
        {/* Status */}
        <ActionButton
          label={i18n.t("requests.count", { count })}
          bgColor={"#F2F3F7"}
          textColor={"#6E7A9F"}
          disabled={true}
        />
      </View>
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
        borderRadius: 8,
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
