import { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import PageHeader from "../../../components/PageHeader";

export default function NotificationsPage() {
  const mockNotifications = [
    {
      type: "ARCHIVE",
      // type: "REQUEST",
      // type: "APPROVE",
      // type: "EXCHNAGE",
      book: {
        bookId: "66366aca6e056ed36ce6cc72",
        cover: "028e43d0783530373609309002fa405e.png",
      },
      actor: {
        nickname: "genius",
        avatar: "Profile1.png",
      },
      seen: false,
      createdAt: "2024-05-04T17:13:33.087Z",
      notificationId: "66366cbd87d37569de408b7f",
      exchangeId: "663660611fe6f082aa9f9f26",
    },
    {
      // type: "ARCHIVE",
      type: "REQUEST",
      // type: "APPROVE",
      // type: "EXCHNAGE",
      book: {
        bookId: "66366aca6e056ed36ce6cc72",
        cover: "028e43d0783530373609309002fa405e.png",
      },
      actor: {
        nickname: "genius",
        avatar: "Profile1.png",
      },
      seen: false,
      createdAt: "2024-05-04T17:13:33.087Z",
      notificationId: "66366cbd87d37569de408b7f",
      exchangeId: "663660611fe6f082aa9f9f26",
    },
    {
      // type: "ARCHIVE",
      // type: "REQUEST",
      type: "APPROVE",
      // type: "EXCHNAGE",
      book: {
        bookId: "66366aca6e056ed36ce6cc72",
        cover: "028e43d0783530373609309002fa405e.png",
      },
      actor: {
        nickname: "genius",
        avatar: "Profile1.png",
      },
      seen: true,
      createdAt: "2024-05-04T17:13:33.087Z",
      notificationId: "66366cbd87d37569de408b7f",
      exchangeId: "663660611fe6f082aa9f9f26",
    },
    {
      // type: "ARCHIVE",
      // type: "REQUEST",
      // type: "APPROVE",
      type: "EXCHANGE",
      book: {
        bookId: "66366aca6e056ed36ce6cc72",
        cover: "028e43d0783530373609309002fa405e.png",
      },
      actor: {
        nickname: "genius",
        avatar: "Profile1.png",
      },
      seen: true,
      createdAt: "2024-05-04T17:13:33.087Z",
      notificationId: "66366cbd87d37569de408b7f",
      exchangeId: "663660611fe6f082aa9f9f26",
    },
  ];

  const { i18n } = useTranslation();

  const [notifications, setNotifications] = useState(mockNotifications);

  return (
    <View style={{ flex: 1 }}>
      <PageHeader title={i18n.t("notifications.header")} />
      {/* Content */}
      <FlatList
        ListEmptyComponent={NoNotificationsFound}
        showsVerticalScrollIndicator={false}
        data={notifications}
        keyExtractor={(_, id) => id}
        renderItem={({ item }) => <Notification notification={item} />}
      />
    </View>
  );
}

function Notification({ notification }) {
  const { i18n } = useTranslation();
  let text = i18n.t("notifications.default");
  const date = dayjs().to(dayjs(notification.createdAt), true);
  const seen = notification.seen;
  let action = null;
  switch (notification.type) {
    case "ARCHIVE":
      text = i18n.t("notifications.archive", {
        A: notification.actor.nickname,
      });
      break;
    case "REQUEST":
      text = i18n.t("notifications.request", {
        A: notification.actor.nickname,
      });
      action = { pathname: "TODO" };
      break;
    case "APPROVE":
      text = i18n.t("notifications.accept", {
        A: notification.actor.nickname,
      });
      action = {
        pathname: "message/chat",
        params: {
          exchangeId: notification.exchangeId,
        },
      };
      break;
    case "EXCHANGE":
      text = i18n.t("notifications.exchange", {
        A: notification.actor.nickname,
      });
      action = {
        pathname: "message/chat",
        params: {
          exchangeId: notification.exchangeId,
        },
      };
      break;
  }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 8,
        paddingVertical: 8,
        paddingHorizontal: 24,
        flex: 1,
      }}
    >
      {/* Picture */}
      <View style={{ flexDirection: "row", flexBasis: "20%" }}>
        {/* Second book pic */}
        <Image
          src={getAvatarUrl(notification.book.cover)}
          style={{ width: 60, height: 80, borderRadius: 3 }}
        />
        {/* Owner pic */}
        <Image
          src={getAvatarUrl(notification.actor.avatar)}
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
            position: "absolute",
            left: 40,
            top: 25,
          }}
        />
      </View>
      {/* Details */}
      <View style={{ gap: 8, flexGrow: 1, flexBasis: "60%" }}>
        {/* Notification message */}
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              flex: 1,
              maxWidth: "100%",
              flexWrap: "wrap",
            }}
          >
            {text}
          </Text>
        </View>
        {/* Date */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 14, color: "#6E7A9F" }}>{date}</Text>
          {!seen && <UnseenIndicator />}
        </View>
      </View>
      {/* Actions */}
      {action ? (
        <TouchableOpacity
          onPress={() => {
            router.push(action);
          }}
          style={{ justifyContent: "center", alignContent: "center" }}
        >
          <Ionicons name="arrow-forward-circle" size={32} color="#6E7A9F" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 32, height: 32 }} />
      )}
    </View>
  );
}

function NoNotificationsFound() {
  const i18n = useTranslation();
  return (
    <View style={{ alignItems: "center", gap: 8, paddingVertical: 16 }}>
      <Octicons name="inbox" size={36} color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {i18n.t("notifications.empty")}
      </Text>
    </View>
  );
}

function UnseenIndicator() {
  return <Ionicons name="ellipse" size={12} color="#FF6746" />;
}
