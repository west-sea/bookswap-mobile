import { useEffect, useState, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import SwappedImage from "../../../assets/png/chat/swapped.png";
import PageHeader from "../../../components/PageHeader";
import { api } from "../../../store/api";
import { showError } from "../../../components/Toaster";
import { getErrorMessage, handleApiError } from "../../../store/utils";
import Loading from "../../../components/Loading";
import { shorten } from "../../../components/book/BookItem";
import { useSocket } from "../../../contexts/socket.ctx";
import { useDispatch } from "react-redux";

export default function ChatPage() {
  const params = useLocalSearchParams();
  const {
    data: apiData,
    error: apiError,
    isLoading: apiLoading,
  } = api.useGetChatQuery(params.exchangeId);
  const {
    data: meData,
    error: meError,
    isLoading: meLoading,
  } = api.useGetMeQuery();
  const [
    completeExchange,
    { error: completeError, isLoading: completeLoading },
  ] = api.useCompleteSwapMutation();
  const { socket } = useSocket();
  const dispatch = useDispatch();

  const [me, setMe] = useState(null);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [text, setText] = useState("");
  const flatlist = useRef(null);
  const { i18n } = useTranslation();

  const doIOffer = chat?.offeredBy.userId === me?.userId;
  const sender = doIOffer ? chat?.requestedBy : chat?.offeredBy;

  // Error handler
  useEffect(() => {
    const error = apiError || meError || completeError;
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [apiError, meError, completeError]);

  // Initial data loader
  useEffect(() => {
    if (!meData || !meData.success) return;
    if (!apiData || !apiData.success) return;
    setMe(meData.data);
    setChat(apiData.data.chat);
    setMessages(apiData.data.messages);
    scrollToEnd();
  }, [apiData, meData]);

  useEffect(() => {
    if (!chat || !messages) return;
    const history = [
      {
        action: {
          type: "DATE",
        },
        date: chat.approvedAt,
      },
      {
        action: {
          type: "APPROVE",
          offeredBy: chat.offeredBy.nickname,
          requestedBy: chat.requestedBy.nickname,
        },
        date: chat.approvedAt,
      },
    ];
    for (let message of messages) {
      // add date action if the date does not exist in history
      const date = dayjs(message.createdAt);
      if (
        !history.some(
          (item) =>
            item.action?.type === "DATE" && date.isSame(item.date, "day")
        )
      ) {
        history.push({
          action: {
            type: "DATE",
          },
          date,
        });
      }
      history.push(message);
    }
    if (chat.status === "COMPLETED") {
      if (
        !history.some(
          (item) =>
            item.action?.type === "DATE" &&
            dayjs(chat.exchangedAt).isSame(item.date, "day")
        )
      ) {
        history.push({
          action: {
            type: "DATE",
          },
          date: chat.exchangedAt,
        });
      }
      history.push({
        action: {
          type: "EXCHANGE",
          requestedBy: chat.requestedBy,
        },
        date: chat.exchangedAt,
      });
    }
    history.sort((a, b) => {
      let aDate = a.date || a.createdAt;
      let bDate = b.date || b.createdAt;
      return dayjs(aDate).isSame(bDate)
        ? 0
        : dayjs(aDate).isBefore(bDate)
        ? -1
        : 1;
    });
    setHistory(history);
  }, [chat, messages]);

  const handleComplete = async () => {
    try {
      const { data } = await completeExchange(params.exchangeId);
      if (!data || !data.success) throw new Error();
    } catch (error) {
      showError(getErrorMessage(error.code, i18n));
    }
  };

  const handleSendMessage = () => {
    if (!text) return;
    socket.emit("message", {
      exchangeId: params.exchangeId,
      text,
    });
    setText("");
    dispatch(api.util.invalidateTags(["chats"]));
    scrollToEnd();
  };

  const scrollToEnd = () => {
    if (!flatlist.current) return;
    if (history.length === 0) return;
    flatlist.current.scrollToIndex({ index: history.length - 1 });
  };

  if (!me || !chat || apiLoading || meLoading || completeLoading)
    return <Loading />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      {/* Header */}
      <View>
        {/* Chat title */}
        <PageHeader title={shorten(sender.nickname, 20)} />
        {/* Chat info */}
        <View
          style={{
            backgroundColor: "#F2F3F7",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 12,
          }}
        >
          {/* First book */}
          <Image
            src={getAvatarUrl(chat.offeredBook.cover)}
            style={{ width: 60, height: 80, borderRadius: 3 }}
          />
          {/* Details */}
          <View style={{ justifyContent: "space-evenly" }}>
            {/* Book names */}
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* Book 1 name */}
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                {chat.offeredBook.title}
              </Text>
              {/* Swap icon */}
              <FontAwesome5 name="exchange-alt" size={14} color="black" />
              {/* Book 2 name */}
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                {chat.exchangedBook.title}
              </Text>
            </View>
            {/* Complete action */}
            {chat.status === "APPROVED" && !doIOffer && (
              <TouchableOpacity
                onPress={handleComplete}
                style={{
                  backgroundColor: "#40B250",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 8,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 16 }}
                >
                  {i18n.t("chat.swap")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Second book */}
          <Image
            src={getAvatarUrl(chat.exchangedBook.cover)}
            style={{ width: 60, height: 80, borderRadius: 3 }}
          />
        </View>
      </View>
      {/* Messages */}
      {/* <View> */}
      <FlatList
        ref={flatlist}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#DEE1EB",
        }}
        showsVerticalScrollIndicator={false}
        data={history}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) =>
          item.action ? (
            <ActionMessage action={item.action} date={item.date} me={me} />
          ) : (
            <Message message={item} sender={sender} me={me} />
          )
        }
        ListEmptyComponent={EmptyChat}
      />
      {/* </View> */}
      {/* Typing area */}
      <View
        style={{
          // flexShrink: 1,
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
          padding: 8,
        }}
      >
        {/* Input */}
        <TextInput
          placeholder={i18n.t("chat.placeholder")}
          style={{
            borderWidth: 1,
            borderRadius: 20,
            borderColor: "#DEE1EB",
            paddingHorizontal: 12,
            width: "90%",
            maxWidth: "",
          }}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSendMessage}
        />
        {/* Send button */}
        <TouchableOpacity
          onPress={handleSendMessage}
          style={{
            backgroundColor: "#40B250",
            borderRadius: 50,
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
            opacity: text ? 1 : 0.6,
          }}
          disabled={!text}
        >
          <Ionicons name="send" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function EmptyChat() {
  const { i18n } = useTranslation();

  return (
    <View style={{ alignItems: "center", gap: 8, paddingVertical: 16 }}>
      <MaterialIcons name="emoji-people" size={36} color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {i18n.t("chat.empty")};
      </Text>
      <Text style={{ fontSize: 16, color: "#6E7A9F" }}>
        {i18n.t("chat.placeholder")}
      </Text>
    </View>
  );
}

