import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Bookshelf from "../../../components/book/Bookshelf";
import History from "../../../components/book/History";
import { useTranslation } from "react-i18next";

export default function Tab() {
  const mockBookshelf = [
    {
      title: "A little Life",
      author: "Yanagihara, Hanya",
      genre: "Novel",
      visibility: "EXCEPTIONAL_PUBLIC",
      exceptions: [
        "60b4f0c4d9f7f8b7a0d3d1b4",
        "60b4f0c4d9f7f8b7a0d3d1d4",
        "60b4f0c4d9f7f8b7a0d3d1c4",
      ],
      status: "AVAILABLE",
      createdAt: "2024-05-04T10:38:41.556Z",
      bookId: "6636103105d279df47ce14c1",
      cover: "028e43d0783530373609309002fa405e.png",
    },
    {
      title: "A little Life",
      author: "Yanagihara, Hanya",
      genre: "Novel",
      visibility: "EXCEPTIONAL_PUBLIC",
      exceptions: [
        "60b4f0c4d9f7f8b7a0d3d1b4",
        "60b4f0c4d9f7f8b7a0d3d1d4",
        "60b4f0c4d9f7f8b7a0d3d1c4",
      ],
      status: "AVAILABLE",
      createdAt: "2024-05-04T10:38:41.556Z",
      bookId: "6636103105d279df47ce14c1",
      cover: "028e43d0783530373609309002fa405e.png",
    },
    {
      title: "A little Life",
      author: "Yanagihara, Hanya",
      genre: "Novel",
      visibility: "EXCEPTIONAL_PUBLIC",
      exceptions: [
        "60b4f0c4d9f7f8b7a0d3d1b4",
        "60b4f0c4d9f7f8b7a0d3d1d4",
        "60b4f0c4d9f7f8b7a0d3d1c4",
      ],
      status: "AVAILABLE",
      createdAt: "2024-05-04T10:38:41.556Z",
      bookId: "6636103105d279df47ce14c1",
      cover: "028e43d0783530373609309002fa405e.png",
    },
  ];
  const mockHistory = [
    {
      title: "Me Before You",
      author: "JoJo Moyes",
      genre: "Novel",
      visibility: "EXCEPTIONAL_PUBLIC",
      exceptions: [
        "60b4f0c4d9f7f8b7a0d3d1b4",
        "60b4f0c4d9f7f8b7a0d3d1d4",
        "60b4f0c4d9f7f8b7a0d3d1c4",
      ],
      status: "RESERVED",
      createdAt: "2024-05-04T08:39:19.470Z",
      exchange: {
        requestedBy: {
          nickname: "mcpeblocker",
          avatar: "Profile1.png",
        },
        exchangedBook: {
          title: "You Before Me",
          author: "JoJo Moyes",
          cover: "028e43d0783530373609309002fa405e.png",
        },
        exchangeId: "6634ef7c91b7813412a9b1fb",
        approvedAt: "2024-05-04T09:20:19.350Z",
      },
      bookId: "6635f437364f4c9412fa263f",
      cover: "028e43d0783530373609309002fa405e.png",
    },
    {
      title: "Me Before You",
      author: "JoJo Moyes",
      genre: "Novel",
      visibility: "PUBLIC",
      status: "EXCHANGED",
      createdAt: "2024-05-03T12:42:18.179Z",
      exchange: {
        requestedBy: {
          nickname: "mcpeblocker",
          avatar: "Profile2.png",
        },
        exchangedBook: {
          title: "Me Before You",
          author: "JoJo Moyes",
          cover: "028e43d0783530373609309002fa405e.png",
        },
        exchangeId: "6634efb55c3aa14f5651a232",
        approvedAt: "2024-05-04T09:20:19.350Z",
        exchangedAt: "2024-05-04T09:20:19.350Z",
      },
      bookId: "6634dbaaaf67fac193ebb5f8",
      cover: "028e43d0783530373609309002fa405e.png",
    },
    {
      title: "Harry Potter",
      author: "J. K. Rowling",
      genre: "Novel",
      visibility: "PUBLIC",
      status: "RESERVED",
      createdAt: "2024-05-03T12:42:18.179Z",
      exchange: {
        offeredBy: {
          nickname: "mcpeblocker",
          avatar: "Profile3.png",
        },
        offeredBook: {
          title: "Me Before You",
          author: "JoJo Moyes",
          cover: "028e43d0783530373609309002fa405e.png",
        },
        exchangeId: "6634efb55c3aa14f5651a232",
        approvedAt: "2024-05-04T09:20:19.350Z",
        exchangedAt: "2024-05-04T09:20:19.350Z",
      },
      bookId: "6634dbaaaf67fac193ebb5f8",
      cover: "028e43d0783530373609309002fa405e.png",
    },
    {
      title: "Harry Potter",
      author: "J. K. Rowling",
      genre: "Novel",
      visibility: "PUBLIC",
      status: "EXCHANGED",
      createdAt: "2024-05-03T12:42:18.179Z",
      exchange: {
        offeredBy: {
          nickname: "mcpeblocker",
          avatar: "Profile3.png",
        },
        offeredBook: {
          title: "Me Before You",
          author: "JoJo Moyes",
          cover: "028e43d0783530373609309002fa405e.png",
        },
        exchangeId: "6634efb55c3aa14f5651a232",
        approvedAt: "2024-05-04T09:20:19.350Z",
        exchangedAt: "2024-05-04T09:20:19.350Z",
      },
      bookId: "6634dbaaaf67fac193ebb5f8",
      cover: "028e43d0783530373609309002fa405e.png",
    },
  ];

  const { i18n } = useTranslation();

  const [currentTab, setCurrentTab] = useState("bookshelf");
  const [bookshelf, setBookshelf] = useState(mockBookshelf);
  const [history, setHistory] = useState(mockHistory);

  return (
    <View style={{ flex: 1 }}>
      {/* Tab */}
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          justifyContent: "space-around",
          backgroundColor: "white",
        }}
      >
        <TabHeader
          label={i18n.t('bookshelf.header') + (bookshelf.length ? ` ${bookshelf.length}` : "")}
          isActive={currentTab === "bookshelf"}
          onActive={() => setCurrentTab("bookshelf")}
        />
        <TabHeader
          label={i18n.t('history.header') + (history.length ? ` ${history.length}` : "")}
          isActive={currentTab === "history"}
          onActive={() => setCurrentTab("history")}
        />
      </View>
      {/* Content */}
      {currentTab === "bookshelf" && <Bookshelf books={bookshelf} />}
      {currentTab === "history" && <History books={history} />}
    </View>
  );
}

function TabHeader({ label, isActive, onActive }) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderBottomWidth: isActive ? 2 : 0,
      }}
      onPress={onActive}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: isActive ? "black" : "#6E7A9F",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
