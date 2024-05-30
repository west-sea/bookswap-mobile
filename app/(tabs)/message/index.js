import { Ionicons, Octicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { api } from "../../../store/api";
import Loading from "../../../components/Loading";
import { showError } from "../../../components/Toaster";
import { handleApiError } from "../../../store/utils";
import { shorten } from "../../../components/book/BookItem";

export default function Tab() {
  const {
    data: apiData,
    error: apiError,
    isLoading: apiLoading,
  } = api.useGetChatsQuery();
  const {
    data: meData,
    error: meError,
    isLoading: meLoading,
  } = api.useGetMeQuery();
  const { i18n } = useTranslation();
  const [me, setMe] = useState(null);
  const [chats, setChats] = useState([]);

  // Error handler
  useEffect(() => {
    const error = apiError || meError;
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [apiError, meError]);

  // Initial data loader
  useEffect(() => {
    if (!apiData || !apiData.success) return;
    if (!meData || !meData.success) return;
    setMe(meData.data);
    setChats(apiData.data.chats);
  }, [apiData, meData]);

  if (!me || meLoading || apiLoading) return <Loading />;

  return (
    <View
      style={{
        justifyContent: "center",
        padding: 16,
        flex: 1,
      }}
    >
      <FlatList
        contentContainerStyle={{
          gap: 8,
        }}
        ListEmptyComponent={NoChatsFound}
        data={chats}
        renderItem={({ item }) => <Chat chat={item} me={me} />}
        keyExtractor={(_, i) => i}
      />
    </View>
  );
}

export function Chat({ chat, me }) {
  const { i18n } = useTranslation();
  const doIOffer = chat.offeredBy.userId === me.userId;
  const chatTitle = doIOffer
    ? chat.requestedBy.nickname
    : chat.offeredBy.nickname;
  const latestMessageDate = chat.latestMessage?.text
    ? dayjs().to(dayjs(chat.latestMessage.createdAt), true)
    : i18n.t("chats.now");
  const firstBookCover = doIOffer
    ? chat.exchangedBook.cover
    : chat.offeredBook.cover;
  const firstOwnerCover = doIOffer
    ? chat.requestedBy.avatar
    : chat.offeredBy.avatar;
  const secondBookCover = doIOffer
    ? chat.offeredBook.cover
    : chat.exchangedBook.cover;
  const isLastMessageSeen = chat.latestMessage?.text
    ? chat.latestMessage.sender === me.userId
      ? true
      : chat.latestMessage.seen
    : true;

  const handleChatSelection = () => {
    router.push({
      pathname: "message/chat",
      params: { exchangeId: chat.exchangeId },
    });
  };

  return (
    <TouchableOpacity
      onPress={handleChatSelection}
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 4,
        padding: 4,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      {/* Chat cover */}
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          padding: 8,
          borderRadius: 10,
          backgroundColor: "#f2f3f7",
        }}
      >
        {/* First book pic */}
        <Image
          src={getAvatarUrl(firstBookCover)}
          style={{ width: 60, height: 80, borderRadius: 3 }}
        />
        {/* Second book pic */}
        <Image
          src={getAvatarUrl(secondBookCover)}
          style={{ width: 60, height: 80, borderRadius: 3 }}
        />
        {/* Owner pic */}
        <Image
          src={getAvatarUrl(firstOwnerCover)}
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
            position: "absolute",
            left: 50,
            top: 30,
          }}
        />
      </View>
      {/* Chat info  */}
      <View
        style={{
          justifyContent: "flex-start",
          flexGrow: 1,
          paddingVertical: 12,
          paddingLeft: 4,
          paddingRight: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          {/* Owner name */}
          <Text style={{ fontWeight: "bold", fontSize: 18, flexShrink: 1 }}>
            {shorten(chatTitle)}
          </Text>
          {/* Last message date */}
          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              color: "#6E7A9F",
            }}
          >
            {latestMessageDate}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Last message text */}
          <Text
            style={{
              fontWeight: isLastMessageSeen ? "normal" : "500",
              flexShrink: 1,
            }}
          >
            {shorten(
              chat.latestMessage?.text
                ? chat.latestMessage.text
                : i18n.t("chats.write")
            )}
          </Text>
          {/* Is Last message seen indicator */}
          {!isLastMessageSeen && <UnseenIndicator />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function NoChatsFound() {
  const i18n = useTranslation();
  return (
    <View style={{ alignItems: "center", gap: 8, paddingVertical: 16 }}>
      <Octicons name="inbox" size={36} color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {i18n.t("chats.empty")}
      </Text>
      <Text style={{ fontSize: 16, color: "#6E7A9F" }}>
        {i18n.t("chats.empty-feedback")}
      </Text>
    </View>
  );
}

function UnseenIndicator() {
  return <Ionicons name="ellipse" size={12} color="#FF6746" />;
}
