import { Ionicons, Octicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Tab() {
  const mockChats = [
    {
      exchangeId: "66309f8691d019ed240c646f",
      offeredBook: {
        title: "Harry Potter",
        cover: "028e43d0783530373609309002fa405e.png",
      },
      offeredBy: {
        userId: "66309f8691d019ed240c646f",
        nickname: "genius",
        avatar: "Profile1.png",
      },
      exchangedBook: {
        title: "Justice",
        cover: "028e43d0783530373609309002fa405e.png",
      },
      requestedBy: {
        userId: "66309f8691d019ed240c646f",
        nickname: "fool",
        avatar: "Profile2.jpg",
      },
      latestMessage: {
        text: "Bye bye",
        createdAt: "2024-05-21T12:42:18.179+00:00",
        seen: false,
      },
    },
    {
      exchangeId: "66309f8691d019ed240c646f",
      offeredBook: {
        title: "Harry Potter",
        cover: "028e43d0783530373609309002fa405e.png",
      },
      offeredBy: {
        userId: "66309f8691d019ed240c646f",
        nickname: "genius",
        avatar: "Profile1.png",
      },
      exchangedBook: {
        title: "Justice",
        cover: "028e43d0783530373609309002fa405e.png",
      },
      requestedBy: {
        userId: "66309f8691d019ed240c646f",
        nickname: "fool",
        avatar: "Profile2.jpg",
      },
      latestMessage: {
        text: "Bye bye",
        createdAt: "2024-05-21T12:42:18.179+00:00",
        seen: true,
      },
    },
  ];

  const [chats, setChats] = useState(mockChats);
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
        renderItem={({ item }) => <Chat chat={item} />}
        keyExtractor={(_, i) => i}
      />
    </View>
  );
}

export function Chat({ chat }) {
  const doIOffer = chat.offeredBy.userId === "myuserId";
  const chatTitle = doIOffer
    ? chat.requestedBy.nickname
    : chat.offeredBy.nickname;
  const latestMessageDate = dayjs().to(
    dayjs(chat.latestMessage.createdAt),
    true
  );
  const firstBookCover = doIOffer
    ? chat.exchangedBook.cover
    : chat.offeredBook.cover;
  const firstOwnerCover = doIOffer
    ? chat.requestedBy.avatar
    : chat.offeredBy.avatar;
  const secondBookCover = doIOffer
    ? chat.offeredBook.cover
    : chat.exchangedBook.cover;
  const isLastMessageSeen = chat.latestMessage.seen;

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
          gap: 24,
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
          padding: 8,
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
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{chatTitle}</Text>
          {/* Last message date */}
          <Text style={{ fontWeight: "400", fontSize: 14, color: "#6E7A9F" }}>
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
          <Text style={{ fontWeight: isLastMessageSeen ? "normal" : "500" }}>
            {chat.latestMessage.text}
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
