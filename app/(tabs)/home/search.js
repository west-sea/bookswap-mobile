import { Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import BookItem from "../../../components/book/BookItem";

export default function SearchPage() {
  const mockResults = [
    {
      bookId: "66309f8691d019ed240c646f",
      title: "JUSTICE",
      author: "Michael J.Sandel",
      genre: "Philosophy",
      cover: "028e43d0783530373609309002fa405e.png",
      createdAt: "2024-02-28T12:42:18.179+00:00",
      status: "AVAILABLE",
    },
    {
      bookId: "66309f8691d019ed240c646f",
      title: "JUSTICE",
      author: "Michael J.Sandel",
      genre: "Philosophy",
      cover: "028e43d0783530373609309002fa405e.png",
      createdAt: "2024-02-28T12:42:18.179+00:00",
      status: "AVAILABLE",
    },
    {
      bookId: "66309f8691d019ed240c646f",
      title: "JUSTICE",
      author: "Michael J.Sandel",
      genre: "Philosophy",
      cover: "028e43d0783530373609309002fa405e.png",
      createdAt: "2024-02-28T12:42:18.179+00:00",
      status: "AVAILABLE",
    },
  ];

  const { i18n } = useTranslation();

  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = async (text) => {
    setText(text);
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const randomLength = Math.floor(Math.random() * 3);
      setResults(mockResults.slice(0, randomLength));
    }, 1000);
  };

  return (
    <View
      style={{
        paddingVertical: 40,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      {/* Search bar */}
      <View
        style={{
          // flexShrink: 1,
          flexDirection: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
          padding: 8,
          gap: 4,
        }}
      >
        <TouchableOpacity
          onPress={router.back}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        {/* Input */}
        <TextInput
          placeholder={i18n.t("search.placeholder")}
          style={{
            borderWidth: 1,
            borderRadius: 20,
            borderColor: "#DEE1EB",
            paddingHorizontal: 12,
            flexGrow: 1,
            maxWidth: "",
          }}
          clearButtonMode="while-editing"
          inputMode="search"
          value={text}
          onChangeText={handleTextChange}
          onSubmitEditing={handleSearch}
        />
        {/* Send button */}
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: "#40B250",
            borderRadius: 50,
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
            opacity: !text || isLoading ? 0.6 : 1,
          }}
          disabled={!text || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" size={16} />
          ) : (
            // <SpinningIcon />
            <Ionicons name="search" size={16} color="white" />
          )}
        </TouchableOpacity>
      </View>
      {/* Content */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: "#F2F3F7",
            borderRadius: 4,
            fontSize: 16,
            textAlign: "center",
            color: "#6E7A9F",
          }}
        >
          {i18n.t("search.results", { count: results.length })}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          padding: 24,
          gap: 12,
        }}
        ListEmptyComponent={NoResults}
        data={results}
        keyExtractor={(_, i) => i}
        renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
  );
}

function NoResults() {
  const i18n = useTranslation();
  return (
    <View style={{ alignItems: "center", gap: 8, paddingVertical: 16 }}>
      <Octicons name="inbox" size={36} color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {i18n.t("search.empty")}
      </Text>
      <Text style={{ fontSize: 16, color: "#6E7A9F" }}>
        {i18n.t("search.empty-feedback")}
      </Text>
    </View>
  );
}

function SpinningIcon() {
  return <Ionicons name="refresh" size={16} color="white" />;
}
