import { Octicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View, Image } from "react-native";
import { getAvatarUrl } from "../users/Avatar";
import dayjs from "dayjs";

export default function History({ books }) {
  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingVertical: 12,
        gap: 16,
      }}
      ListEmptyComponent={EmptyHistory}
      data={books}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <MyExchangeItem book={item} />}
    />
  );
}

function MyExchangeItem({ book }) {
  const { i18n } = useTranslation();

  let text = "";
  let firstBook = {};
  let secondBook = {};
  if (book.exchange.exchangedBook) {
    // The book is offered by the user
    firstBook = {
      title: book.title,
      author: book.author,
      cover: book.cover,
    };
    secondBook = {
      title: book.exchange.exchangedBook.title,
      author: book.exchange.exchangedBook.author,
      cover: book.exchange.exchangedBook.cover,
      owner: {
        nickname: book.exchange.requestedBy.nickname,
        avatar: book.exchange.requestedBy.avatar,
      },
    };
    if (book.status === "RESERVED") {
      text = i18n.t("history.reservedByOther", {
        user: secondBook.owner.nickname,
        date: dayjs(book.exchange.approvedAt).format("MM/DD"),
      });
    }
    if (book.status === "EXCHANGED") {
      text = i18n.t("history.exchangedByOther", {
        user: secondBook.owner.nickname,
        date: dayjs(book.exchange.exchangedAt).format("MM/DD"),
      });
    }
  } else {
    // The book is given by the request of the other user
    firstBook = {
      title: book.title,
      author: book.author,
      cover: book.cover,
    };
    secondBook = {
      title: book.exchange.offeredBook.title,
      author: book.exchange.offeredBook.author,
      cover: book.exchange.offeredBook.cover,
      owner: {
        nickname: book.exchange.offeredBy.nickname,
        avatar: book.exchange.offeredBy.avatar,
      },
    };
    if (book.status === "RESERVED") {
      text = i18n.t("history.reservedByMe", {
        user: secondBook.owner.nickname,
        date: dayjs(book.exchange.approvedAt).format("MM/DD"),
      });
    }
    if (book.status === "EXCHANGED") {
      text = i18n.t("history.exchangedByMe", {
        user: secondBook.owner.nickname,
        date: dayjs(book.exchange.exchangedAt).format("MM/DD"),
      });
    }
  }

  return (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "white",
        borderRadius: 8,
      }}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 8,
            color: "#6E7A9F",
            fontSize: 16,
          }}
        >
          {text}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={getAvatarUrl(firstBook.cover)}
              style={{ width: 80, height: 100, borderRadius: 3 }}
            />
          </View>
          <Text
            style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}
          >
            {firstBook.title}
          </Text>
          <Text style={{ textAlign: "center", fontWeight: "500" }}>
            {firstBook.author}
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Cover image */}
            <Image
              src={getAvatarUrl(secondBook.cover)}
              style={{ width: 80, height: 100, borderRadius: 3 }}
            />
            {/* Owner pic */}
            <Image
              src={getAvatarUrl(secondBook.owner.avatar)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                position: "absolute",
                left: -20,
                top: 30,
              }}
            />
          </View>
          <Text
            style={{ fontWeight: "bold", fontSize: 16, textAlign: "center" }}
          >
            {secondBook.title}
          </Text>
          <Text style={{ textAlign: "center", fontWeight: "500" }}>
            {secondBook.author}
          </Text>
        </View>
      </View>
    </View>
  );
}

function EmptyHistory() {
  const i18n = useTranslation();
  return (
    <View
      style={{
        alignItems: "center",
        gap: 8,
        paddingVertical: 16,
      }}
    >
      <Octicons name="inbox" size={36} color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {i18n.t("history.empty")}
      </Text>
      <Text style={{ fontSize: 16, color: "#6E7A9F" }}>
        {i18n.t("history.empty-feedback")}
      </Text>
    </View>
  );
}
