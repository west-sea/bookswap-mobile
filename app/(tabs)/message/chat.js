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
  Keyboard,
} from "react-native";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";

export default function ChatPage() {
  const mockChat = {
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
  };
  const mockMessages = [
    {
      sender: "66309f8691d019ed240c646f",
      text: "Hello",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      seen: false,
    },
    {
      sender: "66309f8691d019ed240c646f",
      text: "Thank you! When do you want to meet?",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      seen: false,
    },
    {
      sender: "66309f8691d019ed240c646f",
      text: "That's a long message .... I hope you are doing well! ... Finish the project ASAP ... Good luck! ... Bye bye",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      seen: false,
    },
    {
      sender: "my-user-id",
      text: "Nice to meet you! How about 11PM?",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      seen: false,
    },
    {
      sender: "66309f8691d019ed240c646f",
      text: "Sounds good! See you then!",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      seen: false,
    },
  ];

  const params = useLocalSearchParams();

  const [chat, setChat] = useState(mockChat);
  const [messages, setMessages] = useState(mockMessages);
  const [text, setText] = useState("");
  const flatlist = useRef(null);

  useEffect(() => {
    console.log(`Exchange ID: `, params.exchangeId);
  }, []);

  const doIOffer = chat.offeredBy.userId === "my-user-id";
  const sender = doIOffer ? chat.requestedBy : chat.offeredBy;

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
    flatlist.current.scrollToIndex({ index: messages.length - 1 });
  };
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", scrollToEnd);
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
    };
  }, []);

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
              <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
                Complete exchange
              </Text>
            </TouchableOpacity>
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
        data={messages}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => <Message message={item} sender={sender} />}
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
          placeholder="Write a message..."
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
  return (
    <View style={{ alignItems: "center", gap: 8, paddingVertical: 16 }}>
      <MaterialIcons name="emoji-people" size={36} color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        No messages yet...
      </Text>
      <Text style={{ fontSize: 16, color: "#6E7A9F" }}>
        Send a quick message to start chatting!
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