function Message(props) {
  const isMine = props.message.sender === props.me.userId;

  return isMine ? (
    <OutgoingMessage {...props} />
  ) : (
    <IncomingMessage {...props} />
  );
}

function ActionMessage({ action, date, me }) {
  if (action.type === "DATE") {
    return <DateAction date={date} />;
  }
  if (action.type === "APPROVE") {
    return (
      <ApproveAction
        date={date}
        requestedBy={action.requestedBy}
        offeredBy={action.offeredBy}
      />
    );
  }
  if (action.type === "EXCHANGE") {
    return (
      <ExchangeAction date={date} requestedBy={action.requestedBy} me={me} />
    );
  }
}

function DateAction({ date }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
      }}
    >
      <View
        style={{
          backgroundColor: "#F2F3F7",
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: "#6E7A9F", fontSize: 12 }}>
          {dayjs(date).format("YYYY.MM.DD")}
        </Text>
      </View>
    </View>
  );
}

function ApproveAction({ date, requestedBy, offeredBy }) {
  const { i18n } = useTranslation();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
      }}
    >
      <View
        style={{
          backgroundColor: "#F2F3F7",
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 4,
        }}
      >
        <Text style={{ color: "#6E7A9F", fontSize: 12, textAlign: "center" }}>
          {i18n.t("chat.accepted", { A: offeredBy, B: requestedBy })}
        </Text>
        <Text style={{ color: "#6E7A9F", fontSize: 12, textAlign: "center" }}>
          {dayjs(date).format("h:mm A")}
        </Text>
      </View>
    </View>
  );
}

