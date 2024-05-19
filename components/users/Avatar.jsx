import { View, Image, StyleSheet } from "react-native";

export default function Avatar({ filename }) {
  return (
    <View style={styles.container}>
      <Image src={getAvatarUrl(filename)} style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});

export function getAvatarUrl(filename) {
  return `${process.env.EXPO_PUBLIC_API_BASE_URL}/files/${filename}`;
}
