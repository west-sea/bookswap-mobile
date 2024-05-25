import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import PageHeader from "../../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { router } from "expo-router";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { api } from "../../../store/api";
import Loading from "../../../components/Loading";
import { handleApiError } from "../../../store/utils";
import { showError } from "../../../components/Toaster";

export default function Tab() {
  const { data, error, isLoading } = api.useGetMyExchangesQuery();
  const { i18n } = useTranslation();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [error]);

  useEffect(() => {
    if (!data || !data.success) return;
    setRequests(data.data.exchanges);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <View>
      <PageHeader title={i18n.t("myRequests.title")} />
      <FlatList
        contentContainerStyle={{
          gap: 16,
          paddingVertical: 16,
          paddingHorizontal: 16,
        }}
        ListEmptyComponent={NoRequestsFound}
        data={requests}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <RequestedBookItem
            book={item.offeredBook}
            exchangeId={item.exchangeId}
            status={item.status}
          />
        )}
        keyExtractor={(_, i) => i}
      />
    </View>
  );
}

function NoRequestsFound() {
  const { i18n } = useTranslation();
  return (
    <View style={{ alignItems: "center", gap: 8, paddingVertical: 16 }}>
      <Octicons name="inbox" size={36} color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {i18n.t("myRequests.empty")}
      </Text>
      <Text style={{ fontSize: 16, color: "#6E7A9F" }}>
        {i18n.t("myRequests.empty-feedback")}
      </Text>
    </View>
  );
}

function RequestedBookItem({ book, exchangeId, status }) {
  const isRequested = status === "REQUESTED";
  const isReserved = status === "APPROVED";
  const isArchived = status === "ARCHIVED";
  const isExchanged = status === "COMPLETED";
  const i18n = useTranslation();

  const handleChatroom = () => {
    router.push({
      pathname: "message/chat",
      params: { exchangeId: exchangeId },
    });
  };

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
        {isRequested && (
          <ActionButton
            label={i18n.t("myRequests.requested")}
            icon={<Ionicons name="checkmark-outline" size={14} color="white" />}
            bgColor={"#6E7A9F"}
            textColor={"white"}
            disabled={true}
          />
        )}
        {isArchived && (
          <ActionButton
            label={i18n.t("myRequests.archived")}
            icon={<Ionicons name="archive" size={14} color="white" />}
            bgColor={"#6E7A9F"}
            textColor={"white"}
            disabled={true}
          />
        )}
        {isReserved && (
          <ActionButton
            label={i18n.t("myRequests.reserved")}
            icon={
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={14}
                color="white"
              />
            }
            bgColor={"#47547a"}
            textColor={"white"}
            onPress={handleChatroom}
          />
        )}
        {isExchanged && (
          <ActionButton
            label={i18n.t("myRequests.exchanged")}
            icon={
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={14}
                color="white"
              />
            }
            bgColor={"#47547a"}
            textColor={"white"}
            onPress={handleChatroom}
          />
        )}
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
