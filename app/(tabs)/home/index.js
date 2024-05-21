import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { genres } from "../../../api/constants";
import { getAvatarUrl } from "../../../components/users/Avatar";
import { router } from "expo-router";

export default function Tab() {
  const mockBooks = [
    {
      bookId: "66309f8691d019ed240c646f",
      title: "A Little Life",
      author: "Yanagihara Hanya",
      genre: "Novel",
      cover: "028e43d0783530373609309002fa405e.png",
      status: "AVAILABLE",
      createdAt: "2024-05-03T12:42:18.179+00:00",
    },
    {
      bookId: "66309f8691d019ed240c646f",
      title: "A Little Life",
      author: "Yanagihara Hanya",
      genre: "Novel",
      cover: "028e43d0783530373609309002fa405e.png",
      status: "AVAILABLE",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      exchangeId: "66309f8691d019ed240c646f",
    },
    {
      bookId: "66309f8691d019ed240c646f",
      title: "A Little Life",
      author: "Yanagihara Hanya",
      genre: "Novel",
      cover: "028e43d0783530373609309002fa405e.png",
      status: "AVAILABLE",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      exchangeId: "66309f8691d019ed240c646f",
    },
    {
      bookId: "66309f8691d019ed240c646f",
      title: "A Little Life",
      author: "Yanagihara Hanya",
      genre: "Novel",
      cover: "028e43d0783530373609309002fa405e.png",
      status: "RESERVED",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      exchangeId: "66309f8691d019ed240c646f",
    },
    {
      bookId: "66309f8691d019ed240c646f",
      title: "A Little Life",
      author: "Yanagihara Hanya",
      genre: "Novel",
      cover: "028e43d0783530373609309002fa405e.png",
      status: "AVAILABLE",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      exchangeId: "66309f8691d019ed240c646f",
    },
    {
      bookId: "66309f8691d019ed240c646f",
      title: "A Little Life",
      author: "Yanagihara Hanya",
      genre: "Novel",
      cover: "028e43d0783530373609309002fa405e.png",
      status: "AVAILABLE",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      exchangeId: "66309f8691d019ed240c646f",
    },
    {
      bookId: "66309f8691d019ed240c646f",
      title: "A Little Life",
      author: "Yanagihara Hanya",
      genre: "Novel",
      cover: "028e43d0783530373609309002fa405e.png",
      status: "AVAILABLE",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      exchangeId: "66309f8691d019ed240c646f",
    },
    {
      bookId: "66309f8691d019ed240c646f",
      title: "A Little Life",
      author: "Yanagihara Hanya",
      genre: "Novel",
      cover: "028e43d0783530373609309002fa405e.png",
      status: "AVAILABLE",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      exchangeId: "66309f8691d019ed240c646f",
    },
    {
      bookId: "66309f8691d019ed240c646f",
      title: "A Little Life",
      author: "Yanagihara Hanya",
      genre: "Novel",
      cover: "028e43d0783530373609309002fa405e.png",
      status: "AVAILABLE",
      createdAt: "2024-05-03T12:42:18.179+00:00",
      exchangeId: "66309f8691d019ed240c646f",
    },
  ];

  const [apiData, setApiData] = useState(mockBooks);
  const [books, setBooks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    updateBooks();
  }, [apiData, selectedGenres]);

  const updateBooks = () => {
    if (selectedGenres.length === 0) return setBooks(apiData);
    const filteredBooks = apiData.filter((book) =>
      selectedGenres.includes(book.genre.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  const isGenreSelected = (genre) => selectedGenres.includes(genre);

  const toggleGenreSelection = (genre) => {
    if (genre === "All") return setSelectedGenres([]);
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <View style={{ padding: 12, gap: 12 }}>
      {/* Content */}
      <FlatList
        contentContainerStyle={{ gap: 8 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={["All", ...genres]}
        renderItem={({ item }) => (
          <Genre
            genre={item}
            isSelected={
              item === "All"
                ? selectedGenres.length === 0 ||
                  selectedGenres.length === genres.length
                : isGenreSelected(item)
            }
            onSelect={() => toggleGenreSelection(item)}
          />
        )}
        keyExtractor={(_, i) => i}
      />
      {/* List of books */}
      <FlatList
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 32,
          paddingHorizontal: 4,
        }}
        ListEmptyComponent={NoBooksFound}
        data={books}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BookItem book={item} />}
        keyExtractor={(_, i) => i}
      />
    </View>
  );
}

function NoBooksFound() {
  return (
    <View style={{ alignItems: "center", gap: 8, paddingVertical: 16 }}>
      <Octicons name="inbox" size={36} color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        We are out of books for now...
      </Text>
      <Text style={{ fontSize: 16, color: "#6E7A9F" }}>
        Try searching or choosing other genres
      </Text>
    </View>
  );
}

function BookItem({ book }) {
  const isAvailable = book.status === "AVAILABLE" && !book.exchangeId;
  const isRequested = book.status === "AVAILABLE" && book.exchangeId;
  const isReserved = book.status === "RESERVED" && book.exchangeId;

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
            label={"Request"}
            bgColor={"#DEE1EB"}
            textColor={"black"}
            onPress={handleRequest}
          />
        )}
        {isRequested && (
          <ActionButton
            label={"Requested"}
            icon={<Ionicons name="checkmark-outline" size={14} color="white" />}
            bgColor={"#6E7A9F"}
            textColor={"white"}
            disabled={true}
          />
        )}
        {isReserved && (
          <ActionButton
            label={"Go to chat"}
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

function Genre({ genre, isSelected, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <Text
        style={{
          color: isSelected ? "black" : "#6E7A9F",
          fontWeight: "bold",
          fontSize: 16,
          borderBottomWidth: isSelected ? 2 : 0,
          padding: 2,
          borderRadius: 2,
        }}
      >
        {genre.charAt(0).toUpperCase() + genre.slice(1)}
      </Text>
    </Pressable>
  );
}