function ExchangeAction({ date, requestedBy, me }) {
  const isRequestedByMe = requestedBy.userId === me.userId;
  const { i18n } = useTranslation();
  return (
    <View
      style={{
        flexDirection: isRequestedByMe ? "row-reverse" : "row",
        gap: 8,
        padding: 8,
        justifyContent: "flex-start",
      }}
    >
      {/* Sender profile */}
      {!isRequestedByMe && (
        <View style={{ justifyContent: "flex-end", alignItems: "center" }}>
          <Image
            src={getAvatarUrl(requestedBy.avatar)}
            style={{
              borderRadius: 50,
              width: 30,
              height: 30,
            }}
          />
        </View>
      )}
      {/* Message content */}
      <View
        style={{
          backgroundColor: "white",
          paddingBottom: 5,
          borderRadius: 20,
          borderBottomLeftRadius: isRequestedByMe ? 20 : 4,
          borderBottomRightRadius: isRequestedByMe ? 4 : 20,
          elevation: 3,
          maxWidth: "75%",
          backgroundColor: isRequestedByMe ? "#AFEEB8" : "white",
        }}
      >
        <Image
          source={SwappedImage}
          style={{
            width: "100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
        <View style={{ paddingHorizontal: 16, paddingVertical: 4 }}>
          <Text style={{ fontSize: 16 }}>
            {i18n.t("chat.exchanged", { A: requestedBy.nickname })}
          </Text>
        </View>
      </View>
      {/* Time */}
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text
          style={{
            color: "#6E7A9F",
            fontSize: 12,
          }}
        >
          {dayjs(date).format("h:mm A")}
        </Text>
      </View>
    </View>
  );
}

function OutgoingMessage({ message }) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        padding: 8,
        justifyContent: "flex-end",
      }}
    >
      {/* Time */}
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text
          style={{
            color: "#6E7A9F",
            fontSize: 12,
          }}
        >
          {dayjs(message.createdAt).format("h:mm A")}
        </Text>
      </View>
      {/* Message content */}
      <View
        style={{
          backgroundColor: "#AFEEB8",
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 20,
          borderBottomRightRadius: 4,
          elevation: 3,
          maxWidth: "80%",
        }}
      >
        <Text style={{ fontSize: 16 }}>{message.text}</Text>
      </View>
    </View>
  );
}

function IncomingMessage({ message, sender }) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        padding: 8,
        justifyContent: "flex-start",
      }}
    >
      {/* Sender profile */}
      <View style={{ justifyContent: "flex-end", alignItems: "center" }}>
        <Image
          src={getAvatarUrl(sender.avatar)}
          style={{
            borderRadius: 50,
            width: 30,
            height: 30,
          }}
        />
      </View>
      {/* Message content */}
      <View
        style={{
          backgroundColor: "white",
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 20,
          borderBottomLeftRadius: 4,
          elevation: 3,
          maxWidth: "75%",
        }}
      >
        <Text style={{ fontSize: 16 }}>{message.text}</Text>
      </View>
      {/* Time */}
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text
          style={{
            color: "#6E7A9F",
            fontSize: 12,
          }}
        >
          {dayjs(message.createdAt).format("h:mm A")}
        </Text>
      </View>
    </View>
  );
}
