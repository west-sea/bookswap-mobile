import { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { View, Text, FlatList, Pressable } from "react-native";
import { genres } from "../../../old-api/constants";
import BookItem, { capitalize } from "../../../components/book/BookItem";
import { useTranslation } from "react-i18next";
import { api } from "../../../store/api";
import Loading from "../../../components/Loading";
import { showError } from "../../../components/Toaster";
import { router } from "expo-router";
import { handleApiError } from "../../../store/utils";

export default function Tab() {
  const { data, isLoading, error } = api.useGetFeedQuery();
  const [apiData, setApiData] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { i18n } = useTranslation();
  
  // Error handler
  useEffect(() => {
    if (!error) return;
    if (error.status === 401) {
      showError(i18n.t("auth.expired"));
      router.replace("/auth");
    } else {
      handleApiError(error, i18n);
    }
  }, [error]);

  // Initial data loader
  useEffect(() => {
    console.log(data);
    if (!data || !data.success) return;
    setApiData(data.data.books);
  }, [data]);

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

  if (isLoading) return <Loading />;

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
  const { i18n } = useTranslation();
  return (
    <View style={{ alignItems: "center", gap: 8, paddingVertical: 16 }}>
      <Octicons name="inbox" size={36} color="black" />
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {i18n.t("feed.empty")}
      </Text>
      <Text style={{ fontSize: 16, color: "#6E7A9F" }}>
        {i18n.t("feed.empty-feedback")}
      </Text>
    </View>
  );
}

function Genre({ genre, isSelected, onSelect }) {
  const { i18n } = useTranslation();
  const genreText = i18n.t(`genres.${genre.toLowerCase()}`);
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
        {capitalize(genreText)}
      </Text>
    </Pressable>
  );
}
