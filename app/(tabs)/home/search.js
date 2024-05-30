import { Ionicons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
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
import { api } from "../../../store/api";
import { showError, showInfo } from "../../../components/Toaster";
import { getErrorMessage, handleApiError } from "../../../store/utils";

export default function SearchPage() {
  const { i18n } = useTranslation();

  const [text, setText] = useState("");
  const [searchQuery, setSearchQuery] = useState(null);
  const [results, setResults] = useState([]);
  const {
    error: searchError,
    isLoading,
    data: searchData,
  } = api.useSearchBooksQuery(searchQuery, {
    skip: !searchQuery,
  });

  useEffect(() => {
    const error = searchError;
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [searchError]);

  useEffect(() => {
    if (!searchData || !searchData.success) return;
    setResults(searchData.data.books);
  }, [searchData]);

  const handleTextChange = (text) => {
    setText(text);
  };

  const handleSearch = async () => {
    if (!text || text.length < 1) {
      showInfo(i18n.t("search.no-text"));
      return;
    }
    setSearchQuery(text);
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
