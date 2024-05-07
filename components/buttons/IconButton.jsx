import { Pressable, View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function IconButton({
  icon,
  label,
  onPress,
  iconColor = "#fff",
  textColor = "#fff",
  bgColor = "#40B250",
}) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={[styles.button, { backgroundColor: bgColor }]}
      >
        <FontAwesome
          name={icon}
          size={24}
          color="black"
          style={[styles.buttonIcon, { color: iconColor }]}
        />
        <Text style={[styles.buttonLabel, { color: textColor }]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    height: 50,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 1000,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: 18,
  },
});
