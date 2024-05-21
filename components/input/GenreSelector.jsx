import { StyleSheet, Text, View, Pressable } from "react-native";
import { genres } from "../../api/constants";
import { useTranslation } from "react-i18next";

export default function GenreSelector({
  selectedGenres,
  toggleGenreSelection,
}) {
  const { i18n } = useTranslation();
  return (
    <View style={styles.container}>
      {genres.map((genre) => (
        <GenreSelection
          key={genre}
          genre={genre}
          isSelected={selectedGenres.includes(genre)}
          onPress={() => toggleGenreSelection(genre)}
        />
      ))}
    </View>
  );
}

function GenreSelection({ genre, isSelected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.genre, isSelected && styles.selected]}
    >
      <Text style={[styles.genreText, isSelected && styles.selectedText]}>
        {i18n.t(`genres.${genre}`)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  genre: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#DEE1EB",
    borderRadius: 500,
  },
  genreText: {
    fontSize: 18,
  },
  selectedText: {
    color: "white",
  },
  selected: {
    backgroundColor: "#6E7A9F",
  },
});
