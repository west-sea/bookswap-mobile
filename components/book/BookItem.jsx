import { Entypo, Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { getAvatarUrl } from "../users/Avatar";

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export default function BookItem({ book }) {
  const isAvailable = book.status === "AVAILABLE" && !book.exchangeId;
  const isRequested = book.status === "AVAILABLE" && book.exchangeId;
  const isReserved = book.status === "RESERVED" && book.exchangeId;
  const i18n = useTranslation();

  const handleRequest = () => {
    console.log("Requesting book...");
    console.log(book.bookId);
  };

  const handleChatroom = () => {
    router.push({
      pathname: "message/chat",
      params: { exchangeId: book.exchangeId },
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
        {isAvailable && (
          <ActionButton
            label={i18n.t("feed.available")}
            bgColor={"#DEE1EB"}
            textColor={"black"}
            onPress={handleRequest}
          />
        )}
        {isRequested && (
          <ActionButton
            label={i18n.t("feed.requested")}
            icon={<Ionicons name="checkmark-outline" size={14} color="white" />}
            bgColor={"#6E7A9F"}
            textColor={"white"}
            disabled={true}
          />
        )}
        {isReserved && (
          <ActionButton
            label={i18n.t("feed.reserved")}
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
