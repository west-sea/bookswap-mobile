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

export default function ChatPage() {
  const mockChat = {
    exchangeId: "66309f8691d019ed240c646f",
    // status: "APPROVED",
    approvedAt: "2024-05-10T12:42:18.179+00:00",
    status: "COMPLETED",
    exchangedAt: "2024-05-21T12:42:18.179+00:00",
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
      userId: "my-user-id",
      nickname: "fool",
      avatar: "Profile2.png",
    },
    latestMessage: {
      text: "Bye bye",
      createdAt: "2024-05-20T12:42:18.179+00:00",
      seen: true,
    },
  };
  const mockMessages = [
    {
      sender: "66309f8691d019ed240c646f",
      text: "Hello",
      createdAt: "2024-05-14T12:42:18.179+00:00",
      seen: false,
    },
    {
      sender: "66309f8691d019ed240c646f",
      text: "Thank you! When do you want to meet?",
      createdAt: "2024-05-15T12:42:18.179+00:00",
      seen: false,
    },
    {
      sender: "66309f8691d019ed240c646f",
      text: "That's a long message .... I hope you are doing well! ... Finish the project ASAP ... Good luck! ... Bye bye",
      createdAt: "2024-05-15T12:43:18.179+00:00",
      seen: false,
    },
    {
      sender: "my-user-id",
      text: "Nice to meet you! How about 11PM?",
      createdAt: "2024-05-16T12:42:18.179+00:00",
      seen: false,
    },
    {
      sender: "66309f8691d019ed240c646f",
      text: "Sounds good! See you then!",
      createdAt: "2024-05-17T12:42:18.179+00:00",
      seen: false,
    },
  ];

  const params = useLocalSearchParams();

  const [chat, setChat] = useState(mockChat);
  const [messages, setMessages] = useState(mockMessages);
  const [history, setHistory] = useState([]);
  const [text, setText] = useState("");
  const flatlist = useRef(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log(`Exchange ID: `, params.exchangeId);
  }, []);

  const doIOffer = chat.offeredBy.userId === "my-user-id";
  const sender = doIOffer ? chat.requestedBy : chat.offeredBy;

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

  const handleBack = () => {
    router.back();
  };

  const handleComplete = () => {
    console.log("Exchange Completed");
  };

  const handleSendMessage = () => {
    if (!text) return;
    console.log("Send message: ", text);
    setText("");
    setMessages([
      ...messages,
      {
        sender: "my-user-id",
        text,
        createdAt: Date.now(),
        seen: false,
      },
    ]);
    scrollToEnd();
  };

  const scrollToEnd = () => {
    if (!flatlist.current) return;
    if (history.length === 0) return;
    flatlist.current.scrollToIndex({ index: history.length - 1 });
  };

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
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 30,
            paddingBottom: 12,
          }}
        >
          <TouchableOpacity
            onPress={handleBack}
            style={{
              flexBasis: "10%",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 16,
            }}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {sender.nickname}
          </Text>
          <View style={{ flexBasis: "10%" }}></View>
        </View>
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
            <ActionMessage action={item.action} date={item.date} />
          ) : (
            <Message message={item} sender={sender} />
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
  const isMine = props.message.sender === "my-user-id";

  return isMine ? (
    <OutgoingMessage {...props} />
  ) : (
    <IncomingMessage {...props} />
  );
}

function ActionMessage({ action, date }) {
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
    return <ExchangeAction date={date} requestedBy={action.requestedBy} />;
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

function ExchangeAction({ date, requestedBy }) {
  const isRequestedByMe = requestedBy.userId === "my-user-id";
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
